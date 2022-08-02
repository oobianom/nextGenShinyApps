#' Create a button
#'
#' Upgrade to the actionButton in 'Shiny' package
#'
#' @importFrom shiny restoreInput
#' @param ... other elements or attributes for the button
#' @param inputId Input identification
#' @param label Input label
#' @param icon Choice of button icon
#' @param width Width of the bottom
#' @param size Size of the button, choices include "m","xs", "s", "l", "xl"
#' @param style Style of the button, choices include "default", "pill", "round", "clean"
#' @param bg.type Color of the button, choices include "default", "primary", "secondary", "info", "success", "danger", "warning"
#' @param outline Use an outline styling, TRUE or FALSE
#'
#' @return HTML of the buttons to insert into a page
#'
#' @examples
#' if (interactive()) {
#' shiny::div(actionButton("button",
#'   "Action button with primary color",
#'   icon = shiny::icon("folder"), bg.type = "primary"
#' ))
#' shiny::div(actionButton("button",
#'   "Action button with primary color",
#'   icon = shiny::icon("file"),
#'   bg.type = "danger", outline = TRUE
#' ))
#' }
#'
#' @export
#'

actionButton <- function(inputId, label, icon = NULL, width = NULL, ..., size = c("m", "xs", "s", "l", "xl"), style = c("default", "pill", "round", "clean"), bg.type = c("default", "primary", "secondary", "info", "success", "danger", "warning"), outline = FALSE) {
  bg.type <- match.arg(bg.type)
  size <- match.arg(size)
  style <- match.arg(style)
  style <- switch(style,
    default = "rounded-0",
    round = "rounded-circle",
    pill = "rounded-pill",
    clean = "rounded border-button"
  )
  outline <- ifelse(outline, "btn-outline-", "border-0 btn-")
  value <- restoreInput(id = inputId, default = NULL)
  tags$button(
    id = inputId, style = paste0("width:", validateCssUnit(width)),
    type = "button", class = paste0("btn action-button ", outline, bg.type),
    class = style,
    class = ifelse(label == "" & style == "rounded-circle", "btn-icon", ""),
    class = paste0("btn-", switch(size,
      s = "sm",
      xs = "xs",
      m = "md",
      l = "lg",
      xl = "xl"
    )),
    `data-val` = value, list((icon), label),
    ...
  )
}





#' Create a submit button
#'
#' Upgrade to the submitButton in 'Shiny' package
#'
#' @param text Button text
#' @param icon Choice of button icon
#' @param width Width of the bottom
#' @param size Size of the button, choices include "m","xs", "s", "l", "xl"
#' @param style Style of the button, choices include "default", "pill", "round", "clean"
#' @param bg.type Color of the button, choices include "default", "primary", "secondary", "info", "success", "danger", "warning"
#' @param outline Use an outline styling, TRUE or FALSE
#'
#' @return HTML of the submit buttons to insert into a page
#'
#' @examples
#' if (interactive()) {
#' card(
#'   shiny::h2("Submit buttons with various styles"),
#'   header = FALSE,
#'   shiny::div(submitButton("Submit button with primary color",
#'     icon = shiny::icon("file"), size = "s", bg.type = "primary"
#'   )),
#'   shiny::div(submitButton("Secondary color",
#'     icon = shiny::icon("folder"), bg.type = "secondary"
#'   )),
#'   shiny::div(submitButton("Success color",
#'     icon = shiny::icon("filter"), bg.type = "success"
#'   )),
#'   shiny::div(submitButton("Warning color",
#'     icon = shiny::icon("grid"), bg.type = "warning"
#'   )),
#'   shiny::div(submitButton("Danger color",
#'     icon = shiny::icon("check"), bg.type = "danger"
#'   )),
#'   shiny::div(submitButton("Info color",
#'     icon = shiny::icon("trash"), bg.type = "info"
#'   ))
#' )
#' }
#' @export
#'

submitButton <- function(inputId, text = "Apply Changes", icon = NULL, width = NULL, size = c("m", "xs", "s", "l", "xl"), style = c("default", "pill", "round", "clean"), bg.type = c("default", "primary", "secondary", "info", "success", "danger", "warning"), outline = FALSE) {
  masterButton(
    inputId,
    text = text, icon = icon, width = width, size = match.arg(size),
    style = match.arg(style),
    bg.type = match.arg(bg.type), outline = outline
  )
}










#' Create a master button
#'
#' A master button creator
#'
#' @param text Button text
#' @param icon Choice of button icon
#' @param width Width of the bottom
#' @param size Size of the button, choices include "m","xs", "s", "l", "xl"
#' @param style Style of the button, choices include "default", "pill", "round", "clean"
#' @param bg.type Color of the button, choices include "default", "primary", "secondary", "info", "success", "danger", "warning"
#' @param outline Use an outline styling, TRUE or FALSE
#' @param extraClass other class names to add to the button attribute
#' @param ... Other elements to add to the button
#'
#' @return HTML of the buttons to insert into a page
#'
#' @examples
#' if (interactive()) {
#' card(
#'   shiny::h2("Master buttons with various styles"),
#'   header = FALSE,
#'   shiny::div(masterButton("Submit button with primary color",
#'     icon = shiny::icon("file"), size = "s", bg.type = "primary"
#'   ))
#' )
#' }
#' @export
#'


masterButton <- function(inputId, text = "Text", icon = NULL, width = NULL, size = c("m", "xs", "s", "l", "xl"), style = c("default", "pill", "round", "clean"), bg.type = c("default", "primary", "secondary", "info", "success", "danger", "warning"), outline = FALSE, extraClass = NULL, ...) {
  bg.type <- match.arg(bg.type)
  size <- match.arg(size)
  style <- match.arg(style)
  style <- switch(style,
    default = "rounded-0",
    round = "rounded-circle",
    pill = "rounded-pill",
    clean = "rounded border-button"
  )
  outline <- ifelse(outline, "btn-outline-", "border-0 btn-")
  shiny::div(tags$button(
    id = inputId,
    type = "submit", class = paste0("btn ", outline, bg.type),
    class = style,
    class = ifelse(text == "" & style == "rounded-circle", "btn-icon", ""),
    class = paste0("btn-", switch(size,
      s = "sm",
      m = "md",
      xs = "xs",
      l = "lg",
      xl = "xl"
    )),
    style = paste0("width:", validateCssUnit(width)), list(
      icon,
      text
    ),
    ...
  ))
}

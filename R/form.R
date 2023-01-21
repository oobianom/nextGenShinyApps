#' Create an advanced text input
#'
#' Modifications to textInput to allow added functionality and styles
#'
#' @param inputId The identification name
#' @param label The label for the input
#' @param value The current value of the input
#' @param size The size of the input, "m", "s", "l", "xl"
#' @param placeholder A placeholder text
#' @param width width of the text input
#' @param style Style to adapt, options include "default", "pill", "round", "clean"
#' @param border.type Add a border coloring using either of "none", "primary", "info", "success", "danger", "warning"
#' @param prepend Add  a prepended text or icon
#' @param append Add an appended text or icon
#'
#' @note For more information on the features of the form, visit the examples section of the help documentation
#' @return A HTML with modifications to th style information
#'
#' @examples
#' \donttest{
#' if (interactive()) {
#'   library(shiny)
#'   library(nextGenShinyApps)
#'
#'   shiny::shinyApp(
#'     ui = fluidPage(
#'       style = "8",
#'       custom.bg.color = "white",
#'       sidebar = NULL,
#'       header = NULL,
#'       card(
#'         header = FALSE,
#'         tags$h3("Text input"),
#'         textInput("caption", "Basic"),
#'         textInput("caption", "Basic", style = "clean"),
#'         textInput("caption", "Border - primary",
#'           "Enter sample text",
#'           prepend = "@", border.type = "info"
#'         ),
#'         textInput("caption", "Border - primary",
#'           "Enter sample text",
#'           prepend = shiny::icon("lock")
#'         ),
#'         textInput("caption", "Border - primary",
#'           "Enter sample text",
#'           append = "%"
#'         ),
#'         textInput("caption", "Border - primary",
#'           "Enter sample text",
#'           prepend = shiny::icon("chart"),
#'           append = ".00"
#'         )
#'       )
#'     ),
#'     server = function(input, output) {
#'     }
#'   )
#' }
#' }
#'
#' @export

textInput <- function(inputId, label, value = "", width = NULL, placeholder = NULL, size = c("m", "s", "l", "xl"), style = c("default", "pill", "round", "clean"), border.type = c("none", "primary", "info", "success", "danger", "warning"), prepend = NULL, append = NULL) {
  border.type <- match.arg(border.type)
  size <- match.arg(size)
  style <- match.arg(style)
  style <- switch(style,
    default = "rounded-0",
    round = "rounded",
    pill = "rounded-pill",
    clean = "rounded-0 border-top-0 border-left-0 border-right-0 px-0 bg-transparent"
  )
  value <- restoreInput(id = inputId, default = value)
  div(
    class = "form-group shiny-input-container", style = paste0("width:", shiny::validateCssUnit(width)),
    tags$label(id = inputId, class = "form-label", label),
    div(
      class = "input-group",
      if (!is.null(prepend)) {
        div(
          class = "input-group-prepend",
          tags$span(class = "input-group-text", prepend)
        )
      },
      tags$input(
        id = inputId,
        type = "text",
        class = "form-control",
        class = paste0("border-", border.type),
        class = style,
        class = paste0("form-control-", switch(size,
          s = "sm",
          m = "md",
          l = "lg",
          xl = "xl"
        )),
        value = value, placeholder = placeholder
      ),
      if (!is.null(append)) {
        div(
          class = "input-group-append",
          tags$span(class = "input-group-text", append)
        )
      }
    )
  )
}

#' Create an advanced checkbox input
#'
#' Modifications to checkboxinput to allow added styles
#'
#' @param inputId The identification name
#' @param label The label for the input
#' @param value The current value of the input
#' @param width width of the text input
#' @param inline make inline or block format
#'
#' @note For more information on the features of the form, visit the examples section of the help documentation
#' @return HTML elements of a checkbox
#'
#' @examples
#'         checkboxInput("somevalue", "Some value", FALSE)
#'         checkboxInput("somevalue", "Some value", value = FALSE, inline = TRUE)
#'         checkboxInput("somevalue", "Some value", FALSE)
#'
#'
#' @export

checkboxInput <- function(inputId, label, value = FALSE, width = NULL, inline = FALSE) {
  #inputId <-paste0("id", inputId, rand.num(1))
  value <- restoreInput(id = inputId, default = value)
  inputTag <- tags$input(id = inputId, class = "custom-control-input", type = "checkbox")
  if (!is.null(value) && value) {
    inputTag$attribs$checked <- "checked"
  }
  div(
    class = "form-group shiny-input-container", class = ifelse(inline, "custom-control-inline", ""), style = paste0("width:", validateCssUnit(width)),
    div(class = "checkbox custom-control custom-checkbox", inputTag, tags$label(class = "custom-control-label", `for` = inputId, tags$span(label)))
  )
}


#' Create an advanced text area input
#'
#' Modifications to 'textAreaInput' to allow added styles
#'
#' @param inputId The identification name
#' @param label The label for the input
#' @param value The current value of the input
#' @param width width of the text input
#' @param height height of the text input
#' @param cols col of text to display
#' @param rows row of text to display
#' @param placeholder A placeholder text
#' @param resize Make inout resizable, with choices "both", "none", "vertical", "horizontal"
#' @param style Style to adapt, options include "default", "pill", "round", "clean"
#' @param border.type Add a border coloring using either of "none", "primary", "info", "success", "danger", "warning"
#'
#' @note For more information on the features of the form, visit the examples section of the help documentation
#'
#' @return HTML element of a textAreaInput
#' @examples
#' textAreaInput("caption",
#'           "Sample Text area input",
#'           "Data Summary",
#'           width = "1000px", border.type = "success"
#'         )
#'
#'
#' @export

textAreaInput <- function(inputId, label, value = "", width = NULL, height = NULL,
                          cols = NULL, rows = NULL, placeholder = NULL, resize = c("both", "none", "vertical", "horizontal"),
                          style = c("default", "pill", "round", "clean"), border.type = c("none", "primary", "info", "success", "danger", "warning")) {
  border.type <- match.arg(border.type)
  style <- match.arg(style)
  style <- switch(style,
    default = "rounded-0",
    round = "rounded",
    pill = "rounded-pill p-4",
    clean = "rounded-0 border-left-0 border-right-0 px-0 bg-transparent"
  )
  value <- restoreInput(id = inputId, default = value)
  if (!is.null(resize)) {
    resize <- match.arg(resize)
  }
  style2 <- paste0("width:", validateCssUnit(width), "; height:", validateCssUnit(height), ";resize:", resize)
  div(class = "form-group shiny-input-container", tags$label(
    id = inputId, class = "form-label",
    label
  ), tags$textarea(
    id = inputId,
    class = "form-control",
    class = paste0("border-", border.type),
    class = style,
    style = style2,
    placeholder = placeholder, style = style,
    rows = rows, cols = cols, value
  ))
}

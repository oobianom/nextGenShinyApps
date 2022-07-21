#' Create an alert
#'
#' Create an alert with various styles
#'
#' @param ... Content of the alert
#' @param type Choose a style for the alert, choices include "default", "standard"
#' @param close Allow alert to be closable, TRUE or FALSE
#' @param outline Include an outline and exclude background, TRUE or FALSE
#' @param icon Include an icon to the left of the content
#' @param color Color of the alert, choose between "none", "primary", "secondary", "info", "success", "danger", "warning"
#' @return HTML of an alert box to be inserted within a page
#' @examples
#' if (interactive()) {
#' card(
#'   header = FALSE,
#'   shiny::h2("Standard alert (closeable)"),
#'   alert("EX1", type = "standard",
#'   color = "primary"),
#'   alert("EX2", type = "standard",
#'   color = "secondary"),
#'   alert("EX3", type = "standard",
#'   color = "secondary", outline = TRUE),
#'   alert("EX4", type = "standard",
#'   color = "danger", outline = TRUE, close = TRUE),
#'   alert("EX5", type = "standard",
#'   close = TRUE),
#'   alert("EX6", type = "standard",
#'   color = "primary", icon = shiny::icon("info"))
#' )
#' }
#'
#' @export
#'

alert <- function(..., type = c("default", "standard"), close = FALSE, color = c("none", "primary", "secondary", "info", "success", "danger", "warning"), outline = FALSE, icon = NULL) {
  type <- match.arg(type)
  color <- match.arg(color)
  default <- "default"
  type <- ifelse(type == default, "panel-tag", "alert") # set class based on type
  close <- ifelse(type == default, FALSE, close) # if type is tag, don't include a closer
  color <- ifelse(type == default, "", color) # if type is tag, don't include a color
  outline <- ifelse(type == default, FALSE, outline) # if type is tag, don't include a outline

  bgborder <- ifelse(outline,
    paste0("border border-", color, " bg-transparent text-", color),
    paste0("alert-", color)
  )
  div(
    class = "alert-dismissible fade show",
    class = type,
    class = bgborder,
    if (close) {
      div(type = "button", class = "close", `data-dismiss` = "alert", `aria-label` = "Close", tags$span(`aria-hidden` = "true", tags$i(class = "fa fa-times-circle")))
    },
    div(
      class = "d-flex align-items-center",
      if (!is.null(icon)) {
        div(class = "alert-icon", icon)
      },
      div(
        HTML(...)
      )
    )
  )
}

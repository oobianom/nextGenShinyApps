#' Create a spinner
#'
#' Create a loading spinner for customization of outputs
#'
#' @param type Choose a style for the spinner using "ring","grow","square","rect"
#' @param size Size of the spinner, "l" for large and "s" for small
#' @param color Color of the spinner, choose between "default", "primary", "secondary", "info", "success", "danger", "warning"
#'
#' @return An HTML containing elements of a spinner to be embedded in a page during loading
#'
#' @examples
#' \donttest{
#' if (interactive()) {
#'   library(shiny)
#'   library(nextGenShinyApps)
#'
#'   shiny::shinyApp(
#'     ui = fluidPage(
#'       style = "3",
#'       custom.bg.color = "cyan",
#'       sidebar = NULL,
#'       header = NULL,
#'       card(
#'         header = FALSE,
#'         shiny::h2("loading spinner"),
#'         spinner(type = "rect", size = "s"),
#'         spinner(type = "rect", color = "primary"),
#'         spinner(type = "grow", color = "secondary"),
#'         spinner(type = "ring", color = "success"),
#'         spinner(type = "rect", color = "warning"),
#'         spinner(type = "square", color = "danger"),
#'         spinner(type = "rect", color = "info")
#'       )
#'     ),
#'     server = function(input, output) {
#'     }
#'   )
#' }
#' }
#'
#' @export
#'

spinner <- function(type = c("ring", "grow", "square", "rect"), size = c("l", "s"), color = c("default", "primary", "secondary", "info", "success", "danger", "warning")) {
  color <- match.arg(color)
  size <- match.arg(size)
  size <- switch(size,
    s = "sm",
    l = "lg"
  )

  type <- match.arg(type)
  type <- switch(type,
    ring = "border",
    grow = "grow",
    square = "grow rounded-0",
    rect = "border rounded-0"
  )
  div(
    class = paste0("spinner-border-", size),
    class = paste0("text-", color),
    class = paste0("spinner-", type),
    role = "status", tags$span(
      class = "sr-only", "Loading..."
    )
  )
}

#' Create the body section of the application
#'
#' Create a simple body containing a header and a content for the main body
#'
#' @param ... The elements to include within the body of the modal
#' @param header OPTIONAL. Items to display in the header section (use the titlePanel() function to set this property).
#'
#' @note Endeavor to use as standalone and not within the fluidPage, as this function it already called within fluidPage
#'
#' @return An HTML of the body of the page
#'
#' @examples
#'
#' if (interactive()) {
#' dashboardBody(
#'   header = titlePanel(
#'     left = "Sample nextGenShinyApps Title",
#'     right = shiny::icon("user")
#'   ),
#'   "sample text for main body"
#' )
#' }
#'
#' @export


dashboardBody <- function(header, ...) {
  shiny::div(
    class = "page-content-wrapper",
    header,
    tags$main(
      id = "js-page-content", role = "main", class = "page-content",
      rlang::list2(...)
    )
  )
}




#' Panel wrapper
#'
#' Wrapper to hold all panels
#'
#' @param ... content of the container
#'
#' @return Container containing various panels
#'
#' @examples
#' if (interactive()) {
#' wrapper(
#'   altPanel("Sample left content"),
#'   mainPanel("Sample right content")
#' )
#' }
#'
#' @export
#'
#'
wrapper <- function(...) {
  shiny::div(
    ...,
    class = "row shiny-b-v-wrapper"
  )
}


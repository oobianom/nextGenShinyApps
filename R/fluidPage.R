#' Generate a container for the application
#'
#' An upgrade to the fluidPage function available in the 'Shiny' package
#'
#' @importFrom shiny restoreInput
#' @param ... The elements to include within the body of the page
#' @param header OPTIONAL. Items to display in the header section (use the titlePanel() function to set this property).
#' @param sidebar OPTIONAL. Items to display in the sidebay section (use the sidebarPanel() function to set this property).
#' @param id OPTIONAL. Identification tag of the container
#' @param style OPTIONAL. Various unique styles choices from 1 - 12
#' @param custom.bg.color OPTIONAL. Choice to change the background color of the container. Use HEX values such as #FFFFFF or RGB code such as rgb(255,255,255) or simple color name such as 'lightblue'
#' @param class OPTIONAL. Class name for the container
#' @param modal.header.links OPTIONAL. One or more list containing links that appear when the app title is clicked. To remove, set to NULL
#'
#' @note This global layout can be applied to a variety of shiny app and dashboard, with or without a sidebar. See the example below.
#'
#' @return A rendered HTML of the container holder of the application items
#' @examples
#' \donttest{
#' if (interactive()) {
#'   library(shiny)
#'   library(nextGenShinyApps)
#'
#'   shiny::shinyApp(
#'     ui = fluidPage(
#'       style = "6",
#'       header = titlePanel(left = "Sample App Title",
#'       right = "Image/logo"),
#'       sidebar = sidebarPanel(
#'         title = "myApp",
#'         "Sample sidebar content"
#'       ),
#'       "Sample body content"
#'     ),
#'     server = function(input, output) {}
#'   )
#' }
#' }
#' @export


fluidPage <- function(..., id = NULL, header = NULL, sidebar = NULL, class = NULL, style = rand.sc13, custom.bg.color = NULL, modal.header.links = NULL){
  color <- match.arg(style)
  template <- "core"
  tags$body(
    class = "mod-bg-1 mod-nav-link nav-function-fixed",
    class = ifelse(is.null(sidebar), "nav-function-hidden", ""),
    if (!is.null(custom.bg.color)) tags$style(paste0("
               .page-content-wrapper{background-color:", custom.bg.color, "!important;}
               ")),
    div(
      id = id, class = paste0("app-container app-theme-gray ", class, " ", color),
      verify_fa = FALSE,
      rmarkdown::html_dependency_font_awesome(),
      cssjsinclude(template, color),
      # modal
      if(!is.null(modal.header.links))
      modal.header(modal.header.links),
      # page content
      div(
        class = "page-wrapper",
        style = ifelse(is.null(sidebar), "padding-left: 0px!important;", ""),
        div(
          class = "page-inner",
          sidebar,
          dashboardBody(header, ...)
        )
      )
    )
  )
}

#' Create the sidebar panel
#'
#' Creates an advanced sidebar panel with colors corresponding to a chosen theme style
#'
#' @param ... The elements to include within the body of the sidebar
#' @param title Title of the sidebar content
#' @param footer Whether or not to enable the footer content
#' @note This global layout can be applied to a variety of shiny app and dashboard, with or without a sidebar. See the example below.
#'
#' @return An HTML containing elements of a sidebar to be embedded in a page
#'
#' @examples
#' \donttest{
#' if (interactive()) {
#'   library(shiny)
#'   library(nextGenShinyApps)
#'
#'   shiny::shinyApp(
#'     ui = fluidPage(
#'       style = "7",
#'       header = NULL,
#'       sidebar = sidebarPanel(
#'         title = "myApp",
#'         "Sample sidebar contents",
#'         footer = FALSE
#'       ),
#'       "Plain content"
#'     ),
#'     server = function(input, output) {}
#'   )
#' }
#' }
#' @export
sidebarPanel <- function(..., title = "TitleApp", footer = FALSE) {
  tags$aside(
    class = "page-sidebar",
    div(
      class = "page-logo",
      tags$a(
        href = "#",
        class = "page-logo-link press-scale-down d-flex align-items-center position-relative",
        `data-toggle` = "modal", `data-target` = "#modal-shortcut",
        tags$span(
          class = "page-logo-text mr-1",
          style = "font-weight: bold;",
          title
        ),
        tags$span(class = "position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"),
        tags$span(class = "fa fa-signature d-inline-block ml-1 fs-lg color-primary-300")
      )
    ),
    tags$nav(
      id = "js-primary-nav", class = "primary-nav", role = "navigation",
      div(
        class = "nav-filter",
        div(
          class = "position-relative",
          '<input type="text" id="nav_filter_input" placeholder="Filter menu" class="form-control" tabindex="0">',
          tags$a(
            href = "#", onclick = "return false;", class = "btn-primary btn-search-close js-waves-off", `data-action` = "toggle", `data-class` = "list-filter-active", `data-target` = ".page-sidebar",
            tags$i(class = "fa fa-chevron-up"),
          )
        )
      ),
      tags$ul(
        id = "js-nav-menu", class = "nav-menu",
        tags$li(
          class = "nav-title",
          style = "color:#f5f5f5!important",
          div(...)
        )
      )
    ),
    if (footer) {
      div(
        class = "nav-footer shadow-top",
        tags$a(
          href = "#", onclick = "return false;", `data-action` = "toggle", `data-class` = "nav-function-minify", class = "hidden-md-down",
          tags$i(class = "fa fa-chevron-right"),
          tags$i(class = "fa fa-chevron-right")
        ),
        tags$ul(
          class = "list-table m-auto nav-footer-buttons",
          tags$li(
            tags$a(
              href = "javascript:void(0);", `data-toggle` = "tooltip", `data-placement` = "top", title = "Chat logs",
              tags$i(class = "fa fa-comments")
            )
          ),
          tags$li(
            tags$a(
              href = "javascript:void(0);", `data-toggle` = "tooltip", `data-placement` = "top", title = "Chart",
              tags$i(class = "fa fa-chart")
            )
          ), tags$li(
            tags$a(
              href = "javascript:void(0);", `data-toggle` = "tooltip", `data-placement` = "top", title = "Phone",
              tags$i(class = "fa fa-phone")
            )
          )
        )
      )
    }
  )
}


#' Sidebar layout
#'
#' Container for sidebar, optional
#'
#' @param ... content of the sidebar layout
#'
#' @return An HTML containing elements in a container
#' @examples
#' sidebarLayout("sample text")
#' @export
#'

sidebarLayout <- function(...) {
  div(...)
}

#' Title panel for the header of the application
#'
#' Used to embed the header within the body of the application
#'
#' @param left The title text for the header
#' @param right Content to include on the top right corner
#' @param link Hyperlink to navigate when clicked
#'
#' @return An HTML containing elements to insert in a title
#'
#' @examples
#' if (interactive()) {
#'   titlePanel(
#'     left = "Sample App Title",
#'     right = shiny::div("Image/logo", shiny::icon("trash"))
#'   )
#'   }
#'
#' @export
titlePanel <- function(left = "Sample Tile", right = NULL, link = "#") {
  tags$header(
    class = "page-header", role = "banner",

    # logo section
    div(
      class = "page-logo",
      tags$a(
        href = link, class = "page-logo-link press-scale-down d-flex align-items-center position-relative", `data-toggle` = "modal", `data-target` = "#modal-shortcut",
        span(class = "page-logo-text mr-1", "Sidebar"),
        span(class = "position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"),
        tags$i(class = "fa fa-signature d-inline-block ml-1 fs-lg color-primary-300")
      )
    ),


    # nav menu section
    div(
      class = "hidden-md-down dropdown-icon-menu position-relative d-none will be added in next version",
      tags$a(
        href = "#", class = "header-btn btn js-waves-off", `data-action` = "toggle", `data-class` = "nav-function-hidden", title = "Hide Navigation",
        tags$i(class = "fa fa-bars")
      ),
      tags$ul(
        tags$li(
          tags$a(
            href = "#", class = "btn js-waves-off", `data-action` = "toggle", `data-class` = "nav-function-minify", title = "Minify Navigation",
            tags$i(class = "fa fa-grid")
          )
        ),
        tags$li(
          tags$a(
            href = "#", class = "btn js-waves-off", `data-action` = "toggle", `data-class` = "nav-function-minify", title = "Lock Navigation",
            tags$i(class = "fa fa-lock")
          )
        )
      )
    ),
    # left side
    tags$h2(
      class = "mr-auto d-flex",
      left
    ),


    # mobile button, will be further developed in next versio
    div(
      class = "hidden-lg-up d-none",
      tags$a(
        href = "#", class = "header-btn btn press-scale-down", `data-action` = "toggle", `data-class` = "mobile-nav-on",
        tags$i(class = "ni ni-menu")
      )
    ),

    # right bar
    div(
      class = "ml-auto d-none d-md-flex",
      right
    )
  )
}

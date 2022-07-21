#' Create an advanced tabset
#'
#' Advanced tabset panel with styles and functionalities
#'
#' @param ... Content of the tabset, created using the tabPanel for each individual item
#' @param type Type of tabset to create, choices include "default","pills","clean","jPills","justified"
#' @param border Include a board for the tabset, TRUE or FALSE
#' @param justified Justify tab headers, TRUE or FALSE
#' @param position position of the tabs, choices include "left","end","center"
#'
#' @note Many examples exist for the tabset, fid them using the package load.example function
#'
#' @return An HTML containing elements of a tabset to be embedded in a page
#'
#' @examples
#' \donttest{
#' if (interactive()) {
#'   library(shiny)
#'   library(nextGenShinyApps)
#'   tab2 <- tabPanel("Summary", "SAMPLE nunc.")
#'   tab3 <- tabPanel("Tab 3", "aoreet sit amet.")
#'   tab4 <- tabPanel("Tab 4", "Vulputate pulvinar")
#'
#'
#'   shiny::shinyApp(
#'     ui = fluidPage(
#'       style = "8",
#'       custom.bg.color = "rgb(110,134,032)",
#'       sidebar = NULL,
#'       header = NULL,
#'       tabsetPanel(
#'         tab2,
#'         tab3,
#'         type = "pills",
#'         justified = TRUE
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
#'
tabsetPanel <- function(..., type = c("default", "pills", "clean", "jPills", "justified"), border = TRUE, justified = FALSE, position = c("left", "end", "center")) {

  # get the type of tabset
  type <- match.arg(type)

  # insert class based on the tabset
  type.class <- switch(type,
    "default" = {
      "  nav-tabs"
    },
    "pills" = {
      "  nav-pills"
    },
    "clean" = {
      " nav-tabs nav-tabs-clean"
    },
    "jPills" = {
      " nav-pills nav-justified"
    },
    "justified" = {
      " nav-tabs nav-fill"
    }
  )

  justified.class <- switch(justified,
    " nav-justified",
    ""
  )
  if (justified) position <- "none"


  tabItems <- list(...)
  count.pre <- as.integer(Sys.time()) - rand.num(1)
  count.title <- 0
  part.title <- ""
  part.content <- ""
  for (tab in tabItems) {
    count.title <- count.title + 1
    activeOrNot <- ifelse(count.title == 1, " active", "")
    # for title
    part.title <- paste0(part.title, tags$li(
      class = "nav-item",
      tags$a(
        class = paste0("nav-link", activeOrNot), `data-toggle` = "tab", href = paste0("#tab_justified-", count.pre, count.title), role = "tab",
        tab$title
      )
    ))

    # for content
    part.content <- paste0(part.content, div(
      class = paste0("tab-pane fade show", activeOrNot), id = paste0("tab_justified-", count.pre, count.title), role = "tabpanel",
      tab$content
    ))
  }


  if (border) {
    div(
      class = "panel",
      div(
        class = "panel-container show",
        div(
          class = "panel-content",
          tags$ul(
            class = paste0("nav", type.class, " justify-content-", position, justified.class), role = "tablist",
            HTML(part.title)
          ),
          div(
            class = "tab-content p-3",
            HTML(part.content)
          )
        )
      )
    )
  } else {
    div(
      tags$ul(
        class = paste0("nav", type.class, " justify-content-", position, justified.class), role = "tablist",
        HTML(part.title)
      ),
      div(
        class = "tab-content p-3",
        HTML(part.content)
      )
    )
  }
}


#' Create a tab panel item
#'
#' Create a tab panel item that is enclosed by a tabsetPanel
#'
#' @param title title of the tab
#' @param ... content of the tab
#'
#' @return An list containing the title and content of a tab
#'
#' @examples
#' if (interactive()) {
#' tabPanel("Summary", "Convallis aesus.")
#' tabPanel("Summary", "nextGenShinyAppss.")
#' }
#'
#' @export
#'
#'
tabPanel <- function(title, ...) {
  list(title = title, content = div(...))
}

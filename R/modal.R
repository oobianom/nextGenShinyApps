#' Generate a modal box
#'
#' Advanced modal dialog that allows various positioning and transparency
#'
#' @importFrom shiny restoreInput
#' @param ... The elements to include within the body of the modal
#' @param title The text to display in the header title
#' @param footer Footer list of buttons or text
#' @param size The size of the modal, "m", "s", "l", "xl"
#' @param easyClose Allow simple closing, \code{FALSE} or \code{TRUE}
#' @param fade Allow fading away or fadin in, \code{FALSE} or \code{TRUE}
#' @param position Set the position of the modal. Choices include "centered","left","right","top","bottom"
#' @param transparent Allow background transparency, \code{FALSE} or \code{TRUE}
#'
#' @note For more information on the features of the card, visit the examples section of the help documentation
#'
#' @return An HTML containing elements of a modal box that remains hidden until a button is clicked
#' @examples
#' \donttest{
#' if (interactive()) {
#'   library(shiny)
#'   library(nextGenShinyApps)
#'   shiny::shinyApp(
#'     ui = fluidPage(
#'       style = "8",
#'       custom.bg.color = "white",
#'       sidebar = NULL,
#'       header = NULL,
#'       shiny::h3("Modal EXAMPLES"),
#'       shiny::div(actionButton("obianom1", "Show BIG shiny modal on the RIGHT")),
#'       shiny::br(),
#'       shiny::div(actionButton("obianom2", "Show SMALL shiny modal on the RIGHT"))
#'     ),
#'     server = function(input, output) {
#'       shiny::observeEvent(input$obianom1, {
#'         shiny::showModal(modalDialog(
#'           textInput("dataset", "Enter a data set"),
#'           shiny::div("Id leo in vitae"),
#'           size = "l",
#'           position = "bottom",
#'         ))
#'       })
#'       shiny::observeEvent(input$obianom2, {
#'         shiny::showModal(modalDialog(
#'           textInput("dataset", "Enter a data set"),
#'           shiny::div("Lorem donec massa"),
#'           size = "l",
#'           position = "right",
#'         ))
#'       })
#'     }
#'   )
#' }
#' }
#' @export

modalDialog <- function(..., title = NULL, footer = modalButton("Dismiss"),
                        size = c("m", "s", "l", "xl"), easyClose = FALSE, fade = TRUE, position = c("centered", "left", "right", "top", "bottom"), transparent = FALSE) {
  position <- match.arg(position)
  size <- match.arg(size)
  backdrop <- if (!easyClose) {
    "static"
  }
  keyboard <- if (!easyClose) {
    "false"
  }
  div(
    id = "shiny-modal", class = "modal", class = if (fade) {
      "fade"
    }, tabindex = "-1", `data-backdrop` = backdrop,
    `data-bs-backdrop` = backdrop, `data-keyboard` = keyboard,
    `data-bs-keyboard` = keyboard, div(
      class = "modal-dialog",
      class = paste0("modal-dialog-", position), # add position
      class = ifelse(transparent, "modal-transparent text-white", ""), # add transparency
      class = switch(size,
        s = "modal-sm",
        m = NULL,
        l = "modal-lg",
        xl = "modal-xl"
      ), div(
        class = "modal-content",
        if (!is.null(title)) {
          div(class = "modal-header", tags$h4(
            class = "modal-title",
            title
          ))
        }, div(class = "modal-body", ...),
        if (!is.null(footer)) {
          div(class = "modal-footer", footer)
        }
      )
    ), tags$script(HTML("if (window.bootstrap && !window.bootstrap.Modal.VERSION.match(/^4\\./)) {\n         var modal = new bootstrap.Modal(document.getElementById('shiny-modal'));\n         modal.show();\n      } else {\n         $('#shiny-modal').modal().focus();\n      }"))
  )
}






#' Create hyperlink modal section that appears ONLY when the sidebar logo is clicked
#'
#' Additional tab section for additional links
#'
#' @param ... The list of tabs to include
#'
#' @return An HTML containing elements of links to be inserted in the header of a page
#' @examples
#' if (interactive()) {
#' list1 <- list(
#'   title = "Home", icon = shiny::icon("home"),
#'   link = "https://google.com"
#' )
#' list2 <- list(
#'   title = "Docs", icon = shiny::icon("folder"),
#'   link = "https://obi.obianom.com"
#' )
#'
#' modal.header(list(list1, list2))
#' }
#'
#' @export
#'
modal.header <- function(...) {
  Items <- list(...)
  content <- ""
  for (item in Items) {
    content <- paste0(content, tags$li(
      tags$a(
        href = item$link, class = "app-list-item text-white border-0 m-0",
        div(
          class = "icon-stack",
          tags$i(class = "base base-7 icon-stack-3x opacity-100 color-primary-500 "),
          tags$i(class = "base base-7 icon-stack-2x opacity-100 color-primary-300 "),
          tags$span(class = "icon-stack-1x opacity-100 color-white", list(item$icon))
        ),
        tags$span(class = "app-list-name", item$title)
      )
    ))
  }

  div(
    class = "modal fade modal-backdrop-transparent", id = "modal-shortcut", tabindex = "-1", role = "dialog", `aria-labelledby` = "modal-shortcut", `aria-hidden` = "true",
    div(
      class = "modal-dialog modal-dialog-top modal-transparent", role = "document",
      div(
        class = "modal-content",
        div(
          class = "modal-body",
          tags$ul(
            class = "app-list w-auto h-auto p-0 text-left",
            content
          )
        )
      )
    )
  )
}

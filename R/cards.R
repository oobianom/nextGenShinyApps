#' Generate a flexible and extensible content container
#'
#' Widely used Bootstrap feature with improvements to allow collapse, minimize and closing
#'
#' @param ... The elements to include within the body of the card
#' @param title The text to display in the header title
#' @param collapsed If \code{TRUE}, the card is collapsed. The default is \code{FALSE}
#' @param bg.fade If \code{TRUE}, the background will be faded if a background exists
#' @param width Select a width from 1 to 12 to indicate the size of the card
#' @param alert.text Enter text for the alert portion. Leave as NULL to exclude the alert
#' @param alert.bg Indicate the type of alert to include, choices are "primary", "warning", "secondary", "info", "success", "danger"
#' @param toolbar The default is NULL, which means all toolbar will be displayed use this to set what toolbar to show.
#' @param header If \code{FALSE}, the header will be excluded
#' @param draggable If \code{FALSE}, the card will not be draggable
#'
#' @note For more information on the features of the card, visit the examples section of the help documentation
#' @return HTML code of the container with a class called card that holds the items
#'
#' @examples
#' if (interactive()) {
#'  card(
#'    title = "Standard card",
#'    collapsed = TRUE,
#'    alert.text = "An alert for the content",
#'    alert.bg = "warning",
#'    toolbar = list(collapse = TRUE,
#'    maximize = TRUE, close = FALSE, menu = TRUE),
#'    shiny::h3("Sample text"),
#'    "Lorem ipsum dolor sit a"
#'  )
#'  }
#' @export

card <- function(...,title = "Standard Card",  collapsed = FALSE, bg.fade = TRUE, width = 12, alert.text = NULL, alert.bg = c("primary", "warning", "secondary", "info", "success", "danger"), toolbar = NULL, header = TRUE, draggable = TRUE) {
  add.collapsed.01 <- ifelse(collapsed, " panel-collapsed ", "")
  alert.bg <- match.arg(alert.bg)
  if (collapsed) {
    add.collapsed.01 <- " panel-collapsed"
    add.collapsed.02 <- " collapse"
  } else {
    add.collapsed.01 <- ""
    add.collapsed.02 <- " collapse show"
  }
  bg.fader <- ifelse(bg.fade, " bg-subtlelight-fade ", "")
  num <- as.integer(Sys.time()) + rand.num(1)

  draggable.class <- ifelse(draggable," panel-sortable","")
  content.main <- div(
    id = paste0("box", num),
    class = paste0("panel",draggable.class, add.collapsed.01),
    role = "widget",
    # header
    if (header) {
      div(
        class = "panel-hdr", role = "heading",
        h2(class = "js-get-date ui-sortable-handle", tags$b(title)),
        div(
          class = "panel-saving mr-2", style = "display:none",
          tags$i(class = "fa fa-spinner fa-spin-4x fs-xl")
        ),
        setup.toolbar.buttons(toolbar),
        setup.toolbar.menu(toolbar)
      )
    },


    # alert
    div(
      class = paste0("panel-container", add.collapsed.02), role = "content",
      div(
        class = "loader",
        tags$i(class = "fa fa-spinner-third fa-spin-4x fs-xxl")
      ),
      if (!is.null(alert.text)) {
        div(
          class = "panel-content p-0 mb-g",
          div(
            class = paste0("alert alert-", alert.bg, " alert-dismissible fade show border-faded border-left-0 border-right-0 border-top-0 rounded-0 m-0"),
            role = "alert",
            tags$button(
              type = "button", class = "close", `data-dismiss` = "alert", `aria-label` = "Close",
              tags$span(
                `aria-hidden` = "true",
                tags$i(class = "fa fa-times")
              )
            ), tags$strong(
              HTML(alert.text)
            )
          )
        )
      },
      # body
      div(
        class = "panel-content",
        ...
      )
    )
  )
  if (draggable) {
    sortablegrid(width = width, content.main)
  } else {
    column(width = width, content.main)
  }
}



#' Generate a sortable grid
#'
#' A grid that holds draggable items
#'
#' @param ... The elements to include within the body of the grid
#' @param width The width of the grid
#'
#' @note For more information on the features of a sortable grid, visit the examples section of the help documentation
#' @return HTML code of a container that allows items within it to be draggable
#'
#' @examples
#'  sortablegrid("item1",width=12)
#' @export
sortablegrid <- function(..., width = 6) {
  width <- as.integer(width)
  if (width < 1) width <- 1
  shiny::div(class = paste0("col-12 col-md-", width, " p-0 sortable-grid ui-sortable"), ...)
}

#' Generate toolbar buttons
#'
#' Use within a card to display toolbar
#'
#' @param ... The list of buttons to display
#'
#' @note For more information on the features of a toolbar within a card, visit the examples section of the help documentation
#' @return HTML code of a container containing items to be inserted in the toolbar
#'
#' @examples
#' \donttest{
#'  setup.toolbar.buttons(list(maximize=TRUE,collapse=TRUE,close=TRUE))
#'  }
#' @export
setup.toolbar.buttons <- function(...) {
  show.collapse <- 1
  show.maximize <- 1
  show.close <- 1

  if (!is.null(...)) {

    # check if its logical, if so - TRUE or FALSE
    if (is.logical(...)) {
      if (!as.logical(...)) {
        show.collapse <- 0
        show.maximize <- 0
        show.close <- 0
      }
    } else {
      if (is.list(...)) {
        need.0 <- list(collapse = 0, maximize = 0, close = 0)
        need.1 <- c(...)
        need <- append(need.1, need.0)
        if (!as.logical(need$collapse)) show.collapse <- 0
        if (!as.logical(need$maximize)) show.maximize <- 0
        if (!as.logical(need$close)) show.close <- 0
      } else {
        warning("Must use a list to declare the toolbars needed.")
      }
    }
  }
  shiny::div(
    class = "panel-toolbar", role = "menu",
    if (show.collapse) {
      tags$a(
        href = "#", class = "btn btn-panel hover-effect-dot js-panel-collapse waves-effect waves-themed",
        `data-toggle` = "tooltip", `data-offset` = "0,10", `data-original-title` = "Collapse"
      )
    },
    if (show.maximize) {
      tags$a(
        href = "#", class = "btn btn-panel hover-effect-dot js-panel-fullscreen waves-effect waves-themed",
        `data-toggle` = "tooltip", `data-offset` = "0,10", `data-original-title` = "Fullscreen"
      )
    },
    if (show.close) {
      tags$a(
        href = "#", class = "btn btn-panel hover-effect-dot js-panel-close waves-effect waves-themed",
        `data-toggle` = "tooltip", `data-offset` = "0,10", `data-original-title` = "Close"
      )
    }
  )
}

#' Generate toolbar menu
#'
#' Use within a card to display menu
#'
#' @param ... The list declaring whether to show menu
#'
#' @note For more information on the features of a toolbar within a card, visit the examples section of the help documentation
#' @return HTML code of a container containing menu to be inserted in the toolbar if declared TRUE
#'
#' @examples
#' \donttest{
#'  setup.toolbar.menu(list(menu=TRUE))
#'  }
#' @export
setup.toolbar.menu <- function(...) {
  show.menu <- 1

  if (!is.null(...)) {

    # check if its logical, if so - TRUE or FALSE
    if (is.logical(...)) {
      if (!as.logical(...)) {
        show.menu <- 0
      }
    } else {
      if (is.list(...)) {
        need.0 <- list(menu = 0)
        need.1 <- c(...)
        need <- append(need.1, need.0)
        if (!as.logical(need$menu)) show.menu <- 0
      } else {
        warning("Must use a list to declare if the menu is needed.")
      }
    }
  }
  if (show.menu) {
    div(
      class = "panel-toolbar", role = "menu",
      tags$a(
        href = "#", class = "btn btn-toolbar-master waves-effect waves-themed",
        `data-toggle` = "dropdown",
        tags$i(class = "fa fa-ellipsis-v")
      ),
      div(
        class = "dropdown-menu dropdown-menu-animated dropdown-menu-right p-0",
        tags$a(
          href = "#", class = "dropdown-item js-panel-refresh",
          tags$span(`data-i18n` = "drpdwn.refreshpanel", "Refresh Content")
        ),
        tags$a(
          href = "#", class = "dropdown-item js-panel-locked",
          tags$span(`data-i18n` = "drpdwn.lockpanel", "Lock Position")
        ),
        div(
          class = "dropdown-multilevel dropdown-multilevel-left",
          div(class = "dropdown-item", tags$span(`data-i18n` = "drpdwn.panelcolor", "Panel Style")),
          div(
            class = "dropdown-menu d-flex flex-wrap", style = "min-width: 9.5rem; width: 9.5rem; padding: 0.5rem",
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-primary-700 bg-success-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-primary-700 bg-success-gradient", style = "margin:1px;"
            ),
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-primary-500 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-primary-500 bg-info-gradient", style = "margin:1px;"
            ),
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-primary-600 bg-primary-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-primary-600 bg-primary-gradient", style = "margin:1px;"
            ),
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-info-600 bg-primray-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-info-600 bg-primray-gradient", style = "margin:1px;"
            ),
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-info-600 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-info-600 bg-info-gradient", style = "margin:1px;"
            ),
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-info-700 bg-success-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-info-700 bg-success-gradient", style = "margin:1px;"
            ),
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-success-900 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-success-900 bg-info-gradient", style = "margin:1px;"
            ),
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-success-700 bg-primary-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-success-700 bg-primary-gradient", style = "margin:1px;"
            ),
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-success-600 bg-success-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-success-600 bg-success-gradient", style = "margin:1px;"
            ),
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-danger-900 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-danger-900 bg-info-gradient", style = "margin:1px;"
            ),
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-fusion-400 bg-fusion-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-fusion-400 bg-fusion-gradient", style = "margin:1px;"
            ),
            tags$a(
              href = "#",
              class = "btn d-inline-block bg-faded width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed",
              `data-panel-setstyle` = "bg-faded", style = "margin:1px;"
            )
          )
        ),
        div(class = "dropdown-divider m-0"),
        tags$a(
          href = "#", class = "dropdown-item js-panel-reset",
          tags$span(`data-i18n` = "drpdwn.resetpanel", "Reset Panel")
        )
      )
    )
  } else {
    return(NULL)
  }
}

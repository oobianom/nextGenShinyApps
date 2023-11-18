#' Generate an accordion
#'
#' Wrap one or more accordion items into a container
#'
#' @param ... The accordionItem elements to include within the body of the particular accordion
#' @param id The identification of the accordion
#' @param style Style of the accordion, use "default", "1", "2", "3", "4"
#' @param uncollapsed Indicate by number which accordionItem should not be collapsed
#' @return HTML of a container with a class called accordion
#' @examples
#' \donttest{
#' # Example 1
#' if (interactive()) {
#'   library(shiny)
#'   library(nextGenShinyApps)
#'
#'   shiny::shinyApp(
#'     ui = fluidPage(
#'       style = "8",
#'       custom.bg.color = "#d9d9d9",
#'       sidebar = NULL,
#'       header = titlePanel(left="Sample Ex1"),
#'       accordion(
#'         id = "accordion5",
#'         style = "4",
#'         accordionItem(
#'           title = "Accordion 1",
#'           "Massa sed elementum sus"
#'         ),
#'         accordionItem(
#'           title = "Accordion 2",
#'           "Auctor neque etiam non."
#'         )
#'       )
#'     ),
#'     server = function(input, output) {
#'     }
#'   )
#' }
#'
#' # Example 2
#' if (interactive()) {
#'   library(shiny)
#'   library(nextGenShinyApps)
#'
#'   shiny::shinyApp(
#'     ui = fluidPage(
#'       style = "8",
#'       custom.bg.color = "#f7c4bb",
#'       sidebar = NULL,
#'       header = titlePanel(left="Sample Ex2"),
#'       accordion(
#'         id = "accordion5",
#'         style = "1",
#'         accordionItem(
#'           title = "Accordion A",
#'           icon = shiny::icon("trash"),
#'           "Massa sed elementum sus"
#'         ),
#'         accordionItem(
#'           title = "Accordion B",
#'           icon = shiny::icon("edit"),
#'           "Auctor neque etiam non."
#'         )
#'       )
#'     ),
#'     server = function(input, output) {
#'     }
#'   )
#' }
#'
#' @export
#'

accordion <- function(..., id, style = c("default", "1", "2", "3", "4"), uncollapsed = 1) {
  accordian.parent <- paste0("id", id, rand.num(1))
  accordian.parent <- gsub("[^[:alnum:] ]", "", accordian.parent)
  # get the type of tabset
  style <- match.arg(style)

  # insert class based on the tabset
  top.side <- ""
  right.side <- ""
  hover <- FALSE
  switch(style,
    "default" = {
      left.side <- ""
    },
    "1" = {
      left.side <- tags$span(
        class = "ml-auto",
        tags$span(
          class = "collapsed-reveal",
          tags$i(class = "fa fa-minus-circle text-danger fs-xl")
        ),
        tags$span(
          class = "collapsed-hidden",
          tags$i(class = "fa fa-plus-circle text-success fs-xl")
        )
      )
    },
    "2" = {
      left.side <- tags$span(
        class = "ml-auto",
        tags$span(
          class = "collapsed-reveal",
          tags$i(class = "fa fa-minus fs-xl")
        ),
        tags$span(
          class = "collapsed-hidden",
          tags$i(class = "fa fa-plus fs-xl")
        )
      )
      top.side <- "accordion-outline"
    },
    "3" = {
      left.side <- ""
      right.side <- tags$span(
        class = "mr-2",
        tags$span(
          class = "collapsed-reveal",
          tags$i(class = "fa fa-minus fs-xl")
        ),
        tags$span(
          class = "collapsed-hidden",
          tags$i(class = "fa fa-plus fs-xl")
        )
      )
      top.side <- "accordion-clean"
    },
    "4" = {
      left.side <- tags$span(
        class = "ml-auto",
        tags$span(
          class = "collapsed-reveal",
          tags$i(class = "fa fa-chevron-up fs-xl")
        ),
        tags$span(
          class = "collapsed-hidden",
          tags$i(class = "fa fa-chevron-down fs-xl")
        )
      )
      hover <- TRUE
    }
  )


  tabItems <- list(...)
  count.pre <- as.integer(Sys.time()) - rand.num(1)
  count.title <- 0
  part.content <- ""
  collapsed.num <- 1
  # loop through the items of the accordian
  for (tab in tabItems) {
    count.title <- count.title + 1
    activeOrNot <- ifelse(count.title == 1, " active", "")
    collapsed.1 <- ifelse(as.integer(uncollapsed) == collapsed.num, TRUE, FALSE)
    # for content
    part.content <- paste0(
      part.content,
      div(
        class = "card", div(
          class = "card-header",
          class = paste0("bg-", tab$status),
          tags$a(
            href = "javascript:void(0);", class = "card-title", class = ifelse(!collapsed.1, "collapsed", ""), `data-toggle` = "collapse", `data-target` = paste0("#", tab$id), `aria-expanded` = tolower(as.character(collapsed.1)),
            if (style == "3") {
              right.side
            } else {
              if (typeof(tab$icon) == "list") {
                tags$span(class = "width-2 fs-xl", list(tab$icon))
              } else {
                ""
              }
            },
            tab$title,
            left.side
          )
        ),
        div(
          id = tab$id, class = "collapse", class = ifelse(collapsed.1, "show", ""), `data-parent` = paste0("#", accordian.parent),
          div(
            class = "card-body",
            tab$content
          )
        )
      )
    )
    collapsed.num <- 1 + collapsed.num
  }

  div(
    class = "accordion",
    class = top.side,
    class = ifelse(hover, "accordion-hover", ""),
    id = accordian.parent,
    HTML(part.content)
  )
}

#' Generate an accordion item
#'
#' Embed an accordion item within an accordion
#'
#' @param ... The elements to include within the body of the particular accordion
#' @param title The title of the accordion item
#' @param status Set the header background using either of "default", "primary", "secondary", "info", "success", "danger", "warning"
#' @param icon Include an icon to the left of the title for the accordion item
#' @return A list of properties for an accordion item
#' @examples
#' if (interactive()) {
#' accordionItem(
#'   title = "Accordion 2",
#'   icon = shiny::icon("cog"),
#'   "Auctor neque etiam non."
#' )
#' }
#'
#' @export
#'
#'
accordionItem <- function(..., title = "A title", status = c("default", "primary", "secondary", "info", "success", "danger", "warning"), icon = NULL) {
  status <- match.arg(status)
  accordianid <- paste0("accordion1a", rand.num(1))
  list(title = title, id = accordianid, status = status, content = div(...), icon = icon)
}

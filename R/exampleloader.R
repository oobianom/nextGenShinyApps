#' Load examples for the package
#'
#' Example shiny applications spanning aspects of the package
#'
#' @param example choose the example to show - "Plain","noSideBar","Plotly","Rhansometable", "Card","Tab","Modal","Form","Button","Spinner","Alert","Accordion"
#'
#' @section Options for example:
#' "Plain", "noSideBar","Plotly","Rhansometable", "Card", "Tab", "Modal", "Form", "Button", "Spinner", "Alert", "Accordion"
#'
#'
#' @return A rendered HTML of the user specified example file
#' @examples
#' \donttest{
#' if (interactive()) {
#' load.example(example = "Card")
#' }
#' }
#'
#' @export

load.example <- function(example = c("Plain", "noSideBar","Plotly","Rhansometable", "Card", "Tab", "Modal", "Form", "Button", "Spinner", "Alert", "Accordion")) {
  example <- match.arg(example)
  loc.path <- template.loc("exp")
  loc.path.file <- paste0(loc.path, "/example.", example, ".R")
  message(paste0("The example code is located at ", loc.path.file))

  if (interactive()) {
  if (any(grepl("package:shiny", search()))) detach("package:shiny") # detach if it is already attached
  if (any(grepl("package:nextGenShinyApps", search()))) detach("package:nextGenShinyApps") # detach if it is already attached
  shiny::runApp(loc.path.file) # run app
  }
}

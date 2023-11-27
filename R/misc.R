#' Generate a row div
#'
#' A simple row div
#'
#' @param ... The elements to include within the body of the row
#'
#' @return An HTML containing elements of a container with class row to be embedded in a page
#' @examples
#' row(shiny::div(width=12,"Hello nextGenShinyApps"))
#' @export
#'
row <- function(...) {
  div(class = "row", ...)
}


#' Include stylesheets and scripts
#'
#' Use the package scripts and stylesheets in a page
#'
#' @param template The template type
#' @param color The numeric style of template
#'
#' @return A list of files to be inserted in the header of a page
#' @examples
#' cssjsinclude('core','3')
#' @export
#'
cssjsinclude <- function(template,color){
  assign('.nGSAscripts',TRUE)
  htmltools::htmlDependency(
    "nextGenShinyApps", "2.0",
    src = template.loc(template),
    script = c("nextgenshinyapps.js"),
    stylesheet = c("nextgenshinyapps.css", paste0("cust-theme-",color,".css")),
    all_files = FALSE
  )
}

#' Nav tag
#'
#' A nav tag for creating HTML navigations
#'
#' @param class The class of the navigation container
#' @param id The identification of the navigation container
#' @param role The character role of the container on the page
#' @param ... The content of the container
#'
#' @return HTML content of a container with type nav
#' @examples
#' nav('sample','id1','sample','some content')
#' @export
#'
nav <- function(class, id = NULL, role = NULL, ...) {
  HTML(paste0("<nav class='", class, "' id='", id, "' role='", role, "'>", ..., "</nav>"))
}


#' Template location full text
#'
#' Fetch the location of the scripts
#'
#' @param template The type of template to fetch
#'
#' @return A path for the location of the package
#' @examples
#' template.loc('core')
#' @export
#'
template.loc <- function(template = "core"){
  file.path(find.package(package = "nextGenShinyApps"),template)
}

#' Random number betwen 1 and 10000
#'
#' One or more random numbers
#'
#' @param num The number of numbers to return
#'
#' @return One or more numbers
#' @examples
#' rand.num(10)
#' @export
#'
rand.num <- function(num){
  sample(1:10000, num)
}

rand.sc13 <-
  as.character(sample(1:13,13))


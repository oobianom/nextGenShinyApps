#' @import shiny
#' @import htmltools
#'

.onLoad <- function(libname, pkgname){

}


.onAttach <- function(libname, pkgname){

}


# drop all the NULL items, adapted from shiny pkg
rmNULL <- function(x) {
  x[!vapply(x, is.null, FUN.VALUE=logical(1))]
}

% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/button.R
\name{masterButton}
\alias{masterButton}
\title{Create a master button}
\usage{
masterButton(
  inputId,
  text = "Text",
  icon = NULL,
  width = NULL,
  size = c("m", "xs", "s", "l", "xl"),
  style = c("default", "pill", "round", "clean"),
  bg.type = c("default", "primary", "secondary", "info", "success", "danger", "warning"),
  outline = FALSE,
  extraClass = NULL,
  ...
)
}
\arguments{
\item{inputId}{input id}

\item{text}{Button text}

\item{icon}{Choice of button icon}

\item{width}{Width of the bottom}

\item{size}{Size of the button, choices include "m","xs", "s", "l", "xl"}

\item{style}{Style of the button, choices include "default", "pill", "round", "clean"}

\item{bg.type}{Color of the button, choices include "default", "primary", "secondary", "info", "success", "danger", "warning"}

\item{outline}{Use an outline styling, TRUE or FALSE}

\item{extraClass}{other class names to add to the button attribute}

\item{...}{Other elements to add to the button}
}
\value{
HTML of the buttons to insert into a page
}
\description{
A master button creator
}
\examples{
if (interactive()) {
card(
  shiny::h2("Master buttons with various styles"),
  header = FALSE,
  shiny::div(masterButton("Submit button with primary color",
    icon = shiny::icon("file"), size = "s", bg.type = "primary"
  ))
)
}
}

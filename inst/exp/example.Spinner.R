# library
library(shiny)
library(nextGenShinyApps)


# Define UI
ui <- fluidPage(
  # Theme: Select color style from 1-13
  style = "8",

  # Header: Insert header content using titlePanel ------------
  header = titlePanel(left = "A Demo to Showcase the Features of the nextGenShinyApp R package", right = "Image logo"),

  # Sidebar: Insert content for sidebar ----------------------
  sidebar = sidebarPanel(
    title = "NextGenShinyApp",

    # sample inputs
    textInput(
      inputId = "caption",
      label = "Caption:",
      value = "Data Summary"
    ),

    # Input: Decimal interval with step value
    sliderInput("decimal", "Decimal:",
      min = 0, max = 1,
      value = 0.5, step = 0.1
    ),

    # Input: Specification of range within an interval
    sliderInput(
      inputId = "bins1",
      label = "Number of bins:",
      min = 1,
      max = 50,
      value = 30
    )
  ),

  # Body: Insert anything into the body--------------------
  tags$h2("Spinners"),
  tags$h4("Standalone spinner functionality for use in customization of an output with the spinner() function"),
  tags$br(), tags$br(),
  row(
    column(
      width = 6,
      card(
        header = FALSE,
        tags$h2("Ring styled loading spinner"),
        alert("Customize to use the ring-like spinners for a lightweight loading indicator by using <code>type = 'ring'</code>, declaring color like <code>color = 'primary'</code>, and declaring size like <code>size = 's'</code>"),
        spinner(type = "ring", size = "s"),
        spinner(type = "ring", color = "primary"),
        spinner(type = "ring", color = "secondary"),
        spinner(type = "ring", color = "success"),
        spinner(type = "ring", color = "warning"),
        spinner(type = "ring", color = "danger"),
        spinner(type = "ring", color = "info")
      )
    ),
    column(
      width = 6,
      card(
        header = FALSE,
        tags$h2("Growing styled loading spinner"),
        alert("Customize to use the grow spinners for a lightweight loading indicator by using <code>type = 'grow'</code>, declaring color like <code>color = 'primary'</code>, and declaring size like <code>size = 's'</code>"),
        spinner(type = "grow", size = "s"),
        spinner(type = "grow", color = "primary"),
        spinner(type = "grow", color = "secondary"),
        spinner(type = "grow", color = "success"),
        spinner(type = "grow", color = "warning"),
        spinner(type = "grow", color = "danger"),
        spinner(type = "grow", color = "info")
      )
    ),
    column(
      width = 6,
      card(
        header = FALSE,
        tags$h2("Square styled loading spinner"),
        alert("Customize to use the square spinners for a lightweight loading indicator by using <code>type = 'square'</code>, declaring color like <code>color = 'primary'</code>, and declaring size like <code>size = 's'</code>"),
        spinner(type = "square", size = "s"),
        spinner(type = "square", color = "primary"),
        spinner(type = "square", color = "secondary"),
        spinner(type = "square", color = "success"),
        spinner(type = "square", color = "warning"),
        spinner(type = "square", color = "danger"),
        spinner(type = "square", color = "info")
      )
    ),
    column(
      width = 6,
      card(
        header = FALSE,
        tags$h2("Bordered-rectangle styled loading spinner"),
        alert("Customize to use the rect spinners for a lightweight loading indicator by using <code>type = 'rect'</code>, declaring color like <code>color = 'primary'</code>, and declaring size like <code>size = 's'</code>"),
        spinner(type = "rect", size = "s"),
        spinner(type = "rect", color = "primary"),
        spinner(type = "rect", color = "secondary"),
        spinner(type = "rect", color = "success"),
        spinner(type = "rect", color = "warning"),
        spinner(type = "rect", color = "danger"),
        spinner(type = "rect", color = "info")
      )
    )
  )
)

# Define server content
server <- function(input, output) {

  # Sample user-defined sever logic
}

# Create and initialize the Shiny application
shinyApp(ui, server)

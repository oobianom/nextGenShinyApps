# library
library(shiny)
library(nextGenShinyApps)


# Define UI
ui <- fluidPage(
  # Theme: Select color style from 1-13
  style = "4",

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
  tags$h2("Alerts"),
  tags$h4("Flavors of alerts to use in any div with the alert() function"),
  tags$br(), tags$br(),
  row(
    column(
      width = 12,
      card(
        header = FALSE,
        tags$h2("Default alert (not closeable)"),
        alert("Customize the alert display to look like this by using <code>type = 'default'</code> and <code>color = 'none'</code>"),
        alert("Customize the alert display to look like this by using <code>type = 'default'</code> and <code>color = 'primary'</code>", color = "primary"),
        alert("Customize the alert display to look like this by using <code>type = 'default'</code> and <code>color = 'secondary'</code>", color = "secondary"),
        alert("Customize the alert display to look like this by using <code>type = 'default'</code> and <code>color = 'danger'</code>", color = "danger"),
        alert("Customize the alert display to look like this by using <code>type = 'default'</code> and <code>color = 'success'</code>", color = "success"),
        alert("Customize the alert display to look like this by using <code>type = 'default'</code> and <code>color = 'info'</code>", color = "info")
      )
    ),
    column(
      width = 12,
      card(
        header = FALSE,
        tags$h2("Standard alert (closeable)"),
        alert("Customize the alert display to look like this by using <code>type = 'standard'</code> and <code>color = 'primary'</code>", type = "standard", color = "primary"),
        alert("Customize the alert display to look like this by using <code>type = 'standard'</code> and <code>color = 'secondary'</code>", type = "standard", color = "secondary"),
        alert("Customize the alert display to look like this by using <code>type = 'standard'</code>, <code>color = 'secondary'</code> and <code>outline = TRUE</code>", type = "standard", color = "secondary", outline = TRUE),
        alert("Customize the alert display to look like this by using <code>type = 'standard'</code>, <code>color = 'danger'</code> , <code>outline = TRUE</code> and <code>close = TRUE</code>", type = "standard", color = "danger", outline = TRUE, close = TRUE),
        alert("Customize the alert display <u>with a closer</u> to look like this by using <code>type = 'standard'</code>, with color <code>color = 'none'</code> and <code>close = TRUE</code>", type = "standard", close = TRUE),
        alert("Customize the alert display <u>with and ICON</u> to look like this by using <code>type = 'standard'</code>, with color <code>color = 'primary'</code> and <code>icon = icon(ICONTYPE)</code>", type = "standard", color = "primary", icon = icon("info"))
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

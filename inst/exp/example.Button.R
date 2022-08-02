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
  tags$h2("Buttons"),
  tags$h4("Revisions to various buttons that adds more functionality with the submitButton() or actionButton() functions"),
  tags$br(), tags$br(),
  row(
    column(
      width = 6,
      card(
        tags$h2("Buttons with various styles"),
        header = FALSE,
        div(submitButton("Submit button with primary color", icon = icon("file"), size = "s", bg.type = "primary")), br(),
        div(actionButton("buttoxxn", "Action button with primary color", icon = icon("code"), bg.type = "primary")), br(),
        div(submitButton("Secondary color", icon = icon("folder"), bg.type = "secondary")), br(),
        div(submitButton("Success color", icon = icon("filter"), bg.type = "success")), br(),
        div(submitButton("Warning color", icon = icon("grid"), bg.type = "warning")), br(),
        div(submitButton("Danger color", icon = icon("check"), bg.type = "danger")), br(),
        div(submitButton("Info color", icon = icon("trash"), bg.type = "info")), br()
      )
    ),
    column(
      width = 6,
      card(
        tags$h2("Buttons with various sizes"),
        header = FALSE,
        div(submitButton("Smaller", icon = icon("alert"), size = "xs")), br(),
        div(submitButton("Small size", icon = icon("bar"), size = "s")), br(),
        div(submitButton("Medium size", icon = icon("folder"), size = "m")), br(),
        div(submitButton("Large size", icon = icon("filter"), size = "l")), br(), br(),
        tags$h2("Buttons with or without outline"),
        div(submitButton("No outline", icon = icon("pen"), bg.type = "success", outline = FALSE)), br(),
        div(submitButton("Outline", icon = icon("user"), bg.type = "success", outline = TRUE)), br(),
        HTML('<a href="#" class="text-info fw-500" data-toggle="tooltip" title="" data-original-title="Default tooltip">you probably</a>')
      )
    ),
    column(
      width = 12,
      card(
        tags$h2("Buttons with styling of edges"),
        header = FALSE,
        (submitButton("Default", icon = icon("lock"), size = "l")), br(),
        (submitButton("Default with outline", icon = icon("lock"), outline = TRUE, bg.type = "danger")), br(), br(),
        (submitButton("Pill", icon = icon("check"), size = "l", style = "pill")), br(),
        (submitButton("Pill with outline", icon = icon("check"), size = "l", style = "pill", outline = TRUE, bg.type = "secondary")), br(), br(),
        (submitButton("Clean", icon = icon("refresh"), style = "clean")), br(),
        submitButton("Clean", icon = icon("refresh"), style = "clean", outline = TRUE, bg.type = "secondary"), br(), br(),
        "Round with just an icon, with and without outline", br(),
        actionButton("button", "", icon = icon("home"), style = "round"), br(), br(),
        actionButton("button", "", icon = icon("home"), style = "round", outline = TRUE, bg.type = "primary"), br(), br()
      )
    )
  )
)

# Define server content
server <- function(input, output,session) {

  # Sample user-defined sever logic
}

# Create and initialize the Shiny application
shinyApp(ui, server)

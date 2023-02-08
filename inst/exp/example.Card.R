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
      inputId = "range", label = "Range:",
      min = 1, max = 1000,
      value = c(200, 500)
    )
  ),

  # Body: Insert anything into the body--------------------
  tags$h2("Basic Moveable Advanced Card"),
  tags$h4("Each card includes a header title and toolbar to minimize, expand, close, lock, refresh, color and reset it"),
  tags$li("Notice that by default, each card is moveable from one location to another"),
  tags$li("Try this: move the two cards to different locations and refresh the page. The cards will remain in the new location."),
  tags$li("Create a Shiny app that allows the user to easily move the panels around and easily collapse them when needed. Plus, the user's actions are saved!"),
  tags$br(), tags$br(),
  row(
    column(
      width = 8,
      card(
        title = "Standard card with text and a slider",
        # card body content
        tags$h4("Sample text"),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas",
        tags$br(), tags$br(),
        tags$h4("Input slider for the image"),
        sliderInput(
          inputId = "bins",
          label = "Number of bins:",
          min = 1,
          max = 50,
          value = 30
        )
      )
    ),
    column(
      width = 4,
      card(
        title = "Standard card with Images",
        plotOutput(outputId = "distPlot")
      )
    )
  ),
  tags$h2("Moveable Advanced Card With One Toolbar Button"),
  row(
    column(
      width = 4,
      card(
        title = "Card with only a collapse",
        # card body content
        tags$h4("Sample text"),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas",
        toolbar = list(collapse = TRUE),
        alert.text = "Realize that this card contains only the collapse button on the top right just by using a declaration of <code>toolbar = list(collapse = TRUE)</code> or <code>toolbar = list(collapse = 1)</code>"
      )
    ),
    column(
      width = 4,
      card(
        title = "Card with only a closer",
        # card body content
        tags$h4("Sample text"),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas",
        toolbar = list(close = TRUE),
        alert.text = "Realize that this card contains only the close button on the top right just by using a declaration of <code>toolbar = list(close = TRUE)</code> or <code>toolbar = list(close = 1)</code>"
      )
    ),
    column(
      width = 4,
      card(
        title = "Card with only an extend and menu",
        # card body content
        tags$h4("Sample text"),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas",
        toolbar = list(maximize = TRUE, menu = TRUE),
        alert.text = "Realize that this card contains an extend and menu buttons on the top right just by using a declaration of <code>toolbar = list(maximize = TRUE, menu = TRUE)</code>",
        alert.bg = "success"
      )
    ),
    column(
      width = 6,
      card(
        title = "Card with no toolbar, with alert",
        # card body content
        tags$h4("Sample text"),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas",
        toolbar = FALSE,
        alert.text = "Realize that this card contains no toolbar buttons on the top right just by using a declaration of <code>toolbar = FALSE</code>",
        alert.bg = "danger"
      )
    ),
    column(
      width = 6,
      card(
        # card body content
        tags$h3("Sample Blank Card"),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas",
        header = FALSE
      )
    )
  ),
  tags$h2("NON-Moveable Advanced Card With One Toolbar Button"),
  row(
    column(
      width = 6,
      card(
        title = "Not moveable card 1",
        # card body content
        tags$h4("Sample text"),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas",
        toolbar = TRUE,
        draggable = FALSE,
        alert.text = "Realize that this card is not moveable by dragging by using a declaration of <code>draggable = FALSE</code>",
        alert.bg = "info"
      )
    ),
    column(
      width = 6,
      card(
        title = "Not moveable card 2",
        # card body content
        tags$h4("Sample text"),
        draggable = FALSE,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas",
        toolbar = FALSE
      )
    )
  )
)

# Define server content
server <- function(input, output) {

  # Sample user-defined sever logic
  output$distPlot <- renderPlot({
    x <- faithful$waiting
    bins <- seq(min(x), max(x), length.out = input$bins + 1)

    hist(x,
      breaks = bins, col = "#75AADB", border = "white",
      xlab = "Waiting time to next eruption (in mins)",
      main = "Histogram of waiting times"
    )
  })
}

# Create and initialize the Shiny application
shinyApp(ui, server)

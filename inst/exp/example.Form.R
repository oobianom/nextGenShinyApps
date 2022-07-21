
# library
library(shiny)
library(nextGenShinyApps)


# Define UI
ui <- fluidPage(
  # Theme: Select color style from 1-13
  style = "6",

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
  tags$h2("Basic Form Items"),
  tags$h4("Revisions to various inputs that adds more functionality"),
  tags$br(), tags$br(),
  row(
    column(
      width = 6,
      card(
        header = FALSE,
        tags$h3("Input styles - style =  “default”, “pill”, “round”, “clean”"),
        textInput("caption", "Default style", "Enter text", style = "default"),
        textInput("caption", "Pill style", "Circular edges", style = "pill"),
        textInput("caption", "Round style", "Rounded edges", style = "round"),
        textInput("caption", "Clean style", "Material style", style = "clean")
      )
    ),
    column(
      width = 6,
      card(
        header = FALSE,
        tags$h3("Prepend text to the input"),
        textInput("caption", "Border - primary", "Enter sample text", prepend = "@"),
        textInput("caption", "Border - primary", "Enter sample text", prepend = icon("lock")),
        textInput("caption", "Border - primary", "Enter sample text", append = "%"),
        textInput("caption", "Border - primary", "Enter sample text", prepend = icon("dollar"), append = ".00")
      )
    ),
    column(
      width = 6,
      card(
        header = FALSE,
        tags$h3("Border color styles - border.type = 'primary', 'warning', 'info', 'success','danger'"),
        textInput("caption", "Border - primary", "Enter sample text", style = "pill", border.type = "primary"),
        textInput("caption", "Border - warning", "Enter sample text", style = "pill", border.type = "warning"),
        textInput("caption", "Border - info", "Enter sample text", style = "pill", border.type = "info"),
        textInput("caption", "Border - success", "Enter sample text", style = "pill", border.type = "success"),
        textInput("caption", "Border - danger", "Enter sample text", style = "pill", border.type = "danger")
      )
    ),
    column(
      width = 6,
      card(
        tags$h2("Input sizes - s (small),m (medium),l(large)"),
        header = FALSE,
        textInput("caption", "Basic", "Sample text..."),
        textInput("caption", "Small text input", "Enter text", size = "s"),
        textInput("caption", "Medium text input", "Enter text", size = "m"),
        textInput("caption", "Large text input", "Enter text", size = "l")
      )
    ),
    column(
      width = 6,
      card(
        tags$h2("Input sizes - s (small),m (medium),l(large)"),
        header = FALSE,
        textInput("caption", "Sample text input:", "Sample text..."),
        textInput("caption", "Sample text input:", "Enter text", size = "l"),
        textInput("caption", "Sample text input:", "Data Summary", size = "l", style = "pill"),
        textInput("caption", "Sample text input:", "Data Summary", size = "l", style = "clean"),
        textInput("caption", "Sample text input:", "Data Summary", size = "l", style = "pill", border.type = "danger"),
        textInput("caption", "Sample text input:", "Data Summary", size = "l", style = "pill", border.type = "info"),
        textAreaInput("caption", "Sample Text area input", "Data Summary", width = "1000px", border.type = "success")
      )
    ),
    column(
      width = 6,
      card(
        tags$h2("Select Inputs"),
        header = FALSE,
        selectInput(
          "variable", "Variable:",
          c(
            "Cylinders" = "cyl",
            "Transmission" = "am",
            "Gears" = "gear"
          )
        ),
        radioButtons(
          "dist", "Distribution type:",
          c(
            "Normal" = "norm",
            "Uniform" = "unif",
            "Log-normal" = "lnorm",
            "Exponential" = "exp"
          )
        ),
        radioButtons(
          "dist", "Distribution type:",
          c(
            "Normal" = "norm",
            "Uniform" = "unif",
            "Log-normal" = "lnorm",
            "Exponential" = "exp"
          )
        ),
        radioButtons(
          "dist", "Distribution type:",
          c(
            "Normal" = "norm",
            "Uniform" = "unif",
            "Log-normal" = "lnorm",
            "Exponential" = "exp"
          )
        ),
        checkboxInput("somevalu7e", "Some value", FALSE),
        checkboxInput("somevalue", "Some value", FALSE),
        checkboxInput("somevalue", "Some value", FALSE),
        numericInput("num", label = "Make changes", value = 1)
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

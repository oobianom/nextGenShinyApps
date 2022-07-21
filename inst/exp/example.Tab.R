# library
library(shiny)
library(nextGenShinyApps)

# tabs to be used
tab1 <- tabPanel(
  "Slider",
  h2("A radio range example"),
  radioButtons(
    "dist", "Distribution type:",
    c(
      "Normal" = "norm",
      "Uniform" = "unif",
      "Log-normal" = "lnorm",
      "Exponential" = "exp"
    )
  ),
  sliderInput(
    inputId = "bins",
    label = "Sample slider to include:",
    min = 1,
    max = 50,
    value = 30
  )
)
tab2 <- tabPanel("Summary", "Convallis aenean et tortor at risus. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc.")
tab3 <- tabPanel("Tab 3", "Eu consequat ac felis donec et odio pellentesque. Egestas pretium aenean pharetra magna ac placerat. Eget velit aliquet sagittis id consectetur purus ut. Aliquet enim tortor at auctor urna nunc id cursus metus. Semper viverra nam libero justo laoreet sit amet.")
tab4 <- tabPanel("Tab 4", "Vulputate mi sit amet mauris commodo quis. Dictum non consectetur a erat nam. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi. Aliquam faucibus purus in massa. Vel orci porta non pulvinar")


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
  tags$h2("Basic Tabset"),
  tags$h4("A tabset that includes features for customizations such as justification, border and choosing between pills and tabs."),
  tags$li("Choose between various styles for your tab"),
  tags$li("Include any content within the tabs simply using the tabsetPanel()"),
  tags$br(), tags$br(),
  row(
    column(
      width = 5,
      tags$h3("Simple tab"),
      HTML("No further argument necessary"),
      tabsetPanel(
        tab1,
        tab2,
        tab3,
        tab4
      )
    ),
    column(
      width = 7,
      tags$h3("Simple tab without a holder"),
      HTML("Use argument <code>border = FALSE </code>"),
      tabsetPanel(
        tab1,
        tab2,
        tab3,
        tab4,
        border = FALSE
      )
    )
  ),
  tags$h2("Tabset Type"),
  tags$h4("Choose between a tab, a pills or a clean tabset"),
  tags$br(), tags$br(),
  row(
    column(
      width = 4,
      tags$h3("Tab setting"),
      HTML("This is the default setup"),
      tabsetPanel(
        tab1,
        tab2,
        tab3
      )
    ),
    column(
      width = 4,
      tags$h3("Pills setting"),
      HTML("Use argument <code>type = 'pills' </code>"),
      tabsetPanel(
        tab1,
        tab2,
        tab3,
        type = "pills"
      )
    ),
    column(
      width = 4,
      tags$h3("Clean setting"),
      HTML("Use argument <code>type = 'clean' </code>"),
      tabsetPanel(
        tab1,
        tab2,
        tab3,
        type = "clean"
      )
    )
  ),
  tags$h2("Tabset Position"),
  tags$h4("A tabset position can be choosen to justify to the left, center, or right (end)"),
  tags$br(), tags$br(),
  row(
    column(
      width = 4,
      tags$h3("Tab Left Position"),
      HTML("Use argument <code>position = 'left' </code>"),
      tabsetPanel(
        tab1,
        tab2,
        tab3,
        position = "left"
      )
    ),
    column(
      width = 4,
      tags$h3("Tab Center Position"),
      HTML("Use argument <code>position = 'center' </code>"),
      tabsetPanel(
        tab1,
        tab2,
        tab3,
        position = "center"
      )
    ),
    column(
      width = 4,
      tags$h3("Tab Right Position"),
      HTML("Use argument <code>position = 'end' </code>"),
      tabsetPanel(
        tab1,
        tab2,
        tab3,
        position = "end"
      )
    )
  ),
  tags$h2("Tabset Justified or Filled"),
  tags$h4("Justify the tab to either fill the space or use the default setting"),
  tags$br(), tags$br(),
  row(
    column(
      width = 6,
      tags$h3("Pill Not Justified"),
      HTML("This is a default pill setup"),
      tabsetPanel(
        tab1,
        tab2,
        tab3,
        type = "pills"
      )
    ),
    column(
      width = 6,
      tags$h3("Pills Justified"),
      HTML("Use argument <code>justified = TRUE </code>"),
      tabsetPanel(
        tab1,
        tab2,
        tab3,
        type = "pills",
        justified = TRUE
      )
    ),
    column(
      width = 6,
      tags$h3("Clean Justified"),
      HTML("Use argument <code>justified = TRUE </code>"),
      tabsetPanel(
        tab1,
        tab2,
        tab3,
        type = "clean",
        justified = TRUE
      )
    ),
    column(
      width = 6,
      tags$h3("Tab Justified"),
      HTML("Use argument <code>justified = TRUE </code>"),
      tabsetPanel(
        tab1,
        tab2,
        tab3,
        type = "default",
        justified = TRUE
      )
    )
  )
)

# Define server content
server <- function(input, output) {

  # Sample user-defined sever logic
}

# Create and initialize the Shiny application
shiny::shinyApp(ui, server)

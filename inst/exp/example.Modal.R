# library
library(shiny)
library(nextGenShinyApps)


# Define UI
ui <- fluidPage(
  # Theme: Select color style from 1-13
  style = "2",

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
  tags$h2("Basic Modal"),
  tags$h4("Revisions to the modal are primarily location and transparency based"),
  tags$li("Use the modalDialog() in the server to choose options for location and transparency"),
  tags$li("Location may be 'top' or 'bottom' or 'left' or 'right' or 'centered'"),
  tags$li("Transparency may be TRUE or FALSE"),
  tags$br(), tags$br(),
  row(
    column(
      width = 4,
      class = "border bg-white p-4",
      tags$h3("Simple shiny modal"),
      div(actionButton("modal1", "Show simple shiny modal dialog")),
      tags$br(),
      div(actionButton("modal1b", "Show modal with transparency"))
    ),
    column(
      width = 4,
      class = "border bg-white p-4",
      tags$h3("Modal on the right"),
      div(actionButton("modal2", "Show BIG shiny modal on the RIGHT")),
      tags$br(),
      div(actionButton("modal2b", "Show SMALL shiny modal on the RIGHT"))
    ),
    column(
      width = 4,
      class = "border bg-white p-4",
      tags$h3("Modal on the left"),
      div(actionButton("modal3", "Show BIG shiny modal on the LEFT")),
      tags$br(),
      div(actionButton("modal3b", "Show SMALL shiny modal on the LEFT"))
    ),
    column(
      width = 4,
      class = "border bg-white p-4",
      tags$h3("Modal on the top"),
      div(actionButton("modal4", "Show BIG shiny modal on the TOP")),
      tags$br(),
      div(actionButton("modal4b", "Show SMALL shiny modal on the TOP"))
    ),
    column(
      width = 4,
      class = "border bg-white p-4",
      tags$h3("Modal at the bottom"),
      div(actionButton("modal5", "Show BIG shiny modal on the BOTTOM")),
      tags$br(),
      div(actionButton("modal5b", "Show SMALL shiny modal on the BOTTOM"))
    )
  )
)

# Define server content
server <- function(input, output) {

  # Sample user-defined sever logic


  # Show modal when MODAL1 button is clicked.
  observeEvent(input$modal1, {
    showModal(modalDialog(
      textInput("dataset", "Enter a data set",
        placeholder = 'Try "mtcars" or "abc"'
      ),
      div("Id leo in vitae turpis massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl tincidunt eget nullam non nisi est sit amet. Lorem donec massa sapien faucibus et molestie. Diam donec adipiscing tristique risus."),
      footer = tagList(
        modalButton("Cancel"),
        actionButton("ok", "OK")
      )
    ))
  })

  # Show modal when MODAL1b button is clicked.
  observeEvent(input$modal1b, {
    showModal(modalDialog(
      textInput("dataset", "Enter a data set",
        placeholder = 'Try "mtcars" or "abc"'
      ),
      div("Id leo in vitae turpis massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl tincidunt eget nullam non nisi est sit amet. Lorem donec massa sapien faucibus et molestie. Diam donec adipiscing tristique risus."),
      footer = tagList(
        modalButton("Cancel"),
        actionButton("ok", "OK")
      ),

      # add extra arguments
      transparent = TRUE
    ))
  })


  # Show modal when MODAL2 button is clicked.
  observeEvent(input$modal2, {
    showModal(modalDialog(
      textInput("dataset", "Enter a data set",
        placeholder = 'Try "mtcars" or "abc"'
      ),
      div("Id leo in vitae turpis massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl tincidunt eget nullam non nisi est sit amet. Lorem donec massa sapien faucibus et molestie. Diam donec adipiscing tristique risus."),
      footer = tagList(
        modalButton("Cancel"),
        actionButton("ok", "OK")
      ),

      # add extra arguments
      size = "s", # small
      position = "right", # position to the right
    ))
  })


  # Show modal when MODAL2b button is clicked.
  observeEvent(input$modal2b, {
    showModal(modalDialog(
      textInput("dataset", "Enter a data set",
        placeholder = 'Try "mtcars" or "abc"'
      ),
      div("Id leo in vitae turpis massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl tincidunt eget nullam non nisi est sit amet. Lorem donec massa sapien faucibus et molestie. Diam donec adipiscing tristique risus."),
      footer = tagList(
        modalButton("Cancel"),
        actionButton("ok", "OK")
      ),

      # add extra arguments
      size = "l", # large
      position = "right", # position to the right
    ))
  })


  # Show modal when MODAL3 button is clicked.
  observeEvent(input$modal3, {
    showModal(modalDialog(
      textInput("dataset", "Enter a data set",
        placeholder = 'Try "mtcars" or "abc"'
      ),
      div("Id leo in vitae turpis massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl tincidunt eget nullam non nisi est sit amet. Lorem donec massa sapien faucibus et molestie. Diam donec adipiscing tristique risus."),
      footer = tagList(
        modalButton("Cancel"),
        actionButton("ok", "OK")
      ),

      # add extra arguments
      size = "s", # small
      position = "left", # position to the left
    ))
  })


  # Show modal when MODAL3b button is clicked.
  observeEvent(input$modal3b, {
    showModal(modalDialog(
      textInput("dataset", "Enter a data set",
        placeholder = 'Try "mtcars" or "abc"'
      ),
      div("Id leo in vitae turpis massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl tincidunt eget nullam non nisi est sit amet. Lorem donec massa sapien faucibus et molestie. Diam donec adipiscing tristique risus."),
      footer = tagList(
        modalButton("Cancel"),
        actionButton("ok", "OK")
      ),

      # add extra arguments
      size = "l", # large
      position = "left", # position to the left
    ))
  })

  # Show modal when MODAL4 button is clicked.
  observeEvent(input$modal4, {
    showModal(modalDialog(
      textInput("dataset", "Enter a data set",
        placeholder = 'Try "mtcars" or "abc"'
      ),
      div("Id leo in vitae turpis massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl tincidunt eget nullam non nisi est sit amet. Lorem donec massa sapien faucibus et molestie. Diam donec adipiscing tristique risus."),
      footer = tagList(
        modalButton("Cancel"),
        actionButton("ok", "OK")
      ),

      # add extra arguments
      size = "s", # small
      position = "top", # position to the top
    ))
  })


  # Show modal when MODAL4b button is clicked.
  observeEvent(input$modal4b, {
    showModal(modalDialog(
      textInput("dataset", "Enter a data set",
        placeholder = 'Try "mtcars" or "abc"'
      ),
      div("Id leo in vitae turpis massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl tincidunt eget nullam non nisi est sit amet. Lorem donec massa sapien faucibus et molestie. Diam donec adipiscing tristique risus."),
      footer = tagList(
        modalButton("Cancel"),
        actionButton("ok", "OK")
      ),

      # add extra arguments
      size = "l", # large
      position = "top", # position to the top
    ))
  })

  # Show modal when MODAL5 button is clicked.
  observeEvent(input$modal5, {
    showModal(modalDialog(
      textInput("dataset", "Enter a data set",
        placeholder = 'Try "mtcars" or "abc"'
      ),
      div("Id leo in vitae turpis massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl tincidunt eget nullam non nisi est sit amet. Lorem donec massa sapien faucibus et molestie. Diam donec adipiscing tristique risus."),
      footer = tagList(
        modalButton("Cancel"),
        actionButton("ok", "OK")
      ),

      # add extra arguments
      size = "s", # small
      position = "bottom", # position at the bottom
    ))
  })


  # Show modal when MODAL5b button is clicked.
  observeEvent(input$modal5b, {
    showModal(modalDialog(
      textInput("dataset", "Enter a data set",
        placeholder = 'Try "mtcars" or "abc"'
      ),
      div("Id leo in vitae turpis massa. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl tincidunt eget nullam non nisi est sit amet. Lorem donec massa sapien faucibus et molestie. Diam donec adipiscing tristique risus."),
      footer = tagList(
        modalButton("Cancel"),
        actionButton("ok", "OK")
      ),

      # add extra arguments
      size = "l", # large
      position = "bottom", # position at the bottom
    ))
  })
}

# Create and initialize the Shiny application
shinyApp(ui, server)

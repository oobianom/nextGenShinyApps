# library
library(shiny)
library(nextGenShinyApps)


# Define UI
ui <- fluidPage(
  # Theme: Select color style from 1-13
  style = "3",

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
  tags$h2("Accordion"),
  tags$h4("Flavors of accordion to use in any div with the accordionItem() and accordion() functions"),
  tags$br(), tags$br(),
  row(
    column(
      width = 6,
      card(
        title = "Default style",
        alert.text = "Default accordion with <code>style = 'default'</code> as argument to accordion()",
        accordion(
          id = "accordion1",
          accordionItem(
            title = "Accordion 1",
            "Massa sed elementum tempus egestas. Sed ullamcorper morbi tincidunt ornare massa eget. Quam elementum pulvinar etiam non quam lacus. Risus in hendrerit gravida rutrum quisque non tellus orci. Semper risus in hendrerit gravida rutrum. Tristique et egestas quis ipsum suspendisse. Mauris ultrices eros in cursus",
            sliderInput(
              inputId = "bins1",
              label = "Number of bins:",
              min = 1,
              max = 50,
              value = 30
            )
          ),
          accordionItem(
            title = "Accordion 2",
            "Auctor neque vitae tempus quam pellentesque nec nam. Hac habitasse platea dictumst vestibulum. Sit amet justo donec enim. Bibendum est ultricies integer quis auctor elit sed vulputate. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Quisque id diam vel quam elementum pulvinar etiam non."
          )
        )
      )
    ),
    column(
      width = 6,
      card(
        title = "Style 1",
        alert.text = "Default accordion with <code>style = '1'</code> as argument to accordion()",
        accordion(
          id = "accordion2",
          style = "1",
          accordionItem(
            title = "Accordion 1",
            "Massa sed elementum tempus egestas. Sed ullamcorper morbi tincidunt ornare massa eget. Quam elementum pulvinar etiam non quam lacus. Risus in hendrerit gravida rutrum quisque non tellus orci. Semper risus in hendrerit gravida rutrum. Tristique et egestas quis ipsum suspendisse. Mauris ultrices eros in cursus"
          ),
          accordionItem(
            title = "Accordion 2",
            "Auctor neque vitae tempus quam pellentesque nec nam. Hac habitasse platea dictumst vestibulum. Sit amet justo donec enim. Bibendum est ultricies integer quis auctor elit sed vulputate. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Quisque id diam vel quam elementum pulvinar etiam non."
          )
        )
      )
    ),
    column(
      width = 6,
      card(
        title = "Style 2",
        alert.text = "Default accordion with <code>style = '2'</code> as argument to accordion()",
        accordion(
          id = "accordion3",
          style = "2",
          accordionItem(
            title = "Accordion 1",
            "Massa sed elementum tempus egestas. Sed ullamcorper morbi tincidunt ornare massa eget. Quam elementum pulvinar etiam non quam lacus. Risus in hendrerit gravida rutrum quisque non tellus orci. Semper risus in hendrerit gravida rutrum. Tristique et egestas quis ipsum suspendisse. Mauris ultrices eros in cursus"
          ),
          accordionItem(
            title = "Accordion 2",
            "Auctor neque vitae tempus quam pellentesque nec nam. Hac habitasse platea dictumst vestibulum. Sit amet justo donec enim. Bibendum est ultricies integer quis auctor elit sed vulputate. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Quisque id diam vel quam elementum pulvinar etiam non."
          )
        )
      )
    ),
    column(
      width = 6,
      card(
        title = "Style 3",
        alert.text = "Default accordion with <code>style = '3'</code> as argument to accordion()",
        accordion(
          id = "accordion4",
          style = "3",
          accordionItem(
            title = "Accordion 1",
            "Massa sed elementum tempus egestas. Sed ullamcorper morbi tincidunt ornare massa eget. Quam elementum pulvinar etiam non quam lacus. Risus in hendrerit gravida rutrum quisque non tellus orci. Semper risus in hendrerit gravida rutrum. Tristique et egestas quis ipsum suspendisse. Mauris ultrices eros in cursus"
          ),
          accordionItem(
            title = "Accordion 2",
            "Auctor neque vitae tempus quam pellentesque nec nam. Hac habitasse platea dictumst vestibulum. Sit amet justo donec enim. Bibendum est ultricies integer quis auctor elit sed vulputate. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Quisque id diam vel quam elementum pulvinar etiam non."
          )
        )
      )
    ),
    column(
      width = 6,
      card(
        title = "Style 4",
        alert.text = "Styled accordion with <code>style = '4'</code> as argument to accordion()",
        accordion(
          id = "accordion5",
          style = "4",
          accordionItem(
            title = "Accordion 1",
            "Massa sed elementum tempus egestas. Sed ullamcorper morbi tincidunt ornare massa eget. Quam elementum pulvinar etiam non quam lacus. Risus in hendrerit gravida rutrum quisque non tellus orci. Semper risus in hendrerit gravida rutrum. Tristique et egestas quis ipsum suspendisse. Mauris ultrices eros in cursus"
          ),
          accordionItem(
            title = "Accordion 2",
            "Auctor neque vitae tempus quam pellentesque nec nam. Hac habitasse platea dictumst vestibulum. Sit amet justo donec enim. Bibendum est ultricies integer quis auctor elit sed vulputate. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Quisque id diam vel quam elementum pulvinar etiam non."
          )
        )
      )
    ),
    column(
      width = 6,
      card(
        title = "Style 2 with icons",
        alert.text = "Styled accordion with <code>style = '2'</code> as argument to accordion() and <code>icon = icon('cog')</code> for the accordionItem()",
        accordion(
          id = "accordion5",
          style = "2",
          accordionItem(
            title = "Accordion 1",
            icon = icon("edit"),
            "Massa sed elementum tempus egestas. Sed ullamcorper morbi tincidunt ornare massa eget. Quam elementum pulvinar etiam non quam lacus. Risus in hendrerit gravida rutrum quisque non tellus orci. Semper risus in hendrerit gravida rutrum. Tristique et egestas quis ipsum suspendisse. Mauris ultrices eros in cursus"
          ),
          accordionItem(
            title = "Accordion 2",
            icon = icon("cog"),
            "Auctor neque vitae tempus quam pellentesque nec nam. Hac habitasse platea dictumst vestibulum. Sit amet justo donec enim. Bibendum est ultricies integer quis auctor elit sed vulputate. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Quisque id diam vel quam elementum pulvinar etiam non."
          )
        )
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

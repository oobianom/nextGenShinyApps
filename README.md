<img src="https://nextgenshinyapps.obi.obianom.com/adslogo2.png">

# nextGenShinyApps: Craft Exceptional R Shiny Dashboards with Novel Responsive Tools <img src="https://coursewhiz.org/shinyappsampleso/hex-nextGenShinyApps.png" width="200" align="right" >
## Official website: https://nextgenshinyapps.obi.obianom.com
### Other packages required for nextGenShinyApps: https://depends.rpkg.net/package/nextGenShinyApps

### Get started with sample R codes: <br>https://github.com/oobianom/nextGenShinyApps-Boilerplate-BlankApp

__Please note that the nextGenShinyApps 1.7 is NOW compatible with the htmlwidgets,rhandsontable and plotly packages. This is being worked on, but there is not currently a completion date.__



![](https://nextgenshinyapps.obi.obianom.com/nextgenshinyapp-3.png)
![](https://nextgenshinyapps.obi.obianom.com/designs/card-design.png)



## R package installation and usage
The nextGenShinyApps package is available on CRAN and can be installed as shown below

### Install package from CRAN

`install.packages(nextGenShinyApps)`

### Attach library 

`library(nextGenShinyApps)`

### Simple code to start

```
# library
library(shiny)
library(nextGenShinyApps)

# Define UI
ui <- fluidPage(
  # Theme: Select color style from 1-13
  style = "6",

  # Background: You may specify a background(optional)
  custom.bg.color = "lightblue",

  # Header: Insert header content using titlePanel ---
  header = titlePanel(left = "Showcase the Features of the nextGenShinyApp R package", right = "Image logo"),

  # Sidebar: Insert content for sidebar --
  sidebar = sidebarPanel(
    title = "NextGenShinyApp",

    # sample inputs
    textInput(
      inputId = "caption",
      label = "Caption:",
      value = "Data Summary"
    )
  ),

  # Body: Insert anything into the body-------
  tags$h2("Basic Moveable Advanced Card"),
  wrapper(
    altPanel(
      card(
        title = "Standard card with text and a slider",
        # card body content
        sliderInput("bins", "Decimal:",
          min = 0, max = 100,
          value = 23, step = 0.1
        )
      )
    ),
    mainPanel(
      card(
        title = "Standard card with Images",
        plotOutput(outputId = "distPlot")
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
```

### Get started by viewing some of the examples

`load.example("Card")`

`load.example("Plain")`

`load.example("noSideBar")`

`load.example("Tab")`

`load.example("Modal")`

`load.example("Alert")`

`load.example("Accordion")`


## Sample Demo Output 1

### View the Shiny app demo for Cards

[Link to demo](https://r2apps.shinyapps.io/nextgenshinyapps-card/)

### Image of what it looks like

![](https://nextgenshinyapps.obi.obianom.com/nextgenshinyapps.png)

## Sample Demo Output 2

### View the Shiny app demo for Tabs

[Link to demo](https://r2apps.shinyapps.io/nextgenshinyapps-tab/)

### Image of what it looks like

![](https://nextgenshinyapps.obi.obianom.com/nextgenshinyapps3.png)

## Sample Demo Output 3

![](https://nextgenshinyapps.obi.obianom.com/nextgenshinyapps1.png)


## Tutorial

Check R CRAN link for vignettes
 
## More information
 
 - https://coursewhiz.org/mainsite/nextgenshinyapps

## Statistic

[![](https://cranlogs.r-pkg.org/badges/nextGenShinyApps)](https://cran.r-project.org/package=nextGenShinyApps)

[![CRAN\_Status\_Badge](https://www.r-pkg.org/badges/version/nextGenShinyApps)](https://cran.r-project.org/package=nextGenShinyApps)


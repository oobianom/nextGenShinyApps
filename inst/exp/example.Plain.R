
library(shiny)
library(nextGenShinyApps)
tab2 <- tabPanel("Summary", "Convallis aenean et tortor at risus. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc.")
tab3 <- tabPanel("Tab 3", "Eu consequat ac felis donec et odio pellentesque. Egestas pretium aenean pharetra magna ac placerat. Eget velit aliquet sagittis id consectetur purus ut. Aliquet enim tortor at auctor urna nunc id cursus metus. Semper viverra nam libero justo laoreet sit amet.")
tab4 <- tabPanel("Tab 4", "Vulputate mi sit amet mauris commodo quis. Dictum non consectetur a erat nam. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi. Aliquam faucibus purus in massa. Vel orci porta non pulvinar")


shinyApp(
  ui = fluidPage(
    style = "8",
    custom.bg.color = "#e1e1e1",
    sidebar = NULL,
    header = NULL,
    tabsetPanel(
      tab2,
      tab3,
      type = "pills",
      justified = TRUE
    )
  ),
  server = function(input, output) {
  }
)

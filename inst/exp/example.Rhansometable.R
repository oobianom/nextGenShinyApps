#example rhandsome
quickcode::clean(clearPkgs = T)
libraryAll(rhandsontable,shiny,nextGenShinyApps)


ui <- fluidPage(
  style = "9",
  header = nextGenShinyApps::titlePanel(left = "RHANDSOME example", right = "@obinna.obianom"),
  mainPanel(
    card(
      title = "Sample editable table",
      rHandsontableOutput("hot")
    )

  )
)

server = function(input, output, session){

  df<- data.frame(c1=c(5,10,15), c2=c(3,6,9) , diff=c(0,0,0), select= as.logical( c(FALSE,FALSE,FALSE)))
  values <- reactiveValues(data = df)

  observe({
    if(!is.null(input$hot)){
      values$data <- as.data.frame(hot_to_r(input$hot))
      isolate(values$data[,'diff'] <- ifelse(values$data[,'select'], values$data[,'c1']-values$data[,'c2'] ,0))
      print(values$data)
      output$hot <- renderRHandsontable({
        rhandsontable(values$data)
      })
    }
  })

  output$hot <- renderRHandsontable({
    rhandsontable(values$data)
  })

}

shinyApp(ui, server)

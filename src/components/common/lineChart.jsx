import React from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


function LineChart(props) {
    const chartConfigs = {
        type: "line", 
        width: "700", 
        height: "500",
        
        dataFormat: "json", 
        dataSource: {
    
      chart: {
        caption: "Countries With Most Oil Reserves [2017-18]",   
        subCaption: "In MMbbl = One Million barrels",          
        xAxisName: "Country",           
        yAxisName: "Reserves (MMbbl)",  
        numberSuffix: "K",
        theme: "fusion"                 
      },
      
      data: props.data
    }
  };
    return(
        <ReactFC {...chartConfigs} />
    )
}
 
export default LineChart;
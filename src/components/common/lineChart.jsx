import React from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


function LineChart(props) {
    const chartConfigs = {
        type: "line", 
        width: "1100", 
        height: "500",
        
        dataFormat: "json", 
        dataSource: {
    
      chart: {
        caption: "Maximum number of person appear at given date-time",   
        plottooltext:"$value , $label",
        // subCaption: "",          
        xAxisName: "Date-time",           
        yAxisName: "frequency",  
        // numberSuffix: "",
        
        theme: "fusion"                 
      },
      
      data: props.data
    }
  };
    return(
      <div className="line">
        <ReactFC {...chartConfigs} />
        </div>
    )
}
 
export default LineChart;
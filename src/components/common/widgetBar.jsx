import React from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import '../dashboard.css';
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


function WidgetBar(props) {
    const chartConfigs = {
        type: "column2d", 
        width: "500", 
        height: "400",
        
        dataFormat: "json", 
        dataSource: {
    
      chart: {
        caption: "Average probability for each movement",   
        subCaption: "Probability ranges from 0 to 1",          
        xAxisName: "People",           
        yAxisName: "Probability/no. of people",  
        // numberSuffix: "K",
        theme: "fusion"                 
      },
      
      data: props.data
    }
  };
    return(
      <div className="widget">
        <ReactFC {...chartConfigs} />
        </div>
    )
}
 
export default WidgetBar;
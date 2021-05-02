import React from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, charts, FusionTheme);




function PyramidChart(props) {
    const chartConfigs = {
        type:"pie2d",
        width:"500",
        height:"400",
        dataFormat:"JSON",
        dataSource: {
    
      chart: {
        caption: "Number of times each person appears",
        plottooltext: "$value time $label appears",
        showlegend: "1",
        showpercentvalues: "1",
        legendposition: "bottom",
        usedataplotcolorforlabels: "1",
        theme: "fusion"               
      },
      
      data: props.data
    }
  };
    return(
      <div className="widget">
        <ReactFC  {...chartConfigs} /></div>
    )
}
 
export default PyramidChart;
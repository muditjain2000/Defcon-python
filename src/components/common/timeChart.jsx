import React from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, charts, FusionTheme);




function TimeChart(props) {
    const chartConfigs = {
        type:"scatter",
        width:"700",
        height:"500",
        dataFormat:"JSON",
        dataSource: {
    
      chart: {
        caption: "Date vs Time Graph",
        subcaption: props.name,
        xaxisname: "Date",
        yaxisname: "Time",
        // xaxisminvalue: "1",
        xaxismaxvalue: "30",
        ynumbersuffix: " Hr",
        // yaxisminvalue: "0.0",
         yaxismaxvalue: "24.0",
        // xnumbersuffix: "°F",
        theme: "fusion",
        showlegend: "0",
        plottooltext:
        "person appears at this $yDataValue at this $xDataValue Date"
                       
      },
      categories: [
        {
          verticallinedashed: "1",
          verticallinedashlen: "1",
          verticallinedashgap: "1",
          verticallinethickness: "1",
          verticallinecolor: "#000000",
          // category: [
          //   {
          //     x: "20",
          //     label: "20°F",
          //     showverticalline: "0"
          //   },
          //   {
          //     x: "40",
          //     label: "40°F"
          //   },
          //   {
          //     x: "60",
          //     label: "60°F"
          //   },
          //   {
          //     x: "80",
          //     label: "80°F"
          //   },
          //   {
          //     x: "100",
          //     label: "100°F"
          //   }
          // ]
        }
      ],
      
      dataset: [
        {
          seriesname: "Ice Cream",
          anchorbgcolor: "5D62B5",
          data: props.data
        }]
    }
  };
    return(
      <div className="widget">
        <ReactFC  {...chartConfigs} /></div>
    )
}
 
export default TimeChart;
import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, TimeSeries);



const schemaFetch = [{
  "name": "Time",
  "type": "date",
  "format": "%d-%m-%y"
}, {
  "name": "Grocery Sales Value",
  "type": "number"
}]

const dataSource = {
  chart: {},
  caption: {
    text: "Sales Analysis"
  },
  theme: "fusion",
  subcaption: {
    text: "Grocery"
  },
  yaxis: [
    {
      plot: {
        value: "Grocery Sales Value"
      },
      format: {
        prefix: "$"
      },
      title: "Sale Value"
    }
  ]
};

class ChartViewer extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "600",
        height: "400",
        dataSource
      }
    };
  }

  componentDidMount() {
    this.onFetchData();
  }

  onFetchData() {
    const dataFetch = this.props.data
    console.log(dataFetch)
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC {...this.state.timeseriesDs} />
        ) : (
          "loading"
        )}
      </div>
    );
  }
}

export default ChartViewer
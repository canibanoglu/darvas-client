import React, { Component } from "react"
import { XYPlot, XAxis, YAxis,ChartLabel, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';


const Chart = ({ data }) => {
    return (
        <XYPlot width={1200} height={700}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis />
          <YAxis />
          <ChartLabel 
            text="Date"
            className="alt-x-label"
            includeMargin={false}
            xPercent={0.025}
            yPercent={1.01}
            />

          <ChartLabel 
            text="Price"
            className="alt-y-label"
            includeMargin={false}
            xPercent={0.06}
            yPercent={0.06}
            style={{
              textAnchor: 'end'
            }}
            />
          <LineSeries
            className="first-series"
            data={data}
            style={{
                fill: 'none',
            }}
          />
        </XYPlot>
    );
}

export default class Index extends Component {
    state = {
        rawData: [],
        ticker: 'AKBNK',
    };

    getData = async () => {
        const response = await fetch(`http://detemps.theia.feralhosting.com/darvas?ticker=${this.state.ticker}&date=2019-07-11`);
        const rawData = await response.json();

        this.setState({ rawData: rawData.data });
    }


    render() {
        const data = this.state.rawData.map((x, i) => ({ x: i, y: x.price }));
        console.log(data);
        return (
            <div>
                <button onClick={this.getData}>Get Data</button>
                <Chart data={data} />
            </div>
        );
    }
}

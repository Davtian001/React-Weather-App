import React from "react";
import getGraphic from '../chart';
import { Line as LineChart } from 'react-chartjs-2';




const styles = {
    graphContainer: {
        border: '1px solid black',
        padding: '15px'
    }
}
const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: 'aqua',
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
}

function chartOptData(a = [], b = []) {
    return {
        labels: ['Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday'],
        datasets: [
            {
                label: 'Temperature',
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointHoverBackgroundColor: "skyblue",
                pointHitRadius: 10,
                backgroundColor: "#7a354a",
                // borderColor: "gray",
                data: a,
            },
            {
                borderColor: "gray",
                label: 'Humidity',
                backgroundColor: "#1a5b79",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointHoverBackgroundColor: "#1a5b79",
                pointHitRadius: 10,
                data: b,
            },
        ]
    }
}


class ChartGraph extends React.Component {
    constructor(props) {
        super(props);
        this.chartData = [];

        this.state = {
            data: chartOptData()
        }
    }

    componentDidMount() {
        const th = this.getChartData(this.props.stateWeatherData)
        setTimeout(() => this.setState({ data: chartOptData(th[0].data, th[1].data)}), 0);
    }


    getChartData(stateWeatherData) {

        getGraphic(this.props.stateWeatherData, 'celcius', 'dayMaxAndMinTemp', ['dayMax', 'dayMin']).then(graphic =>
            this.chartData.push({ data: graphic, label: 'Temperature' }));

        getGraphic(this.props.stateWeatherData, 'humidity', 'dayMaxAndMinHum', ['dayMax', 'dayMin']).then(graphic =>
            this.chartData.push({ data: graphic, label: 'Humidity' }))
        return this.chartData;
    }

    render() {
        return (
            <div style={styles.graphContainer}>
                <LineChart data={this.state.data}
                    options={options}
                    width={600} height={180}
                />
            </div>
        );
    }
}

export default ChartGraph;


// https://learnui.design/tools/data-color-picker.html































// https://mdbootstrap.com/docs/react/advanced/charts/


















// import React from 'react'
// import { Line } from "react-chartjs-2";

// export default function ChartGraph(props) {
//     const { stateWeatherData } = props;

//     const weatherData = [];
//     const chartData = [];
//     let chartOptions;
//     let chartLabels;

//     if (stateWeatherData) {
//         chartOptions = { responsive: true };
//         chartLabels = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday'];

//         getGraphic(stateWeatherData, 'celcius', 'dayMaxAndMinTemp', ['dayMax', 'dayMin']).then(graphic =>
//             chartData.push({ data: graphic, label: 'Temperature' }));

//         getGraphic(stateWeatherData, 'humidity', 'dayMaxAndMinHum', ['dayMax', 'dayMin']).then(graphic =>
//             chartData.push({ data: graphic, label: 'Humidity' }));
//     }
//     return (
//         <div style={{width: 600, height: 550}}>
//             <Line>

//             </Line>
//         </div>
//         <canvas

//         chartType="'line'"
//         datasets={chartData}
//         labels={chartLabels}
//         options={chartOptions}
//         legend={true}
//      >
//     </canvas>
//     )
// }


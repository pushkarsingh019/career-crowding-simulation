import axios from "axios";
import { useEffect, useState } from "react";
import {origin} from "../App";
import { Bar } from "react-chartjs-2"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";

function ChartScreen({onFetch, currentChart}){
    const [chartData, setChartData] = useState([]);
    useEffect( () => {
        async function fetchData(){
            let {data} = await axios.get(`${origin}`);
            setChartData(data.data);
        };
        fetchData();
    }, [chartData])

    function clickHandler(roundNumber){
        onFetch(roundNumber)
    };

    // variales for implementing charts

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive : true,
        plugins : {
            legend : {
                position : "top",
            },
            title : {
                display : true,
                text : "Which career made the most money"
            },
        },
    };

    let labels = [];
    let chartDataset = [];
    if(currentChart){
        labels = Object.keys(currentChart);
        chartDataset = Object.values(currentChart);
    };

    const data = {
        labels,
        datasets : [{
            label : "Career Choices",
            data : chartDataset,
            backgroundColor: "rgb(255, 93, 93)",
        }
    ],
    }

    return(
        <div className="screen chart-screen">
            {/* <Navbar navbarText={`Charts`} /> */}
            <h3>Charts</h3>
            {chartData ? chartData.map((chart) => {
                return(
                    <button onClick={() => clickHandler(chart.round )} key={chart._id}>Round {chart.round}</button>
                )
            }) : "Chart Data does not exist" }
            {currentChart ? <Bar className="bar-chart" options={options} data={data} /> : "Select Which rounds chart to display"}
        </div>
    )
        }

export default ChartScreen
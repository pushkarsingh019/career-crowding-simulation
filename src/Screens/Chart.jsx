import axios from "axios";
import { useEffect, useState } from "react";
import { socketInUse } from "../config/config";
import { Bar } from "react-chartjs-2"
import Navbar from "../components/Navbar"
import HeroText from "../components/HeroText";

import {getCareerLabels} from "../lib/careerChoices"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";

function ChartScreen({onFetch, currentChart, roundState}){
    const [chartData, setChartData] = useState();
    const [round, setRound] = useState();

    useEffect( () => {
        async function fetchData(){
            let {data} = await axios.get(`${socketInUse}`);
            setChartData(data.data);
        };
        fetchData();
    }, [roundState])

    function clickHandler(roundNumber){
        setRound(roundNumber)
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
        labels = getCareerLabels(round)
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
            <Navbar />
            <HeroText heroText={`Chart Screen`} />
            <br />
            {chartData ? chartData.map((chart) => {
                return(
                    <button className="btn options margin-right" onClick={() => {clickHandler(chart.round)}} key={chart._id}>Round {chart.round}</button>
                )
            }) : <code>chart data does not exist</code> }
            {currentChart ? <Bar className="bar-chart" options={options} data={data} /> : <h3> Which rounds chart to display</h3>}
        </div>
    )
        }

export default ChartScreen
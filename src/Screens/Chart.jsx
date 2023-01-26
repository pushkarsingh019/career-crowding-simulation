import { useState } from "react";
import { Bar } from "react-chartjs-2";
import HeroText from "../components/HeroText";

import { getCareerLabels } from "../lib/careerChoices";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

function ChartScreen({ onFetch, currentChart, roundNumber, isChart }) {
  const [round, setRound] = useState();
  const [chosen, setChosen] = useState();

  function clickHandler(roundNumber) {
    setRound(roundNumber);
    onFetch(roundNumber);
  }

  const numbers = Array.from({ length: roundNumber }, (_, i) => i + 1);
  const roundButtons = numbers.map((number) => (
    <button
      className={
        chosen === number
          ? "btn options margin-right chosen-button"
          : "btn options margin-right"
      }
      key={number}
      onClick={() => {
        clickHandler(number);
        setChosen(number);
      }}
    >
      Round {number}
    </button>
  ));

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
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Which career made the most money",
      },
    },
  };

  let labels = [];
  let chartDataset = [];
  if (currentChart) {
    labels = getCareerLabels(round);
    chartDataset = Object.values(currentChart);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Career Choices",
        data: chartDataset,
        backgroundColor: "rgb(255, 93, 93)",
      },
    ],
  };

  return (
    <div className="screen chart-screen">
      <HeroText heroText={`measure how your career performed`} />
      <br />
      <div className="chart-screen-flex">
        <div>{roundButtons}</div>
        <br />
        <br />
        <div className="chart-canvas">
          {isChart ? (
            "making the chart"
          ) : currentChart ? (
            <Bar className="bar-chart" options={options} data={data} />
          ) : (
            <h3>Which rounds chart to display</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChartScreen;

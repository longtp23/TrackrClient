import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

export const CollectionCatagoryChart = ({ chartData }) => {
  const catagories = chartData.map((item) => item.catagory);
  const catagoriesGameCount = chartData.map((item) => item.timeAppear);
  const [catagoryData, setCatagoryData] = useState({
    labels: catagories,
    datasets: [
      {
        label: "number of games",
        data: catagoriesGameCount,
        backgroundColor: ["#0d99ff ", "#ffcd29", "#f24822", "#14ae5c"],
        borderColor:["#0d99ff ", "#ffcd29", "#f24822", "#14ae5c"],
      },
    ],
  });

  useEffect(() => {
    const catagoriesGameCount = chartData.map((item) => item.timeAppear);
    const catagories = chartData.map((item) => item.catagory);
    setCatagoryData((prevState) => ({
      ...prevState,
      labels: catagories,
      datasets: [
        {
          ...prevState.datasets[0],
          data: catagoriesGameCount,
        },
      ],
    }));
  }, [chartData]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
      }}
    >
      <Doughnut data={catagoryData} />
    </div>
  );
};

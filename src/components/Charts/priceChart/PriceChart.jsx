import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export const PriceChart = ({ chartData }) => {
  const convertDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = date.toLocaleDateString("vi-VN");
    return formattedDate;
  };
  const dates = chartData.map((data) => data.timeStamp)
  const formattedDates = []
for(const date of dates){
    const newDate = convertDate(date)
    formattedDates.push(newDate)
}
  const [priceData, setPriceData] = useState({
    labels: formattedDates.reverse(),
    datasets: [
      {
        label: "Price Overtime",
        data: chartData.reverse().map((data) => data.price),
      },
    ],
  });

  return <Line data={priceData} />;
};

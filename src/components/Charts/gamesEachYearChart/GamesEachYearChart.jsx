import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, scales } from "chart.js/auto";

export const GamesEachYearChart = ({chartData}) => {

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, index) => 2000 + index);
    const gameCount = years.map(year => chartData[year] || 0);


    const [gamesEachYearData,setGamesEachYearData] = useState({
        labels: years.map(String),
        datasets:[{
            label: "Games Each Year",
            data: gameCount,
            backgroundColor: ['#ffcd29'],
            borderWidh:2,
            borderRadius:100,
            borderSkipped: false,
        }]
    })

   
  
    useEffect(() => {
        const gameCount = years.map(year => chartData[year] || 0);
        setGamesEachYearData(prevState => ({
          ...prevState,
          datasets: [
            {
              ...prevState.datasets[0],
              data: gameCount
            }
          ]
        }));
      }, [chartData]);
      
    const options = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1,
                    precision: 0
                }
            }
        }
    };

  return (
    <Bar data={gamesEachYearData} options={options}/>
    
  )
}

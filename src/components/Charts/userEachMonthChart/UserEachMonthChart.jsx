import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { publicRequest } from "../../../requests/requestMethods";

export const UserEachMonthChart = () => {
  const [userEachMonth, setUserEachMonth] = useState([]);
  const eachMonth = userEachMonth.map((month) => {
    return `${month.month}/${month.year}`;
  });
  useEffect(() => {
    const getUserEachMonth = async () => {
      const res = await publicRequest.get("/user/getUserEachMonth");
      setUserEachMonth(res.data);
    };
    getUserEachMonth();
  }, []);

  useEffect(() => {
    const eachMonth = userEachMonth.map((month) => {
      return `${month.month}/${month.year}`;
    });

    setUserData({
      labels: eachMonth,
      datasets: [
        {
          label: "User Each Month",
          data: userEachMonth.map((month) => month.count),
        },
      ],
    });
  }, [userEachMonth]);

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "User Each Month",
        data: [],
      },
    ],
  });

  return <Line data={userData} />;
};

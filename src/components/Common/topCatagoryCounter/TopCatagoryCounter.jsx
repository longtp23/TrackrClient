import React from "react";
import "./topCatagoryCounter.scss";

export const TopCatagoryCounter = ({ topData, topNum, title }) => {
  return (
    <div className="topCatagoryCounterContainer">
      <div className="topCatagoryStatCount">
        <span>{topNum}</span>
        {title}
      </div>
      <div className="topCatagoryCounterRankingWrapper">
        {topData?.map((item, index) => (
          <div key={index} className="topCatagoryCounterRankingItem">
            <div className="topCatagoryName">
              <div className="left">
                <div>{index + 1}</div>
                <span>{item[title]}</span>
              </div>
              <div className="right">{item.count} games</div>
            </div>
            <div className="topCatagoryBarContainer">
              <hr
                className="topCatagoryBar"
                style={{
                  width: `${item.percentage}%`,
                  backgroundImage:
                    title === "genres"
                      ? "linear-gradient(to left, rgb(201, 36, 144), rgb(255, 141, 220))"
                      : "linear-gradient(to left, rgb(100, 155, 255), rgb(67, 84, 186))",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

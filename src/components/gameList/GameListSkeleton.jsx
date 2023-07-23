import Skeleton from "react-loading-skeleton";
import "./gameListSkeleton.scss";
import "react-loading-skeleton/dist/skeleton.css";

import React from "react";

const GameListSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div key={i} className="skeletonCard">
        <div className="skeletonImg">
          <Skeleton className="h-2 w-20" count={3} />
        </div>
        <div className="skeletonInfo">
          <Skeleton className="skeletonTitle" />
          <div className="sub">
            <Skeleton className="skeletonDate" />
            <Skeleton circle className="skeletonPlaform" />
            <Skeleton circle className="skeletonPlaform" />
            <Skeleton circle className="skeletonPlaform" />
          </div>
          <Skeleton count={3} className="h-2 mt-4"/>
        </div>
      </div>
    ));
};

export default GameListSkeleton;

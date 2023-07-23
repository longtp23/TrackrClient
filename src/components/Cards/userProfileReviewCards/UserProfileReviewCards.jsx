import React from "react";
import { ReviewCard } from "../reviewCard/ReviewCard";

export const UserProfileReviewCards = ({ reviewData }) => {
  return (
    <div className="userProfileReviewCardsContainer">
      {reviewData.map((review) => (
        <div key={review._id} className="userProfileReviewCardContainer">
          <ReviewCard review={review} style={{width: "100%"}}/>
        </div>
      ))}
    </div>
  );
};

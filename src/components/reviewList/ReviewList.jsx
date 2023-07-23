import { useEffect, useState } from "react";
import { publicRequest } from "../../requests/requestMethods";
import "./reviewList.scss";
import { ReviewCard } from "../Cards/reviewCard/ReviewCard";

export const ReviewList = ({ gameId, updateReview }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewChanges, setReviewChanges] = useState(0);
  useEffect(() => {
    const getReviews = async () => {
      const res = await publicRequest.get(`/review/game/${gameId}`);
      setReviews(res.data);
    };
    getReviews();
  }, [gameId, reviewChanges]);

  const handleUpdateReview = () => {
    if (updateReview) {
      setReviewChanges((prevChanges) => prevChanges + 1);
    }
  };

  useEffect(() => {
    handleUpdateReview();
  }, [updateReview]);

  const handleReviewCardChange = () => {
    setReviewChanges((prevChanges) => prevChanges + 1);
  };

  return (
    reviews.length !== 0 && (
      <div className="reviewsWrapper">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            onReviewCardChange={handleReviewCardChange}
          />
        ))}
      </div>
    )
  );
};

import {
  AccessTime,
  HourglassEmpty,
  SentimentVeryDissatisfied,
  ThumbDownAlt,
  ThumbUpAlt,
  ThumbsUpDown,
} from "@mui/icons-material";
import { CircularProgress, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReviewCard } from "../../../components/Cards/reviewCard/ReviewCard";
import { Navbar } from "../../../components/Common/navbar/Navbar";
import { publicRequest } from "../../../requests/requestMethods";
import "./reviewPage.scss";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [ratingValue, setRatingValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleRatingChange = (event, newRating) => {
    setRatingValue(newRating);
  };
  const [helpful, setHelpful] = useState("");
  const handleHelpfulChange = (event, newHelpful) => {
    setHelpful(newHelpful);
  };
  const [timePosted, setTimePosted] = useState("");
  const handleTimePostedChange = (event, newTimePosted) => {
    setTimePosted(newTimePosted);
  };
  const getReviews = async () => {
    setIsLoading(true);
    const res = await publicRequest.post(
      `/review/filter?reviewsPerPage=10&page=${page}`,
      {
        timePosted,
        ratings: ratingValue,
        helpful,
      }
    );
    if (page === 1) {
      setReviews(res.data);
      setIsLoading(false);
    } else {
      setReviews((prev) => [...prev, ...res.data]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setReviews([]);
  }, [timePosted, ratingValue, helpful]);

  useEffect(() => {
    getReviews();
  }, [timePosted, ratingValue, helpful, page]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    if (windowHeight + scrollTop + 1 >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="reviewPageContainer">
        <div className="reviewPageWrapper">
          <div className="filterReviews">
            <h3>Filter Reviews</h3>
            <div className="filterReviewItem">
              <span>Ratings:</span>
              <ToggleButtonGroup
                size="large"
                value={ratingValue}
                onChange={handleRatingChange}
                aria-label="Large sizes"
                sx={{ marginLeft: "10px" }}
              >
                <ToggleButton value="bad" color="error">
                  <ThumbDownAlt />
                </ToggleButton>

                <ToggleButton value="neutral" color="warning">
                  <ThumbsUpDown />
                </ToggleButton>

                <ToggleButton value="good" color="success">
                  <ThumbUpAlt />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="filterReviewItem">
              <span>Most helpful:</span>
              <ToggleButtonGroup
                size="large"
                value={helpful}
                onChange={handleHelpfulChange}
                aria-label="Large sizes"
                sx={{ marginLeft: "10px" }}
                exclusive
              >
                <ToggleButton value="helpful" color="success">
                  <ThumbUpAlt />
                </ToggleButton>
                <ToggleButton value="notHelpful" color="error">
                  <ThumbDownAlt />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="filterReviewItem">
              <span>Time posted:</span>
              <ToggleButtonGroup
                size="large"
                value={timePosted}
                onChange={handleTimePostedChange}
                aria-label="Large sizes"
                sx={{ marginLeft: "10px" }}
                exclusive
              >
                <ToggleButton value="latest" color="success">
                  <AccessTime />
                </ToggleButton>
                <ToggleButton value="oldest" color="error">
                  <HourglassEmpty />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          {!isLoading ? (
            <div className="reviewList">
              {reviews.length !== 0 ? (
                reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "50px",
                    padding: "20px 0px",
                  }}
                >
                  <div>
                    <SentimentVeryDissatisfied style={{ fontSize: "80px" }} />
                  </div>
                  <h3>No reviews here!</h3>
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flex:"4",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "30vh",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;

import React, { useEffect, useState } from "react";
import { Navbar } from "../../../components/Common/navbar/Navbar";
import { useAuthUser } from "react-auth-kit";
import { Link, useLocation } from "react-router-dom";
import {
  ExpandMore,
  SentimentVeryDissatisfied,
  Settings,
  ThumbDownAlt,
  ThumbUpAlt,
  ThumbsUpDown,
} from "@mui/icons-material";
import { UserProfileMenu } from "../../../components/userProfileMenu/UserProfileMenu";
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress } from "@mui/material";
import { userRequest } from "../../../requests/requestMethods";
import { UserProfileReviewCards } from "../../../components/Cards/userProfileReviewCards/UserProfileReviewCards";

const UserProfileReviewPage = () => {
  const authUser = useAuthUser();
  const userId = authUser().userId;
  const location = useLocation().pathname.split("/")[3];
  const [reviews, setReviews] = useState([]);
  const [isLoading,setIsLoading] = useState(true)

  const getReviews = async () => {
    try {
      const res = await userRequest.get(`/review/${userId}`);
      setReviews(res.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const filterReviews = (rating) => {
    return reviews.filter((review) => review.rating === rating);
  };

  return (
    <div>
      <Navbar />
      <div className="userProfileContainer">
        <div className="userProfileWrapper">
          <div className="userProfileUserInfo">
            <div className="left">
              <img src={authUser().profilePic} />
              <h1>{authUser().username}</h1>
            </div>
            <div className="right">
            <Link to={`/userProfile/${userId}/Settings`}>
                <button className="userProfileSettingBtn">
                  <Settings style={{ marginRight: "5px" }} /> Settings
                </button>
              </Link>
            </div>
          </div>
          <UserProfileMenu location={location} userId={userId} />
          {!isLoading ?
          <div className="accordionsWrapper">
            <div className="accordionWrapper">
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  sx={{ backgroundColor: "#282828", color: "white" }}
                  expandIcon={<ExpandMore />}
                >
                  <div className="accordionTitle">
                    <ThumbUpAlt sx={{ marginRight: "10px" }} />
                    <span>Recommend</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "#151515", color: "white" }}
                >
                  {filterReviews("good").length !== 0 ? (
                    <UserProfileReviewCards
                      reviewData={filterReviews("good")}
                    />
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
                        <SentimentVeryDissatisfied
                          style={{ fontSize: "80px" }}
                        />
                      </div>
                      <h3>No reviews here!</h3>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="accordionWrapper">
              <Accordion>
                <AccordionSummary
                  sx={{ backgroundColor: "#282828", color: "white" }}
                  expandIcon={<ExpandMore />}
                >
                  <div className="accordionTitle">
                    <ThumbsUpDown sx={{ marginRight: "10px" }} />
                    <span>Neutral</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "#151515", color: "white" }}
                >
                  {filterReviews("neutral").length !== 0 ? (
                    <UserProfileReviewCards
                      reviewData={filterReviews("neutral")}
                    />
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
                        <SentimentVeryDissatisfied
                          style={{ fontSize: "80px" }}
                        />
                      </div>
                      <h3>No reviews here!</h3>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="accordionWrapper">
              <Accordion>
                <AccordionSummary
                  sx={{ backgroundColor: "#282828", color: "white" }}
                  expandIcon={<ExpandMore />}
                >
                  <div className="accordionTitle">
                    <ThumbDownAlt sx={{ marginRight: "10px" }} />
                    <span>Bad</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "#151515", color: "white" }}
                >
                  {filterReviews("bad").length !== 0 ? (
                    <UserProfileReviewCards
                      reviewData={filterReviews("bad")}
                    />
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
                        <SentimentVeryDissatisfied
                          style={{ fontSize: "80px" }}
                        />
                      </div>
                      <h3>No reviews here!</h3>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
          </div>: (
            <div
            style={{
              display: "flex",
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

export default UserProfileReviewPage;

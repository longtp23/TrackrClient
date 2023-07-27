import React, { useEffect, useState } from "react";
import { Navbar } from "../../../components/Common/navbar/Navbar";
import { useAuthUser } from "react-auth-kit";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ExpandMore,
  SentimentVeryDissatisfied,
  Settings,
  ThumbDownAlt,
  ThumbUpAlt,
  ThumbsUpDown,
} from "@mui/icons-material";
import { UserProfileMenu } from "../../../components/userProfileMenu/UserProfileMenu";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from "@mui/material";
import { userRequest } from "../../../requests/requestMethods";
import { UserProfileReviewCards } from "../../../components/Cards/userProfileReviewCards/UserProfileReviewCards";
import { UserProfilePicSkeleton } from "../../../components/UserProfilePicSkeleton/UserProfilePicSkeleton";
import { handleCheckId } from "../userProfileOverviewPage/UserProfileOverview";

const UserProfileReviewPage = () => {
  const authUser = useAuthUser();
  const location = useLocation().pathname.split("/");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const userId = location[2];
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserInfo = async () => {
    const res = await userRequest.get(`/user/getUserInfo/${userId}`);
    setUserInfo(res.data);
  };

  const getReviews = async () => {
    try {
      const res = await userRequest.get(`/review/${userId}`);
      setReviews(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
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
            {!isLoading ? (
              <div className="left">
                <img src={userInfo.profilePicture} />
                <h1>{userInfo.username}</h1>
              </div>
            ) : (
              <UserProfilePicSkeleton />
            )}
            <div className="right">
              <button
                onClick={() => {
                  handleCheckId(authUser().userId, userId, navigate);
                }}
                className="userProfileSettingBtn"
              >
                <Settings style={{ marginRight: "5px" }} /> Settings
              </button>
            </div>
          </div>
          <UserProfileMenu location={location} userId={userId} />
          {!isLoading ? (
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
            </div>
          ) : (
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

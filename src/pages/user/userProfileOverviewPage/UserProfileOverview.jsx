import { SentimentVeryDissatisfied, Settings } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GamesEachYearChart } from "../../../components/Charts/gamesEachYearChart/GamesEachYearChart";
import { Navbar } from "../../../components/Common/navbar/Navbar";
import { TopCatagoryCounter } from "../../../components/Common/topCatagoryCounter/TopCatagoryCounter";
import { UserProfilePicSkeleton } from "../../../components/UserProfilePicSkeleton/UserProfilePicSkeleton";
import { UserProfileMenu } from "../../../components/userProfileMenu/UserProfileMenu";
import { userRequest } from "../../../requests/requestMethods";
import "./userProfileOverview.scss";
import { useToastError } from "../../../utils/toastSettings";
import { useAuthUser } from "react-auth-kit";

export const handleCheckId = (userId, locationId, navigate) => {
  if (userId !== locationId) useToastError("You are not authorized!");
  else navigate(`/userProfile/${locationId}/Settings`);
};

const UserProfileOverview = () => {
  const authUser = useAuthUser();
  const [userInfo, setUserInfo] = useState({});
  const [collectionGameCount, setCollectionGameCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [wishlistGameCount, setWishlistGameCount] = useState(0);
  const [gamesEachYear, setGamesEachYear] = useState({});
  const [topDevGenre, setTopDevGenre] = useState({});
  const location = useLocation().pathname.split("/");
  const userId = location[2];
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getStatsCount = async () => {
    const getUserInfo = await userRequest.get(`/user/getUserInfo/${userId}`);
    setUserInfo(getUserInfo.data);
    const getCollectionGameCount = await userRequest.get(
      `/collection/gameCount/${userId}`
    );
    setCollectionGameCount(getCollectionGameCount.data);
    const getReviewCount = await userRequest.get(
      `/review/reviewCount/${userId}`
    );
    setReviewCount(getReviewCount.data);
    const getWishlistGameCount = await userRequest.get(
      `/wishlist/gameCount/${userId}`
    );
    setWishlistGameCount(getWishlistGameCount.data);
    const getGamesEachYear = await userRequest.get(
      `/collection/gameEachYear/${userId}`
    );
    setGamesEachYear(getGamesEachYear.data);
    const numGenresDevs = await userRequest.get(
      `/collection/topDevGernes/${userId}`
    );
    setTopDevGenre(numGenresDevs.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getStatsCount();
  }, [reviewCount, collectionGameCount, wishlistGameCount]);
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
            <div>
              <div className="userProfileContentStats">
                <div className="contentStat">
                  <Link to={`/userProfile/${userId}/Collection`}>
                    <div className="contentStatCount">
                      <h3>{collectionGameCount}</h3>
                      <span>games</span>
                    </div>
                    <p>
                      Compile your personal goty titles, organize games by
                      theme, make a list of great co-op games to play with
                      friends or whatever comes to your mind.
                    </p>
                  </Link>
                </div>
                <div className="contentStat">
                  <Link to={`/userProfile/${userId}/Reviews`}>
                    <div className="contentStatCount">
                      <h3>{reviewCount}</h3>
                      <span>reviews</span>
                    </div>
                  </Link>
                  <p>
                    Rate and review the stores. Your opinion matters, share it!
                  </p>
                </div>
                <div className="contentStat">
                  <Link to={`/userProfile/${userId}/Wishlist`}>
                    <div className="contentStatCount">
                      <h3>{wishlistGameCount}</h3>
                      <span>games</span>
                    </div>
                  </Link>
                  <p>
                    Track your favorite titles and never miss a great deal
                    again. Get real-time price updates, price drop alerts, and
                    compare prices across different retailers.
                  </p>
                </div>
              </div>

              {collectionGameCount > 0 ? (
                <div>
                  <div className="userProfileGamesEachYearChart">
                    <h3>Games by release year</h3>
                    {gamesEachYear && (
                      <GamesEachYearChart chartData={gamesEachYear} />
                    )}
                  </div>
                  <div className="topCatagoryCounterWrapper">
                    <TopCatagoryCounter
                      title={"genres"}
                      topData={topDevGenre.genres}
                      topNum={topDevGenre.numGenres}
                    />
                    <TopCatagoryCounter
                      title={"developers"}
                      topData={topDevGenre.developers}
                      topNum={topDevGenre.numDevelopers}
                    />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "50px",
                    padding: "20px 0px",
                    minHeight:"40vh"
                  }}
                >
                  <div>
                    <SentimentVeryDissatisfied style={{ fontSize: "80px" }} />
                  </div>
                  <h3>Populate your collection to view more stats</h3>
                </div>
              )}
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

export default UserProfileOverview;

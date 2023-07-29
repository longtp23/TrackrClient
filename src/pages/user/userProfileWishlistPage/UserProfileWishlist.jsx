import { Delete, SentimentVeryDissatisfied, Settings, SportsEsports } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { UserProfileMenu } from "../../../components/userProfileMenu/UserProfileMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../../../components/Common/navbar/Navbar";
import { publicRequest, userRequest } from "../../../requests/requestMethods";
import { resize200 } from "../../../utils/resizeImage";
import "./userProfileWishlist.scss";
import { formatPrice, formatReleaseYear } from "../../../utils/formatStrings";
import {
  toastSettings,
  useToastError,
  useToastShow,
  useToastSuccess,
} from "../../../utils/toastSettings";
import { toast } from "react-toastify";
import { WarningModal } from "../../../components/Modals/warningModal/WarningModal";
import { CircularProgress } from "@mui/material";
import { handleCheckId } from "../userProfileOverviewPage/UserProfileOverview";

const DeleteIcon = () => {
  return <Delete />;
};

const AddToCollectionIcon = () => {
  return <SportsEsports />;
};

const WarningDeleteContent = () => {
  return <span>Are you sure you want to delete this game from wishlist?</span>;
};
const AddToCollectionContent = () => {
  return <span>Are you sure you want to add this game to collection?</span>;
};

const UserProfileWishlist = () => {
  const authUser = useAuthUser();
  const location = useLocation().pathname.split("/");
  const navigate = useNavigate();
  const userId = location[2];
  const [userInfo, setUserInfo] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pickRandomColor = () => {
    const textColors = ["#ffcd29", "#f24822", "#9747ff"];
    return textColors[Math.floor(Math.random() * textColors.length)];
  };

  const handleDeleteGameFromWishlist = async (gameId) => {
    useToastShow("Deleting Game!");
    const res = await userRequest.delete(`/wishlist/${userId}/${gameId}`);
    if (res.data.type === "success") {
      useToastSuccess(res.data.message);
      setWishlist(res.data.wishlist.games);
    } else useToastError(res.data.message);
  };

  const handleAddGameToCollection = async ({
    gameId,
    gameImg,
    gameSlug,
    gameTitle,
  }) => {
    useToastShow("Adding game to collection");
    try {
      const releaseYear = await publicRequest.get(
        `/game/searchSlug/${gameSlug}`
      );

      const res = await userRequest.put(`/collection/addGame/${userId}`, {
        game: {
          gameId,
          gameImg,
          gameSlug,
          gameTitle,
          releaseYear: formatReleaseYear(releaseYear.data.releaseDate),
        },
      });
      if (res.data.type === "success") useToastSuccess(res.data.message);
      else useToastError(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    const res = await userRequest.get(`/user/getUserInfo/${userId}`);
    setUserInfo(res.data);
  };

  const getWishlist = async () => {
    const res = await userRequest.get(`/wishlist/${userId}`);
    setWishlist(res.data.games);
    setIsLoading(false);
  };
  useEffect(() => {
    getUserInfo();
    getWishlist();
  }, [wishlist.length]);

  const totalValue = wishlist
    .map((game) => game.lowestPriceAdded)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div>
      <Navbar />
      <div className="userProfileContainer">
        <div className="userProfileWrapper">
          <div className="userProfileUserInfo">
            <div className="left">
              <img src={userInfo.profilePicture} />
              <h1>{userInfo.username}</h1>
            </div>
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
              {wishlist.length !== 0 ? <div>
                <div className="wishlistStoreSummaryContainer">
                  Wishlist Summary:
                  <div className="wishlistStoreSummaryContent">
                    <div className="wishlistGameCount">
                      total games:
                      <span style={{ color: "rgb(255, 205, 41)" }}>
                        {" "}
                        {wishlist.length}
                      </span>
                    </div>
                    <div className="wishlistTotalValue">
                      value:{" "}
                      <span style={{ color: "#14ae5c" }}>
                        {formatPrice(totalValue)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="wishlistGameList">
                  {wishlist &&
                    wishlist.map((game, index) => (
                      <div key={game._id} className="wishlistGameCardContainer">
                        <div className="left">
                          <div className="wishlistGameImgWrapper">
                            <div className="wishlistActions">
                              <div>
                                <WarningModal
                                  InitiateComponent={AddToCollectionIcon}
                                  WarningContent={AddToCollectionContent}
                                  confirmFunction={handleAddGameToCollection}
                                  parameters={{
                                    gameId: game.gameId,
                                    gameSlug: game.gameSlug,
                                    gameImg: game.gameImg,
                                    gameTitle: game.gameTitle,
                                  }}
                                />
                              </div>
                              <div>
                                <WarningModal
                                  InitiateComponent={DeleteIcon}
                                  WarningContent={WarningDeleteContent}
                                  confirmFunction={handleDeleteGameFromWishlist}
                                  parameters={game.gameId}
                                />
                              </div>
                            </div>
                            <img src={resize200(game.gameImg)} />
                          </div>
                          <span style={{ cursor: "pointer" }}>
                            <Link target="_blank" to={`/game/${game.gameSlug}`}>
                              {game.gameTitle}
                            </Link>
                          </span>
                        </div>
                        <div className="right">
                          <div className="wishlistBestPrice">
                            Best price at{" "}
                            <b style={{ color: "#14ae5c" }}>
                              {formatPrice(game.lowestPriceAdded)}
                            </b>{" "}
                            on{" "}
                            <b style={{ color: pickRandomColor() }}>
                              {game.storeAdded}
                            </b>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div> :(
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
                 <h3>Populate your wishlist to view more stats</h3>
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

export default UserProfileWishlist;

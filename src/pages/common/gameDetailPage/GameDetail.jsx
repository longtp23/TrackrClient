import {
  AddCircleOutlineOutlined,
  ExpandMore,
  Language,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { DetailCarousel } from "../../../components/Carousels/detailCarousel/DetailCarousel";
import { DetailImageModal } from "../../../components/Modals/detailImageModal/DetailImageModal";
import { GameCopiesDataGridRaw } from "../../../components/DataGrid/gameCopiesDataGrid/GameCopiesDataGridRaw";
import { Navbar } from "../../../components/Common/navbar/Navbar";
import { ReviewFormModal } from "../../../components/Modals/reviewFormModal/ReviewFormModal";
import { ReviewList } from "../../../components/reviewList/ReviewList";
import { platformIcons } from "../../../utils/platformIcons";
import { publicRequest, userRequest } from "../../../requests/requestMethods";
import { toastSettings } from "../../../utils/toastSettings";
import { GameCopiesEcommerceDataGrid } from "../../../components/DataGrid/gameCopiesEcommerceDataGrid/GameCopiesEcommerceDataGrid";
import {
  formatReleaseDate,
  formatReleaseYear,
} from "../../../utils/formatStrings";
import "./gameDetail.scss";

const DetailContainer = styled.div`
  overflow: hidden;
  position: relative;
  background-color: #151515;
  background-image: url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M81.28 88H68.413l19.298 19.298L81.28 88zm2.107 0h13.226L90 107.838 83.387 88zm15.334 0h12.866l-19.298 19.298L98.72 88zm-32.927-2.207L73.586 78h32.827l.5.5 7.294 7.293L115.414 87l-24.707 24.707-.707.707L64.586 87l1.207-1.207zm2.62.207L74 80.414 79.586 86H68.414zm16 0L90 80.414 95.586 86H84.414zm16 0L106 80.414 111.586 86h-11.172zm-8-6h11.173L98 85.586 92.414 80zM82 85.586L87.586 80H76.414L82 85.586zM17.414 0L.707 16.707 0 17.414V0h17.414zM4.28 0L0 12.838V0h4.28zm10.306 0L2.288 12.298 6.388 0h8.198zM180 17.414L162.586 0H180v17.414zM165.414 0l12.298 12.298L173.612 0h-8.198zM180 12.838L175.72 0H180v12.838zM0 163h16.413l.5.5 7.294 7.293L25.414 172l-8 8H0v-17zm0 10h6.613l-2.334 7H0v-7zm14.586 7l7-7H8.72l-2.333 7h8.2zM0 165.414L5.586 171H0v-5.586zM10.414 171L16 165.414 21.586 171H10.414zm-8-6h11.172L8 170.586 2.414 165zM180 163h-16.413l-7.794 7.793-1.207 1.207 8 8H180v-17zm-14.586 17l-7-7h12.865l2.333 7h-8.2zM180 173h-6.613l2.334 7H180v-7zm-21.586-2l5.586-5.586 5.586 5.586h-11.172zM180 165.414L174.414 171H180v-5.586zm-8 5.172l5.586-5.586h-11.172l5.586 5.586zM152.933 25.653l1.414 1.414-33.94 33.942-1.416-1.416 33.943-33.94zm1.414 127.28l-1.414 1.414-33.942-33.94 1.416-1.416 33.94 33.943zm-127.28 1.414l-1.414-1.414 33.94-33.942 1.416 1.416-33.943 33.94zm-1.414-127.28l1.414-1.414 33.942 33.94-1.416 1.416-33.94-33.943zM0 85c2.21 0 4 1.79 4 4s-1.79 4-4 4v-8zm180 0c-2.21 0-4 1.79-4 4s1.79 4 4 4v-8zM94 0c0 2.21-1.79 4-4 4s-4-1.79-4-4h8zm0 180c0-2.21-1.79-4-4-4s-4 1.79-4 4h8z' fill='%234b4b4b' fill-opacity='0.35' fill-rule='evenodd'/%3E%3C/svg%3E");
`;

const GameDetail = () => {
  const location = useLocation();
  const slug = location.pathname.split("/")[2];
  const userAuth = useAuthUser();
  const [gameDetail, setGameDetail] = useState();
  const [updateReview, setUpdateReview] = useState(0);
  const navigate = useNavigate();
  const userId = userAuth()?.userId;
  const releaseYear = formatReleaseYear(gameDetail?.releaseDate);

  const getLowestPrice = (data, count) => {
    const sortedData = data.sort(
      (a, b) => a.retailPrice[0].price - b.retailPrice[0].price
    );
    return sortedData.slice(0, count);
  };

  const handleAddToWishlist = async () => {
    if (!userAuth()) navigate("/login");

    const gameAdded = gameDetail?._id;
    try {
      toast.warn("Adding your game to wishlist", { ...toastSettings });
      const gameCopy = await publicRequest.post("/gameCopy/search", {
        title: gameDetail.title,
      });

      const bestPriceCopy = getLowestPrice(gameCopy.data, 1);

      const res = await userRequest.put(`/wishlist/addGame/${userId}`, {
        game: {
          gameId: gameAdded,
          gameTitle: gameDetail.title,
          gameSlug: gameDetail.slug,
          gameImg: gameDetail.backgroundImage,
          lowestPriceAdded: bestPriceCopy[0].retailPrice[0].price,
          storeAdded: bestPriceCopy[0].storeName,
        },
      });
      if (res.data.type === "success")
        toast.success(res.data.message, { ...toastSettings });
      else toast.error(res.data.message, { ...toastSettings });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCollection = async () => {
    if (!userAuth()) navigate("/login");

    const gameId = gameDetail?._id;
    const gameImg = gameDetail?.backgroundImage;
    const gameSlug = gameDetail?.slug;
    const gameTitle = gameDetail?.title;
    try {
      const res = await userRequest.put(`/collection/addGame/${userId}`, {
        game: { gameId, gameImg, gameSlug, gameTitle, releaseYear },
      });
      if (res.data.type === "success")
        toast.success(res.data.message, { ...toastSettings });
      else toast.error(res.data.message, { ...toastSettings });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateReview = () => {
    setUpdateReview((prev) => prev + 1);
  };

  // GET GAME'S DETAILS

  useEffect(() => {
    const getGame = async () => {
      try {
        const response = await publicRequest.get("/game/searchSlug/" + slug);
        setGameDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGame();
  }, [slug]);

  //  FILTER HTML OF DESCRIPTION
  const filterHTML = (html) => {
    const entityRegex = /&#39;/g;
    const tagRegex = /(<([^>]+)>)/gi;
    const quote = /&quot;/g;

    const filteredString = html
      .replace(entityRegex, "'")
      .replace(tagRegex, "")
      .replace(quote, '"');

    return filteredString;
  };

  return (
    <div>
      <Navbar />
      {gameDetail && (
        <DetailContainer backgroundImage={gameDetail.backgroundImage}>
          <div className="detailsContainer">
            <div className="bodyWrapper">
              <div className="bodyContent shadow-xl">
                <div className="details">
                  <div className="info">
                    <div className="infoWrapper">
                      <h1>{gameDetail.title}</h1>
                      <div className="sub">
                        <div className="releaseDate">
                          {formatReleaseDate(gameDetail.releaseDate)}
                        </div>
                        <div className="platforms">
                          {gameDetail.platforms.map((platform, index) => {
                            if (platform === "PlayStation")
                              return (
                                <img
                                  key={index}
                                  src={platformIcons.playstation}
                                />
                              );
                            if (platform === "Xbox")
                              return (
                                <img key={index} src={platformIcons.xbox} />
                              );
                            if (platform === "Nintendo")
                              return (
                                <img key={index} src={platformIcons.switch} />
                              );
                          })}
                        </div>
                      </div>
                      <div className="lowerLeft mt-7">
                        <div className="additionalInfo">
                          <div className="left">
                            {gameDetail?.genres.length !== 0 && (
                              <div className="infoItem">
                                <h3>Genres:</h3>
                                <div>
                                  {gameDetail.genres.map((genre, index) => (
                                    <div key={index}>{genre}</div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {gameDetail.developers.length !== 0 && (
                              <div className="infoItem">
                                <h3>Developers:</h3>
                                <div>{gameDetail.developers[0]}</div>
                              </div>
                            )}
                          </div>
                          <div className="right">
                            {gameDetail?.metaScore && (
                              <div className="metaScore">
                                Metacritics:
                                <br />
                                <div className="score">
                                  {gameDetail.metaScore}
                                </div>
                              </div>
                            )}
                            {gameDetail.publishers.length !== 0 && (
                              <div className="infoItem">
                                <h3>Publishers:</h3>
                                <div>{gameDetail.publishers[0]}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="actions">
                          <button
                            style={{
                              backgroundColor: "#FFCD29",
                              color: "black",
                            }}
                            className="actionBtn"
                            onClick={handleAddToWishlist}
                          >
                            <span>Add to wishlist</span>
                            <ShoppingCartOutlined />
                          </button>
                          <button
                            style={{
                              backgroundColor: "#14AE5C",
                              color: "white",
                            }}
                            className="actionBtn"
                            onClick={handleAddToCollection}
                          >
                            <span>Add to collection</span>
                            <AddCircleOutlineOutlined />
                          </button>
                          <ReviewFormModal
                            gameId={gameDetail._id}
                            updateReview={handleUpdateReview}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="screenshots">
                      <DetailCarousel
                        screenshots={gameDetail.shortScreenshots}
                      />
                      <div className="detailSmallScreenshots">
                        {gameDetail.shortScreenshots
                          .slice(1, 4)
                          .map((screenshot, index) => (
                            <DetailImageModal
                              key={index}
                              imgData={screenshot}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ borderBottom: "3px solid gray", padding: "40px" }}
                  >
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: gameDetail.description,
                      }}
                      style={{
                        padding: "20px",
                        fontSize: "20px",
                        backgroundColor: "black",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="gameCopiesTableContainer">
                  <div className="gameCopiesTableWrapper">
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary
                        sx={{ backgroundColor: "#282828", color: "white", padding:"10px", fontSize:"20px" }}
                        expandIcon={<ExpandMore />}
                      >
                        <div style={{marginLeft:"9px"}} className="accordionTitle">
                          <Language sx={{ marginRight: "10px" }} />
                          <span>Web Stores Price</span>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{ backgroundColor: "#151515", color: "white" }}
                      >
                        <GameCopiesDataGridRaw title={gameDetail.title} />
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div className="gameCopiesTableWrapper">
                    <Accordion>
                      <AccordionSummary
                        sx={{ backgroundColor: "#282828", color: "white", padding:"10px", fontSize:"20px" }}
                        expandIcon={<ExpandMore />}
                      >
                        <div className="accordionTitle">
                          <img src={platformIcons.lazada}  />
                          <span>Lazada Price</span>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{ backgroundColor: "#151515", color: "white" }}
                      >
                        <GameCopiesEcommerceDataGrid title={gameDetail.title} />
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </div>

              <div>
                <ReviewList
                  gameId={gameDetail._id}
                  updateReview={updateReview}
                />
              </div>
            </div>
          </div>
        </DetailContainer>
      )}
    </div>
  );
};

export default GameDetail;

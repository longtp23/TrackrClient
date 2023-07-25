import { useAuthUser } from "react-auth-kit";
import { Navbar } from "../../../components/Common/navbar/Navbar";
import "./userProfileCollection.scss";
import { Link, useLocation } from "react-router-dom";
import {
  Casino,
  Done,
  ExpandMore,
  SentimentVeryDissatisfied,
  Settings,
  Summarize,
  VideogameAsset,
  VideogameAssetOff,
} from "@mui/icons-material";
import { UserProfileMenu } from "../../../components/userProfileMenu/UserProfileMenu";
import { userRequest } from "../../../requests/requestMethods";
import { useEffect, useState } from "react";
import { CollectionCatagoryChart } from "../../../components/Charts/collectionCatagoryChart/CollectionCatagoryChart";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from "@mui/material";
import { CollectionGameCards } from "../../../components/Cards/collectionGameCard/CollectionGameCards";

const UserProfileCollection = () => {
  const authUser = useAuthUser();
  const userId = authUser().userId;
  const location = useLocation().pathname.split("/")[3];
  const [collection, setCollection] = useState([]);
  const [collectionStats, setCollectionStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getCollection = async () => {
    const res = await userRequest.get(`/collection/${userId}`);
    setCollection(res.data.games);
  };

  const getCollectionStats = async () => {
    const res = await userRequest.get(`/collection/topDevGernes/${userId}`);
    setCollectionStats(res.data);
    setIsLoading(false);
  };
  console.log(isLoading);
  useEffect(() => {
    getCollection();
    getCollectionStats();
  }, []);

  const catagoryCount = () => {
    const catagoryCounted = collection.reduce((acc, curr) => {
      const existingCatagory = acc.find(
        (item) => item.catagory === curr.catagory
      );
      if (existingCatagory) {
        existingCatagory.timeAppear++;
      } else {
        acc.push({ catagory: curr.catagory, timeAppear: 1 });
      }
      return acc;
    }, []);

    return catagoryCounted;
  };

  const catagoryCountChartData = catagoryCount();

  const handleSetCollection = (data) => {
    setCollection(data);
    console.log(data);
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
          {!isLoading ? (
            <div className="accordionsWrapper">
              <div className="accordionWrapper">
                <Accordion>
                  <AccordionSummary
                    sx={{ backgroundColor: "#282828", color: "white" }}
                    expandIcon={<ExpandMore />}
                  >
                    <div className="accordionTitle">
                      <Summarize sx={{ marginRight: "10px" }} />
                      <span>Collection Summary</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ backgroundColor: "#151515", color: "white" }}
                  >
                    <div className="collectionSummary">
                      <div className="left">
                        <CollectionCatagoryChart
                          chartData={catagoryCountChartData}
                        />
                      </div>
                      <div className="right">
                        <div className="collectionSummaryItem">
                          total games:{" "}
                          <span style={{ color: "#9747ff" }}>
                            {collection?.length}
                          </span>
                        </div>
                        <div className="collectionSummaryItem">
                          genres:{" "}
                          <span style={{ color: "#f24822" }}>
                            {collectionStats.genres?.length}
                          </span>
                        </div>
                        <div className="collectionSummaryItem">
                          developers:{" "}
                          <span style={{ color: "#ffcd29" }}>
                            {collectionStats.developers?.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="accordionWrapper">
                <Accordion defaultExpanded={true}>
                  <AccordionSummary
                    sx={{ backgroundColor: "#282828", color: "white" }}
                    expandIcon={<ExpandMore />}
                  >
                    <div className="accordionTitle">
                      <Casino sx={{ marginRight: "10px" }} />
                      <span>Uncatagorized</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ backgroundColor: "#151515", color: "white" }}
                  >
                    {collection.filter(
                      (game) => game.catagory === "uncatagorized"
                    ).length !== 0 ? (
                      <CollectionGameCards
                        gameData={collection.filter(
                          (game) => game.catagory === "uncatagorized"
                        )}
                        collectionData={handleSetCollection}
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
                        <h3>No games here!</h3>
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
                      <VideogameAssetOff sx={{ marginRight: "10px" }} />
                      <span>Haven't Played</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ backgroundColor: "#151515", color: "white" }}
                  >
                    {collection.filter((game) => game.catagory === "notPlayed")
                      .length !== 0 ? (
                      <CollectionGameCards
                        gameData={collection.filter(
                          (game) => game.catagory === "notPlayed"
                        )}
                        collectionData={handleSetCollection}
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
                        <h3>No games here!</h3>
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
                      <VideogameAsset sx={{ marginRight: "10px" }} />
                      <span>Playing</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ backgroundColor: "#151515", color: "white" }}
                  >
                    {collection.filter((game) => game.catagory === "playing")
                      .length !== 0 ? (
                      <CollectionGameCards
                        gameData={collection.filter(
                          (game) => game.catagory === "playing"
                        )}
                        collectionData={handleSetCollection}
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
                        <h3>No games here!</h3>
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
                      <Done sx={{ marginRight: "10px" }} />
                      <span>Completed</span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ backgroundColor: "#151515", color: "white" }}
                  >
                    {collection.filter((game) => game.catagory === "completed")
                      .length !== 0 ? (
                      <CollectionGameCards
                        gameData={collection.filter(
                          (game) => game.catagory === "completed"
                        )}
                        collectionData={handleSetCollection}
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
                        <h3>No games here!</h3>
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

export default UserProfileCollection;

import { publicRequest } from "../../../requests/requestMethods";
import "./gameCopiesDataGridRaw.scss";
import { formatPrice } from "../../../utils/formatStrings";
import { platformIcons } from "../../../utils/platformIcons";
import { useAuthUser } from "react-auth-kit";

import React, { useEffect, useState } from "react";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  DoNotTouch,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import { PricingModal } from "../../Modals/pricingModal/PricingModal";
import styled, { css, keyframes } from "styled-components";
import { WarningModal } from "../../Modals/warningModal/WarningModal";
import { useToastError, useToastSuccess } from "../../../utils/toastSettings";
import { CircularProgress } from "@mui/material";

const neonAnimation = keyframes`
  from {
    text-shadow:
      0 0 19px rgba(151, 71, 255, .7),
      0 0 49px rgba(151, 71, 255, .7),
      0 0 109px rgba(151, 71, 255, .7);
  }
  to {
    text-shadow:
      0 0 14px rgba(151, 71, 255, .7),
      0 0 29px rgba(151, 71, 255, .7),
      0 0 69px rgba(151, 71, 255, .7);
  }
`;

const EditionText = styled.td`
  color: ${(props) => (props.edition === "Standard" ? "#f24822" : "#9747ff")};
  font-weight: bold;
  animation: ${(props) =>
    props.edition !== "Standard" &&
    css`
      ${neonAnimation} 6.5s alternate-reverse infinite
    `};
  text-align: center;
`;

const DisableButton = () => {
  return (
    <button
      style={{ backgroundColor: "#f24822" }}
      className=" rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <DoNotTouch />
    </button>
  );
};

const WarningContent = () => {
  return <p>Are you sure you want to disable this copy?</p>;
};

export const GameCopiesDataGridRaw = ({ title }) => {
  const [gameCopies, setGameCopies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [triggerState, setTriggerState] = useState(false);
  const authUser = useAuthUser();
  const isAdmin = authUser()?.isAdmin;

  const getGameCopies = async () => {
    setIsLoading(true);
    if(title){
      try {
        const response = await publicRequest.post(
          `/gameCopy/search?gameCopiesPerPage=15&page=${page}`,
          {
            title: title,
          }
        );
        setGameCopies(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }else return setIsLoading(false)
  };

  const handleNextPagination = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrevPagination = () => {
    setPage((prev) => prev - 1);
  };

  const extractEdition = (baseGameTitle, gameCopyTitle) => {
    const lowercaseTitle = gameCopyTitle.toLowerCase();
    const lowercaseBaseGame = baseGameTitle.toLowerCase();

    if (lowercaseTitle.includes("edition")) {
      const baseGameIndex = lowercaseTitle.indexOf(lowercaseBaseGame);
      if (baseGameIndex !== -1) {
        const startIndex = baseGameIndex + lowercaseBaseGame.length;
        const editionKeywordIndex = lowercaseTitle.indexOf(
          "edition",
          startIndex
        );

        if (editionKeywordIndex !== -1) {
          const editionName = gameCopyTitle
            .substring(startIndex, editionKeywordIndex)
            .trim()
            .replace(/([^A-Z\s])([A-Z])/g, "$1 $2")
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .trim();
          return editionName;
        }
      }
    }

    return "Standard";
  };

  const pickRandomColor = () => {
    const textColors = ["#ffcd29", "#f24822", "#9747ff", "#14ae5c"];
    return textColors[Math.floor(Math.random() * textColors.length)];
  };

  const renderPlatformImg = (platform) => {
    if (platform === "ps3" || platform === "ps2" || platform === "psVita") {
      const imgUrl = platformIcons.playstation;
      return <img className="platformLargeIcon" src={imgUrl} />;
    }
    if (platform === "ps5" || platform === "ps5Old") {
      const imgUrl = platformIcons.ps5;
      return <img className="platformSmallIcon" src={imgUrl} />;
    }
    if (platform === "ps4" || platform === "ps4Old") {
      const imgUrl = platformIcons.ps4;
      return <img className="platformSmallIcon" src={imgUrl} />;
    }
    if (platform === "xbox") {
      const imgUrl = platformIcons.xbox;
      return <img className="platformLargeIcon" src={imgUrl} />;
    }
    if (platform === "switch" || platform === "switchOld") {
      const imgUrl = platformIcons.switch;
      return <img className="platformLargeIcon" src={imgUrl} />;
    }
  };

  useEffect(() => {
    getGameCopies();
  }, [title, page, triggerState]);

  const handleDisableCopy = async (gameCopyId) => {
    try {
      const res = await publicRequest.put(`/gameCopy/disable/${gameCopyId}`, {
        gameCopyId,
      });
      if (res.data.type === "success") {
        setTriggerState(!triggerState);
        useToastSuccess(res.data.message);
      } else useToastError("Something went wrong!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!isLoading ? (
        <div>
          {gameCopies.length !== 0 ? (
            <div>
              <table>
                <thead>
                  <tr>
                    <th className="storeTable">Store</th>
                    <th className="platformTable">Platform</th>
                    <th className="conditionTable">Condition</th>
                    {!isAdmin ? (
                      <th style={{ textAlign: "center", width: "250px" }}>
                        Edition
                      </th>
                    ) : (
                      <th>Full title</th>
                    )}
                    <th>Current Price</th>
                    <th>Original Price</th>
                    <th className="actionTable">View Pricing</th>
                    {isAdmin && <th className="actionTable">Disable</th>}
                  </tr>
                </thead>
                <tbody>
                  {gameCopies.map((gameCopy) => (
                    <tr key={gameCopy._id}>
                      <td>
                        <a
                          target="_blank"
                          href={gameCopy.link}
                          style={{
                            color: pickRandomColor(),
                            fontWeight: "bold",
                          }}
                        >
                          {gameCopy.storeName}
                        </a>
                      </td>
                      <td>{renderPlatformImg(gameCopy.platform)} </td>
                      <td
                        style={{
                          color:
                            gameCopy.platform === "ps5Old" ||
                            gameCopy.platform === "ps4Old" ||
                            gameCopy.platform === "switchOld"
                              ? "#ffcd29"
                              : "#14ae5c",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        <a href={gameCopy.link} target="_blank">
                          {gameCopy.platform === "ps5Old" ||
                          gameCopy.platform === "ps4Old" ||
                          gameCopy.platform === "switchOld"
                            ? "Used"
                            : "New"}{" "}
                        </a>
                      </td>

                      {!isAdmin ? (
                        <EditionText
                          edition={extractEdition(title, gameCopy.title)}
                        >
                          <a href={gameCopy.link} target="_blank">
                            {extractEdition(title, gameCopy.title)}
                          </a>
                        </EditionText>
                      ) : (
                        <td>
                          <div
                            style={{
                              color: pickRandomColor(),
                              fontWeight: "bold",
                            }}
                          >
                            <a href={gameCopy.link} target="_blank">
                              {gameCopy.title}
                            </a>
                          </div>
                        </td>
                      )}

                      <td>
                        <a target="_blank" href={gameCopy.link}>
                          {formatPrice(gameCopy.retailPrice[0].price)}
                        </a>
                      </td>
                      <td>
                        <a target="_blank" href={gameCopy.link}>
                          {formatPrice(
                            !gameCopy.originalPrice
                              ? gameCopy.retailPrice[
                                  gameCopy.retailPrice.length - 1
                                ].price
                              : gameCopy.originalPrice
                          )}
                        </a>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <PricingModal priceData={gameCopy.retailPrice} />
                      </td>
                      {isAdmin && (
                        <td style={{ textAlign: "center" }}>
                          <WarningModal
                            InitiateComponent={DisableButton}
                            WarningContent={WarningContent}
                            confirmFunction={handleDisableCopy}
                            parameters={gameCopy._id}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  disabled={page === 1}
                  className="paginationButton"
                  onClick={handlePrevPagination}
                >
                  <ArrowBackIosNew />
                </button>
                <div className="w-9 text-center">{page}</div>
                <button
                  disabled={gameCopies?.length < 15}
                  className="paginationButton"
                  onClick={handleNextPagination}
                >
                  <ArrowForwardIos />
                </button>
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
              }}
            >
              <div>
                <SentimentVeryDissatisfied style={{ fontSize: "80px" }} />
              </div>
              <h3>No games here!</h3>
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
  );
};

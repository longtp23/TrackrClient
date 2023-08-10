import React, { useEffect, useState } from "react";
import "./gameItem.scss";
import { formatPrice, formatReleaseDate } from "../../../utils/formatStrings";
import { platformIcons } from "../../../utils/platformIcons";
import { publicRequest } from "../../../requests/requestMethods";
import {resize640} from "../../../utils/resizeImage"
import { Link } from "react-router-dom";

export const GameItem = ({ gameData }) => {
  const [gameCopies, setGameCopies] = useState([]);
  const getLowestPrice = (data, count) => {
    const sortedData = data.sort(
      (a, b) => a.retailPrice[0].price - b.retailPrice[0].price
    );
    return sortedData.slice(0, count);
  };



  useEffect(() => {
    const getGameCopies = async () => {
      const res = await publicRequest.post("/gameCopy/search", {
        title: gameData.title,
        storeName: "all"
      });
      const bestPriceCopies = getLowestPrice(res.data, 3);
      setGameCopies(bestPriceCopies);
    };
    getGameCopies();
  }, [gameData.title]);

  const filterPlatform = (gameCopy) => {
    if (
      gameCopy.platform === "ps3" ||
      gameCopy.platform === "ps2" ||
      gameCopy.platform === "psVita"
    ) {
      const imgUrl = platformIcons.playstation;
      return <img className="gameItemPlatformLargeIcon" src={imgUrl} />;
    }
    if (gameCopy.platform === "ps5" || gameCopy.platform === "ps5Old") {
      const imgUrl = platformIcons.ps5;
      return <img className="gameItemPlatformSmallIcon h-7" src={imgUrl} />;
    }
    if (gameCopy.platform === "ps4" || gameCopy.platform === "ps4Old") {
      const imgUrl = platformIcons.ps4;
      return <img className="gameItemPlatformSmallIcon" src={imgUrl} />;
    }
    if (gameCopy.platform === "xbox") {
      const imgUrl = platformIcons.xbox;
      return <img className="gameItemPlatformLargeIcon" src={imgUrl} />;
    }
    if (gameCopy.platform === "switch" || gameCopy.platform === "switchOld") {
      const imgUrl = platformIcons.switch;
      return <img className="gameItemPlatformLargeIcon" src={imgUrl} />;
    }
  };
  return (
    <div className="gameItemContainer">
      <Link to={`/game/${gameData.slug}`} className="gameItemImg">
        <img src={resize640(gameData.backgroundImage)} />
      </Link>
      <div className="gameItemInfo">
        <h3>{gameData.title}</h3>
        <div className="subGameItem">
          <div className="releaseDate">
            {formatReleaseDate(gameData.releaseDate)}
          </div>
          <div className="platforms">
            {gameData.platforms.map((platform,index) => {
              if (platform === "PlayStation")
                return <img key={index} src={platformIcons.playstation} />;
              if (platform === "Xbox") return <img key={index} src={platformIcons.xbox} />;
              if (platform === "Nintendo")
                return <img key={index} src={platformIcons.switch} />;
            })}
          </div>
        </div>
        <div className="bestPriceCopiesContainer mt-3">
          {gameCopies.map((gameCopy) => {
            return (
              <a href={gameCopy.link} target="_blank" key={gameCopy._id} className="bestPriceCopy flex">
                <span className="bestPriceCopyStore">{gameCopy.storeName}</span>
                <span className="bestPriceCopyPlatform">{filterPlatform(gameCopy)}</span>
                <span className="bestPriceCopyPrice">
                  {formatPrice(gameCopy.retailPrice[0].price)}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

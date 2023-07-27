import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requests/requestMethods";
import { GameItem } from "../Cards/gameItem/GameItem";
import GameListSkeleton from "./GameListSkeleton";
import "./gameList.scss";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { CircularProgress } from "@mui/material";
import { SentimentVeryDissatisfied } from "@mui/icons-material";

export const GameList = ({ price, platforms, genres, searchQuery }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const authUser = useAuthUser();
  let userId = authUser()?.userId;
  const getGames = async (page) => {
    let res;
    if (!userId) {
      userId = "";
    }
    setIsLoading(true);
    res = await publicRequest.post(
      `/game/searchCat?gamesPerPage=12&page=${page}&userId=${userId}`,
      { genres, platforms, price, searchQuery }
    );

    if (page === 1) {
      setGames(res.data);
    } else {
      setGames((prev) => [...prev, ...res.data]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setGames([]);
  }, [genres, platforms, price, searchQuery]);

  useEffect(() => {
    getGames(page);
  }, [page, genres, platforms, price, searchQuery]);

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
    <div className="gameListContainer">
      {isLoading && page === 1 ? (
        <GameListSkeleton cards={20} />
      ) : games.length === 0 ? (
        <div
          className="col-span-4"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "50px",
            padding: "20px 0px",
            height: "50%",
          }}
        >
          <div>
            <SentimentVeryDissatisfied style={{ fontSize: "80px" }} />
          </div>
          <h3>No games found!</h3>
        </div>
      ) : (
        games.map((game) => <GameItem key={game._id} gameData={game} />)
      )}
      {isLoading && (
        <div
          className="col-span-4"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // minHeight: "30vh",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

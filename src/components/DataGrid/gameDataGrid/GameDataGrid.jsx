import {
  ArrowBackIosNew,
  ArrowForwardIos,
  DoNotTouch,
  SentimentVeryDissatisfied,
  Wifi,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { publicRequest, userRequest } from "../../../requests/requestMethods";
import { resize200 } from "../../../utils/resizeImage";
import { useToastError, useToastSuccess } from "../../../utils/toastSettings";
import { WarningModal } from "../../Modals/warningModal/WarningModal";
import { EditGameModal } from "../../Modals/editGameModal/EditGameModal";

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
const EnableButton = () => {
  return (
    <button
      style={{ backgroundColor: "#14ae5c" }}
      className=" rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <Wifi />
    </button>
  );
};

const UpdateContent = () => {
  return <p>Are you sure you want to change this game's status</p>;
};

export const GameDataGrid = ({ gameData }) => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [triggerState, setTriggerState] = useState(false);
  const authUser = useAuthUser();
  const userId = authUser().userId;
  const getGames = async () => {
    const res = await publicRequest.post(
      `/game/search?gamesPerPage=12&page=${page}&userId=${userId}`,
      { searchQuery: gameData }
    );
    setGames(res.data);
  };

  useEffect(() => {
    getGames();
  }, [triggerState, gameData, page]);

  const handleChangeUserStatus = async (gameId) => {
    console.log(gameId);
    try {
      const res = await userRequest.put(`/game/status/${gameId}`);
      if (res.data.type === "success") {
        setTriggerState(!triggerState);
        useToastSuccess(res.data.message);
      } else useToastError("Something went wrong");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPagination = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrevPagination = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div>
      {games.length !== 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: "center", width: "300px" }}>Image</th>
                <th style={{ width: "250px" }}>Title</th>
                <th>Genre</th>
                <th>Developer</th>
                <th>Publisher</th>
                <th style={{ textAlign: "center" }}>Edit</th>
                <th style={{ textAlign: "center" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game._id}>
                  <td>
                    <Link target="_blank" to={`/game/${game.slug}`}>
                      <img
                        style={{ width: "100%" }}
                        src={resize200(game.backgroundImage)}
                      />
                    </Link>
                  </td>
                  <td>
                    <Link target="_blank" to={`/game/${game.slug}`}>
                      {game.title}
                    </Link>
                  </td>
                  <td>{game.genres[0]}</td>
                  <td>{game.developers[0]}</td>
                  <td>{game.publishers[0]}</td>
                  <td>
                    <EditGameModal gameData={game} />
                  </td>
                  <td>
                    {game.isDisabled === false ? (
                      <WarningModal
                        InitiateComponent={EnableButton}
                        WarningContent={UpdateContent}
                        confirmFunction={handleChangeUserStatus}
                        parameters={game._id}
                      />
                    ) : (
                      <WarningModal
                        InitiateComponent={DisableButton}
                        WarningContent={UpdateContent}
                        confirmFunction={handleChangeUserStatus}
                        parameters={game._id}
                      />
                    )}
                  </td>
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
              disabled={games?.length < 12}
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
          <h3>No games found!</h3>
        </div>
      )}
    </div>
  );
};

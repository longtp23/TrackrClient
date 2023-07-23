import { useAuthUser } from "react-auth-kit";
import { AdminSidebar } from "../../../components/adminSidebar/AdminSidebar";
import "./adminManageGames.scss";
import { GameDataGrid } from "../../../components/DataGrid/gameDataGrid/GameDataGrid";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import {useToastShow} from "../../../utils/toastSettings"

const AdminManageGames = () => {
  const authUser = useAuthUser();
  const [input, setInput] = useState();
  const [searchedGame, setSearchedGame] = useState();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearchGameCopies = (e) => {
    e.preventDefault();
    setSearchedGame(input);
    useToastShow("Search for games");
  };
  return (
    <div className="adminGamesContainer">
      <div className="adminGamesWrapper">
        <div className="left">
          <AdminSidebar authUser={authUser()} />
        </div>
        <div className="right">
          <div className="searchBarContainer">
            <form
              className="searchBarWrapper"
              onSubmit={handleSearchGameCopies}
            >
              <Search className="searchIcon" />
              <input
                type="text"
                className="searchBar"
                placeholder="search for games"
                onChange={handleInput}
              />
            </form>
          </div>
          <div style={{padding:"40px"}}>
          <GameDataGrid gameData={searchedGame}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageGames;

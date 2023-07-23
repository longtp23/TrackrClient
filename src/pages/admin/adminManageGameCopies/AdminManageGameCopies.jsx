import { useAuthUser } from "react-auth-kit";
import { AdminSidebar } from "../../../components/adminSidebar/AdminSidebar";
import "./adminManageGameCopies.scss";
import { useState } from "react";
import { ExpandMore, Language, Search } from "@mui/icons-material";
import { useToastShow } from "../../../utils/toastSettings";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { GameCopiesDataGridRaw } from "../../../components/DataGrid/gameCopiesDataGrid/GameCopiesDataGridRaw";
import { GameCopiesEcommerceDataGrid } from "../../../components/DataGrid/gameCopiesEcommerceDataGrid/GameCopiesEcommerceDataGrid";
import { platformIcons } from "../../../utils/platformIcons";

const AdminManageGameCopies = () => {
  const authUser = useAuthUser();
  const [input, setInput] = useState();
  const [searchedGame, setSearchedGame] = useState();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearchGameCopies = (e) => {
    e.preventDefault();
    setSearchedGame(input);
    useToastShow("Search for game copies");
  };
  return (
    <div className="adminGameCopiesContainer">
      <div className="adminGameCopiesWrapper">
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
                placeholder="search for game copies"
                onChange={handleInput}
              />
            </form>
          </div>
          <div className="gameCopiesTableContainer">
            <div className="gameCopiesTableWrapper">
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  sx={{
                    backgroundColor: "#282828",
                    color: "white",
                    padding: "10px",
                    fontSize: "20px",
                  }}
                  expandIcon={<ExpandMore />}
                >
                  <div style={{ marginLeft: "9px" }} className="accordionTitle">
                    <Language sx={{ marginRight: "10px" }} />
                    <span>Web Stores Price</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "#151515", color: "white" }}
                >
                  <GameCopiesDataGridRaw title={searchedGame} />
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="gameCopiesTableWrapper">
              <Accordion>
                <AccordionSummary
                  sx={{
                    backgroundColor: "#282828",
                    color: "white",
                    padding: "10px",
                    fontSize: "20px",
                  }}
                  expandIcon={<ExpandMore />}
                >
                  <div className="accordionTitle">
                    <img src={platformIcons.lazada} />
                    <span>Lazada Price</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "#151515", color: "white" }}
                >
                  <GameCopiesEcommerceDataGrid title={searchedGame} />
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageGameCopies;

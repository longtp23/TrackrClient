import { useState } from "react";
import { GameList } from "../../../components/gameList/GameList";
import { GameListPageFilter } from "../../../components/gameListPageFilter/GameListPageFilter";
import { Navbar } from "../../../components/Common/navbar/Navbar";
import "./gameListPage.scss";

const GameListPage = () => {
  const [filters, setFilters] = useState({});
  const handleFilters = (data) => {
    setFilters(data);
  };
  return (
    <div>
      <Navbar />
      <div className="gameListPageBodyContainer">
        <GameListPageFilter filters={handleFilters} />

        <GameList
          price={filters.price}
          platforms={filters.platforms}
          genres={filters.genres}
        />
      </div>
    </div>
  );
};

export default GameListPage;

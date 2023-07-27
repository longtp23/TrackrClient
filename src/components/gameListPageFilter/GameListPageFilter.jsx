import React, { useEffect, useState } from "react";
import "./gameListPageFilter.scss";
import { formatPrice } from "../../utils/formatStrings";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { useLocation, useNavigate } from "react-router-dom";
import { gameGenres } from "../../utils/gameGenres";

export const GameListPageFilter = ({ filters }) => {
  const [price, setPrice] = useState("");
  const [platform, setPlatform] = useState([]);
  const [genres, setGenres] = useState([]);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery);
  const handleGenreChange = (genre) => setGenres(genre);
  const handlePlatformChange = (platform) => setPlatform(platform);
  const handlePriceChange = (price) => setPrice(price);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchQuery(location.state?.searchQuery);
  }, [location.state?.searchQuery]);
  useEffect(() => {
    filters({ price, platforms: platform, genres, searchQuery });
  }, [price, platform, genres, searchQuery]);
  const clearFilter = () => {
    setGenres(undefined);
    setPlatform(undefined);
    setPrice(undefined);
    setSearchQuery(undefined);
    navigate("/games", {
      state: { ...location.state, searchQuery: undefined },
    });
    window.scrollTo(0, 0);
  };

  const submitFilter = () => {
    filters({ price, platforms: platform, genres });
  };

  const handleScrollTop = () => window.scrollTo(0, 0);

  return (
    <div className="gameListPageFilterContainer">
      <h3 className="filterTitle">Find Your Game</h3>
      <div className="filterCatagoryWrapper">
        <h3>Price</h3>
        <div className="inputsWrapper" onClick={handleScrollTop}>
          <label className="inputLabel">
            <input
              type="radio"
              name="price"
              value="under500"
              onChange={(e) => handlePriceChange(e.target.value)}
            />
            Under {formatPrice(500000)}
          </label>

          <label className="inputLabel">
            <input
              type="radio"
              name="price"
              value="500-1M"
              onChange={(e) => handlePriceChange(e.target.value)}
            />
            {formatPrice(500000)} - {formatPrice(1000000)}
          </label>

          <label className="inputLabel">
            <input
              type="radio"
              name="price"
              value="1M-1M4"
              onChange={(e) => handlePriceChange(e.target.value)}
            />
            {formatPrice(1000000)} - {formatPrice(1400000)}
          </label>
          <label className="inputLabel">
            <input
              type="radio"
              name="price"
              value="over1M4"
              onChange={(e) => handlePriceChange(e.target.value)}
            />
            Over {formatPrice(1400000)}
          </label>
        </div>
      </div>
      <div className="filterCatagoryWrapper">
        <h3>Platform</h3>
        <ToggleButtonGroup
          type="checkbox"
          value={platform}
          onChange={handlePlatformChange}
          className="platformsToggleBtnGr"
          onClick={handleScrollTop}
        >
          <ToggleButton id="tbg-btn-ps" value="PlayStation">
            Playstation
          </ToggleButton>
          <ToggleButton id="tbg-btn-xbox" value="Xbox">
            Xbox
          </ToggleButton>
          <ToggleButton id="tbg-btn-nintendo" value="Nintendo">
            Nintendo
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="filterCatagoryWrapper">
        <h3>Genre</h3>
        <ToggleButtonGroup
          type="checkbox"
          value={genres}
          onChange={handleGenreChange}
          className="genresToggleBtnGr"
          onClick={handleScrollTop}
        >
          {gameGenres.map((genre, index) => (
            <ToggleButton key={index} id={`tbg-btn-${index + 1}`} value={genre}>
              {genre}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className="btnWrapper">
        <button onClick={clearFilter} className="clearFilter">
          Clear
        </button>
        <button onClick={submitFilter} className="submitFilter">
          Filter
        </button>
      </div>
    </div>
  );
};

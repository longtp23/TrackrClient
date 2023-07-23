import React, { useEffect, useState } from "react";
import "./gameListPageFilter.scss";
import { formatPrice } from "../../utils/formatStrings";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

export const GameListPageFilter = ({ filters }) => {
  const [price, setPrice] = useState("");
  const [platform, setPlatform] = useState([]);
  const [genres, setGenres] = useState([]);
  const handleGenreChange = (genre) => setGenres(genre);
  const handlePlatformChange = (platform) => setPlatform(platform);
  const handlePriceChange = (price) => setPrice(price);
  // console.log(genres);
  // console.log(platform);
  // console.log(price);
  useEffect(() => {
    filters({ price, platforms: platform, genres });
  }, [price, platform, genres]);

  const clearFilter = () => {
    setGenres(undefined);
    setPlatform(undefined);
    setPrice(undefined);
    window.scrollTo(0,0)
  };

  const submitFilter = () => {
    filters({ price, platforms: platform, genres });
  };


  const handleScrollTop = ()=>window.scrollTo(0,0)

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
          <ToggleButton id="tbg-btn-1" value="Action">
            Action
          </ToggleButton>

          <ToggleButton id="tbg-btn-2" value="Adventure">
            Adventure
          </ToggleButton>
          <ToggleButton id="tbg-btn-3" value="RPG">
            RPG
          </ToggleButton>
          <ToggleButton id="tbg-btn-4" value="Shooter">
            Shooter
          </ToggleButton>
          <ToggleButton id="tbg-btn-5" value="Indie">
            Indie
          </ToggleButton>
          <ToggleButton id="tbg-btn-6" value="Horror">
            Horror
          </ToggleButton>
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

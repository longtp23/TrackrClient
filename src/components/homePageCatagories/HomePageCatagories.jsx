import { useState } from "react";
import { HomePageCatagory } from "./HomePageCatagory";
import "./homePageCatagories.scss";
import { useNavigate } from "react-router-dom";

export const HomePageCatagories = () => {
  const [searchedGenre, setSearchedGenre] = useState("");
  const navigate = useNavigate();
  const handleSearchedGenre = (data) => {
    setSearchedGenre(data);
    console.log(searchedGenre);
  };
  if (searchedGenre) {
    navigate("/games", {
      state: {
        searchQuery: searchedGenre,
      },
    });
  }
  return (
    <div className="homePageCatagoriesContainer">
      <div className="homePageTagline">
        <h1>TRACK THE PRICE OF YOUR FAVOURITE GAMES</h1>
      </div>
      <div className="catagoriesGrid">
        <HomePageCatagory
          img={
            "https://firebasestorage.googleapis.com/v0/b/gamedatabase-45636.appspot.com/o/god-of-war-walkthrough-guide-5004-1642178551828.webp?alt=media&token=08bd8b2d-861b-4fb8-8a67-ea662a21fa51"
          }
          span={2}
          genre={"Action"}
          searchGenre={handleSearchedGenre}
        />

        <HomePageCatagory
          img={
            "https://firebasestorage.googleapis.com/v0/b/gamedatabase-45636.appspot.com/o/ac4_ss4_full.webp?alt=media&token=7c7ef6f2-f706-4ce5-ac26-0f2c1be1a464"
          }
          span={2}
          genre={"Adventure"}
          searchGenre={handleSearchedGenre}
        />
        <HomePageCatagory
          img={
            "https://firebasestorage.googleapis.com/v0/b/gamedatabase-45636.appspot.com/o/the_witcher_3_wide-eeb82d3f26b893b22d9c51611ab6525abd043a13-s1400-c100.jpg?alt=media&token=1e3b7688-d2e8-454e-a635-d33b818ef9df"
          }
          span={2}
          genre={"RPG"}
          searchGenre={handleSearchedGenre}
        />
        <HomePageCatagory
          img={
            "https://firebasestorage.googleapis.com/v0/b/gamedatabase-45636.appspot.com/o/0046697_tom-clancys-rainbow-six-siege-row.avif?alt=media&token=30c79da6-df42-41a7-b13d-775611c8956b"
          }
          span={3}
          genre={"Shooter"}
          searchGenre={handleSearchedGenre}
        />
        <HomePageCatagory
          img={
            "https://firebasestorage.googleapis.com/v0/b/gamedatabase-45636.appspot.com/o/street-figher-6-editions-167697170525348006.jpg?alt=media&token=526b0386-0e16-4716-bdaa-6839f1ab75c6"
          }
          span={3}
          genre={"Fighting"}
          searchGenre={handleSearchedGenre}
        />
      </div>
    </div>
  );
};

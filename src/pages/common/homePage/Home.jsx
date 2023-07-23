import { Navbar } from "../../../components/Common/navbar/Navbar";
import { Carousel } from "../../../components/Carousels/carousel/Carousel";
import "./home.scss";
import React from "react";
import { HomePageCatagories } from "../../../components/homePageCatagories/HomePageCatagories";
import { platformIcons } from "../../../utils/platformIcons";
import { Footer } from "../../../components/Common/footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="bodyContainer">
        <Carousel />
        <HomePageCatagories />
        <div className="storePlatformsContainer">
          <div className="homePageTagline">
            <h1>LATEST PRICE ACROSS VARIOUS PLATFORMS</h1>
          </div>
          <div className="storePlatformsWrapper">
            <div className="storePlatform">
              <img src={platformIcons.webStore} />
              <h3>Trusted Online Stores</h3>
            </div>
            <div className="storePlatform">
              <img src={platformIcons.lazada} />
              <h3>Lazada</h3>
            </div>
            <div className="storePlatform">
              <img src={platformIcons.tiki} />
              <h3>Tiki</h3>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;

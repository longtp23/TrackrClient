import "./previewCarousel.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { resize640Detail } from "../../../utils/resizeImage";
import { SentimentVeryDissatisfied } from "@mui/icons-material";

export const PreviewCarousel = ({ screenshots }) => {
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
  };

  return (
    <div className="previewCarouselContainer" 
    style={{marginRight:"0px"}}
    >
      {Object.keys(screenshots).length !== 0 ? (
        <Slider {...settings}>
            <img
              className="imageDetailCarousel"
              src={resize640Detail(screenshots?.backgroundImage)}
              alt=""
            />
            <img
              className="imageDetailCarousel"
              src={resize640Detail(screenshots?.shortScreenshot1)}
              alt=""
            />
            <img
              className="imageDetailCarousel"
              src={resize640Detail(screenshots?.shortScreenshot2)}
              alt=""
            />
            <img
              className="imageDetailCarousel"
              src={resize640Detail(screenshots?.shortScreenshot3)}
              alt=""
            />
        </Slider>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "50px",
            padding: "20px 0px",
            border:"2px solid gray",
            borderRadius:"15px"
          }}
        >
          <div>
            <SentimentVeryDissatisfied style={{ fontSize: "80px" }} />
          </div>
          <h3>No images here!</h3>
        </div>
      )}
    </div>
  );
};

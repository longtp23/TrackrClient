import "./detailCarousel.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { resize640Detail } from "../../../utils/resizeImage";

export const DetailCarousel = ({ screenshots }) => {
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 6000,
    pauseOnHover: false,
  };

  return (
    <div className="imageDetailCarouselContainer">
      <Slider {...settings}>
        {screenshots.map((screenshot, index) => (
            <img
            key={index}
              className="imageDetailCarousel"
              src={resize640Detail(screenshot)}
              alt=""
            />
        ))}
      </Slider>
    </div>
  );
};

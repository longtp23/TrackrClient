import { useNavigate } from "react-router-dom";
import "./homePageCatagory.scss";
import styled from "styled-components";

const CatagoryContainer = styled.div`
  grid-column: span ${(props) => props.span};
`;

export const HomePageCatagory = ({ span, img, genre }) => {
  const navigate = useNavigate();
  const handleNavigate = (genre) => {
    navigate("/games", {
      state: {
        searchQuery: genre,
      },
    });
  };
  return (
    <CatagoryContainer
      onClick={() => {
        handleNavigate(genre);
      }}
      span={span}
    >
      <div className="catagoryImgWrapper">
        <div className="catagoryInfoWrapper">
          <h3>{genre}</h3>
        </div>
        <img src={img} />
      </div>
    </CatagoryContainer>
  );
};

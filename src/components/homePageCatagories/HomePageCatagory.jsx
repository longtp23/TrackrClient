import "./homePageCatagory.scss";
import styled from "styled-components";

const CatagoryContainer = styled.div`
  grid-column: span ${(props) => props.span};
`;

export const HomePageCatagory = ({ span, img, genre, searchGenre }) => {
  const handleGenre = () => {
    searchGenre(genre);
  };
  return (
    <CatagoryContainer onClick={handleGenre} span={span}>
      <div className="catagoryImgWrapper">
        <div className="catagoryInfoWrapper">
          <h3>{genre}</h3>
        </div>
      <img src={img} />
      </div>
    </CatagoryContainer>
  );
};

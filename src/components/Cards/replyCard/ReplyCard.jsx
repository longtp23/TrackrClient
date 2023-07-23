import { Reply } from "@mui/icons-material";
import "./replyCard.scss";
import { formatTimePosted } from "../../../utils/formatStrings";
import styled from "styled-components";

const HelpfulButton = styled.button`
  background-color: ${(props) =>
    props.name === "helpful" ? "#14ae5c" : "#f24822"};
  color: black;
  margin-left: 5px;
  border-radius: 3px;
  padding: 3px 8px;
  font-weight: 300;
  font-style: normal;
  transition: all ease 0.2s;
  cursor: default;
  &:hover {
    background-color: ${(props) =>
      props.name === "helpful" ? "#19d972" : "#ff4e27"};
  }
`;

export const ReplyCard = ({ reply, helpful }) => {
  const replyUserId = reply.replyUserId;
  const ratedUser = helpful.find((user) => user.helpfulUserId === replyUserId);

  let helpfulBanner;

  if (ratedUser) {
    helpfulBanner = {
      color: ratedUser.type === "helpful" ? "#19d972" : "#ff4e27",
      text: ratedUser.type === "helpful" ? "helpful" : "not helpful",
    };
  }

  return (
    <div className="replyCardWrapper">
      <div className="left">
        <Reply fontSize="inherit" />
      </div>
      <div className="right">
        <div className="replyInfo">
          <div className="replyUserInfo">{reply.replyUsername}</div>
          {ratedUser && (
            <div className="isHelpful">
              this person find the review
              <HelpfulButton name={ratedUser.type}>
                {helpfulBanner.text}
              </HelpfulButton>
            </div>
          )}
          <div className="timestamp">
            posted {formatTimePosted(reply.replyTimeStamp)}
          </div>
        </div>
        <div className="replyContent">{reply.replyContent}</div>
      </div>
    </div>
  );
};

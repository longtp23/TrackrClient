import { useAuthUser } from "react-auth-kit";
import { formatTimePosted } from "../../../utils/formatStrings";
import { userRequest } from "../../../requests/requestMethods";
import "./reviewCard.scss";
import {
  ExpandMore,
  ThumbDownAlt,
  ThumbUpAlt,
  ThumbsUpDown,
} from "@mui/icons-material";
import styled from "styled-components";
import { useState } from "react";
import { ReplyCard } from "../replyCard/ReplyCard";
import { toast } from "react-toastify";
import { toastSettings } from "../../../utils/toastSettings";
import { ReplyFormModal } from "../../Modals/replyFormModal/ReplyFormModal";

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
  &:hover {
    background-color: ${(props) =>
      props.name === "helpful" ? "#19d972" : "#ff4e27"};
  }
`;

export const ReviewCard = ({ review, onReviewCardChange, style }) => {
  let borderColor;
  if (review.rating === "good") borderColor = "#14ae5c";
  if (review.rating === "bad") borderColor = "#f24822";
  if (review.rating === "neutral") borderColor = "#ffcd29";

  const userAuth = useAuthUser();
  const userId = userAuth()?.userId;
  const [showReplies, setShowReplies] = useState(false);

  const handleShowReplies = () => {
    setShowReplies((prevState) => !prevState);
  };

  const helpfulCount = review.helpful.reduce((accumulator, isHelpful) => {
    if (isHelpful.type === "helpful") {
      return accumulator + 1;
    } else {
      return accumulator;
    }
  }, 0);

  const handleHelpful = async (value) => {
    await userRequest.put(
      `/review/isHelpful/${review._id}?userId=${userId}&type=${value}`
    );
    if (value === "helpful")
      toast.success("You find this review to be helpful!", {
        ...toastSettings,
      });
    else toast.error("You find this review not helpful!", { ...toastSettings });
    onReviewCardChange();
  };

  const handleReplyChange = () => {
    onReviewCardChange();
  };

  return (
    <div className="reviewCardContainer" style={style}>
      <div
        className="reviewCardWrapper"
        style={{ border: `3px solid ${borderColor}` }}
      >
        <div
          className="top"
          style={{ borderBottom: `3px solid ${borderColor}` }}
        >
          <div className="rating" style={{ backgroundColor: borderColor }}>
            {review.rating === "good" ? (
              <ThumbUpAlt fontSize="inherit" />
            ) : review.rating === "neutral" ? (
              <ThumbsUpDown fontSize="inherit" />
            ) : review.rating === "bad" ? (
              <ThumbDownAlt fontSize="inherit" />
            ) : (
              <div></div>
            )}
          </div>
          <div className="reviewInfo">
            <div className="userInfo">
              <div className="storeName">{review.storeName}</div>
              <div className="username">{review.username}</div>
            </div>
            {review.helpful.length !== 0 && (
              <div className="helpfulCount">
                <b>
                  {helpfulCount} of {review.helpful.length} people{" "}
                </b>{" "}
                find this review helpful
              </div>
            )}
            <div className="timestamp">
              posted {formatTimePosted(review.timeStamp)}
            </div>
          </div>
          <div className="timestamp"></div>
        </div>
        <div className="middle">{review.reviewContent}</div>
        <div className="bottom">
          <div className="replyButtons">
            {review.replies.length !== 0 && (
              <div className="replyItem">
                <ExpandMore />
                <button onClick={handleShowReplies}>
                  Show {review.replies.length} replies
                </button>
              </div>
            )}

            {!style && (
              <div className="replyItem">
                <ReplyFormModal
                  reviewUsername={review.username}
                  reviewId={review._id}
                  onReplyChange={handleReplyChange}
                />
              </div>
            )}
          </div>
          {!style && (
            <div className="helpfulButtons">
              this review was
              <HelpfulButton
                onClick={() => handleHelpful("helpful")}
                name="helpful"
              >
                helpful
              </HelpfulButton>
              <HelpfulButton
                onClick={() => handleHelpful("notHelpful")}
                name="not helpful"
              >
                not helpful
              </HelpfulButton>
            </div>
          )}
        </div>
      </div>
      {showReplies && (
        <div className="replies">
          {review.replies.map((reply) => (
            <ReplyCard key={reply._id} reply={reply} helpful={review.helpful} />
          ))}
        </div>
      )}
    </div>
  );
};

import React from "react";
import "./userProfileMenu.scss";
import { Link } from "react-router-dom";

export const UserProfileMenu = ({ location, userId }) => {
  const userProfileMenuItems = [
    "Overview",
    "Collection",
    "Reviews",
    "Wishlist",
  ];
  return (
    <div className="userProfileMenu">
      {userProfileMenuItems.map((userProfileMenuItem, index) => (
        <Link key={index} to={`/userProfile/${location[2]}/${userProfileMenuItem}`}>
          <div
            className={
              location[3] === userProfileMenuItem
                ? "userProfileMenuItem selected"
                : "userProfileMenuItem"
            }
          >
            {userProfileMenuItem}
          </div>
        </Link>
      ))}
    </div>
  );
};

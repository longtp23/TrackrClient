import React, { useEffect, useState } from "react";
import { userRequest } from "../../requests/requestMethods";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { Settings } from "@mui/icons-material";

export const UserProfileUserInfo = () => {
  const authUser = useAuthUser();
  const userId = authUser().userId;
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await userRequest.get(`/user/getUserInfo/${userId}`);
      setUserInfo(res.data);
    };
    getUserInfo();
  }, []);
  return (
    <div className="userProfileUserInfo">
      <div className="left">
        <img src={authUser().profilePic} />
        <h1>{userInfo.username}</h1>
      </div>
      <div className="right">
        <Link to={`/userProfile/${userId}/Settings`}>
          <button className="userProfileSettingBtn">
            <Settings style={{ marginRight: "5px" }} /> Settings
          </button>
        </Link>
      </div>
    </div>
  );
};

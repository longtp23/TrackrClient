import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useLocation } from "react-router-dom";
import { Navbar } from "../../../components/Common/navbar/Navbar";
import { ConfirmPasswordModal } from "../../../components/Modals/confirmPasswordModal/ConfirmPasswordModal";
import { UserProfileMenu } from "../../../components/userProfileMenu/UserProfileMenu";
import { UserProfileUserInfo } from "../../../components/userProfileUserInfo/UserProfileUserInfo";
import { userRequest } from "../../../requests/requestMethods";
import "./userProfileSettings.scss";

const UserProfileSettings = () => {
  const authUser = useAuthUser();
  const userId = authUser().userId;
  const location = useLocation().pathname.split("/")[3];
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await userRequest.get(`/user/getUserInfo/${userId}`);
      setUserInfo(res.data);
    };
    getUserInfo();
  }, []);
  const [inputs, setInputs] = useState({});
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
  };
  return (
    <div>
      <Navbar />
      <div className="userProfileContainer">
        <div className="userProfileWrapper">
          <UserProfileUserInfo />
          <UserProfileMenu location={location} userId={userId} />
          <div className="userProfileSettingsContainer">
            <div className="userInfoInputsContainer">
              <div className="userInfoInputContainer">
                <TextField
                  style={{ width: "230px" }}
                  label="Username"
                  variant="outlined"
                  name="newUsername"
                  placeholder={userInfo.username}
                  onChange={handleInputChange}
                  color="info"
                />
              </div>
              <div className="userInfoInputContainer">
                <TextField
                  style={{ width: "230px" }}
                  label="Email"
                  variant="outlined"
                  name="newEmail"
                  placeholder={userInfo.email}
                  onChange={handleInputChange}
                  color="info"
                />
              </div>
              <div className="userInfoInputContainer">
                <TextField
                  style={{ width: "230px" }}
                  label="Password"
                  variant="outlined"
                  name="newPassword"
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  color="info"
                />
              </div>
              <div className="userInfoInputContainer">
                <TextField
                  style={{ width: "230px" }}
                  label="Confirm Password"
                  variant="outlined"
                  name="comfirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleInputChange}
                  color="info"
                />
              </div>
            </div>
            <div style={{ padding: "0px 40px" }}>
              <ConfirmPasswordModal userInfo={inputs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;

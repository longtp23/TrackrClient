import { useAuthUser } from "react-auth-kit";
import { Navbar } from "../../../components/Common/navbar/Navbar";
import "./userProfileSettings.scss";
import { Link, useLocation } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import { UserProfileMenu } from "../../../components/userProfileMenu/UserProfileMenu";
import { useEffect, useState } from "react";
import { ConfirmPasswordModal } from "../../../components/Modals/confirmPasswordModal/ConfirmPasswordModal";
import { UserProfileUserInfo } from "../../../components/userProfileUserInfo/UserProfileUserInfo";
import { userRequest } from "../../../requests/requestMethods";

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
          <UserProfileUserInfo/>
          <UserProfileMenu location={location} userId={userId} />
          <div className="userProfileSettingsContainer">
            <div className="userInfoInputsContainer">
              <div className="userInfoInputContainer">
                <div>
                  <label htmlFor="username">Username</label>
                </div>
                <input
                  name="newUsername"
                  type="text"
                  placeholder={userInfo.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userInfoInputContainer">
                <div>
                  <label htmlFor="email">Email</label>
                </div>
                <input
                  name="newEmail"
                  type="text"
                  placeholder={userInfo.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userInfoInputContainer">
                <div>
                  <label htmlFor="password">Password</label>
                </div>
                <input
                  name="newPassword"
                  type="password"
                  placeholder={"Password"}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userInfoInputContainer">
                <div>
                  <label htmlFor="password">Comfirm Password</label>
                </div>
                <input
                  name="comfirmPassword"
                  type="password"
                  placeholder={"Comfirm Password"}
                  onChange={handleInputChange}
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

import "./navbar.scss";
import {
  Games,
  Logout,
  ManageAccounts,
  Notifications,
  RateReview,
  Search,
  Settings,
  ShoppingCart,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../../../requests/requestMethods";
import { formatPrice, formatTimePosted } from "../../../utils/formatStrings";

export const Navbar = () => {
  const navigate = useNavigate();
  const [searchedItem, setSearchedItem] = useState("");
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const signOut = useSignOut();
  const authUser = useAuthUser();
  const userId = authUser()?.userId;
  const isAuthenticated = authUser();

  const pickRandomColor = () => {
    const textColors = ["#ffcd29", "#f24822", "#9747ff"];
    return textColors[Math.floor(Math.random() * textColors.length)];
  };

  const handleNotification = () => {
    setOpen(!open);
  };
  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const handleSearchItemInput = (e) => {
    setSearchedItem(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/games", {
      state: {
        searchQuery: searchedItem,
      },
    });
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  useEffect(() => {
    const getNotifications = async () => {
      if (!authUser()) return;
      const res = await userRequest.get(`/notification/${userId}`);
      setNotifications(res.data.notifications.reverse().slice(0, 5));
    };
    getNotifications();
  }, [userId]);

  return (
    <div className="navbarContainer h-20">
      <div className="left">
        <Link className="logoWrapper" to="/">
          <h1 className="logoLeft">TRACK</h1>
          <h1 className="logoRight">r</h1>
        </Link>
        <div className="navBarItemWrapper">
          { authUser()?.isAdmin &&
          <Link className="navBarItem" to="/admin">
            <div style={{display:"flex", alignItems:"center"}}><ManageAccounts style={{marginRight:"10px", color:"#ffcd29"}}/> Manange</div>
          </Link>}
          <Link className="navBarItem" to="/games">
            <div style={{display:"flex", alignItems:"center"}}><Games style={{marginRight:"10px", color:"#14ae5c"}}/> Games</div>
          </Link>
          <div className="navBarItem">
            <Link to="/reviews">
            <div style={{display:"flex", alignItems:"center"}}><RateReview style={{marginRight:"10px", color:"#0d99ff"}}/> Reviews</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="center">
        <form className="searchBarWrapper" onSubmit={handleSearch}>
          <Search className="searchIcon" onClick={handleSearch} />
          <input
            type="text"
            className="searchBar"
            placeholder="search for your games"
            onKeyUp={handleKey}
            onChange={handleSearchItemInput}
          />
        </form>
      </div>
      <div className="right">
        <div className="navBarItemWrapper">
          <Link to={`/userProfile/${userId}/Wishlist`}>
            <ShoppingCart className="navBarItem wishlist" />
          </Link>
          <div className="notificationDropdown">
            <Notifications
              className="navBarItem notification"
              onClick={handleNotification}
            />
            {open && (
              <div className="notificationDropdownContent">
                <h3>Notifications</h3>
                {notifications.map((notification) => (
                  <Link
                    to={`/game/${notification.notificationGameSlug}`}
                    key={notification._id}
                  >
                    <div className="notification">
                      <span>
                        Better price for your game{" "}
                        <b style={{ color: pickRandomColor() }}>
                          {notification.notificationGameTitle}
                        </b>{" "}
                        starting at{" "}
                        <b>{formatPrice(notification.notificationPrice)}</b> of{" "}
                        <b style={{ color: pickRandomColor() }}>
                          {notification.notificationStore}
                        </b>
                      </span>
                      <div>{formatTimePosted(notification.timeStamp)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {isAuthenticated ? (
            <div className="dropdownMenu">
              <Link
                to={`/userProfile/${userId}/Overview`}
                className="profilePic"
              >
                <img src={authUser()?.profilePic} />
              </Link>
              <div className="dropdownContent">
                <Link to={`/userProfile/${userId}/Settings`}>
                  <Settings />
                  Settings
                </Link>
                <button onClick={handleSignOut}>
                  <Logout />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <h3>Sign In</h3>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

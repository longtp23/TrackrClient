import { Link, useLocation, useNavigate } from "react-router-dom";
import "./adminSidebar.scss";
import { AddCircle, Album, FirstPage, Games, Home, Http, Logout, Person } from "@mui/icons-material";
import { useSignOut } from "react-auth-kit";

export const AdminSidebar = ({ authUser }) => {
const location = useLocation().pathname.split("/")[2];
const signOut = useSignOut();
const navigate = useNavigate();
const handleSignout = () => {
  signOut();
  navigate("/");
}
  return (
    <div className="adminSidebarContainer">
      <div className="adminProfilePic">
        <img src={authUser.profilePic} />
      </div>
      <h3>{authUser.username}</h3>
      <div className="adminSidebarItemsContainer">
        <Link to="/admin">
        <div className={!location ? "adminSidebarItem selected" : "adminSidebarItem"}>
          <Home /> <span>Home</span>
        </div>
        </Link>
        <Link to="/admin/users">
        <div className={location === "users"?"adminSidebarItem selected" : "adminSidebarItem"}>
          <Person /> <span>Manage Users</span>
        </div>
        </Link>
        <Link to="/admin/games">
        <div className={location === "games"?"adminSidebarItem selected" : "adminSidebarItem"}>
          <Games /> <span>Manage Games</span>
        </div>
        </Link>
        <Link to="/admin/gameCopies">
        <div className={location === "gameCopies"?"adminSidebarItem selected" : "adminSidebarItem"}>
          <Album /> <span>Manage Copies</span>
        </div>
        </Link>
        <Link to="/admin/addGame">
        <div className={location === "addGame"?"adminSidebarItem selected" : "adminSidebarItem"}>
          <AddCircle /> <span>Add new game</span>
        </div>
        </Link>
        <Link to="/admin/scrape">
        <div className="adminSidebarItem">
          <Http /> <span>Scrape for copies</span>
        </div>
        </Link>
        <Link to="/">
        <div className="adminSidebarItem">
          <FirstPage /> <span>Back to the site</span>
        </div>
        </Link>
        <div className="adminSidebarItem" onClick={handleSignout}>
          <Logout /> <span>Sign out</span>
        </div>
      </div>
    </div>
  );
};

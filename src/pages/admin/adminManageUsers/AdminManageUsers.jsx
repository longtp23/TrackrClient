import { useAuthUser } from "react-auth-kit";
import "./adminManageUsers.scss";
import { AdminSidebar } from "../../../components/adminSidebar/AdminSidebar";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { UserDataGrid } from "../../../components/DataGrid/userDataGrid/UserDataGrid";
import { useToastShow } from "../../../utils/toastSettings";

const AdminManageUsers = () => {
  const authUser = useAuthUser();
  const [input, setInput] = useState();
  const [searchedUser, setSearchedUser] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearchUsers = (e) => {
    e.preventDefault();
    setSearchedUser(input);
    useToastShow("Search for user");
  };

  return (
    <div className="adminUsersContainer">
      <div className="adminUsersWrapper">
        <div className="left">
          <AdminSidebar authUser={authUser()} />
        </div>
        <div className="right">
          <div className="searchBarContainer">
            <form className="searchBarWrapper" onSubmit={handleSearchUsers}>
              <Search className="searchIcon" />
              <input
                type="text"
                className="searchBar"
                placeholder="search for users"
                onChange={handleInput}
              />
            </form>
          </div>
          <div className="userDataTableWrapper">
            <UserDataGrid userData={searchedUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageUsers;

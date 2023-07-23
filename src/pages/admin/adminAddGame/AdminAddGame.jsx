import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useAuthUser } from "react-auth-kit";
import { AdminSidebar } from "../../../components/adminSidebar/AdminSidebar";
import "./adminAddGame.scss";

import React, { useState } from "react";

const AdminAddGame = () => {
  const [value, setValue] = useState(dayjs());
  console.log(value.format("YYYY-MM-DD"));
  const authUser = useAuthUser();
  return (
    <div className="adminAddGameContainer">
      <div className="adminAddGameWrapper">
        <div className="left">
          <AdminSidebar authUser={authUser()} />
        </div>
        <div className="right">
          <div className="adminAddGameTitle">Add a new game</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default AdminAddGame;

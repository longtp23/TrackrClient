import React, { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../../requests/requestMethods";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  DoNotTouch,
  SentimentVeryDissatisfied,
  Wifi,
} from "@mui/icons-material";
import { useToastError, useToastSuccess } from "../../../utils/toastSettings";
import { WarningModal } from "../../Modals/warningModal/WarningModal";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DisableButton = () => {
  return (
    <button
      style={{ backgroundColor: "#f24822" }}
      className=" rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <DoNotTouch />
    </button>
  );
};
const EnableButton = () => {
  return (
    <button
      style={{ backgroundColor: "#14ae5c" }}
      className=" rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <Wifi />
    </button>
  );
};

const UpdateContent = () => {
  return <p>Are you sure you want to change this user's status</p>;
};

export const UserDataGrid = ({ userData }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true)
  const [triggerState, setTriggerState] = useState(false);
  const getUsers = async () => {
    setIsLoading(true)
    try {
      const res = await publicRequest.get(
        `/user/getUsersList?usersPerPage=10&page=${page}&query=${userData}`
      );
      if (res.data.type === "success") {
        useToastSuccess(res.data.message);
        setUsers(res.data.users);
        setIsLoading(false)
      } else {
        setUsers(res.data.users);
        useToastError(res.data.message);
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPagination = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrevPagination = () => {
    setPage((prev) => prev - 1);
  };

  useEffect(() => {
    getUsers();
  }, [userData, page, triggerState]);

  const handleChangeUserStatus = async (userId) => {
    try {
      const res = await userRequest.put(`/user/updateStatus/${userId}`);
      if (res.data.type === "success") {
        useToastSuccess(res.data.message);
        setTriggerState(!triggerState);
      } else useToastError("Something went wrong!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!isLoading ? (
        <div>
          {users.length !== 0 ? (
            <div>
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", width: "400px" }}>
                      Profile Picture
                    </th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td style={{ textAlign: "center" }}>
                        <Link
                          to={`/userProfile/${user._id}/Overview`}
                          target="_blank"
                        >
                          <img
                            style={{
                              backgroundColor: "black",
                              borderRadius: "50%",
                              border: "2px solid gray",
                              width: "80px",
                            }}
                            src={user.profilePicture}
                          />
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/userProfile/${user._id}/Overview`}
                          target="_blank"
                        >
                          {user.email}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/userProfile/${user._id}/Overview`}
                          target="_blank"
                        >
                          {user.username}
                        </Link>
                      </td>
                      <td>
                        {user.isDisabled === false ? (
                          <WarningModal
                            InitiateComponent={EnableButton}
                            WarningContent={UpdateContent}
                            confirmFunction={handleChangeUserStatus}
                            parameters={user._id}
                          />
                        ) : (
                          <WarningModal
                            InitiateComponent={DisableButton}
                            WarningContent={UpdateContent}
                            confirmFunction={handleChangeUserStatus}
                            parameters={user._id}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  disabled={page === 1}
                  className="paginationButton"
                  onClick={handlePrevPagination}
                >
                  <ArrowBackIosNew />
                </button>
                <div className="w-9 text-center">{page}</div>
                <button
                  disabled={users?.length < 10}
                  className="paginationButton"
                  onClick={handleNextPagination}
                >
                  <ArrowForwardIos />
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
                padding: "20px 0px",
              }}
            >
              <div>
                <SentimentVeryDissatisfied style={{ fontSize: "80px" }} />
              </div>
              <h3>No users found!</h3>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "30vh",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

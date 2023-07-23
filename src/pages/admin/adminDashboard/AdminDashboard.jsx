import { useEffect, useState } from "react";
import { AdminDashboardBlock } from "../../../components/adminDashboardBlock/AdminDashboardBlock";
import { AdminSidebar } from "../../../components/adminSidebar/AdminSidebar";
import "./adminDashboard.scss";
import { useAuthUser } from "react-auth-kit";
import { publicRequest } from "../../../requests/requestMethods";
import { UserEachMonthChart } from "../../../components/Charts/userEachMonthChart/UserEachMonthChart";

const AdminDashboard = () => {
  const authUser = useAuthUser();
  const [numbers, setNumbers] = useState({});
  useEffect(() => {
    const getUsers = async () => {
      const users = await publicRequest.get("/user/getUsersNumbers");
      setNumbers((prev) => {
        return { ...prev, users: users.data };
      });
    };
    getUsers();
    const getGames = async () => {
      const games = await publicRequest.get("/game/getGameNumbers");
      setNumbers((prev) => {
        return { ...prev, games: games.data };
      });
    };
    getGames();
    const getGameCopies = async () => {
      const gameCopies = await publicRequest.get(
        "/gameCopy/getGameCopiesNumbers"
      );
      setNumbers((prev) => {
        return { ...prev, gameCopies: gameCopies.data };
      });
    };
    getGameCopies();
    const getReviews = async () => {
      const reviews = await publicRequest.get("/review/getReviewsNumbers");
      setNumbers((prev) => {
        return { ...prev, reviews: reviews.data };
      });
    };
    getReviews();
  }, []);
  return (
    <div className="adminDashboardContainer">
      <div className="adminDashboardWrapper">
        <div className="left">
          <AdminSidebar authUser={authUser()} />
        </div>
        <div className="right">
          <div className="adminDashboardBlocksContainer">
            <AdminDashboardBlock
              colSpan={1}
              title={"Games"}
              color={"#14ae5c"}
              number={numbers?.games}
            />
            <AdminDashboardBlock
              colSpan={1}
              title={"Copies"}
              color={"#f24822"}
              number={numbers?.gameCopies}
            />
            <AdminDashboardBlock
              colSpan={1}
              title={"Users"}
              color={"#ffcd29"}
              number={numbers?.users}
            />
            <AdminDashboardBlock
              colSpan={1}
              title={"Reviews"}
              color={"#9747ff"}
              number={numbers?.reviews}
            />
          </div>
          <div className="userEachMonthChart">
            <UserEachMonthChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

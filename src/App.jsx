import { ThemeProvider, createTheme } from "@mui/material";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { SkeletonTheme } from "react-loading-skeleton";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminAddGame from "./pages/admin/adminAddGame/AdminAddGame";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import AdminManageGameCopies from "./pages/admin/adminManageGameCopies/AdminManageGameCopies";
import AdminManageGames from "./pages/admin/adminManageGames/AdminManageGames";
import AdminManageUsers from "./pages/admin/adminManageUsers/AdminManageUsers";
import GameDetail from "./pages/common/gameDetailPage/GameDetail";
import GameList from "./pages/common/gameListPage/GameListPage";
import Home from "./pages/common/homePage/Home";
import Login from "./pages/common/loginPage/Login";
import Register from "./pages/common/registerPage/Register";
import UserProfileCollection from "./pages/user/userProfileCollectionPage/UserProfileCollection";
import UserProfileOverview from "./pages/user/userProfileOverviewPage/UserProfileOverview";
import UserProfileReviewPage from "./pages/user/userProfileReviewPage/UserProfileReviewPage";
import UserProfileSettings from "./pages/user/userProfileSettingsPage/UserProfileSettings";
import UserProfileWishlist from "./pages/user/userProfileWishlistPage/UserProfileWishlist";
import { ScrollToTop } from "./utils/ScrollToTop";
import ReviewPage from "./pages/common/reviewPage/ReviewPage";
import ScrapeGameCopies from "./pages/admin/scrapeGameCopies/ScrapeGameCopies";

function App() {
  const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to="/login" />;
  };

  const AdminRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const authUser = useAuthUser();
    const isAdmin = authUser()?.isAdmin;
    return isAdmin && isAuthenticated() ? <Component /> : <Navigate to="/" />;
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        {/* <CssBaseline/> */}
        <ToastContainer />
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/games" element={<GameList />} />
            <Route path="/game/:slug" element={<GameDetail />} />
            <Route
              path="/userProfile/:userId/Overview"
              element={<PrivateRoute Component={UserProfileOverview} />}
            ></Route>
            <Route
              path="/userProfile/:userId/Wishlist"
              element={<PrivateRoute Component={UserProfileWishlist} />}
            ></Route>
            <Route
              path="/userProfile/:userId/Collection"
              element={<PrivateRoute Component={UserProfileCollection} />}
            ></Route>
            <Route
              path="/userProfile/:userId/Reviews"
              element={<PrivateRoute Component={UserProfileReviewPage} />}
            ></Route>
            <Route
              path="/userProfile/:userId/Settings"
              element={<PrivateRoute Component={UserProfileSettings} />}
            ></Route>
            <Route
              path="/admin"
              element={<AdminRoute Component={AdminDashboard} />}
            ></Route>
            <Route
              path="/admin/gameCopies"
              element={<AdminRoute Component={AdminManageGameCopies} />}
            ></Route>
            <Route
              path="/admin/users"
              element={<AdminRoute Component={AdminManageUsers} />}
            ></Route>
            <Route
              path="/admin/games"
              element={<AdminRoute Component={AdminManageGames} />}
            ></Route>
            <Route
              path="/admin/addGame"
              element={<AdminRoute Component={AdminAddGame} />}
            ></Route>
            <Route
              path="/admin/scrape"
              element={<AdminRoute Component={ScrapeGameCopies} />}
            ></Route>
          </Routes>
        </HashRouter>
      </SkeletonTheme>
    </ThemeProvider>
  );
}

export default App;

import { Link } from "react-router-dom";
import { resize200 } from "../../../utils/resizeImage";
import "./collectionGameCards.scss";
import {
  AddShoppingCart,
  Casino,
  Delete,
  Done,
  Edit,
  SportsEsports,
  VideogameAsset,
  VideogameAssetOff,
} from "@mui/icons-material";
import { WarningModal } from "../../Modals/warningModal/WarningModal";
import { useAuthUser } from "react-auth-kit";
import { publicRequest, userRequest } from "../../../requests/requestMethods";
import { toast } from "react-toastify";
import { toastSettings } from "../../../utils/toastSettings";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DeleteIcon = () => {
  return <Delete />;
};

const EditIcon = () => {
  return <Edit />;
};

const AddToWishlistIcon = () => {
  return <AddShoppingCart />;
};

const AddToWishlistContent = () => {
  return <span>Are you sure you want to add this game to wishlist?</span>;
};
const DeleteGameCollectionContent = () => {
  return (
    <span>Are you sure you want to delete this game from the collection?</span>
  );
};

export const CollectionGameCards = ({ gameData, collectionData }) => {
  const authUser = useAuthUser();
  const userId = authUser().userId;
  const [newCatagory, setNewCatagory] = useState("uncatagorized");

  const EditCatagoryForm = () => {
    const handleChange = (e) => {
      setNewCatagory(e.target.value);
    };
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        Change catagory into:
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            sx={{
              color: "white",
              border: "1px solid #2177d0",
              display: "flex",
              alignItems: "center",
            }}
            value={newCatagory}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem
              sx={{ display: "flex", alignItems: "center" }}
              value={"uncatagorized"}
            >
              <Casino sx={{ marginRight: "5px" }} /> Uncatagorized
            </MenuItem>
            <MenuItem
              sx={{ display: "flex", alignItems: "center" }}
              value={"playing"}
            >
              <VideogameAsset sx={{ marginRight: "5px" }} />
              Playing
            </MenuItem>
            <MenuItem
              sx={{ display: "flex", alignItems: "center" }}
              value={"completed"}
            >
              <Done sx={{ marginRight: "5px" }} />
              Completed
            </MenuItem>
            <MenuItem
              sx={{ display: "flex", alignItems: "center" }}
              value={"notPlayed"}
            >
              <VideogameAssetOff sx={{ marginRight: "5px" }} />
              Haven't Played
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };

  const handleDeleteGameFromCollection = async (gameId) => {
    try {
      const res = await userRequest.delete(`/collection/${userId}/${gameId}`);
      collectionData(res.data.collection.games);
      if (res.data.type === "success")
        toast.success(res.data.message, { ...toastSettings });
      else toast.error("Something went wrong", { ...toastSettings });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWishlist = async ({
    gameId,
    gameTitle,
    gameSlug,
    gameImg,
  }) => {
    try {
      toast.warn("Adding your game to wishlist", { ...toastSettings });
      const gameCopy = await publicRequest.post("/gameCopy/search", {
        title: gameTitle,
      });

      const getLowestPrice = (data, count) => {
        const sortedData = data.sort(
          (a, b) => a.retailPrice[0].price - b.retailPrice[0].price
        );
        return sortedData.slice(0, count);
      };

      const bestPriceCopy = getLowestPrice(gameCopy.data, 1);

      const res = await userRequest.put(`/wishlist/addGame/${userId}`, {
        game: {
          gameId,
          gameTitle,
          gameSlug,
          gameImg,
          lowestPriceAdded: bestPriceCopy[0].retailPrice[0].price,
          storeAdded: bestPriceCopy[0].storeName,
        },
      });
      if (res.data.type === "success")
        toast.success(res.data.message, { ...toastSettings });
      else toast.error(res.data.message, { ...toastSettings });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCatagory = async ({ gameId, newCatagory }) => {
    try {
      const res = await userRequest.put(`/collection/updateCatagory/${userId}/${gameId}`, {
        catagory: newCatagory,
      });
      if (res.data.type === "success") {
        collectionData(res.data.collection.games);
        toast.success(res.data.message, { ...toastSettings });
      } else toast.error("Something went wrong!", { ...toastSettings });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="collectionGameCardsContainer">
      {gameData.map((game) => (
        <div key={game._id} className="collectionGameCardContainer">
          <div className="left">
            <div className="collectionImageWrapper">
              <img src={resize200(game.gameImg)} />
            </div>
            <Link target="_blank" to={`/game/${game.gameSlug}`}>
              <span>{game.gameTitle}</span>
            </Link>
          </div>
          <div className="right">
            <div className="iconWrapper">
              <WarningModal
                InitiateComponent={EditIcon}
                confirmFunction={handleUpdateCatagory}
                parameters={{ gameId: game.gameId, newCatagory }}
                WarningContent={EditCatagoryForm}
              />
            </div>
            <div className="iconWrapper">
              <WarningModal
                InitiateComponent={DeleteIcon}
                confirmFunction={handleDeleteGameFromCollection}
                parameters={game.gameId}
                WarningContent={DeleteGameCollectionContent}
              />
            </div>
            <div className="iconWrapper">
              <WarningModal
                InitiateComponent={AddToWishlistIcon}
                confirmFunction={handleAddToWishlist}
                parameters={{
                  gameId: game.gameId,
                  gameTitle: game.gameTitle,
                  gameSlug: game.gameSlug,
                  gameImg: game.gameImg,
                }}
                WarningContent={AddToWishlistContent}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { publicRequest } from "../../../requests/requestMethods";
import { formatPrice } from "../../../utils/formatStrings";
import { PricingModal } from "../../Modals/pricingModal/PricingModal"
import { ArrowBackIosNew, ArrowForwardIos, DoNotTouch, SentimentVeryDissatisfied } from "@mui/icons-material";
import { useAuthUser } from "react-auth-kit";
import { WarningModal } from "../../Modals/warningModal/WarningModal";
import { useToastError, useToastSuccess } from "../../../utils/toastSettings";


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

const WarningContent = () => {
  return <p>Are you sure you want to disable this copy?</p>;
};

export const GameCopiesEcommerceDataGrid = ({ title }) => {
  const [gameCopies, setGameCopies] = useState([]);
  const [page, setPage] = useState(1);
  const authUser = useAuthUser();
  const isAdmin = authUser()?.isAdmin;

  const getGameCopies = async () => {
    try {
      const response = await publicRequest.post(
        `/gameCopy/search?gameCopiesPerPage=15&page=${page}`,
        {
          title: title,
          storeName: "Lazada",
        }
      );
      setGameCopies(response.data);
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
    getGameCopies();
  }, [title, page]);

  const pickRandomColor = () => {
    const textColors = ["#ffcd29", "#f24822", "#9747ff", "#14ae5c"];
    return textColors[Math.floor(Math.random() * textColors.length)];
  };

  const handleDisableCopy = async (gameCopyId) => {
    try {
      const res = await publicRequest.put(`/gameCopy/disable/${gameCopyId}`, {
        gameCopyId,
      });
      if (res.data.type === "success") {
        useToastSuccess(res.data.message);
      } else useToastError("Something went wrong!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {gameCopies.length !== 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: "center", width: "750px" }}>Title</th>
                <th>Current Price</th>
                <th style={{ textAlign: "center" }}>View Pricing</th>
                {isAdmin && <th className="actionTable">Disable</th>}
              </tr>
            </thead>
            <tbody>
              {gameCopies &&
                gameCopies.map((gameCopy) => (
                  <tr key={gameCopy._id}>
                    <td
                      style={{
                        color: pickRandomColor(),
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        maxWidth: "750px",
                      }}
                    >
                      <a href={gameCopy.link} target="_blank">
                        {gameCopy.title}
                      </a>
                    </td>
                    <td>{formatPrice(gameCopy.retailPrice[0].price)}</td>
                    <td style={{ textAlign: "center" }}>
                      <PricingModal priceData={gameCopy.retailPrice} />
                    </td>
                    {isAdmin && (
                    <td style={{ textAlign: "center" }}>
                      <WarningModal
                        InitiateComponent={DisableButton}
                        WarningContent={WarningContent}
                        confirmFunction={handleDisableCopy}
                        parameters={gameCopy._id}
                      />
                    </td>
                  )}
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
              disabled={gameCopies?.length < 15}
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
          <h3>No games here!</h3>
        </div>
      )}
    </div>
  );
};

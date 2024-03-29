import {
  AccessTime,
  CardGiftcard,
  Check,
  Description,
  ExpandMore,
  Games,
  Info,
  Language,
  NotificationsActive,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { WarningModal } from "../../../components/Modals/warningModal/WarningModal";
import { AdminSidebar } from "../../../components/adminSidebar/AdminSidebar";
import { scrapeRequest } from "../../../requests/requestMethods";
import { formatTimePosted } from "../../../utils/formatStrings";
import { useToastError, useToastShow } from "../../../utils/toastSettings";
import "./scrapeGameCopies.scss";
import { LazadaConfirmModal } from "../../../components/Modals/lazadaConfirmModal/LazadaConfirmModal";
import { ScrapeGameConfirmModal } from "../../../components/Modals/scrapeGameConfirmModal/ScrapeGameConfirmModal";

const ScrapeWebstoreBtn = () => {
  return (
    <button
      style={{
        backgroundColor: "#ffcd29",
        color: "black",
      }}
    >
      <span>Scrape Webstores</span> <Language fontSize="inherit" />
    </button>
  );
};
const ScrapeLazadaBtn = () => {
  return (
    <button
      style={{
        backgroundColor: "#0d9aff",
        color: "white",
      }}
    >
      <span>Scrape Lazada</span>
      <CardGiftcard fontSize="inherit" />
    </button>
  );
};
const ScrapeGamesBtn = () => {
  return (
    <button
      style={{
        backgroundColor: "#9747ff",
        color: "black",
      }}
    >
      <span>Scrape Games</span>
      <Games fontSize="inherit" />
    </button>
  );
};
const NotifyUsersBtn = () => {
  return (
    <button
      style={{
        backgroundColor: "#f24822",
        color: "black",
      }}
    >
      <span>Notify Users</span>
      <NotificationsActive fontSize="inherit" />
    </button>
  );
};

const ScrapeContent = () => {
  return <p>Are you sure you want to initiate the scraper </p>;
};

const NotifyUserContent = () => {
  return <p>Are you sure you want to manually send notifications to users</p>;
};
const ScrapeGameContent = () => {
  return <p>Are you sure you want to scrape for new games</p>;
};

const ScrapeGameCopies = () => {
  const authUser = useAuthUser();
  const [isLoading, setIsLoading] = useState(true);
  const [scraperStatus, setScraperStatus] = useState("");
  const [lastScrapedInfo, setLastScrapedInfo] = useState({});
  const [lastScrapedWebstoreInfo, setLastScrapedWebstoreInfo] = useState({});
  const [lastScrapedGamesInfo, setLastScrapedGamesInfo] = useState({});
  const getStatus = async () => {
    try {
      const res = await scrapeRequest.get("/scrape/status");
      setScraperStatus(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getLastScrapedGamesInfo = async () => {
    try {
      const res = await scrapeRequest.get("/scrape/getLastScrapeGames");
      setLastScrapedGamesInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getLastScrapedWebstoreInfo = async () => {
    try {
      const res = await scrapeRequest.get("/scrape/getLastScrapeWebstore");
      setLastScrapedWebstoreInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLastScrapedLazadaInfo = async () => {
    try {
      const res = await scrapeRequest.get("/scrape/getLastScrape");
      setLastScrapedInfo(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatus();
    getLastScrapedWebstoreInfo();
    getLastScrapedGamesInfo();
    getLastScrapedLazadaInfo();
  }, []);

  const handleScrapeWebstore = async () => {
    try {
      useToastShow("Sending request to scraper");
      const res = await scrapeRequest.get("/scrape/scrapeWebstore");
      if (res.data.type === "error") return useToastError(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotifyUsers = async () => {
    try {
      useToastShow("Sending notifications to users");
      await scrapeRequest.get("/user");
    } catch (error) {
      console.log(error);
    }
  };

  const pickRandomColor = () => {
    const textColors = ["#ffcd29", "#f24822", "#9747ff", "#14ae5c", "#0d9aff"];
    return textColors[Math.floor(Math.random() * textColors.length)];
  };

  return (
    <div className="adminScrapeContainer">
      <div className="adminScrapeWrapper">
        <div className="left">
          <AdminSidebar authUser={authUser()} />
        </div>
        <div className="right">
          <div className="scraperLeft">
            <div className="scraperStatus">
              <span>Scraper status:</span>
              <div className="scraperStatusDetail">
                {scraperStatus === "Ready" ? (
                  <Check fontSize="inherit" style={{ color: "#14ae5c" }} />
                ) : (
                  <CircularProgress color="warning" fontSize="inherit" />
                )}{" "}
                <span
                  style={{
                    marginLeft: "15px",
                    color: scraperStatus === "Ready" ? "#14ae5c" : "#ffcd29",
                  }}
                >
                  {scraperStatus}
                </span>
              </div>
            </div>
            <div className="scrapeBtns">
              <div className="scrapeBtn">
                <WarningModal
                  InitiateComponent={ScrapeWebstoreBtn}
                  WarningContent={ScrapeContent}
                  confirmFunction={handleScrapeWebstore}
                />
              </div>
              <div className="scrapeBtn">
                <LazadaConfirmModal InitiateComponent={ScrapeLazadaBtn} />
              </div>
              <div className="scrapeBtn">
                <ScrapeGameConfirmModal InitiateComponent={ScrapeGamesBtn} />
              </div>
              <div className="scrapeBtn">
                <WarningModal
                  InitiateComponent={NotifyUsersBtn}
                  WarningContent={NotifyUserContent}
                  confirmFunction={handleNotifyUsers}
                />
              </div>
            </div>
          </div>
          <div className="scraperRight">
            <div className="lazadaAccordionWrapper">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <div className="accordionTitle">
                    <Info style={{ marginRight: "10px", color: "#0d9aff" }} />{" "}
                    Lazada info
                  </div>
                </AccordionSummary>
                {!isLoading ? (
                  <AccordionDetails>
                    <div className="lazadaInfoItem">
                      <span>
                        <AccessTime style={{ marginRight: "10px" }} /> Last
                        scraped at:{" "}
                      </span>
                      <span
                        style={{
                          color: "#14ae5c",
                          marginLeft: "15px",
                          fontWeight: "bold",
                          fontSize: "25px",
                        }}
                      >
                        {formatTimePosted(lastScrapedInfo.lastScrapeAt)}
                      </span>
                    </div>
                    <div className="lazadaInfoItem">
                      <span>
                        <Description style={{ marginRight: "10px" }} /> Last
                        scraped at page:{" "}
                      </span>
                      <span
                        style={{
                          color: "#0d9aff",
                          marginLeft: "15px",
                          fontWeight: "bold",
                          fontSize: "25px",
                        }}
                      >
                        {lastScrapedInfo.lastScrapeAtPage}
                      </span>
                    </div>
                    <div className="lazadaGameItem">
                      <span>
                        <Games style={{ marginRight: "10px" }} />
                        Last scraped games:{" "}
                      </span>

                      {lastScrapedInfo.lastScrapeGames.map((game, index) => (
                        <div
                          key={index}
                          className="scrapedGame"
                          style={{ borderColor: pickRandomColor() }}
                        >
                          {game}
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "30px",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
              </Accordion>
            </div>
            <div className="webstoreAccordionWrapper">
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <div className="accordionTitle">
                    <Info style={{ marginRight: "10px", color: "#0d9aff" }} />{" "}
                    Webstore info
                  </div>
                </AccordionSummary>
                {!isLoading ? (
                  <AccordionDetails>
                    <div className="webstoreInfoItem">
                      <span>
                        <AccessTime style={{ marginRight: "10px" }} /> Last
                        scraped at:{" "}
                      </span>
                      <span
                        style={{
                          color: "#14ae5c",
                          marginLeft: "15px",
                          fontWeight: "bold",
                          fontSize: "25px",
                        }}
                      >
                        {formatTimePosted(lastScrapedWebstoreInfo.lastScrapeAt)}
                      </span>
                    </div>
                    <div className="webstoreInfoItem">
                      <span>
                        <Language style={{ marginRight: "10px" }} /> Last
                        scraped at store:{" "}
                      </span>
                      <span
                        style={{
                          color: "#0d9aff",
                          marginLeft: "15px",
                          fontWeight: "bold",
                          fontSize: "25px",
                        }}
                      >
                        {lastScrapedWebstoreInfo.lastScrapeAtStore}
                      </span>
                    </div>
                  </AccordionDetails>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "30px",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
              </Accordion>
            </div>
            <div className="webstoreAccordionWrapper">
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <div className="accordionTitle">
                    <Info style={{ marginRight: "10px", color: "#0d9aff" }} />{" "}
                    Games info
                  </div>
                </AccordionSummary>
                {!isLoading ? (
                  <AccordionDetails>
                    <div className="webstoreInfoItem">
                      <span>
                        <AccessTime style={{ marginRight: "10px" }} /> Last
                        scraped at:{" "}
                      </span>
                      <span
                        style={{
                          color: "#14ae5c",
                          marginLeft: "15px",
                          fontWeight: "bold",
                          fontSize: "25px",
                        }}
                      >
                        {formatTimePosted(lastScrapedGamesInfo.lastScrapeAt)}
                      </span>
                    </div>
                    <div className="webstoreInfoItem">
                      <span>
                        <Language style={{ marginRight: "10px" }} /> Last
                        scraped platform:{" "}
                      </span>
                      <span
                        style={{
                          color: "#0d9aff",
                          marginLeft: "15px",
                          fontWeight: "bold",
                          fontSize: "25px",
                        }}
                      >
                        {lastScrapedGamesInfo.lastScrapePlatform}
                      </span>
                    </div>
                  </AccordionDetails>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "30px",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapeGameCopies;

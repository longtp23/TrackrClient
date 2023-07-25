import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useAuthUser } from "react-auth-kit";
import { AdminSidebar } from "../../../components/adminSidebar/AdminSidebar";
import "./adminAddGame.scss";
import {
  useToastError,
  useToastShow,
  useToastSuccess,
} from "../../../utils/toastSettings";
import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { PreviewCarousel } from "../../../components/Carousels/previewCarousel/PreviewCarousel";
import { VideogameAsset } from "@mui/icons-material";
import { WarningModal } from "../../../components/Modals/warningModal/WarningModal";
import {userRequest} from "../../../requests/requestMethods"

const ConfirmButton = () => {
  return (
    <button className="chartCloseBtn rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      Confirm
    </button>
  );
};

const ConfirmMessage = () => {
  return <p>Are you sure you want to add this game?</p>;
};

const AdminAddGame = () => {
  const [releaseDate, setReleaseDate] = useState(dayjs());
  const authUser = useAuthUser();
  const [inputs, setInputs] = useState({});

  const [developers, setDevelopers] = useState([]);
  const handleDeveloperChange = (event, value) => {
    setDevelopers(value);
  };
  const [publishers, setPublishers] = useState([]);
  const handlePublisherChange = (event, value) => {
    setPublishers(value);
  };
  const [genres, setGenres] = useState([]);
  const handleGenreChange = (event, value) => {
    setGenres(value);
  };
  const [platforms, setPlatforms] = useState([]);
  const handlePlatformChange = (event, value) => {
    setPlatforms(value);
  };
  const handleInputs = (e) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
  };

  const [imgUrls, setImgUrls] = useState({});
  const handleImgUrl = (e) => {
    const value = e.target.value;
    setImgUrls({
      ...imgUrls,
      [e.target.name]: value,
    });
  };

  function replaceNewlinesWithBreaks(text) {
    return text.replace(/\n/g, "<br/>");
  }
  const handleConfirmAddGame = async () => {
    useToastShow("Adding Game!");
    if (
      !inputs.title ||
      !inputs.description ||
      !inputs.slug ||
      developers.length === 0 ||
      publishers.length === 0 ||
      genres.length === 0 ||
      platforms.length === 0 ||
      !imgUrls.backgroundImage ||
      !imgUrls.shortScreenshot1 ||
      !imgUrls.shortScreenshot2 ||
      !imgUrls.shortScreenshot3
    )
      return useToastError("Some inputs are empty!");
    if (!parseInt(inputs.metaScore)) {
      return useToastError("Metascore is in wrong format!");
    } else {
      const res = await userRequest.post("/game/addOneGame", {
        title: inputs.title,
        slug: inputs.slug,
        releaseDate: releaseDate.format("YYYY-MM-DD"),
        platforms,
        genres,
        developers,
        publishers,
        metaScore: parseInt(inputs.metaScore),
        backgroundImage: imgUrls.backgroundImage,
        shortScreenshots: [
          imgUrls.shortScreenshot1,
          imgUrls.shortScreenshot2,
          imgUrls.shortScreenshot3,
        ],
        description: `<p>${replaceNewlinesWithBreaks(inputs?.description)}</p>`,
      });

      if (res.data.type === "success") useToastSuccess(res.data.message);
      else useToastError(res.data.message);
    }
  };

  return (
    <div className="adminAddGameContainer">
      <div className="adminAddGameWrapper">
        <div className="left">
          <AdminSidebar authUser={authUser()} />
        </div>
        <div className="right">
          <div className="adminAddGameTitle">
            <VideogameAsset
              fontSize="inherit"
              style={{ marginRight: "10px", color: "#14ae5c" }}
            />
            Add a new game
          </div>

          <div className="adminAddGameInputsContainer">
            <div className="adminAddGameInputsWrapper">
              <div className="adminAddGameInputContainer">
                <TextField
                  style={{ width: "100%" }}
                  className="textInput"
                  label="Title"
                  variant="outlined"
                  name="title"
                  placeholder="Elden Ring"
                  onChange={handleInputs}
                />
              </div>
              <div className="adminAddGameInputContainer">
                <div className="shortInputs">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={releaseDate}
                      onChange={(newReleaseDate) =>
                        setReleaseDate(newReleaseDate)
                      }
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                  <TextField
                    style={{ marginLeft: "30px" }}
                    className="textInput"
                    label="Metascore"
                    variant="outlined"
                    name="metaScore"
                    placeholder="95"
                    onChange={handleInputs}
                  />
                </div>
              </div>
              <div className="adminAddGameInputContainer">
                <TextField
                  style={{ width: "100%" }}
                  className="textInput"
                  label="Slug"
                  variant="outlined"
                  name="slug"
                  placeholder="elden-ring"
                  onChange={handleInputs}
                />
              </div>
              <div className="adminAddGameInputContainer">
                <Autocomplete
                  multiple
                  freeSolo
                  onChange={handleDeveloperChange}
                  options={["Ubisoft", "damn"]}
                  getOptionLabel={(option) => option}
                  value={developers}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Developers"
                      placeholder="Developers"
                    />
                  )}
                />
              </div>
              <div className="adminAddGameInputContainer">
                <Autocomplete
                  multiple
                  freeSolo
                  onChange={handlePublisherChange}
                  options={["Ubisoft", "damn"]}
                  getOptionLabel={(option) => option}
                  value={publishers}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Publishers"
                      placeholder="Publishers"
                    />
                  )}
                />
              </div>
              <div className="adminAddGameInputContainer">
                <Autocomplete
                  multiple
                  freeSolo
                  onChange={handleGenreChange}
                  options={["Action", "RPG"]}
                  getOptionLabel={(option) => option}
                  value={genres}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Genres"
                      placeholder="Genres"
                    />
                  )}
                />
              </div>
              <div className="adminAddGameInputContainer">
                <Autocomplete
                  multiple
                  onChange={handlePlatformChange}
                  options={["PlayStation", "Xbox", "Nintendo"]}
                  getOptionLabel={(option) => option}
                  value={platforms}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Platforms"
                      placeholder="Platforms"
                    />
                  )}
                />
              </div>
              <div className="adminAddGameInputContainer col-span-2">
                <textarea
                  onChange={handleInputs}
                  name="description"
                  rows="5"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="adminAddGameImages">
            <div className="adminAddGamePreviewImgs">
              <PreviewCarousel screenshots={imgUrls} />
            </div>
            <div className="adminAddGameImgUrls">
              <div className="imgInputUrl">
                <TextField
                  style={{ width: "100%" }}
                  className="textInput"
                  label="Background Image"
                  variant="outlined"
                  name="backgroundImage"
                  placeholder="URL"
                  onChange={handleImgUrl}
                />
              </div>
              <div className="imgInputUrl">
                <TextField
                  style={{ width: "100%" }}
                  className="textInput"
                  label="Detail Image 1"
                  variant="outlined"
                  name="shortScreenshot1"
                  placeholder="URL"
                  onChange={handleImgUrl}
                />
              </div>
              <div className="imgInputUrl">
                <TextField
                  style={{ width: "100%" }}
                  className="textInput"
                  label="Detail Image 2"
                  variant="outlined"
                  name="shortScreenshot2"
                  placeholder="URL"
                  onChange={handleImgUrl}
                />
              </div>
              <div className="imgInputUrl">
                <TextField
                  style={{ width: "100%" }}
                  className="textInput"
                  label="Detail Image 3"
                  variant="outlined"
                  name="shortScreenshot3"
                  placeholder="URL"
                  onChange={handleImgUrl}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "50px",
              paddingTop: "0px",
            }}
          >
            <WarningModal
              InitiateComponent={ConfirmButton}
              confirmFunction={handleConfirmAddGame}
              WarningContent={ConfirmMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddGame;

import { Dialog, Transition } from "@headlessui/react";
import { Edit } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import "./editGameModal.scss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {userRequest} from "../../../requests/requestMethods"
import {useToastError, useToastShow, useToastSuccess} from "../../../utils/toastSettings"
import dayjs from "dayjs";

export const EditGameModal = ({ gameData }) => {
  let [isOpen, setIsOpen] = useState(false);

  const [releaseDate, setReleaseDate] = useState(
    dayjs(gameData.releaseDate, "YYYY-MM-DD")
  );
  const [developers, setDevelopers] = useState(gameData.developers);
  const handleDeveloperChange = (event, value) => {
    setDevelopers(value);
  };
  const [publishers, setPublishers] = useState(gameData.publishers);
  const handlePublisherChange = (event, value) => {
    setPublishers(value);
  };
  const [genres, setGenres] = useState(gameData.genres);
  const handleGenreChange = (event, value) => {
    setGenres(value);
  };
  const [platforms, setPlatforms] = useState(gameData.platforms);
  const handlePlatformChange = (event, value) => {
    setPlatforms(value);
  };

  const [slug, setSlug] = useState(gameData.slug);

  const handleInputs = (e) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
  };
  const [inputs, setInputs] = useState({
    title: gameData.title,
    slug,
    metaScore: gameData.metaScore,
  });
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleConfirm = async () => {
    useToastShow("Updating Game!")
    const res = await userRequest.put(`/game/edit/${gameData._id}`,{
      title: inputs.title,
      slug: inputs.slug,
      metaScore: inputs.metaScore,
      releaseDate: releaseDate.format("YYYY-MM-DD"),
      developers,
      publishers,
      genres,
      platforms
    })
    if(res.data.type === "success"){
      useToastSuccess(res.data.message)
      closeModal();
    }else{
      useToastError("Something went wrong!")
    }
  };

  return (
    <>
      <div className="">
        <button
          style={{ backgroundColor: "#338dc8" }}
          onClick={openModal}
          className=" rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <Edit />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    <Edit style={{ color: "#338dc8" }} /> Edit game
                  </Dialog.Title>
                  <div className="editGameContainer">
                    <form>
                      <div className="inputContainer">
                        <TextField
                          className="textInput"
                          label="Title"
                          variant="outlined"
                          name="title"
                          placeholder={gameData.title}
                          onChange={handleInputs}
                        />
                      </div>
                      <div
                        className="inputContainer"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={releaseDate}
                            onChange={(newValue) => setReleaseDate(newValue)}
                            format="DD/MM/YYYY"
                          />
                        </LocalizationProvider>
                        <TextField
                          style={{ width: "230px" }}
                          label="Metascore"
                          variant="outlined"
                          name="metaScore"
                          placeholder={gameData.metaScore ? gameData.metaScore.toString() : "No score"}
                          onChange={handleInputs}
                        />
                      </div>
                      <div className="inputContainer">
                        <TextField
                          className="textInput"
                          label="Slug"
                          variant="outlined"
                          name="slug"
                          placeholder={gameData.slug}
                          onChange={handleInputs}
                        />
                      </div>
                      <div className="inputContainer">
                        <Autocomplete
                          multiple
                          freeSolo
                          onChange={handleDeveloperChange}
                          options={gameData.developers}
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
                      <div className="inputContainer">
                        <Autocomplete
                          multiple
                          freeSolo
                          onChange={handlePublisherChange}
                          options={gameData.publishers}
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
                      <div className="inputContainer">
                        <Autocomplete
                          multiple
                          freeSolo
                          onChange={handleGenreChange}
                          options={gameData.genres}
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
                      <div className="inputContainer">
                        <Autocomplete
                          multiple
                          onChange={handlePlatformChange}
                          options={["PlayStation", "Xbox", "Nintendo", "PC"]}
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
                    </form>
                  </div>
                  <div className="flex justify-end mt-5">
                    <button
                      onClick={handleConfirm}
                      className="chartCloseBtn rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={closeModal}
                      className="closeBtn rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

import { Dialog, Transition } from "@headlessui/react";
import { WarningAmber } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Fragment, useState } from "react";
import { scrapeRequest } from "../../../requests/requestMethods";
import {
  useToastError,
  useToastShow,
  useToastSuccess,
} from "../../../utils/toastSettings";

export const ScrapeGameConfirmModal = ({ InitiateComponent }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState("");
  const handleChange = (event) => {
    setPlatform(event.target.value);
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleConfirm = async () => {
    if (!platform) return useToastError("Invalid platform");
    try {
      useToastShow("Sending request to scraper");
      closeModal();
      await scrapeRequest.put("/scrape/lastScrapeGames", {
        lastScrapeAt: Date.now(),
        lastScrapePlatform:
          platform === "ps5"
            ? "Playstation 5"
            : platform === "ps4"
            ? "Playstation 4"
            : platform === "ps3"
            ? "Playstation 3"
            : platform === "switch"
            ? "Nintendo Switch"
            : "",
      });
      const res = await scrapeRequest.get(
        `/scrape/scrapeGames?platform=${platform}`
      );
      if (res.data.type === "success") useToastSuccess(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <b onClick={openModal}>
        <InitiateComponent />
      </b>
      {/* <Delete onClick={openModal}/> */}
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className=" text-2xl font-bold leading-6 text-white"
                  >
                    <WarningAmber
                      style={{ marginRight: "10px", color: "red" }}
                    />
                    Warning
                  </Dialog.Title>
                  <div className="flex items-center">
                    <p
                      style={{
                        fontSize: "20px",
                        marginRight: "10px",
                        flex: "1",
                      }}
                    >
                      Scrape for new games of :{" "}
                    </p>
                    <FormControl fullWidth style={{ flex: "1" }}>
                      <InputLabel id="demo-simple-select-label">
                        Platform
                      </InputLabel>
                      <Select
                        value={platform}
                        label="Platform"
                        onChange={handleChange}
                      >
                        <MenuItem value={"ps5"}>Playstation 5</MenuItem>
                        <MenuItem value={"ps4"}>Playstation 4</MenuItem>
                        <MenuItem value={"ps3"}>Playstation 3</MenuItem>
                        <MenuItem value={"switch"}>Nintendo Switch</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="flex justify-end mt-5">
                    <button
                      onClick={handleConfirm}
                      className="chartCloseBtn rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Yes
                    </button>
                    <button
                      onClick={closeModal}
                      className="closeBtn rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      No
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

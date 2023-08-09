import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Delete, WarningAmber } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { scrapeRequest } from "../../../requests/requestMethods";
import { useToastError, useToastShow } from "../../../utils/toastSettings";

export const LazadaConfirmModal = ({ InitiateComponent }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleConfirm = async () => {
    if (!input) {
      useToastError("Please enter valid 'page' value");
    } else {
      useToastShow("Sending request to scraper");
      closeModal();
      const res = await scrapeRequest.get(
        `scrape/scrapeLazada/${parseInt(input)}`
      );
      if (res.data.type === "error") useToastError(res.data.message);
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
                    <p style={{ fontSize: "20px", marginRight: "10px" }}>
                      Scrape Lazada at page:{" "}
                    </p>
                    <TextField
                      style={{ width: "230px" }}
                      label="Page"
                      variant="outlined"
                      name="page"
                      type="number"
                      placeholder="Page to scrape at"
                      onChange={handleInput}
                      color="info"
                    />
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

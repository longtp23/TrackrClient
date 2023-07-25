import { Dialog, Transition } from "@headlessui/react";
import {
  EditOutlined,
  ThumbDownAlt,
  ThumbUpAlt,
  ThumbsUpDown,
} from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import { toast } from "react-toastify";
import { publicRequest, userRequest } from "../../../requests/requestMethods";
import {
  toastSettings,
  useToastError,
  useToastShow,
  useToastSuccess,
} from "../../../utils/toastSettings";
import "./reviewFormModal.scss";

export const ReviewFormModal = ({ gameId, updateReview }) => {
  let [isOpen, setIsOpen] = useState(false);
  const authUser = useAuthUser();

  const [stores, setStores] = useState([]);
  const [ratingValue, setRatingValue] = useState("good");
  const [inputs, setInputs] = useState({});

  const ratings = [
    { name: "good", value: "good" },
    { name: "neutral", value: "neutral" },
    { name: "bad", value: "bad" },
  ];

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostReview = async (e) => {
    e.preventDefault();

    if (!gameId || !ratingValue || !inputs.reviewContent || !inputs.storeName) {
      useToastError("Invalid Submission!");
    } else {
    useToastShow("Sending Review!")
      const res = await userRequest.post(`/review/${authUser().userId}`, {
        gameId,
        rating: ratingValue,
        username: authUser().username,
        storeName: inputs.storeName,
        reviewContent: inputs.reviewContent,
      });

      useToastSuccess(res.data.message);
      closeModal();
      updateReview();
    }
  };

  useEffect(() => {
    const getStores = async () => {
      const res = await publicRequest.get("/store");
      setStores(res.data);
    };
    getStores();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div className="">
        <button type="button" onClick={openModal} className="openReviewFormBtn">
          <span>Write a review</span>
          <EditOutlined />
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
            <div className="fixed inset-0 bg-black bg-opacity-70" />
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
                <Dialog.Panel className="reviewFormPanel w-full max-w-6xl transform overflow-hidden rounded-2x p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-white"
                  >
                    Write a review for a store
                  </Dialog.Title>
                  <span>
                    Please describe what you liked or disliked about the store
                    that you bought a copy from and whether you recommend it to
                    others.
                  </span>

                  <form className="reviewForm" method="dialog">
                    <div className="left">
                      <img
                        className="reviewProfilePic"
                        src={authUser()?.profilePic}
                      />
                    </div>
                    <div className="right">
                      <textarea name="reviewContent" onChange={handleInputs} />
                      <div className="reviewSelectOptions">
                        <div className="reviewSelectOption">
                          <label htmlFor="store">Store:</label>
                          <select
                            name="storeName"
                            onChange={handleInputs}
                            id="reviewStore"
                          >
                            {stores.map((store) => (
                              <option key={store._id} value={store.name}>
                                {store.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="reviewSelectOption">
                          <label htmlFor="platform">Platform:</label>
                          <select name="platform" id="reviewPlatform">
                            <option value="Playstation 5">Playstation 5</option>
                            <option value="Playstation 4">Playstation 4</option>
                            <option value="Playstation 3">Playstation 3</option>
                            <option value="Xbox">Xbox</option>
                            <option value="Nintendo">Nintendo</option>
                          </select>
                        </div>
                      </div>
                      <div>Do you recommend this store to people?</div>
                      <div className="reviewBtns flex justify-between">
                        <div className="reviewRatingBtns">
                          <ButtonGroup className="ratingBtnGr">
                            {ratings.map((rating, idx) => (
                              <ToggleButton
                                key={idx}
                                id={`radio-${rating.name}`}
                                type="radio"
                                variant={
                                  idx % 2 ? "outline-success" : "outline-danger"
                                }
                                name="radio"
                                value={rating.value}
                                checked={ratingValue === rating.value}
                                onChange={(e) =>
                                  setRatingValue(e.currentTarget.value)
                                }
                              >
                                {rating.name === "good" ? (
                                  <ThumbUpAlt fontSize="inherit" />
                                ) : rating.name === "neutral" ? (
                                  <ThumbsUpDown fontSize="inherit" />
                                ) : rating.name === "bad" ? (
                                  <ThumbDownAlt fontSize="inherit" />
                                ) : (
                                  <div></div>
                                )}
                              </ToggleButton>
                            ))}
                          </ButtonGroup>
                        </div>
                        <div className="reviewSubmitBtns flex justify-end mt-5">
                          <button
                            onClick={closeModal}
                            className="reviewCloseBtn rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            Close
                          </button>
                          <button
                            onClick={handlePostReview}
                            className="reviewSubmitBtn rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            Post Review!
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

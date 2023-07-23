import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import "./replyFormModal.scss";
import { useAuthUser } from "react-auth-kit";
import { Reply } from "@mui/icons-material";
import { toast } from "react-toastify";
import { toastSettings } from "../../../utils/toastSettings";
import { userRequest } from "../../../requests/requestMethods";

export const ReplyFormModal = ({ reviewUsername, reviewId, onReplyChange }) => {
  let [isOpen, setIsOpen] = useState(false);
  const authUser = useAuthUser();
  const [replyContent, setReplyContent] = useState();

  const handlePostReply = async (e) => {
    e.preventDefault();
    if (!replyContent) toast.error("Invalid Reply", { ...toastSettings });
    const res = await userRequest.put(
      `/review/reply/${reviewId}?replyUserId=${authUser().userId}`,
      {
        replyUsername: authUser().username,
        replyContent,
      }
    );

    toast.success(res.data.message, { ...toastSettings });
    closeModal();
    onReplyChange();
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="">
        <button type="button" onClick={openModal} className="openReplyFormBtn">
          <Reply />
          <span>Reply</span>
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
                <Dialog.Panel className="replyFormPanel w-full max-w-6xl transform overflow-hidden rounded-2x p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-normal leading-6 text-white"
                  >
                    Write a reply to <b>{reviewUsername}</b>
                  </Dialog.Title>
                  <form className="reviewForm" method="dialog">
                    <div className="left">
                      <img
                        className="reviewProfilePic"
                        src={authUser()?.profilePic}
                      />
                    </div>
                    <div className="right">
                      <textarea
                        onChange={(e) => setReplyContent(e.target.value)}
                      />

                      <div className="reviewSubmitBtns flex justify-end mt-5">
                        <button
                          onClick={closeModal}
                          className="reviewCloseBtn rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          Close
                        </button>
                        <button
                          onClick={handlePostReply}
                          className="reviewSubmitBtn rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          Post Reply!
                        </button>
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

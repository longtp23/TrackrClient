import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Save, WarningAmber } from "@mui/icons-material";
import "./confirmPasswordModal.scss";
import { toastSettings, useToastError, useToastShow } from "../../../utils/toastSettings";
import { toast } from "react-toastify";
import { userRequest } from "../../../requests/requestMethods";
import { useAuthUser } from "react-auth-kit";
import { TextField } from "@mui/material";

export const ConfirmPasswordModal = ({ userInfo }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const authUser = useAuthUser();
  const userId = authUser().userId;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }


  const handleConfirmPassword = async () => {
    if (
      inputs.password !== inputs.confirmPassword ||
      !inputs.password ||
      !inputs.confirmPassword
    ) {
      useToastError("Password not valid!");
    } else {
      useToastShow("Updating Info!");
      const confirmPassword = await userRequest.post(
        `/auth/checkPassword/${userId}`,
        {
          password: inputs.password,
        }
      );

      if (confirmPassword.data.type === "success") {
        if (userInfo.password !== userInfo.confirmPassword) {
          toast.error("New password not match!", { ...toastSettings });
        } else {
          const updateInfo = await userRequest.put(
            `/user/updateUserInfo/${userId}`,
            {
              newInfo: userInfo,
            }
          );
          if (updateInfo.data.type === "success")
            toast.success(updateInfo.data.message, { ...toastSettings });
          else toast.error(updateInfo.data.message, { ...toastSettings });
        }
        closeModal();
      } else {
        toast.error(confirmPassword.data.message, { ...toastSettings });
      }
    }
  };

  const handleCancel = () => {
    setInputs({});
    closeModal();
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <div className="">
        <button onClick={openModal} className="saveChangesButton">
          <Save style={{ marginRight: "5px" }} />
          Save Changes
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
                <Dialog.Panel
                  style={{ width: "500px", backgroundColor: "#151515" }}
                  className="w-full bg-black transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white mb-2"
                  >
                    <WarningAmber
                      style={{ marginRight: "10px", color: "red" }}
                    />
                    Please Confirm Password
                  </Dialog.Title>

                  <div className="warningContent">
                    <div className="userInfoInputContainers">
                      <div className="userInfoInputContainer">
                        <TextField
                          style={{ width: "230px" }}
                          label="Password"
                          variant="outlined"
                          name="password"
                          type="password"
                          placeholder="Password"
                          onChange={handleInputChange}
                          color="info"
                        />
                      </div>
                      <div className="userInfoInputContainer">
                        <TextField
                          style={{ width: "230px" }}
                          label="Confirm Password"
                          variant="outlined"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                          onChange={handleInputChange}
                          color="info"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-5">
                    <button
                      onClick={handleConfirmPassword}
                      className="chartCloseBtn rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={handleCancel}
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

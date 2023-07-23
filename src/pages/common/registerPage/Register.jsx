import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePasswords,
  validateUsername,
} from "../../../utils/formatStrings";
import { publicRequest } from "../../../requests/requestMethods";
import { useToastError, useToastSuccess } from "../../../utils/toastSettings";
import "./register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate()
  const handleInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleValidateInputs = () => {
    if (
      !inputs.username ||
      !inputs.email ||
      !inputs.password ||
      !inputs.confirmPassword
    )
      return useToastError("Invalid inputs!");

    validateEmail(inputs.email);

    validateUsername(inputs.username);

    validatePasswords(inputs.password, inputs.confirmPassword);

    return true;
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const isValidate = handleValidateInputs();
    if(isValidate){
      const register = await publicRequest.post("/auth/register", {
        email: inputs.email,
        username:inputs.username,
        password:inputs.password
      });
      if(register.data.type === "success") {
        useToastSuccess(register.data.message)
        setTimeout(() => {
          navigate("/login")
        }, 3000);
      } else{
        useToastError(register.data.message)
      }
    }
  };
  return (
    <div>
      <div className="registerBodyContainer">
        <div className="registerFormContainer">
          <div className="left">
            <div className="registerImgWrapper">
              <div className="registerInfoWrapper"></div>
              <img src="https://firebasestorage.googleapis.com/v0/b/gamedatabase-45636.appspot.com/o/the_witcher_3_wide-eeb82d3f26b893b22d9c51611ab6525abd043a13-s1400-c100.jpg?alt=media&token=1e3b7688-d2e8-454e-a635-d33b818ef9df" />
            </div>
          </div>
          <div className="right">
            <form onSubmit={handleRegister} className="registerForm">
              <h1 className="registerTagline">The journey starts here</h1>
              <div className="registerInputContainers">
                <div className="registerInputContainer">
                  <div>Email</div>
                  <input
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                    onChange={handleInputs}
                  />
                </div>
                <div className="registerInputContainer">
                  <div>Username</div>
                  <input
                    type="text"
                    name="username"
                    placeholder="example"
                    onChange={handleInputs}
                  />
                </div>
                <div className="registerInputContainer">
                  <div>Password</div>
                  <input
                    type="password"
                    name="password"
                    placeholder="8+ charaters"
                    onChange={handleInputs}
                  />
                </div>
                <div className="registerInputContainer">
                  <div>Confirm Password</div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="8+ charaters"
                    onChange={handleInputs}
                  />
                </div>
              </div>
              <div className="registerSubmitButtonContainer">
                <button
                  className="registerSubmitButton"
                  onClick={handleRegister}
                >
                  Register
                </button>
                <Link className="toLogin" to="/login">Have an account? Login now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

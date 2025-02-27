import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  // State to manage the email input field value
  const [email, setEmail] = useState("");

  // State to manage the password input field value
  const [password, setPassword] = useState("");

  // State to store and display validation error messages related to user credentials
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // function to handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // validate the email format; if invalid, store an error message in the error state
    if (!validateEmail(email)) {
      // store the error message in the error state
      setError("Please enter a valid email address.");
      return; // stop function execution
    }

    // validate the password is empty; if is valid, store the an error message in the error state
    if (!password) {
      // store the error message in the error state
      setError("Please enter the password");
      return; //stop function execution
    }

    setError(null); //clear any previous error message if validation passes

    // proceed with authentication logic with API call
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        setError(error.response.data.message);
      else setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      {/* Navbar component */}
      <NavBar />

      {/* form container */}
      <div className="flex items-center justify-center mt-28 px-2 sm:px-0">
        <div className="w-96 border border-gray-300 dark:border-gray-600 rounded bg-primary-a0 dark:bg-surface-a10 px-3 sm:px-7 py-5  sm:py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            {/* Email input field */}
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* password input field component*/}
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* display error message if the error state has a value */}
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not registered yet? {/* Redirect into the signup age */}
              <Link
                to={"/signup"}
                className="font-medium underline text-primary"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

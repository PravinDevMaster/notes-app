import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  // state to manage the name input field value
  const [name, setName] = useState("");
  // State to manage the email input field value
  const [email, setEmail] = useState("");

  // State to manage the password input field value
  const [password, setPassword] = useState("");

  // State to store and display validation error messages related to user credentials
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // function to handle the signup form submission
  const handleSignUP = async (e) => {
    e.preventDefault();

    // validate the name is empty; if is empty store the error message in the error state
    if (!name) {
      // store error message in error state
      setError("Please enter a your name.");
      return; // stop function execution
    }

    // validate the email format; if is invalid, store the error message in the error state
    if (!validateEmail(email)) {
      // store error message in error state
      setError("Please enter a valid email address.");
      return; // stop function execution
    }

    // validate the password is empty; if is empty, store the error message in error state
    if (!password) {
      // store error message in error state
      setError("Please enter a password.");
      return; //stop function execution
    }

    // clear any previous error messages if validation passes
    setError(null);

    // proceed registration logic with API call
    try {
      const response = await axiosInstance.post("/auth/register", {
        fullName: name,
        email: email,
        password: password,
      });
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
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
          <form onSubmit={handleSignUP}>
            <h4 className="text-2xl mb-7">SignUP</h4>
            {/* Name input field */}
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account? {/* Redirect into the login page */}
              <Link
                to={"/login"}
                className="font-medium underline text-primary"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

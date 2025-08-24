import { useContext, useEffect, useState } from "react";
import "./Login.css";
import { ModeContext } from "../context/mode-context";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

import { useFormInput } from "../hooks/useFormInput";
import { useTogglePassword } from "../hooks/useTogglePassword";

import eyeOnBlack from "../assets/eye-fill-black.svg";
import eyeOffBlack from "../assets/eye-slash-fill-black.svg";
import eyeOnCrimson from "../assets/eye-fill-crimson.svg";
import eyeOffCrimson from "../assets/eye-slash-fill-crimson.svg";

export function Login() {
  const { isDarkMode } = useContext(ModeContext);
  const parsedRegisterUser = JSON.parse(localStorage.getItem('RegisterUser')) || [];

  const validateEmail = (email) => {
    // Regex for validating an email address
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const [loginDetails, setLoginDetails] = useState({});

  const email = useFormInput("", validateEmail, "Enter Valid Email !!!");
  const password = useFormInput("", (val) => val.length >= 6, "Password must be 6 character long.");

  const [showPassword, togglePassword] = useTogglePassword();

  const navigate = useNavigate();

  console.log(parsedRegisterUser);
  console.log(loginDetails);


  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (email.value.trim() === "") {
      email.setError("Email is required");
      hasError = true;
    } else if (!validateEmail(email.value)) {
      email.setError("Enter valid email");
      hasError = true;
    }

    if (password.value.trim() === "") {
      password.setError("Password is required");
      hasError = true;
    } else if (password.value.length < 6) {
      password.setError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    const data = {
      id: uuidv4(),
      email: email.value,
      password: password.value,
    };

    const userExists = parsedRegisterUser.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (userExists) {
      setLoginDetails(data);
      navigate("/");
    } else {
      alert("User not found!");
    }

    email.setValue("");
    password.setValue("");
  };


  useEffect(() => {
    localStorage.setItem("loginData", JSON.stringify(loginDetails));
  }, [loginDetails]);

  console.log(loginDetails);

  return (
    <div className={isDarkMode ? "login-bg" : "login-bg-dark"}>
      <div className={isDarkMode ? "login" : "login-dark"}>
        <h1>LOGIN</h1>
        <p className="para">Welcome back !!</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address: </label>
            <input
              className={email.error ? "invalid-input" : "input"}
              type="email"
              name="email"
              id="email"
              placeholder="john@doe.com"
              value={email.value}
              onChange={email.onChange}
              onBlur={email.onBlur}
            />
            <p className="login-error">{email.error}</p>
          </div>

          <div className="login-password-input">
            <label htmlFor="password">Password: </label>

            <input
              className={password.error ? "invalid-input" : "input"}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Your Password"
              value={password.value}
              onChange={password.onChange}
              onBlur={password.onBlur}
            />

            <span onClick={togglePassword}>
              {showPassword
                ? (password.error
                  ? <img src={eyeOffCrimson} className="login-eye" />
                  : <img src={eyeOffBlack} className="login-eye" />
                )
                :
                (password.error
                  ? <img src={eyeOnCrimson} className="login-eye" />
                  : <img src={eyeOnBlack} className="login-eye" />
                )}
            </span>

            <p className="login-error">{password.error}</p>
          </div>

          <div className="login-red-btn">
            <button type="submit" className="btn-red">
              Login
            </button>
          </div>
          <p className="text-center">
            Don't have an account? <Link to="/register" className="register-here">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
import { useContext } from "react";
import "./Register.css";
import { ModeContext } from "../context/mode-context";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useFormInput } from "../hooks/useFormInput";
import { useTogglePassword } from "../hooks/useTogglePassword";

import eyeOnBlack from "../assets/eye-fill-black.svg";
import eyeOffBlack from "../assets/eye-slash-fill-black.svg";
import eyeOnCrimson from "../assets/eye-fill-crimson.svg";
import eyeOffCrimson from "../assets/eye-slash-fill-crimson.svg";

export function Register() {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ModeContext);

  const validateEmail = (email) => {
    // Regex for validating an email address
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const username = useFormInput("", (val) => val.trim().length >= 3, "Username is required");
  const email = useFormInput("", validateEmail, "Enter a valid email");
  const password = useFormInput("", (val) => val.length >= 6, "Password must be at least 6 characters");
  const confirmPassword = useFormInput("", (val) => val === password.value, "Passwords must match");

  const [showPassword, togglePassword] = useTogglePassword();
  const [showConfirmPassword, toggleConfirmPassword] = useTogglePassword();


  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (username.value.trim() === "") {
      username.setError("Username is required");
      hasError = true;
    }

    if (email.value.trim() === "") {
      email.setError("Email is required");
      hasError = true;
    } else if (!validateEmail(email.value)) {
      email.setError("Enter a valid email");
      hasError = true;
    }

    if (password.value.trim() === "") {
      password.setError("Password is required");
      hasError = true;
    } else if (password.value.length < 6) {
      password.setError("Password must be at least 6 characters");
      hasError = true;
    }

    if (confirmPassword.value.trim() === "") {
      confirmPassword.setError("Please confirm your password");
      hasError = true;
    } else if (confirmPassword.value !== password.value) {
      confirmPassword.setError("Passwords must match");
      hasError = true;
    }

    if (hasError) return;

    const newUser = {
      id: uuidv4(),
      username: username.value,
      email: email.value,
      password: password.value,
    };

    const existingData = JSON.parse(localStorage.getItem('RegisterUser')) || [];
    existingData.push(newUser);
    localStorage.setItem('RegisterUser', JSON.stringify(existingData));

    alert("Registration is completed.");
    navigate("/login");

    username.setValue("");
    email.setValue("");
    password.setValue("");
    confirmPassword.setValue("");
  };


  return (
    <div className={isDarkMode ? "register-bg" : "register-bg-dark"}>
      <div className={isDarkMode ? "register" : "register-dark"}>
        <h1>Register</h1>
        <p className="para">Let's create new account</p>

        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="username">Username:</label>
            <input
              className={username.error ? "invalid-input" : "input"}
              type="text"
              id="username"
              name="username"
              value={username.value}
              onChange={username.onChange}
              onBlur={username.onBlur}
            />
            <p className="register-error">{username.error}</p>
          </div>

          <div className="">
            <label htmlFor="email">Email Address:</label>
            <input
              className={email.error ? "invalid-input" : "input"}
              type="text"
              id="email"
              name="email"
              value={email.value}
              onChange={email.onChange}
              onBlur={email.onBlur}
            />
            <p className="register-error">{email.error}</p>
          </div>

          <div className="register-password-input">
            <label htmlFor="password">Password:</label>
            <input
              className={password.error ? "invalid-input" : "input"}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
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

            <p className="register-error">{password.error}</p>
          </div>

          <div className="register-password-input">
            <label htmlFor="ConfirmPassword">Confirm Password:</label>
            <input
              className={confirmPassword.error ? "invalid-input" : "input"}
              type={showConfirmPassword ? "text" : "password"}
              id="ConfirmPassword"
              name="confirmPassword"
              value={confirmPassword.value}
              onChange={confirmPassword.onChange}
              onBlur={confirmPassword.onBlur}
            />

            <span onClick={toggleConfirmPassword}>
              {showConfirmPassword 
                ? (confirmPassword.error
                  ? <img src={eyeOffCrimson} className="login-eye" />
                  : <img src={eyeOffBlack} className="login-eye" />
                )
                :
                (confirmPassword.error
                  ? <img src={eyeOnCrimson} className="login-eye" />
                  : <img src={eyeOnBlack} className="login-eye" />
                )}
            </span>
            <p className="register-error">{confirmPassword.error}</p>
          </div>

          <div className="register-red-btn">
            <button type="submit" className="btn-red">
              Register
            </button>
          </div>
          <p className="text-center">
            Already have an account? <Link to="/login" className="login-here">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
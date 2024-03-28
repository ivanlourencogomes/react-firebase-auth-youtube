import FullPageLoader from "../components/FullPageLoader.jsx";
import { useState } from "react";
import { auth } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/usersSlice.js";
import googleLogo from "../assets/google.png";
import facebookLogo from "../assets/facebook.png";

function LoginPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState("login");
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // when user is logged/signed in
      dispatch(
        setUser({
          id: user.uid,
          email: user.email,
        })
      );
    } else {
      // when user logs out set state back to null
      dispatch(setUser(null));
    }
    if (isLoading) {
      setIsLoading(false);
    }
  });

  const handleCredentials = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");

    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    ).catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage);
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    ).catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage);
    });
  };

  const handlePasswordReset = () => {
    const email = prompt("Please Enter Your Email");
    sendPasswordResetEmail(auth, email);
    alert("Email sent! Check your inbox for password reset instructions");
  };

  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}

      <div className="container login-page">
        <section>
          <h1>Welcome to the Book App</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType == "login" ? "selected" : ""}`}
              onClick={() => setLoginType("login")}
            >
              Login
            </button>
            <button
              className={`btn ${loginType == "signup" ? "selected" : ""}`}
              onClick={() => setLoginType("signup")}
            >
              Signup
            </button>
          </div>
          <div className="social-options">
            <h3>Continue With</h3>
            <div className="buttons">
              <button className="google">
                <img
                  src={googleLogo}
                  alt="google logo"
                  className="google-img"
                />
                <span>Google</span>
              </button>
              <button className="facebook">
                <img
                  src={facebookLogo}
                  alt="facebook logo"
                  className="facebook-img"
                />
                <span>Facebook</span>
              </button>
            </div>
            <div className="line"></div>
          </div>

          <form className="add-form login">
            <div className="form-control">
              <label>Email *</label>
              <input
                onChange={(e) => handleCredentials(e)}
                type="text"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input
                onChange={(e) => handleCredentials(e)}
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            {loginType == "login" ? (
              <button
                onClick={(e) => handleLogin(e)}
                className="active btn btn-block"
              >
                Login
              </button>
            ) : (
              <button
                onClick={(e) => {
                  handleSignUp(e);
                }}
                className="active btn btn-block"
              >
                Sign Up
              </button>
            )}

            {/* Error container */}
            {error && (
              <div className="error">
                {error}

                {/* Will use below code to set custom error message}
                {error.includes(
                  "invalid-email" && <p>Please enter a valid email</p>
                )} */}
              </div>
            )}

            <p onClick={handlePasswordReset} className="forgot-password">
              Forgot Password?
            </p>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginPage;

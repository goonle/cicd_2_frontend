import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/api-helper";
import styles from "./Register.module.css";
import Loader from "../components/Loader";
import { useToast } from "../context/ToastContext";

function Register({ activeTab }) {
  const [isChecked, setIsChecked] = useState(activeTab === "login");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleToast } = useToast();

  useEffect(() => {
    if (activeTab) {
      setIsChecked(activeTab === "login");
    }
  }, [activeTab]);


  const handleSubmit = async (endpoint, formData, successMessage) => {
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, formData);

      handleToast(successMessage, "success");
      // alert(successMessage);
      setIsChecked(true);
      return response.data;
    } catch (error) {
      handleToast(`An error occurred. Please try again.`, "error");
      console.log(`Request failed:`, error);
      setErrorMessage(`Request failed: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    setErrorMessage("");
    await handleSubmit("register/", data, "Registration successful!");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    setErrorMessage("");
    const res = await handleSubmit("login/", data, "Login successful!");
    if (res) {
      localStorage.setItem("token", res.token);
      window.location.href = "/main";
    }
  };

  return (
    <>
      <Loader show={loading} />
      <div className="page-centered">

        <div className={`${styles.main} `}>
          <input
            type="checkbox"
            id={styles.chk}
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            aria-hidden="true"
          />

          <div className={styles.signup}>
            <form onSubmit={handleRegister}>
              <label htmlFor={styles.chk} aria-hidden="true">
                Sign up
              </label>
              <input type="text" name="username" placeholder="User name" required />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <button type="submit">Sign up</button>
            </form>
          </div>

          <div className={styles.login}>
            <form onSubmit={handleLogin}>
              <label htmlFor={styles.chk} aria-hidden="true">
                Login
              </label>
              <input type="text" name="username" placeholder="Username" required />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

        </div>
      </div>
    </>
  );
}

export default Register;

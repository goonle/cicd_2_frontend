import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/api-helper";

function Register({ activeTab }) {
  const [isChecked, setIsChecked] = useState(activeTab === "login");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (activeTab) {
      setIsChecked(activeTab === "login");
    }
  }, [activeTab]);

  const handleSubmit = async (endpoint, formData, successMessage) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, formData);
      alert(successMessage);
      return response.data;
    } catch (error) {
      console.error(`Request failed:`, error);
      setErrorMessage(`Request failed: ${error.message}`);
      return null;
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
    await handleSubmit("login/", data, "Login successful!");
  };

  return (
    <div className="main">
      <input
        type="checkbox"
        id="chk"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        aria-hidden="true"
      />

      <div className="signup">
        <form onSubmit={handleRegister}>
          <label htmlFor="chk" aria-hidden="true">
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

      <div className="login">
        <form onSubmit={handleLogin}>
          <label htmlFor="chk" aria-hidden="true">
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
  );
}

export default Register;

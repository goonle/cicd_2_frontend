import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/api-helper";

function Register() {
  const [activeTab, setActiveTab] = useState("login");

  // Generic form submission handler
  const handleSubmit = async (endpoint, formData, successMessage) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, formData);
      console.log(`${successMessage}:`, response.data);
      alert(successMessage);
      return response.data;
    } catch (error) {
      console.error(`Request failed:`, error);
      alert(`Request failed. ${error.message}`);
      throw error;
    }
  };

  // Handle register form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    await handleSubmit("register/", data, "Registration successful!");
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    await handleSubmit("login/", data, "Login successful!");
  };

  // Toggle between login and register tabs
  const toggleTab = () => {
    setActiveTab(activeTab === "login" ? "register" : "login");
    document.getElementById("chk").checked = activeTab === "login";
  };

  return (
    <>
      <title>Account Access</title>
      <link rel="stylesheet" type="text/css" href="style.css" />
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap"
        rel="stylesheet"
      />
      <div className="main">
        <input
          type="checkbox"
          id="chk"
          aria-hidden="true"
          checked={activeTab === "register"}
          onChange={toggleTab}
        />
        <div className="signup">
          <form onSubmit={handleRegister}>
            <label htmlFor="chk" aria-hidden="true">
              Register
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;

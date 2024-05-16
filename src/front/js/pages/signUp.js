import React, { useState } from "react";
import { Link } from 'react-router-dom'

import "../../styles/signUp.css";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "confirmPassword" && value !== formData.password) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const confirmPasswordClass =
    formData.password !== formData.confirmPassword
      ? "border border-danger"
      : "";

  return (
    <div className="container">
      <h1 className="mt-5 signup-title">Sign Me Up</h1>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <form>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Choose Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${confirmPasswordClass}`}
                id="confirmPassword"
                onChange={handleChange}
                required
              />
            </div>
            <input type="checkbox" id="tandc" required />
            <label htmlFor="tandc">Please confirm the <Link to={'/'}>Terms and Condition</Link></label>
            <button
              type="submit"
              className="btn btn-primary mt-2"
              style={{ width: "100%" }}
              disabled={isButtonDisabled}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};


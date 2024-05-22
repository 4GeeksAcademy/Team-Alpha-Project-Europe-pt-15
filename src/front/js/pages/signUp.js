import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"

import "../../styles/index.css";

import email from "../../img/icon_email.png"
import password from "../../img/icon_pw.png"
import confirmPassword from "../../img/icon_pwc.png"
import user from "../../img/icon_user.png"


export const SignUp = () => {
  const {store, actions} = useContext(Context)

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

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(store.formData);
        await actions.createUser();
      };

  return (
    <div className="m-0">
      <form className="col-md-4 m-3 gap-1 mx-auto card" onSubmit={handleSubmit}>
        <h1>Sign Me Up</h1>
        <div className="d-inline card">
          <img className="col-auto"
            src={user} alt="user icon"
          />
          <input
            type="text"
            className="col-9"
            id="userName"
            placeholder="username"
            onChange={handleChange}
            value={formData.userName}
            required
          />
        </div>
        <div className="d-inline card">
          <img className="col-auto"
            src={email} alt="email icon"
          />
          <input
            type="email"
            className="col-9"
            id="email"
            placeholder="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>
        <div className="d-inline card">
          <img className="col-auto"
            src={password} alt="password icon"
          />
            <input
              type="password"
              className="col-9"
              id="password"
              placeholder="password"
              onChange={handleChange}
              value={formData.password}
              required
              minLength={8}
            />
        </div>
        <div className="d-inline card">
          <img className="col-auto"
            src={confirmPassword} alt="conbfirmpassword icon"
          />
          <input
            type="password"
            className={`col-9 ${confirmPasswordClass}`}
            id="confirmPassword"
            placeholder="confirm password"
            onChange={handleChange}
            value={formData.confirmPassword}
            required
          />
        </div>
        <div className="d-flex">
          <input type="checkbox" id="tandc" required />
          <label htmlFor="tandc" className="mx-2">
            Please confirm the <Link to={"/"}>Terms and Condition</Link>
          </label>
        </div>
        <button
          type="submit" 
          className="card bg-purple"
        >
          <h5 className="m-auto">Gotcha</h5>
        </button>
      </form>
    </div>
  );
};

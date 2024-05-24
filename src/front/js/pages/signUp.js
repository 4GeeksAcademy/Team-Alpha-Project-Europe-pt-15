import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"

import "../../styles/index.css";

import emailIcon from "../../img/icon_email.png"
import passwordIcon from "../../img/icon_pw.png"
import confirmPasswordIcon from "../../img/icon_pwc.png"
import nameIcon from "../../img/icon_user.png"


export const SignUp = () => {
  const {store, actions} = useContext(Context)

  const [formData, setFormData] = useState({
    name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      actions.setFormData(formData); 
      await actions.createUser();    
    } catch (error) {
      console.error(error);
    }
  };

  const confirmPasswordClass =
    formData.password !== formData.confirmPassword
      ? "border border-danger"
      : "";

  return (
    <>
      <form className="col-md-4 mx-auto px-5 py-3 gap-4 card" onSubmit={handleSubmit}>
        <h1 className="m-0">Sign Me Up</h1>
        <div className="d-inline-flex flex-row justify-content-evenly p-2 card">
          <img className="col-auto"
            src={nameIcon} alt="user icon"
          />
          <input
            type="text"
            className="col-9"
            id="name"
            placeholder="username"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
        <div className="d-inline-flex flex-row justify-content-evenly p-2 card">
          <img className="col-auto"
            src={emailIcon} alt="email icon"
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
        <div className="d-inline-flex flex-row justify-content-evenly p-2 card">
          <img className="col-auto"
            src={passwordIcon} alt="password icon"
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
        <div className="d-inline-flex flex-row justify-content-evenly p-2 card">
          <img className="col-auto"
            src={confirmPasswordIcon} alt="conbfirmpassword icon"
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
          className="card p-3 m-0 text-center bg-purple"
        >
          <h5 className="m-auto">Gotcha</h5>
        </button>
      </form>
    </>
  );
};

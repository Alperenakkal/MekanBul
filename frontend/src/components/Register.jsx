import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
import VenueReducer from "../services/VenueReducer";
import AdminButton from "./AdminButton";

function Register() {
  const navigate = useNavigate();
  const [user, dispatchComment] = React.useReducer(VenueReducer, {
    data: {},
    isSuccess: false,
    isvenueError:false,
  });

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const formData = evt.target.elements;
    const kullanici = {
      name: formData.name.value,
      email: formData.email.value,
      password: formData.password.value,
    };
    console.log(kullanici);

    try {
      await VenueDataService.register(kullanici);
      dispatchComment({ type: "ADD_VENUE_SUCCESS" });
    } catch (error) {
      dispatchComment({ type: "VENUE_FAILURE" });
    }
  };

  if (user.isSuccess) {
    navigate("/");
  }
  
  
  
  
  
  return (
    <div className="col-xs-12 col-md-6 col-xl">
  
    <form className="form-horizontal" id="addVenue" onSubmit={onSubmit}>
      <div className="form-group">
        <label className="col-xs-8 col-sm-2 control-label">İsim: </label>
        <div className="col-xs-6 col-sm-10">
          <input
            className="form-control"
            name="name"
            
          
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-xs-10 col-sm-2 control-label">Email:</label>
        <div className="col-xs-12 col-sm-10">
          <input
            className="form-control"
            name="email"
             
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-xs-8 col-sm-2 control-label">Password:</label>
        <div className="col-xs-6 col-sm-10">
          <input
            className="form-control"
            name="password"
            
          
          />
        </div>
      </div>
      <AdminButton name="Giris" type="primary" onSubmit={(evt) => onSubmit(evt)}></AdminButton>
      </form>
      </div>
    );
  }
  
  export default Register;
  
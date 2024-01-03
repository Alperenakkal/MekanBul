import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
import VenueReducer from "../services/VenueReducer";
import AdminButton from "./AdminButton";

function Login() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null); // Token state'i ekledik

  const [user, dispatchComment] = React.useReducer(VenueReducer, {
    data: {},
    isSuccess: false,
    isError: false,
  });

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const formData = evt.target.elements;
    const kullanici = {
      email: formData.email.value,
      password: formData.password.value,
    };
  
    try {
      const response = await VenueDataService.login(kullanici);
      dispatchComment({ type: "ADD_VENUE_SUCCESS" });
  
      // Token'ı local storage'a depolayın
      localStorage.setItem("token", response.data.token);
  
      // Diğer işlemleri gerçekleştirin
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};


    const storedToken = getTokenFromLocalStorage();
  
    if (storedToken && user.isSuccess) {
      // Eğer depolanan bir token varsa ve kullanıcı başarılı bir şekilde giriş yapmışsa, oturumu başlat
      navigate("/admin");
    }
    const register = () => {
      navigate("/signup")
    };
  

     
  return (
   
    <div className="col-xs-12 col-md-6 col-xl">
  
        <form className="form-horizontal" id="addVenue" onSubmit={onSubmit}>
          <div className="form-group">
            <label className="col-xs-8 col-sm-2 control-label">Email:</label>
            <div className="col-xs-6 col-sm-10">
              <input
                className="form-control"
                name="email"
                
              
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">Password: </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="password"
                
              />
            </div>
          </div>
          <AdminButton name="Giris" type="primary" onSubmit={(evt) => onSubmit(evt)}></AdminButton>
          <AdminButton name="Register" type="primary" onClick={register}></AdminButton>
          </form>
          </div>
  );
}

export default Login;

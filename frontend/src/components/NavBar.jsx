import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
function NavBar() {
  const navigate = useNavigate();
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };
  const storedToken = getTokenFromLocalStorage();
  

      

   
  return (
    <div className="navbar-default navbar navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <NavLink className="navbar-brand" to="/">Mekanbul</NavLink>
          <button
            className="navbar-toggle"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-main"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div id="navbar-main" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
          <li>
                {storedToken ? (
              <NavLink to={"admin"}>Yönetici</NavLink>
                ) : (
                <NavLink to={"login"}>Yönetici</NavLink>
                 )}
              </li>
            <li>
            <NavLink to={"about"}>Hakkında</NavLink> 
            </li>
        
          </ul>
        </div>
      </div>
    </div>
  );
}
export default NavBar;

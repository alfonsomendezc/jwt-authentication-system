import React from "react";
import { Redirect } from "react-router-dom";

export const Private = (props) => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <div className="ml-auto">
            <button className="btn btn-primary">Log out</button>
          </div>
        </div>
      </nav>
      <h1>ESTA ES MI RUTA PRIVADA</h1>
      {localStorage.getItem("token") == undefined && <Redirect to={"/login"} />}
    </div>
  );
};

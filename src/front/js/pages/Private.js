import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = (props) => {
  const { actions } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    actions.privateData();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <div className="ml-auto">
            <button
              onClick={(e) => {
                localStorage.removeItem("token");
                history.push("/login");
              }}
              className="btn btn-primary"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
      <h1>ESTA ES MI RUTA PRIVADA</h1>
      {localStorage.getItem("token") == undefined && <Redirect to={"/login"} />}
    </div>
  );
};

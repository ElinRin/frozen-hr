import React from "react";
import { NavLink } from "reactstrap";

import "./Error.css";

export const Error = () => {
  return (
    <div className="error-container">
      <div className="error-form-container">
        <span> Something went wrong</span>
        <NavLink color="primary" href="./login">
          Try again
        </NavLink>
      </div>
    </div>
  );
};

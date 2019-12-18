import React from "react";
import { useRoutes, setBasepath } from "hookrouter";
import isElectron from "is-electron";
import { BrowserRouter as Router } from "react-router-dom";

import {
  Login,
  Error,
  Home,
  Main,
  Workplace,
  Meetings,
  Colleagues
} from "../pages";
import { MainNavbar, NoPageFound } from "../components";

import "./App.css";

const routes = {
  "/": () => <Main />,
  "/login": () => <Login />,
  "/error": () => <Error />,
  "/main": () => <Main />,
  "/u/:id": ({ id }) => <Home userId={id} />,
  "/workplace": () => <Workplace />,
  "/colleagues": () => <Colleagues />,
  "/meetings": () => <Meetings />
};

if (isElectron()) {
  setBasepath(window.location.pathname);
}

export const Routes = () => {
  const routeResult = useRoutes(routes);
  return (
    <Router>
      <div className="app">
        <MainNavbar />
        {routeResult || <NoPageFound />}
      </div>
    </Router>
  );
};

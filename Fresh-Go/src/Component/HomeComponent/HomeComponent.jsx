import React from "react";
import "./homecomponent.css";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import { Outlet } from "react-router-dom";

function HomeComponent() {
  return (
    <div className="home-main-container">
      <div className="home-header-container">
        <HeaderComponent />
      </div>
      <main className="home-body-container">
        <Outlet />
      </main>
    </div>
  );
}

export default HomeComponent;

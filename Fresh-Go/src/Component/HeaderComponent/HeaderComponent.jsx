import React, { useEffect, useState } from "react";
import "./headercomponent.css";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import{HashLink as HasLink} from 'react-router-hash-link';
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";

import {getAllCartData} from '../../Service/api'

function HeaderComponent() {
  const [showMenu, setShowMenu] = useState(false);

  const userdataval = useSelector((state) => state.user);
  console.log("header state", userdataval.user);

  useEffect(() => {
    const getCartAllData = async() =>{
      try{
         const getCartData = await getAllCartData().then(async(data)=>{
          const cartData = await data.json()
          console.log("Cart Data", cartData)
         })

      }
      catch(err){
        console.log("error",err.stack)
      }
    }

    getCartAllData();
  })

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };
  console.log("email", process.env.REACT_APP_ADMIN_GMAIL);
  return (
    <div className="header-main-container">
      <div className="header-inner-container">
        <div className="header-title-container">
          <div className="header-title">
            {" "}
            <Link to={""}>Fresh Go</Link>
          </div>
        </div>

        <div className="header-menu-list">
          <div className="menu-list-head list1">
            <Link to={""}>Home</Link>
          </div>
          <div className="menu-list-head list2">
            <HasLink to={"#navhome-all-category-container"}>Menu</HasLink>
          </div>
          <div className="menu-list-head list3">
            <Link to={"about"}>About</Link>
          </div>
          <div className="menu-list-head list4">
            <Link to={"contant"}>Contact</Link>
          </div>
        </div>

        <div className="header-features-container">
          <div className="header-feature cart">
            <Badge badgeContent={4} color="primary">
              <FaShoppingCart color="action" />
            </Badge>
          </div>
          <div
            className="header-feature profile"
            onClick={() => {
              handleShowMenu();
            }}
          >
            {userdataval.user.email ? (
              <div className="profile-image-containter">
                <img
                  src={userdataval.user.image}
                  className="profile-header-image"
                />
              </div>
            ) : (
              <FaUserAlt />
            )}
          </div>
          {showMenu && (
            <div className="profile-menu-container">
              {userdataval.user.email === process.env.REACT_APP_ADMIN_GMAIL && (
                <Link
                  to={"newProduct"}
                  className="profile-menu profile-menu-newProduct"
                  onClick={() => {
                    handleShowMenu();
                  }}
                >
                  New Product
                </Link>
              )}

              {userdataval.user.email ? (
                <p className="profile-menu">Log Out</p>
              ) : (
                <Link
                  to={"login"}
                  className="profile-menu profile-menu-Login"
                  onClick={() => {
                    handleShowMenu();
                  }}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;

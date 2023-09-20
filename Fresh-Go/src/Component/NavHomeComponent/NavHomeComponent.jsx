import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductData } from "../../redux/productSlice";
import { getAllProduct } from "../../Service/api";
import "./navhomecomponent.css";
import { BsCurrencyRupee } from "react-icons/bs";
import {AiFillRightCircle} from 'react-icons/ai'
import {AiFillLeftCircle} from 'react-icons/ai'
import VegetableSliderComponent from "../VegetableSliderComponent/VegetableSliderComponent";

function NavHomeComponent() {
  const productDispatch = useDispatch();
  const [offerList, setOfferList] = useState([]);
  const productredux = useSelector((state) => console.log("state", state));
  useEffect(() => {
    const allPageData = () => {
      try {
        const getProductData = getAllProduct().then(async (data) => {
          const res = await data.json();
          const setProductDispatch = await productDispatch(
            setProductData(res.data)
          );
          const offerlist = await setOfferList(res.data.slice(0, 2));

          console.log("offerlist", offerList);
          console.log("All product data", res);
          console.log(productredux);
        });
      } catch (err) {
        console.log("errrors", err.stack);
      }
    };

    allPageData();
  }, []);

  return (
    <div className="navhome-main-container">
      <div className="navhome-inner-main-container">
        <div className="navhome-offer-advs-section">
          <div className="navhome-advs-section">
            <div className="navhome-advs-ship-label">
              <p>Bike Delivery</p>
              <img src="delivery-image-1.png" />
            </div>
            <div className="navhome-advs-description">
              <div className="navhome-advs-des-header">
                The Fasted Delivery in <span>Your Home.</span>
              </div>
              <div className="navhome-advs-des-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vel sem ut lorem scelerisque convallis. Maecenas vitae tincidunt
                dui, in congue neque. Donec at porttitor nulla, quis varius
                dolor. Mauris fermentum at tortor vitae iaculis. Vivamus eu
                purus efficitur, facilisis urna et, mollis libero. Pellentesque
                eu dolor ultricies, efficitur nisl a, placerat augue. Nam non
                nunc id leo dignissim faucibus. Fusce convallis nisi ex, sit
                amet ultrices orci gravida eu. Sed consequat, quam non vehicula
                posuere, urna nisi vestibulum sapien, ut imperdiet metus lectus
                eget eros.
              </div>
              <div className="navhome-advs-content-order-btn">
                <button className="navhome-order-btn">Order Now</button>
              </div>
            </div>
          </div>
          <div className="navhome-offer-list-section">
            <div className="havhome-offer-header">
              Frequently <span>Buyings.</span>
            </div>
            <div className="navhome-offer-list">
              <div className="navhome-offer-showmore">
                <div className="navhome-offer-slider offer-prev"><AiFillLeftCircle/></div>
                <div className="navhome-offer-slider offer-next"><AiFillRightCircle/></div>
              </div>
              <div className="navhome-offer-list-body">
                {offerList.map((data, i) => (
                  <div className="nav-offer-list-card-container" key={i}>
                    <img
                      className="nav-offer-card-feature card-image"
                      src={data.image}
                    />
                    <div className="nav-offer-card-feature card-name">
                      {data.name}
                    </div>
                    <div className="nav-offer-card-feature card-category">
                      {data.category}
                    </div>
                    <div className="nav-offer-card-feature card-price">
                      <BsCurrencyRupee />
                      {data.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="navhome-vegetable-slider-container">
          <VegetableSliderComponent/>
        </div>
      </div>
    </div>
  );
}

export default NavHomeComponent;

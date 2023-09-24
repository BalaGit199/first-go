import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductData } from "../../redux/productSlice";
import { getAllProduct } from "../../Service/api";
import "./navhomecomponent.css";
import { BsCurrencyRupee } from "react-icons/bs";
import { AiFillRightCircle } from "react-icons/ai";
import { AiFillLeftCircle } from "react-icons/ai";
import VegetableSliderComponent from "../VegetableSliderComponent/VegetableSliderComponent";
import { Link } from "react-router-dom";

function NavHomeComponent() {
  const productDispatch = useDispatch();
  const [offerList, setOfferList] = useState([]);
  const [allProductList, setAllProductList] = useState([]);
  const productredux = useSelector((state) => state.product);

  const [allDataCheck,setAllDataCheck] =useState(false)

  const all_Category_list = [
    { category: "Fruits", image: "friuts123.jpg" },
    { category: "Vegetable", image: "vegetables-all.png" },
    { category: "Ice Cream", image: "icecream123.jpg" },
    { category: "Dosa", image: "dosa.jpg" },
    { category: "Pizza", image: "hot-italian-pizza-cutout-png.webp" },
    { category: "Sandwich", image: "DSC_6328X-gourmet-sandwich-platter.jpg" },
    { category: "Cake", image: "super-easy-lemon-poke-cake.webp" },
    { category: "Burger", image: "beef-burger-isolated-png.webp" },
  ];
  useEffect(async () => {
    const categoryContainer = await document.getElementById(
      "navhome-all-category-card-container"
    );
    const sliderCard = document.getElementsByTagName("li");
    for (let i = 0; i < sliderCard.length; i++) {
      const temp = sliderCard[i];
      temp.style.height = temp.style.width + "px";
      // console.log("temp value", temp.clientHeight, temp.clientWidth);
    }
    // console.log("categoryContainer", categoryContainer.children[5].clientWidth);

  });
  useEffect(() => {
    const allPageData = () => {
      try {
        const getProductData = getAllProduct().then(async (data) => {
          const res = await data.json();
          const setProductDispatch = await productDispatch(
            setProductData(res.data)
          )
          const offerlist = await setOfferList(res.data.slice(0, 2));
          console.log("offerlist", offerList);
          setAllDataCheck(true)
          console.log("All product data",);
        });
      } catch (err) {
        console.log("errrors", err.stack);
      }
    };
    allPageData();
    // console.log("check data",productredux.allProduct)
  }, []);
  useEffect(async()=>{
    const setAllProuct = await setAllProductList(prev => prev = [...productredux.allProduct]);

    console.log("valuess chamges")
  },[allDataCheck])

  const cardFeature = (e) =>{
     e.stopPropagation();
  }
  console.log("product redux",  productredux.allProduct);

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
                <div className="navhome-offer-slider offer-prev">
                  <AiFillLeftCircle />
                </div>
                <div className="navhome-offer-slider offer-next">
                  <AiFillRightCircle />
                </div>
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
          <VegetableSliderComponent />
        </div>
        <div className="navhome-all-category-container" id="navhome-all-category-container">
          <div className="navhome-all-category-inner-container">
            <div className="navhome-all-category-header">Our Categories</div>
            <div className="navhome-all-category-body">
              <ul
                className="navhome-all-category-card-container"
                id="navhome-all-category-card-container"
              >
                {all_Category_list.map((data, i) => (
                  <li
                    className="navhome-all-category-card"
                    id="navhome-all-category-card"
                    key={i}
                  >
                    <img
                      src={data.image}
                      className="navhome-all-category-image"
                    />
                    <div className="navhome-all-category-category">
                      {data.category}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="navhome-all-product-main-container">
          <div className="navhome-all-product-inner-container">
            <div className="navhome-all-product-header">Product to explore</div>
            <div className="navhome-all-product-body-container">
              <div className="navhome-all-product-card-container">
                {allProductList.map((data, i) => (
                  <div className="navhome-all-product-cards" key={i}>
                    <div className="navhome-all-product-img-container">
                      <img
                        src={data.image}
                        className="navhome-all-product-image"
                      />
                    </div>
                    <div className="navhome-all-product-name">{data.name}</div>
                    <div className="navhome-all-product-category">
                      {data.category}
                    </div>
                    <div className="navhome-all-product-price">
                      <BsCurrencyRupee />
                      {data.price}
                    </div>
                    <div className="navhome-all-product-btn-container">
                      <button className="navhome-all-home-button" onClick={(e)=>{cardFeature(e)}}><Link to={`menu/${data._id}`}>Add Cart</Link></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavHomeComponent;

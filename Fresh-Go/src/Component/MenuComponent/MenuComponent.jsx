import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { BsCurrencyRupee } from "react-icons/bs";
import "./menucomponent.css";
import { Link } from "react-router-dom";
import { addItemsCart, getAllCartData } from "../../Service/api";
import { setAllCartdata,setLengthCart } from "../../redux/cartSlice";
import { ClickAwayListener } from "@mui/material";

function MenuComponent() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [checkAllCart, setCheckAllCart] = useState(false);
  const [updateRedux, setUpdateRedux] = useState(false);
  const [allCartData, setAllCartData] = useState([]);
  const allProductRedux = useSelector((state) => state.product);
  const cartredux = useSelector((state) => state.cart);
  const cartDispatch = useDispatch();
  console.log("product state", allProductRedux.allProduct);

  const getAll_CartData = async () => {
    try {
      const getCartData = await getAllCartData().then(async (data) => {
        const res = await data.json();
        const setallcart = await setAllCartData((prev) => (prev = res.data));
        setUpdateRedux(prev => prev = !prev)
        console.log("response all data ", res);
      });
    } catch (err) {
      console.log("errorrs", err.stack);
    }
  };

  useEffect(() => {
    const setCartDispatch = cartDispatch(setAllCartdata(allCartData));
    const setCartlength = cartDispatch(setLengthCart(allCartData.length))
    console.log("datata", allCartData);
  }, [updateRedux]);

  useEffect(() => {
    // getAll_CartData();
  });

  useEffect(async () => {
    getAll_CartData()
    const innerContainer = await document.getElementById(
      "menu-product-service-main-container"
    );
    console.log("inner width", innerContainer.clientWidth);
    console.log("inner height", innerContainer.clientHeight);
    const findProductData = await allProductRedux.allProduct.filter(
      (data) => data._id === params.id
    );
    const shop_data = await findProductData[0];
    setProduct((prev) => (prev = shop_data));

    const similarCate = await allProductRedux.allProduct.filter((data) =>
      data.category.includes("V")
    );
    setSimilarProducts((data) => (data = similarCate));
    console.log("similar products", similarCate);
    console.log("shop data", findProductData[0]);
  }, []);

  const addToCart = async (cartitem) => {
    window.scrollTo({ top: "0", behavior: "smooth" });
    const cartItemApi = async (cartitem) => {
      try {
        const addItemCart = await addItemsCart(cartitem).then(async (data) => {
          const cartData = await data.json();
          setCheckAllCart((prev) => (prev = !prev));
          console.log("cart dataa res", cartData);
          console.log("cart dataa res11111");
        });
      } catch (err) {
        console.log("errorrr", err.stack);
      }
    };
    await cartItemApi(cartitem);
    const setTime = setTimeout(getAll_CartData, 2000);

    console.log("cart item", cartitem);
  };

  useEffect(async () => {
    const findProductData = await allProductRedux.allProduct.filter(
      (data) => data._id === params.id
    );
    const shop_data = await findProductData[0];
    setProduct((prev) => (prev = shop_data));
    console.log("change paramss", product);
  }, [params.id]);

  console.log("paramss", cartredux.allCartData);
  return (
    <div
      className="menu-product-service-main-container"
      id="menu-product-service-main-container"
    >
      <div className="menu-product-service-inner-container">
        <div className="menu-service-product-details">
          <div
            className="menu-service-product-details-inner"
            id="menu-service-product-details-inner"
          >
            <div className="menu-product-service-image-con">
              <img
                src={product["image"]}
                className="menu-prouctservice-image"
              />
            </div>
            <div className="menu-product-service-body-con">
              <div className="menu-service-product-name">{product["name"]}</div>
              <div className="menu-service-product-category">
                {product["category"]}
              </div>
              <div className="menu-service-product-price">
                <BsCurrencyRupee />
                {product["price"]}
              </div>
              <div className="menu-service-product-btns">
                <div className="menu-service-product-buy-btn">
                  <button>Buy</button>
                </div>
                <div className="menu-service-product-addcart-btn">
                  <button
                    onClick={() => {
                      addToCart(product);
                    }}
                  >
                    Add Cart
                  </button>
                </div>
              </div>
              <div className="menu-service-product-desc">
                {product["description"]}
              </div>
            </div>
          </div>
        </div>
        <div className="navhome-all-product-main-container">
          <div className="navhome-all-product-inner-container">
            <div className="navhome-all-product-header">Product to explore</div>
            <div className="navhome-all-product-body-container">
              <div className="navhome-all-product-card-container">
                {similarProducts.map((data, i) => (
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
                      <button
                        className="navhome-all-home-button"
                        onClick={() => addToCart()}
                      >
                        <Link to={`/menu/${data._id}`}>Add Cart</Link>
                      </button>
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

export default MenuComponent;

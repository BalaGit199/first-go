import React, { useEffect, useState } from "react";
import { getAllProduct } from "../../Service/api";
import "./vegetablesildercomponent.css";
import { BsCurrencyRupee } from "react-icons/bs";
import { AiFillRightCircle } from "react-icons/ai";
import { AiFillLeftCircle } from "react-icons/ai";

function VegetableSliderComponent() {
  const [allHomeProduct, setAllHomeProduct] = useState([]);
  const [filterCateList, setFilterCateList] = useState([]);
  const [silder_container, setSilderContainer] = useState();
  const [showSilerLength, setDisplaySilderLength] = useState();
  const [singleCardWidth, setSingleCardWidth] = useState();
  useEffect(async () => {
    const silder_cards = await document.getElementById(
      "silder-card-vegetable-container"
    );
    const mainSilderContainer = await document.getElementById(
      "vegetable-silder-inner-container"
    );
    setSilderContainer(silder_cards);
    const showToDisplay = 5;
    setDisplaySilderLength(showToDisplay);
    // const container_height = mainSilderContainer.clientHeight
    const single_silde = mainSilderContainer.clientWidth / showToDisplay;
    setSingleCardWidth(single_silde);
    const silder_card_length = silder_cards.children.length;
    silder_cards.style.width = await single_silde * silder_card_length + "px";
    silder_cards.style.height = await (single_silde * silder_card_length) / 15 + "px";
    // console.log("silder card", silder_cards.children);
    // console.log(
    //   "single silde:",
    //   single_silde,
    //   "card_length:",
    //   silder_card_length,
    //   "slider length",
    //   silder_cards.clientWidth,
    //   "main container length:",
    //   mainSilderContainer.clientWidth,
    //   mainSilderContainer.clientWidth / 15
    // );
  });
  useEffect(async () => {
    const vegetableCateFliter = async () => {
      try {
        const getAllHomeProduct = await getAllProduct()
          .then(async (data) => {
            const res = await data.json();
            const resData = await res.data;
            setAllHomeProduct(resData);
            // console.log("dataaa111", resData);
            // return resData
          })
          .catch((err) => console.log("error occurs", err));
      } catch (err) {
        console.log("errror", err.stack);
      }
    };
    vegetableCateFliter();
  }, []);

  useEffect(() => {
    const catefilterMethod = async () => {
      try {
        const cateFilter = await allHomeProduct.filter((data) =>
          data.category.includes("V")
        );
        // console.log("Category service", cateFilter);
        setFilterCateList(cateFilter);
      } catch (err) {
        console.log("errorsss", err.stack);
      }
    };
    catefilterMethod();

    console.log("second valuess", allHomeProduct);
  }, [allHomeProduct]);

  const next = () => {
    if (silder_container.style.marginLeft.slice(0, -2) != 0) {
      silder_container.style.marginLeft =
        +silder_container.style.marginLeft.slice(0, -2) +
        singleCardWidth +
        "px";
      // console.log(
      //   "check width",
      //   silder_container.clientWidth,
      //   silder_container.style.marginLeft.slice(0, -2)
      // );
    }
  };
  const prev = () => {
    if (
      silder_container.style.marginLeft.slice(0, -2) !=
      -singleCardWidth * (silder_container.children.length - showSilerLength)
    ) {
      silder_container.style.marginLeft =
        +silder_container.style.marginLeft.slice(0, -2) -
        singleCardWidth +
        "px";
      // console.log("check width", silder_container.clientWidth);
    }
  };

  return (
    <div className="vegetable-slider-maincontainer">
      <div
        className="vegetable-silder-inner-container"
        id="vegetable-silder-inner-container"
      >
        <div className="vegetable-silder-showmore-container">
          <div
            className="vegetable-silder showmore-prev"
            onClick={() => next()}
          >
            <AiFillLeftCircle />
          </div>
          <div
            className="vegetable-silder showmore-next"
            onClick={() => prev()}
          >
            <AiFillRightCircle />
          </div>
        </div>
        <div
          className="vegetable-silder-container"
          id="silder-card-vegetable-container"
        >
          {filterCateList.map((data, i) => (
            <div
              className="vegetable-silder-card"
              id="silder-card-vegetable"
              key={i}
            >
              <img className="vegetable-silder-card-image" src={data.image} />
              <div className="vegetable-silder-card-name">{data.name}</div>
              <div className="vegetable-silder-card-category">
                {data.category}
              </div>
              <div className="vegetable-silder-card-price">
                <BsCurrencyRupee /> {data.price}
              </div>
              <div className="vegetable-slider-card-add-btn">
                <button className="veg-slider-add-to-card-btn">
                  Add Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default VegetableSliderComponent;

import React, { useEffect, useState } from "react";
import { getAllProduct } from "../../Service/api";

function VegetableSliderComponent() {
  const [allHomeProduct, setAllHomeProduct] = useState([]);
  const [filterCateList, setFilterCateList] = useState([]);
  useEffect(() => {
    const vegetableCateFliter = async () => {
      try {
        const getAllHomeProduct = await getAllProduct()
          .then(async (data) => {
            const res = await data.json();
            const resData = await res.data;
            setAllHomeProduct(resData);
            console.log("dataaa111", resData);
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

      const catefilterMethod = async() => {
        try {
          const cateFilter = await allHomeProduct.filter( data => data.category.includes("V"));
          console.log("Category service", cateFilter);
          setFilterCateList(cateFilter)
        } catch (err) {
          console.log("errorsss", err.stack);
        }
      };

      catefilterMethod();
    
    console.log("second valuess", allHomeProduct);
  }, [allHomeProduct]);

  return <div>VegetableSliderComponent</div>;
}

export default VegetableSliderComponent;

import React from "react";
import "./newproductcomponent.css";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useFormik } from "formik";
import * as yup from "yup";
import { ImageToBase } from "../../utility/imageToBase";
import { useState } from "react";
import { addNewProduct } from "../../Service/api";

function NewProductComponent() {
  const formdata = {
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  };

  const newProductSchema = yup.object().shape({
    name: yup.string().required("This field is Required"),
    category: yup.string().required("This field is required"),
    price: yup
      .number("This field requires number")
      .integer("This field will be accept only number")
      .required("This field is required"),
    description: yup.string().required("This field is required"),
  });

  const onSubmit = async () => {
    if (!values.image) {
      values.image = defalutImage;
    }
    const resdata = await addNewProduct(values)
    .then(async(data) => {
      const res = await data.json()
      console.log("res data", res);
    })
    .catch((err) => {
      console.log("errorss", err);
    });
    console.log("errorsss", errors);
    console.log("values", values);
  };
  const [newProductImage, setnewProductImage] = useState("");
  const [defalutImage, setdefalutImage] = useState("149071.png");

  const { values, handleBlur, handleSubmit, handleChange, touched, errors } =
    useFormik({
      initialValues: formdata,
      validationSchema: newProductSchema,
      onSubmit,
    });
  const handlerUploadProfile = async (e) => {
    const data = await ImageToBase(e.target.files[0]);
    console.log("image dataa", data);
    setnewProductImage((prev) => (prev = data));
    values.image = data;
  };
  console.log("all errorss", errors);
  return (
    <div className="new-product-main-container">
      <div className="new-prouct-inner-container">
        <div className="new-product-header">Add New Product</div>
        <form className="new-product-form-container" onSubmit={handleSubmit}>
          <div className="new-product-feature name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              className="new-product-name"
            />
            {errors.name && touched.name && (
              <span className="new-product-error-span">{errors.name}</span>
            )}
          </div>
          <div className="new-product-feature category">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={values.category}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option defaultValue="Select Category" hidden>
                Select Category
              </option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Ice Cream">Ice Cream</option>
              <option value="Dosa">Dosa</option>
              <option value="Pizza">Pizza</option>
            </select>
            {errors.category && touched.category && (
              <span className="new-product-error-span">{errors.category}</span>
            )}
          </div>
          <div className="new-product-feature image">
            <label htmlFor="image">
              Image
              <div className="new-product-image-body">
                {newProductImage ? (
                  <img src={newProductImage} className="new-product-image" />
                ) : (
                  <div
                    className="new-product-image-upload-label"
                    hidden={newProductImage}
                  >
                    <BiSolidCloudUpload />
                  </div>
                )}
                <input
                  type={"file"}
                  id="image"
                  name="image"
                  className="new-product-image"
                  hidden
                  onChange={(e) => handlerUploadProfile(e)}
                />
              </div>
            </label>
          </div>
          <div className="new-product-feature price">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={values.price}
              onBlur={handleBlur}
              onChange={handleChange}
              className="new-product-price"
            />
            {errors.price && touched.price && (
              <span className="new-product-error-span">{errors.price}</span>
            )}
          </div>
          <div className="new-product-feature description">
            <label htmlFor="category">Description</label>
            <textarea
              name="description"
              id="description"
              rows="3"
              className="new-prouct-description"
              value={values.description}
              onBlur={handleBlur}
              onChange={handleChange}
            ></textarea>
            {errors.description && touched.description && (
              <span className="new-product-error-span">
                {errors.description}
              </span>
            )}
          </div>
          <div className="new-product-submit-btn">
            <button type="submit" className="new-product-btn">
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProductComponent;

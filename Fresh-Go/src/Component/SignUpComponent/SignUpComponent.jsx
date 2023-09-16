import React, { useState } from "react";
import "./signupcomponent.css";
import { BiShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../Service/api";
import { ImageToBase } from "../../utility/imageToBase";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function SignUpComponent() {
  const registerSchema = yup.object().shape({
    firstName: yup.string().required("Name is Required"),
    lastName: yup.string().required("Username is Required"),
    email: yup
      .string()
      .email("Enter the proper email")
      .required("This field is required"),
    password: yup
      .string()
      .min(5, "Needs Minimum 5 characters")
      .required("This fleid is required"),
    confirmpassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "password and confirm password are't match"
      )
      .required("This field is required"),
  });

  const onSubmit = async () => {
    const datareg = await signUp(values)
      .then(async (data) => {
        const temp = await data.json();
        if (temp.verify) {
          setIsLoading(true);
          setTimeout(function () {
            navigate("/logIn");
          }, 3000);
        }
        console.log("dataaaa", temp);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const navigate = useNavigate();
  const [showpassword, setShowPassowrd] = useState(false);
  const [showConfirmpassword, setShowConfirmPassowrd] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { values, handleBlur, handleChange, touched, errors, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: "",
        image: "",
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  const handleShowPassword = () => {
    setShowPassowrd((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassowrd((prev) => !prev);
  };

  const handlerUploadProfile = async (e) => {
    const data = await ImageToBase(e.target.files[0]);
    console.log("image dataa", data);
    setProfileImage((prev) => (prev = data));
    values.image = data;
  };

  console.log("errors,", errors);

  return (
    <div className="signUp-main-container">
      <div className="signUp-inner-container">
        <div className="signUp-container">
          <label className="profile-image-label" htmlFor="profileImage">
            <div className="sign-up-image-user-container">
              <img
                src={profileImage === "" ? "149071.png" : profileImage}
                className="sign-up-user-image"
              />
              <input
                type={"file"}
                accept="image/*"
                id="profileImage"
                onChange={(e) => handlerUploadProfile(e)}
              />
            </div>
          </label>
          <form className="sign-up-form-container" onSubmit={handleSubmit}>
            <div className="sign-up-feature-container first-name">
              <label htmlFor="firstName">First Name</label>
              <input
                value={values.firstName}
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                className="sign-up-first-name"
              />
              {errors.firstName && touched.firstName && (
                <span className="error-span">{errors.firstName}</span>
              )}
            </div>

            <div className="sign-up-feature-container Last-name">
              <label htmlFor="lastName">Last Name</label>
              <input
                value={values.lastName}
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                className="sign-up-Last-name"
              />
              {errors.lastName && touched.lastName && (
                <span className="error-span">{errors.lastName}</span>
              )}
            </div>
            <div className="sign-up-feature-container email">
              <label htmlFor="email">Email</label>
              <input
                value={values.email}
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                className="sign-up-email"
              />
              {errors.email && touched.email && (
                <span className="error-span">{errors.email}</span>
              )}
            </div>
            <div className="sign-up-feature-container password">
              <label htmlFor="password">Password</label>
              <input
                value={values.password}
                type={showpassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                className="sign-up-password"
              />

              <span
                className="password-eye-icon-signup"
                onClick={() => handleShowPassword()}
              >
                {showpassword ? <BiShow /> : <BiSolidHide />}
              </span>
            </div>
            {errors.password && touched.password && (
              <span className="error-span">{errors.password}</span>
            )}
            <div className="sign-up-feature-container confirmpassword">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                value={values.confirmpassword}
                type={showConfirmpassword ? "text" : "password"}
                id="confirmpassword"
                name="confirmpassword"
                onChange={handleChange}
                onBlur={handleBlur}
                className="sign-up-confirmpassword"
              />

              <span
                className="password-eye-icon-signup"
                onClick={() => handleShowConfirmPassword()}
              >
                {showConfirmpassword ? <BiShow /> : <BiSolidHide />}
              </span>
            </div>
            {errors.confirmpassword && touched.confirmpassword && (
              <span className="error-span">{errors.confirmpassword}</span>
            )}
            <div className="sign-up-btn-container">
              <button
                type="submit"
                className="sign-up-submit-button"
                disabled={isloading}
              >
                {isloading && (
                  <span className="register-loader">
                    <CircularProgress />{" "}
                  </span>
                )}
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpComponent;

import React, { useEffect, useState } from "react";
import "./logincomponent.css";
import { BiShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ImageToBase } from "../../utility/imageToBase";
import { logIn } from "../../Service/api";
import CircularProgress from "@mui/material/CircularProgress";

function LoginComponent() {
  const registerSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter the proper email")
      .required("This field is required"),
    password: yup
      .string()
      .min(5, "Needs Minimum 5 characters")
      .required("This fleid is required"),
  });

  const onSubmit = async () => {
    const logndata = await logIn(values).then(async (data) => {
      const temp = await data.json();
      if (temp.verify) {
        setIsLoading(true);
        setTimeout(function () {
          navigate("/");
        }, 3000);
      }
      console.log("login dataa", temp);
    });
    console.log("valuess", values);
  };
  const navigate = useNavigate();
  const [showpassword, setShowPassowrd] = useState(false);
  const [showConfirmpassword, setShowConfirmPassowrd] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfileImage("");
  }, []);

  const { values, handleBlur, handleChange, touched, errors, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        image: "",
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  const handleShowPassword = () => {
    setShowPassowrd((prev) => !prev);
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
            <div className="sign-up-btn-container">
              <button type="submit" className="sign-up-submit-button">
                {isloading && (
                  <span className="register-loader">
                    <CircularProgress />{" "}
                  </span>
                )}
                Submit
              </button>
            </div>

            <div className="login-signup-nav">
              <p className="log-sign-nav-content">
                Don't have an account?<Link to={"/signUp"}>Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;

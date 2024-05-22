import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import LaRosaLogo from "../assets/logo.png";
import useEncryption from "../useEncryption/useEncryption";
import axiosInstance from "../apiInstances/axiosInstance";
import { logo } from "../assets";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [passHide, setPassHide] = useState(false);
  const [passHide1, setPassHide1] = useState(false);
  const [passHide2, setPassHide2] = useState(false);

  const { decryptData } = useEncryption();
  let { id } = useParams();
  const [fields, setFields] = useState({
    cpassword: "",
    password: "",
    oldpassword: "",
  });

  const onChangeInput = (e) => {
    const value = e.target.value.replace(/^\s+|\s+$/gm, "");
    const name = e.target.name;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const encryptedData = JSON.stringify({
      id: id,
      password: fields?.password,
      cpassword: fields?.cpassword,
      role: "admin",
      oldpass: fields?.oldpassword,
    });
    await axiosInstance
      .post("admin/reset-password", encryptedData)
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          navigate("/log-in");
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const InputBox =
    "w-full md:w-[445px] text-xs md:text-sm rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] my-3 md:my-5 py-5 px-8 outline-none";

  const OuterBox =
    "min-w-[40%] rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.25)] bg-white p-5";

  return (
    <>
      <section className="mx-auto px-5 h-screen">
        <div className="h-full grid place-items-center">
          <div
            className={`flex flex-col justify-center items-center text-gray-800 ${OuterBox}`}
          >
            <div className="max-w-xs">
              <img
                src={logo}
                alt="logo"
                className="rounded-md cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              />
              {/* <h1
                className="bg-[#FFCCD3] rounded-lg text-[#FF444D] font-extrabold text-2xl md:text-3xl px-5 py-2 my-5 cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                La Rosa
              </h1> */}
            </div>
            <div className="max-w-md">
              {/* ---- Old Password input ---- */}
              <div className="flex relative ">
                <input
                  type={!passHide ? "password" : "text"}
                  className={`${InputBox}`}
                  placeholder="old Password"
                  name="oldpassword"
                  value={fields?.oldpassword}
                  onChange={onChangeInput}
                />
                {passHide ? (
                  <IoEyeOutline
                    onClick={() => setPassHide(false)}
                    className="text-[22px] text-[#6c6b71] absolute top-[40px] right-[15px] cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setPassHide(true)}
                    className="text-[22px] text-[#6c6b71] absolute top-[40px] right-[15px] cursor-pointer"
                  />
                )}
              </div>
              <div className="flex relative">

             
              <input
                  type={!passHide1 ? "password" : "text"}
                className={`${InputBox}`}
                placeholder="New Password"
                name="password"
                value={fields?.password}
                onChange={onChangeInput}
              />
{passHide1 ? (
                  <IoEyeOutline
                    onClick={() => setPassHide1(false)}
                    className="text-[22px] text-[#6c6b71] absolute top-[40px] right-[15px] cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setPassHide1(true)}
                    className="text-[22px] text-[#6c6b71] absolute top-[40px] right-[15px] cursor-pointer"
                  />
                )}
                </div>
              {/* ---- New Password input ---- */}
<div className="flex relative">

              <input
                  type={!passHide2 ? "password" : "text"}
                className={`${InputBox}`}
                placeholder="Confirm Password"
                name="cpassword"
                value={fields?.cpassword}
                onChange={onChangeInput}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     handleSubmit();
                //   }
                // }}
              />
              {passHide2 ? (
                  <IoEyeOutline
                    onClick={() => setPassHide2(false)}
                    className="text-[22px] text-[#6c6b71] absolute top-[40px] right-[15px] cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setPassHide2(true)}
                    className="text-[22px] text-[#6c6b71] absolute top-[40px] right-[15px] cursor-pointer"
                  />
                )}
              </div>

              {/* ---- Forgot Password ---- */}

              <div className="flex justify-end items-center">
                <button
                  className="text-xs md:text-sm text-gray-500 hover:text-gray-900 mx-3"
                  onClick={(e) => navigate("/")}
                >
                  Back
                </button>
              </div>

              {/* ---- Submit button ---- */}

              <div className="flex justify-center items-center">
                <button
                  className="my-5 py-3 px-8 rounded-lg bg-[#E5002A] hover:bg-[#E5002A] text-white text-sm md:text-base font-medium"
                  onClick={(e) => handleSubmit()}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPasswordForm;

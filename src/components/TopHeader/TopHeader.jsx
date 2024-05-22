import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../Hooks/useOnClickOutside/useOnClickOutside";
import { settings, downArrow } from "../../assets";

const TopHeader = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [OpenSetting, setOpenSetting] = useState(false);

  useOnClickOutside(ref, () => setOpenSetting(false));

  return (
    <>
      <nav className="h-16 bg-[#E5002A] text-white font-medium text-sm lg:text-base">
        <div className="h-full flex justify-between items-center gap-2 mx-5 md:mx-12 lg:mx-24">
          <h1 className="p-2 cursor-pointer" onClick={() => navigate(`/`)}>
            Admin
          </h1>

          <div className="flex justify-end items-center gap-1 text-xs md:text-sm">
            <img
              id="setting"
              src={settings}
              alt="icon"
              className="relative py-2 px-5 cursor-pointer"
              onClick={() => setOpenSetting(true)}
            />
            {OpenSetting && (
              <div
                ref={ref}
                className="absolute top-[75px] right-[40px] md:right-[100px] text-black bg-white rounded-lg shadow-lg z-50"
              >
                <div
                  className="py-3 px-6 hover:bg-[#FFEAEF] cursor-pointer"
                  onClick={() => {
                    navigate(`/auth/reset-password/${userId}`);
                    localStorage.clear();
                  }}
                >
                  Change password
                </div>
                <div
                  className="py-3 px-6 hover:bg-[#FFEAEF] cursor-pointer"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Sign out
                </div>
                {/* <div className="py-3 px-6 hover:bg-[#FFEAEF] cursor-pointer">
                  Help
                </div> */}
                <div
                  className="py-3 px-6 hover:bg-[#FFEAEF] cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://mail.google.com/mail/u/0/#inbox?compose=new",
                      "_blank"
                    )
                  }
                >
                  Contact
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopHeader;

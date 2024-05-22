import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { AgencyLogo, logo, logoSmall } from "../../assets";
import { HeaderData } from "../../Constants";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";

const NavBar = () => {
  const getPath = useLocation().pathname.split("/")?.[1];
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">
            {HeaderData?.length > 0 &&
              HeaderData?.map((data, index) => (
                <div key={index}>
                  {`/${getPath}` === data?.pathname ? (
                    <li className="min-w-max effect-h mx-6 my-1">
                      <Link to={data.pathname}>
                        <div className="flex justify-start items-center gap-3 p-3 font-medium rounded-lg bg-[#E5002A] text-[#FFFFFF]">
                          <img src={data?.activeIcon} alt="icon" />
                          {data.pagename}
                        </div>
                      </Link>
                    </li>
                  ) : (
                    <li className="mx-6 my-1">
                      <Link to={data?.pathname}>
                        <div className="flex justify-start items-center gap-3 p-3 font-medium rounded-lg  bg-[#FFFFFF] text-[#525252] hover:bg-[#E5002A] hover:text-[#FFFFFF]">
                          <img src={data?.icon} alt="icon" />
                          {data.pagename}
                        </div>
                      </Link>
                    </li>
                  )}
                </div>
              ))}
          </ul>
          <div
            className="logo flex justify-start items-center gap-4 cursor-pointer px-2 xl:px-20"
            onClick={() => navigate("/")}
          >
            <img
              src={logoSmall}
              alt="logo"
              className="w-36 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

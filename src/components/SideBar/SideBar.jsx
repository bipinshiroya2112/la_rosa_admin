import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HeaderData } from "../../Constants";

const SideBar = () => {
  const getPath = useLocation().pathname.split("/")?.[1];

  return (
    <ul className="h-full bg-white rounded-lg shadow-md hover:shadow-lg p-6">
      {HeaderData?.length > 0 &&
        HeaderData?.map((data, index) => (
          <div key={index}>
            {`/${getPath}` === data?.pathname ? (
              <li className="min-w-max effect-h my-1">
                <Link to={data?.pathname}>
                  <div className="flex justify-start items-center gap-3 p-3 font-medium rounded-lg bg-[#E5002A] text-[#FFFFFF]">
                    <img src={data?.activeIcon} alt="" />
                    {data?.pagename}
                  </div>
                </Link>
              </li>
            ) : (
              <li className="min-w-max my-1">
                <Link to={data?.pathname}>
                  <div className="flex justify-start items-center gap-3 p-3 font-medium rounded-lg  bg-[#FFFFFF] text-[#525252] hover:bg-[#E5002A] hover:text-[#FFFFFF]">
                    <img src={data?.icon} alt="icon" />
                    {data?.pagename}
                  </div>
                </Link>
              </li>
            )}
          </div>
        ))}
    </ul>
  );
};

export default SideBar;

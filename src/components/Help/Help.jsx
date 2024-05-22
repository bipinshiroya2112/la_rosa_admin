import React from "react";
import { help } from "../../assets";

const Help = () => {
  return (
    <div className="flex justify-end items-center">
      <div className="flex justify-center items-center gap-2 bg-[#E5002A] text-white font-medium text-xs md:text-sm rounded-3xl shadow-md hover:shadow-lg py-3 px-5 cursor-pointer">
        <img src={help} alt="icon" className="cursor-pointer" />
        <p className="">Help</p>
      </div>
    </div>
  );
};

export default Help;

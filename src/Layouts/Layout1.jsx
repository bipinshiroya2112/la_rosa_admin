import React, { useEffect, useState } from "react";
import { TopHeader, NavBar, SideBar, Footer, Help } from "../components";

const Layout1 = ({ children }) => {
  return (
    <>
      <TopHeader />
      <NavBar />
      <div className="grid grid-cols-10 px-0 lg:px-20 mt-20">
        <div className="hidden xl:block col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10 xl:col-span-8 mx-0 lg:mx-10">
          <div className="min-h-[640px]">{children}</div>
          <div className="block md:hidden px-5">
            <Help />
          </div>
          <div className="">
            <Footer />
          </div>
        </div>
      </div>
      <div className="hidden md:block m-5">
        <Help />
      </div>
    </>
  );
};

export default Layout1;

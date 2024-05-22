import React from "react";
import TopHeader from "../TopHeader/TopHeader";

const Erro404 = () => {
  return (
    <>
      <TopHeader />
      <main className="h-screen w-full flex flex-col justify-center items-center">
        <h1 className="text-9xl font-extrabold text-[#E5002A] tracking-widest">
          404
        </h1>
        <div className="bg-[#FFFFFF] shadow-2xl px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
      </main>
    </>
  );
};

export default Erro404;

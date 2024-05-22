import React, { useEffect, useState } from "react";
import Layout1 from "../../Layouts/Layout1";
import { useNavigate } from "react-router-dom";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { toast } from "react-toastify";

const UserDashBoard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    GetTotalCount();
  }, []);

  const GetTotalCount = async () => {
    await axiosInstanceAuth
      .get(`admin/TotalCount`)
      .then((res) => {
        const mydata = res?.data;
        if (res?.data?.status) {
          setTotal(mydata);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const [Total, setTotal] = useState({});
  const DashboardCard = [
    {
      title: "Total Agencies",
      count: Total?.agency,
      link: "/agency",
    },
    {
      title: "Total Agents",
      count: Total?.agent,
      link: "/agents",
    },
    {
      title: "Total Listings",
      count: Total?.property,
      link: "/listings",
    },
    {
      title: "Total Users",
      count: Total?.user,
      link: "/user",
    },
  ];

  return (
    <Layout1>
      <div className="p-5 xl:px-16">
        <div className="container mx-auto">
          <div className="flex flex-col justify-start items-start gap-1">
            <div className="text-black font-bold text-xl md:text-2xl lg:text-3xl">
              Welcome back,
            </div>
            {/* <div className="text-black font-extrabold text-2xl md:text-3xl lg:text-5xl">
              how can we help you today?
            </div> */}
          </div>

          {/* <<----- Dashboard Cards ----->> */}
          <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-5 md:gap-8 my-6 md:my-16">
            {DashboardCard?.length > 0 &&
              DashboardCard?.map((i, index) => (
                <div
                  key={index}
                  className="h-full w-full flex flex-col justify-center items-center gap-5 bg-white rounded-2xl py-7 md:py-10 shadow-md hover:shadow-lg cursor-pointer"
                  onClick={() => navigate(`${i?.link}`)}
                >
                  <p className="font-bold text-[#262626] text-center text-sm md:text-base lg:text-lg mx-5">
                    {i?.title}
                  </p>
                  <p className="font-bold text-[#262626] text-center text-sm md:text-base lg:text-lg mx-5">
                    {i?.count}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout1>
  );
};

export default UserDashBoard;

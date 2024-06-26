import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout1 from "../../Layouts/Layout1";
import { deleteRed, searchGray } from "../../assets";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
import { toast } from "react-toastify";
import { usePagination } from "../../Hooks/paginate/usePagination";

const UserList = () => {
  const [UsersInfo, setUsersInfo] = useState([]);
  const [userFilter, setUserFilter] = useState([]);

  useEffect(() => {
    GetAllUserData();
  }, []);

  const GetAllUserData = async () => {
    await axiosInstanceAuth
      .get("admin/ViewAllUser")
      .then((res) => {
        const mydata = res?.data?.data;
        // console.log("--------->>ViewAllUser", mydata);

        if (res?.data?.status) {
          setUsersInfo(mydata);
          setUserFilter(mydata);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const SearchAgent = async (search) => {
    if (search) {
      setUsersInfo(
        userFilter?.filter((item) => {
          const searchWords = search.toLowerCase().trim(" ").split(" ");
          const agentNameameWords = item?.email
            ?.toLowerCase()
            ?.trim(" ")
            .split(" ");
          return searchWords.some((word) =>
            agentNameameWords.some((principalWord) =>
              principalWord.includes(word)
            )
          );
        })
      );
    } else {
      setUsersInfo(userFilter);
    }
  };
  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [SelectedUser, setSelectedUser] = useState({});

  const ConfirmUserDelete = async (SelectedUser) => {
    console.log("Selecteuser", SelectedUser);
    await axiosInstanceAuth
      .post(`admin/User/delete/${SelectedUser?.id}`)
      .then((res) => {
        if (res?.data?.status) {
          GetAllUserData();
          toast.success(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
        setIsDeleteUser(false);
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  }

  const ConfirmDelete = async (SelectedUser) => {

    await axiosInstanceAuth
      .post(`userBlock/${SelectedUser?.id}`)
      .then((res) => {
        if (res?.data?.status) {
          GetAllUserData();
          toast.success(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
        setDeleteConfirmation(false);
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const { sliceData, currentPage, numbers, totalPages, goToPage } =
    usePagination(UsersInfo, 10);

  return (
    <>
      <Layout1>
        <div className="container mx-auto px-5 xl:px-0">
          {/* ---------- section 1  ---------- */}
          <div className="flex flex-col justify-start gap-5 bg-white rounded-2xl shadow-md p-4 md:p-6">
            <h1 className="text-[#404040] font-extrabold text-lg md:text-xl lg:text-2xl">
              All Users
            </h1>
            <div className="col-span-1 2xl:col-span-2 flex flex-row justify-start items-center gap-3">
              <div className="w-full md:h-12 flex justify-start items-center gap-2 border border-[#E5E5E5] rounded-3xl py-3 px-5 cursor-pointer">
                <img src={searchGray} alt="icon" className="w-3 lg:w-4" />
                <input
                  type="text"
                  onChange={(e) => {
                    SearchAgent(e.target.value);
                  }}
                  placeholder="Enter email"
                  className="w-full text-[#A3A3A3]  text-xs md:text-sm outline-none"
                />
              </div>
            </div>
          </div>
          {/* ---------- section 2  ---------- */}
          <div className="w-full flex flex-col justify-start bg-white rounded-2xl shadow-md  my-10">
            <div className="w-full flex justify-start gap-5 p-4">
              <div className="w-full text-[#262626] font-bold text-sm lg:text-base">
                Email
              </div>
              <div className="w-[20%] text-[#262626] font-bold text-sm lg:text-base">
                Action
              </div>
            </div>

            {sliceData?.length > 0 &&
              sliceData?.map((d, index) => (
                <div
                  key={index}
                  className="w-full flex justify-start items-center gap-5 p-4 border-t border-t-[#D4D4D4]"
                >
                  <div className="w-full text-[#262626] font-semibold text-sm lg:text-base">
                    {d?.email}
                  </div>

                  <div className="w-[20%] flex flex-row justify-center md:justify-start items-center gap-2">
                    <button
                      className={`flex justify-center items-center gap-2 text-white font-medium text-xs md:text-sm rounded-3xl shadow-md hover:shadow-lg py-3 px-5 cursor-pointer ${d.isActive ? "bg-green-500" : "bg-[#E5002A]"
                        }`}
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setSelectedUser(d);
                      }}
                    >
                      {d.isActive ? "Unblock" : "Block"}
                    </button>
                    <img
                      src={deleteRed}
                      alt="icon"
                      className="hidden md:block border border-[#FA979A] bg-[#FFEAEF] rounded-full p-2 cursor-pointer"
                      onClick={() => {
                        setIsDeleteUser(true);
                        setSelectedUser(d);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>

          {UsersInfo.length > 10 ? (
            <div className="flex gap-2 pb-5 bottom-0">
              <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                {"<"}
              </button>

              {numbers.map((item, index) => (
                <button
                  disabled={item === "..."}
                  className={`py-[3px] px-3 bg-red-200 rounded-full ${currentPage === item &&
                    "bg-red-600 text-white font-bold font-mono"
                    }`}
                  onClick={() => goToPage(item)}
                  key={index}
                >
                  {item}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                {">"}
              </button>
            </div>
          ) : null}

          {/* <<----- Paginationp ----->> */}

          {/* <Pagination
            className="pagination-bar mb-10"
            currentPage={currentPage}
            totalCount={UsersInfo?.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          /> */}
        </div>
      </Layout1>

      {/* -----------Delete Confirmation Pop Up ----------- */}
      {DeleteConfirmation === true && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
            <div className="relative min-w-[285px] md:min-w-[350px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl">
              {/* ------ Content ------ */}
              <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* ------ Header ------ */}
                <div className="grid place-items-center place-content-end">
                  <button
                    className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                    onClick={(e) => setDeleteConfirmation(false)}
                  >
                    ×
                  </button>
                </div>
                {/* ------ Body ------ */}
                <div className="relative grid place-items-center px-6 md:px-10 py-4 flex-auto">
                  <h3 className="text-black font-semibold text-lg md:text-xl  leading-relaxed text-center mt-2">
                    Are You Sure ?
                  </h3>
                  <p className="text-black font-medium text-sm md:text-base leading-normal text-center mt-3">
                    You want to Block/Unblock this user
                  </p>
                </div>

                {/* ------ Fotter ------ */}
                <div className="flex justify-center items-center m-5">
                  <button
                    className="bg-[#009600] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#008500] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => ConfirmDelete(SelectedUser)}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-[#E5002A] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#D80022] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => setDeleteConfirmation(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      {/* {-------- Delete conformation Pop up ------------} */}
      {isDeleteUser === true && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
            <div className="relative min-w-[285px] md:min-w-[350px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl">
              {/* ------ Content ------ */}
              <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* ------ Header ------ */}
                <div className="grid place-items-center place-content-end">
                  <button
                    className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                    onClick={(e) => setIsDeleteUser(false)}
                  >
                    ×
                  </button>
                </div>
                {/* ------ Body ------ */}
                <div className="relative grid place-items-center px-6 md:px-10 py-4 flex-auto">
                  <h3 className="text-black font-semibold text-lg md:text-xl  leading-relaxed text-center mt-2">
                    Are You Sure ?
                  </h3>
                  <p className="text-black font-medium text-sm md:text-base leading-normal text-center mt-3">
                    You want to delete this user
                  </p>
                </div>

                {/* ------ Fotter ------ */}
                <div className="flex justify-center items-center m-5">
                  <button
                    className="bg-[#009600] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#008500] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => ConfirmUserDelete(SelectedUser)}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-[#E5002A] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#D80022] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => setIsDeleteUser(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default UserList;

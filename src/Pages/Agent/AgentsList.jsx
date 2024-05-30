import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout1 from "../../Layouts/Layout1";
import { Pagination } from "../../components";
import {
  add,
  agent1,
  agent2,
  agent3,
  agent4,
  agent5,
  deleteRed,
  editRed,
  searchGray,
  threeDot,
} from "../../assets";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

const AgentsList = () => {
  const navigate = useNavigate();
  const [AgentsInfo, setAgentsInfo] = useState([]);
  const [AgenciesFilter, setAgenciesFilter] = useState([]);

  let PageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    GetAllAgentData();
  }, []);

  const GetAllAgentData = async () => {
    await axiosInstanceAuth
      .get("admin/ViewAllAgent")
      .then((res) => {
        const mydata = res?.data?.lead_agent;
        // console.log("--------->>ViewAllAgents", mydata);

        if (res?.data?.status) {
          setAgentsInfo(mydata);
          setAgenciesFilter(mydata);
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
      setAgentsInfo(
        AgenciesFilter?.filter((item) => {
          const searchWords = search.toLowerCase().trim(" ").split(" ");
          const agentNameameWords = item?.name
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
      setAgentsInfo(AgenciesFilter);
    }
  };

  const [IsOpenModel, setIsOpenModel] = useState(false);
  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
  const [SelectedAgent, setSelectedAgent] = useState({});

  const handelDelete = () => {
    setIsOpenModel(false);
    setDeleteConfirmation(true);
  };

  const handelEdit = (SelectedAgent) => {
    setIsOpenModel(false);
    navigate(`/agents/edit/${SelectedAgent?._id}`);
  };

  const ConfirmDelete = async (SelectedAgent) => {
    await axiosInstanceAuth
      .post(`admin/Agent/delete/${SelectedAgent?._id}`)
      .then((res) => {
        if (res?.data?.status) {
          GetAllAgentData();
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

  return (
    <>
      <Layout1>
        <div className="container mx-auto px-5 xl:px-0">
          {/* ---------- section 1  ---------- */}
          <div className="flex flex-col justify-start gap-5 bg-white rounded-2xl shadow-md p-4 md:p-6">
            <h1 className="text-[#404040] font-extrabold text-lg md:text-xl lg:text-2xl">
              Your Agents
            </h1>

            <div className="col-span-1 2xl:col-span-2 flex flex-row justify-start items-center gap-3">
              <div className="w-full md:h-12 flex justify-start items-center gap-2 border border-[#E5E5E5] rounded-3xl py-3 px-5 cursor-pointer">
                <img src={searchGray} alt="icon" className="w-3 lg:w-4" />
                <input
                  type="text"
                  onChange={(e) => {
                    SearchAgent(e.target.value);
                  }}
                  placeholder="Enter Property ID, Addres or Superb..."
                  className="w-full text-[#A3A3A3]  text-xs md:text-sm outline-none"
                />
              </div>
            </div>

            <div className="col-span-1 grid place-content-end">
              <div
                className="flex justify-center items-center gap-2 border border-[#E5002A] bg-[#E5002A] rounded-3xl py-2 px-4 cursor-pointer"
                onClick={() => navigate(`/agents/add`)}
              >
                <img src={add} alt="icon" className="w-3 lg:w-4" />
                <div className="text-white font-medium text-xs md:text-sm lg:text-base">
                  Add Agent
                </div>
              </div>
            </div>
          </div>

          {/* ---------- section 2  ---------- */}
          <div className="w-full flex flex-col justify-start bg-white rounded-2xl shadow-md  my-10">
            <div className="w-full flex justify-start gap-5 p-4">
              <div className="w-[40%] md:w-[15%] text-[#262626] font-bold text-sm lg:text-base">
                Photo
              </div>
              <div className="w-full md:w-[20%] text-[#262626] font-bold text-sm lg:text-base">
                Name
              </div>
              <div className="hidden md:block w-full text-[#262626] font-bold text-sm lg:text-base">
                Email
              </div>
              <div className="w-[20%] text-[#262626] font-bold text-sm lg:text-base">
                Action
              </div>
            </div>

            {AgentsInfo?.length > 0 &&
              AgentsInfo?.map((d, index) => (
                <div
                  key={index}
                  className="w-full flex justify-start items-center gap-5 p-4 border-t border-t-[#D4D4D4]"
                >
                  <div className="w-[40%] md:w-[15%]">
                    <img
                      src={d?.profileImg}
                      alt="icon"
                      className="rounded-lg h-20 w-full object-fill"
                    />
                  </div>
                  <div className="w-full md:w-[20%] text-[#262626] font-semibold text-sm lg:text-base">
                    {d?.name}
                  </div>
                  <div className="hidden md:block w-full text-[#262626] font-medium text-xs md:text-sm lg:text-base">
                    {d?.email}
                  </div>
                  <div className="w-[20%] flex flex-row justify-center md:justify-start items-center gap-2">
                    <img
                      src={editRed}
                      alt="icon"
                      className="hidden md:block border border-[#FA979A] bg-[#FFEAEF] rounded-full p-2 cursor-pointer"
                      onClick={() => navigate(`/agents/edit/${d?._id}`)}
                      data-tooltip-id="edit"
                      data-tooltip-content="Edit"
                    />
                    <Tooltip id="edit" />
                    <img
                      src={deleteRed}
                      alt="icon"
                      className="hidden md:block border border-[#FA979A] bg-[#FFEAEF] rounded-full p-2 cursor-pointer"
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setSelectedAgent(d);
                      }}
                      data-tooltip-id="delete"
                      data-tooltip-content="Delete"
                    />
                    <Tooltip id="delete" />
                    <img
                      src={threeDot}
                      alt="icon"
                      className="block md:hidden border border-[#FA979A] bg-[#FFEAEF] rounded-full p-[5px] sm:p-2 cursor-pointer"
                      onClick={(e) => {
                        setIsOpenModel(true);
                        setSelectedAgent(d);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* <<----- Paginationp ----->> */}

          {/* <Pagination
            className="pagination-bar mb-10"
            currentPage={currentPage}
            totalCount={AgentsInfo?.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          /> */}
        </div>
      </Layout1>
      {/* ----------- Agent Action Model ----------- */}

      {IsOpenModel === true && (
        <div className="block md:hidden fixed top-0 bottom-0 z-[9999999999999] backdrop-brightness-50 w-full h-full">
          <div className="fixed bottom-0 left-0 right-0 outline-none bg-white rounded-t-3xl shadow-2xl">
            {/* ------ Header ------ */}
            <div className="flex flex-col justify-center items-center mx-5">
              <div
                className="w-[15%] border-4 border-[#737373] rounded-full my-5 cursor-pointer"
                onClick={() => setIsOpenModel(false)}
              />
              <div className="w-full flex justify-start items-start gap-2 my-4">
                <div className="w-16 text-[#262626] font-bold text-xs sm:text-sm lg:text-base">
                  Email :-
                </div>
                <div className="w-full text-[#262626] font-medium text-xs sm:text-sm lg:text-base">
                  {SelectedAgent?.email}
                </div>
              </div>

              <div className="w-full border border-[#D4D4D4]" />

              <div className="w-full flex justify-center items-center gap-2 my-5">
                <div
                  className="w-full text-center text-white font-medium text-sm border border-[#E5002A] bg-[#E5002A] rounded-3xl py-3 px-5 cursor-pointer"
                  onClick={(e) => handelDelete(SelectedAgent)}
                >
                  Delete
                </div>
                <div
                  className="w-full text-center font-medium text-sm border border-[#E5002A] bg-[#FFEAEF] text-[#E5002A] rounded-3xl py-3 px-5 cursor-pointer"
                  onClick={(e) => handelEdit(SelectedAgent)}
                >
                  Edit
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    You want to Delete this Agent
                  </p>
                </div>

                {/* ------ Fotter ------ */}
                <div className="flex justify-center items-center m-5">
                  <button
                    className="bg-[#009600] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#008500] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => ConfirmDelete(SelectedAgent)}
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
    </>
  );
};

export default AgentsList;

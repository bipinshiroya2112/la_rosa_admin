import React, { useEffect, useState } from 'react'
import Layout1 from '../../Layouts/Layout1'
import { toast } from 'react-toastify'
import axiosInstanceAuth from '../../apiInstances/axiosInstanceAuth';
import { searchGray, editRed, deleteRed, threeDot } from '../../assets';
import { Tooltip } from 'react-tooltip';
import AdSkeletons from './AdSkeletons';

const AdvertiseAdsList = () => {
  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
  const [ShowConfirmation, setShowConfirmation] = useState(false);
  const [selectAdvertise, setSelectAdvertise] = useState([]);
  const [IsOpenModel, setIsOpenModel] = useState(false);
  const [advertiseList, setAdvertiseList] = useState();
  const [searchAdvertiseList, setSearchAdvertiseList] = useState([]);

  useEffect(() => {
    getAdvertiseAdsList()
  }, [])
  const getAdvertiseAdsList = async () => {
    await axiosInstanceAuth
      .get('/advertise/all/list')
      .then((res) => {
        if (res.data.status) {
          setAdvertiseList(res.data.data)
          setSearchAdvertiseList(res.data.data)
        } else {
          toast.error(res.data.message)
        }
      })
      .catch((error) => {
        console.log("error", error)
        toast.error(error.message)
      })
  }

  const ConfirmDelete = async (detail) => {
    await axiosInstanceAuth
      .get(`advertise/delete/${detail._id}`)
      .then((res) => {
        if (res?.data?.status) {
          getAdvertiseAdsList();
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

  const changeStatus = async (status) => {
    await axiosInstanceAuth
      .post(`/advertise/ads/status/${selectAdvertise._id}`, { status })
      .then((res) => {
        if (res?.data?.status) {
          getAdvertiseAdsList();
          toast.success(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
        setDeleteConfirmation(false);
        setShowConfirmation(false);
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  }

  const searchAdvertise = async (search) => {
    if (search) {
      const searchWords = search.toLowerCase().trim().split(" ");
      setAdvertiseList(
        searchAdvertiseList?.filter((item) => {
          const principalNameWords = (
            (item?.title || "") + " " +
            (item?.city || "") + " " +
            (item?.advertiseType || "")
          )
            .toLowerCase()
            .trim()
            .split(" ");
          return searchWords.every((word) =>
            principalNameWords.some((principalWord) =>
              principalWord.includes(word)
            )
          );
        })
      );
    } else {
      setAdvertiseList(searchAdvertiseList);
    }
  };

  return (
    <Layout1>
      <div className="container mx-auto px-5 xl:px-0">
        {/* ---------- section 1  ---------- */}
        <div className="flex flex-col justify-start gap-5 bg-white rounded-2xl shadow-md p-4 md:p-6">
          <h1 className="text-[#404040] font-extrabold text-lg md:text-xl lg:text-2xl">
            Your Advertise List
          </h1>
          <div className="col-span-1 2xl:col-span-2 flex flex-row justify-start items-center gap-3">
            <div className="w-full md:h-12 flex justify-start items-center gap-2 border border-[#E5E5E5] rounded-3xl py-3 px-5 cursor-pointer">
              <img src={searchGray} alt="icon" className="w-3 lg:w-4" />
              <input
                type="text"
                onChange={(e) => {
                  searchAdvertise(e.target.value);
                }}
                placeholder="Enter Property ID, Addres or Superb..."
                className="w-full text-[#A3A3A3]  text-xs md:text-sm outline-none"
              />
            </div>
          </div>
          {/* <div className="col-span-1 grid place-content-end">
            <div
              className="flex justify-center items-center gap-2 border border-[#E5002A] bg-[#E5002A] rounded-3xl py-2 px-4 cursor-pointer"
              onClick={() => navigate(`/campaign/add`)}
            >
              <img src={add} alt="icon" className="w-3 lg:w-4" />
              <div className="text-white font-medium text-xs md:text-sm lg:text-base">
                Add Advertisement
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* ----------- List section ----------- */}
      {advertiseList && advertiseList.length > 0 ?
        <div className="w-full flex flex-col justify-start bg-white rounded-2xl shadow-md  my-10">
          <div className="w-full flex justify-start gap-5 p-4">
            <div className="w-[20%] text-[#262626] font-bold text-sm lg:text-base">
              Property image
            </div>
            <div className="w-[20%] text-[#262626] font-bold text-sm lg:text-base">
              Title
            </div>
            <div className="w-[20%] text-[#262626] font-bold text-sm lg:text-base">
              Advertise Type
            </div>
            <div className="w-[20%] text-[#262626] font-bold text-sm lg:text-base">
              City
            </div>
            <div className="w-[20%] text-[#262626] font-bold text-sm lg:text-base">
              Status
            </div>
            <div className="w-[10%] text-[#262626] font-bold text-sm lg:text-base">
              Action
            </div>
          </div>

          {advertiseList?.length > 0 &&
            advertiseList?.map((d, index) => (
              <div
                key={index}
                className="w-full flex justify-start items-center gap-5 p-4 border-t border-t-[#D4D4D4]"
              >
                <div className="w-[20%]">
                  <img
                    src={d.advertiseImage}
                    alt="icon"
                    className="rounded-lg h-20 object-fill w-[60%]"
                  />
                </div>
                <div className="w-[20%] text-[#262626]  font-semibold text-sm lg:text-base">
                  {d?.title}
                </div>
                <div className="w-[20%] text-[#262626]  font-medium text-xs md:text-sm lg:text-base">
                  {d?.advertiseType}
                </div>
                <div className="w-[20%] text-[#262626] capitalize font-medium text-xs md:text-sm lg:text-base">
                  {d?.city.length > 1 ? d.city.join(", ") : d.city.join(", ")}
                </div>
                <div className="w-[20%]  capitalize font-medium text-xs md:text-sm lg:text-base">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm md:text-sm lg:text-base ${d.approved_status === 'approved'
                    ? 'bg-green-100 text-green-600'
                    : d.approved_status === 'rejected'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-orange-100 text-orange-600'
                    }`}>
                    {d?.approved_status}
                  </span>
                </div>
                <div className="w-[10%]  flex flex-row justify-center md:justify-start items-center gap-2">
                  <img
                    src={editRed}
                    alt="icon"
                    className="hidden md:block border border-[#FA979A] bg-[#FFEAEF] rounded-full p-2 cursor-pointer"
                    onClick={() => { setShowConfirmation(true); setDeleteConfirmation(false); setSelectAdvertise(d); }}
                    data-tooltip-id="show"
                    data-tooltip-content="Show"
                  />
                  <Tooltip id="show" />
                  <img
                    src={deleteRed}
                    alt="icon"
                    className="hidden md:block border border-[#FA979A] bg-[#FFEAEF] rounded-full p-2 cursor-pointer"
                    onClick={() => {
                      setDeleteConfirmation(true);
                      setSelectAdvertise(d);
                      setShowConfirmation(false);
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
                      setSelectAdvertise(d);
                    }}
                  />
                </div>
              </div>
            ))}
        </div> :
        <div className='mt-4 mx-2 text-balance'>
          No data found
        </div>
      }
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
                    You want to Delete this Agency
                  </p>
                </div>

                {/* ------ Fotter ------ */}
                <div className="flex justify-center items-center m-5">
                  <button
                    className="bg-[#009600] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#008500] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => ConfirmDelete(selectAdvertise)}
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
      {/* ----------- Show ads Pop Up ----------- */}
      {ShowConfirmation === true && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
            <div className="relative min-w-[285px] md:min-w-[350px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl">
              {/* ------ Content ------ */}
              <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* ------ Header ------ */}
                <div className="grid place-items-center place-content-end">
                  <button
                    className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                    onClick={(e) => setShowConfirmation(false)}
                  >
                    ×
                  </button>
                </div>
                {/* ------ Body ------ */}
                <AdSkeletons item={selectAdvertise} />
                {/* ------ Fotter ------ */}
                <div className='flex items-center justify-center gap-3 my-3'>
                  <button className={`px-3 py-1 rounded font-medium text-sm md:text-sm lg:text-base ${selectAdvertise.approved_status === 'approved' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-600'}`} disabled={selectAdvertise.approved_status === 'approved'} onClick={(e) => changeStatus('approved')}>APPROVE</button>
                  <button className={`px-3 py-1 rounded font-medium text-sm md:text-sm lg:text-base ${selectAdvertise.approved_status === 'rejected' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-red-100 text-red-600'}`} onClick={(e) => changeStatus('rejected')} disabled={selectAdvertise.approved_status === 'rejected'}>REJECT</button>
                  <button className='z-auto px-3 py-1 rounded font-medium text-sm md:text-sm lg:text-base bg-orange-100 text-orange-600' onClick={(e) => setShowConfirmation(false)}>CANCEL</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </Layout1>
  )
}

export default AdvertiseAdsList
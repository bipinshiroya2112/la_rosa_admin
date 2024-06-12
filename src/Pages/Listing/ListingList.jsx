import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import {
  deleteRed,
  downArrow,
  emailRed,
  listing01,
  listing02,
  listing03,
  listing1,
  listing2,
  listing3,
  searchGray,
  shareRed,
  urlRed,
} from "../../assets";
import Layout1 from "../../Layouts/Layout1";
import moment from "moment";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { usePagination } from "../../Hooks/paginate/usePagination";
import { IoIosLink } from "react-icons/io";

const ListingList = () => {
  const [ListingDetails, setListingDetails] = useState([]);
  const [listingLength, setListingLength] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [shares, setshare] = useState(false);
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [AgentData, setAgentData] = useState();
  const [profileid, setprofileid] = useState();

  const [AgentsInfo, setAgentsInfo] = useState([]);

  const [Filter, setFilter] = useState({
    search: "",
    category: "",
    status: "",
    agent: "",
    sort_by: "",
  });
  useEffect(() => {
    GetAllListingData();
    GetAllAgentData();
  }, []);

  useEffect(() => {
    setListingLength(filterData.length)
  }, [filterData])

  const GetAllListingData = async () => {
    await axiosInstanceAuth
      .get("admin/ViewAllproperty")
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          setListingDetails(mydata);
          setListingLength(mydata.length)
          setFilterData(mydata);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const onChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...Filter,
      [name]: value,
    });
    if (value.length == 0) {
      setFilterData(ListingDetails);
    }
    if (value == 'Listed (Newest - Oldest)') {
      const filterAscending = ListingDetails.sort((a, b) => { return new Date(b.updatedAt) - new Date(a.updatedAt) })
      setFilterData(filterAscending)
    }
    if (value == 'Listed (Oldest - Newest)') {
      const filterDescending = ListingDetails.sort((a, b) => { return new Date(a.updatedAt) - new Date(b.updatedAt) });
      setFilterData(filterDescending)
    }
    if (value == 'Sold Date (Newest - Oldest)') {
      const soldFilterAscending = ListingDetails.filter((item) => item.status == 'Sold');
      const filterAscending = soldFilterAscending.sort((a, b) => { return new Date(b.updatedAt) - new Date(a.updatedAt) });
      setFilterData(filterAscending)
    }
    if (value == 'Sold Date (Oldest - Newest)') {
      const soldFilterDescending = ListingDetails.filter((item) => item.status == 'Sold');
      const filterDescending = soldFilterDescending.sort((a, b) => { return new Date(a.updatedAt) - new Date(b.updatedAt) });
      setFilterData(filterDescending)
    }
    if (value == 'Street (A-Z)') {
      const streetAscending = ListingDetails.sort((a, b) => { return a.street_address_name < b.street_address_name ? -1 : 1 })
      setFilterData(streetAscending)
    }
    if (value == 'Street (Z-A)') {
      const streetDescending = ListingDetails.sort((a, b) => { return b.street_address_name < a.street_address_name ? -1 : 1 })
      setFilterData(streetDescending)
    }
    if (value == 'Suburb (A-Z)') {
      const suburbAscending = ListingDetails.sort((a, b) => { return a.suburb < b.suburb ? -1 : 1 })
      setFilterData(suburbAscending)
    }
    if (value == 'Suburb (Z-A)') {
      const suburbDescending = ListingDetails.sort((a, b) => { return b.suburb < a.suburb ? -1 : 1 })
      setFilterData(suburbDescending)
    }
    if (value == 'Sold Price (Low - High)') {
      const soldPriceAscending = ListingDetails.sort((a, b) => { return a.price < b.price ? -1 : 1 })
      setFilterData(soldPriceAscending)
    }
    if (value == 'Sold Price (High - Low)') {
      const soldPriceDescending = ListingDetails.sort((a, b) => { return b.price < a.price ? -1 : 1 })
      setFilterData(soldPriceDescending)
    }
    if (value == 'Agent Name (A-Z)') {
      const filterAgentName = ListingDetails.map((item) => {
        return { ...item, agentName: item.lead_agent.first_name.toLowerCase() + item.lead_agent.last_name.toLowerCase() }
      });
      const agentNameAscending = filterAgentName.sort((a, b) => { return a.agentName < b.agentName ? -1 : 1 })
      setFilterData(agentNameAscending)
    }
    if (value == 'Agent Name (Z-A)') {
      const filterAgentName = ListingDetails.map((item) => {
        return { ...item, agentName: item.lead_agent.first_name.toLowerCase() + item.lead_agent.last_name.toLowerCase() }
      });
      console.log(filterAgentName);
      const agentNameDescending = filterAgentName.sort((a, b) => { return b.agentName < a.agentName ? -1 : 1 })
      setFilterData(agentNameDescending)
    }
  };

  const onSearchFilter = () => {
    const value = Filter.search
    if (value.length > 0) {
      const filterInputData = ListingDetails?.filter(
        (item) =>
          item?._id?.includes(value) || item?.street_address_name?.includes(value)
          || item?.street_address_number?.includes(value) || item?.suburb?.includes(value)
      );
      setFilterData(filterInputData)
    } else {
      setFilterData(ListingDetails);
    }
  }

  const GetAllAgentData = async () => {
    await axiosInstanceAuth
      .get("admin/ViewAllAgent")
      .then((res) => {
        const mydata = res?.data?.lead_agent;
        if (res?.data?.status) {
          setAgentsInfo(mydata);
        } else {
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };
  const onChangeFilterCategory = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...Filter,
      [name]: value,
    });
    if (value == "select category") {
      setFilterData(ListingDetails);
    } else {
      const filterInputData = ListingDetails?.filter(
        (item) => item?.listing_type == value?.trim()
      );
      setFilterData(filterInputData);
    }
  };

  const onChangeFilterStatus = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...Filter,
      [name]: value,
    });
    if (value == "select status") {
      setFilterData(ListingDetails);
    } else {
      const filterInputData = ListingDetails?.filter(
        (item) => item?.status == value?.trim()
      );
      setFilterData(filterInputData);
    }
  };
  const onChangeFilterAgent = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...Filter,
      [name]: value,
    });
    if (value == "All Agents") {
      setFilterData(ListingDetails);
    } else {
      const filterInputData = ListingDetails?.filter((item) => {
        const fullname = (
          item?.lead_agent?.first_name + item?.lead_agent?.last_name
        )
          ?.toLowerCase()
          ?.replace(/\s+/g, "");
        console.log("agent name", fullname);
        return fullname == value?.toLowerCase()?.replace(/\s+/g, "");
      });
      console.log("agent vlaue", value?.toLowerCase()?.replace(/\s+/g, ""));
      setFilterData(filterInputData);
    }
  };
  const [IsOpenModel, setIsOpenModel] = useState(false);
  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
  const [SelectedAgency, setSelectedAgency] = useState({});

  const handelDelete = () => {
    setIsOpenModel(false);
    setDeleteConfirmation(true);
  };

  const ConfirmDelete = async (SelectedAgency) => {
    await axiosInstanceAuth
      .post(`admin/Listing/delete/${SelectedAgency?._id}`)
      .then((res) => {
        if (res?.data?.status) {
          GetAllListingData();
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

  const PropertyType = [
    { id: 1, title: "Add a Residential Home Sales Listing" },
    { id: 2, title: "Add a Residential Rental" },
    { id: 3, title: "Add a Residential Land Sales" },
    { id: 4, title: "Add a Rural" },
    { id: 5, title: "Add a Commercial" },
    { id: 6, title: "Add a New Home for Sale" },
  ];

  const { sliceData, currentPage, numbers, totalPages, goToPage } =
    usePagination(ListingDetails, 10);

  const copyEmail = () => {
    navigator.clipboard.writeText(
      `https://www.myrealestate-ng.com/property-house/${profileid}`
    );
    toast.success("link copy successfully now you can share your details");
  };
  return (
    <Layout1>
      <>
        <div className="container mx-auto px-5 xl:px-0">
          {/* ---------- section 1  ---------- */}
          <div className="flex flex-col justify-start gap-5 bg-white rounded-2xl shadow-md p-4 md:p-6 mb-6 md:mb-10">
            <h1 className="text-[#404040] font-extrabold text-lg md:text-xl lg:text-2xl">
              Your Listings
            </h1>
            <div className="round relative flex items-center justify-between !text-[#404040] text-xs md:text-sm outline-none border border-[#E5E5E5]  rounded-[28px] cursor-pointer" >
              <p className="px-5">Select Listing Type</p>
              <div className={`${isShow ? "" : "hidden"} round absolute w-full !text-[#404040] bg-white top-11 right-0 text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer`}>
                {PropertyType?.length > 0 &&
                  PropertyType?.map((d, index) => (
                    <p key={index} value={d?.id} className="list-type rounded-[28px] py-1 px-2" onClick={(e) => {
                      navigate(`/listings/add/${d?.id}`);
                    }}>
                      {d?.title}
                    </p>
                  ))}
              </div>
              <div className="border border-[#E5002A] bg-[#E5002A] rounded-3xl py-2 px-5 cursor-pointer" onClick={() => setIsShow(!isShow)}>
                <div className="text-white font-medium text-xs md:text-sm lg:text-base">
                  Add New Listing
                </div>
              </div>
            </div>

            {/* <select
              name="select"
              className="round !text-[#404040] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer"
              onChange={(e) => {
                navigate(`/listings/add/${e.target.value}`);
              }}
            >
              <option value="" selected hidden>
                Add a Listing
              </option>
              {PropertyType?.length > 0 &&
                PropertyType?.map((d, index) => (
                  <option key={index} value={d?.id}>
                    {d?.title}
                  </option>
                ))}
            </select> */}

            <div className="w-full flex flex-row flex-wrap xl:flex-nowrap justify-start items-center gap-4">
              <div className="w-full md:w-[48%] xl:w-[24%] flex flex-col justify-start gap-2">
                <div className="text-[#404040] font-semibold  text-xs md:text-sm lg:text-base px-2">
                  Category
                </div>
                <select
                  name="category"
                  value={Filter?.category}
                  onChange={(e) => onChangeFilterCategory(e)}
                  className="round !text-[#404040] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer"
                >
                  <option value="select category">select category</option>
                  <option value="residential_home_sales_listing">
                    Residential Home Sales
                  </option>
                  <option value="residential_rental">Residential Rental</option>
                  <option value="residential_land_sales">
                    Residential land Sales
                  </option>
                  <option value="rural">Rural</option>
                  <option value="commercial">Commercial</option>
                  <option value="new_home_for_sale">New Home for Sale</option>
                </select>
              </div>
              <div className="w-full md:w-[48%] xl:w-[24%] flex flex-col justify-start gap-2">
                <div className="text-[#404040] font-semibold  text-xs md:text-sm lg:text-base px-2">
                  Status
                </div>
                <select
                  name="status"
                  value={Filter?.status}
                  onChange={onChangeFilterStatus}
                  className="round !text-[#404040] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer"
                >
                  <option Value="select status">select status</option>
                  <option Value="Active">Active</option>
                  <option value="Sold">Sold</option>
                  <option value="Rent">Rent</option>
                  <option value="off_market">Off Market</option>
                  <option value="under_offer">Under Offer</option>
                </select>
              </div>
              <div className="w-full md:w-[48%] xl:w-[24%] flex flex-col justify-start gap-2">
                <div className="text-[#404040] font-semibold  text-xs md:text-sm lg:text-base px-2">
                  Agent
                </div>
                <select
                  name="agent"
                  value={Filter?.agent}
                  onChange={onChangeFilterAgent}
                  className="round !text-[#404040] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer"
                >
                  <option value="All Agents">All Agents</option>
                  {AgentsInfo?.length > 0 &&
                    AgentsInfo?.map((d, index) => (
                      <option key={index} value={d?.name}>
                        {d?.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full md:w-[48%] xl:w-[24%] flex flex-col justify-start gap-2">
                <div className="text-[#404040] font-semibold  text-xs md:text-sm lg:text-base px-2">
                  Sort By
                </div>
                <select
                  name="sort_by"
                  value={Filter?.sort_by}
                  onChange={onChangeFilter}
                  className="round !text-[#404040] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer"
                >
                  <option value="Listed (Newest - Oldest)">
                    Listed (Newest - Oldest)
                  </option>
                  <option value="Sold Date (Newest - Oldest)">
                    Sold Date (Newest - Oldest)
                  </option>
                  <option value="Sold Date (Oldest - Newest)">
                    Sold Date (Oldest - Newest)
                  </option>
                  <option value="Listed (Oldest - Newest)">
                    Listed (Oldest - Newest)
                  </option>
                  <option value="Street (A-Z)">Street (A-Z)</option>
                  <option value="Street (Z-A)">Street (Z-A)</option>
                  <option value="Suburb (A-Z)">Suburb (A-Z)</option>
                  <option value="Suburb (Z-A)">Suburb (Z-A)</option>
                  <option value="Sold Price (Low - High)">
                    Sold Price (Low - High)
                  </option>
                  <option value="Sold Price (High - Low)">
                    Sold Price (High - Low)
                  </option>
                  <option value="Agent Name (A-Z)">Agent Name (A-Z)</option>
                  <option value="Agent Name (Z-A)">Agent Name (Z-A)</option>
                  <option value="Upgrade (ending soonest)">
                    Upgrade (ending soonest)
                  </option>
                </select>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-[60%] flex flex-row justify-start items-center gap-3">
                <div className="w-full flex justify-start items-center gap-2 border border-[#E5E5E5] rounded-3xl py-2 px-5 cursor-pointer">
                  <img src={searchGray} alt="icon" className="w-3 lg:w-4" />
                  <input
                    type="text"
                    name="search"
                    value={Filter?.search}
                    onChange={(e) => onChangeFilter(e)}
                    placeholder="Enter Property ID, Addres or Superb..."
                    className="w-full text-[#A3A3A3]  text-xs md:text-sm outline-none"
                  />
                </div>

                <div
                  className="border border-[#E5002A] bg-[#E5002A] rounded-3xl py-2 px-5 cursor-pointer"
                // onClick={() => GetAllListingData(Filter)}
                >
                  <div className="text-white font-medium text-xs md:text-sm lg:text-base" onClick={() => onSearchFilter()}>
                    Search
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[35%] flex flex-row justify-end items-center gap-4">
                <div className="text-[#404040] text-xs md:text-sm">
                  {listingLength} Results
                </div>
                <div className="flex justify-center items-center gap-2 border border-[#E5002A] bg-[#E5002A] rounded-3xl py-2 px-5 cursor-pointer">
                  <div className="text-white font-medium text-xs md:text-sm lg:text-base">
                    Export
                  </div>
                  <img src={downArrow} alt="icon" className="w-3 lg:w-5" />
                </div>
              </div>
            </div>
          </div>
          {/* ---------- section 2  ---------- */}

          <div className="w-full flex flex-col justify-start">
            {filterData?.length > 0 &&
              filterData?.map((i, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row justify-between gap-4 bg-white rounded-lg shadow-md hover:shadow-lg p-4 mb-4 md:mb-6"
                >
                  {/* {console.log(JSON.parse(JSON.stringify(i?.lead_agent))?.name)} */}
                  {/* {console.log(i?.lead_agent?.name)} */}
                  <div className="flex flex-col lg:flex-row justify-start  gap-2">
                    <img
                      src={i?.frontPageImg?.[0]}
                      alt=""
                      className="w-full lg:w-[200px] h-52 lg:h-32 rounded-lg"
                    />
                    <div className="flex flex-col justify-start lg:justify-between gap-2">
                      <div className="flex flex-col justify-start gap-1">
                        <div className="flex flex-row justify-between gap-2">
                          <div className="text-[#262626] text-base md:text-lg py-1">
                            {i?.street_address_number} {i?.street_address_name}
                          </div>
                          <div className="block lg:hidden font-semibold text-[#404040] text-center text-xs md:text-sm ">
                            <button className="outline-none bg-[#F5F5F5] rounded-lg py-2 px-5">
                              {i?.status}
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-row justify-between gap-2">
                          <div className="text-[#404040] font-semibold text-sm md:text-base">
                            {/* {console.log("Listing", i?.lead_agent.name)} */}
                            {/* {JSON.parse(JSON.stringify(i?.lead_agent))?.name} */}

                            {i?.lead_agent?.first_name +
                              i?.lead_agent?.last_name}
                            {/* {console.log(
                              "AgentsInfo",
                              AgentsInfo.map((item) =>
                                item?._id === i?.lead_agent ? item?.name : ""
                              )
                            )} */}
                            {i?.lead_agent?.name}
                            <span className="text-[#737373] font-medium text-xs md:text-sm ml-2">
                              listed {moment(i?.createdAt).format("DD-MM-YYYY")}
                            </span>
                          </div>
                          <div className="block lg:hidden min-w-[75px] font-semibold text-[#404040] text-xs md:text-sm">
                            ID {i?._id}
                          </div>
                        </div>
                      </div>
                      <div className="text-[#262626] font-semibold ext-xs md:text-sm py-1">
                        {i?.price && i?.price_display_checked == 'show_actual_price' ? `$${i?.price} unit` : i?.price_display}
                        {/* <span className="font-semibold text-xs px-1">unit</span> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row justify-end gap-6">
                    <div className="hidden lg:flex flex-col justify-center items-center gap-4">
                      <div className="bg-[#F5F5F5] rounded-lg font-semibold text-[#404040] text-center text-xs md:text-sm py-2 px-5">
                        {i?.status}
                      </div>
                      <div className="min-w-[88px] font-semibold text-[#404040] text-xs md:text-sm py-2">
                        ID {i?._id?.substring(0, 9)}
                      </div>
                    </div>

                    <div className="flex flex-row-reverse lg:flex-col justify-center items-center gap-4 px-2">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <img
                          src={urlRed}
                          alt="icon"
                          className="border border-[#FA979A] rounded-full bg-[#FFEAEF] p-1 sm:p-2 cursor-pointer"
                          onClick={() => {
                            navigate(`/listings/edit/${i?._id}`);
                          }}
                          data-tooltip-id="edit"
                          data-tooltip-content="Edit"
                        />
                        <Tooltip id="edit" />
                        <img
                          src={shareRed}
                          alt="icon"
                          className="border border-[#FA979A] rounded-full bg-[#FFEAEF] p-1 sm:p-2 cursor-pointer"
                          onClick={() => {
                            setshare(true);
                            setAgentData(
                              i?.lead_agent?.first_name +
                              " " +
                              i?.lead_agent?.last_name
                            );
                            setprofileid(i?._id);
                          }}
                          data-tooltip-id="share"
                          data-tooltip-content="Share"
                        />
                        <Tooltip id="share" />
                        <img
                          src={deleteRed}
                          alt="icon"
                          className="border border-[#FA979A] rounded-full bg-[#FFEAEF] p-1 sm:p-2 cursor-pointer"
                          onClick={() => {
                            setDeleteConfirmation(true);
                            setSelectedAgency(i);
                          }}
                          data-tooltip-id="delete"
                          data-tooltip-content="Delete"
                        />
                        <Tooltip id="delete" />
                      </div>
                      {/* <div className="border border-[#E5002A] bg-[#E5002A] rounded-3xl py-2 px-5 cursor-pointer">
                        <button className="w-full outline-none text-white font-medium text-xs md:text-sm cursor-pointer">
                          Promote Listing
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* <<----- Paginationp ----->> */}

          {/* <Pagination
            className="pagination-bar mb-10"
            currentPage={currentPage}
            totalCount={ListingDetails?.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          /> */}

          {ListingDetails.length > 10 ? (
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
        </div>

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
                      You want to Delete this Listing
                    </p>
                  </div>

                  {/* ------ Fotter ------ */}
                  <div className="flex justify-center items-center m-5">
                    <button
                      className="bg-[#009600] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#008500] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                      type="button"
                      onClick={(e) => ConfirmDelete(SelectedAgency)}
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
        {shares ? (
          <>
            <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
              <div className="relative min-w-[250px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl rounded-xl">
                {/* ------ Content ------ */}
                <div className="border-0  rounded-xl shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/* ------ Header ------ */}
                  <div className="grid place-items-center place-content-end">
                    <button
                      className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                      onClick={(e) => setshare(false)}
                    >
                      ×
                    </button>
                  </div>
                  {/* ------ Body ------ */}
                  <div className="relative grid place-items-start px-6 md:px-10 pb-3 flex-auto ">
                    <h3 className="text-black font-semibold text-base md:text-lg  leading-relaxed text-center pb-5">
                      Share Property details
                    </h3>

                    <div
                      className="flex gap-2 justify-center items-center cursor-pointer py-5"
                      onClick={() => copyEmail()}
                    >
                      <div>
                        <IoIosLink className="w-10 h-5" />
                      </div>
                      <div>Copy Link</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </Layout1>
  );
};

export default ListingList;

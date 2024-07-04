import React, { useEffect, useState, useRef } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import {
  add,
  campaignImg,
  deleteiconRed,
  deleteRed,
  dragImgIcon,
  pasteRedIcon,
  questionMark,
} from "../../assets";
import {
  NewOrEstablished,
  PriceDisplay,
  Bedrooms,
  Bathrooms,
  OutdoorFeatures,
  IndoorFeatures,
  HeatingOrCooling,
  EcoFriendlyFeatures,
  ClimateChangerAndEnergySaver,
  Hours,
  Minites,
} from "../../Constants";
import Layout1 from "../../Layouts/Layout1";
import DatePicker from "react-datepicker";
import moment from "moment";
import { DocumentViewer } from "react-documents";
import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";
import { toast } from "react-toastify";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
import uploadMultiPalImage from '../../uploadImage/uploadMultiPalImage'

const EditListing = () => {
  const navigate = useNavigate();
  const florInputRef = useRef(null);
  const propertyInputRef = useRef(null);
  const frontPageInputRef = useRef(null);
  const statementInputRef = useRef(null);
  const [propertyImgRef, setPropertyImgRef] = useState([])
  const [florImgRef, setFlorImgRef] = useState([])
  const [frontPageImgRef, setFrontPageImgRef] = useState([])
  const [statementPdfRef, setStatementPdfRef] = useState([])
  const [isLoader, setIsLoader] = useState(false)
  let id = useLocation().pathname.split("/")?.[3];

  const [AgentsInfo, setAgentsInfo] = useState([]);
  const [AgencyOptions, setAgencyOptions] = useState([]);
  const [CampaignImg, setCampaignImg] = useState("");
  const [ListingCheckboxs, setListingCheckboxs] = useState([
    {
      // ------------ Listing Details ------------
      show_actual_price: true,
      show_text_instead_of_price: false,
      Hide_the_price_and_display_contact_agent: false,
      send_vendor_the_property_live_email_when_listing_is_published: false,
      send_vendor_a_weekly_campaign_activity_report_email: false,
      hide_street_address_on_listing: false,
      hide_street_view: false,

      // ------------ Property Details ------------
      indoor_features: [],
      outdoor_features: [],
      climate_energy: [],
      heating_cooling: [],
      eco_friendly: [],

      // ------------ Image and Copy ------------

      // ------------ Inspactions ------------
    },
  ]);

  useEffect(() => {
    GetPropertyData(id);
    GetAllAgentData();
    GetAgencyDetail();
  }, []);

  const GetAgencyDetail = async () => {
    await axiosInstanceAuth
      .get("admin/SelectAgency")
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          setAgencyOptions(mydata);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const GetPropertyData = async (id) => {
    await axiosInstanceAuth
      .post(`admin/Listing/view/${id}`)
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          setListingDetails({
            ...ListingDetails,
            agency_id: mydata?.agency_id,
            status: mydata?.status,
            property_type: mydata?.property_type,
            new_or_established_checked: mydata?.new_or_established_checked,
            lead_agent: mydata?.lead_agent,
            authority: mydata?.authority,
            price: mydata?.price,
            price_display: mydata?.price_display,
            price_display_checked: mydata?.price_display_checked,
            name: mydata?.name,
            email: mydata?.email,
            phone_number: mydata?.phone_number,
            unit: mydata?.unit,
            street_address_number: mydata?.street_address_number,
            street_address_name: mydata?.street_address_name,
            suburb: mydata?.suburb,
            municipality: mydata?.municipality,
            auction_result: mydata?.auction_result,
            maximum_bid: mydata?.maximum_bid,
            Bedrooms: mydata?.Bedrooms,
            Bathrooms: mydata?.Bathrooms,
            Ensuites: mydata?.Ensuites,
            toilets: mydata?.toilets,
            garage_spaces: mydata?.garage_spaces,
            carport_spaces: mydata?.carport_spaces,
            open_spaces: mydata?.open_spaces,
            energy_efficiensy_rating: mydata?.energy_efficiensy_rating,
            living_areas: mydata?.living_areas,
            house_size: mydata?.house_size,
            house_size_square: mydata?.house_size_square,
            land_size: mydata?.land_size,
            land_size_square: mydata?.land_size_square,
            // other_features: mydata?.other_features,
            heading: mydata?.heading,
            discription: mydata?.discription,
            video_url: mydata?.video_url,
            online_tour_1: mydata?.online_tour_1,
            online_tour_2: mydata?.online_tour_2,
            agency_listing_url: mydata?.agency_listing_url,
          });
          setListingCheckboxs({
            ...ListingCheckboxs,
            established_property: mydata?.established_property,
            new_construction: mydata?.new_construction,
            show_actual_price: mydata?.show_actual_price,
            show_text_instead_of_price: mydata?.show_text_instead_of_price,
            Hide_the_price_and_display_contact_agent:
              mydata?.Hide_the_price_and_display_contact_agent,
            send_vendor_the_property_live_email_when_listing_is_published:
              mydata?.send_vendor_the_property_live_email_when_listing_is_published,
            send_vendor_a_weekly_campaign_activity_report_email:
              mydata?.send_vendor_a_weekly_campaign_activity_report_email,
            hide_street_address_on_listing:
              mydata?.hide_street_address_on_listing,
            hide_street_view: mydata?.hide_street_view,

            outdoor_features: mydata?.outdoor_features,
            indoor_features: mydata?.indoor_features,
            climate_energy: mydata?.climate_energy,
            heating_cooling: mydata?.heating_cooling,
            eco_friendly: mydata?.eco_friendly,
          });

          setCampaignImg(mydata?.frontPageImg?.[0]);
          // setInspectionTimes(JSON.parse(mydata?.inspection_times));
          setInspectionTimes(mydata?.inspection_times);
        } else {
          // toast.error("Oops! Something went wrong");
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const proccessFile = (imageURL) => {
    let allFiles = [];

    imageURL?.length > 0 &&
      imageURL?.map((string, index) => {
        let name = string.split("/")[2];
        let n = name?.split(".");
        let ext = n[n.length - 1];

        const file = new File([`${name}`], `${name}`, {
          type: `text/${ext}`,
        });

        allFiles?.push(file);
      });

    return allFiles;
  };

  const BlobFile = (imageURL) => {
    let allFiles = [];

    imageURL?.length > 0 &&
      imageURL?.map((string, index) => {
        let name = string.split("/")[2];
        let n = name?.split(".");
        let ext = n[n.length - 1];

        const file = new File([`${name}`], `${name}`, {
          type: `text/${ext}`,
        });

        const blobURL = URL.createObjectURL(file);

        allFiles?.push(blobURL);
      });

    return allFiles;
  };

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

  const [InspectionTime, setInspectionTime] = useState({
    show_date: "",
    date: "",
    start_hr: "",
    start_min: "",
    start_am_pm: "AM",
    end_hr: "",
    end_min: "",
    end_am_pm: "PM",
  });

  const [InspectionTimes, setInspectionTimes] = useState([]);

  const onInspectionTimeChange = (e) => {
    const { name, value } = e.target;
    setInspectionTime({ ...InspectionTime, [name]: value });
  };

  const onDeleteInspection = (e) => {
    let list = [...InspectionTimes];
    list.splice(e, 1);
    setInspectionTimes(list);
  };

  const AddInspectionTime = () => {
    if (
      InspectionTime?.date &&
      InspectionTime?.start_hr &&
      InspectionTime?.start_min &&
      InspectionTime?.end_hr &&
      InspectionTime?.end_min
    ) {
      setInspectionTimes([...InspectionTimes, InspectionTime]);
      setInspectionTime({
        show_date: "",
        date: "",
        start_hr: "",
        start_min: "",
        start_am_pm: "AM",
        end_hr: "",
        end_min: "",
        end_am_pm: "PM",
      });
    }
  };

  const AllTabs = [
    "Listing Details",
    "Property Details",
    "Image and Copy",
    "Inspactions",
  ];

  const [isActive, setisActive] = useState(AllTabs?.[0]);

  const ActiveTab =
    "bg-[#FFEAEF] border-b-[#E5002A] rounded-t-lg text-[#404040] font-semibold";

  const NormalTab =
    "w-[25%] grid place-items-center  text-[#737373] font-medium text-xs md:text-sm  border border-b-2 border-transparent hover:border-b-[#E5002A] py-3 px-10 ease-in-out duration-700 cursor-pointer";

  const normalBox =
    "flex justify-center items-center gap-3 border border-[#E5E5E5] rounded-3xl font-medium text-xs md:text-sm cursor-pointer py-2 px-5";
  const selectedBox = "!text-[#E5002A] !bg-[#FFEAEF] !border-[#E5002A]";

  const [ListingDetails, setListingDetails] = useState({
    agency_id: "",
    // ------------ Listing Details ------------
    status: "Active",
    property_type: "",
    new_or_established_checked: "established_property",
    lead_agent: {},
    authority: "",
    price: "",
    price_display: "",
    price_display_checked: "show_actual_price",
    name: "",
    email: "",
    phone_number: "",
    unit: "",
    street_address_number: "",
    street_address_name: "",
    suburb: "",
    municipality: "",
    auction_result: "",
    maximum_bid: "",

    // ------------ Property Details ------------

    Bedrooms: "3",
    Bathrooms: "+3",
    Ensuites: "",
    toilets: "",
    garage_spaces: "",
    carport_spaces: "",
    open_spaces: "",
    energy_efficiensy_rating: "",
    living_areas: "",
    house_size: "",
    house_size_square: "",
    land_size: "",
    land_size_square: "",
    // other_features: "",

    // ------------ Image and Copy ------------

    heading: "",
    discription: "",
    video_url: "",
    online_tour_1: "",
    online_tour_2: "",
    agency_listing_url: "",

    // ------------ Inspactions ------------
  });

  const [ListingImages, setListingImages] = useState({
    propertyImg: [],
    propertyImgShow: [],
    florePlansImg: [],
    florePlansImgShow: [],
    frontPageImg: [],
    frontPageImgShow: [],
    statementOfInfo: [],
    statementOfInfoShow: [],
  });

  const onInputChange = (e) => {
    const { name, value } = e?.target || {}; // Add a fallback empty object if e?.target is undefined
    setListingDetails({ ...ListingDetails, [name]: value });
  };

  useEffect(() => {
    onInputChange();
  }, []);

  // const onInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setListingDetails({
  //     ...ListingDetails,
  //     lead_agent: {  [name]: value },
  //   });
  // };

  const onCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setListingCheckboxs({ ...ListingCheckboxs, [name]: checked });
  };
  const onPropertyImageUpload = () => {
    const propertyFiles = Array.from(propertyInputRef.current.files);
    setPropertyImgRef((preFiles) => [...preFiles, ...propertyFiles]);
  }
  const onFlorImageUpload = () => {
    const florFiles = Array.from(florInputRef.current.files);
    setFlorImgRef((preFiles) => [...preFiles, ...florFiles]);
  }
  const onFrontImageUpload = () => {
    const frontFiles = Array.from(frontPageInputRef.current.files);
    setFrontPageImgRef((preFiles) => [...preFiles, ...frontFiles]);
  }
  const onStatementUpload = () => {
    const statementFiles = Array.from(statementInputRef.current.files);
    setStatementPdfRef((preFiles) => [...preFiles, ...statementFiles]);
  }

  const onChangeImages = (e) => {
    const { name } = e.target;

    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const uploaded = [...ListingImages?.[name]];
    chosenFiles?.some((file) => {
      // Check if the file already exists
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });

    setListingImages({
      ...ListingImages,
      [name]: uploaded,
      [`${name}Show`]:
        uploaded?.length > 0 && uploaded?.map((d) => URL.createObjectURL(d)),
    });
  };

  const onDeleteImages = (e, name) => {
    let list = [...ListingImages?.[name]];
    list.splice(e, 1);
    setListingImages({
      ...ListingImages,
      [name]: list,
      [`${name}Send`]: list,
      [`${name}Show`]:
        list?.length > 0 && list?.map((d) => URL.createObjectURL(d)),
    });
  };

  const getvalue = (e) => {
    const { name } = e.target;
    navigator.clipboard.readText().then((clipboard_value) => {
      setListingDetails({ ...ListingDetails, [name]: clipboard_value });
    });
  };

  const PasteValue = (e) => {
    const { name } = e.target;
    var x = document.getElementById(name).value;
    setListingDetails({ ...ListingDetails, [name]: x });
  };

  const handelFinalSubmit = async () => {
    try {
      setIsLoader(true);
      const formData = new FormData();

      for (const key in ListingDetails) {
        if (Object.hasOwnProperty.call(ListingDetails, key)) {
          const keyElement = key;
          const element = ListingDetails[key];
          formData.append(keyElement, element);
          // console.log(
          //   "🚀 ~ AddListing ~ keyElement : element",
          //   `${keyElement} : ${element}`
          // );
        }
      }
      formData.append(
        "established_property",
        ListingCheckboxs[0]?.established_property
      );
      formData.append(
        "new_construction",
        ListingCheckboxs[0]?.new_construction
      );
      formData.append(
        "show_actual_price",
        ListingCheckboxs[0]?.show_actual_price
      );
      formData.append(
        "show_text_instead_of_price",
        ListingCheckboxs[0]?.show_text_instead_of_price
      );
      formData.append(
        "Hide_the_price_and_display_contact_agent",
        ListingCheckboxs[0]?.Hide_the_price_and_display_contact_agent
      );
      formData.append(
        "send_vendor_the_property_live_email_when_listing_is_published",
        ListingCheckboxs[0]
          ?.send_vendor_the_property_live_email_when_listing_is_published
      );
      formData.append(
        "send_vendor_a_weekly_campaign_activity_report_email",
        ListingCheckboxs[0]?.send_vendor_a_weekly_campaign_activity_report_email
      );
      formData.append(
        "hide_street_address_on_listing",
        ListingCheckboxs[0]?.hide_street_address_on_listing
      );
      formData.append(
        "hide_street_view",
        ListingCheckboxs[0]?.hide_street_view
      );

      formData.append(
        "outdoor_features",
        JSON.stringify(ListingCheckboxs?.outdoor_features)
      );

      formData.append(
        "indoor_features",
        JSON.stringify(ListingCheckboxs?.indoor_features)
      );

      formData.append(
        "climate_energy",
        JSON.stringify(ListingCheckboxs?.climate_energy)
      );

      formData.append(
        "heating_cooling",
        JSON.stringify(ListingCheckboxs?.heating_cooling)
      );

      formData.append(
        "eco_friendly",
        JSON.stringify(ListingCheckboxs?.eco_friendly)
      );

      let propertyImg = []
      for (let i = 0; i < propertyImgRef.length; i++) {
        const uploadImg = await uploadMultiPalImage(propertyImgRef[i])
        propertyImg.push(uploadImg.url)
      }

      let florPlanImg = []
      for (let i = 0; i < florImgRef.length; i++) {
        const uploadImg = await uploadMultiPalImage(florImgRef[i])
        florPlanImg.push(uploadImg.url)
      }

      let frontPageImg = []
      for (let i = 0; i < frontPageImgRef.length; i++) {
        const uploadImg = await uploadMultiPalImage(frontPageImgRef[i])
        frontPageImg.push(uploadImg.url)
      }

      let statementPdf = []
      for (let i = 0; i < statementPdfRef.length; i++) {
        const uploadImg = await uploadMultiPalImage(statementPdfRef[i])
        statementPdf.push(uploadImg.url)
      }

      formData.append("propertyImg", JSON.stringify(propertyImg));
      formData.append("florePlansImg", JSON.stringify(florPlanImg));
      formData.append("frontPageImg", JSON.stringify(frontPageImg));
      formData.append("statementOfInfo", JSON.stringify(statementPdf));

      // for (let i = 0; i < ListingImages?.propertyImg?.length; i++) {
      //   formData.append("propertyImg", ListingImages?.propertyImg[i]);
      // }
      // for (let i = 0; i < ListingImages?.florePlansImg?.length; i++) {
      //   formData.append("florePlansImg", ListingImages?.florePlansImg[i]);
      // }
      // for (let i = 0; i < ListingImages?.frontPageImg?.length; i++) {
      //   formData.append("frontPageImg", ListingImages?.frontPageImg[i]);
      // }
      // for (let i = 0; i < ListingImages?.statementOfInfo?.length; i++) {
      //   formData.append("statementOfInfo", ListingImages?.statementOfInfo[i]);
      // }

      formData.append("inspection_times", JSON.stringify(InspectionTimes));

      await axiosInstanceAuthFormData
        .post(`admin/Listing/edit/${id}`, formData)
        .then((res) => {
          if (res?.data?.status) {
            setIsLoader(false);
            toast.success(res?.data?.message);
            navigate(`/listings`);
          } else {
            setIsLoader(false);
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log("------>> Error", err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout1>
      {isLoader ? <div class="loading">Loading&#8230;</div> : null}
      <div className="p-5 xl:px-16">
        <div className="container mx-auto">
          {/* ---------- section 1  ---------- */}
          <div className="flex flex-col justify-start gap-5 bg-white rounded-2xl shadow-md p-4 md:p-6 mb-6 md:mb-10">
            {/* ---------- Campaign ---------- */}
            <div className="text-[#404040] font-bold cursor-pointer text-lg md:text-xl lg:text-2xl">
              Campaign
            </div>
            <div className="grid place-content-center">
              {/* {ListingImages?.frontPageImgShow?.[0] ? (
                <img
                  src={ListingImages?.frontPageImgShow}
                  alt=""
                  className="rounded-xl"
                />
              ) : (
                <img
                  src={`${BACKEND_BASE_URL}${ListingImages?.frontPageImg?.[0]}`}
                  alt=""
                  className="rounded-xl"
                />
              )} */}
              {/* <img src={campaignImg} alt="" className="rounded-xl" /> */}

              {CampaignImg ? (
                <img
                  src={CampaignImg}
                  alt=""
                  className="rounded-xl"
                />
              ) : (
                <img src={campaignImg} alt="" className="rounded-xl" />
              )}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-4 rounded-lg bg-[#F5F5F5] p-4 md:p-6">
              <div className="flex flex-col justify-start gap-2">
                <div className="text-[#E5002A] font-bold cursor-pointer text-base md:text-lg lg:text-xl">
                  {ListingDetails?.street_address_number}{" "}
                  {ListingDetails?.street_address_name}
                </div>
                <div className="text-[#737373] font-semibold cursor-pointer text-xs md:text-sm lg:text-base">
                  {ListingDetails?.suburb} {ListingDetails?.municipality}
                </div>
              </div>
              <div className="text-[#737373] font-semibold cursor-pointer text-xs md:text-sm lg:text-base">
                https://www.argimb.com.ar/{id.substring(0, 9)}
              </div>
            </div>

            {/* -------- Navigation -------- */}

            <div className="grid place-items-center overflow-x-scroll md:overflow-hidden">
              <div className="w-full bg-white rounded-xl">
                <div className="flex justify-between items-center border border-b-2 border-transparent border-b-[#E5E5E5] whitespace-nowrap">
                  {AllTabs?.length > 0 &&
                    AllTabs?.map((d, index) => (
                      <div
                        key={index}
                        className={`${NormalTab} ${isActive === d ? ActiveTab : ""
                          }`}
                        onClick={() => {
                          setisActive(d);
                        }}
                      >
                        {d}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* -------- Listing Details -------- */}

            {isActive === AllTabs?.[0] && (
              <div className="">
                <div className="text-[#737373] font-medium text-xs md:text-sm my-3">
                  <span className="text-[#E5002A] pr-2">*</span>
                  Madatory information is marked with a asterisk
                </div>

                {/* ---------- Agency Detail Start ---------- */}

                <div className="w-full">
                  <div className="font-semibold text-lg  mt-5 md:mt-8">
                    Agency Detail <span className="px-1 text-red-500">*</span>
                  </div>
                  <select
                    name="agency_id"
                    value={ListingDetails?.agency_id}
                    onChange={onInputChange}
                    className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                  >
                    <option selected hidden value="">
                      Please Select Agency
                    </option>
                    {AgencyOptions?.length > 0 ? (
                      AgencyOptions?.map((d, index) => (
                        <option key={index} value={d?.id}>
                          {d?.principal_name}
                        </option>
                      ))
                    ) : (
                      <option value="">Agency not found</option>
                    )}
                  </select>
                </div>

                <div className="w-full border border-[#E5E5E5] my-6" />

                <div className="font-semibold text-[#404040] text-lg md:text-xl lg:text-2xl mt-6 md:mt-12">
                  About the listing
                </div>

                <div className="border-b-2 border-[#E5E5E5] my-4 " />

                <div className="w-full md:w-[50%] mt-4 md:mt-6">
                  <div className="font-medium text-[#171717] text-xs md:text-sm ">
                    Status :
                  </div>
                  <select
                    name="status"
                    value={ListingDetails?.status}
                    onChange={onInputChange}
                    className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                  >
                    <option defaultValue="Active">Active</option>
                    <option value="Sold">Sold</option>
                    <option value="Rent">Rent</option>
                    <option value="off_market">Off Market</option>
                    <option value="under_offer">Under Offer</option>
                    <option value="new">New</option>
                  </select>
                </div>

                <div className="w-full md:w-[50%] mt-4 md:mt-6">
                  <div className="font-medium text-[#171717] text-xs md:text-sm ">
                    Property Type :<span className="px-1 text-red-500">*</span>
                  </div>
                  <select
                    name="property_type"
                    value={ListingDetails?.property_type}
                    onChange={onInputChange}
                    className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                  >
                    <option value="">Select property type</option>
                    <option value="Acreage/Semi-Rural">
                      Acreage/Semi-Rural
                    </option>
                    <option value="Alpine">Alpine</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Block Of Units">Block Of Units</option>
                    <option value="Duplex / Semi-detached">
                      Duplex/Semi-detached
                    </option>
                    <option value="Flat">Flat</option>
                    <option value="House">House</option>
                    <option value="House&Land">House & Land</option>
                    <option value="Retirement Living">Retirement Living</option>
                    <option value="Serviced Apartment">
                      Serviced Apartment
                    </option>
                    <option value="Studio">Studio</option>
                    <option value="Terrace">Terrace</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Unit">Unit</option>
                    <option value="Villa">Villa</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="w-full md:w-[50%] mt-4 md:mt-6">
                  <div className="font-medium text-[#171717] text-xs md:text-sm ">
                    New or Established :
                    <span className="px-1 text-red-500">*</span>
                  </div>
                  <div className="flex flex-wrap flex-row justify-start items-center gap-4 my-3">
                    {NewOrEstablished?.length > 0 &&
                      NewOrEstablished?.map((d, index) => (
                        <div
                          key={index}
                          className={`flex justify-center items-center gap-3 border  rounded-3xl font-medium text-xs md:text-sm cursor-pointer py-2 px-5 ${ListingDetails?.new_or_established_checked ===
                            d?.name &&
                            `text-[#E5002A] bg-[#FFEAEF] border-[#E5002A]`
                            }`}
                          onClick={() => {
                            setListingDetails({
                              ...ListingDetails,
                              new_or_established_checked: d?.name,
                            });
                          }}
                        >
                          <div>{d?.title}</div>
                          <div className="grid place-content-center rounded-2xl">
                            <input
                              type="checkbox"
                              checked={
                                ListingDetails?.new_or_established_checked ===
                                d?.name
                              }
                              name={d?.name}
                              className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
                  <div className="w-full">
                    <div className="font-medium text-[#171717] text-xs md:text-sm">
                      Lead Agent :<span className="px-1 text-red-500">*</span>
                    </div>
                    <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                      <select
                        name="lead_agent"
                        // defaultValue={"rtfg"}
                        onChange={onInputChange}
                        className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                      >
                        <option value={JSON.stringify({ id: "", name: "" })}>
                          Select lead agent
                        </option>

                        {AgentsInfo?.map((d, index) => (
                          <option
                            key={index}
                            value={
                              ListingDetails?.lead_agent === d?._id
                                ? ListingDetails?.lead_agent?._id
                                : d?._id
                            }
                            selected={
                              ListingDetails?.lead_agent === d?._id
                                ? d?.name
                                : ""
                            }
                          >
                            {d?.name}
                          </option>
                        ))}
                      </select>
                      <div className="w-5 group relative flex justify-center">
                        <img
                          src={questionMark}
                          alt="icon"
                          className="w-5 cursor-pointer"
                        />
                        <span className="w-60 lg:w-80 absolute z-50 top-8 right-0 scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 text-xs text-[#171717]">
                          Price is used to determine the listing's relevance in
                          search results. Price will display on the property
                          unless the option to hide price is used.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="font-medium text-[#171717] text-xs md:text-sm">
                      Authority :
                    </div>
                    <select
                      name="authority"
                      value={ListingDetails?.authority}
                      onChange={onInputChange}
                      className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                    >
                      <option value="">Select authority</option>
                      <option value="Fully">Fully</option>
                      <option value="Partially">Partially</option>
                    </select>
                  </div>
                </div>

                <div className="w-full md:w-[50%] mt-4 md:mt-6">
                  <div className="font-medium text-[#171717] text-xs md:text-sm ">
                    Price :<span className="px-1 text-red-500">*</span>
                  </div>
                  <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                    <input
                      type="text"
                      value={ListingDetails?.price}
                      name="price"
                      onChange={onInputChange}
                      placeholder="Enter price"
                      className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                    />

                    <div className="w-5 group relative flex justify-center">
                      <img
                        src={questionMark}
                        alt="icon"
                        className="w-5 cursor-pointer"
                      />
                      <span className="w-60 lg:w-80 absolute z-50 top-8 right-0 scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 text-xs text-[#171717]">
                        Price is used to determine the listing's relevance in
                        search results. Price will display on the property
                        unless the option to hide price is used.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-[50%] mt-4 md:mt-6">
                  <div className="font-medium text-[#171717] text-xs md:text-sm ">
                    Price Display :
                  </div>

                  <div className="w-full flex flex-col justify-start items-start gap-3 mt-3">
                    {PriceDisplay?.length > 0 &&
                      PriceDisplay?.map((d, index) => (
                        <div
                          key={index}
                          className="flex flex-row justify-start items-center gap-2"
                        >
                          <div
                            className={`flex justify-center items-center gap-3 border  rounded-3xl font-medium text-xs md:text-sm cursor-pointer py-2 px-5 ${ListingDetails?.price_display_checked ===
                              d?.name &&
                              `text-[#E5002A] bg-[#FFEAEF] border-[#E5002A]`
                              }`}
                            onClick={() => {
                              setListingDetails({
                                ...ListingDetails,
                                price_display_checked: d?.name,
                              });
                            }}
                          >
                            <div>{d?.title}</div>
                            <div className="grid place-content-center rounded-2xl">
                              <input
                                type="checkbox"
                                checked={
                                  ListingDetails?.price_display_checked ===
                                  d?.name
                                }
                                name={d?.name}
                                className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                              />
                            </div>
                          </div>

                          <div className="w-5 group relative flex justify-center">
                            <img
                              src={questionMark}
                              alt="icon"
                              className="w-5 cursor-pointer"
                            />
                            <span className="w-60 lg:w-80 absolute z-50 top-8 right-0 scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 text-xs text-[#171717]">
                              The price entered will be shown on the website.
                              You can enter alternative price display text in
                              the Optional Price Text field or hide the price on
                              the website and "Contact agent', will be shown in
                              place of the price if preferred.
                            </span>
                          </div>
                        </div>
                      ))}

                    <input
                      type="text"
                      value={ListingDetails?.price_display}
                      name="price_display"
                      onChange={onInputChange}
                      placeholder="Enter price"
                      className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                    />
                  </div>
                </div>
                <div className="w-full md:w-[80%] rounded-md bg-[#FFFBEB] p-4 font-medium text-xs md:text-sm text-[#171717] mt-4 md:mt-6">
                  <span className="font-semibold">Note : </span>
                  {`  `} If the display price is not within 10% of the search
                  price, the listing will be published with the display price
                  'Awaiting Price Guide'.
                </div>

                {/* <div className="flex justify-start items-center gap-2 md:text-sm px-2  mt-4 md:mt-6">
                  <input
                    type="checkbox"
                    checked={
                      ListingCheckboxs?.Hide_the_price_and_display_contact_agent
                    }
                    name="Hide_the_price_and_display_contact_agent"
                    onChange={onCheckboxChange}
                    className="w-4 accent-[#E5002A] cursor-pointer"
                  />
                  <div className="text-[#737373] font-semibold text-xs md:text-sm ">
                    Hide the price and display ‘Contact Agent’
                  </div>
                  <div className="w-4 group relative flex justify-center">
                    <img
                      src={questionMark}
                      alt="icon"
                      className="w-4  cursor-pointer"
                    />
                    <span className="w-60 lg:w-80 absolute z-50 top-8 right-0 scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 text-xs text-[#171717]">
                      Contents of the alternative price text will display in
                      place of the 'Price' or default 'Contact agent, if none
                      entered.
                      <br />
                      <br />
                      This field should not be used to enter the lister name or
                      phone number
                    </span>
                  </div>
                </div> */}

                <div className="border-b-2 border-[#E5E5E5] my-4 md:my-8" />

                <div className="font-semibold text-[#404040] text-sm md:text-base lg:text-lg mt-6 md:mt-12">
                  Vendor details
                </div>

                <div className="w-full flex flex-col md:flex-row justify-start items-center gap-4 mt-4 md:mt-6">
                  <div className="w-full md:w-[32%]">
                    <div className="font-medium text-[#171717] text-xs md:text-sm ">
                      Name :
                    </div>
                    <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                      <input
                        type="text"
                        value={ListingDetails?.name}
                        name="name"
                        onChange={onInputChange}
                        placeholder="Enter name"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-[32%]">
                    <div className="font-medium text-[#171717] text-xs md:text-sm ">
                      Email :
                    </div>
                    <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                      <input
                        type="email"
                        value={ListingDetails?.email}
                        name="email"
                        onChange={onInputChange}
                        placeholder="Enter email"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                      />

                      <div className="w-4 group relative flex justify-center">
                        <img
                          src={questionMark}
                          alt="icon"
                          className="w-4 cursor-pointer"
                        />
                        <span className="w-60 lg:w-80 absolute z-50 top-8 right-0 scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 text-xs text-[#171717]">
                          You may enter multiple email addresses separated by a
                          comma (e.g mary@email.com, john@email.com)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-[32%]">
                    <div className="font-medium text-[#171717] text-xs md:text-sm ">
                      Phone Number :
                    </div>
                    <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                      <input
                        type="number"
                        value={ListingDetails?.phone_number}
                        name="phone_number"
                        onChange={onInputChange}
                        placeholder="Enter phone number"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                      />
                    </div>
                  </div>
                </div>

                <div className="font-medium text-[#171717] text-xs md:text-sm mt-4 md:mt-6">
                  Communication Preferences
                </div>

                <div className="flex justify-start items-center gap-3 md:text-sm px-2  mt-4 md:mt-6">
                  <input
                    type="checkbox"
                    checked={
                      ListingCheckboxs?.send_vendor_the_property_live_email_when_listing_is_published
                    }
                    name="send_vendor_the_property_live_email_when_listing_is_published"
                    onChange={onCheckboxChange}
                    className="w-4 accent-[#E5002A] cursor-pointer"
                  />
                  <div className="text-[#525252] font-semibold text-xs md:text-sm ">
                    Send vendor the
                    <span className="text-[#3B8FD4]">
                      {`  `}Property Live email{`  `}
                    </span>
                    when listing is published
                  </div>
                  <div className="w-5 group relative flex justify-center">
                    <img
                      src={questionMark}
                      alt="icon"
                      className="w-5  cursor-pointer"
                    />
                    <span className="w-60 lg:w-80 absolute z-50 top-8 right-0 scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 text-xs text-[#171717]">
                      The Property Live email is sent to the vendor informing
                      them that the listing has been published.
                    </span>
                  </div>
                </div>

                <div className="flex justify-start items-center gap-3 md:text-sm px-2  mt-2">
                  <input
                    type="checkbox"
                    checked={
                      ListingCheckboxs?.send_vendor_a_weekly_campaign_activity_report_email
                    }
                    name="send_vendor_a_weekly_campaign_activity_report_email"
                    onChange={onCheckboxChange}
                    className="w-4 accent-[#E5002A] cursor-pointer"
                  />
                  <div className="text-[#525252] font-semibold text-xs md:text-sm ">
                    Send vendor a weekly
                    <span className="text-[#3B8FD4]">
                      {`  `}Campaign Activity Report email
                    </span>
                  </div>
                  <div className="w-5 group relative flex justify-center">
                    <img
                      src={questionMark}
                      alt="icon"
                      className="w-5  cursor-pointer"
                    />
                    <span className="w-60 lg:w-80 absolute z-50 top-8 right-0 scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 text-xs text-[#171717]">
                      The Property Live email is sent to the vendor informing
                      them that the listing has been published.
                    </span>
                  </div>
                </div>

                <div className="font-semibold text-[#404040] text-sm md:text-base lg:text-lg mt-6 md:mt-12">
                  Property Address
                </div>

                <div className="w-full md:w-[50%] mt-4 md:mt-6">
                  <div className="font-medium text-[#171717] text-xs md:text-sm ">
                    Unit :
                  </div>
                  <input
                    type="text"
                    value={ListingDetails?.unit}
                    name="unit"
                    onChange={onInputChange}
                    placeholder="Enter Unit"
                    className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                  />
                </div>

                <div className="w-full md:w-[50%] mt-4 md:mt-6">
                  <div className="font-medium text-[#171717] text-xs md:text-sm ">
                    Street Address :{" "}
                    <span className="px-1 text-red-500">*</span>
                  </div>
                  <div className="flex flex-row justify-start items-center gap-2">
                    <input
                      type="number"
                      value={ListingDetails?.street_address_number}
                      name="street_address_number"
                      onChange={onInputChange}
                      placeholder="Number"
                      className="w-[30%] font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-4  mt-3"
                    />
                    <input
                      type="text"
                      value={ListingDetails?.street_address_name}
                      name="street_address_name"
                      onChange={onInputChange}
                      placeholder="Enter Street Name"
                      className="w-[70%] font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-4 mt-3"
                    />
                  </div>
                </div>

                <div className="flex justify-start items-center gap-3 md:text-sm px-2  mt-4 md:mt-6">
                  <input
                    type="checkbox"
                    checked={ListingCheckboxs?.hide_street_address_on_listing}
                    name="hide_street_address_on_listing"
                    onChange={onCheckboxChange}
                    className="w-4 accent-[#E5002A] cursor-pointer"
                  />
                  <div className="text-[#525252] font-semibold text-xs md:text-sm ">
                    Hide street address on listing
                  </div>
                  <div className="w-5 group relative flex justify-center">
                    <img
                      src={questionMark}
                      alt="icon"
                      className="w-5  cursor-pointer"
                    />
                    <span className="w-60 lg:w-80 absolute z-50 top-8 right-0 scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 text-xs text-[#171717]">
                      If you elect to hide the street address, only the suburb
                      will be shown on the website and the street view will be
                      disabled automatically.
                    </span>
                  </div>
                </div>

                <div className="flex justify-start items-center gap-3 md:text-sm px-2  mt-2">
                  <input
                    type="checkbox"
                    checked={ListingCheckboxs?.hide_street_view}
                    name="hide_street_view"
                    onChange={onCheckboxChange}
                    className="w-4 accent-[#E5002A] cursor-pointer"
                  />
                  <div className="text-[#525252] font-semibold text-xs md:text-sm ">
                    Hide street view
                  </div>
                  <div className="w-4 group relative flex justify-center">
                    <img
                      src={questionMark}
                      alt="icon"
                      className="w-4  cursor-pointer"
                    />
                    <span className="w-60 lg:w-80 absolute z-50 top-8 right-0 scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 text-xs text-[#171717]">
                      If you elect to hide the street address, only the suburb
                      will be shown on the website and the street view will be
                      disabled automatically.
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-[50%] mt-4 md:mt-6">
                  <div className="font-medium text-[#171717] text-xs md:text-sm ">
                    Suburb : <span className="px-1 text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    value={ListingDetails?.suburb}
                    name="suburb"
                    onChange={onInputChange}
                    placeholder="Enter Suburb"
                    className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                  />
                </div>

                <div className="w-full md:w-[50%] mt-4 md:mt-6">
                  <div className="font-medium text-[#171717] text-xs md:text-sm ">
                    Municipality :
                  </div>
                  <input
                    type="text"
                    value={ListingDetails?.municipality}
                    name="municipality"
                    onChange={onInputChange}
                    placeholder="Enter Municipality"
                    className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                  />
                </div>

                <div className="font-semibold text-[#404040] text-sm md:text-base lg:text-lg mt-6 md:mt-12">
                  Auction Outcome
                </div>

                <div className="w-full md:w-[50%] mt-4 md:mt-6">
                  <div className="font-medium text-[#171717] text-xs md:text-sm ">
                    Auction Result :
                  </div>
                  <select
                    name="auction_result"
                    value={ListingDetails?.auction_result}
                    onChange={onInputChange}
                    className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                  >
                    <option value="To be determined">To be determined</option>
                    <option value="Sold Prior to Auction">
                      Sold Prior to Auction
                    </option>
                    <option value="Sold at Auction">Sold at Auction</option>
                    <option value="Passed in">Passed in</option>
                    <option value="Passed in - Vendor Bid">
                      Passed in - Vendor Bid
                    </option>
                    <option value="Withdrawn">Withdrawn</option>
                    <option value="Sold after Auction">
                      Sold after Auction
                    </option>
                  </select>
                </div>

                <div className="w-full md:w-[50%] mt-4 md:mt-6">
                  <div className="font-medium text-[#171717] text-xs md:text-sm ">
                    Maximum Bid :
                  </div>
                  <input
                    type="number"
                    value={ListingDetails?.maximum_bid}
                    name="maximum_bid"
                    onChange={onInputChange}
                    placeholder="e.g 500000"
                    className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                  />
                </div>

                <div className="border-b-2 border-[#E5E5E5] my-6 " />

                <div className="flex flex-row justify-start items-center gap-4">
                  <button
                    className="bg-[#E5002A] text-white font-medium text-sm px-5 py-3 rounded-3xl shadow outline-none"
                    onClick={(e) => {
                      setisActive(AllTabs?.[1]);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Save and Continue
                  </button>
                </div>
              </div>
            )}

            {/* -------- Property details -------- */}

            {isActive === AllTabs?.[1] && (
              <div className="">
                <div className="text-[#737373] font-medium text-xs md:text-sm my-3">
                  <span className="text-[#E5002A] pr-2">*</span>
                  Madatory information is marked with a asterisk
                </div>

                <div className="font-semibold text-[#404040] text-lg md:text-xl lg:text-2xl mt-6 md:mt-12">
                  About the Property
                </div>

                <div className="border-b-2 border-[#E5E5E5] my-4 " />

                {/* ---------  Bedrooms, Bathrooms --------- */}

                <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                  Bedrooms, Bathrooms
                  <div>
                    <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                      Bedrooms
                      {/* <span className="px-1 text-red-500">*</span> */}
                    </div>
                    <div className="flex justify-start items-center overflow-x-auto gap-4 my-2 py-2">
                      {Bedrooms?.length > 0 &&
                        Bedrooms?.map((d, index) => (
                          <div
                            key={index}
                            className={`${normalBox} ${ListingDetails?.Bedrooms === d?.name
                              ? selectedBox
                              : ""
                              }`}
                            onClick={() => {
                              setListingDetails({
                                ...ListingDetails,
                                Bedrooms: d?.name,
                              });
                            }}
                          >
                            {d?.title}
                          </div>
                        ))}
                    </div>

                    <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                      Bathrooms
                      {/* <span className="px-1 text-red-500">*</span> */}
                    </div>
                    <div className="flex justify-start items-center overflow-x-auto gap-4 my-2 py-2">
                      {Bathrooms?.length > 0 &&
                        Bathrooms?.map((d, index) => (
                          <div
                            key={index}
                            className={`${normalBox} ${ListingDetails?.Bathrooms === d?.name
                              ? selectedBox
                              : ""
                              }`}
                            onClick={() => {
                              setListingDetails({
                                ...ListingDetails,
                                Bathrooms: d?.name,
                              });
                            }}
                          >
                            {d?.title}
                          </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-start items-center gap-2">
                      <div className="w-full md:w-[50%] mt-4 md:mt-6">
                        <div className="font-medium text-[#171717] text-xs md:text-sm ">
                          Ensuitest :
                        </div>
                        <input
                          type="text"
                          value={ListingDetails?.Ensuites}
                          name="Ensuites"
                          onChange={onInputChange}
                          placeholder="Enter Ensuites"
                          className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                        />
                      </div>

                      <div className="w-full md:w-[50%] mt-4 md:mt-6">
                        <div className="font-medium text-[#171717] text-xs md:text-sm ">
                          Toilets :
                        </div>
                        <input
                          type="text"
                          value={ListingDetails?.toilets}
                          name="toilets"
                          onChange={onInputChange}
                          placeholder="Enter Toilets"
                          className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b-2 border-[#E5E5E5] my-4 " />

                {/* ---------  Parking --------- */}

                <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                  Parking
                  <div>
                    <div className="w-full flex flex-col md:flex-row justify-start items-center gap-4 mt-4 md:mt-6">
                      <div className="w-full md:w-[32%]">
                        <div className="font-medium text-[#171717] text-xs md:text-sm ">
                          Garage spaces
                        </div>
                        <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                          <input
                            type="text"
                            value={ListingDetails?.garage_spaces}
                            name="garage_spaces"
                            onChange={onInputChange}
                            placeholder="Enter Garage spaces"
                            className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                          />
                        </div>
                      </div>

                      <div className="w-full md:w-[32%]">
                        <div className="font-medium text-[#171717] text-xs md:text-sm ">
                          Carport spaces
                        </div>
                        <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                          <input
                            type="text"
                            value={ListingDetails?.carport_spaces}
                            name="carport_spaces"
                            onChange={onInputChange}
                            placeholder="Enter Carport spaces"
                            className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                          />
                        </div>
                      </div>

                      <div className="w-full md:w-[32%]">
                        <div className="font-medium text-[#171717] text-xs md:text-sm ">
                          Open spaces
                        </div>
                        <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                          <input
                            type="text"
                            value={ListingDetails?.open_spaces}
                            name="open_spaces"
                            onChange={onInputChange}
                            placeholder="Enter Open spaces"
                            className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                          />

                          <div className="w-5 group relative flex justify-center">
                            <img
                              src={questionMark}
                              alt="icon"
                              className="w-5 cursor-pointer"
                            />
                            <span className="w-60 lg:w-80 absolute z-50 top-8 right-0 scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 text-xs text-[#171717]">
                              Open spaces
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-start items-center gap-2">
                      <div className="w-full md:w-[50%] mt-4 md:mt-6">
                        <div className="font-medium text-[#171717] text-xs md:text-sm ">
                          Energy efficiensy rating
                        </div>
                        <select
                          name="energy_efficiensy_rating"
                          value={ListingDetails?.energy_efficiensy_rating}
                          onChange={onInputChange}
                          className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                        >
                          <option value="">Select Energy efficiensy</option>
                          <option value="1.0">1.0</option>
                          <option value="2.0">2.0</option>
                          <option value="3.0">3.0</option>
                        </select>
                      </div>

                      <div className="w-full md:w-[50%] mt-4 md:mt-6">
                        <div className="font-medium text-[#171717] text-xs md:text-sm ">
                          Living Areas
                        </div>
                        <input
                          type="text"
                          value={ListingDetails?.living_areas}
                          name="living_areas"
                          onChange={onInputChange}
                          placeholder="Enter Living areas Spaces"
                          className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-start items-center gap-2">
                      <div className="w-full md:w-[50%] mt-4 md:mt-6">
                        <div className="font-medium text-[#171717] text-xs md:text-sm ">
                          House Size
                        </div>
                        <div className="h-full w-full flex flex-row justify-start items-center gap-2 border border-[#E5E5E5] rounded-3xl mt-3 py-2 px-5">
                          <input
                            type="text"
                            value={ListingDetails?.house_size}
                            name="house_size"
                            onChange={onInputChange}
                            placeholder="Enter House Size"
                            className="w-[70%] font-medium text-[#737373] text-xs md:text-sm outline-none border-r border-r-[#E5E5E5] py-1"
                          />
                          <select
                            name="house_size_square"
                            value={ListingDetails?.house_size_square}
                            onChange={onInputChange}
                            className="w-[30%] font-medium !text-[#737373] text-xs md:text-sm outline-none py-1"
                          >
                            {/* <option value="Square">Square</option> */}
                            <option value="Square metres">Square metres</option>
                          </select>
                        </div>
                      </div>

                      <div className="w-full md:w-[50%] mt-4 md:mt-6">
                        <div className="font-medium text-[#171717] text-xs md:text-sm ">
                          Land Size
                        </div>
                        <div className="h-full w-full flex flex-row justify-start items-center gap-2 border border-[#E5E5E5] rounded-3xl mt-3 py-2 px-5">
                          <input
                            type="text"
                            value={ListingDetails?.land_size}
                            name="land_size"
                            onChange={onInputChange}
                            placeholder="Enter Land Size"
                            className="w-[70%] font-medium text-[#737373] text-xs md:text-sm outline-none border-r border-r-[#E5E5E5] py-1"
                          />
                          <select
                            name="land_size_square"
                            value={ListingDetails?.land_size_square}
                            onChange={onInputChange}
                            className="w-[30%] font-medium !text-[#737373] text-xs md:text-sm outline-none py-1"
                          >
                            <option value="Square metres">Square metres</option>
                            {/* <option value="Square">Square</option> */}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b-2 border-[#E5E5E5] my-4 " />

                {/* ---------  Search refinement options --------- */}

                <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                  Search refinement options
                  <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                    Outdoor Features
                  </div>
                  <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                    {OutdoorFeatures?.length > 0 &&
                      OutdoorFeatures?.map((d, index) => (
                        <div
                          key={index}
                          className={`${normalBox} ${ListingCheckboxs?.outdoor_features?.some(
                            (data) => data === d?.name
                          )
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            const isSelected =
                              ListingCheckboxs?.outdoor_features?.some(
                                (data) => data === d?.name
                              );
                            let updatedFeatures;
                            if (isSelected) {
                              // Item is already selected, remove it from the array
                              updatedFeatures =
                                ListingCheckboxs.outdoor_features?.filter(
                                  (data) => data !== d?.name
                                );
                            } else {
                              // Item is not selected, add it to the array
                              updatedFeatures = [
                                ...ListingCheckboxs.outdoor_features,
                                d?.name,
                              ];
                            }
                            setListingCheckboxs({
                              ...ListingCheckboxs,
                              outdoor_features: updatedFeatures,
                            });
                          }}
                        >
                          {d?.title}
                          {ListingCheckboxs?.outdoor_features
                            ?.filter((data) => data == d?.name)
                            .map((filteredData) => (
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  name={d?.name}
                                  defaultChecked={ListingCheckboxs?.outdoor_features?.filter(
                                    (data) => data === d?.name
                                  )}
                                  className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                />
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                  <div className="border-b border-[#E5E5E5] my-4 " />
                  <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                    Indoor Features
                  </div>
                  <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                    {IndoorFeatures?.length > 0 &&
                      IndoorFeatures?.map((d, index) => (
                        <div
                          key={index}
                          className={`${normalBox} ${ListingCheckboxs?.indoor_features?.some(
                            (data) => data === d?.name
                          )
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            const isSelected =
                              ListingCheckboxs?.indoor_features?.some(
                                (data) => data === d?.name
                              );
                            let updatedFeatures;
                            if (isSelected) {
                              // Item is already selected, remove it from the array
                              updatedFeatures =
                                ListingCheckboxs.indoor_features?.filter(
                                  (data) => data !== d?.name
                                );
                            } else {
                              // Item is not selected, add it to the array
                              updatedFeatures = [
                                ...ListingCheckboxs.indoor_features,
                                d?.name,
                              ];
                            }
                            setListingCheckboxs({
                              ...ListingCheckboxs,
                              indoor_features: updatedFeatures,
                            });
                          }}
                        >
                          {d?.title}
                          {ListingCheckboxs?.indoor_features
                            ?.filter((data) => data == d?.name)
                            .map((filteredData) => (
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  name={d?.name}
                                  defaultChecked={ListingCheckboxs?.indoor_features?.filter(
                                    (data) => data === d?.name
                                  )}
                                  className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                />
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                  <div className="border-b border-[#E5E5E5] my-4 " />
                  <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                    Heating / Cooling
                  </div>
                  <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                    {HeatingOrCooling?.length > 0 &&
                      HeatingOrCooling?.map((d, index) => (
                        <div
                          key={index}
                          className={`${normalBox} ${ListingCheckboxs?.heating_cooling?.some(
                            (data) => data === d?.name
                          )
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            const isSelected =
                              ListingCheckboxs?.heating_cooling?.some(
                                (data) => data === d?.name
                              );
                            let updatedFeatures;
                            if (isSelected) {
                              // Item is already selected, remove it from the array
                              updatedFeatures =
                                ListingCheckboxs.heating_cooling?.filter(
                                  (data) => data !== d?.name
                                );
                            } else {
                              // Item is not selected, add it to the array
                              updatedFeatures = [
                                ...ListingCheckboxs.heating_cooling,
                                d?.name,
                              ];
                            }
                            setListingCheckboxs({
                              ...ListingCheckboxs,
                              heating_cooling: updatedFeatures,
                            });
                          }}
                        >
                          {d?.title}
                          {ListingCheckboxs?.heating_cooling
                            ?.filter((data) => data == d?.name)
                            .map((filteredData) => (
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  name={d?.name}
                                  defaultChecked={ListingCheckboxs?.heating_cooling?.filter(
                                    (data) => data === d?.name
                                  )}
                                  className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                />
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                  <div className="border-b border-[#E5E5E5] my-4 " />
                  <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                    Eco Friendly Features
                  </div>
                  <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                    {EcoFriendlyFeatures?.length > 0 &&
                      EcoFriendlyFeatures?.map((d, index) => (
                        <div
                          key={index}
                          className={`${normalBox} ${ListingCheckboxs?.eco_friendly?.some(
                            (data) => data === d?.name
                          )
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            const isSelected =
                              ListingCheckboxs?.eco_friendly?.some(
                                (data) => data === d?.name
                              );
                            let updatedFeatures;
                            if (isSelected) {
                              // Item is already selected, remove it from the array
                              updatedFeatures =
                                ListingCheckboxs?.eco_friendly?.filter(
                                  (data) => data !== d?.name
                                );
                            } else {
                              // Item is not selected, add it to the array
                              updatedFeatures = [
                                ...ListingCheckboxs?.eco_friendly,
                                d?.name,
                              ];
                            }
                            setListingCheckboxs({
                              ...ListingCheckboxs,
                              eco_friendly: updatedFeatures,
                            });
                          }}
                        >
                          {d?.title}
                          {ListingCheckboxs?.eco_friendly
                            ?.filter((data) => data == d?.name)
                            .map((filteredData) => (
                              <div className="grid place-content-center rounded-2xl">
                                {console.log(
                                  ListingCheckboxs?.eco_friendly?.filter(
                                    (data) => data === d?.name
                                  )
                                )}
                                <input
                                  type="checkbox"
                                  name={d?.name}
                                  defaultChecked={ListingCheckboxs?.eco_friendly?.filter(
                                    (data) => data === d?.name
                                  )}
                                  className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                />
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="border-b-2 border-[#E5E5E5] my-4 " />

                {/* ---------  Climate Changer & Energy Saver --------- */}

                <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                  Climate Changer & Energy Saver
                  <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                    {ClimateChangerAndEnergySaver?.length > 0 &&
                      ClimateChangerAndEnergySaver?.map((d, index) => (
                        <div
                          key={index}
                          className={`${normalBox} ${ListingCheckboxs?.climate_energy?.some(
                            (data) => data === d?.name
                          )
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            const isSelected =
                              ListingCheckboxs?.climate_energy?.some(
                                (data) => data === d?.name
                              );
                            let updatedFeatures;
                            if (isSelected) {
                              // Item is already selected, remove it from the array
                              updatedFeatures =
                                ListingCheckboxs.climate_energy?.filter(
                                  (data) => data !== d?.name
                                );
                            } else {
                              // Item is not selected, add it to the array
                              updatedFeatures = [
                                ...ListingCheckboxs.climate_energy,
                                d?.name,
                              ];
                            }
                            setListingCheckboxs({
                              ...ListingCheckboxs,
                              climate_energy: updatedFeatures,
                            });
                          }}
                        >
                          {d?.title}

                          {ListingCheckboxs?.climate_energy
                            ?.filter((data) => data == d?.name)
                            .map((filteredData) => (
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  name={d?.name}
                                  defaultChecked={ListingCheckboxs?.climate_energy?.filter(
                                    (data) => data === d?.name
                                  )}
                                  className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                />
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="border-b-2 border-[#E5E5E5] my-4 " />

                {/* ---------  Other Features --------- */}

                {/* <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                  Other Features
                  <div className="w-full mt-4 md:mt-6">
                    <div className="font-medium text-[#171717] text-xs md:text-sm ">
                      Open spaces
                    </div>
                    <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                      <input
                        type="text"
                        value={ListingDetails?.other_features}
                        name="other_features"
                        onChange={onInputChange}
                        placeholder="Enter Open spaces"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                      />

                      <div className="w-5 group relative flex justify-center">
                        <img
                          src={questionMark}
                          alt="icon"
                          className="w-5 cursor-pointer"
                        />
                        <span className="w-60 lg:w-80 absolute z-50 top-8 right-0 scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 text-xs text-[#171717]">
                          other features
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b-2 border-[#E5E5E5] my-4 " /> */}

                {/* ---------  Buttons--------- */}

                <div className="flex flex-row justify-start items-center gap-4">
                  <button
                    className="bg-[#E5002A] text-white font-medium text-sm px-5 py-3 rounded-3xl shadow outline-none"
                    onClick={(e) => {
                      setisActive(AllTabs?.[2]);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Save and Continue
                  </button>
                </div>
              </div>
            )}

            {/* -------- Image and Copy -------- */}

            {isActive === AllTabs?.[2] && (
              <div className="">
                <div className="text-[#737373] font-medium text-xs md:text-sm my-3">
                  <span className="text-[#E5002A] pr-2">*</span>
                  Madatory information is marked with a asterisk
                </div>

                <div className="font-semibold text-[#404040] text-lg md:text-xl lg:text-2xl mt-6 md:mt-12">
                  Listing copy
                </div>

                <div className="border-b-2 border-[#E5E5E5] my-4 " />

                <div className="border border-[#D4D4D4] rounded-xl p-5 mb-10">
                  <div className="">
                    <div className="font-medium text-[#171717] text-xs md:text-sm">
                      Heading<span className="px-1 text-red-500">*</span>
                    </div>
                    <div className="font-medium text-[#171717] text-xs md:text-sm mt-2">
                      Charaacters : 26/150
                    </div>
                    <textarea
                      rows={5}
                      type="text"
                      value={ListingDetails?.heading}
                      name="heading"
                      onChange={onInputChange}
                      placeholder="Type here...."
                      className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-xl py-3 px-5  mt-3"
                    />
                  </div>

                  <div className="mt-4">
                    <div className="font-medium text-[#171717] text-xs md:text-sm">
                      Discription<span className="px-1 text-red-500">*</span>
                    </div>
                    <textarea
                      rows={5}
                      type="text"
                      value={ListingDetails?.discription}
                      name="discription"
                      onChange={onInputChange}
                      placeholder="Type here...."
                      className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-xl py-3 px-5  mt-3"
                    />
                  </div>
                </div>

                <div className="font-semibold text-[#404040] text-lg md:text-xl lg:text-2xl my-4 md:my-6">
                  Property image
                </div>

                <div
                  className={`border-2 border-dashed border-[#737373] bg-[#FAFAFA] rounded-2xl cursor-pointer px-5 mb-12`}
                >
                  <label
                    htmlFor="propertyImg"
                    className="flex flex-col md:flex-row justify-center items-center gap-2 py-10 xl:py-24 cursor-pointer"
                    onClick={() => { }}
                  >
                    <input
                      id="propertyImg"
                      type="file"
                      name="propertyImg"
                      multiple
                      ref={propertyInputRef}
                      onChange={(e) => { onChangeImages(e); onPropertyImageUpload() }}
                    />
                    <img src={dragImgIcon} alt="icon" className="w-8 lg:w-12" />
                    <div className="flex flex-row flex-wrap justify-center items-center gap-2 font-semibold text-center text-xs md:text-base lg:text-lg text-[#171717]">
                      Drag an image here or {`  `}
                      <span className="font-semibold  text-[#E5002A]">
                        Upload a file
                      </span>
                      <div className="w-4 group relative flex justify-center">
                        <img
                          src={questionMark}
                          alt="icon"
                          className="w-4 cursor-pointer"
                        />
                        <span className="w-60 lg:w-80 absolute z-50 top-8 -right-[65px] scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 font-medium text-start text-xs text-[#171717]">
                          Images should be in JPG, GIF or PNG format with a
                          recommendation of a 4:3 ratio(for example, 800px"
                          600px image). Animated GIFs are not allowed.
                          Displaying photos of properties other than the
                          property for sale or lease is not acceptable. Too
                          Early for Picture or images of cartoon houses are also
                          not acceptable.
                          <br />
                          <br />
                          Inserting a business or agency logo as a picture in a
                          property listing is not acceptable unless it takes the
                          form of a transparent watermark inserted in one corner
                          of the image with dimensions no greater than 10% of
                          the total image size.
                        </span>
                      </div>
                    </div>
                  </label>
                </div>

                {ListingImages?.propertyImgShow?.length > 0 && (
                  <div className="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-5 ">
                    {ListingImages?.propertyImgShow?.map((d, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer"
                      >
                        <img
                          src={d}
                          alt=""
                          className="h-48 w-48 brightness-100 group-hover:brightness-50 rounded-md cursor-pointer"
                        />

                        <div className="h-48 w-48 opacity-0 group-hover:opacity-100 absolute top-[40%] left-[42%] cursor-pointer">
                          <img
                            src={deleteiconRed}
                            alt=""
                            name="propertyImg"
                            className="bg-[#FFCCD3] p-2 rounded-md cursor-pointer"
                            onClick={(e) =>
                              onDeleteImages(index, "propertyImg")
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="font-semibold text-[#404040] text-lg md:text-xl lg:text-2xl my-4 md:my-6">
                  Flore plans image
                </div>

                <div
                  className={`border-2 border-dashed border-[#737373] bg-[#FAFAFA] rounded-2xl cursor-pointer px-5 mb-12`}
                >
                  <label
                    htmlFor="florePlansImg"
                    className="flex flex-col md:flex-row justify-center items-center gap-2 py-10 xl:py-24 cursor-pointer"
                    onClick={() => { }}
                  >
                    <input
                      id="florePlansImg"
                      type="file"
                      multiple
                      name="florePlansImg"
                      ref={florInputRef}
                      onChange={(e) => { onChangeImages(e); onFlorImageUpload() }}
                    />
                    <img src={dragImgIcon} alt="icon" className="w-8 lg:w-12" />
                    <div className="flex flex-row flex-wrap justify-center items-center gap-2 font-semibold text-center text-xs md:text-base lg:text-lg text-[#171717]">
                      Drag an image here or {`  `}
                      <span className="font-semibold  text-[#E5002A]">
                        Upload a file
                      </span>
                      <div className="w-4 group relative flex justify-center">
                        <img
                          src={questionMark}
                          alt="icon"
                          className="w-4 cursor-pointer"
                        />
                        <span className="w-60 lg:w-80 absolute z-50 top-8 -right-[65px] scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 font-medium text-start text-xs text-[#171717]">
                          Floorplans should be in JPG, GIF or PNG format.
                          Animated GIFs are not allowed. Displaying photos of
                          properties other than the property for sale or lease
                          is not acceptable. Too Early for Picture' are also not
                          acceptable.
                          <br />
                          <br />
                          Inserting a business or agency logo as a picture in a
                          property listing is not acceptable unless it takes the
                          form of a transparent watermark inserted in one corner
                          of the floorplan with dimensions no greater than 10%
                          of the total floorplan size.
                        </span>
                      </div>
                    </div>
                  </label>
                </div>

                {ListingImages?.florePlansImgShow?.length > 0 && (
                  <div className="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-5 ">
                    {ListingImages?.florePlansImgShow?.map((d, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer"
                      >
                        <img
                          src={d}
                          alt=""
                          className="h-48 w-48 brightness-100 group-hover:brightness-50 rounded-md cursor-pointer"
                        />

                        <div className="h-48 w-48 opacity-0 group-hover:opacity-100 absolute top-[40%] left-[42%] cursor-pointer">
                          <img
                            src={deleteiconRed}
                            alt=""
                            name="florePlansImg"
                            className="bg-[#FFCCD3] p-2 rounded-md cursor-pointer"
                            onClick={(e) =>
                              onDeleteImages(index, "florePlansImg")
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="font-semibold text-[#404040] text-lg md:text-xl lg:text-2xl my-4 md:my-6">
                  Statement of information
                </div>

                <div
                  className={`border-2 border-dashed border-[#737373] bg-[#FAFAFA] rounded-2xl cursor-pointer px-5 mb-12`}
                >
                  <label
                    htmlFor="statementOfInfo"
                    className="flex flex-col md:flex-row justify-center items-center gap-2 py-10 xl:py-24 cursor-pointer"
                    onClick={() => { }}
                  >
                    <input
                      id="statementOfInfo"
                      type="file"
                      name="statementOfInfo"
                      multiple
                      ref={statementInputRef}
                      onChange={(e) => { onChangeImages(e); onStatementUpload() }}
                    />
                    <img src={dragImgIcon} alt="icon" className="w-8 lg:w-12" />
                    <div className="flex flex-row flex-wrap justify-center items-center gap-2 font-semibold text-center text-xs md:text-base lg:text-lg text-[#171717]">
                      Drag the statement of infomation PDF in this area {`  `}
                      <span className="font-semibold  text-[#E5002A]">
                        Upload a file
                      </span>
                      <div className="w-4 group relative flex justify-center">
                        <img
                          src={questionMark}
                          alt="icon"
                          className="w-4 cursor-pointer"
                        />
                        <span className="w-60 lg:w-80 absolute z-50 top-8 -right-[65px] scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 font-medium text-start text-xs text-[#171717]">
                          A Statement of Information is required to be included
                          by real estate agents and agent's representatives on
                          internet advertising under section 47AF of the Estate
                          Agents Act 1980 (Vic.). It is your responsibility to
                          ensure that you comply with the requirements which are
                          available at consumer.vic.gov.au.
                          <br />
                          <br />
                          The Statement of Information must be in PDF format and
                          must be less than 2MB in size.
                        </span>
                      </div>
                    </div>
                  </label>
                </div>

                {ListingImages?.statementOfInfoShow?.length > 0 && (
                  <div className="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-5 ">
                    {ListingImages?.statementOfInfo?.map((d, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer"
                      >
                        <DocumentViewer
                          url={ListingImages?.statementOfInfoShow}
                          className="h-48 w-48 brightness-100 group-hover:brightness-50 rounded-md cursor-pointer"
                        />

                        <div className="h-48 w-48 opacity-0 group-hover:opacity-100 absolute top-[40%] left-[42%] cursor-pointer">
                          <img
                            src={deleteiconRed}
                            alt=""
                            name="statementOfInfo"
                            className="bg-[#FFCCD3] p-2 rounded-md cursor-pointer"
                            onClick={(e) =>
                              onDeleteImages(index, "statementOfInfo")
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="font-semibold text-[#404040] text-lg md:text-xl lg:text-2xl my-4 md:my-6">
                  Front Page Image
                </div>

                <div
                  className={`border-2 border-dashed border-[#737373] bg-[#FAFAFA] rounded-2xl cursor-pointer px-5 mb-12`}
                >
                  <label
                    htmlFor="frontPageImg"
                    className="flex flex-col md:flex-row justify-center items-center gap-2 py-10 xl:py-24 cursor-pointer"
                    onClick={() => { }}
                  >
                    <input
                      id="frontPageImg"
                      type="file"
                      name="frontPageImg"
                      multiple
                      ref={frontPageInputRef}
                      onChange={(e) => { onChangeImages(e); onFrontImageUpload() }}
                    />
                    <img src={dragImgIcon} alt="icon" className="w-8 lg:w-12" />
                    <div className="w-auto md:w-[50%] flex flex-row flex-wrap justify-center items-center gap-2 font-semibold text-center text-xs md:text-base lg:text-lg text-[#171717]">
                      Drag a front page image in this area
                      <br /> Only applicable to residential listing with a
                      front page
                      <div className="w-4 group relative flex justify-center">
                        <img
                          src={questionMark}
                          alt="icon"
                          className="w-4 cursor-pointer"
                        />
                        <span className="w-60 lg:w-80 absolute z-50 top-8 -right-[65px] scale-0 transition-all group-hover:scale-100 rounded shadow-lg bg-[#FFFBEB] p-3 font-medium text-start text-xs text-[#171717]">
                          A Statement of Information is required to be included
                          by real estate agents and agent's representatives on
                          internet advertising under section 47AF of the Estate
                          Agents Act 1980 (Vic.). It is your responsibility to
                          ensure that you comply with the requirements which are
                          available at consumer.vic.gov.au.
                          <br />
                          <br />
                          The Statement of Information must be in PDF format and
                          must be less than 2MB in size.
                        </span>
                      </div>
                    </div>
                  </label>
                </div>

                {ListingImages?.frontPageImgShow?.length > 0 && (
                  <div className="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-5 ">
                    {ListingImages?.frontPageImgShow?.map((d, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer"
                      >
                        <img
                          src={d}
                          alt=""
                          className="h-48 w-48 brightness-100 group-hover:brightness-50 rounded-md cursor-pointer"
                        />

                        <div className="h-48 w-48 opacity-0 group-hover:opacity-100 absolute top-[40%] left-[42%] cursor-pointer">
                          <img
                            src={deleteiconRed}
                            alt=""
                            name="frontPageImg"
                            className="bg-[#FFCCD3] p-2 rounded-md cursor-pointer"
                            onClick={(e) =>
                              onDeleteImages(index, "frontPageImg")
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="font-semibold text-[#404040] text-lg md:text-xl lg:text-2xl my-4 md:my-6">
                  Links
                </div>

                <div className="flex flex-col md:flex-row justify-start items-center gap-4">
                  <div className="w-full md:w-[50%] mt-4 md:mt-6">
                    <div className="font-medium text-[#171717] text-xs md:text-sm ">
                      Video URL
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2 outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5 mt-2">
                      <input
                        type="text"
                        id="video_url"
                        name="video_url"
                        value={ListingDetails?.video_url}
                        onChange={PasteValue}
                        placeholder="Paste URL here"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none"
                      />{" "}
                      <img
                        onClick={getvalue}
                        name="video_url"
                        className="w-5 cursor-pointer"
                        src={pasteRedIcon}
                        alt="img"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-[50%] mt-4 md:mt-6">
                    <div className="font-medium text-[#171717] text-xs md:text-sm ">
                      Online Tour 1
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2 outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5 mt-2">
                      <input
                        type="text"
                        id="online_tour_1"
                        name="online_tour_1"
                        value={ListingDetails?.online_tour_1}
                        onChange={PasteValue}
                        placeholder="Paste URL here"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none"
                      />{" "}
                      <img
                        onClick={getvalue}
                        name="online_tour_1"
                        className="w-5 cursor-pointer"
                        src={pasteRedIcon}
                        alt="img"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-start items-center gap-4">
                  <div className="w-full md:w-[50%] mt-4 md:mt-6">
                    <div className="font-medium text-[#171717] text-xs md:text-sm ">
                      Online Tour 2
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2 outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5 mt-2">
                      <input
                        type="text"
                        id="online_tour_2"
                        name="online_tour_2"
                        value={ListingDetails?.online_tour_2}
                        onChange={PasteValue}
                        placeholder="Paste URL here"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none"
                      />{" "}
                      <img
                        onClick={getvalue}
                        name="online_tour_2"
                        className="w-5 cursor-pointer"
                        src={pasteRedIcon}
                        alt="img"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-[50%] mt-4 md:mt-6">
                    <div className="font-medium text-[#171717] text-xs md:text-sm ">
                      Agency Listing URL (applicable only on property.com.au)
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2 outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5 mt-2">
                      <input
                        type="text"
                        id="agency_listing_url"
                        name="agency_listing_url"
                        value={ListingDetails?.agency_listing_url}
                        onChange={PasteValue}
                        placeholder="Paste URL here"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none"
                      />{" "}
                      <img
                        onClick={getvalue}
                        name="agency_listing_url"
                        className="w-5 cursor-pointer"
                        src={pasteRedIcon}
                        alt="img"
                      />
                    </div>
                  </div>
                </div>

                <div className="font-semibold text-[#171717] text-sm md:text-base my-5">
                  Video url
                </div>

                <div className="font-medium text-[#737373] text-xs md:text-sm my-5">
                  Include a video in your listing and give potential buyers more
                  information about your property. Learn how to add a YouTube
                  video to your listing, download our handy{`  `}
                  <span className="text-[#3B8FD4] cursor-pointer">
                    Quick Reference guide now.
                  </span>
                  {`  `} Don't have a video,{`  `}
                  <span className="text-[#3B8FD4] cursor-pointer">
                    click here
                  </span>
                  {`  `} for more details.
                </div>

                <div className="font-semibold text-[#171717] text-sm md:text-base my-5">
                  3D Tours
                </div>

                <div className="font-medium text-[#737373] text-xs md:text-sm my-5">
                  Engage buyers locally and internationally with the visual
                  point of difference enabled by 30 tours. REA now makes your 30
                  tours prominent across devices when provided. Learn more with
                  our 3D Reference guide.
                </div>

                <div className="flex flex-row justify-start items-center gap-4 mt-10">
                  <button
                    className="bg-[#E5002A] text-white font-medium text-sm px-5 py-3 rounded-3xl shadow outline-none"
                    onClick={(e) => {
                      setisActive(AllTabs?.[3]);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Save and Continue
                  </button>
                </div>
              </div>
            )}

            {/* -------- Inspactions -------- */}

            {isActive === AllTabs?.[3] && (
              <div className="">
                <div className="font-semibold text-[#404040] text-lg md:text-xl lg:text-2xl mt-6 md:mt-12">
                  Create Inspection times
                </div>

                <div className="border-b-2 border-[#E5E5E5] my-4 " />

                <div className="flex flex-col">
                  <div className="w-full text-[#404040] font-medium text-xs md:text-sm my-4 md:my-6">
                    Date
                    <DatePicker
                      selected={InspectionTime?.show_date}
                      onChange={(newValue) => {
                        setInspectionTime({
                          ...InspectionTime,
                          show_date: newValue,
                          date: moment(newValue).format("DD-MM-YYYY"),
                        });
                      }}
                      placeholderText="DD/MM/YYYY"
                      className="w-full sm:w-[285px] border border-[#E5E5E5] rounded-3xl py-3 px-5 outline-none text-xs md:text-sm font-medium cursor-pointer mt-2"
                    />
                  </div>

                  <div className="w-full flex flex-col lg:flex-row">
                    <div className="w-full text-[#404040] font-medium text-xs md:text-sm my-2 lg:my-4">
                      Start Time
                      <div className="w-full flex flex-row justify-start gap-2">
                        <select
                          name="start_hr"
                          value={InspectionTime?.start_hr}
                          onChange={onInspectionTimeChange}
                          className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-3xl p-3 mt-2 cursor-pointer"
                        >
                          <option value="" hidden>
                            Hr
                          </option>
                          {Hours?.length > 0 &&
                            Hours?.map((d, index) => (
                              <option key={index} value={d?.name}>
                                {d?.title}
                              </option>
                            ))}
                        </select>
                        <select
                          name="start_min"
                          value={InspectionTime?.start_min}
                          onChange={onInspectionTimeChange}
                          className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-3xl p-3 mt-2 cursor-pointer"
                        >
                          <option value="" hidden>
                            Min
                          </option>
                          {Minites?.length > 0 &&
                            Minites?.map((d, index) => (
                              <option key={index} value={d?.name}>
                                {d?.title}
                              </option>
                            ))}
                        </select>
                        <select
                          name="start_am_pm"
                          value={InspectionTime?.start_am_pm}
                          onChange={onInspectionTimeChange}
                          className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-3xl p-3 mt-2 cursor-pointer"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-center items-center text-[#171717] font-bold text-sm md:text-base px-5">
                      To
                    </div>

                    <div className="w-full text-[#404040] font-medium text-xs md:text-sm my-2 lg:my-4">
                      End Time
                      <div className="flex flex-row justify-start gap-2">
                        <select
                          name="end_hr"
                          value={InspectionTime?.end_hr}
                          onChange={onInspectionTimeChange}
                          className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-3xl p-3 mt-2 cursor-pointer"
                        >
                          <option value="" hidden>
                            Hr
                          </option>
                          {Hours?.length > 0 &&
                            Hours?.map((d, index) => (
                              <option key={index} value={d?.name}>
                                {d?.title}
                              </option>
                            ))}
                        </select>
                        <select
                          name="end_min"
                          value={InspectionTime?.end_min}
                          onChange={onInspectionTimeChange}
                          className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-3xl p-3 mt-2 cursor-pointer"
                        >
                          <option value="" hidden>
                            Min
                          </option>
                          {Minites?.length > 0 &&
                            Minites?.map((d, index) => (
                              <option key={index} value={d?.name}>
                                {d?.title}
                              </option>
                            ))}
                        </select>
                        <select
                          name="end_am_pm"
                          value={InspectionTime?.end_am_pm}
                          onChange={onInspectionTimeChange}
                          className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-3xl p-3 mt-2 cursor-pointer"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end items-end my-2">
                    <div
                      className="flex justify-start items-center gap-2 border border-[#E5002A] bg-[#E5002A] rounded-3xl py-3 px-5 cursor-pointer"
                      onClick={AddInspectionTime}
                    >
                      <img src={add} alt="icon" className="w-3 lg:w-4" />
                      <div className="text-white font-medium text-xs md:text-sm px-1">
                        Add
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ----------- Inspactions ----------- */}
          {isActive === AllTabs?.[3] && (
            <>
              {InspectionTimes?.length > 0 && (
                <div className="bg-white rounded-xl shadow-md flex flex-col justify-start px-5 py-10 mb-5">
                  {InspectionTimes?.length > 0 &&
                    InspectionTimes?.map((d, index) => (
                      <div
                        key={index}
                        className="flex flex-row justify-between items-center gap-2 border-t border-t-[#E5E5E5] py-4"
                      >
                        <div className="w-full flex flex-row flex-wrap justify-start items-center gap-2">
                          <div className="text-[#171717] font-bold text-sm md:text-base">
                            {index + 1}.
                          </div>
                          <div className="text-[#171717] font-semibold text-xs md:text-sm bg-[#FEF3C7] rounded-lg py-2 px-3">
                            {moment(d?.show_date).format(
                              "DD MMMM , YYYY , dddd"
                            )}
                          </div>
                          <div className="text-[#171717] font-semibold text-xs md:text-sm bg-[#FEF3C7] rounded-lg py-2 px-3">
                            {d?.start_hr}:{d?.start_min} {d?.start_am_pm}
                          </div>
                          <div className="text-[#171717] font-semibold text-xs md:text-sm">
                            To
                          </div>
                          <div className="text-[#171717] font-semibold text-xs md:text-sm bg-[#FEF3C7] rounded-lg py-2 px-3">
                            {d?.end_hr}:{d?.end_min} {d?.end_am_pm}
                          </div>
                        </div>
                        <img
                          src={deleteRed}
                          alt="icon"
                          className="w-8 bg-[#FFCCD3] rounded-lg p-2 cursor-pointer"
                          onClick={(e) => onDeleteInspection(index)}
                        />
                      </div>
                    ))}
                </div>
              )}

              <div className="bg-red-50 rounded-xl shadow-md flex flex-col justify-center gap-4 px-5 py-10 mb-10">
                <div className="text-[#E5002A] font-semibold text-xs md:text-sm lg:text-base">
                  Display inspections in Saturday's Herald Sun*
                </div>
                <div className="text-[#171717] font-medium text-xs md:text-sm lg:text-base">
                  Weekend Open for Inspections, loaded before 5pm every Monday
                  will automatically appear. There will also be a number of
                  properties selected to be featured with photo and full
                  details. Reach the readers of Australia's biggest-selling
                  newspaper at no cost.
                </div>
                <div className="text-[#171717] font-medium text-xs md:text-sm lg:text-base">
                  *Please note: Open for Inspection times will be displayed
                  subject to the availability of advertising space. Herald Sun
                  does not guarantee that all properties will appear in the
                  Weekend Open for Inspection section
                </div>
              </div>
              <div className="flex flex-row justify-start items-center gap-4 ">
                <button
                  className="bg-[#E5002A] text-white font-medium text-sm px-5 py-3 rounded-3xl shadow outline-none"
                  onClick={handelFinalSubmit}
                >
                  Save Changes
                </button>
              </div>
            </>
          )}
          {/* ----------- Inspactions ----------- */}
        </div>
      </div>
    </Layout1>
  );
};

export default EditListing;

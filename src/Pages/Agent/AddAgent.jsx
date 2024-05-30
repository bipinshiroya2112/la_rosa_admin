import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import {
  AgentRoundEdit,
  AgentSqureEdit,
  blueLeftSideArrow,
  coverPhoto,
  desktop,
  desktopRed,
  largePhone,
  largePhoneRed,
  phone,
  phoneRed,
  questionMark,
  searchGray,
  tablet,
  tabletRed,
} from "../../assets";
import Layout1 from "../../Layouts/Layout1";
import { toast } from "react-toastify";
import uploadImage from "../../uploadImage/uploadImage.js";

const AddAgent = () => {
  const [coverPhotoSize, setCoverPhotoSize] = useState("w-[1280px]");
  const navigate = useNavigate();

  const [AgencyOptions, setAgencyOptions] = useState([]);

  const profileFileRef = useRef(null);
  const coverProfileFileRef = useRef(null);
  useEffect(() => {
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

  const [AgentDetails, setAgentDetails] = useState({
    agency_id: "",
    profile_created_at: "now",
    job_title: "",
    email: "",
    confirm_email: "",
    mobile_number: "",
    business_number: "",
    first_name: "",
    last_name: "",
    start_year_in_industry: "",
    license_number: "",
    about_me: "",
    taglines: "",
    awards: "",
    specialties: "",
    community_involvement: "",
    video_title: "",
    video_URL: "",
    twitter_profile_URL: "",
    facebook_profile_URL: "",
    linkedIn_profile_URL: "",
  });

  const [AgentCheckboxDetails, setAgentCheckboxDetails] = useState({
    residential_sales: true,
    residential_property_management: true,
    weakly_update: false,
  });

  const [AgentImages, setAgentImages] = useState({
    profileImg: null,
    profileImgShow: null,
    coverProfileImg: null,
    coverProfileImgShow: null,
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setAgentDetails({ ...AgentDetails, [name]: value });
  };

  const onCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAgentCheckboxDetails({ ...AgentCheckboxDetails, [name]: checked });
  };

  // const onChangeImages = (e) => {
  //   const { name } = e.target;
  //   setAgentImages({
  //     ...AgentImages,
  //     [name]: e.target.files[0],
  //     [`${name}Show`]: URL.createObjectURL(e.target.files[0]),
  //   });
  // };

  const onChangeImages = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    // if (
    //   name === "coverProfileImg" &&
    //   (file.width !== 1280 || file.height !== 600)
    // ) {
    //   // Show popup or alert
    //   toast.error("images should be 1280x600");
    //   return;
    // }

    setAgentImages({
      ...AgentImages,
      [name]: file,
      [`${name}Show`]: URL.createObjectURL(file),
    });
  };

  const onDeleteImages = (e) => {
    setAgentImages({
      ...AgentImages,
      [e]: null,
      [`${e}Show`]: null,
    });
  };

  const AddNewAgent = async () => {
    try {
      const formData = new FormData();
      formData.append("role", "agent");
      formData.append("agency_id", AgentDetails?.agency_id);
      formData.append("job_title", AgentDetails?.job_title);
      formData.append("email", AgentDetails?.email);
      formData.append("confirm_email", AgentDetails?.confirm_email);
      formData.append("mobile_number", AgentDetails?.mobile_number);
      formData.append("business_number", AgentDetails?.business_number);
      formData.append("first_name", AgentDetails?.first_name);
      formData.append("last_name", AgentDetails?.last_name);
      // formData.append(
      //   "start_year_in_industry",
      //   AgentDetails?.start_year_in_industry
      // );
      // formData.append("license_number", AgentDetails?.license_number);
      formData.append("about_me", AgentDetails?.about_me);
      formData.append("taglines", AgentDetails?.taglines);
      formData.append("awards", AgentDetails?.awards);
      formData.append("specialties", AgentDetails?.specialties);
      formData.append(
        "community_involvement",
        AgentDetails?.community_involvement
      );
      // formData.append("video_title", AgentDetails?.video_title);
      formData.append("video_URL", AgentDetails?.video_URL);
      formData.append("twitter_profile_URL", AgentDetails?.twitter_profile_URL);
      formData.append(
        "facebook_profile_URL",
        AgentDetails?.facebook_profile_URL
      );
      formData.append(
        "linkedIn_profile_URL",
        AgentDetails?.linkedIn_profile_URL
      );
      formData.append(
        "residential_sales",
        AgentCheckboxDetails?.residential_sales
      );
      formData.append(
        "residential_property_management",
        AgentCheckboxDetails?.residential_property_management
      );
      formData.append("weakly_update", AgentCheckboxDetails?.weakly_update);
      const profileImageUpload = await uploadImage(profileFileRef);
      const coverImageUpload = await uploadImage(coverProfileFileRef);

      formData.append("profileImg", profileImageUpload?.url);
      formData.append("coverProfileImg", coverImageUpload?.url);

      await axiosInstanceAuthFormData
        .post(`Agency_Agent/Register`, formData)
        .then((res) => {
          if (res?.data?.status) {
            toast.success("Agent Added Successfuly");
            navigate(`/agents`);
          } else {
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
      <div className="container mx-auto px-5 xl:px-0">
        {/* ---------- section 1  ---------- */}
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-5 bg-white rounded-2xl shadow-md p-4 md:p-6">
          <div className="col-span-1 w-full md:w-auto flex flex-col md:flex-row justify-start gap-3">
            <select
              name="select"
              className="!text-[#404040] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-2 px-5 cursor-pointer"
            >
              <option value="">New</option>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
            </select>
            <select
              name="select"
              className="!text-[#404040] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-2 px-5 cursor-pointer"
            >
              <option value="">View</option>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
            </select>
          </div>

          <div className="col-span-1 2xl:col-span-2 flex flex-row justify-start items-center gap-3">
            <div className="w-full md:h-12 flex justify-start items-center gap-2 border border-[#E5E5E5] rounded-3xl py-3 px-5 cursor-pointer">
              <img src={searchGray} alt="icon" className="w-3 lg:w-4" />
              <input
                type="text"
                placeholder="Enter Property ID, Addres or Superb..."
                className="w-full text-[#A3A3A3]  text-xs md:text-sm outline-none"
              />
            </div>

            <div className="border border-[#E5002A] bg-[#E5002A] rounded-3xl py-2 px-5 cursor-pointer">
              <div className="text-white font-medium text-xs md:text-sm lg:text-base">
                Search
              </div>
            </div>
          </div>
        </div>

        {/* ---------- section 2  ---------- */}
        <div className="w-full flex flex-col justify-start bg-white rounded-2xl shadow-md text-[#404040] font-medium p-8 my-10">
          <div
            className="flex flex-row justify-start items-center gap-2 cursor-pointer"
            onClick={() => navigate(`/agents`)}
          >
            <img src={blueLeftSideArrow} alt="icon" />
            <div className="text-[#3B8FD4] text-sm md:text-base">
              Back to your Agent List
            </div>
          </div>

          <div className="text-[#737373] font-medium text-xs md:text-sm mt-5">
            <span className="text-[#E5002A] pr-2">*</span>Madatory information
            is marked with a asterisk
          </div>

          {/* ---------- Agency Detail Start ---------- */}

          <div className="w-full">
            <div className="font-semibold text-lg  mt-5 md:mt-8">
              Agency Detail <span className="px-1 text-red-500">*</span>
            </div>
            <select
              name="agency_id"
              value={AgentDetails?.agency_id}
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

          {/* ---------- Agency Detail End ---------- */}

          <div className="font-bold text-xl md:text-2xl lg:text-3xl mt-5 md:mt-8">
            Profile of{" "}
            {AgentDetails?.first_name
              ? `${AgentDetails?.first_name} ${AgentDetails?.last_name}`
              : "Agent"}
          </div>
          {/* ---------- Introduction ---------- */}
          <div className="my-2 md:my-5">
            <div className="font-bold text-base md:text-xl lg:text-2xl my-4 md:my-5">
              Introduction
            </div>
            <div className="w-full border border-[#E5E5E5]" />

            <div className="text-[#737373] font-medium text-xs md:text-sm my-4">
              Individuals are now able to edit their public-facing profile
              information in Ignite. Companies will still have control over key
              business information. This includes the details below such as the
              individual's business email, business mobile phone number, profile
              photo and services.
            </div>
          </div>
          {/* ----------  Work Details ---------- */}
          <div className="my-2 md:my-5">
            <div className="font-bold text-base md:text-xl lg:text-2xl my-4 md:my-5">
              Work Details
            </div>
            <div className="w-full border-t border-t-[#E5E5E5]" />
            <div className="text-[#3B8FD4] font-semibold text-xs md:text-sm mt-4">
              History
            </div>
            <div className="font-semibold text-xs md:text-sm mt-4">
              Create Date :
              <span className="font-medium px-2">
                {AgentDetails?.profile_created_at}
              </span>
            </div>

            <div className="mt-4 md:mt-6">
              <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                Job Title :
              </div>
              <input
                type="text"
                value={AgentDetails?.job_title}
                name="job_title"
                onChange={onInputChange}
                placeholder="Enter your job title"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm ">
                  Email :
                </div>
                <input
                  type="email"
                  value={AgentDetails?.email}
                  name="email"
                  onChange={onInputChange}
                  placeholder="Enter your email"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                />
              </div>
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm">
                  Confirm Email :
                </div>
                <input
                  type="email"
                  value={AgentDetails?.confirm_email}
                  name="confirm_email"
                  onChange={onInputChange}
                  placeholder="Confirm your email"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm ">
                  Mobile Phone :
                </div>
                <input
                  type="number"
                  value={AgentDetails?.mobile_number}
                  name="mobile_number"
                  onChange={onInputChange}
                  placeholder="Enter mobile number"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                />
              </div>
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm ">
                  Business Phone :
                </div>
                <input
                  type="number"
                  value={AgentDetails?.business_number}
                  name="business_number"
                  onChange={onInputChange}
                  placeholder="Enter business phone number"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                />
              </div>
            </div>

            <div className="text-[#404040] font-semibold text-sm md:text-base mt-4 md:mt-6">
              Service Provided
            </div>
            <div className="flex flex-wrap flex-row justify-start items-center gap-4 my-3">
              <div
                className={`flex justify-center items-center gap-3 border  rounded-3xl font-medium text-xs md:text-sm cursor-pointer py-2 px-5 ${AgentCheckboxDetails?.residential_sales &&
                  `text-[#E5002A] bg-[#FFEAEF] border-[#E5002A]`
                  }`}
              >
                <div>Residential Sales</div>
                <div className="grid place-content-center rounded-2xl">
                  <input
                    type="checkbox"
                    checked={AgentCheckboxDetails?.residential_sales}
                    name="residential_sales"
                    onChange={onCheckboxChange}
                    className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                  />
                </div>
              </div>
              <div
                className={`flex justify-center items-center gap-3 border  rounded-3xl font-medium text-xs md:text-sm cursor-pointer py-2 px-5 ${AgentCheckboxDetails?.residential_property_management &&
                  `text-[#E5002A] bg-[#FFEAEF] border-[#E5002A]`
                  }`}
              >
                <div>Residential Property Management</div>
                <div className="grid place-content-center rounded-2xl">
                  <input
                    type="checkbox"
                    checked={
                      AgentCheckboxDetails?.residential_property_management
                    }
                    name="residential_property_management"
                    onChange={onCheckboxChange}
                    className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="text-[#404040] font-semibold text-sm md:text-base mt-4 md:mt-6">
              Weekly Update
            </div>
            <div className="flex justify-start items-center gap-2 md:text-sm my-3">
              <input
                type="checkbox"
                checked={AgentCheckboxDetails?.weakly_update}
                name="weakly_update"
                onChange={onCheckboxChange}
                className="w-4 accent-[#E5002A] cursor-pointer"
              />
              <div className="text-[#525252] font-medium text-xs md:text-sm ">
                Receive a weekly update email about your listings performance.
              </div>
            </div>

            <div className="text-[#404040] font-semibold text-sm md:text-base mt-4 md:mt-6">
              Profile Photo
            </div>
            <div className="text-[#737373] font-medium text-xs md:text-sm mt-3">
              This is a professional style portrait head shot and will be used
              on realestate.com.au. We will resize your profile photo to the
              required sizes (For best results upload as 300px wide by 400px
              high).
            </div>

            <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-8 my-6 md:my-8">
              <div className="w-full sm:w-[50%] flex flex-row justify-start items-center gap-5">
                <div className="w-[50%] grid place-content-center">
                  {AgentImages?.profileImgShow ? (
                    <img
                      src={AgentImages?.profileImgShow}
                      alt="profile"
                      className="border-2 border-dashed border-black rounded-lg"
                    />
                  ) : (
                    <img
                      // src={AgentImages?.profileImgShow}
                      src={AgentSqureEdit}
                      alt="profile"
                      className="border-2 border-dashed border-black rounded-lg"
                    />
                  )}
                </div>
                <div className="w-[50%] grid place-content-center">
                  {AgentImages?.profileImgShow ? (
                    <img
                      src={AgentImages?.profileImgShow}
                      alt="profile"
                      className="border-2 border-dashed border-black aspect-square w-60 rounded-full"
                    />
                  ) : (
                    <img
                      // src={AgentImages?.coverProfileImg}
                      src={AgentRoundEdit}
                      alt="profile"
                      className="border-2 border-dashed border-black aspect-square w-60 rounded-full"
                    />
                  )}
                </div>
              </div>
              <div className="w-full sm:w-[50%] text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                <label
                  htmlFor="profileImg"
                  className="px-2 cursor-pointer"
                  onClick={() => { }}
                >
                  Replace
                  <input
                    id="profileImg"
                    type="file"
                    name="profileImg"
                    ref={profileFileRef}
                    onChange={onChangeImages}
                  />
                </label>
                |
                <span
                  className="px-2 cursor-pointer"
                  onClick={(e) => onDeleteImages(`profileImg`)}
                >
                  Delete
                </span>
              </div>
            </div>
          </div>

          {/* ----------  Personal Details ---------- */}
          <div className="my-2 md:my-5">
            <div className="font-bold text-base md:text-xl lg:text-2xl my-4 md:my-5">
              Personal Details
            </div>
            <div className="w-full border-t border-t-[#E5E5E5]" />
            <div className="text-[#737373] font-medium text-xs md:text-sm my-4">
              The individual is able to edit the below details on Ignite, and
              any changes will be replicated across other workplaces that is
              associated to the individual.
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm ">
                  First Name :<span className="px-1 text-red-500">*</span>
                </div>
                <input
                  type="text"
                  value={AgentDetails?.first_name}
                  name="first_name"
                  onChange={onInputChange}
                  placeholder="Enter first name"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                />
              </div>
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm">
                  Surname :
                </div>
                <input
                  type="text"
                  value={AgentDetails?.last_name}
                  name="last_name"
                  onChange={onInputChange}
                  placeholder="Enter last name"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                />
              </div>
            </div>

            {/* <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm ">
                  Start Year In Industry :
                </div>
                <input
                  type="text"
                  value={AgentDetails?.start_year_in_industry}
                  name="start_year_in_industry"
                  onChange={onInputChange}
                  placeholder="Enter start year in industry"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                />
              </div>
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm ">
                  License Number :
                </div>
                <input
                  type="text"
                  value={AgentDetails?.license_number}
                  name="license_number"
                  onChange={onInputChange}
                  placeholder="Enter license number"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                />
              </div>
            </div> */}

            <div className="mt-4 md:mt-6">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                About Me :
              </div>
              <textarea
                rows={5}
                type="text"
                value={AgentDetails?.about_me}
                name="about_me"
                onChange={onInputChange}
                placeholder="Enter about you"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-xl py-3 px-5  mt-3"
              />
            </div>

            <div className="mt-4 md:mt-6">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Tagline :
              </div>
              <textarea
                rows={5}
                type="text"
                value={AgentDetails?.taglines}
                name="taglines"
                onChange={onInputChange}
                placeholder="Enter about tagline"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-xl py-3 px-5  mt-3"
              />
            </div>

            <div className="mt-4 md:mt-6">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Awards :
              </div>
              <textarea
                rows={5}
                type="text"
                value={AgentDetails?.awards}
                name="awards"
                onChange={onInputChange}
                placeholder="Enter about Awards"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-xl py-3 px-5  mt-3"
              />
            </div>

            <div className="mt-4 md:mt-6">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Specialties :
              </div>
              <textarea
                rows={5}
                type="text"
                value={AgentDetails?.specialties}
                name="specialties"
                onChange={onInputChange}
                placeholder="Enter about you"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-xl py-3 px-5  mt-3"
              />
            </div>

            <div className="mt-4 md:mt-6">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Community Involvement :
              </div>
              <textarea
                rows={5}
                type="text"
                value={AgentDetails?.community_involvement}
                name="community_involvement"
                onChange={onInputChange}
                placeholder="Enter about  community involvement"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-xl py-3 px-5  mt-3"
              />
            </div>

            <div className="text-[#404040] font-semibold text-sm md:text-base mt-4 md:mt-6">
              Cover photo
            </div>
            <li className="text-[#737373] font-medium text-xs md:text-sm mt-3 px-2">
              A cover photo adds personality and character to your profile page.
            </li>
            <li className="text-[#737373] font-medium text-xs md:text-sm mt-3 px-2">
              Choose a clear photo with you or your scene as the focal point.
            </li>
            <li className="text-[#737373] font-medium text-xs md:text-sm mt-3 px-2">
              The image must be a minimum of 1280 x 600 pixels, and may be a
              JPEG, PNG or GIFpx high).
            </li>
            <div className="border border-[#262626] rounded-lg p-6 md:p-12">
              <div className="grid place-content-center  mt-4 md:mt-6 !w-full">
                {AgentImages?.coverProfileImgShow ? (
                  <img
                    src={AgentImages?.coverProfileImgShow}
                    alt="cover"
                    className={`grid place-items-center ${coverPhotoSize} h-[500px] border-2 border-dashed border-black rounded-lg object-cover`}
                  />
                ) : (
                  <img
                    // src={AgentImages?.coverProfileImg}
                    src={coverPhoto}
                    alt="cover"
                    className={`grid place-items-center ${coverPhotoSize} h-[500px] border-2 border-dashed border-black rounded-lg object-cover`}
                  />
                )}
              </div>
              <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 mt-5 md:mt-8">
                <div className="w-full flex flex-col justify-center items-center gap-5">
                  <div>Preview your cover photo on different screen sizes</div>
                  <div className="grid grid-cols-2 xl:grid-cols-4 justify-center items-center gap-4">
                    <div
                      className="h-full flex flex-col justify-between items-center gap-3 cursor-pointer"
                      onClick={() => setCoverPhotoSize("w-[400px]")}
                    >
                      <img
                        src={coverPhotoSize == "w-[400px]" ? phoneRed : phone}
                        alt="icon"
                      />
                      <p
                        className={`text-center text-xs md:text-sm ${coverPhotoSize == "w-[400px]"
                          ? "text-[#E5002A]"
                          : null
                          } `}
                      >
                        Phone
                      </p>
                    </div>
                    <div
                      className="h-full flex flex-col justify-between items-center gap-3 cursor-pointer"
                      onClick={() => setCoverPhotoSize("w-[425px]")}
                    >
                      <img
                        src={
                          coverPhotoSize == "w-[425px]"
                            ? largePhoneRed
                            : largePhone
                        }
                        alt="icon"
                      />
                      <p
                        className={`text-center text-xs md:text-sm ${coverPhotoSize == "w-[425px]"
                          ? "text-[#E5002A]"
                          : null
                          } `}
                      >
                        Large Phone
                      </p>
                    </div>
                    <div
                      className="h-full flex flex-col justify-between items-center gap-3 cursor-pointer"
                      onClick={() => setCoverPhotoSize("w-[768px]")}
                    >
                      <img
                        src={coverPhotoSize == "w-[768px]" ? tabletRed : tablet}
                        alt="icon"
                      />
                      <p
                        className={`text-center text-xs md:text-sm ${coverPhotoSize == "w-[768px]"
                          ? "text-[#E5002A]"
                          : null
                          } `}
                      >
                        Tablet
                      </p>
                    </div>
                    <div
                      className="h-full flex flex-col justify-between items-center gap-3 cursor-pointer"
                      onClick={() => setCoverPhotoSize("w-[1280px]")}
                    >
                      <img
                        src={
                          coverPhotoSize == "w-[1280px]" ? desktopRed : desktop
                        }
                        alt="icon"
                      />
                      <p
                        className={`text-center text-xs md:text-sm ${coverPhotoSize == "w-[1280px]"
                          ? "text-[#E5002A]"
                          : null
                          } `}
                      >
                        Desktop
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto md:h-full border border-[#262626]" />
                <div className="w-full text-center text-[#3B8FD4] font-medium text-sm md:text-base">
                  <label
                    htmlFor="coverProfileImg"
                    className="px-2 cursor-pointer"
                    onClick={() => { }}
                  >
                    Replace
                    <input
                      id="coverProfileImg"
                      type="file"
                      name="coverProfileImg"
                      ref={coverProfileFileRef}
                      onChange={onChangeImages}
                    />
                  </label>
                  |
                  <span
                    className="px-2 cursor-pointer"
                    onClick={(e) => onDeleteImages(`coverProfileImg`)}
                  >
                    Delete
                  </span>
                </div>
              </div>
            </div>
            <div className="h-full flex flex-col xl:flex-row justify-center items-center mt-4 md:mt-6">
              <div className="w-full h-full flex flex-col justify-start items-start gap-2 border-b-4 border-b-[#29C299] py-3">
                <div className="text-[#29C299] font-semibold text-lg md:text-xl">
                  Tips
                </div>
                <li className="text-[#404040] font-medium text-xs md:text-sm px-2">
                  Choose a photo which showcases your personality and character
                </li>
                <li className="text-[#404040] font-medium text-xs md:text-sm px-2">
                  Consider showing visitors what you look like while at work
                </li>
                <li className="text-[#404040] font-medium text-xs md:text-sm px-2">
                  Select a clean, sharp photo
                </li>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-2 border-b-4 border-b-[#E5002A] py-3">
                <div className="text-[#E5002A] font-semibold text-lg md:text-xl">
                  Things to avoid
                </div>
                <li className="text-[#404040] font-medium text-xs md:text-sm px-2">
                  Avoid images with text and logos, it is likely the text will
                  be cropped
                </li>
                <li className="text-[#404040] font-medium text-xs md:text-sm px-2">
                  Photos of properties don't work well, and may confuse visitors
                </li>
                <li className="text-[#404040] font-medium text-xs md:text-sm px-2">
                  Close up profile or head shots
                </li>
              </div>
            </div>

            <div className="text-[#404040] font-semibold text-sm md:text-base mt-5 md:mt-8">
              Professional Video
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
              {/* <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm ">
                  Video Title :
                </div>
                <input
                  type="text"
                  value={AgentDetails?.video_title}
                  name="video_title"
                  onChange={onInputChange}
                  placeholder="Enter video title"
                  className="w-full font-medium text-[#404040] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                />
              </div> */}
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm">
                  Video URL :
                </div>
                <input
                  type="text"
                  value={AgentDetails?.video_URL}
                  name="video_URL"
                  onChange={onInputChange}
                  placeholder="Enter video url"
                  className="w-full font-medium text-[#404040] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
                />
                <div className="font-medium text-[#737373] text-xs md:text-sm mt-2">
                  We will only accept YouTube video URIs, which wil be displayed
                  on your profile automatically.
                </div>
              </div>
            </div>

            <div className="text-[#404040] font-semibold text-sm md:text-base mt-5 md:mt-8">
              Promotional Media
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm ">
                  Twitter Profile URL :
                </div>
                <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                  <input
                    type="text"
                    value={AgentDetails?.twitter_profile_URL}
                    name="twitter_profile_URL"
                    onChange={onInputChange}
                    placeholder="Enter URL"
                    className="w-full font-medium text-[#404040] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 "
                  />
                  <img
                    src={questionMark}
                    alt="icon"
                    className="w-5 cursor-pointer"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm">
                  Facebook Profile URL :
                </div>
                <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                  <input
                    type="text"
                    value={AgentDetails?.facebook_profile_URL}
                    name="facebook_profile_URL"
                    onChange={onInputChange}
                    placeholder="Enter URL"
                    className="w-full font-medium text-[#404040] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                  />
                  <img
                    src={questionMark}
                    alt="icon"
                    className="w-5 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm ">
                  LinkedIn Profile URL :
                </div>
                <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                  <input
                    type="text"
                    value={AgentDetails?.linkedIn_profile_URL}
                    name="linkedIn_profile_URL"
                    onChange={onInputChange}
                    placeholder="Enter URL"
                    className="w-full font-medium text-[#404040] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                  />
                  <img
                    src={questionMark}
                    alt="icon"
                    className="w-5 cursor-pointer"
                  />
                </div>
              </div>
              <div className="md:w-full"></div>
            </div>

            <div className="border-b-2 border-[#E5E5E5] my-5 md:my-8" />

            <div className="flex flex-row justify-end items-center gap-2">
              <button
                className="bg-[#E5002A] text-white font-medium text-sm px-5 py-2 rounded-3xl shadow  outline-none"
                onClick={AddNewAgent}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout1>
  );
};

export default AddAgent;

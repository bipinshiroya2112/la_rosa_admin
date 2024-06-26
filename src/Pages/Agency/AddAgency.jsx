import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { emailRed } from "../../assets";
import {
  questionMark,
  searchGray,
  agencyLargeLogo,
  AgencyLogo,
  agencyMediumLogo,
  agencySmallLogo,
  commercialAgencyExtraLargeLogo,
  commercialAgencyLargeLogo,
  commercialAgencyMediumLogo,
  commercialAgencySmallLogo,
  heroImg,
} from "../../assets";
import Layout1 from "../../Layouts/Layout1";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
import { TextColor } from "../../Constants";
import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";
import { ColourPicker } from "./ColourPicker";
import ReactSelect from "react-select";
const AddAgency = () => {
  // const colombiaOptions = [
  //   { value: "Bogotá" },
  //   { value: "Antioquia" },
  //   { value: "Valle del Cauca" },
  //   { value: "Atlántico" },
  //   { value: "Bolívar" },
  //   { value: "Nariño" },
  //   { value: "Córdoba" },
  //   { value: "Tolima" },
  //   { value: "Cauca" },
  //   { value: "Norte de Santander" },
  //   { value: "Boyacá" },
  //   { value: "Magdalena" },
  //   { value: "Cesar" },
  //   { value: "Caldas" },
  //   { value: "Meta" },
  //   { value: "La Guajira" },
  //   { value: "Risaralda" },
  //   { value: "Sucre" },
  //   { value: "Quindío" },
  //   { value: "Chocó" },
  //   { value: "Caquetá" },
  //   { value: "Casanare" },
  //   { value: "Putumayo" },
  //   { value: "Arauca" },
  //   { value: "Guaviare" },
  //   { value: "San Andrés y Providencia" },
  //   { value: "Amazonas" },
  //   { value: "Vichada" },
  //   { value: "Vaupés" },
  //   { value: "Guainía" },
  // ];
  const colombiaOptions = [
    { value: "Bogotá", label: "Bogotá" },
    { value: "Antioquia", label: "Antioquia" },
    { value: "Valle del Cauca", label: "Valle del Cauca" },
    { value: "Atlántico", label: "Atlántico" },
    { value: "Bolívar", label: "Bolívar" },
    { value: "Nariño", label: "Nariño" },
    { value: "Córdoba", label: "Córdoba" },
    { value: "Tolima", label: "Tolima" },
    { value: "Cauca", label: "Cauca" },
    { value: "Norte de Santander", label: "Norte de Santander" },
    { value: "Boyacá", label: "Boyacá" },
    { value: "Magdalena", label: "Magdalena" },
    { value: "Cesar", label: "Cesar" },
    { value: "Caldas", label: "Caldas" },
    { value: "Meta", label: "Meta" },
    { value: "La Guajira", label: "La Guajira" },
    { value: "Risaralda", label: "Risaralda" },
    { value: "Sucre", label: "Sucre" },
    { value: "Quindío", label: "Quindío" },
    { value: "Chocó", label: "Chocó" },
    { value: "Caquetá", label: "Caquetá" },
    { value: "Casanare", label: "Casanare" },
    { value: "Putumayo", label: "Putumayo" },
    { value: "Arauca", label: "Arauca" },
    { value: "Guaviare", label: "Guaviare" },
    { value: "San Andrés y Providencia", label: "San Andrés y Providencia" },
    { value: "Amazonas", label: "Amazonas" },
    { value: "Vichada", label: "Vichada" },
    { value: "Vaupés", label: "Vaupés" },
    { value: "Guainía", label: "Guainía" },
  ];
  // const nigeriaOptions = [
  //   { value: "Adamawa(North East)" },
  //   { value: "Bauchi(North East)" },
  //   { value: "Borno(North East)" },
  //   { value: "Gombe(North East)" },
  //   { value: "Taraba(North East)" },
  //   { value: "Yobe(North East)" },
  //   { value: "Zamfara(North West)" },
  //   { value: "Sokoto(North West)" },
  //   { value: "Kebbi(North West)" },
  //   { value: "Katsina(North West)" },
  //   { value: "Kano(North West)" },
  //   { value: "Kaduna(North West)" },
  //   { value: "Jigawa(North West)" },
  //   { value: "Plateau(North Central)" },
  //   { value: "Niger(North Central)" },
  //   { value: "Nasarawa(North Central)" },
  //   { value: "Kwara(North Central)" },
  //   { value: "Kogi(North Central)" },
  //   { value: "Federal Capital Territory(North Central)" },
  //   { value: "Benue(North Central)" },
  //   { value: "Imo(South East)" },
  //   { value: "Enugu(South East)" },
  //   { value: "Ebony(South East)" },
  //   { value: "Anambra(South East)" },
  //   { value: "Abia(South East)" },
  //   { value: "Rivers(South South)" },
  //   { value: "Edo(South South)" },
  //   { value: "Delta(South South)" },
  // ];
  const countryOptions = [
    // { value: "Colombia", label: "Colombia" },
    { value: "Nigeria", label: "Nigeria" },
  ];
  const nigeriaOptions = [
    { value: "Adamawa(North East)", label: "Adamawa(North East)" },
    { value: "Bauchi(North East)", label: "Bauchi(North East)" },
    { value: "Borno(North East)", label: "Borno(North East)" },
    { value: "Gombe(North East)", label: "Gombe(North East)" },
    { value: "Taraba(North East)", label: "Taraba(North East)" },
    { value: "Yobe(North East)", label: "Yobe(North East)" },
    { value: "Zamfara(North West)", label: "Zamfara(North West)" },
    { value: "Sokoto(North West)", label: "Sokoto(North West)" },
    { value: "Kebbi(North West)", label: "Kebbi(North West)" },
    { value: "Katsina(North West)", label: "Katsina(North West)" },
    { value: "Kano(North West)", label: "Kano(North West)" },
    { value: "Kaduna(North West)", label: "Kaduna(North West)" },
    { value: "Jigawa(North West)", label: "Jigawa(North West)" },
    { value: "Plateau(North Central)", label: "Plateau(North Central)" },
    { value: "Niger(North Central)", label: "Niger(North Central)" },
    { value: "Nasarawa(North Central)", label: "Nasarawa(North Central)" },
    { value: "Kwara(North Central)", label: "Kwara(North Central)" },
    { value: "Kogi(North Central)", label: "Kogi(North Central)" },
    {
      value: "Federal Capital Territory(North Central)",
      label: "Federal Capital Territory(North Central)",
    },
    { value: "Benue(North Central)", label: "Benue(North Central)" },
    { value: "Imo(South East)", label: "Imo(South East)" },
    { value: "Enugu(South East)", label: "Enugu(South East)" },
    { value: "Ebony(South East)", label: "Ebony(South East)" },
    { value: "Anambra(South East)", label: "Anambra(South East)" },
    { value: "Abia(South East)", label: "Abia(South East)" },
    { value: "Rivers(South South)", label: "Rivers(South South)" },
    { value: "Edo(South South)", label: "Edo(South South)" },
    { value: "Delta(South South)", label: "Delta(South South)" },
  ];
  const navigate = useNavigate();
  const COLOR = "red";
  const [color, setColor] = useState(COLOR);

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [Credentials, setCredentials] = useState("");
  const [Conform, setConform] = useState("");

  const [textAreaLength, setTextAreaLength] = useState();
  const [AgencyProfileDetails, setAgencyProfileDetails] = useState({
    street: "",
    suburb_area: "",
    postcode: "",
    state_region: "",
    country: "",
    mailing_address_street: "",
    mailing_address_suburb_area: "",
    mailing_address_postcode: "",
    mailing_address_state_region: "",
    mailing_address_country: "",
    fax: "",
    phone: "",
    email: "",
    web: "",
    facebook_page: "",
    twitter_profile_url: "",
    principal_name: "",
    display_email: "",
    office_description: "",
  });

  // const onChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   setAgencyBranding({ ...AgencyBranding, [name]: value });
  // };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    console.log("🚀 ~ onInputChange ~ value:", value);
    setAgencyProfileDetails({ ...AgencyProfileDetails, [name]: value });
  };
  const selectHandler = (value, name) => {
    setAgencyProfileDetails({ ...AgencyProfileDetails, [name]: value });
  };

  const AddNewAgency = async () => {
    try {
      if (AgencyProfileDetails?.street === "") {
        toast.error("Please enter Street");
      } else if (Conform !== Credentials) {
        toast.error("Current Password and confirm password not match");
      } else if (AgencyProfileDetails?.suburb_area === "") {
        toast.error("Please enter a Suburb Area");
      } else if (AgencyProfileDetails?.postcode === "") {
        toast.error("Please enter a Postcode");
      } else if (AgencyProfileDetails?.state_region === "") {
        toast.error("Please enter a State Region");
      } else if (AgencyProfileDetails?.suburb_area === "") {
        toast.error("Please enter a Country");
      } else if (AgencyProfileDetails?.country === "") {
        toast.error("Please enter a Suburb Area");
      } else if (AgencyProfileDetails?.mailing_address_street === "") {
        toast.error("Please enter a Mailing Address Street");
      } else if (AgencyProfileDetails?.mailing_address_suburb_area === "") {
        toast.error("Please enter a Mailing Address Suburb Area");
      } else if (AgencyProfileDetails?.mailing_address_postcode === "") {
        toast.error("Please enter a Mailing Address Postcode");
      } else if (AgencyProfileDetails?.mailing_address_state_region === "") {
        toast.error("Please enter a Mailing Address State Region");
      } else if (AgencyProfileDetails?.mailing_address_country === "") {
        toast.error("Please enter a Mailing Address Country");
      } else if (AgencyProfileDetails?.phone === "") {
        toast.error("Please enter a Phone");
      }
      // else if (AgencyProfileDetails?.web === "") {
      //   toast.error("Please enter a Web");
      // } else if (AgencyProfileDetails?.facebook_page === "") {
      //   toast.error("Please enter a Facebook Page URL");
      // } else if (AgencyProfileDetails?.twitter_profile_url === "") {
      //   toast.error("Please enter a Twitter Profile URL");
      // }
      else if (AgencyProfileDetails?.principal_name === "") {
        toast.error("Please enter a Agency Name");
      } else if (AgencyProfileDetails?.display_email === "") {
        toast.error("Please enter a valid Display Email");
      } else {
        const formData = new FormData();
        formData.append("role", "agency");
        formData.append("password", Credentials);
        formData.append("street", AgencyProfileDetails?.street);
        formData.append("suburb_area", AgencyProfileDetails?.suburb_area);
        formData.append("postcode", AgencyProfileDetails?.postcode);
        formData.append("state_region", AgencyProfileDetails?.state_region);
        formData.append("country", AgencyProfileDetails?.country);
        formData.append(
          "mailing_address_street",
          AgencyProfileDetails?.mailing_address_street
        );
        formData.append(
          "mailing_address_suburb_area",
          AgencyProfileDetails?.mailing_address_suburb_area
        );
        formData.append(
          "mailing_address_postcode",
          AgencyProfileDetails?.mailing_address_postcode
        );
        formData.append(
          "mailing_address_state_region",
          AgencyProfileDetails?.mailing_address_state_region
        );
        formData.append(
          "mailing_address_country",
          AgencyProfileDetails?.mailing_address_country
        );
        formData.append("phone", AgencyProfileDetails?.phone);
        formData.append("email", AgencyProfileDetails?.email);
        formData.append("web", AgencyProfileDetails?.web);
        formData.append("facebook_page", AgencyProfileDetails?.facebook_page);
        formData.append(
          "twitter_profile_url",
          AgencyProfileDetails?.twitter_profile_url
        );
        formData.append("principal_name", AgencyProfileDetails?.principal_name);
        formData.append("display_email", AgencyProfileDetails?.display_email);

        axiosInstanceAuthFormData
          .post(`admin/Agency/create`, formData)
          .then((res) => {
            if (res?.data?.status) {
              toast.success("Agency Added Successfuly");
              navigate(`/agency`);
            } else {
              toast.error(res?.data?.message);
            }
          })
          .catch((err) => {
            console.log("------>> Error", err);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout1>
      <div className="w-full bg-white rounded-t-xl">
        <div className="bg-[#E5002A] text-white font-semibold text-sm md:text-base lg:text-lg rounded-t-xl p-5">
          Agency Profile
        </div>

        <div className="p-6">
          <div className="text-black font-semibold text-sm md:text-base lg:text-lg my-4 mb-8">
            Mandatory fields are marked with an asterisk (
            <span className="text-[#E5002A]">*</span>)
          </div>

          {/* -------- credentials -------- */}
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            Credentials
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Email :<span className="px-1 text-red-500">*</span>
              </div>

              <input
                type="email"
                value={AgencyProfileDetails?.email}
                name="email"
                onChange={onInputChange}
                placeholder="Enter Email"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Password :<span className="px-1 text-red-500">*</span>
              </div>
              <input
                type="password"
                value={Credentials?.password}
                name="password"
                onChange={(e) => {
                  setCredentials(e?.target?.value);
                }}
                placeholder="Enter Password"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Confirm Password :<span className="px-1 text-red-500">*</span>
              </div>
              <input
                type="password"
                value={Credentials?.password}
                name="Conformpassword"
                onChange={(e) => {
                  setConform(e?.target?.value);
                }}
                placeholder="Enter Password"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
          </div>

          {/* -------- Address -------- */}
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            Address
          </div>
          <div className="">
            <div className="font-medium text-[#171717] text-xs md:text-sm">
              Street : <span className="px-1 text-[#E5002A]">*</span>
            </div>
            <input
              type="text"
              value={AgencyProfileDetails?.street}
              name="street"
              onChange={onInputChange}
              placeholder="Enter street"
              className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5  mt-3"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Suburb/Area :<span className="px-1 text-red-500">*</span>
              </div>

              <input
                type="text"
                value={AgencyProfileDetails?.suburb_area}
                name="suburb_area"
                onChange={onInputChange}
                placeholder="Enter suburb area"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Postcode :<span className="px-1 text-red-500">*</span>
              </div>
              <input
                type="number"
                value={AgencyProfileDetails?.postcode}
                name="postcode"
                onChange={onInputChange}
                placeholder="Enter postcode"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm mb-3 ">
                State/Region :<span className="px-1 text-red-500">*</span>
              </div>
              <ReactSelect
                name="state_region"
                isSearchable
                value={AgencyProfileDetails?.state_region}
                onChange={(selectedOption) =>
                  selectHandler(selectedOption, "state_region")
                }
                options={
                  AgencyProfileDetails?.country == "Columbia"
                    ? colombiaOptions
                    : nigeriaOptions
                }
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm mb-3">
                Country :<span className="px-1 text-red-500">*</span>
              </div>
              {/* <select
                name="country"
                value={AgencyProfileDetails?.country}
                onChange={onInputChange}
                className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              >
                <option value="">Select country</option>
                <option value="Columbia">Columbia</option>
                <option value="Nigeria">Nigeria </option>
              </select> */}
              <ReactSelect
                name=""
                value={AgencyProfileDetails?.country}
                isSearchable
                onChange={(selectedOption) =>
                  selectHandler(selectedOption, "country")
                }
                options={countryOptions}
              />
            </div>
          </div>
          {/* -------- Mailing Address -------- */}
          <div className="flex gap-3 font-semibold text-[#E5002A] my-5 md:my-8">
            Mailing Address
            <img src={emailRed} alt="img" />
          </div>
          <div className="font-medium text-[#737373] text-xs md:text-sm mb-4">
            These fields will only display on your specialized agency website.
            To update your agency billing address please contact Customer Care.
          </div>
          <div className="">
            <div className="font-medium text-[#171717] text-xs md:text-sm">
              Street/P.O. Box :
            </div>
            <input
              type="text"
              value={AgencyProfileDetails?.mailing_address_street}
              name="mailing_address_street"
              onChange={onInputChange}
              placeholder="Enter street"
              className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5  mt-3"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Suburb/Area :
              </div>

              <input
                type="text"
                value={AgencyProfileDetails?.mailing_address_suburb_area}
                name="mailing_address_suburb_area"
                onChange={onInputChange}
                placeholder="Enter suburb area"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Postcode :
              </div>
              <input
                type="number"
                value={AgencyProfileDetails?.mailing_address_postcode}
                name="mailing_address_postcode"
                onChange={onInputChange}
                placeholder="Enter postcode"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm mb-3">
                State/Region :<span className="px-1 text-red-500">*</span>
              </div>
              <ReactSelect
                name="mailing_address_state_region"
                isSearchable
                value={AgencyProfileDetails?.state_region}
                onChange={(selectedOption) =>
                  selectHandler(selectedOption, "mailing_address_state_region")
                }
                options={
                  AgencyProfileDetails?.country == "Columbia"
                    ? colombiaOptions
                    : nigeriaOptions
                }
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm mb-3">
                Country :<span className="px-1 text-red-500">*</span>
              </div>
              {/* <select
                name="mailing_address_country"
                value={AgencyProfileDetails?.mailing_address_country}
                onChange={onInputChange}
                className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              >
                <option value="">Select country</option>
                <option value="Columbia">Columbia</option>
                <option value="Nigeria">Nigeria</option>
              </select> */}
              <ReactSelect
                name=""
                value={AgencyProfileDetails?.mailing_address_country}
                isSearchable
                onChange={(selectedOption) =>
                  selectHandler(selectedOption, "mailing_address_country")
                }
                options={countryOptions}
              />
            </div>
          </div>
          {/* -------- Contact Info -------- */}
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            Contact Info
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            {/* <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Fax :
              </div>
              <input
                type="text"
                value={AgencyProfileDetails?.fax}
                name="fax"
                onChange={onInputChange}
                placeholder="Enter fax"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
              <div className="text-[#737373] text-xs md:text-sm p-2 ">
                If supplying a fax number, please include prefix as above.
              </div>
            </div> */}
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Phone : <span className="px-1 text-red-500">*</span>
              </div>
              <input
                type="number"
                value={AgencyProfileDetails?.phone}
                name="phone"
                onChange={onInputChange}
                placeholder="Enter phone"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
              {/* <div className="text-[#737373] text-xs md:text-sm p-2 ">
                (Please include prefix, eg. 03 9555 1777 for Australian Agents,
                or 9 2673656 for New Zealand Agents.)
              </div> */}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Email : <span className="px-1 text-red-500">*</span>
              </div>
              <input
                type="email"
                value={AgencyProfileDetails?.email}
                name="email"
                onChange={onInputChange}
                placeholder="Enter email"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Web :
              </div>
              <input
                type="text"
                value={AgencyProfileDetails?.web}
                name="web"
                onChange={onInputChange}
                placeholder="Enter web"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Facebook Page :
              </div>
              <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                <input
                  type="text"
                  value={AgencyProfileDetails?.facebook_page}
                  name="facebook_page"
                  onChange={onInputChange}
                  placeholder="Enter facebook page"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                />
                {/* <img
                  src={questionMark}
                  alt="icon"
                  className="w-5 cursor-pointer"
                /> */}
              </div>
              {/* <div className="text-[#3B8FD4] font-semibold text-xs md:text-sm p-2 cursor-pointer">
                More about Facebook
              </div> */}
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Twitter Profile URL :
              </div>
              <div className="w-full flex flex-row justify-start items-center gap-2 mt-3">
                <input
                  type="text"
                  value={AgencyProfileDetails?.twitter_profile_url}
                  name="twitter_profile_url"
                  onChange={onInputChange}
                  placeholder="Enter twitter profile url"
                  className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5"
                />
                {/* <img
                  src={questionMark}
                  alt="icon"
                  className="w-5 cursor-pointer"
                /> */}
              </div>
              {/* <div className="text-[#3B8FD4] font-semibold text-xs md:text-sm p-2 cursor-pointer">
                More about Twitter
              </div> */}
            </div>
          </div>
          {/* -------- Wbsite Link -------- */}
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            These fields will only display on your specialised agency website
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                Principal Name : <span className="px-1 text-red-500">*</span>
              </div>
              <input
                type="text"
                value={AgencyProfileDetails?.principal_name}
                name="principal_name"
                onChange={onInputChange}
                placeholder="Enter your principal name"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Display Email :
              </div>
              <input
                type="text"
                value={AgencyProfileDetails?.display_email}
                name="display_email"
                onChange={onInputChange}
                placeholder="Enter your display email"
                className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start bg-white rounded-b-2xl shadow-md text-[#404040] font-medium p-6 mb-10">
        {/* ----------- Button ---------- */}
        <div className="w-full flex justify-start items-center  text-white text-xs md:text-sm mt-4 md:mt-6">
          <button
            className="py-2 px-5 bg-[#E5002A] rounded-3xl"
            onClick={AddNewAgency}
          >
            Add Agency
          </button>
        </div>
      </div>
    </Layout1>
  );
};
export default AddAgency;

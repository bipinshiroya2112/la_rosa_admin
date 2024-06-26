import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { emailRed } from "../../assets";
import Layout1 from "../../Layouts/Layout1";
import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";

const EditAgency = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const COLOR = "red";
  const [color, setColor] = useState(COLOR);
  useEffect(() => {
    GetAgencyBranding(id);
  }, []);

  const GetAgencyBranding = async (id) => {
    await axiosInstanceAuth
      .get(`admin/Agency/view/${id}`)
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          setAgencyProfileDetails(mydata);
          setAgentImages({
            ...AgentImages,
            agencySmallLogo: mydata?.agencySmallLogo,
            agencyMediumLogo: mydata?.agencyMediumLogo,
            agencyLargeLogo: mydata?.agencyLargeLogo,
            commercialAgencySmallLogo: mydata?.commercialAgencySmallLogo,
            commercialAgencyMediumLogo: mydata?.commercialAgencyMediumLogo,
            commercialAgencyLargeLogo: mydata?.commercialAgencyLargeLogo,
            commercialAgencyExtraLargeLogo:
              mydata?.commercialAgencyExtraLargeLogo,
            heroImg: mydata?.heroImg,
          });

          setAgencyBranding({
            ...AgencyBranding,
            text_color: mydata?.text_color,
            primary_color: mydata?.primary_color,
            secondary_color: mydata?.secondary_color,
          });
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [Credentials, setCredentials] = useState("");
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

  const [AgentImages, setAgentImages] = useState({
    agencySmallLogo: null,
    agencySmallLogoShow: null,
    agencyMediumLogo: null,
    agencyMediumLogoShow: null,
    agencyLargeLogo: null,
    agencyLargeLogoShow: null,
    commercialAgencySmallLogo: null,
    commercialAgencySmallLogoShow: null,
    commercialAgencyMediumLogo: null,
    commercialAgencyMediumLogoShow: null,
    commercialAgencyLargeLogo: null,
    commercialAgencyLargeLogoShow: null,
    commercialAgencyExtraLargeLogo: null,
    commercialAgencyExtraLargeLogoShow: null,
    heroImg: null,
    heroImgShow: null,
  });

  const [AgencyBranding, setAgencyBranding] = useState({
    text_color: "black",
    primary_color: "",
    secondary_color: "",
  });

  const onChangeImages = (e) => {
    const { name } = e.target;
    setAgentImages({
      ...AgentImages,
      [name]: e.target.files[0],
      [`${name}Show`]: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onChangeAllImages = (e) => {
    const { name } = e.target;

    if (e.target.files?.length < 3) {
      toast.error("Please upload All Logo");
    } else {
      setAgentImages({
        ...AgentImages,
        agencySmallLogo: e.target.files[0],
        agencySmallLogoShow: URL.createObjectURL(e.target.files[0]),
        agencyMediumLogo: e.target.files[1],
        agencyMediumLogoShow: URL.createObjectURL(e.target.files[1]),
        agencyLargeLogo: e.target.files[2],
        agencyLargeLogoShow: URL.createObjectURL(e.target.files[2]),
      });
    }
  };

  // const onChangeAllCommercialImages = (e) => {
  //   const { name } = e.target;

  //   if (e.target.files?.length < 4) {
  //     toast.error("Please upload All Commercial Logo");
  //   } else {
  //     setAgentImages({
  //       ...AgentImages,
  //       commercialAgencySmallLogo: e.target.files[0],
  //       commercialAgencySmallLogoShow: URL.createObjectURL(e.target.files[0]),
  //       commercialAgencyMediumLogo: e.target.files[1],
  //       commercialAgencyMediumLogoShow: URL.createObjectURL(e.target.files[1]),
  //       commercialAgencyLargeLogo: e.target.files[2],
  //       commercialAgencyLargeLogoShow: URL.createObjectURL(e.target.files[2]),
  //       commercialAgencyExtraLargeLogo: e.target.files[3],
  //       commercialAgencyExtraLargeLogoShow: URL.createObjectURL(
  //         e.target.files[3]
  //       ),
  //     });
  //   }
  // };

  const onDeleteImages = (e) => {
    setAgentImages({
      ...AgentImages,
      [e]: null,
      [`${e}Show`]: null,
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAgencyBranding({ ...AgencyBranding, [name]: value });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setAgencyProfileDetails({ ...AgencyProfileDetails, [name]: value });
  };

  const EditAgency = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id);
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
      formData.append(
        "office_description",
        AgencyProfileDetails?.office_description
      );
      formData.append("text_color", AgencyBranding?.text_color);
      formData.append("primary_color", color);
      formData.append("secondary_color", AgencyBranding?.secondary_color);
      formData.append("agencySmallLogo", AgentImages?.agencySmallLogo);
      formData.append("agencyMediumLogo", AgentImages?.agencyMediumLogo);
      formData.append("agencyLargeLogo", AgentImages?.agencyLargeLogo);
      formData.append("heroImg", AgentImages?.heroImg);

      await axiosInstanceAuthFormData
        .post(`admin/agency/edit/${id}`, formData)
        .then((res) => {
          if (res?.data?.status) {
            toast.success("Agency Edited Successfuly");
            navigate(`/agency`);
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
      <div className="w-full bg-white rounded-t-xl">
        <div className="bg-[#E5002A] text-white font-semibold text-sm md:text-base lg:text-lg rounded-t-xl p-5">
          Edit Agency Profile
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
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                State/Region :<span className="px-1 text-red-500">*</span>
              </div>
              <select
                name="state_region"
                value={AgencyProfileDetails?.state_region}
                onChange={onInputChange}
                className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              >
                <option value="">Select state / region</option>
                <option value="Adamawa(North East)">Adamawa(North East)</option>
                <option value="Bauchi(North East)">Bauchi(North East)</option>
                <option value="Borno(North East)">Borno(North East)</option>
                <option value="Gombe(North East)">Gombe(North East)</option>
                <option value="Taraba(North East)">Taraba(North East)</option>
                <option value="Yobe(North East)">Yobe(North East)</option>
                <option value="Zamfara(North West)">Zamfara(North West)</option>
                <option value="Sokoto(North West)">Sokoto(North West)</option>
                <option value="Kebbi(North West)">Kebbi(North West)</option>
                <option value="Katsina(North West)">Katsina(North West)</option>
                <option value="Kano(North West)">Kano(North West)</option>
                <option value="Kaduna(North West)">Kaduna(North West)</option>
                <option value="Jigawa(North West)">Jigawa(North West)</option>
                <option value="Plateau(North Central)">Plateau(North Central)</option>
                <option value="Niger(North Central)">Niger(North Central)</option>
                <option value="Nasarawa(North Central)">Nasarawa(North Central)</option>
                <option value="Kwara(North Central)">Kwara(North Central)</option>
                <option value="Kogi(North Central)">Kogi(North Central)</option>
                <option value="Federal Capital Territory(North Central)">Federal Capital Territory(North Central)</option>
                <option value="Benue(North Central)">Benue(North Central)</option>
                <option value="Imo(South East)">Imo(South East)</option>
                <option value="Enugu(South East)">Enugu(South East)</option>
                <option value="Ebony(South East)">Ebony(South East)</option>
                <option value="Anambra(South East)">Anambra(South East)</option>
                <option value="Abia(South East)">Abia(South East)</option>
                <option value="Rivers(South South)">Rivers(South South)</option>
                <option value="Edo(South South)">Edo(South South)</option>
                <option value="Delta(South South)">Delta(South South)</option>
              </select>
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Country :<span className="px-1 text-red-500">*</span>
              </div>
              <select
                name="country"
                value={AgencyProfileDetails?.country}
                onChange={onInputChange}
                className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              >
                <option value="">Select country</option>
                <option value="Nigeria">Nigeria</option>
              </select>
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
              <div className="font-medium text-[#171717] text-xs md:text-sm ">
                State/Region :<span className="px-1 text-red-500">*</span>
              </div>
              <select
                name="mailing_address_state_region"
                value={AgencyProfileDetails?.mailing_address_state_region}
                onChange={onInputChange}
                className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              >
                <option value="">Select state / region</option>
                <option value="Adamawa(North East)">Adamawa(North East)</option>
                <option value="Bauchi(North East)">Bauchi(North East)</option>
                <option value="Borno(North East)">Borno(North East)</option>
                <option value="Gombe(North East)">Gombe(North East)</option>
                <option value="Taraba(North East)">Taraba(North East)</option>
                <option value="Yobe(North East)">Yobe(North East)</option>
                <option value="Zamfara(North West)">Zamfara(North West)</option>
                <option value="Sokoto(North West)">Sokoto(North West)</option>
                <option value="Kebbi(North West)">Kebbi(North West)</option>
                <option value="Katsina(North West)">Katsina(North West)</option>
                <option value="Kano(North West)">Kano(North West)</option>
                <option value="Kaduna(North West)">Kaduna(North West)</option>
                <option value="Jigawa(North West)">Jigawa(North West)</option>
                <option value="Plateau(North Central)">Plateau(North Central)</option>
                <option value="Niger(North Central)">Niger(North Central)</option>
                <option value="Nasarawa(North Central)">Nasarawa(North Central)</option>
                <option value="Kwara(North Central)">Kwara(North Central)</option>
                <option value="Kogi(North Central)">Kogi(North Central)</option>
                <option value="Federal Capital Territory(North Central)">Federal Capital Territory(North Central)</option>
                <option value="Benue(North Central)">Benue(North Central)</option>
                <option value="Imo(South East)">Imo(South East)</option>
                <option value="Enugu(South East)">Enugu(South East)</option>
                <option value="Ebony(South East)">Ebony(South East)</option>
                <option value="Anambra(South East)">Anambra(South East)</option>
                <option value="Abia(South East)">Abia(South East)</option>
                <option value="Rivers(South South)">Rivers(South South)</option>
                <option value="Edo(South South)">Edo(South South)</option>
                <option value="Delta(South South)">Delta(South South)</option>
              </select>
            </div>
            <div className="w-full">
              <div className="font-medium text-[#171717] text-xs md:text-sm">
                Country :<span className="px-1 text-red-500">*</span>
              </div>
              <select
                name="mailing_address_country"
                value={AgencyProfileDetails?.mailing_address_country}
                onChange={onInputChange}
                className="round w-full font-medium !text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 mt-3"
              >
                <option value="">Select country</option>
                <option value="Nigeria">Nigeria</option>
              </select>
            </div>
          </div>
          {/* -------- Contact Info -------- */}
          <div className="font-semibold text-[#E5002A] my-5 md:my-8">
            Contact Info
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
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
                Aegency Name :
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
        <div className="w-full border border-[#E5E5E5] mt-6" />

        {/* ----------- Button ---------- */}

        <div className="w-full flex justify-start items-center  text-white text-xs md:text-sm mt-4 md:mt-6">
          <button
            className="py-2 px-5 bg-[#E5002A] rounded-3xl"
            onClick={EditAgency}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Layout1>
  );
};
export default EditAgency;

import {
  home,
  homeGray,
  listings,
  listingsWhite,
  marketings,
  marketingWhite,
  reports,
  social,
  website,
  xmlUploads,
  socialWhite,
  yourProfile,
  yourProfileWhite,
} from "../assets";

const HeaderData = [
  {
    icon: homeGray,
    activeIcon: home,
    pathname: "/",
    pagename: "Home",
  },
  {
    icon: social,
    activeIcon: socialWhite,
    pathname: "/agency",
    pagename: "Agencies",
  },
  {
    icon: yourProfile,
    activeIcon: yourProfileWhite,
    pathname: "/agents",
    pagename: "Agents",
  },
  {
    icon: listings,
    activeIcon: listingsWhite,
    pathname: "/listings",
    pagename: "Listings",
  },
  {
    icon: social,
    activeIcon: socialWhite,
    pathname: "/user",
    pagename: "Users",
  },
  {
    icon: social,
    activeIcon: socialWhite,
    pathname: "/advertise",
    pagename: "Advertise User",
  },
  {
    icon: listings,
    activeIcon: home,
    pathname: "/advertiseList",
    pagename: "Advertise List",
  },
  {
    icon: listings,
    activeIcon: home,
    pathname: "/blog",
    pagename: "Blog",
  },
];

const NewOrEstablished = [
  {
    name: "established_property",
    title: "Established property",
  },
  {
    name: "new_construction",
    title: "New construction",
  },
];


const PriceDisplay = [
  {
    name: "show_actual_price",
    title: "Show Actual price",
    message:
      "The price entered will be shown on the website.You can enter alternative price display text in the Optional Price Text field or hide the price on the website and ''Contact agent'', will be shown in place of the price if preferred.",
  },
  {
    name: "show_text_instead_of_price",
    title: "Show text instead of price",
    message:
      " The price entered will be shown on the website.You can enter alternative price display text in the Optional Price Text field or hide the price on the website and ''Contact agent'', will be shown in place of the price if preferred.",
  },
];

const Bedrooms = [
  // {
  //   name: "any",
  //   title: "Any",
  // },
  {
    name: "studio",
    title: "Studio",
  },
  {
    name: "1",
    title: "1",
  },
  {
    name: "2",
    title: "2",
  },
  {
    name: "3",
    title: "3",
  },
  {
    name: "4",
    title: "4",
  },
  {
    name: "5",
    title: "5",
  },
];

const Bathrooms = [
  // {
  //   name: "any",
  //   title: "Any",
  // },
  {
    name: "+1",
    title: "+1",
  },
  {
    name: "+2",
    title: "+2",
  },
  {
    name: "+3",
    title: "+3",
  },
  {
    name: "+4",
    title: "+4",
  },
  {
    name: "+5",
    title: "+5",
  },
];

const OutdoorFeatures = [
  {
    name: "outdoor_deck",
    title: "Deck",
  },
  {
    name: "outdoor_swimming_pool_in_ground",
    title: "Swimming Pool - In Ground",
  },
  {
    name: "outdoor_swimming_pool_above_ground",
    title: "Swimming Pool - Above Ground",
  },
  {
    name: "outdoor_tennis_court",
    title: "Tennis Court",
  },
  {
    name: "outdoor_fully_fenced",
    title: "Fully Fenced",
  },
  {
    name: "outdoor_shed",
    title: "Shed",
  },
  {
    name: "outdoor_outside_spa",
    title: "Outside Spa",
  },
  {
    name: "outdoor_outdoor_entertainment_area",
    title: "Outdoor Entertainment Area",
  },
  {
    name: "outdoor_secure_parking",
    title: "Secure Parking",
  },
  {
    name: "outdoor_courtyard",
    title: "Courtyard",
  },
  {
    name: "outdoor_remote_garage",
    title: "Remote Garage",
  },
  {
    name: "outdoor_garage",
    title: "Garage",
  },
  {
    name: "outdoor_balcony",
    title: "Balcony",
  },
];

const IndoorFeatures = [
  {
    name: "indoor_alaram_system",
    title: "Alaram System",
  },
  {
    name: "indoor_study",
    title: "Study",
  },
  {
    name: "indoor_workshop",
    title: "Workshop",
  },
  {
    name: "indoor_gym",
    title: "Gym",
  },
  {
    name: "indoor_built_in_wardrodes",
    title: "Built-in Wardrodes",
  },
  {
    name: "indoor_intercom",
    title: "Intercom",
  },
  {
    name: "indoor_ducted_vacuum_system",
    title: "Ducted Vacuum System",
  },
  {
    name: "indoor_rumpus_room",
    title: "Rumpus Room",
  },
  {
    name: "indoor_inside_spa",
    title: "Inside Spa",
  },
  {
    name: "indoor_floorboards",
    title: "Floorboards",
  },
  {
    name: "indoor_dishwashera",
    title: "Dishwashera",
  },
  {
    name: "indoor_play_tv_access",
    title: "Play TV Access",
  },
  {
    name: "indoor_broadband_internet_available",
    title: "Broadband Internet Available",
  },
];

const HeatingOrCooling = [
  {
    name: "hc_air_conditioning",
    title: "Air Conditioning",
  },
  {
    name: "hc_ducted_heating",
    title: "Ducted Heating",
  },
  {
    name: "hc_hydronic_heating",
    title: "Hydronic Heating",
  },
  {
    name: "hc_ducted_cooling",
    title: "Ducted Cooling",
  },
  {
    name: "hc_gas_heating",
    title: "Gas Heating",
  },
  {
    name: "hc_open_fireplace",
    title: "Open Fireplace",
  },
  {
    name: "hc_split_system_air_conditioning",
    title: "Split-System Air Conditioning",
  },
  {
    name: "hc_split_system_heating",
    title: "Split - System Heating",
  },
  {
    name: "hc_evaporative_cooling",
    title: "Evaporative Cooling",
  },
  {
    name: "hc_reverse_cycle_air_conditioning",
    title: "Reverse Cycle Air Conditioning",
  },
];

const EcoFriendlyFeatures = [
  {
    name: "eff_solar_hot_water",
    title: "Solar Hot Water",
  },
  {
    name: "eff_water_tank",
    title: "Water Tank",
  },
  {
    name: "eff_grey_water_system",
    title: "Grey Water System",
  },
  {
    name: "eff_solar_panels",
    title: "Solar Panels",
  },
];

const ClimateChangerAndEnergySaver = [
  {
    name: "cces_air_conditioning",
    title: "Air Conditioning",
  },
  {
    name: "cces_solar_hot_water",
    title: "Solar Hot Water",
  },
  {
    name: "cces_high_energy_efficieny",
    title: "High Energy Efficieny",
  },
  {
    name: "cces_solar_panels",
    title: "Solar panels",
  },
  {
    name: "cces_heating",
    title: "Heating",
  },
  {
    name: "cces_water_tank",
    title: "Water Tank",
  },
];

const TextColor = [
  {
    name: "black",
    title: "Black",
  },
  {
    name: "white",
    title: "White",
  },
];

const Hours = [
  { name: "01", title: "1 Hr" },
  { name: "02", title: "2 Hr" },
  { name: "03", title: "3 Hr" },
  { name: "04", title: "4 Hr" },
  { name: "05", title: "5 Hr" },
  { name: "06", title: "6 Hr" },
  { name: "07", title: "7 Hr" },
  { name: "08", title: "8 Hr" },
  { name: "09", title: "9 Hr" },
  { name: "10", title: "10 Hr" },
  { name: "11", title: "11 Hr" },
  { name: "12", title: "12 Hr" },
];

const Minites = [
  { name: "00", title: "0 Min" },
  { name: "01", title: "1 Min" },
  { name: "02", title: "2 Min" },
  { name: "03", title: "3 Min" },
  { name: "04", title: "4 Min" },
  { name: "05", title: "5 Min" },
  { name: "06", title: "6 Min" },
  { name: "07", title: "7 Min" },
  { name: "08", title: "8 Min" },
  { name: "09", title: "9 Min" },
  { name: "10", title: "10 Min" },
  { name: "11", title: "11 Min" },
  { name: "12", title: "12 Min" },
  { name: "13", title: "13 Min" },
  { name: "14", title: "14 Min" },
  { name: "15", title: "15 Min" },
  { name: "16", title: "16 Min" },
  { name: "17", title: "17 Min" },
  { name: "18", title: "18 Min" },
  { name: "19", title: "19 Min" },
  { name: "20", title: "20 Min" },
  { name: "21", title: "21 Min" },
  { name: "22", title: "22 Min" },
  { name: "23", title: "23 Min" },
  { name: "24", title: "24 Min" },
  { name: "25", title: "25 Min" },
  { name: "26", title: "26 Min" },
  { name: "27", title: "27 Min" },
  { name: "28", title: "28 Min" },
  { name: "29", title: "29 Min" },
  { name: "30", title: "30 Min" },
  { name: "31", title: "31 Min" },
  { name: "32", title: "32 Min" },
  { name: "33", title: "33 Min" },
  { name: "34", title: "34 Min" },
  { name: "35", title: "35 Min" },
  { name: "36", title: "36 Min" },
  { name: "37", title: "37 Min" },
  { name: "38", title: "38 Min" },
  { name: "39", title: "39 Min" },
  { name: "40", title: "40 Min" },
  { name: "41", title: "41 Min" },
  { name: "42", title: "42 Min" },
  { name: "43", title: "43 Min" },
  { name: "44", title: "44 Min" },
  { name: "45", title: "45 Min" },
  { name: "46", title: "46 Min" },
  { name: "47", title: "47 Min" },
  { name: "48", title: "48 Min" },
  { name: "49", title: "49 Min" },
  { name: "50", title: "50 Min" },
  { name: "51", title: "51 Min" },
  { name: "52", title: "52 Min" },
  { name: "53", title: "53 Min" },
  { name: "54", title: "54 Min" },
  { name: "55", title: "55 Min" },
  { name: "56", title: "56 Min" },
  { name: "57", title: "57 Min" },
  { name: "58", title: "58 Min" },
  { name: "59", title: "59 Min" },
  { name: "60", title: "60 Min" },
];

export {
  HeaderData,
  NewOrEstablished,
  PriceDisplay,
  Bedrooms,
  Bathrooms,
  OutdoorFeatures,
  IndoorFeatures,
  HeatingOrCooling,
  EcoFriendlyFeatures,
  ClimateChangerAndEnergySaver,
  TextColor,
  Hours,
  Minites,
};

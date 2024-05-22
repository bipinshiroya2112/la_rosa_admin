import React from "react";

const Footer = () => {
  const FooterLink = [
    {
      Title: "About us",
      Link: "https://www.argimb.com.ar/",
    },
    {
      Title: "Feedback",
      Link: "https://www.argimb.com.ar/",
    },
    {
      Title: "Legel",
      Link: "https://www.argimb.com.ar/",
    },
    {
      Title: "Privacy",
      Link: "https://www.argimb.com.ar/",
    },
  ];

  return (
    <div className="bg-white rounded-none lg:rounded-lg shadow-md hover:shadow-lg p-5 my-5 md:my-0">
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between  gap-5 text-sm md:text-sm">
        <div className="text-[#404040]">
          Admin Administration © REA Group 2013, Allrights reserved
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 place-items-start lg:place-items-center gap-3">
          {FooterLink?.length > 0 &&
            FooterLink?.map((d, index) => (
              <a
                key={index}
                href={d?.Link}
                target={"_blank"}
                className="w-20 text-[#3B8FD4] text-start lg:text-center"
              >
                {d?.Title}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

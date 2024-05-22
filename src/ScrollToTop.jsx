import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [pathname]);
  return <div>{children}</div>;
};
export default ScrollToTop;

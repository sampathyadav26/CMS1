import React, { useEffect, Suspense } from "react";
import CustomRoutes from "./router";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onActiveMobileView } from "./store/actions";
import { isMobile } from "react-device-detect";

const App = () => {
  const dispatch = useDispatch();
  const handleWindowSizeChange = () => {
    const isMobileView = window.innerWidth <= 767;
    console.info("handleWindowSizeChange called", isMobileView);
    dispatch(onActiveMobileView(isMobileView || isMobile));
  };
  const handleContextmenu = (ev) => {
    console.info("ev ##", ev);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    window.addEventListener("contextmenu", handleContextmenu);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
      window.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);
  console.info("process.env ##", process.env);
  return (
    <>
      <Router>
        <Suspense>
          <CustomRoutes />
        </Suspense>
      </Router>
    </>
  );
};

export default App;

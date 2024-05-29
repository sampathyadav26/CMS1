import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const { user } = useSelector((state) => state.userState);
  return user?.email ? (
    <div style={{ top: "20px", position: "relative", margin: "10px" }}>
      <h3>You are looking for something that does not actually exist.</h3>
      <Link
        to="/cmsapp/dashboard"
        style={{ textDecoration: "none", color: "#000080", fontWeight: 500 }}
      >
        Take me back to the Homepage
      </Link>
    </div>
  ) : (
    <div style={{ top: "20px", position: "relative", margin: "10px" }}>
      <h3>You are looking for something that does not actually exist.</h3>
      <Link
        to="/cmsapp/login"
        style={{ textDecoration: "none", color: "#000080", fontWeight: 500 }}
      >
        Please login and continue..
      </Link>
    </div>
  );
};
export default PageNotFound;

/* istanbul ignore file */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, path, ...props }) => {
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      navigate("/cmsapp/login");
    }
  }, [user]);

  return user ? <Component /> : null;
};
export default PrivateRoute;

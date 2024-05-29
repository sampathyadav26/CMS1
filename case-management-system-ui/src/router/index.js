import React, { lazy, Suspense } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import PageNotFound from "../components/common/PageNotFound";



import Login from "../components/common/Login";
import Register from "../components/common/Registration";
import LandingPage from "../components/landingPage";

import CaseIdView from "../components/dashboard/caseIdView";
import AddCase from "../components/dashboard/addCase";

import CustomerDetailsView from "../components/customer/customerDetailsView";
import CreateCustomer from "../components/customer/createCustomer";

const Dashboard = lazy(() => import("../components/dashboard"));
const CustComponent = lazy(() => import("../components/customer"));

const ResetPassword = lazy(() => import("../components/common/ResetPassword"));

const ForgotPasswordPage = lazy(() =>
  import("../components/common/ForgotPasswordPage")
);

const PrivateRoute = lazy(() => import("../PrivateRoute"));


const CustomRoutes = () => {
  const nav = useNavigate();
  useIdleTimer({
    timeout: 1000 * 60 * 15, // time in milliseconds (15 Mins)
    onIdle: () => {
      nav("/cmsapp");
    },
    debounce: 500,
  });
  return (
    <Suspense>
      <Routes>
        <Route exact path="/" element={<LandingPage />}>
          <Route
            path="/cmsapp/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path="/cmsapp/customer"
            element={<PrivateRoute component={CustComponent} />}
          /> 
        
        


          <Route
            exact
            path="/cmsapp/"
            element={<Navigate to={"/cmsapp/dashboard"} />}
          />
          <Route
            path="/cmsapp/caseIdView"
            element={<PrivateRoute component={CaseIdView} />}
          />
          <Route
            path="/cmsapp/createCase"
            element={<PrivateRoute component={AddCase} />}
          />
          <Route
            path="/cmsapp/createCustomer"
            element={<PrivateRoute component={CreateCustomer} />}
          />
          <Route
            path="/cmsapp/customerIdView"
            element={<PrivateRoute component={CustomerDetailsView} />}
          />
          <Route path="/cmsapp/customer" />
          <Route path="*" element={<Navigate to="/cmsapp/404" />} />
          <Route path="/cmsapp/404" element={<PageNotFound />} />
        </Route>
        <Route path="/cmsapp/register" element={<Register />} />
        <Route
          path="/cmsapp/forgotPasswordPage"
          element={<ForgotPasswordPage />}
        />
        <Route path="/cmsapp/resetPassword" element={<ResetPassword />} />
        <Route path="/cmsapp/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};
export default CustomRoutes;

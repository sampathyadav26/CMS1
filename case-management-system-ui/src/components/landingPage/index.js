import { useSelector } from "react-redux";
import HeaderSection from "../common/HeaderSection";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const { user } = useSelector((state) => state.userState);
  console.info("user ##", user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.email) {
      navigate("/cmsapp/login");
    }
  }, [user]);
  return user && <HeaderSection />;
};

export default LandingPage;

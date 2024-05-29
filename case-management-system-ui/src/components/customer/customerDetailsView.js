import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerDetails from "./customerDetails";

const CustomerDetailsView = () => {
  const [customerRecordId, setCustomerRecordId] = useState("");
  const location = useLocation();
  useEffect(() => {
    const {
      state: { customerId },
    } = location;
    console.info("location ##", location);
    setCustomerRecordId(customerId);
  }, [location]);
  return (
    <>
      <CustomerDetails custId={customerRecordId}/>
    </>
  )
};

export default CustomerDetailsView ;
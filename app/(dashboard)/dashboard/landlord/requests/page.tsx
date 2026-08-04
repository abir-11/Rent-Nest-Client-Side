import { getRentalRequest } from "../_actions/rentalRequests";
import RentalRequestsClient from "../_components/RentalRequestsClient";

export const metadata = {
  title: "Rental Requests | Landlord Dashboard",
};

export default async function LandlordRequestsPage() {
  const res = await getRentalRequest();
  
  const requestsData = res?.data?.rentalRequest || res?.data || [];

  return <RentalRequestsClient requests={requestsData} />;
}
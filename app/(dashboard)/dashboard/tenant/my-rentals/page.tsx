import { getTenantRentals } from "../_actions/tenantActions";
import MyRentalsClient from "../_components/rentals";

export default async function MyRentalsPage() {
  const res = await getTenantRentals();

  const rentalsData = res?.data?.rentalRequest || [];

  return <MyRentalsClient rentalsData={rentalsData} />;
}
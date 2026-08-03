import { getTenantRentals } from "./_actions/tenantActions";
import TenantOverviewClient from "./_components/TenantOverviewClient";

export default async function TenantOverviewPage() {
  const res = await getTenantRentals();

  // API রেসপন্স থেকে rentalRequest অ্যারেটি বের করে নিন
  const rentalsData = res?.data?.rentalRequest || [];

  return <TenantOverviewClient rentals={rentalsData} />;
}
import { getPaymentHistory } from "../../_actions/getPaymentHistory";
import PaymentHistoryClient from "../../_components/PaymentHistoryClient";

export const metadata = {
  title: "Payment History | RentNest",
};

export default async function PaymentHistoryPage() {
  const res = await getPaymentHistory();
  
  const paymentsData = res?.data ||res?.data?.data || [];

  return <PaymentHistoryClient payments={paymentsData} />;
}
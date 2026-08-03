"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { CreditCard, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createPayment } from "../../../_actions/tenantActions";

export default function PaymentInitiationPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await createPayment(id as string);

      if (res.success && res.url) {
        toast.success("Redirecting to payment gateway...");
        window.location.href = res.url; 
      } else {
        toast.error(res.message || "Could not process payment request");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07140E] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#0B1C14] border border-emerald-900/80 rounded-2xl p-8 shadow-2xl text-center space-y-6">
        
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-emerald-950 border border-emerald-600/40 rounded-full flex items-center justify-center text-emerald-400 shadow-inner">
            <CreditCard className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-emerald-300">Checkout & Payment</h1>
          <p className="text-sm text-gray-400 mt-1">Request ID: <span className="font-mono text-emerald-400">{id}</span></p>
        </div>

        <div className="bg-emerald-950/40 border border-emerald-900/50 rounded-xl p-4 text-left text-xs space-y-2 text-gray-300">
          <div className="flex justify-between">
            <span>Transaction Type:</span>
            <span className="font-medium text-white">Rental Booking</span>
          </div>
          <div className="flex justify-between">
            <span>Security Guarantee:</span>
            <span className="font-medium text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-bit SSL
            </span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-600/30"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Processing...
            </>
          ) : (
            "Proceed to Pay"
          )}
        </button>
      </div>
    </div>
  );
}
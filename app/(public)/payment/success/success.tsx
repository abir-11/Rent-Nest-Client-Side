"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const rentalRequestId = searchParams.get("rentalRequestId");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 border border-emerald-500/30 rounded-2xl p-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-gray-400 text-sm mb-6">
          Thank you. Your rental payment has been completed successfully.
        </p>

        <div className="bg-gray-900/60 p-4 rounded-xl text-left text-xs text-gray-400 space-y-2 mb-6 border border-white/5">
          <div className="flex justify-between">
            <span>Rental Request ID:</span>
            <span className="font-mono text-gray-200">
              {rentalRequestId ? `${rentalRequestId.slice(0, 10)}...` : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Session ID:</span>
            <span className="font-mono text-gray-200">
              {sessionId ? `${sessionId.slice(0, 12)}...` : "N/A"}
            </span>
          </div>
        </div>

        <Link href="/dashboard/tenant/my-rentals">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2">
            Go to My Rentals
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
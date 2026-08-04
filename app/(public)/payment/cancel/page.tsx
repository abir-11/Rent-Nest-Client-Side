"use client";

import React, { Suspense } from "react";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function CancelContent() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 border border-rose-500/30 rounded-2xl p-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-500/40">
          <XCircle className="w-10 h-10" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Payment Cancelled</h1>
        <p className="text-gray-400 text-sm mb-6">
          The payment process was cancelled or failed. You can try again anytime.
        </p>

        <Link href="/dashboard/tenant/my-rentals">
          <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to My Rentals
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>}>
      <CancelContent />
    </Suspense>
  );
}
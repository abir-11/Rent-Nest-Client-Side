"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LottieDisplay = () => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/data/Home.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Lottie load error:", err));
  }, []);

  if (!animationData) return <div className="animate-pulse bg-muted w-full h-full rounded-2xl"></div>;

  return (
    <div className="w-full max-w-lg mx-auto">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieDisplay;
import React from "react";
import { getMyProfile } from "../_actions/profileActions";
import ProfileClient from "../_components/profileClient";

export default async function ProfilePage() {
  const response = await getMyProfile();
  
  const profileData = response?.data?.user || null;

  if (!profileData) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Failed to load profile data. Please try again.
      </div>
    );
  }

  return <ProfileClient profile={profileData} />;
}
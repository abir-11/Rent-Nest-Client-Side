export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getMe } from './../../service/getMe';

import { getAllCategotyWithOutLogin } from './../../service/getAllCategotyWithOutLogin';
import AvailableRoomsSection from "@/components/AvailableRoomsSection/page";
import WhyChooseUs from "@/components/WhyChooseUs/page";
import HowItWorks from "@/components/HowItWorks/page";
import PropertyAlert from "@/components/PropertyAlert/page";
import FaqSection from "@/components/FaqSection/page";
import CallToAction from "@/components/CallToAction/page";
import { HeroSection } from "./HeroSection/HeroSection";
const HeroSectionAny = HeroSection as any;
export default async function Home() {

  const user = await getMe();
  //console.log(user);
  const categories = await getAllCategotyWithOutLogin()
  return (
    <div>
      <HeroSectionAny categories={categories}></HeroSectionAny>
      <AvailableRoomsSection />
      <HowItWorks />

      <WhyChooseUs />
      <CallToAction />
      <FaqSection />

      <PropertyAlert />
    </div>
  );
}

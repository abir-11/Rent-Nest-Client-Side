import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getMe } from './../../service/getMe';
import { HeroSection } from "./HeroSection/page";
const HeroSectionAny = HeroSection as any;
import { getAllCategotyWithOutLogin } from './../../service/getAllCategotyWithOutLogin';

export default async function Home() {

  const user=await getMe();
  console.log(user);
  const categories = await getAllCategotyWithOutLogin()
  return (
     <div>
    <HeroSectionAny categories={categories}></HeroSectionAny>
    
     </div>
  );
}

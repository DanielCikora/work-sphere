"use client";
import Jobs from "./Jobs";
import Image from "next/image";
import Title from "../ui/Title";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
const Dashboard = () => {
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );
  return (
    <section className='dashboard pt-20'>
      <div className='wrapper'>
        <div className='logo-container pt-4 flex flex-col items-center w-full'>
          <Image
            src={
              isDarkMode
                ? "/images/WorkSphereDarkMode.png"
                : "/images/WorkSphereLightMode.png"
            }
            width={300}
            height={300}
            alt='logo'
            className='mb-2'
            priority
          />
          <Title titleClass='text-xl' titleText='Find Your Dream Job' />
        </div>
        <div className='dashboard-content pt-20'>
          <Jobs />
        </div>
      </div>
    </section>
  );
};
export default Dashboard;

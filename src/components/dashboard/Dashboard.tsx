"use client";
import Jobs from "./jobs/Jobs";
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
          <img
            src={
              isDarkMode
                ? "/images/WorkSphereDarkMode.png"
                : "/images/WorkSphereLightMode.png"
            }
            alt='logo'
            className='mb-2 w-full h-auto max-w-[300px] max-h-[300px]'
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

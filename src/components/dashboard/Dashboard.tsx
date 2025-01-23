"use client";
import Jobs from "./Jobs";
import Image from "next/image";
import Title from "../ui/Title";
import { useState } from "react";
interface DashboardProps {
  isDarkMode: boolean;
}
const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const [salaryRange, setSalaryRange] = useState<number | string>(0);
  const handleSalaryFilter = (event: React.ChangeEventHandler) => {
    setSalaryRange(salaryRange);
  };
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
        <input
          onChange={(event) => setSalaryRange(event.target.value)}
          type='range'
          min={0}
          max='1000000'
          value={salaryRange}
          className='range'
        />
        <p>Salary: {salaryRange} $</p>
        <div className='dashboard-content pt-20'>
          <Jobs salaryRange={Number(salaryRange)} />
        </div>
      </div>
    </section>
  );
};
export default Dashboard;

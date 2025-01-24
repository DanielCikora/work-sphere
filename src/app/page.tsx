"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import Footer from "@/components/footer/Footer";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
const Home = () => {
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );
  return (
    <>
      <main>
        <Dashboard />
      </main>
      <Footer />
    </>
  );
};
export default Home;

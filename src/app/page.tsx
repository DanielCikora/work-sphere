"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import Footer from "@/components/footer/Footer";
import Navigation from "@/components/navigation/Navigation";
import { useEffect, useState } from "react";
const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", newDarkMode.toString());
  };
  return (
    <>
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Dashboard isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </>
  );
};
export default Home;

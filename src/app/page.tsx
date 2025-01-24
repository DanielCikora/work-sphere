import Dashboard from "@/components/dashboard/Dashboard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Work Sphere",
  description: "Work Sphere - Job Searching platform created by Daniel Cikora",
  icons: {
    icon: [
      {
        url: "/icons/WorkSphereLightModeIcon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/WorkSphereDarkModeIcon.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};
const Home = () => {
  return <Dashboard />;
};
export default Home;

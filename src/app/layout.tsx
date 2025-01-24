"use client";
import type { Metadata } from "next";
import { Provider } from "react-redux";
import store, { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "@/store/reduxSlices/darkModeSlice";
import "../styles/globals.css";
import "../styles/loader.css";
import Navigation from "@/components/navigation/Navigation";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased bg-lightBackground text-lightPrimaryText dark:bg-darkBackground dark:text-darkPrimaryText'>
        <Provider store={store}>
          <Navigation />
          {children}
        </Provider>
      </body>
    </html>
  );
}

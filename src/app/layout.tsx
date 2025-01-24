"use client";
import { Provider } from "react-redux";
import store from "@/store/store";
import "../styles/globals.css";
import "../styles/loader.css";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
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
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

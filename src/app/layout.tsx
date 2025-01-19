import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/loader.css";
export const metadata: Metadata = {
  title: "Dev Connect",
  description: "Dev Connect App",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>{children}</body>
    </html>
  );
}

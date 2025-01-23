import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/loader.css";
export const metadata: Metadata = {
  title: "Work Sphere - Find Your Dream Job",
  description:
    "Work Sphere is your go-to platform to discover and apply for the best job opportunities. Built by Daniel Cikora using Next.js, TypeScript, and GSAP.",
  creator: "Daniel Cikora",
  keywords: [
    "Job",
    "Jobs",
    "Job Search",
    "Employment",
    "Career",
    "Work Sphere",
  ],
  icons: {
    icon: "/icons/WorkSphereDarkModeIcon.ico", // Path to your favicon file in the public folder
  },
  openGraph: {
    title: "Work Sphere - Find Your Dream Job",
    description:
      "Discover top job opportunities with Work Sphere, a modern job search platform.",
    url: "https://worksphere.netlify.app", // Update with your website URL
    siteName: "Work Sphere",
    images: [
      {
        url: "/og-image.jpg", // Replace with your Open Graph image in the public folder
        width: 1200,
        height: 630,
        alt: "Work Sphere - Find Your Dream Job",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work Sphere - Find Your Dream Job",
    description:
      "Explore career opportunities with Work Sphere, built by Daniel Cikora.",
    images: ["/og-image.jpg"], // Replace with your Twitter-specific image
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased bg-lightBackground text-lightPrimaryText dark:bg-darkBackground dark:text-darkPrimaryText'>
        {children}
      </body>
    </html>
  );
}

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
interface DashboardProps {
  isDarkMode: boolean;
}
const Footer = () => {
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );
  return (
    <footer
      className={`footer block bg-${
        isDarkMode ? "dark-background" : "light-background"
      } text-${
        isDarkMode ? "dark-primaryText" : "light-primaryText"
      } pt-20 pb-2`}
    >
      <div className='footer-logo max-w-[1280px] mx-auto px-[20px] w-full flex justify-between gap-8'>
        <div>
          <Link href='/' className='block'>
            <Image
              src={
                isDarkMode
                  ? "/icons/WorkSphereDarkModeIcon.ico"
                  : "/icons/WorkSphereLightModeIcon.ico"
              }
              width={70}
              height={70}
              alt='logo'
            />
          </Link>
          <p className='mt-4 max-w-[300px]'>
            Find your dream job on our platform. We connect employers and
            talented professionals.
          </p>
        </div>
        <div className='flex gap-8'>
          <div>
            <h3 className='font-semibold text-lg mb-4'>Company</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/about'
                  className='hover:text-accent hover:underline'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-accent hover:underline'
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href='/careers'
                  className='hover:text-accent hover:underline'
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold text-lg mb-4'>Job Seekers</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/jobs'
                  className='hover:text-accent hover:underline'
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  href='/saved-jobs'
                  className='hover:text-accent hover:underline'
                >
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link href='/faq' className='hover:text-accent hover:underline'>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold text-lg mb-4'>Employers</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/post-job'
                  className='hover:text-accent hover:underline'
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href='/pricing'
                  className='hover:text-accent hover:underline'
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='/testimonials'
                  className='hover:text-accent hover:underline'
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center w-full items-center gap-4'>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} Work Sphere. All Rights Reserved.
        </p>
        <div className='social-icons flex space-x-4'>
          <Link href='https://facebook.com' target='_blank'>
            <FontAwesomeIcon
              icon={faFacebook}
              className='text-xl hover:text-blue-600'
            />
          </Link>
          <Link href='https://twitter.com' target='_blank'>
            <FontAwesomeIcon
              icon={faTwitter}
              className='text-xl hover:text-blue-400'
            />
          </Link>
          <Link href='https://linkedin.com' target='_blank'>
            <FontAwesomeIcon
              icon={faLinkedin}
              className='text-xl hover:text-blue-700'
            />
          </Link>
          <Link href='https://instagram.com' target='_blank'>
            <FontAwesomeIcon
              icon={faInstagram}
              className='text-xl hover:text-pink-500'
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

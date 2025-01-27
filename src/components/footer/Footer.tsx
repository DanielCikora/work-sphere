import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
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
      <div className='footer-logo max-w-[1200px] px-[20px] w-full flex md:flex-row flex-col sm:mx-auto sm:justify-center gap-8 mb-8'>
        <div className='w-full flex flex-col sm:items-start items-center'>
          <Link href='/' className='block'>
            <Image
              src={
                isDarkMode
                  ? "/icons/WorkSphereDarkModeIcon.ico"
                  : "/icons/WorkSphereLightModeIcon.ico"
              }
              width={70}
              height={70}
              alt='work-sphere-logo'
            />
          </Link>
          <p className='mt-4 sm:max-w-[300px] sm:text-left text-center font-normal'>
            Find your dream job on our platform. We connect employers and
            talented professionals.
          </p>
        </div>
        <div className='flex sm:flex-row flex-col items-center sm:text-left text-center sm:min-w-fit w-full gap-8 md:mb-0 mb-8'>
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
                  Contact
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
              <li></li>
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
        <p className='text-sm px-[20px] text-center'>
          &copy; {new Date().getFullYear()} Work Sphere. Designed and built by{" "}
          <a
            href='https://danielcikora.netlify.app'
            className='text-accent font-normal'
          >
            Daniel Cikora
          </a>
          . All Rights Reserved.
        </p>
        <div className='social-icons flex space-x-4'>
          <Link href='https://github.com/DanielCikora' target='_blank'>
            <FontAwesomeIcon
              icon={faGithub}
              className='text-2xl hover:text-blue-600'
            />
          </Link>
          <Link
            href='https://linkedin.com/in/daniel-cikora-a7344a253'
            target='_blank'
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className='text-2xl hover:text-blue-700'
            />
          </Link>
          <Link
            href='https://www.instagram.com/_dissimulated_/'
            target='_blank'
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className='text-2xl hover:text-pink-500'
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

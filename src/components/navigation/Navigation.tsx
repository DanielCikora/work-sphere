"use client";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/store/reduxSlices/darkModeSlice";
import { NavigationLinksDataTypes } from "@/utils/dataTypes/dataTypes";
import HamburgerButton from "../ui/HamburgerButton";
import "../../styles/navigation.css";
const Navigation = () => {
  const [dropdownMenuOpen, setDropDownMenuOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );
  const handleToggleDropdownMenu = () => {
    setDropDownMenuOpen((prev) => !prev);
    document.body.style.overflow = dropdownMenuOpen ? "auto" : "hidden";
  };
  const navigationLinks: NavigationLinksDataTypes[] = [
    { id: 0, href: "/", text: "Home" },
    { id: 1, href: "about", text: "About" },
    { id: 2, href: "contact", text: "Contact" },
  ];
  return (
    <nav className='fixed z-[9999] w-full py-2 top-0 left-0 bg-lightBackground dark:bg-darkBackground border-b border-solid border-lightPrimaryText dark:border-darkPrimaryText'>
      <div className='w-full max-w-full'>
        <div className='nav-content relative flex w-full md:justify-between justify-end items-center'>
          <Link className='block md:w-[104px] pl-[20px]' href='/'>
            <Image
              src={
                isDarkMode
                  ? "/icons/WorkSphereDarkModeIcon.ico"
                  : "/icons/WorkSphereLightModeIcon.ico"
              }
              alt='work-sphere-icon'
              height={50}
              width={50}
            />
          </Link>
          <ul
            className={`hamburger-menu${
              dropdownMenuOpen ? " hamburger-menu--open" : ""
            } bg-lightBackground dark:bg-darkBackground`}
          >
            {navigationLinks.map((navigationLink) => (
              <li key={navigationLink.id}>
                <Link
                  className='hover:text-accent hover:underline'
                  href={navigationLink.href}
                >
                  {navigationLink.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className='flex gap-4 items-center ml-auto pr-[20px]'>
            <label className='flex cursor-pointer gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                aria-hidden='true'
              >
                <circle cx='12' cy='12' r='5' />
                <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
              </svg>
              <input
                type='checkbox'
                value='synthwave'
                className='toggle theme-controller'
                onClick={() => dispatch(toggleDarkMode())}
                aria-label='Toggle dark/light mode'
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                aria-hidden='true'
              >
                <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
              </svg>
            </label>
            <HamburgerButton
              dropdownMenuOpen={dropdownMenuOpen}
              onClick={handleToggleDropdownMenu}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

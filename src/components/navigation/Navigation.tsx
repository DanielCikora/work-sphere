"use client";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, toggleDarkMode } from "@/store/reduxSlices/darkModeSlice";
interface NavigationLinksDataTypes {
  id: number;
  href: string;
  text: string;
}
const Navigation = () => {
  const [dropdownMenuOpen, setDropDownMenuOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );
  const handleToggleDropdownMenu = () => {
    setDropDownMenuOpen(dropdownMenuOpen ? false : true);
    if (dropdownMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  const navigationLinks: NavigationLinksDataTypes[] = [
    { id: 0, href: "/", text: "Home" },
    { id: 1, href: "about", text: "About" },
    { id: 2, href: "contact", text: "Contact" },
  ];
  return (
    <nav className='fixed z-[9999] w-full py-2 top-0 left-0 bg-lightBackground dark:bg-darkBackground border-b border-solid border-lightPrimaryText dark:border-darkPrimaryText'>
      <div className='px-[20px] w-full max-w-full'>
        <div className='nav-content flex w-full justify-between items-center'>
          <Link className='block md:w-[104px]' href='/'>
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
          <ul className='md:flex hidden gap-4 text-xl font-medium'>
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
          <label className='md:flex hidden cursor-pointer gap-2'>
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
          <button
            className='md:hidden block'
            onClick={handleToggleDropdownMenu}
          >
            AXE
          </button>
          {dropdownMenuOpen && (
            <div className='md:hidden flex items-center gap-10'>
              <ul className='flex gap-4 text-xl font-medium'>
                {navigationLinks.map((navigationLink) => (
                  <li key={navigationLink.id}>
                    <Link href={navigationLink.href}>
                      {navigationLink.text}
                    </Link>
                  </li>
                ))}
              </ul>
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

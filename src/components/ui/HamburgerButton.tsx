import { MouseEventHandler } from "react";
interface HamburgerButtonDataTypes {
  dropdownMenuOpen: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const HamburgerButton: React.FC<HamburgerButtonDataTypes> = ({
  onClick,
  dropdownMenuOpen,
}) => {
  return (
    <button className='md:hidden flex flex-col gap-1.5' onClick={onClick}>
      <span
        className={`block h-[3px] w-[36px] bg-black dark:bg-white rounded transition-all duration-300 ease-in-out transform ${
          dropdownMenuOpen ? "rotate-45 translate-y-[7px]" : ""
        }`}
      ></span>
      <span
        className={`block h-[3px] w-[36px] bg-black dark:bg-white rounded transition-all duration-300 ease-in-out ${
          dropdownMenuOpen ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`block h-[3px] w-[36px] bg-black dark:bg-white rounded transition-all duration-300 ease-in-out transform ${
          dropdownMenuOpen ? "-rotate-45 translate-y-[-11px]" : ""
        }`}
      ></span>
    </button>
  );
};

export default HamburgerButton;

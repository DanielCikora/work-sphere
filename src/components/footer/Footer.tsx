import Image from "next/image";
import Link from "next/link";
interface DashboardProps {
  isDarkMode: boolean;
}
const Footer: React.FC<DashboardProps> = ({ isDarkMode }) => {
  return (
    <footer className='footer'>
      <div className='px-[20px]'>
        <div className='footer-content pt-6 pb-32'>
          <Link href='/' className='block'>
            <Image
              src={
                isDarkMode
                  ? "/icons/WorkSphereDarkModeIcon.ico"
                  : "/icons/WorkSphereLightModeIcon.ico"
              }
              width={60}
              height={60}
              alt='logo'
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
const Contact = () => {
  return (
    <section className='min-h-screen flex flex-col items-center px-6 pt-28 bg-lightBackground dark:bg-darkBackground'>
      <h1 className='text-4xl font-bold text-center mb-6 text-lightPrimaryText dark:text-darkPrimaryText'>
        Contact
      </h1>
      <p className='text-lg text-center mb-12 text-lightSecondaryText dark:text-darkSecondaryText'>
        I'd love to hear from you! Feel free to reach out via the direct contact
        details provided.
      </p>
      <div className='w-full text-center mb-12'>
        <p className='text-xl text-lightPrimaryText dark:text-darkPrimaryText'>
          <strong>Email:</strong>{" "}
          <a
            href='mailto:d.cikora98@gmail.com'
            className='text-accent underline hover:no-underline'
          >
            d.cikora98@gmail.com
          </a>
        </p>
      </div>
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
        <Link href='https://www.instagram.com/_dissimulated_/' target='_blank'>
          <FontAwesomeIcon
            icon={faInstagram}
            className='text-2xl hover:text-pink-500'
          />
        </Link>
      </div>
    </section>
  );
};

export default Contact;

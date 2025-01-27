import Image from "next/image";
const About = () => {
  return (
    <section className='about-us min-h-dvh bg-gray-100 dark:bg-darkBackground dark:text-gray-100 pt-20 px-8'>
      <div className='max-w-[1200px] mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold mb-4'>About</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            Learn more about my mission, values, and the story behind Work
            Sphere.
          </p>
        </div>
        <div className='flex flex-wrap md:flex-row flex-col items-center justify-between gap-12'>
          <div className='flex-1'>
            <p className='text-lg leading-7 mb-6'>
              Welcome to <span className='font-semibold'>Work Sphere</span>! My
              mission is to connect talented individuals with the companies that
              need them the most. I strive to make the process smooth,
              efficient, and rewarding.
            </p>
            <p className='text-lg leading-7 mb-6'>
              Work Sphere was lovingly crafted by{" "}
              <span className='font-semibold text-accent'>
                {" "}
                <a
                  href='https://danielcikora.netlify.app'
                  className='text-accent font-normal cursor-pointer'
                >
                  Daniel Cikora
                </a>
              </span>
              , a passionate Frontend Developer based in Novi Sad, Serbia. With
              a strong love for modern web technologies, I wanted to create a
              platform that not only looks great but also delivers a seamless
              experience for job seekers.
            </p>
            <p className='text-lg leading-7'>
              My goal is to empower people to find meaningful careers while
              enabling businesses to grow with the right talent. Thank you for
              being part of this journey.
            </p>
          </div>
          <div className='flex-1'>
            <Image
              src='/images/globe.jpg'
              alt='About Us - Team'
              width={500}
              height={500}
              className='rounded-lg shadow-md dark:grayscale-[1]'
            />
          </div>
        </div>
        <div className='text-center mt-12'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Designed and Developed by{" "}
            <a
              href='https://danielcikora.netlify.app'
              className='text-accent font-normal'
            >
              Daniel Cikora
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
export default About;

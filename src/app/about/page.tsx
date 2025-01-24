import Image from "next/image";
const About = () => {
  return (
    <section className='about-us min-h-dvh bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-16 px-8'>
      <div className='max-w-[1200px] mx-auto'>
        {/* Heading */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold mb-4'>About Us</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            Learn more about my mission, values, and the story behind Work
            Sphere.
          </p>
        </div>
        {/* Content */}
        <div className='flex flex-wrap items-center justify-between gap-12'>
          {/* Text Content */}
          <div className='flex-1'>
            <p className='text-lg leading-7 mb-6'>
              Welcome to <span className='font-semibold'>Work Sphere</span>! My
              mission is to connect talented individuals with the companies that
              need them the most. Whether you're searching for your dream job or
              the perfect candidate to join your team, we strive to make the
              process smooth, efficient, and rewarding.
            </p>
            <p className='text-lg leading-7 mb-6'>
              Work Sphere was lovingly crafted by{" "}
              <span className='font-semibold text-accent'>Daniel Cikora</span>,
              a passionate Frontend Developer based in Novi Sad, Serbia. With a
              strong love for modern web technologies, I wanted to create a
              platform that not only looks great but also delivers a seamless
              experience for job seekers and employers alike.
            </p>
            <p className='text-lg leading-7'>
              My goal is to empower people to find meaningful careers while
              enabling businesses to grow with the right talent. Thank you for
              being part of this journey.
            </p>
          </div>
          {/* Image Content */}
          <div className='flex-1'>
            <Image
              src='/images/about-us-team.jpg' // Replace this with your actual image path
              alt='About Us - Team'
              width={500}
              height={350}
              className='rounded-lg shadow-md'
            />
          </div>
        </div>
        {/* Footer */}
        <div className='text-center mt-12'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Made with ❤️ in Serbia by Daniel Cikora.
          </p>
        </div>
      </div>
    </section>
  );
};
export default About;

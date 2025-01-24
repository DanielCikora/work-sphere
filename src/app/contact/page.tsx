"use client";
const Contact = () => {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-lightBackground dark:bg-darkBackground'>
      <h1 className='text-4xl font-bold text-center mb-6 text-lightPrimaryText dark:text-darkPrimaryText'>
        Contact Us
      </h1>
      <p className='text-lg text-center mb-12 text-lightSecondaryText dark:text-darkSecondaryText'>
        We'd love to hear from you! Feel free to reach out via the contact form
        below, or use the direct contact details provided.
      </p>

      {/* Contact Details */}
      <div className='w-full max-w-md text-center mb-12'>
        <p className='text-xl text-lightPrimaryText dark:text-darkPrimaryText'>
          <strong>Email:</strong>{" "}
          <a
            href='mailto:d.cikora98@gmail.com'
            className='text-lightAccent dark:text-darkAccent underline hover:no-underline'
          >
            d.cikora98@gmail.com
          </a>
        </p>
        <p className='text-xl text-lightPrimaryText dark:text-darkPrimaryText mt-4'>
          <strong>Phone:</strong>{" "}
          <a
            href='tel:+381645793758'
            className='text-lightAccent dark:text-darkAccent underline hover:no-underline'
          >
            +381 64 579 3758
          </a>
        </p>
      </div>

      {/* Contact Form */}
      <form
        className='w-full max-w-lg bg-lightSurface dark:bg-darkSurface p-6 rounded-lg shadow-md'
        onSubmit={(e) => {
          e.preventDefault();
          alert("Your message has been submitted. We'll get back to you soon!");
        }}
      >
        <div className='mb-6'>
          <label
            htmlFor='name'
            className='block text-lg font-medium text-lightPrimaryText dark:text-darkPrimaryText mb-2'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full p-3 border border-lightPrimaryText dark:border-darkPrimaryText rounded-md bg-lightBackground dark:bg-darkBackground text-lightPrimaryText dark:text-darkPrimaryText focus:outline-none focus:ring-2 focus:ring-lightAccent dark:focus:ring-darkAccent'
            placeholder='Your Name'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='block text-lg font-medium text-lightPrimaryText dark:text-darkPrimaryText mb-2'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='w-full p-3 border border-lightPrimaryText dark:border-darkPrimaryText rounded-md bg-lightBackground dark:bg-darkBackground text-lightPrimaryText dark:text-darkPrimaryText focus:outline-none focus:ring-2 focus:ring-lightAccent dark:focus:ring-darkAccent'
            placeholder='Your Email'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='message'
            className='block text-lg font-medium text-lightPrimaryText dark:text-darkPrimaryText mb-2'
          >
            Message
          </label>
          <textarea
            id='message'
            name='message'
            className='w-full p-3 border border-lightPrimaryText dark:border-darkPrimaryText rounded-md bg-lightBackground dark:bg-darkBackground text-lightPrimaryText dark:text-darkPrimaryText focus:outline-none focus:ring-2 focus:ring-lightAccent dark:focus:ring-darkAccent'
            placeholder='Your Message'
            rows={5}
            required
          ></textarea>
        </div>
        <button
          type='submit'
          className='w-full p-3 bg-lightAccent dark:bg-darkAccent text-lightOnAccent dark:text-darkOnAccent rounded-md text-lg font-bold hover:opacity-90'
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;

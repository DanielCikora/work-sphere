"use client";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useJobs } from "@/hooks/useJobs";
import { formatDate } from "@/utils/constants/formatDate";
const Jobs = () => {
  const {
    error,
    loading,
    selectedIndustry,
    setSelectedIndustry,
    setSearch,
    jobs,
    jobIndustries,
    setSalaryRange,
    salaryRange,
    handleSearchKeyPress,
    setSearchTerm,
    handleSearchClick,
    currentItems,
    handleSaveJob,
    saveJob,
    currentPage,
    detailsRef,
    handlePageChange,
    setShowDetailsModal,
    showDetailsModal,
    totalPages,
  } = useJobs();
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (loading) {
    return (
      <div className='h-dvh w-full grid place-items-center'>
        <div className='loader'></div>
      </div>
    );
  }
  return (
    <>
      <section className='filter-buttons grid text-center lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-2 mb-[40px]'>
        <button
          className={`md:px-4 font-medium px-0.5 md:text-md text-sm md:py-2 py-2 rounded ${
            selectedIndustry === null
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
          onClick={() => {
            setSelectedIndustry(null);
            setSearch(jobs);
          }}
        >
          All Industries
        </button>
        {jobIndustries.map((industry) => (
          <button
            key={industry}
            className={`md:px-4 font-medium px-0.5 md:text-md text-sm md:py-2 py-2 rounded ${
              selectedIndustry === industry
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => {
              setSelectedIndustry(industry);
              const filteredJobs = jobs.filter((job) =>
                job.jobIndustry?.includes(industry)
              );
              setSearch(filteredJobs);
            }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(industry) }}
          />
        ))}
      </section>
      <section className='salary-range mx-auto mb-[40px] max-w-[800px]'>
        <input
          type='range'
          min='0'
          max={500000}
          step='10000'
          value={salaryRange}
          onChange={(event) => setSalaryRange(Number(event.target.value))}
          className='range block w-full'
        />
        <h3 className='text-center font-medium md:text-lg text-md'>
          {`Salary Range: Up to ${salaryRange} $`}
        </h3>
      </section>
      <section className='search-container justify-center flex gap-2 mb-[40px]'>
        <label className='search-input flex w-full max-w-[600px] items-center gap-2 bg-inherit'>
          <input
            onChange={(event) => setSearchTerm(event.target.value)}
            type='text'
            className='md:py-2.5 py-2 md:px-2 px-1 bg-inherit block w-full border border-solid border-light-border rounded bg-light-background dark:bg-dark-background dark:text-dark-primaryText text-light-primaryText placeholder-light-secondaryText dark:placeholder-dark-secondaryText'
            placeholder='Search by job position, company, location, or industry...'
            onKeyDown={handleSearchKeyPress}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-6 w-6 opacity-70 cursor-pointer'
            onClick={handleSearchClick}
          >
            <path
              fillRule='evenodd'
              d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
              clipRule='evenodd'
            />
          </svg>
        </label>
      </section>
      <section className='jobs grid gap-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-left place-items-center'>
        {currentItems.map((job) => (
          <div
            className='w-full max-w-full min-h-[400px] text-left p-4 rounded-md bg-light-cardBackground dark:bg-dark-cardBackground border border-solid border-light-border dark:border-dark-border text-light-primaryText dark:text-dark-primaryText'
            key={job.id}
          >
            <ul className='w-full text-left mb-4'>
              <div className='flex flex-col w-full'>
                <div className='flex flex-row justify-between w-full'>
                  <h2 className='md:text-md text-sm font-medium mb-2 text-center'>
                    {formatDate(job.pubDate)}
                  </h2>
                  <button
                    aria-label={`Save job ${job.jobTitle}`}
                    type='button'
                    onClick={() => handleSaveJob(job.id)}
                  >
                    <FontAwesomeIcon
                      icon={
                        saveJob[job.id] ? faBookmarkSolid : faBookmarkRegular
                      }
                      className='block cursor-pointer text-2xl text-black dark:text-white'
                    />
                  </button>
                </div>
                <div className='grid p-1 place-items-center md:h-16 h-12 md:w-16 w-12 overflow-hidden md:mb-4 mb-2'>
                  <img
                    className='block w-full h-auto'
                    src={
                      job.companyLogo ||
                      "https://www.adobe.com/creativecloud/design/discover/minimalist-logo-design.html"
                    }
                    alt='No Logo'
                  />
                </div>
              </div>
              <li className='md:text-xl text-lg font-semibold md:min-h-[60px] min-h-[50px]'>
                {job.jobTitle}
              </li>
              <li
                className='font-normal md:text-lg text-md md:min-h-[60px] min-h-[50px]'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(job.companyName),
                }}
              />
              <li className='md:text-md text-sm md:min-h-[60px] min-h-[50px]'>
                {job.jobGeo}
              </li>
              <li
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(job.jobIndustry),
                }}
                className='md:text-md text-sm min-h-[50px] text-wrap flex xl:flex-row flex-col gap-2'
              />
            </ul>
            <div className='md:border-t border-solid border-light-border dark:border-dark-border'>
              <div className='flex md:text-lg sm:text-md text-sm xl:flex-row flex-col w-full sm:items-center sm:justify-between gap-2 mt-4'>
                {job.annualSalaryMax === undefined &&
                job.annualSalaryMin === undefined ? (
                  <h3>Salary Unspecified.</h3>
                ) : (
                  <h3>
                    {job.annualSalaryMin} - {job.annualSalaryMax}{" "}
                    {job.salaryCurrency}
                  </h3>
                )}
                <Button
                  className='block text-lg font-medium sm:w-fit w-full sm:text-left text-center border-2 border-solid rounded py-1 px-2 hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white border-black dark:border-white dark:hover:bg-dark-accent dark:hover:text-dark-primaryText transition-all duration-200 ease-in-out'
                  onClick={() => setShowDetailsModal(true)}
                  text='View More'
                  type='button'
                />
                {showDetailsModal && (
                  <Modal
                    className='max-w-[1400px] w-full max-h-full h-full overflow-y-auto text-black dark:text-darkPrimaryText'
                    closeModal={() => setShowDetailsModal(false)}
                    ref={detailsRef}
                  >
                    <h2 className='mb-8 text-2xl font-semibold'>
                      {job.jobTitle}
                    </h2>
                    <h3 className='text-xl mb-4'>
                      <strong className='text-2xl font-medium text-gray-800'>
                        {job.companyName}
                      </strong>
                    </h3>
                    <div
                      className='details text-lg'
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(job.jobDescription),
                      }}
                    />
                    <a
                      href={job.url}
                      className='block text-xl mt-6 text-black font-medium sm:w-fit w-full sm:text-left text-center border-2 border-solid rounded py-2 px-2 hover:bg-black hover:text-white border-black dark:border-dark-border dark:hover:bg-dark-accent dark:hover:text-dark-primaryText transition-all duration-200 ease-in-out'
                    >
                      Apply now
                    </a>
                  </Modal>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className='pagination flex flex-wrap justify-center md:gap-2 gap-0.5 mt-8'>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`md:py-2 py-1 md:px-4 px-1 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-gray-200"
          } dark:bg-gray-700 dark:text-white`}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`py-2 md:px-4 px-3 rounded ${
              currentPage === index + 1
                ? "bg-inherit text-gray-700 dark:text-white border border-solid border-gray-700 dark:border-white"
                : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`md:py-2 py-1 md:px-4 px-1 rounded ${
            currentPage === totalPages ? "bg-gray-300" : "bg-gray-200"
          } dark:bg-gray-700 dark:text-white`}
        >
          Next
        </button>
      </section>
    </>
  );
};
export default Jobs;

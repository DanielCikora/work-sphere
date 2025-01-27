"use client";
import { useEffect, useState, useRef } from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import { JobsDataTypes } from "@/utils/dataTypes/dataTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
const Jobs = () => {
  const [jobs, setJobs] = useState<JobsDataTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [jobIndustries, setJobIndustries] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<JobsDataTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [saveJob, setSaveJob] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [salaryRange, setSalaryRange] = useState<number>(500000);
  const itemsPerPage = 9;
  const detailsRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      detailsRef.current &&
      !detailsRef.current.contains(event.target as Node)
    ) {
      setShowDetailsModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedJobs = localStorage.getItem("savedJobs");
      setSaveJob(savedJobs ? JSON.parse(savedJobs) : {});
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(saveJob));
  }, [saveJob]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<{ jobs: JobsDataTypes[] }>(
          "https://jobicy.com/api/v2/remote-jobs"
        );
        setJobs(response.data.jobs);
        setSearch(response.data.jobs);
        const industries: string[] = [
          ...new Set(
            response.data.jobs
              .flatMap((job: JobsDataTypes) => job.jobIndustry || [])
              .map((industry: string) => industry.trim())
          ),
        ];
        setJobIndustries(industries);
      } catch (error) {
        console.error(error);
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  useEffect(() => {
    const applyFilters = () => {
      let filteredJobs = jobs;
      if (selectedIndustry) {
        filteredJobs = filteredJobs.filter((job) =>
          job.jobIndustry?.includes(selectedIndustry)
        );
      }
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        filteredJobs = filteredJobs.filter(
          (job) =>
            job.jobTitle.toLowerCase().includes(searchTermLower) ||
            job.companyName.toLowerCase().includes(searchTermLower) ||
            job.jobGeo.toLowerCase().includes(searchTermLower) ||
            (Array.isArray(job.jobIndustry) &&
              job.jobIndustry.some((industry) =>
                industry.toLowerCase().includes(searchTermLower)
              ))
        );
      }
      filteredJobs = filteredJobs.filter((job) => {
        const { annualSalaryMin, annualSalaryMax } = job;
        if (annualSalaryMin === undefined && annualSalaryMax === undefined) {
          return "Salary Unspecified.";
        }
        if (annualSalaryMin !== undefined && annualSalaryMax !== undefined) {
          return annualSalaryMax <= salaryRange;
        }
        return false;
      });
      setSearch(filteredJobs);
    };
    applyFilters();
  }, [selectedIndustry, searchTerm, salaryRange, jobs]);

  const handleSaveJob = (id: number) => {
    setSaveJob((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };
  const formatDate = (isoDate: string) => {
    if (!isoDate) return "Unknown Date";
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "Invalid Date";
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
  };
  const handleSearchClick = () => {
    const filteredItems = jobs.filter((job) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        job.jobTitle.toLowerCase().includes(searchTermLower) ||
        job.companyName.toLowerCase().includes(searchTermLower) ||
        job.jobGeo.toLowerCase().includes(searchTermLower) ||
        (Array.isArray(job.jobIndustry) &&
          job.jobIndustry.some((industry) =>
            industry.toLowerCase().includes(searchTermLower)
          ))
      );
    });
    setSearch(filteredItems);
    setCurrentPage(1);
  };
  const handleSearchKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };
  const totalItems = search.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = search.slice(startIndex, endIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
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
      <section className='filter-buttons flex flex-wrap gap-2 justify-center my-4'>
        <button
          className={`px-4 py-2 rounded ${
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
            className={`px-4 py-2 rounded ${
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
      <section className='search-container justify-center flex gap-2 mb-8'>
        <label className='search-input flex w-full max-w-[600px] items-center gap-2 bg-inherit'>
          <input
            onChange={(event) => setSearchTerm(event.target.value)}
            type='text'
            className='py-2.5 px-2 bg-inherit block w-full border-2 border-solid border-light-border rounded bg-light-background dark:bg-dark-background dark:text-dark-primaryText text-light-primaryText placeholder-light-secondaryText dark:placeholder-dark-secondaryText'
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
      <section className='salary-range mx-auto max-w-[800px]'>
        <input
          type='range'
          min='0'
          max={500000}
          step='10000'
          value={salaryRange}
          onChange={(event) => setSalaryRange(Number(event.target.value))}
          className='range block w-full'
        />
        <h3 className='text-center text-lg'>
          {`Salary Range: Up to ${salaryRange} $`}
        </h3>
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
                  <h2 className='md:text-md sm:text-sm text-xs font-medium mb-2 text-center'>
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
                      className='block cursor-pointer md:text-xl text-lg text-black dark:text-white'
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
              <li className='md:text-xl sm:text-lg text-md font-semibold md:min-h-[60px] min-h-[50px]'>
                {job.jobTitle}
              </li>
              <li className='md:text-lg sm:text-md text-sm md:min-h-[60px] min-h-[50px]'>
                {job.companyName}
              </li>
              <li className='md:text-md sm:text-sm text-xs md:min-h-[60px] min-h-[50px]'>
                {job.jobGeo}
              </li>
              <li
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(job.jobIndustry),
                }}
                className='md:text-md sm:text-sm text-xs min-h-[50px] text-wrap flex xl:flex-row flex-col gap-2'
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
                  className='block font-medium sm:w-fit w-full sm:text-left text-center border-2 border-solid rounded py-1 px-2 hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white border-black dark:border-white dark:hover:bg-dark-accent dark:hover:text-dark-primaryText transition-all duration-200 ease-in-out'
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
                      At:{" "}
                      <strong className='text-2xl font-medium text-gray-800'>
                        {job.companyName}
                      </strong>
                    </h3>
                    <div
                      className='details'
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(job.jobDescription),
                      }}
                    />
                    <a
                      href={job.url}
                      className='block mt-6 text-black font-medium sm:w-fit w-full sm:text-left text-center border-2 border-solid rounded py-1 px-2 hover:bg-black hover:text-white border-black dark:border-dark-border dark:hover:bg-dark-accent dark:hover:text-dark-primaryText transition-all duration-200 ease-in-out'
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
      <section className='pagination flex justify-center gap-2 mt-8'>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`py-2 px-4 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-gray-200"
          } dark:bg-gray-700 dark:text-white`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`py-2 px-4 rounded ${
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
          className={`py-2 px-4 rounded ${
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

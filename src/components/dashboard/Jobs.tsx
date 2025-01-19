"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { JobsDataTypes } from "@/utils/dataTypes/dataTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
export default function Jobs() {
  const [jobs, setJobs] = useState<JobsDataTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<JobsDataTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [saveJob, setSaveJob] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      const savedJobs = localStorage.getItem("savedJobs");
      return savedJobs ? JSON.parse(savedJobs) : {};
    }
    return {};
  });
  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(saveJob));
  }, [saveJob]);
  useEffect(() => {
    const jobsData = async () => {
      try {
        const response = await axios.get("https://remoteok.com/api");
        const filteredJobs = response.data.slice(1);
        setJobs(filteredJobs);
        setError(null);
        setSearch(filteredJobs);
      } catch (error) {
        console.error(error);
        setError("Try again");
      } finally {
        setLoading(false);
      }
    };
    jobsData();
  }, []);
  if (error) {
    return <div>Please try again.</div>;
  }
  if (loading) {
    return (
      <div className='h-dvh w-full grid place-items-center'>
        <div className='loader'></div>
      </div>
    );
  }
  const handleSaveJob = (id: string) => {
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
        job.position.toLowerCase().includes(searchTermLower) ||
        job.company.toLowerCase().includes(searchTermLower) ||
        job.location.toLowerCase().includes(searchTermLower) ||
        (Array.isArray(job.tags) &&
          job.tags.some((tag) => tag.toLowerCase().includes(searchTermLower)))
      );
    });
    setSearch(filteredItems);
  };
  const handleSearchKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };
  return (
    <>
      <section className='search-container flex justify-center gap-2 mb-8'>
        <label className='input flex w-full max-w-[600px] items-center gap-2 pr-2'>
          <input
            onChange={(event) => setSearchTerm(event.target.value)}
            type='text'
            className='py-2.5 px-2 block w-full border-2 border-solid border-light-border rounded'
            placeholder='Search by job position, company, location, or skills...'
            onKeyDown={handleSearchKeyPress}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-6 w-6 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
              clipRule='evenodd'
            />
          </svg>
        </label>
        <button
          className='block font-medium sm:w-fit w-full sm:text-left text-center border-2 border-solid rounded py-1 px-4 hover:bg-black hover:text-white border-black transition-all duration-200 ease-in-out'
          onClick={handleSearchClick}
        >
          Search
        </button>
      </section>
      <section className='jobs grid gap-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-left place-items-center'>
        {search &&
          search.map((job) => (
            <div
              className='w-full max-w-full min-h-[400px] text-left p-4 rounded-md bg-white border border-solid border-light-border text-light-primaryText'
              key={job.id}
            >
              <ul className='w-full text-left mb-4'>
                <div className='flex flex-col w-full'>
                  <div className='flex flex-row justify-between w-full'>
                    <h2 className='md:text-md sm:text-sm text-xs font-medium mb-2 text-center'>
                      {formatDate(job.date)}
                    </h2>
                    <button type='button' onClick={() => handleSaveJob(job.id)}>
                      <FontAwesomeIcon
                        icon={
                          saveJob[job.id] ? faBookmarkSolid : faBookmarkRegular
                        }
                        className='block cursor-pointer md:text-xl text-lg text-black'
                      />
                    </button>
                  </div>
                  <div className='grid p-1 place-items-center md:h-16 h-12 md:w-16 w-12 overflow-hidden md:mb-4 mb-2'>
                    <img
                      className='block w-full h-auto'
                      src={
                        job.company_logo ||
                        "https://www.adobe.com/creativecloud/design/discover/minimalist-logo-design.html"
                      }
                      alt='no logo'
                    />
                  </div>
                </div>
                <li className='md:text-xl sm:text-lg text-md font-semibold md:min-h-[60px] min-h-[50px]'>
                  {job.position}
                </li>
                <li className='md:text-lg sm:text-md text-sm md:min-h-[60px] min-h-[50px]'>
                  {job.company}
                </li>
                <li className='md:text-md sm:text-sm text-xs md:min-h-[60px] min-h-[50px]'>
                  {job.location}
                </li>
                <li className='md:text-md sm:text-sm text-xs min-h-[50px] text-wrap flex xl:flex-row flex-col gap-2'>
                  {Array.isArray(job.tags)
                    ? job.tags.slice(0, 3).map((tag, index) => (
                        <span
                          className='border-2 w-fit h-fit border-solid border-light-border rounded py-0.5 px-1 capitalize'
                          key={index}
                        >
                          {tag}
                        </span>
                      ))
                    : "No tags"}
                </li>
              </ul>
              <div className='md:border-t border-solid border-light-border'>
                <div className='flex md:text-lg sm:text-md text-sm xl:flex-row flex-col w-full sm:items-center sm:justify-between gap-2 mt-4'>
                  {job.salary_max === 0 && job.salary_min === 0 ? (
                    <h3>Internship</h3>
                  ) : (
                    <h3>
                      {job.salary_min} - {job.salary_max} $
                    </h3>
                  )}
                  <a
                    href={job.apply_url}
                    target='_blank'
                    className='block font-medium sm:w-fit w-full sm:text-left text-center border-2 border-solid rounded py-1 px-2 hover:bg-black hover:text-white border-black transition-all duration-200 ease-in-out'
                  >
                    Apply now
                  </a>
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}

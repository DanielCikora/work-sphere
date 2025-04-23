import Modal from "@/components/ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import DOMPurify from "dompurify";
import Button from "@/components/ui/Button";
import { RefObject } from "react";
type JobDataType = {
  id: number;
  pubDate: string;
  companyLogo: string;
  jobTitle: string;
  companyName: string;
  jobGeo: string;
  jobIndustry: string;
  annualSalaryMin?: number;
  annualSalaryMax?: number;
  salaryCurrency: string;
  jobDescription: string;
  url: string;
};
type JobCardsPropsDataTypes = {
  currentItems: JobDataType[];
  formatDate: (date: string) => string;
  handleSaveJob: (jobId: number) => void;
  showDetailsModal: boolean;
  setShowDetailsModal: (show: boolean) => void;
  saveJob: Record<number, boolean>;
  detailsRef: RefObject<HTMLDivElement | null>;
};
export default function JobCards({
  currentItems,
  formatDate,
  handleSaveJob,
  setShowDetailsModal,
  showDetailsModal,
  detailsRef,
  saveJob,
}: JobCardsPropsDataTypes) {
  return (
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
                    icon={saveJob[job.id] ? faBookmarkSolid : faBookmarkRegular}
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
  );
}

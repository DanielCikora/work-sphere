import DOMPurify from "dompurify";
import { JobsDataTypes } from "@/utils/dataTypes/dataTypes";
type FilterButtonsPropsDataTypes = {
  selectedIndustry: string | null;
  setSelectedIndustry: (industry: string | null) => void;
  setSearch: (jobs: JobsDataTypes[]) => void;
  jobs: JobsDataTypes[];
  jobIndustries: string[];
};
export default function FilterButtons({
  selectedIndustry,
  setSelectedIndustry,
  setSearch,
  jobs,
  jobIndustries,
}: FilterButtonsPropsDataTypes) {
  return (
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
  );
}

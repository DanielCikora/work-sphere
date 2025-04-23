import { JobsDataTypes } from "@/utils/dataTypes/dataTypes";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
export const useJobs = () => {
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

  return {
    error,
    loading,
    selectedIndustry,
    setSelectedIndustry,
    setSearch,
    jobs,
    jobIndustries,
    salaryRange,
    setSalaryRange,
    setSearchTerm,
    handleSearchKeyPress,
    handleSearchClick,
    currentItems,
    handleSaveJob,
    saveJob,
    showDetailsModal,
    detailsRef,
    setShowDetailsModal,
    currentPage,
    handlePageChange,
    totalPages,
  };
};

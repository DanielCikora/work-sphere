"use client";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useJobs } from "@/hooks/useJobs";
import { formatDate } from "@/utils/constants/formatDate";
import FilterButtons from "./FilterButtons";
import SalaryRange from "./SalaryRange";
import Search from "./Search";
import Pagination from "./Pagination";
import JobCards from "./JobCards";
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
      <FilterButtons
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        setSearch={setSearch}
        jobs={jobs}
        jobIndustries={jobIndustries}
      />
      <SalaryRange salaryRange={salaryRange} setSalaryRange={setSalaryRange} />
      <Search
        handleSearchClick={handleSearchClick}
        handleSearchKeyPress={handleSearchKeyPress}
        setSearchTerm={setSearchTerm}
      />
      <JobCards
        currentItems={currentItems}
        detailsRef={detailsRef}
        formatDate={formatDate}
        handleSaveJob={handleSaveJob}
        saveJob={saveJob}
        setShowDetailsModal={setShowDetailsModal}
        showDetailsModal={showDetailsModal}
      />
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </>
  );
};
export default Jobs;

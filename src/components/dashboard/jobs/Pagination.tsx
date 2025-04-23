type PaginationPropsDataTypes = {
  currentPage: number;
  handlePageChange: (currentPage: number) => void;
  totalPages: number;
};
export default function Pagination({
  currentPage,
  handlePageChange,
  totalPages,
}: PaginationPropsDataTypes) {
  return (
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
  );
}

import { KeyboardEventHandler } from "react";

type SearchPropsDataTypes = {
  setSearchTerm: (value: string) => void;
  handleSearchKeyPress: KeyboardEventHandler<HTMLInputElement>;
  handleSearchClick: () => void;
};
export default function Search({
  setSearchTerm,
  handleSearchKeyPress,
  handleSearchClick,
}: SearchPropsDataTypes) {
  return (
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
  );
}

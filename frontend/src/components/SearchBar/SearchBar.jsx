import React, { memo } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 dark:bg-[#353535] rounded-md">
      {/* search input field */}
      <input
        type="text"
        placeholder="Search Notes"
        value={value}
        onChange={onChange}
        className="w-full text-xs bg-transparent text-surface-a0 dark:text-primary-a0 py-[11px] outline-none"
      />

      {/* display the search query has value */}
      {value && (
        // on clear the search query
        <IoMdClose
          className="text-stone-500 cursor-pointer hover:text-black dark:hover:text-primary-a0 mr-3"
          onClick={onClearSearch}
        />
      )}

      {/* search icon  */}
      <FaMagnifyingGlass
        onClick={handleSearch}
        className="text-slate-400 cursor-pointer hover:text-black dark:hover:text-primary-a0"
      />
    </div>
  );
};

export default memo(SearchBar);

import React, { useCallback, useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import ThemeToggle from "../Theme/ThemeToggle";
import Logo from "../../assets/logo.svg";

const NavBar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  // state to manage the search bar input field value
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); //useNavigate hook from the react router dom to programmatically redirect between pages

  // function the handle the logout logic
  const onLogout = useCallback(() => {
    // navigate or redirect the user to the login page
    navigate("/");
    // clear the all the local storage
    localStorage.clear();
  }, [navigate]);

  //function to handle the search logic
  const handleSearch = () => {
    if (searchQuery) onSearchNote(searchQuery);
  };

  //   function the clear the search query state value
  const onClearSearch = () => {
    setSearchQuery(""); // empty search query state
    handleClearSearch();
  };
  return (
    <div className="bg-primary-a0 dark:bg-surface-a10  flex items-center justify-between px-1 sm:px-6 py-2 drop-shadow sticky top-0 z-[100]">
      {/* logo container */}
      <div className="flex items-center cursor-pointer">
        <img src={Logo} className="w-[40px] h-[40px]" alt="QuickNotes" />
        <h2 className="text-xl hidden sm:block font-medium  py-2">
          QuickNotes
        </h2>
      </div>

      {/* Search bar component */}
      {userInfo && (
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          onClearSearch={onClearSearch}
          handleSearch={handleSearch}
        />
      )}

      <div className="flex items-center gap-0 sm:gap-5">
        {/* theme toggle button component */}
        <ThemeToggle />
        {/* profile card component */}
        {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
      </div>
    </div>
  );
};

export default React.memo(NavBar);

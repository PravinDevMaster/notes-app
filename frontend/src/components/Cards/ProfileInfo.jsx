import React, { memo, useEffect, useRef, useState } from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    if (window.innerWidth <= 640) setIsOpen((prev) => !prev);
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hide dropdown when screen size expands to "sm" (640px or larger)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="relative flex items-center gap-3 transition-all"
      ref={dropdownRef}
    >
      {/* user initials profile logo container */}
      <div
        className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer sm:cursor-default"
        onClick={toggleDropdown}
      >
        {/* displaying initials from the getInitials function */}
        {getInitials(userInfo?.fullName)}
      </div>
      <div className="hidden sm:flex flex-col">
        {/* user name display */}
        <p className="text-sm font-medium">{userInfo?.fullName}</p>
        {/* logout button */}
        <button
          className="text-sm text-slate-700 dark:text-primary-a0 underline cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      {/* Dropdown for mobile (visible only when clicked) */}
      {isOpen && (
        <div className="absolute right-0 top-7 w-max bg-white shadow-lg dark:bg-surface-a10 shadow-2xl p-2 rounded-lg z-[9999] pointer-events-auto">
          <p className="text-sm font-medium">{userInfo?.fullName}</p>
          <button
            className="text-sm text-slate-700 dark:text-primary-a0 underline cursor-pointer block px-3 py-1 rounded-md w-full"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(ProfileInfo);

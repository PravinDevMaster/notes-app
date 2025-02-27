import { memo } from "react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useTheme } from "../../context/ThemeProvider";

const ThemeToggle = () => {
  const { theme, handleThemeToggle } = useTheme();

  return (
    <div
      onClick={() => handleThemeToggle()}
      className=" cursor-pointer text-2xl"
    >
      {theme === "dark" ? <BsSunFill /> : <BsMoonStarsFill />}
    </div>
  );
};

export default memo(ThemeToggle);

import React from "react";
import ThemeToggleCss from './ThemeToggle.module.css';

const ThemeToggle = ({ setTheme }) => {
  return (
    <div className={ThemeToggleCss.ThemeToggle}>
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
      <button onClick={() => setTheme("funky")}>Funky Mode</button>
    </div>
  );
};

export default ThemeToggle;
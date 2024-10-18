import React from "react";
import './ThemeToggle.css';

const ThemeToggle = ({ setTheme }) => {
  return (
    <div className="theme-toggle">
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
      <button onClick={() => setTheme("funky")}>Funky Mode</button>
    </div>
  );
};

export default ThemeToggle;
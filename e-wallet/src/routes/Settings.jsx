import ThemeToggle from "../features/ThemeToggle/ThemeToggle";
import DeleteInactiveCards from "../features/DeleteInactiveCards/DeleteInactiveCards";

const Settings = ({ setTheme }) => {
  return (
    <div>
      <ThemeToggle setTheme={setTheme} /> {/* Skickar setTheme */}
      <DeleteInactiveCards />
    </div>
  );
};

export default Settings;
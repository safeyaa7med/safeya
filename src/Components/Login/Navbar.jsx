import logo from "../../assets/favicon.ico.png";
import { useState, useEffect } from "react";
import { LanguageContext } from "../LanguageContext";
import US from "../../assets/us.png";
import SA from "../../assets/sa.png";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "عربي"
  );
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
  const handleToggleEnglish = () => {
    setLanguage("English");
    window.location.reload();
  };

  const handleToggleArabic = () => {
    setLanguage("عربي");
    window.location.reload();
  };
  const parentDir = language === "English" ? "ltr" : "rtl";

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <nav className="w-full fixed top-0 bg-white z-10 dark:bg-slate-900 bg-gradient-to-r from-indigo-500">
        <div className="container mx-auto py-3 flex items-center justify-between px-4">
          <div className="flex items-center">
            <img className="w-12 h-10 rounded " src={logo} alt="logo" />
          </div>
          <div className="flex flex-row items-center gap-10 flex-wrap">
            <div className="flex flex-row justify-between items-center gap-10 hover:text-gray-500 text-gray-600 dark:text-gray-100 cursor-pointer">
              <img
                src={US}
                alt="English"
                className={`w-6 h-6  ${
                  parentDir === "ltr" ? "hidden" : "inline-block"
                }`}
                onClick={handleToggleEnglish}
              />
              <img
                src={SA}
                alt="English"
                className={`w-6 h-5  ${
                  parentDir === "rtl" ? "hidden" : "block"
                }`}
                onClick={handleToggleArabic}
              />
              <div onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </LanguageContext.Provider>
  );
};

export default Navbar;

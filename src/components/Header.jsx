// import React from "react";
// import dayjs from "dayjs";
// import "./Header.css";
// import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const Header = ({ currentMonth, setCurrentMonth, currentView, setCurrentView, userName }) => {
//     const goToPreviousMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
//     const goToNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
//     const goToToday = () => setCurrentMonth(dayjs());

//     const handleSearch = (e) => {
//         console.log("Search:", e.target.value);
//     };

//     return (
//         <header className="calendar-header">
//             <section className="header-left">
//                 <h1 className="app-title">MyCalendar</h1>

//                 <nav className="navigation-controls" aria-label="Calendar Navigation">
//                     <button
//                         onClick={goToPreviousMonth}
//                         className="button"
//                         aria-label="Previous Month"
//                         title="Previous Month"
//                     >
//                         <FaChevronLeft />
//                     </button>

// {/*                     <span className="month-label">{currentMonth.format("MMMM YYYY")}</span> */}
//         <div className="month-year-selectors">
//           <select
//             className="month-select"
//             value={currentMonth.month()}
//             onChange={(e) =>
//               setCurrentMonth(currentMonth.month(parseInt(e.target.value)))
//             }
//           >
//             {dayjs.months().map((month, index) => (
//               <option key={month} value={index}>
//                 {month}
//               </option>
//             ))}
//           </select>
        
//           <select
//             className="year-select"
//             value={currentMonth.year()}
//             onChange={(e) =>
//               setCurrentMonth(currentMonth.year(parseInt(e.target.value)))
//             }
//           >
//             {Array.from({ length: 30 }, (_, i) => dayjs().year() - 10 + i).map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </div>

//                     <button
//                         onClick={goToNextMonth}
//                         className="button"
//                         aria-label="Next Month"
//                         title="Next Month"
//                     >
//                         <FaChevronRight />
//                     </button>

//                     <button
//                         onClick={goToToday}
//                         className="button"
//                         aria-label="Go to Today"
//                     >
//                         Today
//                     </button>
//                 </nav>
//             </section>

//             <section className="header-center">
//                 <div className="search-wrapper">
//                     <FaSearch className="search-icon" />
//                     <input
//                         type="text"
//                         placeholder="Search events..."
//                         className="search-bar"
//                         onChange={handleSearch}
//                         aria-label="Search Events"
//                     />
//                 </div>
//             </section>

//             <section className="header-right">
//                 <div className="view-tabs" role="tablist" aria-label="Calendar View Tabs">
//                     {["Day", "Week", "Month", "Year"].map((view) => (
//                         <button
//                             key={view}
//                             className={`calendar-tab ${currentView === view ? "active" : ""}`}
//                             onClick={() => setCurrentView(view)}
//                             aria-pressed={currentView === view}
//                             title={`Switch to ${view} view`}
//                         >
//                             {view}
//                         </button>
//                     ))}
//                 </div>

//                 <div className="user-profile">
//                     <img
//                         src="https://i.pravatar.cc/36"
//                         alt="User Avatar"
//                         className="user-avatar"
//                     />
//                     <span className="user-name">{userName || "Robert"}</span>
//                 </div>
//             </section>
//         </header>
//     );
// };

// export default Header;


import React from "react";
import dayjs from "dayjs";
import "./Header.css";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Header = ({ currentMonth, setCurrentMonth, currentView, setCurrentView, userName }) => {
  const goToPreviousMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const goToNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
  const goToToday = () => setCurrentMonth(dayjs());

  const handleSearch = (e) => {
    console.log("Search:", e.target.value);
  };

  return (
    <header className="calendar-header">
      <section className="header-left">
        <h1 className="app-title">MyCalendar</h1>
        <nav className="navigation-controls" aria-label="Calendar Navigation">
          <button
            onClick={goToPreviousMonth}
            className="button"
            aria-label="Previous Month"
            title="Previous Month"
          >
            <FaChevronLeft />
          </button>

          {/* MONTH + YEAR SELECTORS */}
          <div className="month-year-selectors">
            <select
              className="month-select"
              value={currentMonth.month()}
              onChange={(e) => {
                const newMonth = parseInt(e.target.value);
                setCurrentMonth(currentMonth.set("month", newMonth));
              }}
            >
              {dayjs.months().map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>

            <select
              className="year-select"
              value={currentMonth.year()}
              onChange={(e) => {
                const newYear = parseInt(e.target.value);
                setCurrentMonth(currentMonth.set("year", newYear));
              }}
            >
              {Array.from({ length: 30 }, (_, i) => dayjs().year() - 10 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={goToNextMonth}
            className="button"
            aria-label="Next Month"
            title="Next Month"
          >
            <FaChevronRight />
          </button>

          <button
            onClick={goToToday}
            className="button"
            aria-label="Go to Today"
          >
            Today
          </button>
        </nav>
      </section>

      <section className="header-center">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search events..."
            className="search-bar"
            onChange={handleSearch}
            aria-label="Search Events"
          />
        </div>
      </section>

      <section className="header-right">
        <div className="view-tabs" role="tablist" aria-label="Calendar View Tabs">
          {["Day", "Week", "Month", "Year"].map((view) => (
            <button
              key={view}
              className={`calendar-tab ${currentView === view ? "active" : ""}`}
              onClick={() => setCurrentView(view)}
              aria-pressed={currentView === view}
              title={`Switch to ${view} view`}
            >
              {view}
            </button>
          ))}
        </div>

        <div className="user-profile">
          <img
            src="https://i.pravatar.cc/36"
            alt="User Avatar"
            className="user-avatar"
          />
          <span className="user-name">{userName || "Robert"}</span>
        </div>
      </section>
    </header>
  );
};

export default Header;

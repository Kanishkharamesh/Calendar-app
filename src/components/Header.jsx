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

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

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

          <div className="month-year-chip-container">
                  <div className="month-chip-scroll">
                    {monthNames.map((month, index) => (
                      <button
                        key={month}
                        className={`chip-button ${currentMonth.month() === index ? "active" : ""}`}
                        onClick={() => setCurrentMonth(currentMonth.set("month", index))}
                      >
                        {month.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                  <div className="year-chip-scroll">
                    {Array.from({ length: 10 }, (_, i) => dayjs().year() - 5 + i).map((year) => (
                      <button
                        key={year}
                        className={`chip-button ${currentMonth.year() === year ? "active" : ""}`}
                        onClick={() => setCurrentMonth(currentMonth.set("year", year))}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
            </div>

          <button
            onClick={goToNextMonth}
            className="button"
            aria-label="Next Month"
            title="Next Month"
          >
            <FaChevronRight />
          </button>
          <button onClick={goToToday} className="button" aria-label="Go to Today">
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

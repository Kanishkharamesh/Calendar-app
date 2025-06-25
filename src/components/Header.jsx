import React, { useState } from "react";
import dayjs from "dayjs";
import "./Header.css";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Header = ({ currentMonth, setCurrentMonth, currentView, setCurrentView, userName }) => {
  const [showYearModal, setShowYearModal] = useState(false);

  const goToPreviousMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const goToNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
  const goToToday = () => setCurrentMonth(dayjs());
  const handleSearch = (e) => console.log("Search:", e.target.value);

  const handleYearSelect = (year) => {
    setCurrentMonth(currentMonth.set("year", year));
    setShowYearModal(false);
  };

  return (
    <header className="calendar-header">
      <section className="header-left">
        <h1 className="app-title">MyCalendar</h1>
        <nav className="navigation-controls">
          <button onClick={goToPreviousMonth} className="button" aria-label="Previous Month">
            <FaChevronLeft />
          </button>
                <div className="month-year-chip-container">
                  <span className="month-label">{currentMonth.format("MMMM")}</span>
                  <button className="year-display" onClick={() => setShowYearModal(!showYearModal)}>
                    {currentMonth.year()}
                  </button>
                
                  {showYearModal && (
                    <div className="year-popup">
                      <div className="year-list">
                        {Array.from({ length: 30 }, (_, i) => dayjs().year() - 10 + i).map((year) => (
                          <div
                            key={year}
                            className={`year-item ${currentMonth.year() === year ? "active" : ""}`}
                            onClick={() => {
                              handleYearSelect(year);
                              setShowYearModal(false);
                            }}
                          >
                            {year}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>


          <button onClick={goToNextMonth} className="button" aria-label="Next Month">
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
          />
        </div>
      </section>

      <section className="header-right">
        <div className="view-tabs" role="tablist">
          {["Day", "Week", "Month", "Year"].map((view) => (
            <button
              key={view}
              className={`calendar-tab ${currentView === view ? "active" : ""}`}
              onClick={() => setCurrentView(view)}
            >
              {view}
            </button>
          ))}
        </div>

        <div className="user-profile">
          <img src="https://i.pravatar.cc/36" alt="User Avatar" className="user-avatar" />
          <span className="user-name">{userName || "Robert"}</span>
        </div>
      </section>
    </header>
  );
};

export default Header;

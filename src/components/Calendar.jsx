import React from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import classNames from "classnames";
import "./Calendar.css";
import { FiPlus, FiCalendar, FiUser, FiBell, FiSettings, FiFolder, FiClipboard, FiBarChart2 } from "react-icons/fi";
import { BsPersonWorkspace } from "react-icons/bs";


const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

dayjs.extend(isSameOrAfter);

const Calendar = ({ currentMonth, events = [], openEventModal, currentView }) => {
    const today = dayjs();
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startDate = startOfMonth.startOf("week");
    const endDate = endOfMonth.endOf("week");

    const getDateArray = (start, end) => {
        const arr = [];
        let date = start;
        while (date.isBefore(end) || date.isSame(end, "day")) {
            arr.push(date);
            date = date.add(1, "day");
        }
        return arr;
    };

    const renderMonthView = () => {
        const dates = getDateArray(startDate, endDate);
        return (
            <>
                <div className="calendar-weekdays">
                    {daysOfWeek.map((day, index) => (
                        <div
                            key={day}
                            className={classNames("calendar-weekday", {
                                weekend: index === 0 || index === 6,
                            })}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div className="calendar-grid">
                    {dates.map((dateObj, index) => {
                        const isToday = dateObj.isSame(today, "day");
                        const isCurrentMonth = dateObj.month() === currentMonth.month();
                        const dayEvents = events.filter((event) =>
                            dayjs(event.date).isSame(dateObj, "day")
                        );

                        return (
                            <div
                                key={index}
                                className={classNames("calendar-cell", {
                                    today: isToday,
                                    otherMonth: !isCurrentMonth,
                                    "high-density": dayEvents.length >= 3,
                                })}
                            >
                                <div className="calendar-date-header">
                                    <span className="calendar-date-number">{dateObj.date()}</span>
                                    <button
                                        className="add-event-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openEventModal(dateObj);
                                        }}
                                    >
                                        <FiPlus size={14} />
                                    </button>
                                </div>

                                {dayEvents.map((event, idx) => (
                                    <div
                                        key={idx}
                                        className={classNames("event-item", `bg-${event.category}`)}
                                        title={`Event: ${event.title}\nDate: ${event.date}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openEventModal(dateObj, event);
                                        }}
                                    >
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    const renderDayView = () => {
        const date = today;
        const dayEvents = events.filter((event) =>
            dayjs(event.date).isSame(date, "day")
        );

        return (
            <div className="calendar-day-view">
                <div className="day-header">
                    <h2>{date.format("dddd, MMMM D, YYYY")}</h2>
                    <button
                        onClick={() => openEventModal(date)}
                        className="add-event-button"
                    >
                        + Add Event
                    </button>
                </div>

                <div className="day-grid-container table-layout">
                    <table className="day-view-table">
                        <tbody>
                            {[...Array(24)].map((_, hour) => {
                                const hourStart = dayjs(date).hour(hour).minute(0);
                                const hourEnd = hourStart.add(1, "hour");

                                const eventsInHour = dayEvents.filter((event) => {
                                    const start = dayjs(event.startDateTime);
                                    return start.hour() === hour;
                                });

                                return (
                                    <tr key={hour}>
                                        <td className="hour-label">{hourStart.format("h A")}</td>
                                        <td className="hour-cell" onClick={() => openEventModal(hourStart)}>
                                            {eventsInHour.map((event, i) => {
                                                const start = dayjs(event.startDateTime);
                                                const end = dayjs(event.endDateTime);
                                                const duration = end.diff(start, "minute");
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`event-block-table bg-${event.category}`}
                                                        title={`${event.title} at ${start.format("h:mm A")}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openEventModal(start, event);
                                                        }}
                                                    >
                                                        <strong>{event.title}</strong>
                                                        <br />
                                                        <small>{start.format("h:mm A")}</small>
                                                    </div>
                                                );
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };


    const renderWeekView = () => {
        const weekStart = currentMonth.startOf("week");
        const weekDates = getDateArray(weekStart, weekStart.add(6, "day"));
        return (
            <div className="calendar-week-view">
                <div className="calendar-weekdays">
                    {weekDates.map((date) => (
                        <div key={date.format("YYYY-MM-DD")} className="calendar-weekday">
                            {date.format("ddd D")}
                        </div>
                    ))}
                </div>
                <div className="calendar-week-grid">
                    {weekDates.map((date) => {
                        const dayEvents = events.filter((event) =>
                            dayjs(event.date).isSame(date, "day")
                        );
                        return (
                            <div key={date.format()} className="calendar-cell">
                                <div className="calendar-date-header">
                                    <span>{date.date()}</span>
                                    <button
                                        className="add-event-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openEventModal(dateObj);
                                        }}
                                    >
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                                {dayEvents.map((event, i) => (
                                    <div
                                        key={i}
                                        className={`event-item bg-${event.category}`}
                                        onClick={() => openEventModal(date, event)}
                                    >
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderYearView = () => {
        const months = Array.from({ length: 12 }, (_, i) =>
            currentMonth.month(i).startOf("month")
        );

        const getMonthDates = (month) => {
            const start = month.startOf("month").startOf("week");
            const end = month.endOf("month").endOf("week");
            const dates = [];
            let day = start;
            while (day.isBefore(end) || day.isSame(end, "day")) {
                dates.push(day);
                day = day.add(1, "day");
            }
            return dates;
        };

        return (
            <div className="calendar-year-view">
                {months.map((month, i) => {
                    const monthDates = getMonthDates(month);
                    const monthEvents = events.filter(e => dayjs(e.date).isSame(month, "month"));

                    return (
                        <div
                            key={i}
                            className="year-month-box"
                            onClick={() => handleMonthClick(month)}
                        >
                            <h4>{month.format("MMMM")}</h4>
                            <div className="mini-calendar-grid">
                                {monthDates.map((date, idx) => {
                                    const isToday = date.isSame(dayjs(), "day");
                                    const isThisMonth = date.month() === month.month();
                                    const hasEvents = events.some(e =>
                                        dayjs(e.date).isSame(date, "day")
                                    );

                                    return (
                                        <div
                                            key={idx}
                                            className={classNames("mini-day", {
                                                today: isToday,
                                                faded: !isThisMonth,
                                            })}
                                        >
                                            <span>{date.date()}</span>
                                            {hasEvents && <div className="event-dot" />}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="calendar-page">
            <div className="dashboard-sidebar">
                <h2 className="dashboard-title">Dashboard</h2>
                <ul className="dashboard-menu">
                    <ul className="dashboard-menu">
                        <li><FiCalendar /> Calendar Dashboard</li>
                        <li><FiClipboard /> Smart Planner</li>
                        <li><BsPersonWorkspace /> Team Schedule</li>
                        <li><FiFolder /> Projects & Tasks</li>
                        <li><FiBell /> Reminders & Alerts</li>
                        <li><FiBarChart2 /> Productivity Stats</li>
                        <li><FiClipboard /> Meeting Notes</li>
                        <li><FiSettings /> Preferences</li>
                    </ul>
                </ul>
            </div>
            <div className="calendar-container">
                {currentView === "Month" && renderMonthView()}
                {currentView === "Day" && renderDayView()}
                {currentView === "Week" && renderWeekView()}
                {currentView === "Year" && renderYearView()}
            </div>
        </div>
    );
};

export default Calendar;
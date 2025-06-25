import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import EventModal from "./components/EventModal";
import "./components/Calendar.css";

function App() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [currentView, setCurrentView] = useState("Month");

  useEffect(() => {
    const stored = localStorage.getItem("calendarEvents");
    if (stored) {
      setEvents(JSON.parse(stored));
    } else {
      fetch("/events.json")
        .then((res) => res.json())
        .then((data) => {
          setEvents(data);
          localStorage.setItem("calendarEvents", JSON.stringify(data));
        })
        .catch((err) => console.error("Error loading events.json:", err));
    }
  }, []);

  const saveEvent = (event) => {
    let updatedEvents;

    if (editingEvent) {
      updatedEvents = events.map((e) =>
        e.startDateTime === editingEvent.startDateTime &&
        e.title === editingEvent.title
          ? event
          : e
      );
      alert("Event updated successfully");
    } else {
      updatedEvents = [...events, event];
      alert("Event added successfully");
    }

    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    setShowModal(false);
    setEditingEvent(null);
  };
  const deleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter(
      (e) =>
        e.startDateTime !== eventToDelete.startDateTime ||
        e.title !== eventToDelete.title
    );
    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    alert("Event deleted");
    setShowModal(false);
    setEditingEvent(null);
  };

  const openEventModal = (date, event = null) => {
    setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
    setEditingEvent(event);
    setShowModal(true);
  };

  return (
    <div className="calendar-wrapper">
      <Header
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <Calendar
        currentMonth={currentMonth}
        events={events}
        openEventModal={openEventModal}
        currentView={currentView}
      />
      {showModal && (
        <EventModal
          date={selectedDate}
          events={events}
          onClose={() => {
            setShowModal(false);
            setEditingEvent(null);
          }}
          onSave={saveEvent}
          onDelete={deleteEvent}
          existingEvent={editingEvent}
        />
      )}
    </div>
  );
}

export default App;


// import React, { useState, useRef, useEffect } from "react";
// import "./EventModal.css";


// const EventModal = ({ onClose, onSave, onDelete, events, existingEvent = null }) => {
//     const [title, setTitle] = useState("");
//     const [startHour, setStartHour] = useState("02");
//     const [startMinute, setStartMinute] = useState("00");
//     const [startAMPM, setStartAMPM] = useState("PM");
//     const [duration, setDuration] = useState("60");
//     const [dateValue, setDateValue] = useState("");
//     const [location, setLocation] = useState("");
//     const [locationOptions, setLocationOptions] = useState([]);
//     const [guestInput, setGuestInput] = useState("");
//     const [guests, setGuests] = useState([]);
//     const [notification, setNotification] = useState("Email");
//     const [reminder, setReminder] = useState("1 hour before event");
//     const [description, setDescription] = useState("");
//     const [showDescription, setShowDescription] = useState(false);
//     const [category, setCategory] = useState("blue");

//     useEffect(() => {
//         if (existingEvent) {
//             setTitle(existingEvent.title || "");
//             setDescription(existingEvent.description || "");
//             setDateValue(existingEvent.date || "");
//             setLocation(existingEvent.location || "");
//             setGuests(existingEvent.guests || []);
//             setNotification(existingEvent.notification || "Email");
//             setReminder(existingEvent.reminder || "1 hour before event");
//             setCategory(existingEvent.category || "blue");

//             const start = new Date(existingEvent.startDateTime);
//             let hour = start.getHours();
//             const minute = String(start.getMinutes()).padStart(2, "0");
//             const ampm = hour >= 12 ? "PM" : "AM";
//             hour = hour % 12 || 12;

//             setStartHour(String(hour).padStart(2, "0"));
//             setStartMinute(minute);
//             setStartAMPM(ampm);

//             const dur = Math.floor((new Date(existingEvent.endDateTime) - new Date(existingEvent.startDateTime)) / 60000);
//             setDuration(dur.toString());
//         }
//     }, [existingEvent]);

//     const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

//     const getTimeIn24Hour = () => {
//         let hour = parseInt(startHour);
//         if (startAMPM === "PM" && hour !== 12) hour += 12;
//         if (startAMPM === "AM" && hour === 12) hour = 0;
//         return `${String(hour).padStart(2, "0")}:${startMinute}`;
//     };

//     const handleSubmit = () => {
//         if (!title.trim()) return alert("Event name is required");
//         if (!dateValue) return alert("Date is required");
//         if (!duration) return alert("Duration is required");
//         if (guestInput && !validateEmail(guestInput)) return alert("Invalid email format");

//         const startDateTime = `${dateValue}T${getTimeIn24Hour()}`;
//         const endDateTime = new Date(new Date(startDateTime).getTime() + duration * 60000).toISOString();

//         const newEvent = {
//             title,
//             date: dateValue,
//             startDateTime,
//             endDateTime,
//             location,
//             guests,
//             notification,
//             reminder,
//             description,
//             category,
//         };

//         if (existingEvent) {
//             onSave({ ...existingEvent, ...newEvent });
//             alert("Event Updated Successfully");
//         } else {
//             const conflict = (events || []).find(
//                 (e) => e.date === dateValue && e.startDateTime === startDateTime
//             );
//             if (conflict) return alert("Time slot already taken");
//             onSave(newEvent);
//             alert("Event Added Successfully");
//         }
//         onClose();
//     };

//     const handleDelete = () => {
//         if (existingEvent && window.confirm("Are you sure you want to delete this event?")) {
//             onSave({ ...existingEvent, _delete: true });
//             alert("Event Deleted Successfully");
//             onClose();
//         }
//     };

//     const locationRef = useRef(null);
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (locationRef.current && !locationRef.current.contains(event.target)) {
//                 setLocationOptions([]);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleLocationInput = (val) => {
//         setLocation(val);
//         const cities = ["Chennai", "Bangalore", "Coimbatore", "Hyderabad", "Mumbai", "Pune", "Haryana", "Trivandrum"];
//         setLocationOptions(cities.filter((city) => city.toLowerCase().includes(val.toLowerCase())));
//     };

//     const handleAddGuest = () => {
//         if (guestInput && validateEmail(guestInput) && !guests.includes(guestInput)) {
//             setGuests([...guests, guestInput]);
//             setGuestInput("");
//         }
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-card">
//                 <header className="modal-header">
//                     <h3>{existingEvent ? "Edit Event" : "Create Event"}</h3>
//                     <button className="close-btn" onClick={onClose}>×</button>
//                 </header>
//                 <div className="modal-body">
//                     <div className="input-group">
//                         <label>Title</label>
//                         <div className="row between">
//                             <input
//                                 type="text"
//                                 placeholder="Enter event name"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 className="event-title"
//                             />
//                             <button
//                                 className="description-btn"
//                                 onClick={() => setShowDescription(!showDescription)}
//                             >
//                                 {showDescription ? "Hide Description" : "Add Description"}
//                             </button>
//                         </div>
//                     </div>

//                     {showDescription && (
//                         <div className="input-group">
//                             <label>Description</label>
//                             <textarea
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 placeholder="Enter description"
//                             />
//                         </div>
//                     )}

//                     <div className="row spaced">
//                         <div className="input-group">
//                             <label>Date</label>
//                             <input type="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} />
//                         </div>
//                         <div className="input-group">
//                             <label>Time</label>
//                             <div className="row">
//                                 <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
//                                     {[...Array(12)].map((_, i) => (
//                                         <option key={i}>{String(i + 1).padStart(2, "0")}</option>
//                                     ))}
//                                 </select>
//                                 <select value={startMinute} onChange={(e) => setStartMinute(e.target.value)}>
//                                     {["00", "15", "30", "45"].map((min) => (
//                                         <option key={min}>{min}</option>
//                                     ))}
//                                 </select>
//                                 <select value={startAMPM} onChange={(e) => setStartAMPM(e.target.value)}>
//                                     <option>AM</option>
//                                     <option>PM</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="input-group">
//                             <label>Duration</label>
//                             <select value={duration} onChange={(e) => setDuration(e.target.value)}>
//                                 {[15, 30, 45, 60, 90, 120, 180].map((min) => (
//                                     <option key={min} value={min}>{min} mins</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     <div className="input-group" ref={locationRef}>
//                         <label>Location</label>
//                         <input
//                             type="text"
//                             value={location}
//                             onChange={(e) => handleLocationInput(e.target.value)}
//                             placeholder="Choose location"
//                         />
//                         {locationOptions.length > 0 && (
//                             <div className="dropdown-box">
//                                 {locationOptions.map((opt, idx) => (
//                                     <div
//                                         key={idx}
//                                         className="dropdown-option"
//                                         onClick={() => {
//                                             setLocation(opt);
//                                             setLocationOptions([]);
//                                         }}
//                                     >
//                                         {opt}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     <div className="input-group">
//                         <label>Add Guests</label>
//                         <div className="guest-input">
//                             <input
//                                 type="email"
//                                 value={guestInput}
//                                 onChange={(e) => setGuestInput(e.target.value)}
//                                 placeholder="contact@example.com"
//                             />
//                             <button onClick={handleAddGuest}>Add</button>
//                         </div>
//                         <div className="guest-list">
//                             {guests.map((guest, i) => (
//                                 <span key={i} className="guest-avatar">{guest[0]}</span>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="row spaced">
//                         <div className="input-group">
//                             <label>Event Category</label>
//                             <select value={category} onChange={(e) => setCategory(e.target.value)}>
//                                 <option value="blue">Work</option>
//                                 <option value="green">Personal</option>
//                                 <option value="purple">Meeting</option>
//                                 <option value="yellow">Reminder</option>
//                                 <option value="red">Urgent</option>
//                             </select>
//                         </div>
//                         <div className="input-group">
//                             <label>Notification</label>
//                             <select value={notification} onChange={(e) => setNotification(e.target.value)}>
//                                 <option>Email</option>
//                                 <option>Slack</option>
//                             </select>
//                         </div>
//                         <div className="input-group">
//                             <label>Reminder</label>
//                             <select value={reminder} onChange={(e) => setReminder(e.target.value)}>
//                                 <option>10 min before</option>
//                                 <option>30 min before</option>
//                                 <option>1 hour before event</option>
//                                 <option>1 day before event</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//                 <footer className="modal-footer">
//                     <button className="btn cancel-btn" onClick={onClose}>Cancel</button>
//                     {existingEvent && (
//                         <button
//                             className="btn delete-btn"
//                             onClick={() => {
//                                 if (window.confirm("Are you sure you want to delete this event?")) {
//                                     onDelete(existingEvent);
//                                 }
//                             }}
//                         >
//                             Delete
//                         </button>
//                     )}
//                     <button className="btn save-btn" onClick={handleSubmit}>
//                         {existingEvent ? "Update Event" : "Save Event"}
//                     </button>
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default EventModal;

import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs"; // ✅ ADDED
import "./EventModal.css";

// const EventModal = ({ onClose, onSave, onDelete, events, existingEvent = null }) => {
  const EventModal = ({ onClose, onSave, onDelete, events, existingEvent = null, date }) => {

  const [title, setTitle] = useState("");
  const [startHour, setStartHour] = useState("02");
  const [startMinute, setStartMinute] = useState("00");
  const [startAMPM, setStartAMPM] = useState("PM");
  const [duration, setDuration] = useState("60");
  const [dateValue, setDateValue] = useState("");
  const [location, setLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [guestInput, setGuestInput] = useState("");
  const [guests, setGuests] = useState([]);
  const [notification, setNotification] = useState("Email");
  const [reminder, setReminder] = useState("1 hour before event");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [category, setCategory] = useState("blue");

  const isPastMonth = dateValue && dayjs(dateValue).isBefore(dayjs(), "month"); // ✅ ADDED

  // useEffect(() => {
  //   if (existingEvent) {
  //     setTitle(existingEvent.title || "");
  //     setDescription(existingEvent.description || "");
  //     setDateValue(existingEvent.date || "");
  //     setLocation(existingEvent.location || "");
  //     setGuests(existingEvent.guests || []);
  //     setNotification(existingEvent.notification || "Email");
  //     setReminder(existingEvent.reminder || "1 hour before event");
  //     setCategory(existingEvent.category || "blue");

  //     const start = new Date(existingEvent.startDateTime);
  //     let hour = start.getHours();
  //     const minute = String(start.getMinutes()).padStart(2, "0");
  //     const ampm = hour >= 12 ? "PM" : "AM";
  //     hour = hour % 12 || 12;

  //     setStartHour(String(hour).padStart(2, "0"));
  //     setStartMinute(minute);
  //     setStartAMPM(ampm);

  //     const dur = Math.floor((new Date(existingEvent.endDateTime) - new Date(existingEvent.startDateTime)) / 60000);
  //     setDuration(dur.toString());
  //   }
  // }, [existingEvent]);

  useEffect(() => {
  if (existingEvent) {
    // Populate for editing
    setTitle(existingEvent.title || "");
    setDescription(existingEvent.description || "");
    setDateValue(existingEvent.date || "");
    setLocation(existingEvent.location || "");
    setGuests(existingEvent.guests || []);
    setNotification(existingEvent.notification || "Email");
    setReminder(existingEvent.reminder || "1 hour before event");
    setCategory(existingEvent.category || "blue");

    const start = new Date(existingEvent.startDateTime);
    let hour = start.getHours();
    const minute = String(start.getMinutes()).padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    setStartHour(String(hour).padStart(2, "0"));
    setStartMinute(minute);
    setStartAMPM(ampm);

    const dur = Math.floor(
      (new Date(existingEvent.endDateTime) - new Date(existingEvent.startDateTime)) / 60000
    );
    setDuration(dur.toString());
  } else {
    // New Event → Set selected date from props
    if (date && dayjs(date).isValid()) {
      setDateValue(dayjs(date).format("YYYY-MM-DD"));
    }
  }
}, [existingEvent, date]);


  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const getTimeIn24Hour = () => {
    let hour = parseInt(startHour);
    if (startAMPM === "PM" && hour !== 12) hour += 12;
    if (startAMPM === "AM" && hour === 12) hour = 0;
    return `${String(hour).padStart(2, "0")}:${startMinute}`;
  };

  const handleSubmit = () => {
    if (!title.trim()) return alert("Event name is required");
    if (!dateValue) return alert("Date is required");

    // ✅ BLOCK PAST MONTH EVENT CREATION
    if (dayjs(dateValue).isBefore(dayjs(), "month")) {
      return alert("This month is completed. Please schedule for next year.");
    }

    if (!duration) return alert("Duration is required");
    if (guestInput && !validateEmail(guestInput)) return alert("Invalid email format");

    const startDateTime = `${dateValue}T${getTimeIn24Hour()}`;
    const endDateTime = new Date(new Date(startDateTime).getTime() + duration * 60000).toISOString();

    const newEvent = {
      title,
      date: dateValue,
      startDateTime,
      endDateTime,
      location,
      guests,
      notification,
      reminder,
      description,
      category,
    };

    if (existingEvent) {
      onSave({ ...existingEvent, ...newEvent });
      alert("Event Updated Successfully");
    } else {
      const conflict = (events || []).find(
        (e) => e.date === dateValue && e.startDateTime === startDateTime
      );
      if (conflict) return alert("Time slot already taken");

      onSave(newEvent);
      alert("Event Added Successfully");
    }

    onClose();
  };

  const handleDelete = () => {
    if (existingEvent && window.confirm("Are you sure you want to delete this event?")) {
      onSave({ ...existingEvent, _delete: true });
      alert("Event Deleted Successfully");
      onClose();
    }
  };

  const locationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationOptions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationInput = (val) => {
    setLocation(val);
    const cities = ["Chennai", "Bangalore", "Coimbatore", "Hyderabad", "Mumbai", "Pune", "Haryana", "Trivandrum"];
    setLocationOptions(cities.filter((city) => city.toLowerCase().includes(val.toLowerCase())));
  };

  const handleAddGuest = () => {
    if (guestInput && validateEmail(guestInput) && !guests.includes(guestInput)) {
      setGuests([...guests, guestInput]);
      setGuestInput("");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <header className="modal-header">
          <h3>{existingEvent ? "Edit Event" : "Create Event"}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>

        <div className="modal-body">

          {isPastMonth && (
            <div className="past-month-warning">
              ⚠️ This month is already completed. Consider scheduling for next year.
            </div>
          )}

          <div className="input-group">
            <label>Title</label>
            <div className="row between">
              <input
                type="text"
                placeholder="Enter event name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="event-title"
              />
              <button
                className="description-btn"
                onClick={() => setShowDescription(!showDescription)}
              >
                {showDescription ? "Hide Description" : "Add Description"}
              </button>
            </div>
          </div>

          {showDescription && (
            <div className="input-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
          )}

          <div className="row spaced">
            <div className="input-group">
              <label>Date</label>
              <input type="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} />
            </div>

            <div className="input-group">
              <label>Time</label>
              <div className="row">
                <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                  {[...Array(12)].map((_, i) => (
                    <option key={i}>{String(i + 1).padStart(2, "0")}</option>
                  ))}
                </select>
                <select value={startMinute} onChange={(e) => setStartMinute(e.target.value)}>
                  {["00", "15", "30", "45"].map((min) => (
                    <option key={min}>{min}</option>
                  ))}
                </select>
                <select value={startAMPM} onChange={(e) => setStartAMPM(e.target.value)}>
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Duration</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                {[15, 30, 45, 60, 90, 120, 180].map((min) => (
                  <option key={min} value={min}>{min} mins</option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group" ref={locationRef}>
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => handleLocationInput(e.target.value)}
              placeholder="Choose location"
            />
            {locationOptions.length > 0 && (
              <div className="dropdown-box">
                {locationOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    className="dropdown-option"
                    onClick={() => {
                      setLocation(opt);
                      setLocationOptions([]);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="input-group">
            <label>Add Guests</label>
            <div className="guest-input">
              <input
                type="email"
                value={guestInput}
                onChange={(e) => setGuestInput(e.target.value)}
                placeholder="contact@example.com"
              />
              <button onClick={handleAddGuest}>Add</button>
            </div>
            <div className="guest-list">
              {guests.map((guest, i) => (
                <span key={i} className="guest-avatar">{guest[0]}</span>
              ))}
            </div>
          </div>

          <div className="row spaced">
            <div className="input-group">
              <label>Event Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="blue">Work</option>
                <option value="green">Personal</option>
                <option value="purple">Meeting</option>
                <option value="yellow">Reminder</option>
                <option value="red">Urgent</option>
              </select>
            </div>
            <div className="input-group">
              <label>Notification</label>
              <select value={notification} onChange={(e) => setNotification(e.target.value)}>
                <option>Email</option>
                <option>Slack</option>
              </select>
            </div>
            <div className="input-group">
              <label>Reminder</label>
              <select value={reminder} onChange={(e) => setReminder(e.target.value)}>
                <option>10 min before</option>
                <option>30 min before</option>
                <option>1 hour before event</option>
                <option>1 day before event</option>
              </select>
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          <button className="btn cancel-btn" onClick={onClose}>Cancel</button>
          {existingEvent && (
            <button
              className="btn delete-btn"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this event?")) {
                  onDelete(existingEvent);
                }
              }}
            >
              Delete
            </button>
          )}
          <button className="btn save-btn" onClick={handleSubmit}>
            {existingEvent ? "Update Event" : "Save Event"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EventModal;

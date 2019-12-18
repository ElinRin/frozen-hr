import React, { useState, useEffect } from "react";

import "./EventsLayout.css";
import { firebaseTools } from "../../utils/firebase";

export const EventsLayout = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const today = new Date();
    firebaseTools
      .events()
      .then(
        a =>
          a.events &&
          a.events.length > 0 &&
          a.events
            .filter(a => {
              const date = new Date(a.finishDate);
              return date > today;
            })
            .sort((a, b) => {
              if (a.startDate > b.startDate) return 1;
              else if (a.startDate === b.startDate) return 0;
              else return -1;
            })
            .map(a => ({
              event: a.event,
              time:
                a.startDate === a.finishDate
                  ? a.startDate
                  : `${a.startDate} - ${a.finishDate}`,
              text: a.comment
            }))
      )
      .then(a => {
        setEvents(a);
      })
      .catch(() => setEvents([]));
  }, []);

  return (
    <div className="chat-wrapper">
      <h2 className="birthdays-header">Events</h2>
      {events &&
        events.length > 0 &&
        events.map(({ event, time, text }, idx) => (
          <div key={idx} className="chat-card">
            <div className="chat-message-header">
              <div>{event}</div>
              <div>{time}</div>
            </div>
            <div>{text}</div>
          </div>
        ))}
    </div>
  );
};

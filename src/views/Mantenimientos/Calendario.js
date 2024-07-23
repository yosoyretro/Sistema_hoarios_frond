import React, { useState, useRef } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
//import { Spin } from 'antd';

const initialEvents = [
  { title: 'Existing Event', start: new Date() }
];

export function DemoApp() {
  const [events, setEvents] = useState(initialEvents);
  const calendarRef = useRef(null);

  const handleSelect = (info) => {
    const newEventTitle = prompt('Enter a title for the event:');
    if (newEventTitle) {
      const newEvent = {
        title: newEventTitle,
        start: info.start,
        end: info.end,
        allDay: info.allDay
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div>
      <h1>Demo App</h1>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        weekends={true}
        events={events}
        selectable={true}
        select={handleSelect}
        dayMaxEventRows={true} // habilitar el límite de eventos visibles por día
        moreLinkClick="popover" // mostrar eventos adicionales en un popover
      />
    </div>
  );
}

export default DemoApp;

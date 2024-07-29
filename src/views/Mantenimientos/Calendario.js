import React, { useState, useEffect, useRef } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const url = "http://localhost:8000/api/istg/"; // Ajusta según tu configuración

const initialEvents = [
  { title: 'Existing Event', start: new Date() }
];

export function DemoApp() {
  const [events, setEvents] = useState(initialEvents);
  const calendarRef = useRef(null);

  // Función para obtener las distribuciones de horarios
  async function getDistribucionHorarios() {
    try {
      const response = await fetch(`${url}horario/show_dist_horarios`);
      const data = await response.json();
      if (data.ok) {
        return data.data.map(dist => ({
          title: dist.materia,
          start: new Date(`${dist.fecha}T${dist.hora_inicio}`), // Combina la fecha y la hora de inicio
          end: new Date(`${dist.fecha}T${dist.hora_fin}`) // Combina la fecha y la hora de fin
        }));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error fetching distributions:", error);
      return [];
    }
  }

  // Función para actualizar el calendario
  async function updateCalendar() {
    const events = await getDistribucionHorarios();
    setEvents(events);
  }

  // Actualizar el calendario al montar el componente
  useEffect(() => {
    updateCalendar();
  }, []);

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
        selectable={false} // Deshabilitar la selección manual de eventos
        editable={false} // Deshabilitar la edición manual de eventos
        dayMaxEventRows={true} // Habilitar el límite de eventos visibles por día
        moreLinkClick="popover" // Mostrar eventos adicionales en un popover
      />
    </div>
  );
}

export default DemoApp;

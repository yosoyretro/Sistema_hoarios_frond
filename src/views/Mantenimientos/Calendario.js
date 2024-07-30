import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const getDayDate = (day) => {
  const today = new Date();
  const currentDay = today.getDay(); // Domingo = 0, Lunes = 1, etc.
  const daysOfWeek = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
  const targetDay = daysOfWeek.indexOf(day.toUpperCase());

  if (targetDay === -1) return null;

  const difference = targetDay - currentDay;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + difference);
  return targetDate.toISOString().split('T')[0]; // YYYY-MM-DD
};

const MyDynamicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const url = "http://localhost:8000/api/istg/horario/show_dist_horarios";

  useEffect(() => {
    fetch(url, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Verifica los datos obtenidos
        const formattedEvents = data.data.map(item => {
          const date = getDayDate(item.dia);
          if (!date) return null;

          // Ajuste del formato de la hora
          const startTime = item.hora_inicio.replace('24:', '00:');
          const endTime = item.hora_termina.replace('24:', '00:');

          return {
            title: item.materia,
            start: `${date}T${startTime}`,
            end: `${date}T${endTime}`,
            extendedProps: {
              instituto: item.educacion_global_nombre,
              carrera: item.nombre_carrera,
              nivel: item.nivel,
              paralelo: item.paralelo,
              fechaActualizacion: item.fecha_actualizacion
            }
          };
        }).filter(event => event !== null);
        setEvents(formattedEvents);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
  };

  const handleModalClose = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth" // Cambia a 'listWeek' si prefieres vista de lista por defecto
        views={{
          dayGridMonth: {
            buttonText: 'Mes'
          },
          timeGridWeek: {
            buttonText: 'Semana'
          },
          timeGridDay: {
            buttonText: 'Día'
          },
          listWeek: {
            buttonText: 'Lista'
          }
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        events={events}
        eventClick={handleEventClick}
      />
      
      <Modal
        title={selectedEvent?.title || 'Detalles del Evento'}
        visible={!!selectedEvent}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedEvent ? (
          <>
            <p><strong>Instituto:</strong> {selectedEvent.extendedProps.instituto}</p>
            <p><strong>Carrera:</strong> {selectedEvent.extendedProps.carrera}</p>
            <p><strong>Nivel:</strong> {selectedEvent.extendedProps.nivel}</p>
            <p><strong>Paralelo:</strong> {selectedEvent.extendedProps.paralelo}</p>
            <p><strong>Fecha de Actualización:</strong> {selectedEvent.extendedProps.fechaActualizacion}</p>
          </>
        ) : (
          <p>No hay detalles disponibles.</p>
        )}
      </Modal>
    </>
  );
};

export default MyDynamicCalendar;

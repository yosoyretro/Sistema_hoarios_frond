import React, { useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

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

  const exportToPDF = () => {
    const input = document.getElementById('calendar');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("calendario.pdf");
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(events.map(event => ({
      Título: event.title,
      Inicio: event.start,
      Fin: event.end,
      Instituto: event.extendedProps.instituto,
      Carrera: event.extendedProps.carrera,
      Nivel: event.extendedProps.nivel,
      Paralelo: event.extendedProps.paralelo,
      'Fecha de Actualización': event.extendedProps.fechaActualizacion
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Calendario');
    XLSX.writeFile(workbook, 'calendario.xlsx');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={exportToPDF}>
        Exportar a PDF
      </Menu.Item>
      <Menu.Item key="2" onClick={exportToExcel}>
        Exportar a Excel
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} style={{ marginBottom: '10px' }}>
        <Button>
          Exportar <DownOutlined />
        </Button>
      </Dropdown>
      <div id="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
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
      </div>

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

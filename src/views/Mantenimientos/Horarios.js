import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect } from "react";
import { Button, Collapse, Input, Row, Col, Space, Table, Typography, Menu, Card, Dropdown, Modal, notification } from "antd";
//import { SyncOutlined, PlusCircleOutlined, ClearOutlined, SearchOutlined, EditOutlined, DeleteOutlined, MenuOutlined } from "@ant-design/icons";
import "../../public/css/letras.css";
import { foreign_key } from 'i/lib/methods.js';

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const Calendario = (props) => {

  const { Title } = Typography;
  //const [isOpenModal,setIsOpen] = useState(false);
  //const [isOpenUpdateModal,setIsOpenUpdateModal] = useState(false);
  const [horarioData, setHorarioData] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [formularioEditar,setFormularioEditar] = useState([]);
  const url = "http://localhost:8000/api/istg/";

  const mostrarNotificacion = (tipo, titulo, mensaje) => {
    notification[tipo]({
      message: titulo,
      description: mensaje,
    });
  };

  function CreateHorario() {
    setLoading(true);
    fetch(`${url}show_data_asignatura/`).then((response) => { return response.json() })
      .then((data_request) => {
        console.log("Soy la data request")
        console.log(data_request)
        if (data_request.ok) {
          if (data_request.data) {
            let data = data_request.data.map((value, index) => {
              return {
                key: index,
                id: value.id_distribucion,
                foreign_key: [value.id_educacion_global, value.id_usuario, value.id_carrera, value.id_nivel, value.id_paralelo, value.id_periodo_academico, value.id_materia],
                horario_inicio: value.tiempo,
                horario_terminada: value.tiempo,
                dia:value.dia,
                value:value.foreign_key
              }
            })
            setHorarioData(data)
          } else {
            setHorarioData([]);
          }
        } else if (data_request.ok === false) {
          mostrarNotificacion('error', 'A ocurrido un error', 'A ocurrido un error al obtener la informacion');
        }
      }).finally(() => {
        setLoading(false);
      }).catch(() => {
        mostrarNotificacion('error', 'A ocurrido un error', 'Error interno en el servidor');
      })
  }

  



  
  
  useEffect(() => {
    CreateHorario()
  },);

  return (
    <div className="myCustomHeight">
      <>
        <Row style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <Title level={3}>Mantenimiento de Horarios</Title>
        </Row>
        <br />
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />

      </>
    </div>
  );
}


export default Calendario;
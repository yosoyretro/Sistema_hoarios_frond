import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect } from "react";
import NewHorario from "../../components/NewHorario.js";
import { Button, Collapse, Input, Row, Col, Space, Table, Typography, Menu, Card, Dropdown } from "antd";
import { SyncOutlined, PlusCircleOutlined, ClearOutlined, SearchOutlined, EditOutlined, DeleteOutlined, MenuOutlined } from "@ant-design/icons";
//import { Button, Col, Row, Form, Flex, Breadcrumb, Table, Popconfirm, Spin, Space, Modal, Input, notification } from "antd";
//import { ToolOutlined, QuestionCircleOutlined, DeleteOutlined, EditOutlined, SyncOutlined, SaveOutlined, FileAddOutlined } from '@ant-design/icons';
import "../../public/css/letras.css";
import VerifyHorario from "../../components/VerifyHorario.js"

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const Calendario = (props) => {

  const { Title } = Typography;
  const [OpenNewModal, setIsOpenNewModal] = useState(false);
  const [dataTabla, setDataTabla] = useState([]);
  const [isOpeVerifyHorario, setIsOpenUpdateModal] = useState(false);
  const [formularioEditar, setFormularioEditar] = useState([]);
  const [cantidadRegistro, setCantidadRegistro] = useState(0);
  const [cursoData,setCursoData] = useState([]);
  const url = "http://localhost:8000/api/istg/";


  function getParalelos() {
    let configuraciones = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(`${url}showParalelo`, configuraciones).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.data) {
        let data_mapeada = data.data.map((value, index) => {
          return {
            id: value.id_paralelo,
            numero: index + 1,
            paralelo: value.numero_paralelo,
            ip_actualizacion: value.ip_actualizacion,
            fecha_actualizacion: value.fecha_actualizacion,
            usuarios_ultima_gestion: value.usuarios_ultima_gestion,
            estado: value.estado
          }
        })

        setDataTabla(data_mapeada)
      }
    })

  }
  function getUser() {
    fetch(`${url}show_usuario`, { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        let informacion = data.data.map((value) => {
          return {
            id: value.id_usuario,
            cedula: value.cedula,
            usuarios: value.usuario,
            nombres: value.nombres,
            apellidos: value.apellidos,
            perfil: value.descripcion,
            estado: value.estado,
            maquina_creacion: value.ip_creacion,
            maquina_actualiso: value.ip_actualizacion,
            //usuario_creacion:'cjmoreno',
            //usuario_actualiso:'cjmoreno',
          }
        })

        setCantidadRegistro(informacion.length)
        setDataTabla(informacion)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }
  function getCurso(){
    fetch(`${url}show_nivel`, { method: 'GET' })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let curso = data.data.map((value,index)=>{
              return {
                id:value.id_nivel,
                numero:value.numero,
                nemonico:value.nemonico,
                termino:value.termino,
                ip_actualizacion:value.ip_actualizacion,
                fecha_actualizacion:value.fecha_actualizacion,
                usuarios_ultima_gestion:value.usuarios_ultima_gestion,
                estado:value.estado
              }
            })

            setCursoData(curso)

          })
  }

  function handleCloseModal() {
    setIsOpenNewModal(false)
  }
  const handleMenuClick = (action, record) => {
    console.log(`Se hizo clic en "${action}" para el usuario con cédula ${record}`);
    if (action === "editar") {
      setIsOpenUpdateModal(true)
      setFormularioEditar(record)
    }
  };

  const menu = (record) => (
    <Menu onClick={({ key }) => handleMenuClick(key, record)}>
      <Menu.Item key="editar"><EditOutlined /></Menu.Item>
      <Menu.Item key="eliminar"><DeleteOutlined /></Menu.Item>
    </Menu>
  );
  useEffect(() => {
    getParalelos()
    getUser()
    getCurso()
  }, [])

  return (
    <div className="myCustomHeight">
      <>
        <Row style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <Title level={3}>Mantenimiento de Horarios</Title>
        </Row>
        <Card bordered={false}>

          <Space style={{ margin: "5px" }}>
            <Row gutter={{ xs: 8, sm: 24, md: 150, lg: 24 }}>
              <Col>
                <Button icon={<PlusCircleOutlined />} onClick={() => { setIsOpenNewModal(true) }}>Crear un horario</Button>
              </Col>
              <Col>
                <Button icon={<SyncOutlined />} onClick={() => {
                  getParalelos()
                }}>Descargar datos de paralelo</Button>
              </Col>
              <Col>
                <Button icon={<SyncOutlined />} onClick={() => {
                  getUser()
                }}>Descargar datos de usuario</Button>
              </Col>
              <Col>
              <Button icon={<SyncOutlined/>} onClick={()=>{
                getCurso()
              }}>Descargar datos de curso</Button>
            </Col>
              <Col>
                <Button icon={<ClearOutlined />}>Limpiar</Button>
              </Col>

              <Col>
                <Button icon={<SearchOutlined />}>Buscar</Button>
              </Col>
            </Row>
          </Space>
          <Row>
            <Title level={5}>Cantidad : {dataTabla.length}</Title>
          </Row>

          <Table
            size="small"
            scroll={{ x: 100 }}
            columns={[
              {
                dataIndex: 'numero',
                title: 'numero',
                width: 2,
                align: 'center'
              },
              {
                dataIndex: 'paralelo',
                title: 'paralelo',
                width: 10
              },
              {
                dataIndex: 'ip_actualizacion',
                title: 'maquina ultima gestion',
                width: 10,
                align: 'center'
              },

              {
                dataIndex: 'usuarios_ultima_gestion',
                title: 'Usuario ultima gestion',
                width: 10,
                align: 'center'
              },
              {
                dataIndex: 'fecha_actualizacion',
                title: 'fecha ultima gestion',
                width: 10,
                align: 'center'

              },
              {
                dataIndex: 'estado',
                title: 'Estado',
                width: 10,
                align: 'center'

              },
              {
                dataIndex: "accion",
                title: "Acciones",
                align: 'center',
                width: 10,
                render: (_, record) => (
                  <Dropdown overlay={menu(record)} trigger={['click']}>
                    <Button><MenuOutlined /></Button>
                  </Dropdown>
                ),
              }
            ]}
            dataSource={dataTabla}
          />
        </Card>
        <NewHorario open={OpenNewModal} handleCloseModal={handleCloseModal} />
        <VerifyHorario open={isOpeVerifyHorario} handleCloseModal={handleCloseModal} formulario={formularioEditar} />

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
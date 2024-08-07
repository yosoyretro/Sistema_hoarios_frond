import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Button, Card, Col, Collapse, Input, Row,Select, Space, Table, Spin } from 'antd';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Typography from 'antd/es/typography/Typography';
import { AppstoreAddOutlined, ClearOutlined, FilterOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import AsignarHorario from '../../components/AsignarHorario';

const Calendario = () => {
  const [loading,setLoading] = useState(true);
  const [mensajeLoading,setMensajeLoading] = useState("cargando...");
  const { Title } = Typography;
  const [isOpen,setIsOpen] = useState(false)  
  function closeHandleModal(){
    setIsOpen(false);  
  }

  return (
    
    <>
      <Row style={{
                display:"flex",
                justifyContent:"center"
            }}>
            <Title level={3}>Mantenimiento de Horario</Title>
      </Row>
      <Card bordered={false}>
            <Space style={{
                    margin:"5px"
                }}>
                    <Row gutter={{ xs: 8, sm: 24, md: 150, lg: 24 }}>
                        <Col>
                            <Button icon={<AppstoreAddOutlined/>} onClick={()=>{
                              console.log("Estoy llegando en el onclicck")
                              setIsOpen(true)
                            }}>Crear una nueva asignacion</Button>

                        </Col>


                        <Col>
                            <Button icon={<SyncOutlined/>} onClick={()=>{
                              
                            }}>Descargar datos</Button>

                        </Col>

                        <Col>
                            <Button icon={<ClearOutlined/>}>Limpiar</Button>
                        </Col>

                        <Col>
                            <Button icon={<SearchOutlined/>}>Buscar</Button>
                        </Col>

                    </Row>
                </Space>
        <Row>
          <Title level={5}>Cantidad : </Title>
        </Row>
        <Table
          columns={[
            {
              dataIndex:"numero",
              title:"N°",
              width:20,
              align:'center'
            },
            {
              dataIndex:"instituto",
              title:"Instituto",
              width:20,
              align:'center'
            },
            {
              dataIndex:"carrera",
              title:"Carrera",
              width:20,
              align:'center'
            },
            {
              dataIndex:"curso",
              title:"Curso",
              width:20,
              align:'center'
            },
            {
              dataIndex:"paralelo",
              title:"Paralelo",
              width:20,
              align:'center'
            },
            {
              dataIndex: "maquina_creacion",
              title: "maquina creacion",
              width: 20,
              align:"center"
            },
            {
              dataIndex: "usuario_creacion",
              title: "creador",
              width: 20,
              align:"center"
            },
            {
              dataIndex: "estado",
              title: "Estado",
              width: 20,
              align:"center"
            },
            {
              dataIndex:"acciones",
              title:"Acciones",
              width:20,
              align:'center'
            }
          ]}
          size="small"
          scroll={{ x: 50 }}

        />
      </Card>

      <AsignarHorario isOpen={isOpen} closeHandleModal={closeHandleModal} loading={setLoading} mensaje={setMensajeLoading}/>
    </>
  );
};

export default Calendario;

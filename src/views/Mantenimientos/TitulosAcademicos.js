import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Space, Table, Typography, Menu, Dropdown, Spin } from "antd";
import { SyncOutlined, FileAddOutlined, EditOutlined, DeleteOutlined, MenuOutlined } from "@ant-design/icons";
import NewTitulo from "../../components/NewTitulo.js";
import UpdateTitulo from "../../components/UpdateTitulo.js";

const TitulosAcademicos = () => {
  const { Title } = Typography;
  const [loading,setLoading] = useState(true);
  const [mensajeLoading,setMensajeLoading] = useState("cargando...");
  const [titulosData, setTitulos] = useState([]);
  const [isOpenNewTitulo, setIsOpenNewModal] = useState(false);
  const [isOpenUpdateTitulo, setIsOpenUpdateModal] = useState(false);
  const [formularioEditar, setFormularioEditar] = useState([]);
  const url = "http://localhost:8000/api/istg/";

  useEffect(() => {
    getTitulos();
  }, []);

  const handleCloseModal = () => {
    setIsOpenNewModal(false);
    setIsOpenUpdateModal(false);
  };

  const getTitulos = () => {
    setLoading(true)
    fetch(`${url}show_data_titulo_academico`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        if(data.data){
            let titulos = data.data.map((value, index) => {
              return {
                numero: index + 1,
                id: value?.id_titulo_academico,
                descripcion: value?.descripcion,
                fecha_creacion: new Date(value.fecha_creacion).toLocaleDateString(),
                fecha_actualizacion: value?.fecha_actualizacion ? new Date(value?.fecha_actualizacion).toLocaleDateString() : 'N/A',
                estado: value?.estado === 'A' ? 'Activo' : 'Inactivo'
              }
            });
            setTitulos(titulos);
          }
      }).catch(()=>{
        setTitulos([])
      })
      .finally(()=>{
        setLoading(false)
      });
  };

  const deleteTitulo = () => {
    setLoading(true)
    fetch(`${url}delete_titulo_academico`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        
      })
      .finally(()=>{
        setLoading(false)
      });
  }
  const handleMenuClick = (action, record) => {
    if (action === "editar") {
      setIsOpenUpdateModal(true);
      setFormularioEditar(record);
    }else if(action === "eliminar"){

    }
    // Agregar lógica de eliminación si es necesario
  };

  const menu = (record) => (
    <Menu onClick={({ key }) => handleMenuClick(key, record)}>
      <Menu.Item key="editar"><EditOutlined /></Menu.Item>
      <Menu.Item key="eliminar"><DeleteOutlined /></Menu.Item>
    </Menu>
  );

  return (
    <>
      <Spin spinning={loading} tip={mensajeLoading}>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Title level={3}>Mantenimiento de Títulos Académicos</Title>
      </Row>

      <Card bordered={false}>
        <Space style={{ margin: "5px" }}>
          <Row gutter={{ xs: 8, sm: 24, md: 150, lg: 24 }}>
            <Col>
              <Button icon={<FileAddOutlined />} onClick={() => { setIsOpenNewModal(true) }}  type="primary">
                Crear Título Académico
              </Button>
            </Col>

            <Col>
              <Button icon={<SyncOutlined />} onClick={getTitulos}>
                Descargar datos
              </Button>
            </Col>
          </Row>
        </Space>
        <Row>
          <Title level={5}>Cantidad : {titulosData.length}</Title>
        </Row>
        <Table
          size="small"
          scroll={{ x: 100 }}
          style={{ margin: "5px" }}
          dataSource={titulosData}
          columns={[
            {
              dataIndex: 'numero',
              title: 'Nº',
              width: 20,
              align: 'center'
            },
            {
              dataIndex: 'descripcion',
              title: 'Descripción',
              width: 100
            },
            {
              dataIndex: 'fecha_creacion',
              title: 'Fecha de Creación',
              width: 50,
              align: 'center'
            },
            {
              dataIndex: 'fecha_actualizacion',
              title: 'Fecha de Actualización',
              width: 50,
              align: 'center'
            },
            {
              dataIndex: 'estado',
              title: 'Estado',
              width: 20,
              align: 'center'
            },
            {
              dataIndex: "accion",
              title: "Acciones",
              align: 'center',
              width: 20,
              render: (_, record) => (
                <Dropdown overlay={menu(record)} trigger={['click']}>
                  <Button><MenuOutlined /></Button>
                </Dropdown>
              ),
            }
          ]}
        />
      </Card>
      </Spin>
      <NewTitulo open={isOpenNewTitulo} handleCloseModal={handleCloseModal} getTitulos={getTitulos} />
      <UpdateTitulo open={isOpenUpdateTitulo} handleCloseModal={handleCloseModal} getTitulos={getTitulos} formulario={formularioEditar} loading={setLoading} mensaje={setMensajeLoading}/>
    </>
  );
}

export default TitulosAcademicos;

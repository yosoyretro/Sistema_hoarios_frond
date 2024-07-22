import React, { useState, useEffect } from "react";
import { Button, Row, Col, Space, Table, Typography, Menu, Dropdown, Card } from "antd";
import { SyncOutlined, UserAddOutlined, EditOutlined, DeleteOutlined, MenuOutlined } from "@ant-design/icons";
import NewPerfil from "../../components/NewPerfil.js";
import UpdatePerfil from "../../components/UpdatePerfil.js";

const Perfiles = () => {
  const { Title } = Typography;
  const [perfilesData, setPerfiles] = useState([]);
  const [isOpeNewPerfil, setIsOpenNewModal] = useState(false);
  const [isOpeUpdatePerfil, setIsOpenUpdateModal] = useState(false);
  const [formularioEditar, setFormularioEditar] = useState([]);
  const url = "http://localhost:8000/api/istg/";

  useEffect(() => {
    getPerfiles();
  }, []);

  function handleCloseModal() {
    setIsOpenNewModal(false);
    setIsOpenUpdateModal(false);
  }

  function getPerfiles() {
    fetch(`${url}show_roles`, { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response data:", data); // Debugging line
        let perfiles = data.data.map((value, index) => {
          return {
            numero: index + 1,
            id: value.id_rol,
            descripcion: value.descripcion,
            ip_actualizacion: value.ip_actualizacion,
            fecha_actualizacion: new Date(value.fecha_actualizacion).toLocaleDateString(),
            usuarios_ultima_gestion: value.usuarios_ultima_gestion,
            estado: value.estado,
          };
        });
        setPerfiles(perfiles);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Debugging line
      });
  }

  const handleMenuClick = (action, record) => {
    console.log(`Se hizo clic en "${action}" para el usuario con cédula ${record}`);
    if (action === "editar") {
      setIsOpenUpdateModal(true);
      setFormularioEditar(record);
    }
  };

  const menu = (record) => (
    <Menu onClick={({ key }) => handleMenuClick(key, record)}>
      <Menu.Item key="editar"><EditOutlined /></Menu.Item>
      <Menu.Item key="eliminar"><DeleteOutlined /></Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Title level={3}>Mantenimiento de Perfiles</Title>
      </Row>

      <Card bordered={false}>
        <Space style={{ margin: "5px" }}>
          <Row gutter={{ xs: 8, sm: 24, md: 150, lg: 24 }}>
            <Col>
              <Button icon={<UserAddOutlined />} onClick={() => setIsOpenNewModal(true)}>Crear un perfil</Button>
            </Col>
            <Col>
              <Button icon={<SyncOutlined />} onClick={getPerfiles}>Descargar datos</Button>
            </Col>
          </Row>
        </Space>
        <Row>
          <Title level={5}>Cantidad : {perfilesData.length}</Title>
        </Row>
        <Table
          size="small"
          scroll={{ x: 100 }}
          style={{ margin: "5px" }}
          dataSource={perfilesData}
          columns={[
            {
              dataIndex: 'numero',
              title: 'Nª',
              width: 20,
              align: 'center'
            },
            {
              dataIndex: 'descripcion',
              title: 'descripcion',
              width: 20
            },
            {
              dataIndex: 'usuarios_ultima_gestion',
              title: 'Usuario ultima gestion',
              width: 75,
              align: 'center'
            },
            {
              dataIndex: 'fecha_actualizacion',
              title: 'fecha ultima gestion',
              width: 20,
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
      <NewPerfil open={isOpeNewPerfil} handleCloseModal={handleCloseModal} getRoles={getPerfiles} />
      <UpdatePerfil open={isOpeUpdatePerfil} handleCloseModal={handleCloseModal} getRoles={getPerfiles} formulario={formularioEditar} />
    </>
  );
};

export default Perfiles;

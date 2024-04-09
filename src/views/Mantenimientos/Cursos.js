import React,{ useState,useEffect } from "react";
import { Button, Collapse, Input, Table,Typography,Menu,Dropdown,Row,Col,Space,Card } from "antd";
import { SyncOutlined, PlusCircleOutlined,ClearOutlined,SearchOutlined,EditOutlined,DeleteOutlined,MenuOutlined } from "@ant-design/icons";
import NewCurso from "../../components/NewCurso.js"
import UpdateCurso from "../../components/UpdateCurso.js"
const Cursos = () => {
  const { Title } = Typography;
  const [isOpenModal,setIsOpen] = useState(false);
  const [isOpenUpdateModal,setIsOpenUpdateModal] = useState(false);
  const [cursoData,setCursoData] = useState([]);
  const [formularioEditar,setFormularioEditar] = useState([]);
  const url = "http://localhost:8000/api/istg/";
  useEffect(()=>{
    getCurso()
  },[])
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

  const menu = (record) => (
            <Menu onClick={({ key }) => handleMenuClick(key, record)}>
                <Menu.Item key="editar"><EditOutlined/></Menu.Item>
                <Menu.Item key="eliminar"><DeleteOutlined/></Menu.Item>
            </Menu>
    );

  const handleMenuClick = (action, record) => {
        console.log(`Se hizo clic en "${action}" para el usuario con cédula ${record}`);
        if(action == "editar"){
          setIsOpenUpdateModal(true)
          setFormularioEditar(record)
        }
    };

  function handleCloseModal(){
    setIsOpen(false)
    setIsOpenUpdateModal(false)
  }

  return (
    <>
      <Row style={{
        display:"flex",
        justifyContent:"center"
      }}>
        <Title level={3}>Mantenimiento de Cursos</Title>
      </Row>
      <Card bordered={false}>
      <Space style={{
          margin:"5px"
        }} direction="vertical">
          <Row gutter={{ xs: 8, sm: 24, md: 150, lg: 24 }}>
            <Col>
              <Button icon={<PlusCircleOutlined/>} onClick={()=>{setIsOpen(true)}}>Crear un curso</Button>
            </Col>
            <Col>
              <Button icon={<SyncOutlined/>} onClick={()=>{
                getCurso()
              }}>Descargar datos</Button>
            </Col>
          </Row>
      
      </Space>
      <Row>
        <Title level={5}>Cantidad : {cursoData.length}</Title>
      </Row>
      <Table
        size="small"
        scroll={{ x: 100, y:1500 }}  
        columns={[
              {
                dataIndex:'numero',
                title:'numero',
                width:10,
                align:'center'
              },
              {
                dataIndex:'nemonico',
                title:'nemonico',
                width:10
              },
              {
                dataIndex:'termino',
                title:'termino',
                width:10
              },
              {
                dataIndex:'ip_actualizacion',
                title:'maquina ultima gestion',
                width:20,
                align:'center'
              },

              {
                dataIndex:'usuarios_ultima_gestion',
                title:'Usuario ultima gestion',
                width:20,
                align:'center'
              },
              {
                dataIndex:'fecha_actualizacion',
                title:'fecha ultima gestion',
                width:20,
                align:'center'

              },
              {
                dataIndex:'estado',
                title:'Estado',
                width:10,
                align:'center'

              },
              {
                dataIndex: "accion",
                title: "Acciones",
                align:'center',
                width: 10,
                render: (_, record) => (
                  <Dropdown overlay={menu(record)} trigger={['click']}>
                    <Button><MenuOutlined/></Button>
                  </Dropdown>
                ),
              }
          ]}
        dataSource={cursoData}
      />
    </Card>

    <NewCurso open={isOpenModal} handleCloseModal={handleCloseModal} getCurso={getCurso}/>
    <UpdateCurso open={isOpenUpdateModal} handleCloseModal={handleCloseModal} formulario={formularioEditar} getCurso={getCurso}/>
    </>
    )
}
export default Cursos;

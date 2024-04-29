import React, { useEffect, useState } from "react";
import { Typography,Row, Card, Space, Col, Button, Table, Dropdown, Menu } from "antd";
import NewPlanificacionAcademica from "../../components/NewPlanificacionAcademica";
import { DeleteOutlined, EditOutlined, MenuOutlined, PlusCircleOutlined, SyncOutlined, UserAddOutlined } from "@ant-design/icons";
const PlanificacionAcademica = () => {
    const url = "http://localhost:8000/api/istg/";
    const { Title } = Typography;
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [dataTable,setDataTable] = useState([]);
    const handleMenuClick = (action, record) => {
        console.log(`Se hizo clic en "${action}" para el usuario con cédula ${record}`);
        if(action === "editar"){
          
        }
    };
    const menu = (record) => (
        <Menu onClick={({ key }) => handleMenuClick(key, record)}>
            <Menu.Item key="editar"><EditOutlined/></Menu.Item>
            <Menu.Item key="eliminar"><DeleteOutlined/></Menu.Item>
        </Menu>
    );

    async function showPlanificaciones(){
        try{

            let configuraciones = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            let response = await fetch(`${url}Planificaciones/getPlanificacionAcademicas`, configuraciones);
            let data = await response.json()
            if(data){
                if(data.ok){
                        setDataTable(data.data.map((element,index) => {
                            return {
                                id:index,
                                numero:index+1,
                                coordinador:element.coordinador,
                                instituto:element.educacion_global,
                                fecha_actualizacion:new Date(element.fecha_ultima_actualizacion).toLocaleDateString()
                            }
                        }));
                    
                }else{
                    
                }
            }
        }catch(Error){

        }
    }

    function handleCloseModal(){
        setModalIsOpen(false)
    }
    useEffect(()=>{
        showPlanificaciones()
    },[])
    return (
        <>
        <Row style={{
            display:"flex",
            justifyContent:"center"
        }}>
            <Title level={3}>Planificacion Academica</Title>
        </Row>
        <Card bordered={false}>
        
            <Space style={{margin:"5px"}}>
                <Row gutter={{ xs: 8, sm: 24, md: 150, lg: 24 }}>
                    <Col>
                        <Button icon={<PlusCircleOutlined/>} onClick={()=>{
                            setModalIsOpen(true)
                        }} type="primary">Crear una planificacion Academica</Button>
                    </Col>
                    <Col>
                        <Button icon={<SyncOutlined/>} onClick={()=>{}}>Descargar datos</Button>
                    </Col>
                </Row>
            </Space>
            <Table
                columns={[
                    {
                        key:"numero",
                        dataIndex:"numero",
                        title:"Nº",
                        width:10,
                        align:"center"
                    },
                    {
                        dataIndex:"coordinador",
                        title:"Coordinador de carrera",
                        width:50,
                        align:"center"
                    },
                    {
                        dataIndex:"instituto",
                        title:"Instituto",
                        width:50,
                        align:"center"
                    },
                    {
                        dataIndex:'fecha_actualizacion',
                        title:'fecha ultima gestion',
                        width:25,
                        align:'center'
        
                      },
                      {
                        dataIndex: "accion",
                        title: "Acciones",
                        align:'center',
                        width: 25,
                        render: (_, record) => (
                          <Dropdown overlay={menu(record)} trigger={['click']}>
                            <Button><MenuOutlined/></Button>
                          </Dropdown>
                        ),
                      }
                ]}
                dataSource={dataTable}
            />
        </Card>
        <NewPlanificacionAcademica open={modalIsOpen} handleCloseModal={handleCloseModal}/>
        </>
    );
}

export default PlanificacionAcademica;
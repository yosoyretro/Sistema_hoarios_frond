import Card from "antd/es/card/Card";
import React,{useState,useEffect} from "react"
import { Button, Collapse, Input, Table,Typography,Menu,Dropdown,Select } from "antd";
import { FilterOutlined, UserOutlined,MenuOutlined,DeleteOutlined,EditOutlined,FolderViewOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { Row, Col,Space } from "antd";
import { UserAddOutlined,ClearOutlined,SearchOutlined,SyncOutlined } from "@ant-design/icons";
import NewUsuario from "../../components/NewUsuario.js"
const Usuarios = () => {
    const { Title } = Typography;
    const [isOpenModal,setIsOpen] = useState(false);
    const [dataTabla,setDataTabla] = useState([]);
    const [cantidadRegistro,setCantidadRegistro] = useState(0);
    const url = "http://localhost:8000/api/istg/";
    const handleCloseModal = () => {
      setIsOpen(false);
    }; 

    const handleMenuClick = (action, record) => {
        console.log(record)
        console.log(`Se hizo clic en "${action}" para el usuario con cédula ${record}`);
    };


     const menu = (record) => (
            <Menu onClick={({ key }) => handleMenuClick(key, record)}>
                <Menu.Item key="editar"><EditOutlined/></Menu.Item>
                <Menu.Item key="eliminar"><DeleteOutlined/></Menu.Item>
                <Menu.Item key="visualizar_informacion"><FolderViewOutlined /></Menu.Item>
            </Menu>
    );  


    function getUser (){
        fetch(`${url}show_usuario`, { method: 'GET' })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            let informacion = data.data.map((value)=>{
                return {
                        id:value.id_usuario,
                        cedula: value.cedula,
                        usuarios: value.usuario,
                        nombres: value.nombres,
                        apellidos: value.apellidos,
                        perfil: value.descripcion,
                        estado: value.estado,
                        maquina_creacion:value.ip_creacion,
                        maquina_actualiso:value.ip_actualizacion,
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
    
    useEffect(()=>{
        getUser()
    },[])

    return (
        <>
            <Row style={{
                display:"flex",
                justifyContent:"center"
            }}>
                <Title level={3}>Mantenimiento de usuarios</Title>
            </Row>
            <Card bordered={false}>
                <Space style={{
                    margin:"5px"
                }}>
                    <Row gutter={{ xs: 8, sm: 24, md: 150, lg: 24 }}>
                        <Col>
                            <Button icon={<UserAddOutlined/>} onClick={()=>{
                                setIsOpen(true)
                            }}>Crear un usuario</Button>

                        </Col>


                        <Col>
                            <Button icon={<SyncOutlined/>} onClick={()=>{
                                getUser()
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
                    <Title level={5}>Cantidad : {cantidadRegistro}</Title>
                </Row>
                <Table
                    style={{
                        margin: "5px"
                    }}
                    bordered={false}
                    columns={[
                        {
                            dataIndex: "cedula",
                            title: "Cedula",
                            width: 20
                        },
                        {
                            dataIndex: "nombres",
                            title: "Nombres",
                            width: 20
                        },
                        {
                            dataIndex: "apellidos",
                            title: "Apellidos",
                            width: 30
                        },
                        {
                            dataIndex: "usuarios",
                            title: "Usuario",
                            width: 20
                        },
                        {
                            dataIndex: "perfil",
                            title: "Perfil",
                            width: 20
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
                            dataIndex: "accion",
                            title: "Acciones",
                            align:'center',
                            width: 20,
                            render: (_, record) => (
                                <Dropdown overlay={menu(record)} trigger={['click']}>
                                  <Button><MenuOutlined/></Button>
                                </Dropdown>
                              ),
                        }
                    ]}
                    dataSource={dataTabla}
                    size="small"
                    scroll={{ x: 75 }}
                />

            </Card>
            <NewUsuario isOpen={isOpenModal} onCloseModal={handleCloseModal} getUser={getUser}/>
        </>
    )
}

export default Usuarios;

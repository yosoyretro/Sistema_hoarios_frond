import React,{useState, useEffect, useRef} from "react";
import { Button, Col, Row,Form, Flex, Breadcrumb, Table, Popconfirm,Spin,Space,Modal,Input,notification } from "antd";

import { ToolOutlined, QuestionCircleOutlined, DeleteOutlined, EditOutlined, SyncOutlined,SaveOutlined,FileAddOutlined } from '@ant-design/icons';
import { error } from "console";

const Nivel = () => {
    const [loading,setLoading]= useState(true);
    const [dataNivel,setDataNivel] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenNivel,setModalOpenNivel] = useState(false);
    const [form] = Form.useForm();
    const formKeyRef = useRef(0);
    const [notificacion, setNotificacion] = useState(null);
    const [dataNivelEdit, setdataNivelEdit] = useState({});
    const { Column, ColumnGroup} = Table;
    const url = process.env.REACT_APP_BACKEND_HORARIOS;
    //const url = "http://127.0.0.1:8000/api/v1/horario/";
    function cerrarModalEdit(){
        setModalOpenNivel(false);
    }
    function abrirModalEdit(){
        setDataNivel(true);
    }
    const mostrarNotificacion = (tipo, titulo, mensaje) => {
        notification[tipo]({
            message: titulo,
            description: mensaje,
        });
    };
    const handleEditarClick = (nivel) => {
        abrirModalEdit()
        console.log("Soy un Curso")
        console.log(nivel)
        setdataNivelEdit({ id_nivel:nivel.id_nivel, numero:nivel.numero.props.nivel, nemonico:nivel.nemonico.props.nivel, termino:nivel.termino.props.nivel})
        formKeyRef.current += 1;
    };
    

    const getNivel = () => {
        setLoading(true);
        fetch(`${url}show_data_nivel/`).then((response) => {
            return response.jason() })
            .then((data) => {
                if (data.ok) {
                    if(data.data) {
                        let obj = data.data.map((value,numero)=> {
                            return {
                                id_nivel:value.id_nivel,
                                numero:numero+1,
                                numero:<label className="letra-pequeña1">{value.numero}</label>,
                                nemonico:<label className="letra-pequeña1">{value.nemonico}</label>,
                                termino:<label className="letra-pequeña1">{value.termino}</label>,
                                fecha_creacion:<span className="letra-pequeña1">{new Date(value.fecha_creacion).toLocaleDateString('es-Es',{
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })} </span>,
                                hora_creacion:<span className="letra-pequeña1">{value-hora_creacion}</span>,
                                fecha_actualizacion:<label className="letra-pequeña1">{value.fecha_actualizacion? new Date(value.fecha_actualizacion).toLocaleDateString('es-Es'):'Este registro no tiene fecha de actualización'}</label>,
                                hora_actualizacion:<span className="letra-pequeña1">{value.hora_actualizacion ?? "Este registro no tiene hora de actualización"}</span>,
                                estado_registro: value.estado ==='A' ? 'Activo' : (value.estado === 'I' ? 'Inactivo' : (value.estado === 'E' ? 'Eliminado' : 'Otra condición')),
                            }
                        })
                        setDataNivel(obj)
                        
                    }
                } else if (data.ok ==false) {
                    mostrarNotificacion("error", "A ocurrido un error", data.msg_error);
                } else {
                    throw new Error("El error es interno en el servidor, por faovr contactese con el administrador.");
                }

            }).finally(()=>{
                setLoading(false);
            }).catch((error) => {
                mostrarNotificacion('error', 'A ocurrido un error',error.message)
            })

    }

    const createNivel = (value) =>{
        let data_request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', //Especifica el tipo de contenido como JSON
            },
            body: JSON.stringify(value),
        }
        fetch(`${url}create_nivel/`,data_request).then((response)=>{return response.json()})
        .then((request_backend)=>{
            if(request_backend.ok){
                mostrarNotificacion("success", "Operación realizada con éxito", request_backend.msg);
            } else if(request_backend.ok == false) {
                mostrarNotificacion("error", "Hubo un problema", request_backend.msg);
            } else{
                throw new Error("El error es interno en el servidor, por favor contactarse con el administrador.");
            }
        }).finally(
            ()=>{
                setModalOpen(false);
                form.resetFields();
                getNivel();
            }
        ).catch((error)=> {
            mostrarNotificacion("error", "A ocurrido un error",error);
        })
    }

    const deleteNivel = (values) => {
        let request_backend = {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id_nivel:values.id_nivel
            })
        }
        fetch(`${url}delete_nivel/`,request_backend).then((data_request)=>{return data_request.json()})
        .then((data)=>{
            if (data.ok){
                mostrarNotificacion("success","Operación realizada con éxito","El titulo" + values.descripcion.props.nivel + "se eliminó con éxito");
            }else if(data.ok == false){
                mostrarNotificacion("error","A ocurrido un error interno", data.msg);
            }
        }).finally(()=>{
            getNivel();
        })
    }
    useEffect(()=>{
        getNivel();
    },[])

    function onFinish(values){
        createNivel(values)
    }

    function editNivel(values){
        let request_backend = {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id_nivel:dataNivelEdit.id_nivel,
                numero:values.numero,
                nemonico:values.nemonico,
                termino:values.termino
            })
        }
        fetch(`${url}update_nivel/`,request_backend).then((data_request)=>{return data_request.json()})
        .then((data)=>{
            if(data.ok){
                mostrarNotificacion("success","Operación realizada con éxito", data.msg);
            }else if(data.ok == false){
                mostrarNotificacion("danger","A ocurrido un error interno",data.msg_error);
            }
        }).finally(()=>{
            cerrarModalEdit()
            getNivel();
        })
    }

    return(
        <>
        <Spin spinning={loading} tip="Cargando...">{/*MODAL DE CREAR NIVEL*/}<Modal title="Crear Nivel" footer={null} open={modalOpen} onCancel={()=>{setModalOpen(false)}} onclose={()=>{setModalOpen(false)}} okText="Crear Nivel">
            <Row align="left" style={{marginLeft:"10px"}}>
                <h2><FileAddOutlined/> Crear Nivel</h2>
            </Row>
            <Row>
                <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="on" align="left">
                    <Row>
                        <Form.Item name="numero" rules={[{required:true, message:"El numero es requerido"}]} label="Ingrese el numero del Nivel">
                            <Input style={{ width:450 }}/>
                        </Form.Item>
                    </Row>

                    <Row>
                        <Form.Item name="nemonico" rules={[{required:true,message:"El nemonico es requerido"}]} label="Ingrese el nemonico ">
                            <Input style={{ width: 450}}/>
                        </Form.Item>
                    </Row>

                    <Row>
                        <Form.Item name="termino" rules={[{required:true, message:"El termino es requerido"}]} label="Ingrese el termino del Nivel">
                            <Input style={{ width:450 }}/>
                        </Form.Item>
                    </Row>

                    <Row>
                        <Button htmlType="submit" style={{width:"100%"}} type="primary" icon={<SaveOutlined7/>}>Crear Nivel</Button>
                    </Row>
                </Form>
            </Row>
        </Modal>
        {/*MODAL DE EDITAR NIVEL*/}
        <Modal key={formKeyRef.current} title="Editar Nivel" footer={null} open={modalOpenNivel} onCancel={()=>{cerrarModalEdit()}} onclose={()=>{cerrarModalEdit()}}>
            <Row align="left" style={{marginLeft:"10px"}}>
                <h2><FileAddOutlined/>Editar Nivel</h2>
            </Row>
            <Row>
                <Form initialValues={dataNivelEdit} onFinish={editNivel} layout="vertical" autoComplete="on" align="left">
                    <Row>
                        <Form.Item name="numero" rules={[{required:true,message:"El numero del nivel es requerido"}]} label="Edite el numero del nivel">
                            <Input style={{ width:450}}/>
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item name="nemonico" rules={[{required:true, message:"El nemonico es requerido"}]} label="Edite el nemonico">
                            <Input style={{ width:450}}/>
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item name="termino" rules={[{required:true, message:"El termino es requerido"}]} label="Edite el termino del nivel">
                            <Input style={{ width:450}}/>
                        </Form.Item>
                    </Row>
                    <Row>
                        <Button htmlType="submit" style={{width:"100%"}} type="primary" icon={<SaveOutlined/>}>Editar Nivel</Button>
                    </Row>
                </Form>
            </Row>
        </Modal>

        <Row align="left">
            <Flex wrap="wrap" grap="small">
                <ToolOutlined style={{ fontSize:"25px"}} /><h1>Mantenimiento de Nivel</h1>
            </Flex>
        </Row>

        <Row style={{ margin: "5px"}}>
            <Breadcrumb
            separator=">"
            items={[{ title:"Dashboard"}, {title: "Mantenimientos"}, {title:"Nivel"}]}/>
        </Row>
        <Space direction="vertical" size={20} style={{ width:"100%" }}>
            <Row align="left" layout>
                <Space size="small" style={{ margin:"4px"}}>
                    <Col>
                        <Button style={{ color: "green", border: "1px solid green"}} icon={<EditOutlined/>} onClick={()=>{setModalOpen(true)}}>Crear Nivel</Button>
                    </Col>
                    <Col>
                        <Button style={{ color:"green", border:" 1px solid green"}} onClick={()=>{getNivel()}} icon={<SyncOutlined/>}>Sincronizar datos</Button>
                    </Col>
                </Space>
            </Row>

            <Row style={{ width:'100%'}}>
                <Table
                scroll={{ x:1745 }}
                bordered={false}
                dataSource={dataNivel}>
                    <ColumnGroup title="Registro">
                        <Column title="Nº" dataIndex="numero" width={75} align="center"/>
                        <Column title="nemonico" dataIndex="nemonico" width={100} align="center"/>
                        <Column title="Termino" dataIndex="termino" width={100} align="center"/>
                    </ColumnGroup>
                    <ColumnGroup title="Campos de auditoria" bordered={true}>
                        <Column title="Fecha de creación" dataIndex="fecha_creacion" width={90} align="center"/>
                        <Column title="Hora de creación" dataIndex="hora_creacion" width={75} align="center"/>
                        <Column title="Fecha de actualización" dataIndex="fecha_actualizacion" width={90} align="center"/>
                        <Column title="Hora de actualización" dataIndex="hora_actualizacion" width={75} align="center"/>
                        <Column title="Estado registro" dataIndex="estado_registro" width={100} align="center"/>
                    </ColumnGroup>


                    <Column 
                    title= "Acciones"
                    fixed="right"
                    width={75}
                    dataIndex="acciones"
                    align="center"
                    render={(nivel, record) => (
                        <Space size="small">
                            <Col>
                                <Button type="primary" icon={<EditOutlined/>} onClick={() => handleEditarClick(record)}/>
                            </Col>
                            <Col>
                                <Popconfirm 
                                okText="Si, realizar"
                                title="Confirmar acccion"
                                description="¿Deseas realizar la eliminación de este registro? Al borrar este registro, todos los usuarios que tengan el Nivel de este registro quedarán afectados."
                                onConfirm={() => {deleteNivel(record)}}
                                icon={<QuestionCircleOutlined style={{ color: 'red'}}/>}>
                                    <Button type="primary" danger icon={<DeleteOutlined/>} />
                                </Popconfirm>
                            </Col>
                        </Space>
                    )}
                    />
                </Table>
            </Row>
        </Space>
        </Spin>
        </>
    )

}
export default Nivel;
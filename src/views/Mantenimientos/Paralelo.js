import React,{useState, useEffect, useRef} from "react";
import { Button, Col, Row,Form, Flex, Breadcrumb, Table, Popconfirm,Spin,Space,Modal,Input,notification } from "antd";
import { ToolOutlined, QuestionCircleOutlined, DeleteOutlined, EditOutlined, SyncOutlined,SaveOutlined,FileAddOutlined } from '@ant-design/icons';
import "../../public/css/letras.css";



const Paralelo = () => {
    const [loading, setLoading] = useState(true);
    const [dataParalelo, setDataParalelo] = useState ([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenParalelo, setModalOpenParalelo] = useState(false);
    const [form] = Form.useForm();
    const formKeyRef = useRef(0);
    const [notificacion, setNotificacion] = useState(null);
    const [dataParaleloEdit, setDataParaleloEdit] = useState({});
    const {Column, ColumnGroup} = Table;
    const url = process.env.REACT_APP_BACKEND_HORARIOS;
    //const url = "http://127.0.0.1:8000/api/v1/horario/";

    function cerrarModalEdit(){
        setModalOpenParalelo(false);
    }
    function abrirModalEdit(){
        setModalOpenParalelo(true);
    }
    
    const mostrarNotificacion = (tipo,titulo,mensaje) => {
        notification[tipo]({
            message:titulo,
            description:mensaje,
        });
    };

    const handleEditarClick = (paralelo) => {
        abrirModalEdit()
        console.log("Soy un Paralelo")
        console.log(paralelo)
        setDataParaleloEdit({ id_paralelo:paralelo.id_paralelo, numero_paralelo:paralelo.numero_paralelo.props.nivel})
        formKeyRef.current +=1;
    };

    const getParalelo = () => {
        setLoading(true);
        fetch(`${url}show_data_paralelo/`).then((response) => {
            return response.json() }).then((data) =>{
                if(data.ok) {
                    if(data.data) {
                        let obj = data.data.map((value, numero)=> {
                            return {
                                id_paralelo:value.id_paralelo,
                                numero:numero+1,
                                numero_paralelo:<label className="letra-pequeña1">{value.numero_paralelo}</label>,
                                fecha_creacion:<span className="letra-pequeña1">{new Date (value.fecha_creacion).toLocaleDateString('es-Es',{
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}</span>,
                                hora_creacion:<span className="letra-pequeña1">{value.hora_creacion}</span>,
                                fecha_actualizacion:<label className="letra-pequeña1">{value.fecha_actualizacion? new Date(value.fecha_actualizacion).toLocaleDateString('es-Es'): 'Este registro no tiene fecha de actualización'}</label>,
                                hora_actualizacion:<span className="letra-pequeña1">{value.hora_actualizacion ?? "Este registro no tiene hora de actualización"}</span>,
                                estado_registro: value.estado ==='A' ? 'Activo':(value.estado === 'I' ? 'Inactivo':(value.estado === 'E' ? 'Eliminado' : 'Otra condición')),
                            }
                        })
                        setDataParalelo(obj)

                    }
                } else if (data.ok == false) {
                    mostrarNotificacion("error", "A ocurrido un error", data.msg_error);
                } else {
                    throw new Error("El error es interno en el servidor, por favor contactese con el administrador");
                }

            }).finally(()=>{
                setLoading(false);
            }).catch((error)=>{
                mostrarNotificacion('Error', 'A ocurrido un error', error.message)
            })
    }

    const createParalelo = (value) =>{
        let data_request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', //Especifica el tipo de contenido como JSON
            },
            body: JSON.stringify(value),
        }
        fetch(`${url}create_paralelo/`, data_request).then((response)=> {return response.json()}).then((request_backend)=>{
            if(request_backend.ok){
                mostrarNotificacion("success", "Operación realizada con éxito", request_backend.msg);
            } else if(request_backend.ok == false) {
                mostrarNotificacion("error", "Hubo un problema", request_backend.msg);
            } else{
                throw new Error("El error es interno en el servidor, pro favor contactarse con el administrador.");
            }
        }).finally(() => {
            setModalOpen(false);
            form.resetFields();
            getParalelo();
        }).catch((error)=> {
            mostrarNotificacion("Error", "A ocurrido un error", error);
        })
    }

    const deleteParalelo = (values) => {
        let request_backend = {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id_paralelo:values.id_paralelo
            })
        }
        fetch(`${url}delete_paralelo/`, request_backend).then((data_request)=>{return data_request.json()}).then((data)=>{
            if (data.ok) {
                mostrarNotificacion("success", "Operación realizada con éxito", "El titulo" + values.description.props.paralelo + "se eliminó con éxito");
            } else if(data.ok == false){
                mostrarNotificacion("error", "A ocurrido un error interno", data.msg);
            }
        }).finally(()=>{
            getParalelo();
        })
    }
    useEffect(()=>{
        getParalelo();
    },[])

    function onFinish(values){
        createParalelo(values)
    }

    function editParalelo(values){
        let request_backend = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id_paralelo:dataParaleloEdit.id_paralelo,
                numero_paralelo:values.numero_paralelo,
            })
        }
        fetch(`${url}update_paralelo/`, request_backend).then((data_request)=>{return data_request.json()}).then((data)=>{
            if(data.ok){
                mostrarNotificacion("success", "Operación realizada con éxito", data.msg);
            } else if(data.ok == false) {
                mostrarNotificacion("danger", "A ocurrido un error interno", data.msg_error);
            }
        }).finally(()=>{
            cerrarModalEdit()
            getParalelo();
        })
    }

    return(
        <>
        <Spin spinning={loading} tip="Cargando...">{/*MODAL DE CREAR PARALELO*/}<Modal title="Crear Paralelo" footer={null} open={modalOpen} onCancel={()=>{setModalOpen(false)}} onClose={()=>{setModalOpen(false)}} okText="Crear Paralelo">
            <Row align="left" style={{marginLeft:"10px"}}>
                <h2><FileAddOutlined/>Crear Paralelo</h2>
            </Row>
            <Row>
                <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="on" align="left">
                    <Row>
                        <Form.Item name="numero_paralelo" rules={[{required:true, message:"El paralelo es requerido"}]} label="ingrese el numero del Paralelo">
                            <Input style={{ width:450}}/>
                        </Form.Item>
                    </Row>

                    <Row>
                        <Button htmlType="submit" style={{width:"100%"}} type="primary" icon={<SaveOutlined/>}>Crear Paralelo</Button>
                    </Row>
                </Form>
            </Row>
        </Modal>
        {/*MODAL DE EDITAR PARALELO*/}
        <Modal key={formKeyRef.current} title="Editar Paralelo" footer={null} open={modalOpenParalelo} onCancel={()=>{cerrarModalEdit()}} onClose={()=>{cerrarModalEdit()}}>
            <Row align="left" style={{marginLeft:"10px"}}>
                <h2><FileAddOutlined>Edita Paralelo</FileAddOutlined></h2>
            </Row>

            <Row>
                <Form initialValues={dataParaleloEdit} onFinish={editParalelo} layout="vertical" autoComplete="on" align="left">
                    <Row>
                        <Form.Item name="numero" rules={[{required:true,message: "El paralelo es requerido"}]} label="Edite el paralelo">
                            <Input style={{ width:450}}></Input>
                        </Form.Item>
                    </Row>
                    <Row>
                        <Button htmlType="submit" style={{width:"100%"}} type="primary" icon={<SaveOutlined/>}>Editar Paralelo</Button>
                    </Row>
                </Form>
            </Row>
        </Modal>
        
        <Row align="left">
            <Flex wrap="wrap" grap="small">
                <ToolOutlined style={{fontSize:"25px"}}/>
                <h1>Mantenimiento de Paralelo</h1>
            </Flex>
        </Row>

        <Row style={{margin:"5px"}}>
            <Breadcrumb separator=">" items={[{ title:"DashBoard"}, {title:"Paralelo"}]}/>
        </Row>
        <Space direction="vertical" size={20} style={{width:"100%"}}>
            <Row align="left" layout>
                <Space size="small" style={{ margin:"4px"}}>
                    <Col>
                        <Button style={{ color: "green", border: "1px solid green"}} icon={<EditOutlined/>} onClick={()=>{setModalOpen(true)}}>Crear Paralelo</Button>
                    </Col>
                    <Col>
                        <Button style={{ color: "green", border: "1px solid green" }} onClick={()=>{getParalelo()}} icon={<SyncOutlined />}>Sincronizar datos</Button>
                    </Col>
                </Space>
            </Row>

            <Row style={{ width:'100%'}}>
                <Table scroll={{ x:1745 }}
                bordered={false}
                dataSource={dataParalelo}>
                    <ColumnGroup title="Registro">
                        <Column title="Nº" dataIndex="numero" width={75} align="center"/>
                        <Column title="Paralelo" dataIndex="numero_paralelo" width={100} align="center"/>
                    </ColumnGroup>
                    <ColumnGroup title="Campos de auditoria" bordered={true}>
                    <Column title="Fecha de creación" dataIndex="fecha_creacion" width={90} align="center"/>
                        <Column title="Hora de creación" dataIndex="hora_creacion" width={75} align="center"/>
                        <Column title="Fecha de actualización" dataIndex="fecha_actualizacion" width={90} align="center"/>
                        <Column title="Hora de actualización" dataIndex="hora_actualizacion" width={75} align="center"/>
                        <Column title="Estado registro" dataIndex="estado_registro" width={100} align="center"/>
                    </ColumnGroup>


                    <Column title = "Acciones" fixed="right" width={75} dataIndex="acciones" align="center" render={(Paralelo, record) => (
                        <Space size="small">
                            <Col>
                                <Button type="primary" icon={<EditOutlined/>} onClick={() => handleEditarClick(record)}/>
                            </Col>
                            <Col>
                                <Popconfirm okText="Si, realizar" title="Confirmar acción" description="¿Deseas realizar la eliminación de este registro? Al borrar este registro todos los usuarios que tengan el Parralelo de este registro quedarán afectados." onConfirm={() => {deleteParalelo(record)}} icon={<QuestionCircleOutlined style={{ color: 'red'}}/>}>
                                    <Button type="primary" danger icon={<DeleteOutlined/>}/>
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
export default Paralelo;
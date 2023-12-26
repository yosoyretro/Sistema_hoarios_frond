import React, { useState, useEffect,useRef } from "react"
import { Button, Col, Row,Form, Flex, Breadcrumb, Table, Popconfirm,Spin,Space,Modal,Input,notification } from "antd";
import { ToolOutlined, QuestionCircleOutlined, DeleteOutlined, EditOutlined, SyncOutlined,SaveOutlined,FileAddOutlined } from '@ant-design/icons';
import "../../public/css/letras.css";
import FormItem from "antd/es/form/FormItem";

const TitulosAcademicos = () => {
  const [loading,setLoading]= useState(true);
  const [dataTitlosAcademicos, setDataTitulosAcademicos] = useState([]);
  const [modalOpen,setModalOpen] = useState(false);
  const [modalOpenTitulo,setModalOpenTitulo] = useState(false);
  const [form] = Form.useForm();
  const formKeyRef = useRef(0);
  const [notificacion, setNotificacion] = useState(null);
  const [dataTituloEdit,setDataTituloEdit] = useState({});
  const url = process.env.REACT_APP_BACKEND_HORARIOS;

  function cerrarModalEdit(){
    setModalOpenTitulo(false);
  }
  function abrirModalEdit(){
    setModalOpenTitulo(true);
  }
  const mostrarNotificacion = (tipo,titulo,mensaje) => {
    notification[tipo]({
      message: titulo,
      description: mensaje,
    });
  };
  const handleEditarClick = (childrens) => {
    abrirModalEdit()
    console.log("Soy el childrens")
    console.log(childrens)
    setDataTituloEdit({ id_titulo_academico:childrens.id_titulo_academico,codigo:childrens.codigo.props.children,descripcion:childrens.descripcion.props.children})
    formKeyRef.current += 1;

  };


  const getTitulosAcademicos = () => {
    setLoading(true);
    fetch(`${url}show_data_titulo_academico/`).then((response) => { return response.json() })
      .then((data) => {
        if (data.ok) {
          console.log(data)
          if (data.data) {
            let obj = data.data.map((value,numero)=>{
              return {
                id_titulo_academico:value.id_titulo_academico,
                numero:numero+1,
                codigo:<label className="letra-pequeña1">{value.codigo}</label>,
                descripcion:<label className="letra-pequeña1">{value.descripcion}</label>,
                fecha_creacion:<label className="letra-pequeña1">{new Date(value.fecha_creacion).toLocaleDateString('es-ES')}</label>,
                fecha_actualizacion:<label className="letra-pequeña1">{new Date(value.fecha_actualizacion).toLocaleDateString('es-ES')}</label>
              }
            })
            setDataTitulosAcademicos(obj)

          }

        } else if (data.ok == false) {
          console.log("El ok vino con error")
        } else {
          console.log("Error de comunicacion con el backend")
        }

      }).finally(()=>{
        setLoading(false);
      }).catch((error) => { window.alert(error) })

  }

  const createTitulo = (value) =>{
    let data_request = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',  // Especifica el tipo de contenido como JSON
      },
      body: JSON.stringify(value),
    }
    fetch(`${url}create_titulo_academico`,data_request).then((response)=>{return response.json()})
    .then((request_backend)=>{
      if(request_backend.ok){
        mostrarNotificacion("success","Operacion Realizada con exito",request_backend.msg);
      }else if(request_backend.ok == false){
        mostrarNotificacion("danger","Hubo un problema",request_backend.msg);
      }else{
        throw new Error("A ocurrido un error en la comunicacion del backend para crear el Titutlo Academico")
      }


    }).finally(
      ()=>{
        setModalOpen(false);
        form.resetFields();
        getTitulosAcademicos();
      }
    ).catch((error)=>{

    })


  }

  const deleteTitulo = (values)=>{
    console.log(values);
    let request_backend = {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
              id_titulo_academico:values.id_titulo_academico
            })
    }
    fetch(`${url}delete_titulo_academico/`,request_backend).then((data_request)=>{return data_request.json()})
    .then((data)=>{
      if(data.ok){
        mostrarNotificacion("success","Operacion Realizada con exito","El titulo " +values.descripcion.props.children +" se elimino con exito");
      }else if(data.ok == false){
        mostrarNotificacion("error","A ocurrido un error interno",data.msg);
      }
    }).finally(()=>{
      getTitulosAcademicos();
    })

    

  }
  useEffect(()=>{
    getTitulosAcademicos();

  },[])

  function onFinish(values){
    createTitulo(values)
  }

  function editTitulo(values){
    let request_backend = {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
              id_titulo_academico:dataTituloEdit.id_titulo_academico,
              codigo:values.codigo,
              descripcion:values.descripcion,
            })
    }
    fetch(`${url}update_titulo_academico/`,request_backend).then((data_request)=>{return data_request.json()})
    .then((data)=>{
      if(data.ok){
        mostrarNotificacion("success","Operacion Realizada con exito",data.msg);
      }else if(data.ok == false){
        mostrarNotificacion("danger","A ocurrido un error interno",data.msg);
      }
    }).finally(()=>{
      cerrarModalEdit()
      getTitulosAcademicos();
    })
  }

  return (
    <>
      <Spin spinning={loading} tip="Cargando...">
      {/*MODAL DE CREAR TITULO ACADEMICO*/}
      <Modal title="Crear Titulo Academico" footer={null} open={modalOpen} onCancel={()=>{setModalOpen(false)}} onclose={()=>{setModalOpen(false)}} okText="Crear Titulo">
          <Row align="left" style={{marginLeft:"10px"}}>
            <h2><FileAddOutlined />Crear Titulo</h2>
          </Row>
          <Row>
            <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="on" align="left">
              <Row>
                <Form.Item name="codigo" rules={[{required:true,message:"El codigo es requerido"}]} label="Ingrese el codigo de titulo Academico" >
                  <Input style={{ width: 450 }}/>
                </Form.Item>
              </Row>
              <Row>
                <Form.Item name="descripcion" rules={[{required:true,message:"La descripcion es requerido"}]} label="La descripcion es requerida" >
                  <Input style={{ width: 450 }}/>
                </Form.Item>
              </Row>
              <Row>
                <Button htmlType="submit" style={{width:"100%"}} type="primary" icon={<SaveOutlined />}>Crear Titulo Academico</Button>
              </Row>
            </Form>
          </Row>
      </Modal>
      {/*MODAL DE EDITAR TITUTLO ACADEMICO*/}
      <Modal key={formKeyRef.current} title="Editar Titulo Academico" footer={null} open={modalOpenTitulo} onCancel={()=>{cerrarModalEdit()}} onclose={()=>{cerrarModalEdit()}} >
          <Row align="left" style={{marginLeft:"10px"}}>
            <h2><FileAddOutlined />Editar Titulo Academico</h2>
          </Row>
          <Row>
            <Form initialValues={dataTituloEdit} onFinish={editTitulo} layout="vertical" autoComplete="on" align="left">
              <Row>
                <Form.Item name="codigo" rules={[{required:true,message:"El codigo es requerido"}]} label="Edite el codigo de titulo Academico" >
                  <Input style={{ width: 450 }}/>
                </Form.Item>
              </Row>
              <Row>
                <Form.Item name="descripcion" rules={[{required:true,message:"La descripcion es requerido"}]} label="Edite la descripcion" >
                  <Input style={{ width: 450 }}/>
                </Form.Item>
              </Row>
              <Row>
                <Button htmlType="submit" style={{width:"100%"}} type="primary" icon={<SaveOutlined />}>Editar Titulo Academico</Button>
              </Row>
            </Form>
          </Row>
      </Modal>

      <Row align="left">
        <Flex wrap="wrap" grap="small">
          <ToolOutlined style={{ fontSize: "25px" }} /><h1>Mantenimiento de Titulos Academicos</h1>
        </Flex>
      </Row>

      <Row style={{ margin: "5px" }}>
        <Breadcrumb
          separator=">"
          items={[{ title: "Dashboard" }, { title: "Mantenimientos" }, { title: "Titulos Academicos" }]}
        />
      </Row>
      <Space direction="vertical" size={20} style={{ width: "100%" }}>
        <Row align="left" layout>
          <Space size="small"style={{margin:"4px"}}>
            <Col>
              <Button style={{ color: "green", border: "1px solid green" }} icon={<EditOutlined />} onClick={()=>{setModalOpen(true)}}>Crear Titutlo Academico</Button>
            </Col>
            <Col>
              <Button style={{ color: "green", border: "1px solid green" }} onClick={()=>{getTitulosAcademicos()}} icon={<SyncOutlined />}>Sincronizar datos</Button>
            </Col>
          </Space>

        </Row>

        <Row style={{ width: '100%' }}>
          <Table scroll={{ x: 1500 }} columns={
            [
              { title: "Nº", dataIndex: "numero",width:75, align: "center" },
              { title: "Codigo", dataIndex: "codigo",width:100, align: "center" },
              { title: "Descripcion", dataIndex: "descripcion",width:200, align: "left" },
              { title: "Fecha de creacion", dataIndex: "fecha_creacion",width:100, align: "center" },
              { title: "Fecha_actualizacion", dataIndex: "fecha_actualizacion",width:100, align: "center" },
              {
                title: "Aciones", fixed: 'right', width: 75, dataIndex: 'aciones', align: "center", render: (childrens, record) => {
                  return (
                    <Space size="small">
                      <Col>
                        <Button typeof="primary" primary icon={<EditOutlined/>} onClick={() => handleEditarClick(record)} />
                      </Col>
                      <Col>
                        <Popconfirm
                          okText="Si , realizar"
                          title="Confirmar accion"
                          description="¿Deseas realizar la eliminacion de este registro, al borrar este registro todos los usuarios que tenga el titulo academico de este registro quedaran afectado?"
                          onConfirm={() => { deleteTitulo(record) }}
                          icon={
                            <QuestionCircleOutlined
                              style={{
                                color: 'red',
                              }}
                            />
                          }
                        >
                          <Button typeof="primary" danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                      </Col>

                    </Space>
                  )
                }
              }]
          }
            dataSource={dataTitlosAcademicos}
          >

          </Table>
        </Row>
      </Space>
      </Spin>
    </>
  )
}

export default TitulosAcademicos;

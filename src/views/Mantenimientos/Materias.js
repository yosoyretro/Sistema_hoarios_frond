import React,{useState,useEffect, useRef} from "react";
import { Button, Col, Row,Form, Flex, Breadcrumb, Table, Popconfirm,Spin,Space,Modal,Input,notification } from "antd";
import FormItem from "antd/es/form/FormItem";

import { ToolOutlined, QuestionCircleOutlined, DeleteOutlined, EditOutlined, SyncOutlined,SaveOutlined,FileAddOutlined } from '@ant-design/icons';

const Materias = () => {

  const [dataAsignatura,setDataAsignatura] = useState([]);
  const url = process.env.REACT_APP_BACKEND_HORARIOS;
  //const url = "http://127.0.0.1:8000/api/v1/horario/";
  const { Column, ColumnGroup } = Table;
  const [modalOpen,setModalOpen] = useState(false);
  const [modalOpenEdit,setModalOpenEdit] = useState(false);
  const [form] = Form.useForm();
  const [loading,setLoading]= useState(true);
  const [loadingButton,setLoadingButton]= useState(false);
  const formKeyRef = useRef(0);
  const [modalOpenTitulo,setModalOpenTitulo] = useState(false);
  const [dataMateriaEdit,setDataMateriaEdit] = useState({});
  const [id_materia,setIdMateria] = useState(0);
  const mostrarNotificacion = (tipo,titulo,mensaje) => {
    notification[tipo]({
      message: titulo,
      description: mensaje,
    });
  };

  const getAsignatura = ()=>{
    setLoading(true);
    fetch(`${url}show_data_asignatura/`).then((response)=>{return response.json()})
    .then((data_request)=>{
      console.log("Soy la data request")
      console.log(data_request)
      if(data_request.ok){
        if(data_request.data){
          let data = data_request.data.map((value,numero)=>{
            return {
              key:numero,
              numero:numero+1,
              id:value.id_materia,
              codigo:<label className="letra-pequeña1">{value.codigo}</label>,
              descripcion:<label className="letra-pequeña1">{value.descripcion}</label>,
              estado_registro: value.estado === 'A' ? 'Activo' : (value.estado === 'I' ? 'Inactivo' : (value.estado === 'E' ? 'Eliminado' : 'Otra condición')),
              fecha_creacion:
                <span className="letra-pequeña1">
                  {new Date(value.fecha_creacion).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>,
                hora_creacion:
                <span className="letra-pequeña1">
                  {value.hora_creacion}
                </span>,
                fecha_actualizacion:<label className="letra-pequeña1">{value.fecha_actualizacion? new Date(value.fecha_actualizacion).toLocaleDateString('es-ES'): 'Este registro no tiene fecha de actualizacion'}</label>,
                hora_actualizacion:
                <span className="letra-pequeña1">
                  {value.hora_actualizacion ?? "Este registro no tiene hora de actualizacion"}
                </span>,
                estado_registro: value.estado === 'A' ? 'Activo' : (value.estado === 'I' ? 'Inactivo' : (value.estado === 'E' ? 'Eliminado' : 'Otra condición')),

            }
          })
          setDataAsignatura(data)
        }else{
          setDataAsignatura([]);
        }
      }else if(data_request.ok == false){
        mostrarNotificacion('error','A ocurrido un error','A ocurrido un error al obtener la informacion');
      }
    }).finally(()=>{
      setLoading(false);
    }).catch(()=>{
      mostrarNotificacion('error','A ocurrido un error','Error interno en el servidor');
    })
  }
  
  const createAsignatura = (value) => {
    setLoadingButton(true);

    let request_op = {
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(value),
      method:"POST",
    }
    fetch(`${url}create_asignatura/`,request_op).then((json_data)=>{return json_data.json()})
    .then((info_request)=>{
      if(info_request.ok){
        mostrarNotificacion("success","Operacion realizada con exito",info_request.msg);
      }else if(info_request.ok == false){
        mostrarNotificacion("error","A ocurrido un error",info_request.msg_error);
      }else{
        throw new Error("El error es interno en el servidor , porfavor contactese con el administrador.");
      } 
    }).catch((error)=>{
        mostrarNotificacion("error","A ocurrido un error",error.message);      
    }).finally(()=>{
      getAsignatura();
      form.resetFields();
      setModalOpen(false);
      setLoadingButton(false);
    })
    
  }


  const actualizarAsignatura = (value) => {
    setLoadingButton(true)
    let data_request = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id_asignatura:dataMateriaEdit.id_asignatura,...value}),
    }

    fetch(`${url}update_asignatura/`,data_request).then((data_json)=>{return data_json.json()})
    .then((data)=>{
      if(data.ok){
        mostrarNotificacion('success','Operacion realizada con exito',data.msg)
      }else if(data.ok == false){
        mostrarNotificacion('success','A ocurrido un error',data.msg_error)
      }else{
        throw new Error("El error es interno del servidor contactese con el administrador");
      }
    }).catch((error)=>{
      mostrarNotificacion('error','A ocurrido un error',error.message)
    }).finally(()=>{
      setModalOpenEdit(false);
      setLoadingButton(false);
      getAsignatura();
    })
    
  }

  const handleEditarClick = (childrens) => {
    
    setDataMateriaEdit({
      key:childrens.key,
      id_asignatura:childrens.id,
      codigo:childrens.codigo.props.children,
      descripcion:childrens.descripcion.props.children
    })
    setIdMateria(childrens.id);
    setModalOpenEdit(true);
    formKeyRef.current += 1;
  };


  const deleteTitulo = (values)=>{
    console.log("Estoy entrando en la funcion de value")
    console.log(values);
    let request_backend = {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
              id_asignatura:values.id
            })
    }
    fetch(`${url}delete_asignatura/`,request_backend).then((data_request)=>{return data_request.json()})
    .then((data)=>{
      if(data.ok){
        mostrarNotificacion("success","Operacion Realizada con exito","La materia " +values.descripcion.props.children +" se elimino con exito");
      }else if(data.ok == false){
        mostrarNotificacion("error","A ocurrido un error interno",data.msg);
      }
    }).finally(()=>{
      getAsignatura()
    })

  }

  useEffect(()=>{
    getAsignatura();
  },[])
  return (
    <Spin spinning={loading} tip="Cargando...">
      <>
        <Modal title="Crear Materia" footer={null} open={modalOpen} onCancel={()=>{setModalOpen(false)}} onclose={()=>{setModalOpen(false)}}>
          <Row align="left" style={{marginLeft:"10px"}}>
            <h2><FileAddOutlined />Crear Materia</h2>
          </Row>
          <Row>
            <Form form={form} onFinish={createAsignatura} layout="vertical" autoComplete="on" align="left">
              <Row>
                <Form.Item name="codigo" rules={[{required:true,message:"El codigo es requerido"}]} label="Ingrese el codigo de la materia" >
                  <Input style={{ width: 450 }}/>
                </Form.Item>
              </Row>
              
              <Row>
                <Form.Item name="descripcion" rules={[{required:true,message:"La descripcion es requerido"}]} label="Ingrese la descripcion" >
                  <Input style={{ width: 450 }}/>
                </Form.Item>
              </Row>

              <Row>
                <Button htmlType="submit" style={{width:"100%"}} type="primary" icon={<SaveOutlined />} loading={loadingButton}>Crear Materia</Button>
              </Row>
            </Form>
          </Row>
        </Modal>



        <Modal key={formKeyRef.current} title="Editar Materia" footer={null} open={modalOpenEdit} onCancel={()=>{setModalOpenEdit(false)}} onclose={()=>{setModalOpenEdit(false)}} >
          <Row align="left" style={{marginLeft:"10px"}}>
            <h2><FileAddOutlined />Editar Materia</h2>
          </Row>
          <Row>
            <Form initialValues={dataMateriaEdit} onFinish={actualizarAsignatura} layout="vertical" autoComplete="on" align="left">
              <Row>
                <Form.Item name="codigo" rules={[{required:true,message:"El codigo es requerido"}]} label="Ingrese el codigo de la materia" >
                  <Input style={{ width: 450 }}/>
                </Form.Item>
              </Row>
              
              <Row>
                <Form.Item name="descripcion" rules={[{required:true,message:"La descripcion es requerido"}]} label="Ingrese la descripcion" >
                  <Input style={{ width: 450 }}/>
                </Form.Item>
              </Row>

              <Row>
                <Button htmlType="submit" style={{width:"100%"}} type="primary" icon={<SaveOutlined />} loading={loadingButton}>Editar Materia</Button>
              </Row>
            </Form>
          </Row>
      </Modal>



        <Row align="left">
          <Flex wrap="wrap" grap="small">
            <ToolOutlined style={{ fontSize: "25px" }} /><h1>Mantenimiento de Materias</h1>
          </Flex>
        </Row>

        <Row style={{ margin: "2px" }}>
          <Breadcrumb
            separator=">"
            items={[{ title: "Dashboard" }, { title: "Mantenimientos" }, { title: "Materias " }]}
          />
        </Row>
        
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          <Row align="left" layout>
            <Space size="small">
              <Col>
                <Button style={{ color: "green", border: "1px solid green" }} icon={<EditOutlined />} onClick={()=>{setModalOpen(true)}}>Crear una nueva materia</Button>
              </Col>
              <Col>
                <Button style={{ color: "green", border: "1px solid green" }} icon={<SyncOutlined />} onClick={()=>{getAsignatura()}}>Sincronizar datos</Button>
              </Col>
            </Space>

          </Row>

          <Row style={{ width: '100%' }}>
            <Table scroll={{ x: 1745 }}
               dataSource={dataAsignatura}
              >
              <ColumnGroup title="Registro" align="center">
                <Column title="Código" dataIndex="codigo" width={50} align="center" />
                <Column title="Descripción" dataIndex="descripcion" width={80} align="center" />
              </ColumnGroup>
              <ColumnGroup title="Campos de auditoria" bordered={true} align="center">
                <Column title="Fecha de creacion" dataIndex="fecha_creacion" width={90} align="center" />
                <Column title="Hora de creacion" dataIndex="hora_creacion" width={75} align="center" />
                <Column title="Fecha de actualizacion" dataIndex="fecha_actualizacion" width={90} align="center" />
                <Column title="Hora de actualizacion" dataIndex="hora_actualizacion" width={75} align="center" />
                <Column title="Estado registro" dataIndex="estado_registro" width={100} align="center" />
              </ColumnGroup>
            <Column
            title="Acciones"
            fixed="right"
            width={75}
            dataIndex="acciones"
            align="center"
            render={(childrens, record) => (
              <Space size="small">
                <Col>
                  <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditarClick(record)}/>
                </Col>
                <Col>
                  <Popconfirm
                    okText="Si, realizar"
                    title="Confirmar accion"
                    description="¿Deseas realizar la eliminacion de este registro? Al borrar este registro, todos los usuarios que tengan el título académico de este registro quedarán afectados."
                    onConfirm={() => { deleteTitulo(record) }}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                    <Button type="primary" danger icon={<DeleteOutlined />}/>
                  </Popconfirm>
                </Col>
              </Space>
            )}
          />
            </Table>
          </Row>
        </Space>


      </>
    </Spin>
    );
}
export default Materias;

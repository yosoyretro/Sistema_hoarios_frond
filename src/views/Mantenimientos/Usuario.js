import React, { useState, useEffect, useRef } from "react";
import { Button, notification,Checkbox, Popconfirm, Col, Row, Modal, Form, Input, Space, Select, Table, Spin, Tag, Flex, Breadcrumb, Card } from "antd";
import FormItem from "antd/es/form/FormItem";
import { ClearOutlined, FilterOutlined, SearchOutlined, FrownOutlined, MehOutlined, FrownFilled, UserOutlined, UserAddOutlined, EditOutlined, ToolOutlined, DeleteOutlined, SyncOutlined, DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { render } from "@testing-library/react";
import "../../public/css/letras.css";


const Usuario = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [rol, setRol] = useState([]);
  const [tituloAcademico, setTituloAcademico] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userDataRespaldo, setUserDataRespaldo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const formKeyRef = useRef(0);
  const [idUser, setIdUser] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);
  const [filtroRol, setFiltroRol] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const url = process.env.REACT_APP_BACKEND_HORARIOS;
  //const url = "http://127.0.0.1:8000/api/v1/horario/";
  const openNotificationWithIcon = (type,mensaje,descripcion) => {
    api[type]({
      message: mensaje,
      description:descripcion,
    });
  };
  


  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };



  function ModalEditClose() {
    setDataUserEdit({});
    setModalOpenEdit(false);
    resetearData();
  }

  function ModalEditOpen() {
    setModalOpenEdit(true);
  }

  function resetearData() {
    form.resetFields();
    formEdit.resetFields();
  }

  function abrirModal() {
    setModalOpen(true);
  }

  function cerrarModal() {
    setModalOpen(false);
  }
  function filtrarData(values) {
    console.log("SOy el values")
    console.log(values)
    let filter;

    if (values.rol != undefined && values.usuario != undefined) {
      console.log("Estoy entrando en el primer if ")
      filter = userDataRespaldo.filter((data) => (data.rol.props.children === values.rol && data.usuario.props.children === values.usuario))
      setUserData(filter)
    } else if (values.rol != undefined) {
      console.log("ENTRO EN EL SEGUNDO IF")
      filter = userDataRespaldo.filter((data) => (data.rol.props.children === values.rol))
      setUserData(filter)
    } else if (values.usuario != undefined) {
      console.log("ENTRO EN EL TERCER IF")
      filter = userDataRespaldo.filter((data) => (data.usuario.props.children === values.usuario))
      setUserData(filter)
    } else {
      setUserData([])
      console.log("NO ENTRO EN NINGUN MIERDA")
    }


  }
  function resetFilterForm() {
    formFilter.resetFields();
  }
  function resetFilter() {
    formFilter.resetFields();
    resetFilterForm();
    setLoading(true);
    setUserData(userDataRespaldo);
    setLoading(false);
  }

  const handleEditarClick = (childrens) => {
    setIdUser(childrens.id);
    ModalEditOpen();
    let nombres_apellidos = childrens.nombres_apellidos.props.children.split(" ");
    let rol_moment = rol.filter(objecto => objecto.label === childrens.rol.props.children);
    setDataUserEdit({ id_usuario: childrens.id, cedula: childrens.cedula.props.children, nombres: nombres_apellidos[0] + " " + nombres_apellidos[1], apellidos: nombres_apellidos[2] + " " + nombres_apellidos[3], usuario: childrens.usuario.props.children, rol: rol_moment, titulo_academicos: childrens.titulo_academicos })
    formKeyRef.current += 1;

  };


  const editUser = (values) => {

    const lista_titulos = [];
    let id_rol;
    if (typeof values.rol === "number") {
      id_rol = values.rol;
    } else {
      id_rol = values.rol[0].value;
    }
    if (values.titulo_academicos.every(el => typeof el === 'number')) {
      values.titulo_academicos.forEach((numero) => {
        lista_titulos.push(numero)
      });
    } else if (values.titulo_academicos.every(el => typeof el === 'object' && el !== null)) {
      values.titulo_academicos.map((titutlo) => {
        lista_titulos.push(titutlo.value)
      })
    }

    let opcion = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',  // Especifica el tipo de contenido como JSON
      },
      body: JSON.stringify({ id_usuario: idUser, cedula: values.cedula, nombres: values.nombres + " " + values.apellidos, usuario: values.usuario, id_rol: id_rol, id_titulo_academico: lista_titulos }),

    }

    fetch(`${url}edit_usuario/`, opcion).then((response) => { return response.json() })
      .then((data) => {
        if (data.ok) {
          openNotificationWithIcon("success","Operacion realizada con exito","Usuario editado con exito")
        } else if(data.ok == false) {
          openNotificationWithIcon("danger","A ocurrido un error","Hubo un problema al editar el usuario")
        }else{
          throw new Error("A ocurrido un error interno , contactese con el administrador");
        }

      }).finally(() => {
        form.resetFields();
        cerrarModal();
        formFilter.resetFields();
        ModalEditClose()
        setLoadingButton(false);
        setLoading(false);
        getUser();
      }).catch((error)=>{
        openNotificationWithIcon("danger","A ocurrido un error",error)
      })

  }

  const getUser = () => {
    try {
      setLoading(true)
      fetch(`${url}show_usuario`).then((response) => { return response.json() })
        .then((data) => {
          setLoading(true)
          if (data.ok) {
            if (data.data) {
              let obj = data.data.map((value, index) => {
                let titulos = value.id_titulo_academico.map((valor) => {
                  return {
                    label: valor.descripcion,
                    value: valor.id_titulo_academico
                  }
                })
                return {
                  key: index,
                  id: value.id_usuario,
                  numero: <label className="letra-pequeña1">{index + 1}</label>,
                  cedula: <label className="letra-pequeña1">{value.cedula}</label>,
                  nombres_apellidos: <label className="letra-pequeña1">{value.nombres}</label>,
                  usuario: <label className="letra-pequeña1">{value.usuario}</label>,
                  rol: <label className="letra-pequeña1">{value.id_rol.descripcion}</label>,
                  fecha_creacion: <label className="letra-pequeña1">{new Date(value.created_at).toLocaleDateString('es-ES')}</label>,
                  fecha_actualizacion: <label className="letra-pequeña1">{new Date(value.updated_at).toLocaleDateString('es-ES')}</label>,
                  titulo_academicos: titulos

                }
              });
              setUserData(obj)
              setUserDataRespaldo(obj)
            }
          }
        }).finally(() => {
          setLoading(false);
        }).catch((error) => {
          console.log("A ocurrido un error al obtener la informacion del usuario")
        })
    } catch (Error) {
      window.alert("A ocurrido un errro en la parte del backend para obtener los usuarios")
    }

  }

  const getRoles = () => {
    try {
      fetch(`${url}show_roles`).then((response) => { return response.json() })
        .then((data) => {
          if (data.ok) {
            console.log("ESTO LLENGANDO AQUI ");
            console.log(data);
            if (data.data) {
              let obj_arreglo_rol = [];
              let roles = data.data.map((value, index) => {
                obj_arreglo_rol.push({ value: value.descripcion });
                return {
                  label: value.descripcion,
                  value: value.id_rol
                }
              })
              setFiltroRol(obj_arreglo_rol);
              setRol(roles);
            }
          }
        }).catch((error)=>{window.alert("A ocurrido un error en la comunicacion del backend para obtener los roles");});
    } catch (error) {
      //window.alert("A ocurrido un error en la comunicacion para obtener los roles")
    }
  }

  const getTitutloAcademico = () => {
    try {
      fetch(`${url}show_data_titulo_academico/`).then((response) => {
        return response.json()
      }).then((data_titutlo) => {
        if (data_titutlo.ok) {
          if (data_titutlo.data) {
            let titutlo = data_titutlo.data.map((value, index) => {
              return {
                label: value.descripcion,
                value: value.id_titulo_academico
              }
            })
            setTituloAcademico(titutlo);
          }
        }

      }).finally(() => {

      }).catch((error)=>{window.alert("A ocurrido un error en la comunicacion del backend para obtener los titulos academicos");});
    } catch (Error) {
      //window.alert("Error en la comunicacion del backend para obtener los titulos academicos");
    }

  }

  const createUser = (values) => {
    try {
      setLoading(true);
      setLoadingButton(true);
      let opcion = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',  // Especifica el tipo de contenido como JSON
        },
        body: JSON.stringify({
          cedula: values.cedula,
          nombres: values.nombres + " " + values.apellidos,
          usuario: values.usuario,
          id_rol: values.rol,
          id_titulo_academico: values.titulo_academico??[]
        }),

      }
      fetch(`${url}create_usuario/`, opcion).then((response) => { return response.json() })
        .then((data) => {
          setLoading(true);
          if (data.ok) {
            openNotificationWithIcon("success","Operacion realizada con exito","El usuario " + (values.nombres +" "+values.apellidos).toUpperCase()+" se creo con exito")
          }else if(data.ok == false){
            openNotificationWithIcon("error","A ocurrido un error",data.msg_error)
          }
        }).finally(() => {
          getUser()
          form.resetFields()
          cerrarModal();
          setLoadingButton(false);
          setLoading(false);
        })
    } catch (error) {
      window.alert("Error en la comuniaccion del backend");
    }


  }


  const deleteUser = (record) => {
    setLoading(true)
    let opcion = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',  // Especifica el tipo de contenido como JSON
      },
      body: JSON.stringify({
        id_usuario: record.id
      }),

    }
    fetch(`${url}delete_usuario/`, opcion).then((response) => { return response.json() })
      .then((data) => {
        setLoading(true);
        if (data.ok) {
          openNotificationWithIcon("success","Operacion realizada con exito","usuario eliminado con exito")
        }else{
          openNotificationWithIcon("danger","Ocurrio un error","El Usuario no se logro borro contactese con el administrador, Intelo mas luego")
        }
        
      }).finally(()=>{
        getUser()
        form.resetFields();
        cerrarModal();
        setLoadingButton(false);
        setLoading(false);
      })
  }

  useEffect(() => {
    getTitutloAcademico();
    getRoles();
    getUser();
  }, [])

  return (
    <div>
      {contextHolder}
      {/*<ModalConfirmacion/>*/}
      <Spin spinning={loading} tip="Cargando...">
        {/*MODAL DE EDITAR USUARIO*/}
        <Modal key={formKeyRef.current} align="center" okButtonProps={{ disabled: true, style: { display: 'none' } }} footer={null} CancelProps={{ disabled: true, style: { display: 'none' } }} onCancel={() => { ModalEditClose() }} onclose={() => { ModalEditClose() }} open={modalOpenEdit} okText="Editar Registro" >
          <Row>
            <h2><EditOutlined />Editar Usuario</h2>
          </Row>
          <Row>
            <Form onFinish={editUser} layout="vertical" initialValues={dataUserEdit}>
              <Row>
                <Col span={24}>
                  <FormItem name="cedula" label="Modificar su cedula"
                    rules={
                      [
                        {
                          required: true,
                          message: 'La cedula es requerida'
                        },
                        {
                          type: Text,
                          message: "La cedula  Debe de numero"
                        },
                        {
                          max: 15,
                          message: "La cedula  no debe de pasar de 15 numeros"
                        }
                      ]
                    }
                  >
                    <Input style={{ width: "100%" }} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Space>
                  <Col>
                    <FormItem name="nombres" label="Modificar los nombres completos"
                      rules={[{
                        type: Text,
                        message: 'El Input debe de ser texto'
                      },
                      {
                        required: true,
                        message: 'El campo es requerido'
                      }
                      ]}
                      labelAlign="center"
                      // labelCol={{ span: 10 }}  // Ajusta la anchura de la columna del label según tus necesidades
                      wrapperCol={{ span: 50 }}
                    >
                      <Input style={{ width: '100%' }} />
                    </FormItem>
                  </Col>
                  <Col>
                    <FormItem name="apellidos" label="Modificar los apellidos completos"
                      rules={[{
                        type: Text,
                        message: 'los Apellidos debe de ser texto'
                      },
                      {
                        required: true,
                        message: 'El campo es requerido'
                      }
                      ]}
                      labelAlign="center"
                      // labelCol={{ span: 10 }}  // Ajusta la anchura de la columna del label según tus necesidades
                      wrapperCol={{ span: 50 }}
                    >
                      <Input style={{ width: '100%' }} />
                    </FormItem>
                  </Col>
                </Space>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem name="usuario" label="Modificar usuario"
                    rules={
                      [
                        {
                          type: Text,
                          message: "El Usuario Debe de texto"
                        }
                      ]
                    }
                  >
                    <Input style={{ width: "100%" }} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem
                    name="titulo_academicos"
                    label="Escoja su titulo academico"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select mode="multiple" style={{ width: "100%" }} options={tituloAcademico}></Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem
                    name="rol"
                    label="Seleccione el rol"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, seleccione el rol',
                      },
                    ]}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select defaultValue="Selecione el rol" style={{ width: "100%" }} options={rol}></Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Button htmlType="submit" type="primary" primary style={{ width: "100%" }}>Editar registro</Button>
              </Row>
            </Form>
          </Row>
        </Modal>
        {/*MODAL DE CREAR USUARIO*/}
        <Modal onOk={() => form.submit()} align="center" onCancel={() => { cerrarModal() }} onclose={() => { cerrarModal() }} open={modalOpen} okText="Crear Registro" >
          <Row>
            <h2><UserAddOutlined />Crear Usuario</h2>
          </Row>
          <Row>
            <Form form={form} onFinish={createUser} layout="vertical" >
              <Row>
                <Col span={24}>
                  <FormItem name="cedula" label="Ingrese su cedula"
                    rules={
                      [
                        {
                          required: true,
                          message: 'La cedula es requerida'
                        },
                        {
                          type: Text,
                          message: "La cedula  Debe de numero"
                        },
                        {
                          max: 15,
                          message: "La cedula  no debe de pasar de 15 numeros"
                        }
                      ]
                    }
                  >
                    <Input style={{ width: "100%" }} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Space>
                  <Col>
                    <FormItem name="nombres" label="Ingrese los nombres completos"
                      rules={[{
                        type: Text,
                        message: 'El Input debe de ser texto'
                      },
                      {
                        required: true,
                        message: 'El campo es requerido'
                      }
                      ]}
                      labelAlign="center"
                      // labelCol={{ span: 10 }}  // Ajusta la anchura de la columna del label según tus necesidades
                      wrapperCol={{ span: 50 }}
                    >
                      <Input style={{ width: '100%' }} />
                    </FormItem>
                  </Col>
                  <Col>
                    <FormItem name="apellidos" label="Ingrese los apellidos completos"
                      rules={[{
                        type: Text,
                        message: 'los Apellidos debe de ser texto'
                      },
                      {
                        required: true,
                        message: 'El campo es requerido'
                      }
                      ]}
                      labelAlign="center"
                      // labelCol={{ span: 10 }}  // Ajusta la anchura de la columna del label según tus necesidades
                      wrapperCol={{ span: 50 }}
                    >
                      <Input style={{ width: '100%' }} />
                    </FormItem>
                  </Col>
                </Space>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem name="usuario" label="Ingrese su usuario"
                    rules={
                      [
                        {
                          type: Text,
                          message: "El Usuario Debe de texto"
                        }
                      ]
                    }
                  >
                    <Input style={{ width: "100%" }} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
               <Col span={24}>
                  <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
                    <span style={{ marginLeft: '8px' }}>No tiene titulo Academico</span>
                  </Checkbox>
                </Col>  
                <Col span={24}>
                  <FormItem
                    name="titulo_academico"
                    label="Escoja su titulo academico"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select mode="multiple" style={{ width: "100%" }} options={tituloAcademico} disabled={isChecked}></Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem
                    name="rol"
                    label="Seleccione el rol"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, seleccione el rol',
                      },
                    ]}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select defaultValue="Selecione el rol" style={{ width: "100%" }} options={rol}></Select>
                  </FormItem>
                </Col>
              </Row>

            </Form>
          </Row>
        </Modal>

        <Row align="left">
          <Flex wrap="wrap" grap="small">
            <ToolOutlined style={{ fontSize: "25px" }} /><h1>Mantenimiento de Usuarios</h1>
          </Flex>
        </Row>
        <Row style={{ margin: "2px" }}>
          <Breadcrumb
            separator=">"
            items={[{ title: "Dashboard" }, { title: "Mantenimientos" }, { title: "Usuarios" }]}
          />
        </Row>

        <Space direction="vertical" style={{ margin: "2px", width: "100%" }}>
          <Col>
            <p><bold>{<FilterOutlined />}</bold>Filtro de busqueda</p>
          </Col>
          <Col>
            <Card style={{ width: "100%", marginBottom: "15px" }} bordered={true}>
              <Form form={formFilter} onFinish={filtrarData}>
                <FormItem name="rol" label="Seleccione el rol">
                  <Select defaultValue="Selecione el rol" style={{ width: "100%" }} options={filtroRol} ></Select>
                </FormItem>

                <FormItem name="usuario" label="Busca el usuario">
                  <Input style={{ marginBottom: 8, }} placeholder="Ingrese el usuario" />
                </FormItem>
                <Row align="rigth">
                  <Space>
                    <Button type="primary" icon={<SearchOutlined />} htmlType="submit">Buscar</Button>
                    <Button onClick={resetFilter} style={{ background: "green", color: "white", border: "1px solid green" }} icon={<ClearOutlined />}>Limpiar Filtro</Button>
                  </Space>
                </Row>
              </Form>
            </Card>
          </Col>
        </Space>
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          <Row align="left" layout>
            <Space size="small">
              <Col>
                <Button style={{ color: "green", border: "1px solid green" }} onClick={() => {
                  abrirModal()
                }} icon={<EditOutlined />}>Crear un nuevo usuario</Button>
              </Col>
              <Col>
                <Button style={{ color: "green", border: "1px solid green" }} onClick={() => {

                  resetearData()
                  getUser()
                  getRoles()
                  getTitutloAcademico()
                }} icon={<SyncOutlined />}>Sincronizar datos</Button>
              </Col>
            </Space>

          </Row>

          <Row style={{ width: '100%' }}>
            <Table dataSource={userData} scroll={{ x: 1500 }} style={{ fontSize: '5px' }}
              columns={[
                { title: 'Nº', width: 50, dataIndex: 'numero', align: "center" },
                { title: "Cedula", dataIndex: 'cedula', width: 100, align: "center" },
                { title: "Nombres y Apellidos", align: "left", width: 200, dataIndex: 'nombres_apellidos' },
                {
                  title: "Titulos Academicos", align: "center", width: 200, dataIndex: "titulo_academicos", render: (childrens) => {
                    if (childrens && childrens.length > 0) {
                      return (
                        <Space direction="vertical" size="small">
                          {childrens.map((titulo, index) => (
                            <Tag color="success" style={{ fontSize: "9px" }}>{titulo.label}</Tag>
                          ))}
                        </Space>
                      );
                    } else {
                      return <Tag color="red" style={{ fontSize: "9px" }}>No tiene titulo Academico</Tag>;
                    }
                  },
                },
                { title: "Usuario", dataIndex: 'usuario', align: 'center', width: 150 },
                { title: "Rol", dataIndex: 'rol', align: 'center', width: 150 },
                { title: "fecha creacion", dataIndex: 'fecha_creacion', align: "center", width: 75 },
                { title: "fecha de actualizacion", dataIndex: 'fecha_actualizacion', align: "center", width: 75 },
                {
                  title: "Aciones", fixed: 'right', width: 100, dataIndex: 'aciones', align: "center", render: (childrens, record) => {
                    return (
                      <Space size="small">
                        <Col>
                          <Button typeof="primary" primary onClick={() => handleEditarClick(record)} primary icon={<EditOutlined />} />
                        </Col>
                        <Col>
                          <Popconfirm
                            onConfirm={() => { deleteUser(record) }}
                            okText="Si , realizar"
                            title="Confirmar accion"
                            description="¿Deseas realizar la eliminacion de este registro?"
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
                }]} />
          </Row>
        </Space>
      </Spin>
    </div>
  );
}

export default Usuario;

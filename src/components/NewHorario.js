
import React, { useState, useEffect,useRef,TimePicker,DatePicker } from "react";
import { Col, Form, Select, Space, Row,Breadcrumb,Card,Button,Input } from "antd";
import { FormOutlined,PlusOutlined } from '@ant-design/icons';
//import "../../public/css/letras.css";
import "../public/css/letras.css";
import DiasMaterias from "./DiasMaterias.js";
const NewHorario = () => {
    const [usuario, setUsuario] = useState("");
    const [semestre, setSemestre] = useState("");
    const [paralelo, setParalelo] = useState("");
    const inputRef = useRef(null);
    const [inputs, setInputs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const { Item } = Form;
    const [horarioData, setHorarioData] = useState([]);
    const [userData,setUserData] = useState([]);
    const [instituto,setInstituto] = useState([]);
    const [asignaturaData,setAsignaturaData] = useState([]);
    const [loading,setLoading]= useState(true);
    const url = "http://127.0.0.1:8000/api/v1/horario/";

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
                  description: value.nombres,
                  value: value.nombres,
                  
                }
              });
              console.log("SOy el usuario")
              console.log(obj)
              setUserData(obj)
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

  const getEducacionGloba = () => {
    fetch(`${url}show_data_instituto/`).then((response) => { return response.json() })
        .then((data) => {
            setLoading(true)
                
                    let varia = data.data.map((value,index)=>{
                        console.log(value)
                        return {
                            key:index,
                            label:value.nombre,
                            value:value.nombre
                        }
                    });
                    setInputs(varia)
                
            
        })

  }

  useEffect(()=>{
    getUser()
    getEducacionGloba()
  },[])
    const handleSave = (data) => {
        console.log("Datos guardados:", data);
        setHorarioData(data);
    };

    const addInput = () => {
        form.validateFields().then((values) => {
        setInputs([...inputs, values]);
        form.resetFields(); // Para limpiar el formulario después de agregar
        });
    };

    const handleGuardarTodo = () => {
    console.log("Guardando todo el horario:", horarioData);
    };


    
    const handleAdd = () => {
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const handleFinish = (values) => {
        setData([...data, values]);
        form.resetFields();
        setShowForm(false);
    };


    return (
        <div style={{ fontSize: "12px" }}>
            <Space style={{ margin: "5px" }}>
                <h1 style={{ color: "black", font: "bold" }}><FormOutlined />Crear un nuevo horario</h1>
            </Space>
            <Breadcrumb
                separator=">"
                items={[{ title: "Dashboard" }, { title: "Mantenimientos" }, { title: "Horarios" },{ title:"formulario" } ]}
            />
            <Card style={{margin:"10px" , padding:"0px"}}>
                    <Row gutter={100}>
                        <Col>
                            <p className="letras-form">Usuario : {usuario}</p>
                            <p className="letras-form">instituto : {instituto}</p>
                        </Col>
                    </Row>
            </Card>
            <Row style={{ padding: "10px 25px" }}>
                
                <Form
                    labelCol={{
                        span: 500
                    }}
                    wrapperCol={{
                        span: 1000
                    }}
                    style={{
                        maxWidth: 1000
                    }}
                >
                    <Row gutter={100}>
                        <Space direction="horizontal" >
                            <Col span={150}>
                                <Form.Item labelAlign="center"
                                    name="usuario"
                                    label="seleciona el usuario"
                                    rules={
                                        [
                                            {
                                                required: true,
                                                message: "Este campo es obligatorio"
                                            }
                                        ]
                                    }
                                >
                                    <Select
                                        options={userData}
                                        style={{ width: "400px" }}
                                        onChange={(value) => {
                                            setUsuario(value)
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={50}>
                                <Form.Item
                                    labelAlign="center"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Este campo es obligatorio"
                                        }
                                    ]}
                                    name="instituto"
                                    label="Seleciona el instituto">
                                    <Select
                                        options={instituto}
                                        style={{ width: "250px" }}
                                    />
                                </Form.Item>
                            </Col>
                        </Space>
                    </Row>
                </Form>
            </Row>

            <Card title="Gestiona tu horario" >
                <Space>
                    <DiasMaterias onSave={handleSave} dia="Lunes"/>
                    <DiasMaterias onSave={handleSave} dia="Martes"/>
                    <DiasMaterias onSave={handleSave} dia="Miercoles"/>
                    <DiasMaterias onSave={handleSave} dia="Jueves"/>
                    <DiasMaterias onSave={handleSave} dia="Viernes"/>
                </Space>
            </Card>
        </div>

    )
}
export default NewHorario;

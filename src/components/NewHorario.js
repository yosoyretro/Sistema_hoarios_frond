
import React, { useState, useEffect, useRef, TimePicker, DatePicker } from "react";
import { Col, Form, Select, Space, Row, Breadcrumb, Card, Button, Input, Modal } from "antd";
import { FormOutlined, PlusOutlined } from '@ant-design/icons';
//import "../../public/css/letras.css";
import "../public/css/letras.css";
import DiasMaterias from "./DiasMaterias.js";
const NewHorario = () => {
    const [usuario, setUsuario] = useState("");
    const [semestre, setSemestre] = useState("");
    const [paralelo, setParalelo] = useState("");
    
    const [inputs, setInputs] = useState([]);
    
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [horarioData, setHorarioData] = useState([]);
    const url = "http://127.0.0.1:8000/api/v1/horario/";

    
    useEffect(() => {
    }, [])
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



    /*const handleAdd = () => {
        
    };

    const handleCancel = () => {
        
    };

    const handleFinish = (values) => {
        setData([...data, values]);
        form.resetFields();
        
    };*/


    return (
        <div style={{ fontSize: "12px" }}>
            <Space>
                <DiasMaterias onSave={handleSave} dia="Lunes" />
                <DiasMaterias onSave={handleSave} dia="Martes" />
                <DiasMaterias onSave={handleSave} dia="Miercoles" />
                <DiasMaterias onSave={handleSave} dia="Jueves" />
                <DiasMaterias onSave={handleSave} dia="Viernes" />
            </Space>
        </div>

    )
}
export default NewHorario;

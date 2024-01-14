import React,{useState, useEffect, useRef, Children} from "react";
import { Button, Col, Row,Form, Flex, Breadcrumb, Table, Popconfirm,Spin,Space,Modal,Input,notification } from "antd";

import { ToolOutlined, QuestionCircleOutlined, DeleteOutlined, EditOutlined, SyncOutlined,SaveOutlined,FileAddOutlined } from '@ant-design/icons';

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
        notificacion[tipo]({
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
                }
            })
    }

}
export default Nivel;
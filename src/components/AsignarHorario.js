import { Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
const AsignarHorario = (props) => {
    const [isOpen,setIsOpen] = useState(props.isOpen);
    useEffect(() => {
        setIsOpen(props.isOpen);
      }, [props.isOpen]);

    const dias = [
        {
            value:"Lunes",
            label:"Lunes"
        },
        {
            value:"Martes",
            label:"Martes"
        },
        {
            value:"Miercoles",
            label:"Miercoles"
        },
        {
            value:"Jueves",
            label:"Jueves"
        },
        {
            value:"Viernes",
            label:"Viernes"
        }
    ]

    return (
        <Modal open={isOpen} title={"Asignacion de horario"} okText="Asignar" onCancel={()=>{
            props.closeHandleModal() 
        }}>
            <Form>
                <Form.Item label="Escoja el usuario">
                    <Select onSearch={true}/>
                </Form.Item>
                
                <Form.Item label="Escoja el dia">
                    <Select onSearch={true} options={dias}/>
                </Form.Item>

                <Form.Item label="Hora que inicia">
                    <Input type="time"></Input>
                </Form.Item>

                <Form.Item label="Hora que termina">
                    <Input type="time"></Input>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AsignarHorario;
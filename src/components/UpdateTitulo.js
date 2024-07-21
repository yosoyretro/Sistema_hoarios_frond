import React, { useEffect, useRef } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const UpdateTitulo = ({ open, handleCloseModal, getTitulos, formulario,loading,mensaje }) => {
  const [form] = Form.useForm();
  const form_ref = useRef(null)
  const url = "http://localhost:8000/api/istg/";

  const mostrarNotificacion = (tipo, titulo, mensaje) => {
    notification[tipo]({
      message: titulo,
      description: mensaje,
    });
  };

  const onFinish = (values) => {
    loading(true)
    mensaje("Actualizando....")
    handleCloseModal();
    const request_backend = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_titulo_academico: formulario.id,
        descripcion: values.descripcion
      })
    };
    fetch(`${url}update_titulo_academico/${formulario.id}`, request_backend)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          mostrarNotificacion("success", "Operación Realizada con éxito", data.mensaje);
        } else {
          mostrarNotificacion("error", "Error", data.mensaje);
        }
      })
      .finally(() => {
        getTitulos();
        mensaje("Cargando....")
      })
      .catch((error) => {
        mensaje("Cargando....") 
        loading(false)
        mostrarNotificacion("error", "Error", error.mensaje);
      });
  };

  
  return (
    <Modal title="Editar Título Académico" footer={null} open={open} onCancel={()=>{
      handleCloseModal();
      }}>
      <Form form={form} onFinish={onFinish} ref={form_ref} layout="vertical" initialValues={{ descripcion: formulario.descripcion }} autoComplete="off">
        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: 'La descripción es requerida' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Editar Título Académico
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTitulo;

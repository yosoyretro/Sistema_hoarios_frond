import React from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const NewTitulo = ({ open, handleCloseModal, getTitulos }) => {
  const [form] = Form.useForm();
  const url = "http://localhost:8000/api/istg/";

  const mostrarNotificacion = (tipo, titulo, mensaje) => {
    notification[tipo]({
      message: titulo,
      description: mensaje,
    });
  };

  const onFinish = (values) => {
    const data_request = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };
    fetch(`${url}create_titulo_academico`, data_request)
      .then((response) => response.json())
      .then((request_backend) => {
        if (request_backend.ok) {
          mostrarNotificacion("success", "Operación Realizada con éxito", request_backend.msg);
        } else {
          mostrarNotificacion("error", "Error", request_backend.msg);
        }
      })
      .finally(() => {
        handleCloseModal();
        form.resetFields();
        getTitulos();
      })
      .catch((error) => {
        mostrarNotificacion("error", "Error", error.message);
      });
  };

  return (
    <Modal title="Crear Título Académico" footer={null} open={open} onCancel={handleCloseModal}>
      <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off">
        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: 'La descripción es requerida' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Crear Título Académico
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewTitulo;

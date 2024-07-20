import React, { useRef } from "react";
import { Modal, Form, Input, Row, Col, Typography, notification } from "antd";

const NewTitulo = (props) => {
  const { Title } = Typography;
  const Formulario = useRef(null);
  const url = "http://localhost:8000/api/";

  const createTituloAcademico = (values) => {
    // Configurar los valores por defecto
    const dataToSend = {
      descripcion: values.descripcion,
      id_usuario_creador: 'Admin', // Valor por defecto para id_usuario_creador
    };

    fetch(`${url}create_titulo_academico`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        return response.json().then((data) => ({
          status: response.status,
          body: data
        }));
      })
      .then(({ status, body }) => {
        if (status === 200) {
          notification.success({
            message: 'Título académico creado con éxito',
          });
          props.getTitulo(); // Llama a la función para obtener la lista actualizada de títulos académicos
          Formulario.current.resetFields();
          props.handleCloseModal(); // Cierra el modal
        } else {
          notification.error({
            message: body.error || 'Error al crear el título académico',
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Ha ocurrido un error: ' + error.message,
        });
      });
  };

  return (
    <Modal
      onCancel={() => props.handleCloseModal()}
      onOk={() => {
        if (Formulario.current) {
          Formulario.current.submit();
        }
      }}
      open={props.open}
      size="large"
      okText="Guardar"
      cancelText="Cancelar"
      title="Nuevo Título Académico"
    >
      <Form
        onFinish={createTituloAcademico}
        ref={Formulario}
        layout="vertical"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Ingrese la descripción del título académico"
              name="descripcion"
              rules={[
                {
                  required: true,
                  message: "El campo de descripción es requerido",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewTitulo;

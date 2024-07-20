import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Row, Col } from "antd";

const NewTitulo = (props) => {
  const [isOpen, setIsOpen] = useState(props.open);
  const Formulario = useRef(null);
  const url = "http://localhost:8000/api/istg/";

  useEffect(() => {
    setIsOpen(props.open);
  }, [props.open]);

  const createTitulo = (value) => {
    fetch(`${url}create_titulo_academico`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: value.descripcion,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.getTitulos();
        Formulario.current.resetFields();
        props.handleCloseModal();
      })
      .catch((error) => {
        console.error('A ocurrido un error:', error);
      });
  };

  return (
    <Modal
      onCancel={() => {
        if (Formulario.current) {
          Formulario.current.resetFields();
        }
        props.handleCloseModal();
      }}
      onOk={() => {
        if (Formulario && Formulario.current) {
          Formulario.current.submit();
        }
      }}
      size="large"
      okText="Guardar"
      cancelText="Cancelar"
      title="Nuevo Título Académico"
      open={isOpen}
    >
      <Form onFinish={createTitulo} ref={Formulario} layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              label="Descripción"
              name="descripcion"
              rules={[
                { required: true, message: "El campo de descripción es requerido" },
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

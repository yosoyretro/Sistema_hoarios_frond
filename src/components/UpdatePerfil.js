import React, { useRef, useEffect,useState } from "react";
import { Modal, Form, Col, Row, Input } from "antd";

const UpdatePerfil = (props) => {
  const formRef = useRef(null);
  const url = "http://localhost:8000/api/istg/";
  const [id,setId] = useState(0)
  useEffect(() => {
    if (formRef.current) {
      setId(props.formulario.id)
      formRef.current.setFieldsValue({
        descripcion: props.formulario.descripcion
      });
    }
  }, [props.formulario.descripcion]);

  function update(value){
    fetch(`${url}update_rol/${id}`,{ method: 'PUT',headers: {'Content-Type': 'application/json'},body: JSON.stringify(value),})
    .then((response) => {
      return response.json();
    }).then((data)=>{
      if(data.ok){
        props.getRoles()
        props.handleCloseModal();
      }
    })

  }
  return (
    <>
      <Modal 
        onCancel={() => {
          props.handleCloseModal();
        }}

        onOk={()=>{
          if(formRef && formRef.current){
            formRef.current.submit();
          }
        }}

        open={props.open} 
        title="Actualizar el perfil" 
        okText="Actualizar" 
        cancelText="Cancelar"
      >
        <Form 
          onFinish={update} 
          initialValues={{ remember: true }} 
          ref={formRef} 
          layout="vertical"
        >
          <Row>
            <Col span={24}>
              <Form.Item 
                label="Edite el nombre del perfil" 
                rules={[{ required: true, message: "El campo del nombre del perfil es requerido" }]} 
                name="descripcion"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePerfil;

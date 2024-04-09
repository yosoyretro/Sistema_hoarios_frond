import React,{ useState,useEffect,useRef } from "react"
import { Modal,Form,Input,Row,Col } from "antd";

const NewCurso = (props) => {
  const Formulario = useRef(null);
  const url = "http://localhost:8000/api/istg/";
  function createCurso(value){
    fetch(`${url}create_nivel`, { method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(value),
        }).then((response) => {
            return response.json();
          }).then((data) => {
            window.alert(data.message)
            Formulario.current.resetFields();
            props.handleCloseModal();
            props.getCurso();
          }).catch((error) => {
            window.alert('A ocurrido un error:' + error);
          });

  }
  return (
    <Modal onCancel={() => {
          props.handleCloseModal();
          Formulario.current.resetFields();
        }}
        onOk={()=>{
          if(Formulario && Formulario.current){
            Formulario.current.submit();
          }
        }}
        open={props.open} size="large" okText="Guardar" cancelText="Cancelar" title="Nuevo Curso">
        <Form onFinish={createCurso} ref={Formulario} layout="vertical">
          <Row>
            <Col span={24}>
              <Form.Item label="Ingrese el paralelo" rules={
                [
                  {
                    required:true,
                    message:"El campo del numero es requerido"
                  }
                ]
              }
              name="numero">
                <Input/>
              </Form.Item>

              <Form.Item label="Ingrese el nemonico del curso" rules={
                [
                  {
                    required:true,
                    message:"El campo del nemonico es requerido"
                  }
                ]
              }
              name="nemonico">
                <Input/>
              </Form.Item>


              <Form.Item label="Ingrese la termino del curso" rules={
                [
                  {
                    required:true,
                    message:"El campo del termino es requerido"
                  }
                ]
              }
              name="termino">
                <Input/>
              </Form.Item>

            </Col>
          </Row>
        </Form>
      </Modal>

  );
}
export default NewCurso;

import React,{ useRef } from "react";
import { Modal,Form,Input,Row,Col } from "antd";

const NewParalelo = (props) => {
  const Formulario = useRef(null);
  const url = "http://localhost:8000/api/istg/";
  function createParalelo(value){
    let configuraciones = {
      method:"POST",
      headers:{  
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(value)
    }
    fetch(`${url}create_paralelo`,configuraciones).then((response)=>{
      return response.json();
    }).then((data)=>{
      if(data.ok){
        props.getParalelos()
      }
      window.alert(data.message)
      props.handleCloseModal()
    })
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
        open={props.open} size="large" okText="Guardar" cancelText="Cancelar" title="Nuevo Paralelo">
        <Form onFinish={createParalelo} ref={Formulario} layout="vertical">
          <Row>
            <Col span={24}>
              <Form.Item label="Ingrese el paralelo" rules={
                [
                  {
                    required:true,
                    message:"El campo de paralelo es requerido"
                  }
                ]
              }
              name="paralelo">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
  );
}
export default NewParalelo;

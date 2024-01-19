import { Card, Space } from "antd";
import React,{useEffect,useState} from "react";
import {  Navigate, useNavigate } from "react-router-dom";
import "../../public/css/login.css";
import { EditOutlined, EllipsisOutlined, SettingOutlined,UserOutlined,LockOutlined,LoginOutlined } from '@ant-design/icons';
import pre from "../../public/img/pre-lg-istg.png";
import Title from "antd/es/skeleton/Title";
import { Form, Input, Button,Row,Col,Avatar,Select } from 'antd';


const Login = (props) => {
  const { Meta } = Card;
  const navigate = useNavigate();
  const [rol,setRol] = useState([]);
  const autenticar = (values) => {
    localStorage.setItem("autenticacion", true)
    //Navigate("dashboard");
    window.location.reload("dashboard")
  }
  //const url = process.env.REACT_APP_BACKEND_HORARIOS;
  const url = "http://127.0.0.1:8000/api/v1/horario/";
  const getRoles = () => {
    try {
      fetch(`${url}show_roles`).then((response) => { return response.json() })
        .then((data) => {
          if (data.ok) {
            if (data.data) {
              let obj_arreglo_rol = [];
              let roles = data.data.map((value, index) => {
                obj_arreglo_rol.push({ value: value.descripcion });
                return {
                  label: value.descripcion,
                  value: value.id_rol
                }
              })
              setRol(roles);
            }
          }
        }).catch((error)=>{window.alert("A ocurrido un error en la comunicacion del backend para obtener los roles");});
    } catch (error) {
      //window.alert("A ocurrido un error en la comunicacion para obtener los roles")
    }
  }

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="body">
      <div className="container-login">
        <Card className="card" cover={<img alt="example" src={pre} style={{ width:"150px",height:"150px",padding:"10px",paddingLeft:"20px",paddingRight:"-150px",margin:"20px"}}/>}>
      <Meta
        title=<label><LoginOutlined style={{paddingRight:"10px",padding:"15px 0px"}}/>Iniciar Sesión</label>
        description={
          <Form onFinish={autenticar}
          layout="horizontal"
          labelCol={{
                        span: 100
                    }}
                    wrapperCol={{
                        span: 50
                    }}
                    style={{
                        maxWidth: 1000
                    }}
          >
            <Form.Item
              label=<label style={{fontSize:"12px"}}>Ingrese su usuario</label>
              name="usuario"
              rules={[{ required: true, message: 'Por favor, ingrese su usuario' }]}
            >
              <Input prefix={<UserOutlined style={{fontSize:"12px"}}/>}/>
            </Form.Item>
            <Form.Item
              label=<label style={{fontSize:"12px",marginLeft:"5px"}}>Ingrese su clave</label>
              name="clave"
              rules={[{ required: true, message: 'Por favor, ingrese su clave' }]}
            >
              <Input.Password prefix={<LockOutlined />} style={{fontSize:"12px"}}/>
            </Form.Item>
            <Form.Item
              label=<label style={{fontSize:"12px",marginLeft:"5px"}}>Seleccione el rol</label>
              name="rol"
              rules={[{ required: true, message: 'Por favor, seleccione el rol' }]}
            >
              <Select options={rol}/>
            </Form.Item>
            <Form.Item>
              <Button icon={<LoginOutlined/>} style={{width:"350px" , background:"#2432f0fa" , color:"white" , border:"#2432f0fa"}} htmlType="submit" >Ingresar</Button>
            </Form.Item>
          </Form>
        }
      />
    </Card>
      </div>
    </div>
  );
};

export default Login;

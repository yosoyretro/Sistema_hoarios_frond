import { Card, Space, Form, Input, Button,Row,Col,Avatar,Select } from "antd";
import React,{useEffect,useState} from "react";
import {  Navigate, useNavigate } from "react-router-dom";
import "../../public/css/login.css";
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import pre from "../../public/img/pre-lg-istg.png";
import Title from "antd/es/skeleton/Title";

const { Meta } = Card;
const { Option } = Select;

const Login = (props) => {
  const autenticar = (values) => {
    localStorage.setItem("autenticacion", true);
    //Navigate("dashboard");
    window.location.reload("dashboard");
  };
  
  const onFinish = (values) => {
    autenticar(values);
    console.log('Valores del formulario:', values);
  };  
  const navigate = useNavigate();
  const [rol,setRol] = useState([]);
  
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
        <Card className="card" cover={<img alt="Logo" src={pre} />}>
          <Meta
            title={<label><LoginOutlined style={{ marginRight: '10px' }} />Iniciar Sesión</label>}
            description={
              <Form
                onFinish={onFinish}
                layout="vertical"
                className="login-form"
              >
                <Form.Item
                  label="Usuario"
                  name="usuario"
                  rules={[{ required: true, message: 'Por favor, ingrese su usuario' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Usuario" />
                </Form.Item>
                <Form.Item
                  label="Contraseña"
                  name="clave"
                  rules={[{ required: true, message: 'Por favor, ingrese su contraseña' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                </Form.Item>
                <Form.Item
                  label="Rol"
                  name="rol"
                  rules={[{ required: true, message: 'Por favor, seleccione el rol' }]}
                >
                  <Select placeholder="Seleccione el rol">
                    <Option value="admin">Administrador</Option>
                    <Option value="user">Usuario</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<LoginOutlined />}
                    style={{ width: '100%' }}
                  >
                    Ingresar
                  </Button>
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

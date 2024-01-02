import React from "react";
import { Layout, Menu, theme,Avatar,Space } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import { UserOutlined, ToolOutlined, SettingOutlined,CalendarOutlined,FolderViewOutlined } from '@ant-design/icons';
import Usuario from './Mantenimientos/Usuario';
import TitulosAcademicos from './Mantenimientos/TitulosAcademicos';
import Materias from './Mantenimientos/Materias';
import VisualizarHorarios from './externos/VisualizarHorarios';
import PlanificacionHorario from './Configuraciones/PlanificacionHorario';

const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    label: 'Mantenimientos',
    icon: <ToolOutlined />,
    children: [
      {
        label: 'Usuarios',
        icon: <ToolOutlined />,
        destination: 'Mantenimientos/usuarios',
        element: <Usuario/>,
      },
      {
        label: 'Titulos Academicos',
        icon: <ToolOutlined />,
        destination: 'Mantenimientos/titulo_academico',
        element:<TitulosAcademicos/>,
      },
      {
        label: 'Roles',
        icon: <ToolOutlined />,
        destination: 'Mantenimientos/roles',
        
      },
      {
        label: 'Materias',
        icon: <ToolOutlined />,
        destination: 'Mantenimientos/materias',
        element:<Materias/>
      },
      {
        label: 'Cursos',
        icon: <ToolOutlined />,
        destination: '/cursos',
        
      }

    ],
  },
  {
    label: 'Configuraciones',
    icon: <SettingOutlined />,
    children: [
      {
        label: 'Perfil',
        icon: <SettingOutlined />,
      },
      {
        label: 'Planificacion de horarios',
        icon: <SettingOutlined />,
        destination: 'Configuraciones/Planificacion_horarios',
        element:<PlanificacionHorario/>
      },
    ],
  },
  {
    label:"Visualizar",
    icon: <FolderViewOutlined />,
    children:[
        {
        label: 'Horarios',
        icon: <CalendarOutlined />,
        destination: '/Visualizar/Horarios',
        element: <VisualizarHorarios/>,
      }, 
      ]
  }
];



const  Aside = () =>{
    const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
    return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        {<h1 style={{ textAlign: 'center', padding: '0px 0px', fontSize: '1.5em',color: "rgba(255, 255, 255, 0.65)",background: "#001529" }}>SGHorarios</h1>}
        <Menu theme="dark" mode="inline">
          {items.map((group) => (
            <Menu.SubMenu key={group.label} icon={group.icon} title={group.label}>
              {group.children.map((child) => (
                <Menu.Item key={child.label}>
                  <Link to={child.destination}>
                    {child.icon} {child.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu>
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              {items.map((group) =>
                group.children.map((child) => (
                  <Route key={child.label} path={child.destination} element={child.element} />
                ))
              )}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
} 
export default Aside;

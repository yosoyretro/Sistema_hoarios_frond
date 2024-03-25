import React, { Children } from "react";
import { Layout, Menu, theme, Avatar, Space,Card } from 'antd';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { UserOutlined, ToolOutlined, SettingOutlined, CalendarOutlined, FolderViewOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    label: 'Mantenimientos',
    icon: <ToolOutlined />,
    children: [
      {
        label: 'Usuarios',
        icon: <UserOutlined />,
        destination: '/Mantenimientos/Usuarios',
      },
      {
        label: 'Titulos Academicos',
        icon: <ToolOutlined />,
        destination: '/Mantenimientos/titulo_academico',
      },
      {
        label: 'Roles',
        icon: <ToolOutlined />,
        destination: '/Mantenimientos/roles',

      },
      {
        label: 'Materias',
        icon: <FolderViewOutlined />,
        destination: '/Mantenimientos/materias',
      },
      {
        label: 'paralelos',
        icon: <ToolOutlined />,
        destination: '/Mantenimientos/Paralelos',

      },
      {
        label: "Horarios",
        icon: <CalendarOutlined />,
        destination: 'Mantenimientos/Horarios',
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
        destination: '/Planificacion_horarios',
      },
    ],
  },

];

const Aside = ({ children }) => {
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
        {<h1 style={{ textAlign: 'center', padding: '0px 0px', fontSize: '1.5em', color: "rgba(255, 255, 255, 0.65)", background: "#001529" }}>SGHorarios</h1>}
        <Menu theme="dark" mode="inline">
          {items.map((group,index) => (
            <Menu.SubMenu key={group.label} icon={group.icon} title={group.label}>
              {group.children.map((child) => (
                <Menu.Item key={child.label}>
                  <Link key={index} to={child.destination}>
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
          }}
        >
        
        </Header>
         
          <Card>
          {children}
          </Card>
        
      </Layout>
    </Layout>
  );
}
export default Aside;

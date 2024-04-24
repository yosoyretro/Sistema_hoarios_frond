import React, { useState } from 'react';
import {
  DesktopOutlined,
  UserOutlined,
  CalendarOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
//import Aside from "./components/Aside";
import Usuarios from "./views/Mantenimientos/Usuarios";
import Perfiles from "./views/Mantenimientos/Perfiles";
import Cursos from "./views/Mantenimientos/Cursos";
import Paralelos from "./views/Mantenimientos/Paralelos";
import Materias from "./views/Mantenimientos/Materias";
import EducacionGlobal from "./views/Mantenimientos/EducacionGlobal";
import TitulosAcademicos from "./views/Mantenimientos/TitulosAcademicos";
import Horarios from "./views/Mantenimientos/Horarios";
import NewEducacionGlobal from "./views/Formularios/NewEducacionGlobal";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Dashboard', '1', <DesktopOutlined />),
  getItem('Usuario', 'sub1', <UserOutlined />, [
    getItem('Perfiles', '3'),
    getItem('Cursos', '4'),
    getItem('Paralelos', '5'),
    getItem('EducacionGlobal ', '6'),
    getItem('Materias ', '7'),
    getItem('TitulosAcademicos ', '8'),
  ]),
  getItem('Calendario', 'sub2', <CalendarOutlined />, [getItem('Horarios ', '9'), getItem('Reportes', '10')]),
  getItem('Configuraciones', '9', <SettingOutlined/>),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item></Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;







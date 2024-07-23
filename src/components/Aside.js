import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SettingOutlined,  DesktopOutlined, FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, theme, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";

const { SubMenu } = Menu;

const Aside = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Cambiado a 768 para móviles
  const [collapsed, setCollapsed] = useState(isMobile); // Inicialmente colapsado en móviles
  const [selectedItem, setSelectedItem] = useState('1');
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Cambiado a 768 para móviles
      if (window.innerWidth < 768) {
        setCollapsed(true); // Si es móvil, colapsar automáticamente
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
  };

  function getItem(label, key, icon, children, url = '') {
    return {
      key,
      icon,
      children,
      label,
      url,
    };
  }

  const items = [
    getItem('Dashboard', '1', <DesktopOutlined />, '', '/dashboard'),
    getItem('Mantenimientos', 'subManetenimiento', <SettingOutlined />, [
      //getItem('EducacionGlobal', '7', '', '', '/Mantenimientos/educacionGobal'),
      getItem('Perfiles', '3', '', '', '/Mantenimientos/perfiles'),
      getItem('Usuarios', '4', '', '', '/Mantenimientos/usuarios'),
      getItem('Materias', '8', '', '', '/Mantenimientos/materias'),
      getItem('Cursos', '5', '', '', '/Mantenimientos/cursos'),
      getItem('Paralelos', '6', '', '', '/Mantenimientos/paralelos'),
      getItem('TitulosAcademicos', '9', '', '', '/Mantenimientos/tituloacademico'),
      getItem('Calendario', '13', '', '', '/Mantenimientos/calendario'),
    ]),
    getItem('Planificaciones', 'subPlanificaciones', <FormOutlined />, [
      getItem('Horario', '10', '', '', '/Mantenimientos/horarios'),
      getItem('Planificacion Academica', '11', '', '', '/Planificaciones/PlanificacionAcademia'),
    ]),
    getItem('Configuraciones', '12', <SettingOutlined />, '', '/settings'),
  ];

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={[selectedItem]} mode="inline" onClick={handleMenuClick}>
          {items.map(item => (
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map(child => (
                  <Menu.Item key={child.key}>
                    <Link to={child.url}>{child.label}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.url}>{item.label}</Link>
              </Menu.Item>
            )
          ))}
        </Menu>
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
            {children}
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
}

export default Aside;

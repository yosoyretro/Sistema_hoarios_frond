import React from "react";
import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { SettingOutlined, UserOutlined, BankOutlined, CalendarOutlined, BookOutlined, GlobalOutlined, FolderOutlined, ApartmentOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"
import { Button } from "antd";

const Aside = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      height: isMobile ? 'auto' : '100vh',
    }}>
      <Sidebar collapsed={isMobile} backgroundColor="#000000">
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  backgroundColor: active ? '#000000' : undefined,
                  color: 'white',
                };
            },
          }}
        >

          <MenuItem disabled icon={<BankOutlined />}>Sistema Academico</MenuItem>

              <SubMenu active label={"Mantenimientos"} icon={<SettingOutlined />} style={{
                background: '#000000',
                color: 'white'
              }}>
                <Link to={"Mantenimientos/usuarios"}>
                  <MenuItem disabled icon={<UserOutlined />} style={{ background: '#000000', color: 'white' }}>{"usuarios"}</MenuItem>
                </Link>

                <Link to={"Mantenimientos/perfiles"}>
                  <MenuItem disabled icon={<UserSwitchOutlined />} style={{ background: '#000000', color: 'white' }}>{"Perfiles"}</MenuItem>
                </Link>

                <Link to={"Mantenimientos/cursos"}>
                  <MenuItem disabled icon={<ApartmentOutlined />} style={{ background: '#000000', color: 'white' }}>{"Cursos"}</MenuItem>
                </Link>

                <Link to={"Mantenimientos/paralelos"}>
                  <MenuItem disabled icon={<ApartmentOutlined />} style={{ background: '#000000', color: 'white' }}>{"Paralelos"}</MenuItem>
                </Link>

                <Link to={"Mantenimientos/educacionGobal"}>
                  <MenuItem disabled icon={<GlobalOutlined />} style={{ background: '#000000', color: 'white' }}>{"Educacion Global"}</MenuItem>
                </Link>

                <Link to={"Mantenimientos/materias"}>
                  <MenuItem disabled icon={<BookOutlined />} style={{ background: '#000000', color: 'white' }}>{"Materias"}</MenuItem>
                </Link>

                <Link to={"Mantenimientos/tituloacademico"}>
                  <MenuItem disabled icon={<FolderOutlined />} style={{ background: '#000000', color: 'white' }}>{"Titutlos Academicos"}</MenuItem>
                </Link>

                <Link to={"Mantenimientos/horarios"}>
                  <MenuItem disabled icon={<CalendarOutlined />} style={{ background: '#000000', color: 'white' }}>{"Horarios"}</MenuItem>
                </Link>

              </SubMenu>
        </Menu>
      </Sidebar>
      <main style={{width:"100%"}}>
        {children}
      </main>
    </div>

  );
}

export default Aside;

import React from "react";
import { Button, Collapse, Input, Table,Typography,Menu,Dropdown,Row,Col,Space,Card } from "antd";
import { SyncOutlined, PlusCircleOutlined,ClearOutlined,SearchOutlined,EditOutlined,DeleteOutlined,MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"

const EducacionGlobal = () => {
  const { Title } = Typography;

  return (
      <>
        <Row style={{
          display:"flex",
          justifyContent:"center"
        }}>
          <Title level={3}>Mantenimiento de Educacion global</Title>
        </Row>
        <Card bordered={false}>
        <Space style={{
            margin:"5px"
          }} direction="vertical">
            <Row gutter={{ xs: 8, sm: 24, md: 150, lg: 24 }}>
              <Col>
                <Link to={"/Formulario/crearEducacionGobal"}><Button icon={<PlusCircleOutlined/>}>Crear una Educacion Global</Button></Link>
              </Col>
              <Col>
                <Button icon={<SyncOutlined/>}>Descargar datos</Button>
              </Col>
            </Row>
        </Space>
        <Row>
          <Title level={5}>Cantidad : </Title>
        </Row>
        </Card>
      </>
    );
}

export default EducacionGlobal;

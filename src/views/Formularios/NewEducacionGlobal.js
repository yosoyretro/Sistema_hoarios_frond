import React from "react";
import { Button, Collapse, Input, Table,Typography,Menu,Dropdown,Row,Col,Space,Card,Form } from "antd";
import { SyncOutlined, PlusCircleOutlined,ClearOutlined,SearchOutlined,EditOutlined,DeleteOutlined,MenuOutlined } from "@ant-design/icons";
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const NewEducacionGlobal = () => {
  const url = "http://localhost:8000/api/istg/";
  const { Dragger } = Upload;
  const { Title } = Typography;
  const props = {
    name: 'file',
    multiple: true,
    accept: '.png,.jpg',
    action:`${url}subirImagenes`
  };
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
      <>
        <Row style={{
          display:"flex",
          justifyContent:"center"
        }}>
          <Title level={3}>Formulario de creacion de una Educacion Global</Title>
        </Row>
        <Card bordered={true} >
          <Space style={{
              margin:"5px"
            }} direction="vertical">
          </Space>
          <Form>
              <Form.Item>
                    <Card.Meta title="Subir" />
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Subir imagen</p>
                      <p className="ant-upload-hint">Adjunte su imagen en este sector</p>
                    </Dragger>
              </Form.Item>
              <div className="alinear-Formulario">
                <Row gutter={{lg:15}}>
                  <Col md={10} lg={10} sm={10} xl={8}>
                    <Form.Item label="Ingrese el codigo de la Educacion" name="codigo">
                      <Input/>
                    </Form.Item>
                  </Col>

                  <Col md={10} lg={25} sm={50} xl={15}>
                    <Form.Item label="Ingrese el nombre de la Educacion" name="nombre">
                      <Input/>
                    </Form.Item>
                  </Col>
                </Row>

                <div style={{ height: '150px', width: '50%' }}>
                 <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                  >
                    <AnyReactComponent
                      lat={59.955413}
                      lng={30.337844}
                      text="My Marker"
                    />
                  </GoogleMapReact>
                </div>
              </div>
            </Form>
        </Card>
      </>
      );
}

export default NewEducacionGlobal

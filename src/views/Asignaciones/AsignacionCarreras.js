import React from "react";
import { Typography,Row } from "antd";
import NewAsignacion from "../../components/NewAsignacion";

const AsignacionCarreras = () => {
    const { Title } = Typography;
  
    return (
        <>
        <Row style={{
            display:"flex",
            justifyContent:"center"
        }}>
            <Title level={3}>Asignacion carreras</Title>
        </Row>
        <NewAsignacion/>
        </>
        
    );
}

export default AsignacionCarreras;
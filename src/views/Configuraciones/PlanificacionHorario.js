import {  SettingOutlined } from '@ant-design/icons';
import { Row,Flex,Breadcrumb } from "antd";
const PlanificacionHorario = () => {

  return (
    <>
      <Row align="left">
        <Flex wrap="wrap" grap="small">
          <SettingOutlined style={{ fontSize: "25px" }} /><h1>Planificacion de horarios</h1>
        </Flex>

      </Row>
      <Row style={{ margin: "2px" }}>
          <Breadcrumb
            separator=">"
            items={[{ title: "Dashboard" }, { title: "Configuraciones" }, { title: "Planificacion de Horarios " }]}
          />
      </Row>
    </>
    );
}

export default PlanificacionHorario;

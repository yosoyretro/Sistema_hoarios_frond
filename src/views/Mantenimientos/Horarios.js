import React, { useState, useEffect } from 'react';
import { Button, Col, Row,Form, Flex, Breadcrumb, Table, Popconfirm,Spin,Space,Modal,Input,notification } from "antd";
import { ToolOutlined, QuestionCircleOutlined, DeleteOutlined, EditOutlined, SyncOutlined,SaveOutlined,FileAddOutlined } from '@ant-design/icons';
import NewHorario from '../../components/NewHorario';
import { Link } from 'react-router-dom';
const Horarios = () => {
    const [loading,setLoading]= useState(false);
  const { Column, ColumnGroup } = Table;


    return (
        <Spin spinning={loading} tip="Cargando...">
            <>

                <Row align="left">
                    <Flex wrap="wrap" grap="small">
                        <ToolOutlined style={{ fontSize: "25px" }} /><h1>Mantenimiento de Horarios</h1>
                    </Flex>
                </Row>

                <Row style={{ margin: "2px" }}>
                    <Breadcrumb
                        separator=">"
                        items={[{ title: "Dashboard" }, { title: "Mantenimientos" }, { title: "Horarios" }]}
                    />
                </Row>

                <Space direction="vertical" size={20} style={{ width: "100%" }}>
                    <Row align="left" layout>
                        <Space size="small">
                            <Col>
                                <Button style={{ color: "green", border: "1px solid green" }}>
                                    <Link to="formulario-horario">
                                    <EditOutlined />Crear un nuevo horario
                                    </Link>
                                    </Button>
                            </Col>
                            <Col>
                                <Button style={{ color: "green", border: "1px solid green" }} icon={<SyncOutlined />}>Sincronizar datos</Button>
                            </Col>
                        </Space>

                    </Row>

                    <Row style={{ width: '100%' }}>
                        <Table scroll={{ x: 1745 }}
                            
                        >
                            <ColumnGroup title="Registro" align="center">
                                <Column title="Código" dataIndex="codigo" width={50} align="center" />
                                <Column title="Descripción" dataIndex="descripcion" width={80} align="center" />
                            </ColumnGroup>
                            <ColumnGroup title="Campos de auditoria" bordered={true} align="center">
                                <Column title="Fecha de creacion" dataIndex="fecha_creacion" width={90} align="center" />
                                <Column title="Hora de creacion" dataIndex="hora_creacion" width={75} align="center" />
                                <Column title="Fecha de actualizacion" dataIndex="fecha_actualizacion" width={90} align="center" />
                                <Column title="Hora de actualizacion" dataIndex="hora_actualizacion" width={75} align="center" />
                                <Column title="Estado registro" dataIndex="estado_registro" width={100} align="center" />
                            </ColumnGroup>
                            <Column
                                title="Acciones"
                                fixed="right"
                                width={75}
                                dataIndex="acciones"
                                align="center"
                                render={(childrens, record) => (
                                    <Space size="small">
                                        <Col>
                                            <Button type="primary" icon={<EditOutlined />} />
                                        </Col>
                                        <Col>
                                            <Popconfirm
                                                okText="Si, realizar"
                                                title="Confirmar accion"
                                                description="¿Deseas realizar la eliminacion de este registro? Al borrar este registro, todos los usuarios que tengan el título académico de este registro quedarán afectados."
                                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                                                <Button type="primary" danger icon={<DeleteOutlined />} />
                                            </Popconfirm>
                                        </Col>
                                    </Space>
                                )}
                            />
                        </Table>
                    </Row>
                </Space>


            </>
        </Spin>

    )
}

export default Horarios;
import React,{ useState,useEffect } from "react";
import { Button, Collapse, Input,Row,Col,Space, Table,Typography,Menu,Card,Dropdown } from "antd";
import { SyncOutlined, PlusCircleOutlined,ClearOutlined,SearchOutlined,EditOutlined,DeleteOutlined,MenuOutlined } from "@ant-design/icons";
import NewParalelo from "../../components/NewParalelo.js"
const Paralelos = () => {
  const { Title } = Typography;
  const [OpenNewModal,setIsOpenNewModal] = useState(false);
  const [dataTabla,setDataTabla] = useState([]);
  const url = "http://localhost:8000/api/istg/";
  
  function getParalelos(){
    let configuraciones = {
      method:"GET",
      headers:{  
        'Content-Type': 'application/json'
      }
    }

    fetch(`${url}showParalelo`,configuraciones).then((response)=>{
      return response.json();
    }).then((data)=>{
      if(data.data){  
        let data_mapeada = data.data.map((value,index)=>{
          return {
            id:value.id_paralelo,
            numero:index+1,
            paralelo:value.numero_paralelo,
            ip_actualizacion:value.ip_actualizacion,
            fecha_actualizacion:value.fecha_actualizacion,
            usuarios_ultima_gestion:value.usuarios_ultima_gestion,
            estado:value.estado
          }
        })

        setDataTabla(data_mapeada)
      }
    })

  }

  function handleCloseModal(){
    setIsOpenNewModal(false)
  }
  const handleMenuClick = (action, record) => {
    console.log(`Se hizo clic en "${action}" para el usuario con cédula ${record}`);
    if(action == "eliminar"){
      /*setIsOpenUpdateModal(true)
      setFormularioEditar(record)*/
    }
  };

  const menu = (record) => (
    <Menu onClick={({ key }) => handleMenuClick(key, record)}>
      <Menu.Item key="eliminar"><DeleteOutlined/></Menu.Item>
    </Menu>
  );
  useEffect(()=>{
    getParalelos()
  },[])
  return (
    <>
      <Row style={{
        display:"flex",
        justifyContent:"center"
      }}>
        <Title level={3}>Mantenimiento de Paralelos</Title>
      </Row>
      <Card bordered={false}>

      <Space style={{margin:"5px"}}>
        <Row gutter={{ xs: 8, sm: 24, md: 150, lg: 24 }}>
          <Col>
            <Button icon={<PlusCircleOutlined/>} onClick={()=>{setIsOpenNewModal(true)}}>Crear un paralelo</Button>
          </Col>
          <Col>
            <Button icon={<SyncOutlined/>} onClick={()=>{
              getParalelos()                
            }}>Descargar datos</Button>
          </Col>
        </Row>
      </Space>
      <Row>
        <Title level={5}>Cantidad : {dataTabla.length}</Title>
      </Row>

      <Table
        size="small"
        scroll={{ x: 100 }}  
        columns={[
              {
                dataIndex:'numero',
                title:'numero',
                width:2,
                align:'center'
              },
              {
                dataIndex:'paralelo',
                title:'paralelo',
                width:10
              },
              {
                dataIndex:'ip_actualizacion',
                title:'maquina ultima gestion',
                width:10,
                align:'center'
              },

              {
                dataIndex:'usuarios_ultima_gestion',
                title:'Usuario ultima gestion',
                width:10,
                align:'center'
              },
              {
                dataIndex:'fecha_actualizacion',
                title:'fecha ultima gestion',
                width:10,
                align:'center'

              },
              {
                dataIndex:'estado',
                title:'Estado',
                width:10,
                align:'center'

              },
              {
                dataIndex: "accion",
                title: "Acciones",
                align:'center',
                width: 10,
                render: (_, record) => (
                  <Dropdown overlay={menu(record)} trigger={['click']}>
                    <Button><MenuOutlined/></Button>
                  </Dropdown>
                ),
              }
          ]}
        dataSource={dataTabla}
      />
      </Card>
      <NewParalelo open={OpenNewModal} handleCloseModal={handleCloseModal} getParalelos={getParalelos}/>
    </>
  );
}

export default Paralelos;

import React, { useState,useEffect } from 'react';
import { Card, Button, Form, TimePicker, Select, Collapse,notification } from 'antd';
import { CaretRightOutlined, PlusOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const { Item } = Form;
//const { Option } = Select;

const DiasMaterias = ({ dia, onSave }) => {
  const [forms, setForms] = useState([]);
  const [data, setData] = useState([]);
  const [approvedForms, setApprovedForms] = useState([]);
  const [dataAsignatura,setDataAsignatura] = useState([]);
  const [paraleloData, setParalelo] = useState("");
  const [cursoData,setCursoData] = useState([]);
  const [loading,setLoading]= useState(true);
  const url = "http://127.0.0.1:8000/api/v1/horario/";

  const mostrarNotificacion = (tipo,titulo,mensaje) => {
    notification[tipo]({
      message: titulo,
      description: mensaje,
    });
  };
  useEffect(
    ()=>{
      getAsignatura()
      getCurso()
      getParalelos()
    },);

  const getAsignatura = ()=>{
    setLoading(true);
    fetch(`${url}show_data_asignatura/`).then((response)=>{return response.json()})
    .then((data_request)=>{
      console.log("Soy la data request")
      console.log(data_request)
      if(data_request.ok){
        if(data_request.data){
          let data = data_request.data.map((value,numero)=>{
            return {
              key:numero,
              id:value.id_materia,
              label:value.descripcion,
              value:value.descripcion,
            }
          })
          setDataAsignatura(data)
        }else{
          setDataAsignatura([]);
        }
      }else if(data_request.ok === false){
        mostrarNotificacion('error','A ocurrido un error','A ocurrido un error al obtener la informacion');
      }
    }).finally(()=>{
      setLoading(false);
    }).catch(()=>{
      mostrarNotificacion('error','A ocurrido un error','Error interno en el servidor');
    })
  }

  function getCurso(){
    fetch(`${url}show_nivel`, { method: 'GET' })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let curso = data.data.map((value,index)=>{
              return {
                id:value.id_nivel,
                numero:value.numero,
                nemonico:value.nemonico,
                termino:value.termino,
                ip_actualizacion:value.ip_actualizacion,
                fecha_actualizacion:value.fecha_actualizacion,
                usuarios_ultima_gestion:value.usuarios_ultima_gestion,
                estado:value.estado
              }
            })

            setCursoData(curso)

          })
  }

  function getParalelos() {
    let configuraciones = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(`${url}showParalelo`, configuraciones).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.data) {
        let data_mapeada = data.data.map((value, index) => {
          return {
            id: value.id_paralelo,
            numero: index + 1,
            paralelo: value.numero_paralelo,
            ip_actualizacion: value.ip_actualizacion,
            fecha_actualizacion: value.fecha_actualizacion,
            usuarios_ultima_gestion: value.usuarios_ultima_gestion,
            estado: value.estado
          }
        })

        setParalelo(data_mapeada)
      }
    })

  }

  const handleAdd = () => {
    setForms([...forms, { id: forms.length }]);
  };

  const handleRemove = (formId) => {
    console.log("VOY A ELIMINAR");
    console.log(formId);
    setForms(forms.filter(form => form.id !== formId));
    setData(data.filter(item => item.formId !== formId));
  };

  const handleFinish = (values, formId) => {
    console.log("SOY LA DATA");
    console.log(values);
    setData([...data, { ...values, formId }]);
    onSave([...data, { ...values, formId }]);
    handleApprove(formId)
  };

  const handleApprove = (formId) => {
    // Marcar el formulario como aprobado
    setApprovedForms([...approvedForms, formId]);
  };

  const isFormApproved = (formId) => approvedForms.includes(formId);

  return (
    <Card title={dia}>
      <Button icon={<PlusOutlined />} type="link" onClick={handleAdd} style={{ margin: "8px" }}>
        Agregar
      </Button>

      <Collapse bordered={false} expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
        {forms.map((form, index) => (
          <Panel
            header={isFormApproved(form.id) ? `${data.find(item => item.formId === form.id)?.[`materia_${form.id}`]}` : 'Sin Aprobar'}
            key={form.id}
            
          >
            <Form onFinish={(values) => handleFinish(values, form.id)}>
              <Item name={`horaInicio_${form.id}`} label="Inicia" rules={[{ required: true, message: 'Por favor, ingresa la hora de inicio' }]}>
                <TimePicker format="HH:mm"  disabled={isFormApproved(form.id)}/>
              </Item>
              <Item name={`fechaTerminacion_${form.id}`} label="Termina" rules={[{ required: true, message: 'Por favor, selecciona la fecha de terminación' }]}>
                <TimePicker format="HH:mm" disabled={isFormApproved(form.id)}/>
              </Item>
              <Item name={`materia_${form.id}`} label="Materia" rules={[{ required: true, message: 'Por favor, selecciona la fecha de terminación' }]}>
                <Select disabled={isFormApproved(form.id)} options={dataAsignatura}/>
              </Item>
              <Item name={`curso_${form.id}`} label="Curso" rules={[{ required: true, message: 'Por favor, selecciona el curso' }]}>
                <Select disabled={isFormApproved(form.id)} options={[]}/>
              </Item>
              <Item name={`paralelo_${form.id}`} label="Paralelo" rules={[{ required: true, message: 'Por favor, selecciona el paralelo' }]}>
                <Select disabled={isFormApproved(form.id)} options={[]}/>
              </Item>
              <Button icon={<DeleteOutlined />} danger type="link" onClick={() => handleRemove(form.id)}>
                Eliminar
              </Button>
              <Button
                icon={<CheckCircleOutlined />}
                type="link"
                htmlType="submit"
                disabled={isFormApproved(form.id)}>
                Aprobar
              </Button>
            </Form>
          </Panel>
        ))}
      </Collapse>
    </Card>
  );
};

export default DiasMaterias;

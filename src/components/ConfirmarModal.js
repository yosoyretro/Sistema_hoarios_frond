import React, { useState } from 'react';
import { Modal, Button,Result } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const ConfirmModal = ({ onConfirm, onCancel }) => {
    const [visible, setVisible] = useState(true);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    // Lógica de confirmación
    console.log('Confirmado');
    setVisible(false); // Cierra el modal después de la confirmación
  };

  return (
    <>
      <Modal footer={null} align="center" open={true} title={null}>
          <Result
            status="success"
            style={{ color: 'green' }}
            title="!Operacion realizada con exito!"
            subTitle="Usuario eliminado exitosamente"
            
          />
      </Modal>
    </>
  );

};

export default ConfirmModal;

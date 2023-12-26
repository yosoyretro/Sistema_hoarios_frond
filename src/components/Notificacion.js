import React from "react";
import { notification } from "antd";

const Notificacion = () => {
  const mostrarNotificacion = (tipo,titulo,mensaje) => {
    notification[tipo || "success"]({
      message: titulo || "Operación realizada con éxito",
      description: mensaje || "Registro creado Exitosamente",
    });
  };

};

export default Notificacion;

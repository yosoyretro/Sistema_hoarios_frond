// import React from "react";
// import moment from "moment";
// import "moment/locale/es";
// import { CalendarOutlined } from "@ant-design/icons";
// import { Badge, Calendar } from "antd";
// import locale from "antd/lib/locale-provider/es_ES";

// const getMonthData = (value) => {
//   if (value.month() === 8) {
//     return 1394;
//   }
// };

// const dateCellRender = (value) => {
//   const listData = getListData(value);
//   return (
//     <ul className="events">
//       {listData.map((item) => (
//         <li key={item.content}>
//           <Badge status={item.type} text={item.content} />
//         </li>
//       ))}
//     </ul>
//   );
// };

// const monthCellRender = (value) => {
//   const num = getMonthData(value);

//   return num ? (
//     <div className="notes-month">
//       <section>{num}</section>
//       <span>Número de tareas pendientes</span>
//     </div>
//   ) : null;
// };

// const getListData = (value) => {
//   let listData;
//   switch (value.date()) {
//     case 8:
//       listData = [
//         {
//           type: "warning",
//           content: "Este es un evento de advertencia.",
//         },
//         {
//           type: "success",
//           content: "Este es un evento común.",
//         },
//       ];
//       break;
//     case 10:
//       listData = [
//         {
//           type: "warning",
//           content: "Este es un evento de advertencia.",
//         },
//         {
//           type: "success",
//           content: "Este es un evento común.",
//         },
//         {
//           type: "error",
//           content: "Este es un evento de error.",
//         },
//       ];
//       break;
//     case 15:
//       listData = [
//         {
//           type: "warning",
//           content: "Este es un evento de advertencia",
//         },
//         {
//           type: "success",
//           content: "Este es un evento común muy largo......",
//         },
//         {
//           type: "error",
//           content: "Este es el evento de error 1.",
//         },
//         {
//           type: "error",
//           content: "Este es el evento de error 2.",
//         },
//         {
//           type: "error",
//           content: "Este es el evento de error 3.",
//         },
//         {
//           type: "error",
//           content: "Este es el evento de error 4.",
//         },
//       ];
//       break;
//     default:
//   }
//   return listData || [];
// };

// const VisualizarHorarios = () => {
//   moment.locale("es");

//   const cellRender = (current, info) => {
//     if (info.type === "date") return dateCellRender(current);
//     if (info.type === "month") return monthCellRender(current);
//     return info.originNode;
//   };

//   return (
//     <>
//       <h1>
//         <CalendarOutlined /> Visualizar mi horario
//       </h1>
//       <Calendar locale={locale} cellRender={cellRender} />
//     </>
//   );
// };

// export default VisualizarHorarios;

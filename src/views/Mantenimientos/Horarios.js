import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
//import { Button, Col, Row, Form, Flex, Breadcrumb, Table, Popconfirm, Spin, Space, Modal, Input, notification } from "antd";
//import { ToolOutlined, QuestionCircleOutlined, DeleteOutlined, EditOutlined, SyncOutlined, SaveOutlined, FileAddOutlined } from '@ant-design/icons';
import "../../public/css/letras.css";


// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const Calendario = (props) => (
    <div className="myCustomHeight">
        <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
        />
    </div>
)


export default Calendario;
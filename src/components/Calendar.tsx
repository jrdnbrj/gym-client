import { useState, useEffect } from 'react';

import Modal from "../components/Modal";
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


const months = [
    ['Enero', 'ENE', 31], ['Febrero', 'FEB', 28], ['Marzo', 'MAR', 31], ['Abril', 'ABR', 30],
    ['Mayo', 'MAY', 31], ['Junio', 'JUN', 30], ['Julio', 'JUL', 31], ['Agosto', 'AGO', 31],
    ['Septiembre', 'SEP', 30], ['Octubre', 'OCT', 31], ['Noviembre', 'NOV', 30], ['Diciembre', 'DIC', 31]
];

const days = [
    ['Lunes', 'LUN'], ['Martes', 'MAR'], ['Miércoles', 'MIE'], ['Jueves', 'JUE'],
    ['Viernes', 'VIE'], ['Sábado', 'SAB'], ['Domingo', 'DOM']
]

const Calendar = () => {

    const date = new Date();

    const [showModal, setShowModal] = useState(false);

    const [month, setMonth] = useState(months[date.getMonth()]);
    const [day, setDay] = useState(date.getDay() - 1);
    const [today, setToday] = useState(date.getDate());

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const GetDay = ({ i }) => {
        let num;

        if (day === i)
            num = today;
        else {
            num = today + i - 1;
            if (num > month[2])
                num -= month[2];
        }

        return <span className="day">{num}</span>
    }

    const bookClass = e => {
        e.preventDefault();
        console.log('booking');
    }

    const bookClassComponent = () => {
        return <>
            <Form onSubmit={bookClass}>
                <Form.Text>Costo Mensual: $100</Form.Text>
                <Form.Select>
                    <option hidden value=''>Escoge un instructor</option>
                    <option value="instructor1">Instructor 1</option>
                    <option value="instructor2">Instructor 2</option>
                    <option value="instructor3">Instructor 3</option>
                </Form.Select>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Cupos"
                    className="my-3"
                >
                    <Form.Control type="number" placeholder="Cupos disponibles" />
                </FloatingLabel>
                <Button className="mt-2" type="submit">Reservar</Button>
            </Form>
        </>
    }

    return (
        <>
            <Modal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                header='Reservar Clase'
                ModalBody={bookClassComponent}
            />
            <table className="calendar">
                <thead>
                    <tr>
                        <th>
                            <span className="long">{month[0]}</span>
                            <span className="short">{month[1]}</span>
                        </th>
                        {days.map((day, i) => {
                            return (
                                <th key={i}>
                                    <GetDay i={i} />
                                    <span className="long">{day[0]}</span>
                                    <span className="short">{day[1]}</span>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="hour"><span>07:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>08:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="busy">
                            <div onClick={openModal}>
                                <span>Jordan</span>
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>09:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>10:00</span></td>
                        <td></td>
                        <td className="available">
                            <div onClick={openModal}>
                                <span>3</span>
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>11:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>12:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>13:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>14:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>15:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>16:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>17:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>18:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>19:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>20:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>21:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour"><span>22:00</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Calendar;

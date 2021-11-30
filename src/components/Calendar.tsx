const Calendar = () => {
    return (
        <table className="calendar">
            <thead>
                <tr>
                    <th></th>
                    <th>
                        <span className="day">1</span>
                        <span className="long">Lunes</span>
                        <span className="short">Lu</span>
                    </th>
                    <th>
                        <span className="day">2</span>
                        <span className="long">Martes</span>
                        <span className="short">Ma</span>
                    </th>
                    <th>
                        <span className="day">3</span>
                        <span className="long">Miercoles</span>
                        <span className="short">Mi</span>
                    </th>
                    <th>
                        <span className="day">4</span>
                        <span className="long">Jueves</span>
                        <span className="short">Ju</span>
                    </th>
                    <th>
                        <span className="day active">5</span>
                        <span className="long">Viernes</span>
                        <span className="short">Vi</span>
                    </th>
                    <th>
                        <span className="day">6</span>
                        <span className="long">Sabado</span>
                        <span className="short">Sa</span>
                    </th>
                    <th>
                        <span className="day">7</span>
                        <span className="long">Domingo</span>
                        <span className="short">Do</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="hour" rowSpan="2"><span>1:00</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="hour" rowSpan="2"><span>2:00</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="hour" rowSpan="2"><span>3:00</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="hour" rowSpan="2"><span>4:00</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="hour" rowSpan="2"><span>5:00</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="hour" rowSpan="2"><span>6:00</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="hour" rowSpan="2"><span>7:00</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="hour" rowSpan="2"><span>8:00</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
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
    )
}

export default Calendar;

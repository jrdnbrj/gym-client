import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";


const Receipts = ({ receipts }) => {

    const router = useRouter();

    const getTakenAt = date => {
        const datetime = new Date(date);
        let minutes = datetime.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;

        const fecha = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`;
        const time = `${datetime.getHours()}:${minutes}`;
        return `${fecha} ${time}`;
    }

    const downloadPdf = (data, i) => {
        const args = {
            id: `0${i+13}`,
            clase: data.workoutTypeName,
            precio: data.totalAmount,
            fecha: getTakenAt(data.transactionDate),
            nombre: `${data.clientID}`,
            email: data.clientEmail,
            months: data.paidForMonthsDates,
            path: 'admin/clases'
        }
        router.push(`/pdf?${Object.keys(args).map(key => key + '=' + args[key]).join('&')}`);
    }

    return (
        <Container className="mt-5">
            <div>
                <h2>Comprobantes de Pago</h2>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Clase</th>
                            <th>Monto</th>
                            <th>Meses</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map((data, i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{getTakenAt(data.transactionDate)}</td>
                                <td>{data.workoutTypeName}</td>
                                <td>$ {data.totalAmount}</td>
                                <td>{data.paidForMonthsDates.length}</td>
                                <td>
                                    <i 
                                        className="bi bi-file-pdf" 
                                        onClick={() => downloadPdf(data, i+1)}
                                        title="Descargar Comprobante" 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default Receipts;

import { useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import Image from "next/image";

import { Style } from "react-style-tag";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

import radikalLogo from "../assets/images/radikal-logo.jpeg";


const pdf = () => {

    const router = useRouter();
    const body = useRef(null);

    const { clase, precio, id, fecha, nombre, email, path } = router.query;

    useEffect(() => {
        if (!email) return;

        html2canvas(body.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save(`radikal_gym_pago_${id}.pdf`);

            router.push(path);
        });
    }, [email]);

    return <div ref={body}>
        <Style>{` 
            .invoice-box {
                max-width: 600px;
                padding: 30px;
                border: 0;
                font-size: 16px;
                line-height: 24px;
                font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                color: #555;
            }
            .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
            }
            .invoice-box table td {
                padding: 5px;
                vertical-align: top;
            }
            .invoice-box table tr td:nth-child(2) {
                text-align: right;
            }
            .invoice-box table tr.top table td {
                padding-bottom: 20px;
            }
            .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #333;
            }
            .invoice-box table tr.information table td {
                padding-bottom: 40px;
            }
            .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
            }
            .invoice-box table tr.details td {
                padding-bottom: 20px;
            }
            .invoice-box table tr.item td {
                border-bottom: 1px solid #eee;
            }
            .invoice-box table tr.item.last td {
                border-bottom: none;
            }
            .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #eee;
                font-weight: bold;
            }
            .invoice-box.rtl {
                direction: rtl;
                font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            }
            .invoice-box.rtl table {
                text-align: right;
            }
            .invoice-box.rtl table tr td:nth-child(2) {
                text-align: left;
            }
        `} 
        </Style>
        <div className="invoice-box">
            <table cellPadding="0" cellSpacing="0">
                <tr className="top">
                    <td colSpan="2">
                        <table>
                            <tr>
                                <td>
                                    Recibo #: {id}<br />
                                    Fecha de Pago: {fecha}<br />
                                </td>
                                <Image src={radikalLogo} alt="radikal-logo" width={130} height={100} />
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr className="information">
                    <td colSpan="2">
                        <table>
                            <tr>
                                <td>
                                    Radikal Gym<br />
                                    Av. América y Colón
                                </td>
                                <td>
                                    {nombre}<br />
                                    {email}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr className="heading">
                    <td>Motivo</td>
                    <td>Precio</td>
                </tr>
                <tr className="item">
                    <td>Clase de {clase}</td>
                    <td>${precio}</td>
                </tr>
                <tr className="total">
                    <td></td>
                    <td>${precio}</td>
                </tr>
            </table>
        </div>
    </div>
};

export default pdf;

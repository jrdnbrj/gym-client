import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const ModalWeb = ({ show, onHide, header, ModalBody }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModalBody />
            </Modal.Body>
        </Modal>
    );
}

export default ModalWeb;

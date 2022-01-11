import Spinner from "react-bootstrap/Spinner";

const Loading = ({ name }) => {
    return (
        <div className="loading-calendar">
            <Spinner animation="border" />
            <span>Cargando {name}...</span>
        </div>
    );
}

export default Loading;

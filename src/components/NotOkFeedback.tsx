import FormControl from "react-bootstrap/FormControl";

export interface NotOkFeedBackProps {
    message: string;
}

const NotOkFeedback = ({ message }: NotOkFeedBackProps) => (
    <FormControl.Feedback type="invalid">{message}</FormControl.Feedback>
);

export default NotOkFeedback;

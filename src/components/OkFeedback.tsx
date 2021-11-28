import FormControl from "react-bootstrap/FormControl";

export interface OkFeedBackProps {
    message?: string;
}

const OkFeedback = ({ message }: OkFeedBackProps) => (
    <FormControl.Feedback>{message || ""}</FormControl.Feedback>
);

export default OkFeedback;

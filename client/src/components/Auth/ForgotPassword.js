import axios from "axios";
import { useRef } from "react";
import {
  Container,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";

const ForgotPassword = () => {
  const emailRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
    };
    axios
      .post("http://localhost:3000/password/forgot-password", payload)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>Forgot your password?</h2>
      <Form id="recovery-form" onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel htmlFor="email">Enter your email Id</FormLabel>
          <FormControl
            type="email"
            name="email"
            id="input-email"
            placeholder="Enter email address"
            ref={emailRef}
            required
          />
        </FormGroup>
        <div style={{ textAlign: "center" }}>
          <Button type="submit" className="btn-primary">
            submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ForgotPassword;

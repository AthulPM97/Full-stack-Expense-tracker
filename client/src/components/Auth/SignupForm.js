import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import axios from "axios";

const SignupForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const SignupHandler = (e) => {
    e.preventDefault();

    const inputData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/user/sign-up`, inputData)
      .then((res) => {
        // localStorage.setItem("token", res.data.token);
        console.log(res.data);
        if (res.status === 201) {
          navigate("/expenses");
          dispatch(authActions.signup(res.data));
        }
      })
      .catch((err) => console.log(err.response.data.message));
  };

  const authModeHandler = () => {
    navigate("/login");
  };

  return (
    <Container>
      <div className="text-center mb-3">
        <h3>Sign up</h3>
      </div>
      <Form onSubmit={SignupHandler}>
        <Form.Group className="mb-2">
          <Form.Control type="text" placeholder="Name" ref={nameRef} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </div>
      </Form>
      <br />
      <div style={{ textAlign: "center" }}>
        <Button variant="outline-warning" onClick={authModeHandler}>
          Already have an account? Login
        </Button>
      </div>
    </Container>
  );
};

export default SignupForm;

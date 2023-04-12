import { useRef } from "react";
import { Container, Form, Button, NavLink } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/thunks/login-thunk";
import { validate } from "./validate";

const LoginForm = () => {
  //history
  const navigate = useNavigate();

  //store
  const dispatch = useDispatch();

  //refs
  const emailRef = useRef();
  const passwordRef = useRef();

  //handlers
  const loginHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    //validation
    const credentials = {
      email: enteredEmail,
      password: enteredPassword,
    };
    if (validate(credentials)) {
      dispatch(login(credentials));
    }
  };

  const authModeHandler = () => {
    navigate('/signup');
  };

  const forgotPasswordHandler = () => {
    navigate('/forgot-password');
  }

  return (
    <Container>
      <div className="text-center mb-3">
        <h3>Login</h3>
      </div>
      <Form onSubmit={loginHandler}>
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
            Login
          </Button>
        </div>
      </Form>
      <br />
      <div style={{ textAlign: "center" }}>
        <Button variant="outline-warning" onClick={authModeHandler}>
          Don't have an account? Sign up
        </Button>
        <br/>
        <NavLink onClick={forgotPasswordHandler}>Forgot password?</NavLink>
      </div>

    </Container>
  );
};

export default LoginForm;

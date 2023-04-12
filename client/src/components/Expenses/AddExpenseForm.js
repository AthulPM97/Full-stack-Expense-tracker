import axios from "axios";
import { useRef } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-slice";

const AddExpenseForm = () => {
  const token = useSelector((x) => x.auth.token);
  const dispatch = useDispatch();

  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const expenseData = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/expense/add-expense`,
        expenseData,
        {
          headers: { Authorization: token },
        }
      );
      dispatch(expenseActions.addExpense(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <h3 style={{ textAlign: "center" }}>Add expense</h3>
      <Form onSubmit={submitHandler} id="expense-form">
        <Row>
          <Col>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              id="input-amount"
              ref={amountRef}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Enter description"
              id="input-description"
              ref={descriptionRef}
            />
          </Col>
          <Col>
            <Form.Select
              defaultValue="choose category"
              id="input-category"
              ref={categoryRef}
            >
              <option disabled>choose category</option>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="salary">Salary</option>
              <option value="movie">Movie</option>
            </Form.Select>
          </Col>
          <Col>
            <Button type="submit" className="btn-primary">
              Add expense
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddExpenseForm;

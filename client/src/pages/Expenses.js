import { Container } from "react-bootstrap";
import ExpenseTable from "../components/Expenses/ExpenseTable";
import AddExpenseForm from "../components/Expenses/AddExpenseForm";

const Expenses = (props) => {
  return (
    <Container>
      <AddExpenseForm />
      <br />
      <ExpenseTable />
    </Container>
  );
};

export default Expenses;

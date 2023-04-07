import React, { useEffect } from "react";
import TableBody from "./TableBody";
import axios from "axios";
import ButtonCarousel from "./ButtonCarousel";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-slice";

const { Table } = require("react-bootstrap");

const ExpenseTable = () => {
  const dispatch = useDispatch();

  const token = useSelector((x) => x.auth.token);
  const expenses = useSelector((x) => x.expense.expenses);

  useEffect(() => {
    const limit = JSON.parse(localStorage.getItem('itemLimit'));
    axios
      .get(`http://localhost:3000/expense/?limit=${limit}`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        dispatch(expenseActions.fetchExpenses(result.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const pageChangeHandler = (pageNumber, itemsPerPage) => {
    axios
      .get(
        `http://localhost:3000/expense/?page=${pageNumber}&limit=${itemsPerPage}`,
        {
          headers: { Authorization: token },
        }
      )
      .then((result) => {
        dispatch(expenseActions.setExpenses(result.data.data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <React.Fragment>
      <Table hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item) => (
            <TableBody item={item} key={item.id} />
          ))}
        </tbody>
      </Table>
      <ButtonCarousel onPageChange={pageChangeHandler} />
    </React.Fragment>
  );
};

export default ExpenseTable;

import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import axios from "axios";
import ButtonCarousel from "./ButtonCarousel";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-slice";

const { Table } = require("react-bootstrap");

const ExpenseTable = (props) => {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const expenses = useSelector(x => x.expense.expenses)
  const totalItems = useSelector(x => x.expense.totalItems);
  console.log(expenses);

  useEffect(() => {
    axios
      .get("http://localhost:3000/expense", {
        headers: { Authorization: token },
      })
      .then((result) => {
        dispatch(expenseActions.fetchExpenses(result.data));
        setItems(result.data.data);
        setTotalPages(result.data.totalItems);
      })
      .catch((err) => console.log(err));
  }, []);

  const pageChangeHandler = (pageNumber) => {
    axios
      .get(`http://localhost:3000/expense/?page=${pageNumber}`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        setItems(result.data.data);

      })
      .catch((err) => console.log(err));
  }
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
      <ButtonCarousel total={totalPages} onPageChange={pageChangeHandler}/>
    </React.Fragment>
  );
};

export default ExpenseTable;

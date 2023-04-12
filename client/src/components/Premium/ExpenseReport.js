import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const ExpenseReport = () => {
  const token = useSelector((x) => x.auth.token);

  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total;
    axios
      .get("http://localhost:3000/expense", {
        headers: { Authorization: token },
      })
      .then((result) => {
        const data = result.data.data;
        setExpenses(data);
        //   data.forEach((item) => addToList(item));
        total = data.reduce((total, item) => total + item.amount, 0);
        setTotal(total);
        //   makeFooter(total);
      })
      .catch((err) => console.log(err));
  }, []);

  const downloadReportHandler = () => {
    axios
      .get("http://localhost:3000/user/download", {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response);
        const a = document.createElement("a");
        a.href = response.data.fileUrl;
        a.click();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Expense</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item) => {
            const date = new Date(item.createdAt);
            const formattedDate = date.toLocaleDateString("en-GB");
            return (
              <tr key={item.id}>
                <td>{formattedDate}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.amount}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>{`total: ${total}`}</tfoot>
      </table>
      <div style={{ textAlign: "center" }}>
        <Button variant="outline-primary" onClick={downloadReportHandler}>
          Download
        </Button>
      </div>
    </Container>
  );
};

export default ExpenseReport;

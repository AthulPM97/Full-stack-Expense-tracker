import axios from "axios";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const TableBody = (props) => {
  const { item } = props;

  const token = useSelector((x) => x.auth.token);

  const deleteItemHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/expense/delete-expense/${id}`, {
        headers: { Authorization: token },
      });
      console.log('deleted successfully')
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.amount}</td>
      <td>{item.description}</td>
      <td>{item.category}</td>
      <td>
        <Button
          variant="danger"
          onClick={deleteItemHandler.bind(null, item.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default TableBody;

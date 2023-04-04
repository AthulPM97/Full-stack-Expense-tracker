import { Button } from "react-bootstrap";

const TableBody = (props) => {
    const {item} = props;
    return (
        <tr>
          <td>{item.id}</td>
          <td>{item.amount}</td>
          <td>{item.description}</td>
          <td>{item.category}</td>
          <td><Button variant="danger">Delete</Button></td>
        </tr>
    )
}

export default TableBody;
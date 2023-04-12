import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ButtonCarousel = (props) => {
  const itemsPerPageRef = useRef();

  const totalItems = useSelector((x) => x.expense.totalItems);
  const itemsPerPage = JSON.parse(localStorage.getItem("itemLimit")) || 5;
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
  const buttonIndices = Array.from({ length: numberOfPages }, (_, i) => i);

  const handleClick = (pageNumber) => {
    pageNumber = pageNumber === null ? 1 : pageNumber;
    const itemsPerPage = itemsPerPageRef.current.value;
    localStorage.setItem("itemLimit", JSON.stringify(itemsPerPage));
    props.onPageChange(pageNumber, itemsPerPage);
  };

  return (
    <Row>
      <Col>
        {buttonIndices.map((index) => (
          <Button
            key={index}
            variant="outline-primary"
            onClick={handleClick.bind(null, index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Col>
      <Col style={{ display: "flex" }}>
        <p>Expenses per page</p>
        <Form.Select
          defaultValue={itemsPerPage}
          id="input-itemcount"
          ref={itemsPerPageRef}
          onChange={handleClick}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default ButtonCarousel;

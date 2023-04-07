import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const ButtonCarousel = (props) => {
  const itemsPerPageRef = useRef();

  const totalItems = useSelector((x) => x.expense.totalItems);
  const numberOfPages = Math.ceil(totalItems / 5);
  const buttonIndices = Array.from({ length: numberOfPages }, (_, i) => i);

  const handleClick = (pageNumber) => {
    const itemsPerPage = itemsPerPageRef.current.value;
    props.onPageChange(pageNumber,itemsPerPage);
  };

  return (
    <Container>
      {buttonIndices.map((index) => (
        <Button
          key={index}
          variant="outline-primary"
          onClick={handleClick.bind(null, index + 1)}
        >
          {index + 1}
        </Button>
      ))}
      <Form.Select defaultValue="5" id="input-itemcount" ref={itemsPerPageRef}>
        <option disabled>5</option>
        <option value="10">10</option>
      </Form.Select>
    </Container>
  );
};

export default ButtonCarousel;

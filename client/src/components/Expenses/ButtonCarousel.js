import { Button, Container } from "react-bootstrap";

const ButtonCarousel = (props) => {
  const { total } = props;
  const numberOfPages = (total/2);
  const buttonIndices = Array.from({ length: numberOfPages }, (_, i) => i);
  
  const handleClick = (pageNumber) => {
    props.onPageChange(pageNumber);
  }

  return (
    <Container>
      {buttonIndices.map(index => (
        <Button key={index} variant="outline-primary" onClick={handleClick.bind(null, index+1)}>{index + 1}</Button>
      ))}
    </Container>
  );
};

export default ButtonCarousel;

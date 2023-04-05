import { Navbar, Container, Button } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/expenses">Expenses</Navbar.Brand>
        <Button>Leaderboard</Button>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

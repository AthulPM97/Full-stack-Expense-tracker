import axios from "axios";
// import { Razorpay } from "razorpay";
import { Navbar, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const NavigationBar = () => {
  const token = useSelector((x) => x.auth.token);

  const buyPremiumHandler = async (e) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/purchase/buy-premium",
        { headers: { Authorization: token } }
      );
      console.log(response);
      var options = {
        key: response.data.key_id,
        order_id: response.data.order.id,
        handler: async function (response) {
          await axios.post(
            "http://localhost:3000/purchase/update-transaction-status",
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            },
            { headers: { Authorization: token } }
          );
          alert("You are now a premium user!");
          localStorage.setItem("isPremium", "true");
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      // e.preventDefault;
      rzp.on("payment.failed", function (response) {
        console.log(response);
        alert("Something went wrong");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/expenses">Expenses</Navbar.Brand>
        <Button>Leaderboard</Button>
        <Button variant="outline-primary" onClick={buyPremiumHandler}>
          Buy Premium
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

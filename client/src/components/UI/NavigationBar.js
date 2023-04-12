import axios from "axios";
import { Navbar, Container, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { premiumActions } from "../../store/premium-slice";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const token = useSelector((x) => x.auth.token);
  const isPremium = useSelector((x) => x.auth.isPremium);
  const dispatch = useDispatch();

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
          dispatch(authActions.upgradePremium());
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

  const leaderboardHandler = () => {
    axios
      .get("http://localhost:3000/premium/leaderboard", {
        headers: { Authorization: token },
      })
      .then((response) => {
        const leaders = response.data;
        dispatch(premiumActions.setLeaders(leaders));
        navigate("/leaderboard");
      })
      .catch((err) => console.log(err));
  };

  const expenseReportHandler = () => {
    navigate('/expense-report');
  };

  const logoutHandler = () => {
    navigate('/login');
    dispatch(authActions.logout());
  }

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/expenses">Expenses</Navbar.Brand>
        {isPremium && (
          <Button variant="outline-primary" onClick={leaderboardHandler}>
            Leaderboard
          </Button>
        )}
        {isPremium && <Button variant="outline-primary" onClick={expenseReportHandler}>Expense report</Button>}
        {!isPremium && (
          <Button variant="outline-primary" onClick={buyPremiumHandler}>
            Buy Premium
          </Button>
        )}
        {isPremium && <Badge>Premium user</Badge>}
      </Container>
      <Button variant="outline-danger" onClick={logoutHandler}>Logout</Button>
    </Navbar>
  );
};

export default NavigationBar;

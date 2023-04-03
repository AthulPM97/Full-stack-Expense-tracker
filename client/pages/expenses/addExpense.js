const expenseForm = document.getElementById("expense-form");
const premiumBtn = document.getElementById("premium-btn");
const premiumBadge = document.getElementById("premium-badge");
const inputAmount = document.getElementById("input-amount");
const inputDescription = document.getElementById("input-description");
const inputCategory = document.getElementById("input-category");
const leaderboardBtn = document.getElementById("leaderboard-btn");
const reportBtn = document.getElementById("report-btn");

const token = localStorage.getItem("token");
const isPremium = JSON.parse(localStorage.getItem("isPremium"));
if (isPremium) {
  premiumBtn.style.display = "none";
  premiumBadge.style.display = "";
  reportBtn.style.display = "";
  leaderboardBtn.style.display = "";
} else {
  const tableBody = document.getElementById("leaderboard-table-body");
  const tr = document.createElement("tr");

  const message = document.createElement("td");
  message.innerText = 'Buy premium to unlock feature :)';

  tr.appendChild(message);
  tableBody.appendChild(tr);
}

//events
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/expense", { headers: { Authorization: token } })
    .then((result) => {
      const data = result.data;
      data.forEach((item, i) => addToList(item, i));
    })
    .catch((err) => console.log(err));
});

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const expenseData = {
    amount: inputAmount.value,
    description: inputDescription.value,
    category: inputCategory.value,
  };

  axios
    .post("http://localhost:3000/expense/add-expense", expenseData, {
      headers: { Authorization: token },
    })
    .then((response) => addToList(response.data))
    .catch((err) => console.log(err));
});

premiumBtn.addEventListener("click", async (e) => {
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
        location.reload();
      },
    };
    const rzp = new Razorpay(options);
    rzp.open();
    e.preventDefault;

    rzp.on("payment.failed", function (response) {
      console.log(response);
      alert("Something went wrong");
    });
  } catch (err) {
    console.log(err);
  }
});

leaderboardBtn.addEventListener("click", (e) => {
  e.preventDefault();
  axios
    .get("http://localhost:3000/premium/leaderboard")
    .then((response) => {
      const leaders = response.data;
      leaders.forEach((item) => {
        addToLeaderTable(item);
      });
    })
    .catch((err) => console.log(err));
});

reportBtn.addEventListener("click", (e) => {
  location.assign("/client/pages/expense-report/report-premium.html");
});

// functions
function addToList(item) {
  const tableBody = document.getElementById("table-body");
  const tr = document.createElement("tr");

  const th = document.createElement("th");
  th.innerText = item.id;
  const amount = document.createElement("td");
  amount.innerText = `Rs. ${item.amount}`;
  const description = document.createElement("td");
  description.innerText = item.description;
  const category = document.createElement("td");
  category.innerText = item.category;

  const buttonTd = document.createElement("td");
  const btn = document.createElement("button");
  btn.innerText = "Delete";
  btn.classList.add("btn-danger");
  btn.addEventListener("click", deleteExpense.bind(null, item.id));
  buttonTd.appendChild(btn);

  tr.append(th, amount, description, category, buttonTd);

  tableBody.append(tr);
}

function deleteExpense(id) {
  axios
    .delete(`http://localhost:3000/expense/delete-expense/${id}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("deleted");
        location.reload();
      }
    })
    .catch((err) => console.log(err));
}

function addToLeaderTable(item) {
  const tableBody = document.getElementById("leaderboard-table-body");
  const tr = document.createElement("tr");

  const name = document.createElement("td");
  name.innerText = item.name;
  const totalAmount = document.createElement("td");
  totalAmount.innerText = item.totalExpense;

  tr.append(name, totalAmount);

  tableBody.appendChild(tr);
}

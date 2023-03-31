const expenseForm = document.getElementById("expense-form");
const premiumBtn = document.getElementById("premium-btn");
const inputAmount = document.getElementById("input-amount");
const inputDescription = document.getElementById("input-description");
const inputCategory = document.getElementById("input-category");

const token = localStorage.getItem("token");

//events
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/expense/check-premium", {
      headers: { Authorization: token },
    })
    .then((response) => {
      const isPremium = response.data.isPremium;
      if (isPremium) {
        premiumBtn.style.display = "none";
      }
    })
    .catch((err) => console.log(err));
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
        alert("You are now a premium user");
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
  console.log(id);
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

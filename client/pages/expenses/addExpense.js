const expenseForm = document.getElementById("expense-form");
const inputAmount = document.getElementById("input-amount");
const inputDescription = document.getElementById("input-description");
const inputCategory = document.getElementById("input-category");

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/expense")
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
    .post("http://localhost:3000/expense/add-expense", expenseData)
    .then((response) => addToList(response.data))
    .catch((err) => console.log(err));
});

function addToList(item, i) {
  const tableBody = document.getElementById("table-body");
  const tr = document.createElement("tr");

  const th = document.createElement("th");
  th.innerText = i + 1;
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
    .delete(`http://localhost:3000/expense/delete-expense/${id}`)
    .then((response) => {
      if (response.status === 200) {
        console.log("deleted");
        location.reload();
      }
    })
    .catch((err) => console.log(err));
}

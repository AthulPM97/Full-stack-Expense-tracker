const expenseForm = document.getElementById("expense-form");
const inputAmount = document.getElementById("input-amount");
const inputDescription = document.getElementById("input-description");
const inputCategory = document.getElementById("input-category");

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/expense")
    .then((result) => {
      const data = result.data;
      data.forEach((item) => addToList(item));
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

function addToList(item) {
  const list = document.getElementById("expenses-list");
  const li = document.createElement("li");

  const amount = document.createElement("p");
  amount.innerText = item.amount;
  const description = document.createElement("p");
  description.innerText = item.description;
  const category = document.createElement("p");
  category.innerText = item.category;

  const btn = document.createElement("button");
  btn.innerText = "Delete";
  btn.classList.add("btn-danger");
  btn.addEventListener("click", deleteExpense.bind(null, item.id));

  li.append(amount, description, category, btn);

  list.append(li);
}

function deleteExpense(id) {
    console.log(id);
  axios
    .delete(`http://localhost:3000/expense/delete-expense/${id}`)
    .then((response) => {
        if(response.status === 200) {
            console.log('deleted');
        }
    })
    .catch((err) => console.log(err));
}

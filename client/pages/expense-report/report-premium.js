const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
  let total;
  axios
    .get("http://localhost:3000/expense", { headers: { Authorization: token } })
    .then((result) => {
      const data = result.data;
      console.log(data);
      data.forEach((item) => addToList(item));
      total = data.reduce((total, item) => total + item.amount, 0);
      makeFooter(total);
    })
    .catch((err) => console.log(err));
});

// functions
function addToList(item) {
  const tableBody = document.getElementById("table-body");
  const tr = document.createElement("tr");

  const th = document.createElement("th");
  const date = new Date(item.createdAt);
  const formattedDate = date.toLocaleDateString('en-GB');
  th.innerText = formattedDate;
  const description = document.createElement("td");
  description.innerText = item.description;
  const category = document.createElement("td");
  category.innerText = item.category;
  const expense = document.createElement("td");
  expense.innerText = item.amount;

  tr.append(th, description, category, expense);

  tableBody.append(tr);
}

function makeFooter(totalAmount) {
  const tableBody = document.getElementById("table-body");

  const footer = document.createElement("tfoot");
  const label = document.createElement("td");
  label.innerText = "total";
  const total = document.createElement("td");
  total.innerText = totalAmount;

  footer.append(label, total);

  tableBody.appendChild(footer);
}

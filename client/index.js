//selectors
const form = document.getElementById("sign-up-form");
const InputName = document.getElementById("input-name");
const InputEmail = document.getElementById("input-email");
const InputPassword = document.getElementById("input-password");

//submit form event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputData = {
    name: InputName.value,
    email: InputEmail.value,
    password: InputPassword.value,
  };
  axios
    .post("http://localhost:3000/user/sign-up", inputData)
    .then((res) => {
      if(res.status === 201) {
        location.replace('/client/pages/expenses/addExpense.html')
      }
    })
    .catch((err) => showError(err.response.data.message));
});

function showError (err) {
  const errorDiv = document.getElementById('error-display');

  const errorText = document.createElement('p');
  errorText.classList.add('error');
  errorText.innerText = err;

  errorDiv.appendChild(errorText);
};
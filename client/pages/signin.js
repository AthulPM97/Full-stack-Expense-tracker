//selectors
const form = document.getElementById("sign-up-form");
console.log(form)
const InputEmail = document.getElementById("input-email");
const InputPassword = document.getElementById("input-password");

//submit form event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputData = {
    email: InputEmail.value,
    password: InputPassword.value,
  };
  axios
    .post("http://localhost:3000/user/login", inputData)
    .then((res) => console.log(res.data))
    .catch((err) => showError(err.response.data.message));
});

function showError (err) {
  const errorDiv = document.getElementById('error-display');

  const errorText = document.createElement('p');
  errorText.classList.add('error');
  errorText.innerText = err;

  errorDiv.appendChild(errorText);
};
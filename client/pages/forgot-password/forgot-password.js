const recoveryForm = document.getElementById("recovery-form");
const inputEmail = document.getElementById('input-email');

recoveryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = {
    email: inputEmail.value
  }
  axios
    .post("http://localhost:3000/password/forgot-password", payload)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});

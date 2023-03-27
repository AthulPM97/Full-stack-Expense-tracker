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
  console.log(inputData);
  axios
    .post("http://localhost:3000/user/sign-up", inputData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

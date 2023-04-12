export const validate = (credentials) => {
  if (credentials.confirmPassword) {
    if (!credentials.email.includes("@")) {
      alert("Enter valid email");
      return false;
    } else if (credentials.password.length < 6) {
      alert("Weak password");
      return false;
    } else if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match!");
      return false;
    } else {
      return true;
    }
  } else {
    if (!credentials.email.includes("@")) {
      alert("Enter valid email");
      return false;
    } else if (credentials.password.length < 5) {
      alert("Enter a valid password");
      return false;
    } else {
      return true;
    }
  }
};

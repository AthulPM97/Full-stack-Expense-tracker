export default function (err) {
    const errorDiv = document.getElementById('error-display');

    const errorText = document.createElement('p');
    errorText.classList.add('error');
    errorText.innerText = err;

    errorDiv.appendChild(errorText);
};
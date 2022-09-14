const formReg = document.getElementById('registerForm');

formReg.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(formReg);
    let obj = {};
    data.forEach((value,key) => obj[key] = value);
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json())
        .then(json => console.log(json))
        .then(window.location.assign('/login'))
})
const formLogIn = document.getElementById('form-logIn');
const invalidUser = document.getElementById('invalidUser')

formLogIn.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(formLogIn);
    let obj = {};
    data.forEach((value,key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(resp => resp.json())
        .then(data => {
            if (data.status === "sucess") window.location.assign('/')
            else {
                invalidUser.setAttribute("style", "visibility: visible");
            }
        })
});
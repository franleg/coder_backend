const formReg = document.getElementById('registerForm');
const errorRegister = document.getElementById('error-register');

formReg.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(formReg);
    let obj = {};
    data.forEach((value,key) => obj[key] = value);
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(resp => resp.json())
        .then(data => {
            if (data.status === "sucess") window.location.assign('/login');
            else window.location.assign('/registerfail');
            /* else {
                errorRegister.setAttribute("style", "visibility: visible");
            } */
        })
})
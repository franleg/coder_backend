let form = document.getElementById('form');

const handleSubmit = (event, form, route) => {
    event.preventDefault();
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value, key) => obj[key] = value);
    fetch(route, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
        .then(res => res.json())
        .then(json =>console.log(json));
}

form.addEventListener('submit', (e) => handleSubmit(e, e.target,'/api/products'))
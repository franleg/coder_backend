let formPost = document.getElementById('form-post');
let formGet = document.getElementById('form-get');
let inputGet = document.getElementById('input-get');
let formDelete = document.getElementById('form-delete');
let inputDelete = document.getElementById('input-delete');
let formPut = document.getElementById('form-put')
let inputPut = document.getElementById('input-put');

formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let obj = {};
    formData.forEach((value, key) => obj[key] = value);
    fetch('/api/products/', { 
        method: 'POST',
        body: formData
    }).then(res => res.json())
      .then (json => console.log(json))
});

formGet.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = inputGet.value;
    fetch (`/api/products/${id}`, {
        method: 'GET'
    }).then(res => res.json())
      .then (json => console.log(json))
});

formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = inputDelete.value;
    fetch (`/api/products/${id}`, {
        method: 'DELETE'
    }).then(res => res.json())
      .then (json => console.log(json))
});

formPut.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = inputPut.value;
    let formData = new FormData(e.target);
    let obj = {};
    formData.forEach((value, key) => obj[key] = value);
    fetch(`/api/products/${id}`, { 
        method: 'PUT',
        body: formData
    }).then(res => res.json())
      .then (json => console.log(json))
});
const cardsContainer = document.getElementById("cards-container");
const addIcon = document.getElementById("add-icon");
const substractIcon = document.getElementById("substract-icon");

// ADD PRODUCT IN CART
cardsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-icon')) {
        let quantity = e.target.previousSibling.previousElementSibling;
        quantity.innerHTML = parseInt(quantity.textContent) + 1;
    }

    if (e.target.classList.contains('substract-icon')) {
        let quantity = e.target.nextSibling.nextElementSibling;
        if (quantity.innerHTML > 1) quantity.innerHTML = parseInt(quantity.textContent) - 1;
    }

    if (e.target.classList.contains('add_cart')) {
        let id = e.target.id;
        let container = e.target.previousSibling.previousElementSibling;
        let quantity = container.childNodes[3].innerHTML;
        let product = {
            id: id,
            quantity: quantity
        };
        fetch('/api/carts', {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => resp.json())
            .then(Toastify({
                text: "Producto Agregado",
                gravity: "bottom",
                backgroundColor: "seagreen",
                className: "info",
            }).showToast())  
    }
})

  
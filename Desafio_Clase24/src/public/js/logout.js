const btnLogOut = document.getElementById('btn-logOut');


btnLogOut.addEventListener('click', () => {
    window.location='http://localhost:8080/logout';
    setTimeout(() => {
        window.location.href = 'http://localhost:8080/login'
    }, 2000);
})
//const formLogin = document.getElementById('form')
const btnLogin = document.getElementById('btnLogin');

const validacion = (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const celular = document.getElementById('celular').value;

    if (!usuario || !password || !celular) {
        alert("Ingrese sus datos");
        return;
    }

    const data = { usuario, password };

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "restaurantes.html";  // Redirige si la autenticación es exitosa
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    })
    .catch(error => console.error('Error:', error));
};

btnLogin.addEventListener('click', validacion);

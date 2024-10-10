const btnLogin = document.getElementById('btn-login');

const validacion = (e) => {
    e.preventDefault();
    const usuario = document.getElementById('usuario');
    const password = document.getElementById('password');
    const celular = document.getElementById('celular');
    if (usuario.value === "") {
        alert("Ingrese sus datos");
        usuario.focus();
        return false;
    }
    if (password.value === "") {
        alert("Ingrese sus datos");
        password.focus();
        return false;
    }
    if (celular.value === "") {
        alert("Ingrese sus datos");
        celular.focus();
        return false;
    }
    
    return true
}

btnLogin.addEventListener('click', validate);
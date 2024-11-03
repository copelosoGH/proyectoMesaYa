document.addEventListener("DOMContentLoaded", () => {
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
          window.location.href = "restaurantes.html";  
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      })
      .catch(error => console.error('Error:', error));
    };
  
    btnLogin?.addEventListener('click', validacion);
    cargarRestaurantes();
  });
  


  async function cargarRestaurantes() {
    try {
      // Cargar los datos del JSON
      const response = await fetch('data/restaurantes.json'); 
      const restaurantes = await response.json();

      // Seleccionar la sección y limpiar su contenido
      const section = document.getElementById('restaurantes');
      section.innerHTML = '';  // Limpiar el contenido previo

      // Crear el contenido HTML para cada restaurante
      restaurantes.forEach(restaurante => {
        const restauranteHTML = `
          <a style="text-decoration: none;" href="${restaurante.ruta}">
            <div class="restaurante">
              <div class="restaurante_imagen"><img src="${restaurante.imagen}" alt="Imagen del restaurante"></div>
              <div class="restaurante_logo"><img src="${restaurante.imagen_logo}" alt="Logo del restaurante"></div>
              <div class="restaurante_nombre"><h2>${restaurante.nombre}</h2></div>
              <div class="restaurante_informacion"><p>${restaurante.info}</p></div>
            </div>
          </a>
        `;
        // Agregar el HTML al contenedor de la sección
        section.innerHTML += restauranteHTML;
      });
    } catch (error) {
      console.error('Error al cargar los restaurantes:', error);
    }
}

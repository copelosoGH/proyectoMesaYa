// Función para obtener el ID del restaurante desde la URL
function obtenerIdRestauranteDesdeURL() {
    const url = window.location.pathname;
    const nombreArchivo = url.substring(url.lastIndexOf('/') + 1);
    return nombreArchivo.split('.')[0];
}

// Función para cargar las mesas del restaurante específico
async function cargarMesas() {
    try {
        const idRestaurante = obtenerIdRestauranteDesdeURL(); // Obtener el ID desde la URL

        // Cargar el JSON de mesas
        const response = await fetch('data/mesas.json'); // Asegúrate de que la ruta sea correcta
        const locales = await response.json();

        // Buscar el restaurante con el ID obtenido
        const local = locales.find(local => local.id === idRestaurante);

        if (local) {
            // Seleccionar la sección donde se mostrarán las mesas
            const section = document.getElementById('mesas');
            section.innerHTML = ''; // Limpiar contenido previo

            // Crear elementos HTML para cada mesa
            local.mesas.forEach(mesa => {
                const mesaDiv = document.createElement('div');
                mesaDiv.classList.add('mesa');
                mesaDiv.textContent = `Capacidad: ${mesa.capacidad}`;
                mesaDiv.style.backgroundColor = mesa.estado === 'disponible' ? 'green' : 'red';
                section.appendChild(mesaDiv);
            });
        } else {
            console.error("No se encontró el restaurante con el ID especificado.");
        }
    } catch (error) {
        console.error('Error al cargar las mesas:', error);
    }
}

// Llamada a la función para cargar las mesas al cargar la página
cargarMesas();

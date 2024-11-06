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

                var seleccion = false;
                
                // Establecer color según el estado inicial
                mesaDiv.style.backgroundColor = mesa.estado === 'disponible' ? 'green' : 'red';

                // Agregar evento click si la mesa está disponible
                mesaDiv.addEventListener('click', () => {
                    if (mesa.estado === 'disponible') {
                        mesaDiv.style.backgroundColor = 'orange';
                        mesa.estado = 'seleccionada';
                    } else if (mesa.estado === 'seleccionada') {
                        mesaDiv.style.backgroundColor = 'green';
                        mesa.estado = 'disponible';
                    }
                });

                section.appendChild(mesaDiv);
            });

            // Almacenar mesas en el objeto `local` para acceso en otras funciones
            local.mesasDiv = section.querySelectorAll('.mesa');

            // Asignar evento de confirmación al botón
            document.querySelector('.btnReservar').addEventListener('click', () => confirmarReserva(local));
        } else {
            console.error("No se encontró el restaurante con el ID especificado.");
        }
    } catch (error) {
        console.error('Error al cargar las mesas:', error);
    }
}

// Función para confirmar la reserva de mesas seleccionadas
function confirmarReserva(local) {
    let seleccion = false;
    const popupMensaje = document.getElementById('popupMensaje');

    local.mesas.forEach((mesa, index) => {
        if (mesa.estado === 'seleccionada') {
            seleccion = true;
            mesa.estado = 'ocupada';
            local.mesasDiv[index].style.backgroundColor = 'red';

            // Posicionar el pop-up dentro de la mesa seleccionada
            const mesaDiv = local.mesasDiv[index];
            mesaDiv.appendChild(popupMensaje); // Mueve el pop-up dentro de la mesa
        }
    });

    if (seleccion) {
        popupMensaje.textContent = "¡Su mesa ha sido reservada!";
        popupMensaje.classList.add('mostrar');
        setTimeout(() => {
            popupMensaje.classList.remove('mostrar');
        }, 2000); // Oculta el pop-up después de 2 segundos
    } else {
        popupMensaje.textContent = "Mesa ocupada, pruebe con otra.";
        popupMensaje.classList.add('mostrar');
        setTimeout(() => {
            popupMensaje.classList.remove('mostrar');
        }, 2000);
    }
    
}

// Llamada a la función para cargar las mesas al cargar la página
cargarMesas();

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

                var seleccion = false; //------------------------------------------------------
                
                // Establecer color según el estado inicial
                mesaDiv.style.backgroundColor = mesa.estado === 'disponible' ? 'green' : 'red';

                // Agregar evento click si la mesa está disponible
                if (mesa.estado === 'disponible') {
                    mesaDiv.addEventListener('click', () => {
                        // Cambiar estado visual a "ocupado" y color a rojo
                        mesaDiv.style.backgroundColor = 'orange';
                        mesa.estado = 'seleccionada'; // Actualiza el estado en el objeto si es necesario
                    });
                }
                if (mesa.estado === 'seleccionada') {
                    mesaDiv.addEventListener('click', () => {
                        mesaDiv.style.backgroundColor = 'green';
                        mesa.estado = 'disponible';
                    });
                }
                if (mesa.estado === 'ocupada') {
                    mesaDiv.addEventListener('click', () => {
                        alert("Esta mesa está ocupada, pruebe con otra.")
                    });
                }

                /*    FALTA CORREGIRRRRRR -----------------------------------------------------------------------------

                // Una vez terminada la selección de mesa, esta se debe confuirmar (Falta editar la logica)
                // Primero se confirma de que hay al menos una mesa seleccionada
                for (let i=0; i<json.mesas.length; i++) {
                    if (mesa.estado === 'seleccionada'){
                        var seleccion = true;
                }

                if (seleccion){
                    // acá se debería agregar el boton de confirmar para cambiar el estado de la mesa
                } else {
                    alert("No hay ninguna mesa seleccionada");
                }

                */


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



// Confirmación de la mesa seleccionada
function confirmarReserva(){
    let seleccion = false;

    for (let i=0; i<json.mesas.length; i++) {
        if (mesa.estado === 'seleccionada'){
            seleccion = true;
        }
    }
    if (seleccion){
        // acá se debería agregar el boton de confirmar para cambiar el estado de la mesa
        for (let i=0; i<json.mesas.length; i++) {
            if (mesa.estado === 'seleccionada'){
                mesa.estado === 'ocupada';
                mesaDiv.style.backgroundColor = 'red';
            }
        }
        alert("Mesa reservada con éxito!")
    } else {
        alert("No hay ninguna mesa seleccionada");
    }
}

window.onload = function() {
    const botonReservar = document.querySelector('.btnReservar');
    botonReservar.addEventListener('click', confirmarReserva);
};

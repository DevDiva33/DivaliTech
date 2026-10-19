// ==========================================================================
// PRÁCTICA 3: INTERACTIVIDAD Y LÓGICA CON JAVASCRIPT (VANILLA JS)
// ==========================================================================

// Evento que espera a que todo el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------------------------------------------------
    // 1. Mensaje de bienvenida emergente (alert) al cargar la página
    // ----------------------------------------------------------------------
    alert("¡Bienvenido al portal oficial de DivaliTech! Explora nuestros servicios tecnológicos.");

    // ----------------------------------------------------------------------
    // 2. Reloj dinámico en tiempo real (Formato 12 horas con AM/PM) en el header
    // ----------------------------------------------------------------------
    // Crear un elemento donde se mostrará el reloj y agregarlo al header
    const header = document.querySelector("header");
    const contenedorReloj = document.createElement("p");
    contenedorReloj.id = "reloj-dinamico";
    contenedorReloj.style.fontWeight = "bold";
    contenedorReloj.style.color = "#d8f3dc";
    contenedorReloj.style.marginTop = "10px";
    header.appendChild(contenedorReloj);

    // Función que calcula y actualiza la hora
    function actualizarReloj() {
        const ahora = new Date();
        let horas = ahora.getHours();
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        const segundos = String(ahora.getSeconds()).padStart(2, '0');
        const ampm = horas >= 12 ? 'PM' : 'AM';

        // Convertir formato de 24 horas a 12 horas
        horas = horas % 12;
        horas = horas ? horas : 12; // La hora '0' se representa como '12'
        const horasFormateadas = String(horas).padStart(2, '0');

        contenedorReloj.innerText = `Hora actual: ${horasFormateadas}:${minutos}:${segundos} ${ampm}`;
    }

    // Ejecutar inmediatamente y configurar intervalo de 1 segundo (1000 ms)
    actualizarReloj();
    setInterval(actualizarReloj, 1000);

    // ----------------------------------------------------------------------
    // 3. Detectar cuando el usuario selecciona un servicio del menú desplegable (<select>)
    // ----------------------------------------------------------------------
    const selectServicio = document.getElementById("servicio");
    if (selectServicio) {
        selectServicio.addEventListener("change", (e) => {
            const servicioSeleccionado = e.target.options[e.target.selectedIndex].text;
            if (e.target.value !== "") {
                console.log(`[EVENTO SELECT] El usuario seleccionó: ${servicioSeleccionado}`);
                alert(`Has seleccionado el servicio: ${servicioSeleccionado}`);
            }
        });
    }

    // ----------------------------------------------------------------------
    // 4. Detectar eventos del mouse (mouseover / mouseleave) en los botones
    // ----------------------------------------------------------------------
    const botones = document.querySelectorAll("button, .boton");
    botones.forEach((boton) => {
        boton.addEventListener("mouseover", () => {
            console.log(`[EVENTO MOUSEOVER] El cursor está sobre el botón: ${boton.innerText}`);
        });

        boton.addEventListener("mouseleave", () => {
            console.log(`[EVENTO MOUSELEAVE] El cursor salió del botón: ${boton.innerText}`);
        });
    });

    // ----------------------------------------------------------------------
    // 5, 6 y 7. Validación, Confirmación y Persistencia en localStorage
    // ----------------------------------------------------------------------
    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            // Evitar que la página se recargue automáticamente
            e.preventDefault();

            // Obtener valores de los campos
            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const servicio = document.getElementById("servicio").value;
            const mensaje = document.getElementById("mensaje").value.trim();

            // 5. Validar que ningún campo esté vacío
            if (nombre === "" || correo === "" || telefono === "" || servicio === "" || mensaje === "") {
                alert("⚠️ Error: Por favor completa todos los campos del formulario antes de enviar.");
                return; // Interrumpe el envío
            }

            // Crear objeto con los datos recolectados
            const datosContacto = {
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                servicio: servicio,
                mensaje: mensaje,
                fechaEnvio: new Date().toLocaleString()
            };

            // 7. Guardar información en localStorage mediante serialización JSON
            localStorage.setItem("registroContactoDivaliTech", JSON.stringify(datosContacto));
            console.log("[LOCALSTORAGE] Datos guardados con éxito:", datosContacto);

            // 6. Mostrar mensaje de confirmación interactivo
            alert(`¡Gracias por contactarnos, ${nombre}! Tu solicitud para el servicio ha sido registrada exitosamente.`);

            // Limpiar los campos del formulario tras el envío exitoso
            formulario.reset();
        });
    }
});
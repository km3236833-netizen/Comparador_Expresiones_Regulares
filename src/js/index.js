
/* ==========================================
   1. IMPORTACIÓN DE LIBRERÍAS Y ESTILOS
========================================== */

// Importar Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importar Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Importar SweetAlert2
import Swal from 'sweetalert2';

// Importar CSS del proyecto
import '../css/styles.css';


/* ==========================================
   2. ESPERAR A QUE CARGUE EL HTML
========================================== */

document.addEventListener('DOMContentLoaded', () => {


    /* ==========================================
       3. SELECCIONAR ELEMENTOS DEL HTML
    ========================================== */

    // Campo de expresión regular
    const expresionInput = document.querySelector('#expresion');

    // Campo de texto
    const textoInput = document.querySelector('#texto');

    // Botón comparar
    const btnComparar = document.querySelector('#btnComparar');

    // Botón limpiar
    const btnLimpiar = document.querySelector('#btnLimpiar');

    // Sección de resultados
    const resultado = document.querySelector('#resultado');

    // Cantidad de coincidencias
    const cantidad = document.querySelector('#cantidad');

    // Texto con coincidencias
    const coincidencias = document.querySelector('#coincidencias');


    /* ==========================================
       4. VALIDAR ELEMENTOS DEL HTML
    ========================================== */

    // Comprobar que todos los elementos existan
    if (
        !expresionInput ||
        !textoInput ||
        !btnComparar ||
        !btnLimpiar ||
        !resultado ||
        !cantidad ||
        !coincidencias
    ) {

        console.error(
            'Error: No se encontraron todos los elementos del HTML.'
        );

        return;
    }


    /* ==========================================
       5. FUNCIÓN PARA ESCAPAR HTML
    ========================================== */

    // Evitar que el texto introducido se interprete como HTML
    const escaparHTML = (texto) => {

        return texto.replace(/[&<>"']/g, (caracter) => {

            const entidades = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };

            return entidades[caracter];

        });

    };


    /* ==========================================
       6. FUNCIÓN PARA COMPARAR
    ========================================== */

    const comparar = () => {

        // Obtener los valores de los campos
        const expresion = expresionInput.value.trim();

        const texto = textoInput.value;

        // Validar campos vacíos
        if (!expresion || !texto.trim()) {

            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Debes ingresar una expresión regular y un texto.',
                confirmButtonText: 'Entendido'
            });

            return;
        }

        try {

            // Crear la expresión regular
            const regex = new RegExp(expresion, 'gi');

            // Buscar todas las coincidencias
            const encontrados = [...texto.matchAll(regex)];

            // Comprobar si existen coincidencias
            if (encontrados.length === 0) {

                // Ocultar resultados anteriores
                resultado.classList.add('d-none');

                Swal.fire({
                    icon: 'info',
                    title: 'Sin coincidencias',
                    text: 'No se encontraron coincidencias en el texto.',
                    confirmButtonText: 'Aceptar'
                });

                return;
            }


            /* ==========================================
               7. RESALTAR COINCIDENCIAS
            ========================================== */

            // Variable para construir el resultado
            let textoResaltado = '';

            // Posición inicial del texto
            let posicion = 0;

            // Recorrer todas las coincidencias
            encontrados.forEach((coincidencia) => {

                // Posición donde comienza la coincidencia
                const inicio = coincidencia.index;

                // Posición donde termina
                const fin = inicio + coincidencia[0].length;

                // Agregar el texto anterior a la coincidencia
                textoResaltado += escaparHTML(
                    texto.substring(posicion, inicio)
                );

                // Agregar la coincidencia resaltada
                textoResaltado += `<mark>${escaparHTML(
                    coincidencia[0]
                )}</mark>`;

                // Actualizar la posición
                posicion = fin;

            });

            // Agregar el texto restante
            textoResaltado += escaparHTML(
                texto.substring(posicion)
            );


            /* ==========================================
               8. MOSTRAR RESULTADOS
            ========================================== */

            // Mostrar la sección de resultados
            resultado.classList.remove('d-none');

            // Mostrar cantidad de coincidencias
            cantidad.textContent = encontrados.length;

            // Mostrar texto resaltado
            coincidencias.innerHTML = textoResaltado;

            // Mostrar alerta de éxito
            Swal.fire({
                icon: 'success',
                title: 'Comparación completada',
                text: `Se encontraron ${encontrados.length} coincidencias.`,
                confirmButtonText: 'Aceptar'
            });

        } catch (error) {

            // Capturar errores de expresiones regulares
            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'Expresión regular inválida',
                text: 'Verifica que la sintaxis de tu expresión regular sea correcta.',
                confirmButtonText: 'Corregir'
            });

        }

    };


    /* ==========================================
       9. FUNCIÓN PARA LIMPIAR
    ========================================== */

    const limpiar = () => {

        // Vaciar el campo de expresión regular
        expresionInput.value = '';

        // Vaciar el campo de texto
        textoInput.value = '';

        // Ocultar resultados
        resultado.classList.add('d-none');

        // Restablecer la cantidad
        cantidad.textContent = '0';

        // Eliminar coincidencias anteriores
        coincidencias.textContent = '';

        // Mostrar alerta
        Swal.fire({
            icon: 'success',
            title: 'Pantalla limpia',
            text: 'Los campos y resultados se han limpiado correctamente.',
            timer: 1500,
            showConfirmButton: false
        });

    };


    /* ==========================================
       10. EVENTOS DE LOS BOTONES
    ========================================== */

    // Ejecutar comparación al hacer clic
    btnComparar.addEventListener('click', comparar);

    // Limpiar pantalla al hacer clic
    btnLimpiar.addEventListener('click', limpiar);


    /* ==========================================
       11. MENSAJE DE INICIO
    ========================================== */

    console.log('Comparador ER iniciado correctamente.');

});

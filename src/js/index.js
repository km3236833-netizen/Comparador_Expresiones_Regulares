


// Importa los estilos CSS de Bootstrap.
// Bootstrap proporciona clases prediseñadas para crear
// interfaces, botones, formularios, contenedores, etc.
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa el archivo JavaScript de Bootstrap.
// Permite utilizar componentes interactivos de Bootstrap,
// como menús desplegables, ventanas modales y otros.
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importa los estilos de Font Awesome.
// Esta biblioteca permite utilizar iconos en la interfaz
// mediante clases CSS.
import '@fortawesome/fontawesome-free/css/all.min.css';

// Importa SweetAlert2 y lo almacena en la variable Swal.
// Se utiliza para mostrar alertas personalizadas al usuario.
import Swal from 'sweetalert2';

// Importa los estilos CSS creados para este proyecto.
// Aquí se definen los colores, tamaños, espacios y diseño
// personalizado de la aplicación.
import '../css/styles.css';



// addEventListener() permite detectar eventos del navegador.
// DOMContentLoaded se ejecuta cuando el documento HTML
// ya fue analizado y sus elementos están disponibles.
// La función flecha () => contiene las instrucciones
// que se ejecutarán después de que cargue el documento.
document.addEventListener('DOMContentLoaded', () => {


    

    // document representa el documento HTML actual.
    // querySelector() busca un elemento utilizando un selector CSS.
    // El símbolo # indica que se está buscando un elemento por su ID.

    // Selecciona el campo donde el usuario escribe la expresión regular.
    // La referencia al elemento se guarda en expresionInput.
    const expresionInput = document.querySelector('#expresion');

    // Selecciona el campo donde el usuario escribe el texto
    // en el que desea buscar coincidencias.
    const textoInput = document.querySelector('#texto');

    // Selecciona el botón encargado de iniciar la comparación.
    const btnComparar = document.querySelector('#btnComparar');

    // Selecciona el botón que permite limpiar los campos
    // y eliminar los resultados anteriores.
    const btnLimpiar = document.querySelector('#btnLimpiar');

    // Selecciona el contenedor HTML donde se muestran los resultados.
    const resultado = document.querySelector('#resultado');

    // Selecciona el elemento donde se muestra el número
    // total de coincidencias encontradas.
    const cantidad = document.querySelector('#cantidad');

    // Selecciona el elemento donde se presenta el texto
    // con las coincidencias resaltadas.
    const coincidencias = document.querySelector('#coincidencias');


 

    // if permite evaluar una condición.
    // El operador ! significa negación: comprueba si un valor
    // es falso, nulo o no existe.
    // El operador || significa OR (O lógico).
    // Si falta cualquiera de los elementos, se ejecuta el bloque.

    if (
        !expresionInput ||
        !textoInput ||
        !btnComparar ||
        !btnLimpiar ||
        !resultado ||
        !cantidad ||
        !coincidencias
    ) {

        // console.error() muestra un mensaje de error
        // en la consola del navegador.
        console.error(
            'Error: No se encontraron todos los elementos del HTML.'
        );

        // return detiene la ejecución de la función actual.
        // Evita que el programa continúe si faltan elementos HTML.
        return;
    }



    // const declara una variable que no puede reasignarse.
    // escaparHTML es una función flecha que recibe un parámetro
    // llamado texto.
    // Su objetivo es sustituir caracteres especiales por
    // entidades HTML para evitar que se interpreten como etiquetas.
    const escaparHTML = (texto) => {

        // replace() busca caracteres que coincidan con la expresión
        // regular y los reemplaza por el valor correspondiente.
        // Los caracteres g e i significan búsqueda global
        // y sin distinción entre mayúsculas y minúsculas.
        // En este caso se utiliza g para reemplazar todas
        // las apariciones de los caracteres indicados.
        return texto.replace(/[&<>"']/g, (caracter) => {

            // Se crea un objeto llamado entidades.
            // Cada propiedad relaciona un carácter especial
            // con su representación segura en HTML.
            const entidades = {

                // Representación HTML del símbolo ampersand.
                '&': '&amp;',

                // Representación HTML del símbolo menor que.
                '<': '&lt;',

                // Representación HTML del símbolo mayor que.
                '>': '&gt;',

                // Representación HTML de las comillas dobles.
                '"': '&quot;',

                // Representación HTML de las comillas simples.
                "'": '&#039;'
            };

            // Devuelve la entidad HTML correspondiente
            // al carácter que encontró replace().
            return entidades[caracter];

        });

    };




    // Se declara la función comparar mediante const
    // y una función flecha.
    // Esta función contiene el procedimiento principal
    // para buscar coincidencias en el texto.
    const comparar = () => {

        // .value obtiene el contenido escrito en el campo HTML.
        // .trim() elimina los espacios en blanco del principio
        // y del final de la expresión regular.
        // const almacena el resultado en la variable expresion.
        const expresion = expresionInput.value.trim();

        // Obtiene el texto completo introducido por el usuario.
        // No utiliza trim() porque necesitamos conservar
        // los espacios y saltos de línea del texto original.
        const texto = textoInput.value;


        // VALIDACIÓN DE CAMPOS VACÍOS

        // El operador ! comprueba si la expresión está vacía.
        // texto.trim() elimina temporalmente los espacios externos
        // para comprobar si realmente existe contenido.
        // || significa que basta con que uno de los campos
        // esté vacío para ejecutar la condición.
        if (!expresion || !texto.trim()) {

            // Swal.fire() pertenece a SweetAlert2.
            // Permite mostrar una ventana emergente personalizada.
            Swal.fire({

                // icon establece el tipo de icono de la alerta.
                icon: 'warning',

                // title establece el título de la ventana.
                title: 'Campos incompletos',

                // text contiene el mensaje que verá el usuario.
                text: 'Debes ingresar una expresión regular y un texto.',

                // confirmButtonText establece el texto del botón.
                confirmButtonText: 'Entendido'
            });

            // Detiene la función para evitar una comparación
            // cuando los campos no contienen información.
            return;
        }


        // CONTROL DE ERRORES

        // try contiene las instrucciones que pueden producir
        // un error durante la ejecución.
        // Si ocurre un error, el programa pasa al bloque catch.
        try {

            // CREAR LA EXPRESIÓN REGULAR

            // new RegExp() construye un objeto de expresión regular.
            // expresion contiene el patrón escrito por el usuario.
            // 'gi' establece dos indicadores:
            // g = búsqueda global, encuentra todas las coincidencias.
            // i = ignora diferencias entre mayúsculas y minúsculas.
            const regex = new RegExp(expresion, 'gi');


            // BUSCAR TODAS LAS COINCIDENCIAS

            // matchAll() busca todas las coincidencias del patrón
            // dentro del texto y devuelve un iterador.
            // El operador spread (...) convierte ese iterador
            // en un arreglo para facilitar su recorrido.
            const encontrados = [...texto.matchAll(regex)];


            // COMPROBAR SI EXISTEN COINCIDENCIAS

            // length devuelve la cantidad de elementos del arreglo.
            // === compara si el número de coincidencias es exactamente 0.
            if (encontrados.length === 0) {

                // classList permite manipular las clases CSS.
                // add() agrega la clase d-none.
                // d-none es una clase de Bootstrap que oculta el elemento.
                // Se utiliza para ocultar los resultados anteriores.
                resultado.classList.add('d-none');

                // Muestra una alerta informando que no hubo resultados.
                Swal.fire({

                    // icon establece el icono informativo.
                    icon: 'info',

                    // title establece el título de la alerta.
                    title: 'Sin coincidencias',

                    // text explica que no se encontraron resultados.
                    text: 'No se encontraron coincidencias en el texto.',

                    // Texto que aparece en el botón de confirmación.
                    confirmButtonText: 'Aceptar'
                });

                // Detiene la función porque no existen coincidencias
                // que puedan resaltarse.
                return;
            }


         

            // let declara una variable cuyo contenido puede cambiar.
            // Se inicializa con una cadena vacía.
            // Aquí se irá construyendo el texto que se mostrará.
            let textoResaltado = '';

            // Almacena la posición desde la que se continuará
            // recorriendo el texto original.
            // Comienza en 0 porque los índices de las cadenas
            // de JavaScript empiezan desde cero.
            let posicion = 0;


            // forEach() recorre cada elemento del arreglo encontrados.
            // En cada repetición, coincidencia representa
            // una coincidencia individual encontrada.
            encontrados.forEach((coincidencia) => {

                // coincidencia.index indica la posición inicial
                // donde comienza el fragmento encontrado.
                const inicio = coincidencia.index;

                // coincidencia[0] contiene el texto completo
                // que coincidió con la expresión regular.
                // length obtiene la cantidad de caracteres encontrados.
                // Se suma esa longitud a inicio para calcular
                // la posición final de la coincidencia.
                const fin = inicio + coincidencia[0].length;


                // AGREGAR EL TEXTO ANTERIOR A LA COINCIDENCIA

                // += agrega contenido al final de la variable
                // textoResaltado sin reemplazar lo que ya tenía.
                // substring(posicion, inicio) obtiene el fragmento
                // del texto que está antes de la coincidencia.
                // escaparHTML() protege los caracteres especiales
                // antes de agregar ese contenido.
                textoResaltado += escaparHTML(
                    texto.substring(posicion, inicio)
                );


                // AGREGAR LA COINCIDENCIA RESALTADA

                // Se utiliza una plantilla literal con acentos graves (`).
                // ${} permite insertar expresiones o variables dentro
                // de una cadena de texto.
                // La etiqueta <mark> permite resaltar visualmente
                // el fragmento encontrado en el navegador.
                // escaparHTML() protege el contenido de la coincidencia.
                textoResaltado += `<mark>${escaparHTML(
                    coincidencia[0]
                )}</mark>`;


                // ACTUALIZAR LA POSICIÓN

                // Guarda la posición final de la coincidencia actual.
                // Así, en la siguiente repetición, el programa
                // continuará desde donde terminó el fragmento anterior.
                posicion = fin;

            });


            // AGREGAR EL TEXTO RESTANTE

            // substring(posicion) obtiene el contenido que queda
            // desde la última posición procesada hasta el final.
            // escaparHTML() protege ese contenido.
            // += lo agrega al texto resaltado que se construyó.
            textoResaltado += escaparHTML(
                texto.substring(posicion)
            );


       
            // remove() elimina la clase d-none.
            // De esta forma, el contenedor de resultados vuelve
            // a ser visible en la página.
            resultado.classList.remove('d-none');

            // textContent modifica el contenido de texto del elemento.
            // encontrados.length obtiene el número total de coincidencias.
            // Se asigna ese número al contador de resultados.
            cantidad.textContent = encontrados.length;

            // innerHTML permite insertar contenido HTML dentro
            // del elemento seleccionado.
            // Se utiliza para mostrar el texto que contiene
            // las etiquetas <mark> encargadas del resaltado.
            cantidad.textContent = encontrados.length;
            coincidencias.innerHTML = textoResaltado;


            // ALERTA DE ÉXITO

            // SweetAlert2 muestra una notificación indicando
            // que la comparación se realizó correctamente.
            Swal.fire({

                // icon establece el icono de éxito.
                icon: 'success',

                // title establece el título de la alerta.
                title: 'Comparación completada',

                // La plantilla literal permite insertar
                // el número de coincidencias usando ${}.
                text: `Se encontraron ${encontrados.length} coincidencias.`,

                // Texto del botón para cerrar la alerta.
                confirmButtonText: 'Aceptar'
            });


        // CAPTURAR ERRORES

        // catch recibe el error producido dentro del bloque try.
        // La variable error contiene información sobre el problema.
        } catch (error) {

            // Muestra los detalles técnicos del error
            // en la consola del navegador.
            console.error(error);

            // Muestra una alerta para informar al usuario
            // que la expresión regular no tiene una sintaxis válida.
            Swal.fire({

                // icon establece el icono de error.
                icon: 'error',

                // title establece el título de la alerta.
                title: 'Expresión regular inválida',

                // text explica qué debe revisar el usuario.
                text: 'Verifica que la sintaxis de tu expresión regular sea correcta.',

                // Texto del botón para cerrar la alerta.
                confirmButtonText: 'Corregir'
            });

        }

    };


 
    // Se declara la función limpiar mediante const.
    // Su objetivo es restablecer los campos y resultados
    // para permitir realizar una nueva comparación.
    const limpiar = () => {

        // value permite modificar el contenido de un campo HTML.
        // Se asigna una cadena vacía para borrar la expresión regular.
        expresionInput.value = '';

        // Borra el texto que el usuario había introducido.
        textoInput.value = '';

        // Agrega la clase d-none para ocultar la sección
        // donde se muestran los resultados.
        resultado.classList.add('d-none');

        // textContent modifica el texto del contador.
        // Se restablece en 0 porque todavía no hay resultados.
        cantidad.textContent = '0';

        // textContent vacío elimina el contenido anterior
        // del elemento donde se muestran las coincidencias.
        coincidencias.textContent = '';


        // MOSTRAR ALERTA DE LIMPIEZA

        // Swal.fire() muestra una notificación de éxito.
        Swal.fire({

            // icon establece el icono de éxito.
            icon: 'success',

            // title establece el título de la alerta.
            title: 'Pantalla limpia',

            // text informa que los campos fueron limpiados.
            text: 'Los campos y resultados se han limpiado correctamente.',

            // timer establece el tiempo de duración de la alerta.
            // 1500 equivale a 1500 milisegundos, es decir, 1.5 segundos.
            timer: 1500,

            // false indica que no se mostrará el botón de confirmación.
            showConfirmButton: false
        });

    };




    // addEventListener() registra un evento en un elemento HTML.
    // 'click' indica que la acción se realizará cuando
    // el usuario presione el botón.
    // comparar es la función que se ejecutará.
    btnComparar.addEventListener('click', comparar);

    // Registra un evento click en el botón Limpiar.
    // Cuando el usuario lo presione, se ejecutará limpiar().
    btnLimpiar.addEventListener('click', limpiar);


 
    // console.log() muestra un mensaje informativo
    // en la consola del navegador.
    // Permite comprobar que el código terminó de inicializarse.
    console.log('Comparador ER iniciado correctamente.');


// Cierra la función flecha y el evento DOMContentLoaded.
// Todas las instrucciones anteriores se ejecutan después
// de que el documento HTML haya sido analizado.
});

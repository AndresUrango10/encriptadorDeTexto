// Seleccionamos los elementos del HTML que vamos a usar en el JavaScript
const textArea = document.querySelector(".caja_texto");
const mensaje = document.querySelector(".mensaje");
const resultado = document.querySelector(".resultado");
const presentacion = document.querySelector(".presentacion");
const botonEncriptar = document.getElementById("boton_encriptador");
const botonDesencriptar = document.getElementById("boton_desencriptar");
const botonCopiar = document.getElementById("boton_copiar");

// Matriz para encriptar y desencriptar
const matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

// Función que maneja el texto según si se va a encriptar o desencriptar
function manejarTexto(accion) {
    const texto = textArea.value.trim().toLowerCase(); // Obtenemos el texto y lo convertimos a minúsculas

    // Validar que el texto no tenga caracteres especiales ni números
    if (!/^[a-z\s]+$/.test(texto)) {
        msg({
            theme: 'error',
            title: 'ERROR',
            text: 'Solo se permiten letras minúsculas y espacios.'
        })
        return; // Si el texto tiene caracteres no permitidos, mostramos un mensaje y salimos de la función
    }

    let textoTransformado;

    // Elegimos la acción a realizar
    if (accion === "encriptar") {
        textoTransformado = transformarTexto(texto, true);
    } else {
        textoTransformado = transformarTexto(texto, false);
    }

    // Mostramos el resultado y ocultamos la presentación inicial
    mensaje.value = textoTransformado;
    presentacion.style.display = "none";
    resultado.style.display = "flex";
    textArea.value = ""; // Limpiamos el área de texto
}

// Función que transforma el texto según la acción (encriptar o desencriptar)
function transformarTexto(texto, encriptar) {
    for (let i = 0; i < matrizCodigo.length; i++) {
        const letra = matrizCodigo[i][0];
        const codigo = matrizCodigo[i][1];

        if (encriptar) {
            texto = texto.replaceAll(letra, codigo);
        } else {
            texto = texto.replaceAll(codigo, letra);
        }
    }
    return texto; // Retornamos el texto transformado

}

// Función que copia el texto en el portapapeles
function copiarTexto() {
    navigator.clipboard.writeText(mensaje.value)
        .then(() => {
            botonCopiar.innerHTML = "Copiado";
            setTimeout(() => {
                botonCopiar.innerHTML = "Copiar";
            }, 1000);
        });

    mensaje.value = "";

    msg({
        theme: 'success',
        text: "Texto Copiado",
        cancelBTN: false,
        duration: 2000,
        position: 'top-center'
    })
}

// Agregamos los eventListeners para los botones
botonEncriptar.addEventListener("click", () => manejarTexto("encriptar"));
botonDesencriptar.addEventListener("click", () => manejarTexto("desencriptar"));
botonCopiar.addEventListener("click", copiarTexto);

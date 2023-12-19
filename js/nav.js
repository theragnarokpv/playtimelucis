$(document).ready(function() {

    obtenerInformacionInicioSesion(function(loggedIn) {
        if (loggedIn) {

            // Mostrar botón de cerrar sesión
            $('.topnav').append('<a href="Perfil.html">PERFIL</a>');

            $('.login, .register').hide();
            $('.topnav').append('<button id="cerrarSesion" class="register">CERRAR SESIÓN</button>');

            // Asociar evento click al botón de cerrar sesión
            $('#cerrarSesion').on('click', function() {
                cerrarSesion();
            });
        }
    });
});

// Función para obtener información de inicio de sesión
function obtenerInformacionInicioSesion(callback) {
    // Realizar la solicitud Ajax
    $.ajax({
        url: 'include/functions/verificarsesion.php',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                callback(true);
            } else {
                callback(false);
            }
        },
        error: function(error) {
            console.log('Error en la solicitud Ajax: ', error);
            callback(false); // En caso de error, consideramos que el usuario no ha iniciado sesión
        }
    });
}


function cerrarSesion() {
    // Realizar la solicitud Ajax
    $.ajax({
        url: 'include/functions/cerrar_sesion.php',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                // Redirigir a la página de inicio
                window.location.href = 'index.html';
            } else {
                console.error('Error al cerrar sesión: ', response.message);
            }
        },
        error: function(error) {
            console.log('Error en la solicitud Ajax: ', error);
        }
    });
}
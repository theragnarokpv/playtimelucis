function iniciarSesion() {
    var correo = document.getElementById("CorreoUsuario").value;
    var contrasena = document.getElementById("ContrasenaUsuario").value;

    // Realizar la solicitud Ajax
    $.ajax({
        url: 'include/functions/iniciar_sesion.php',
        type: 'POST',
        dataType: 'json',
        data: {
            correo: correo,
            contrasena: contrasena
        },
        success: function(response) {
            if (response.success) {
                alert('Inicio de sesión exitoso');
                window.location.href = 'index.html';
            } else {
                alert('Inicio de sesión fallido. Verifica tus credenciales.');
                location.reload();
            }
        },
        error: function(error) {
            console.log('Error en la solicitud Ajax: ', error);
        }
    });
}


function registrar(){
    var nombre = document.getElementById("NombreUsuario").value;
    var apellido = document.getElementById("ApellidoUsuario").value;
    var correo = document.getElementById("CorreoUsuario").value;
    var celular = document.getElementById("NumeroUsuario").value;
    var rol = document.getElementById("RolUsuario").value;
    var contrasena = document.getElementById("ContraUsuario").value;


    $.ajax({
        url: 'include/functions/registrar.php',
        type: 'POST',
        dataType: 'json',
        data: {
            rol: rol,
            contrasena: contrasena,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            celular: celular
        },

        success: function(response) {
            if (response.success) {
                alert('Registro exitoso');
                window.location.href = 'iniciarSesion.html';
            } else {
                alert('Registro fallido. Datos no ingresados correctamente.');
                location.reload();
            }
        },
        error: function(error) {
            console.log('Error en la solicitud Ajax: ', error);
        }
    });

}

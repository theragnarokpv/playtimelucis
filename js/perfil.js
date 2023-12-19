$(document).ready(function() {
    function cargarPerfil() {
        $.ajax({
            url: 'include/functions/getperfil.php',
            dataType: 'json',
            success: function(data) {
                // Rellenar la información del perfil
                if(data.id_rol == 2) {
                    rol = 'Comprador'
                } else if (data.id_rol == 3) {
                    rol = 'Vendedor'
                } else  if (data.id_rol == 1 ){
                    rol = 'Administrador'
                }

                $('#InfoPerfil').html(
                    '<li><strong>Nombre:</strong> ' + data.nombre + '</li>' +
                    '<li><strong>Apellido:</strong> ' + data.apellidos + '</li>' +
                    '<li><strong>Correo:</strong> ' + data.correo + '</li>' +
                    '<li><strong>Número Celular:</strong> ' + data.telefono + '</li>' +
                    '<li><strong>Rol:</strong> ' + rol + '</li>'
                );




                if (data.id_rol === 3) {
                    $('#BotonesPerfil ul').append('<li><a href="GestionProductos.html">Productos</a></li>');
                }
            },
            error: function(error) {
                console.log('Error al cargar el perfil: ', error);
            }
        });
    }

    cargarPerfil();
});

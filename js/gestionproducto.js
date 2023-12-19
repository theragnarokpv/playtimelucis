$(document).ready(function () {
    // Realizar la petición Ajax para obtener las plataformas
    $.ajax({
        type: 'GET',
        url: 'include/functions/getplataforma.php',
        dataType: 'json',
        success: function (data) {
            // Manejar la respuesta exitosa del servidor
            console.log(data);

            // Rellenar el select con los datos obtenidos
            if (data && data.length > 0) {
                var selectPlataforma = $('#category');

                data.forEach(function (plataforma) {
                    // Crear una opción para cada plataforma
                    var opcion = `<option value="${plataforma.id_plataforma}">${plataforma.descripcion}</option>`;
                    selectPlataforma.append(opcion);
                });
            } else {
                // Si no hay datos, puedes mostrar un mensaje o hacer algo más
                console.log('No hay datos de plataformas');
            }
        },
        error: function () {
            // Manejar errores en la petición
            console.log('Error al obtener las plataformas');
        }
    });

    // Manejar el evento de submit del formulario
    $('.form').submit(function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener datos del formulario
        var nombreProducto = $('#name').val();
        var plataformaProducto = $('#category').val();
        var descripcionProducto = $('#description').val();
        var precioProducto = $('#price').val();
        var existenciasProducto = $('#availability').val();
        var imagen = $('#image')[0].files[0];

        // Crear objeto con los datos a enviar
        var formData = new FormData();
        formData.append('nombre', nombreProducto);
        formData.append('id_plataforma', plataformaProducto);
        formData.append('detalle', descripcionProducto);
        formData.append('precio', precioProducto);
        formData.append('existencias', existenciasProducto);

        if (imagen) {
            formData.append('ruta_imagen', imagen);
        }
        // Enviar datos al servidor para agregar el producto
        $.ajax({
            type: 'POST',
            url: 'include/functions/agregarProducto.php',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (respuesta) {
                // Procesar la respuesta del servidor
                console.log(respuesta);

                // Ejemplo: Mostrar un mensaje de éxito al usuario
                alert('Producto agregado con éxito. ID de producto: ' + respuesta.idProducto);

                // Redirigir al usuario
                window.location.href = 'index.html';
            },
            error: function () {
                console.log('Error al agregar el producto');
            }
        });
    });
});

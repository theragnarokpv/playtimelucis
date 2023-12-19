$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var id_producto = urlParams.get('codigo');

    function cargarProducto() {
        $.ajax({
            url: 'include/functions/getjuego.php',
            dataType: 'json',
            data: {
                id_producto: id_producto
            },
            success: function(data) {
                // Rellenar los elementos HTML con los datos del producto
                $('.imagen .juego').attr('src', data.ruta_imagen);
                $('#datosProducto .titulojuego').text(data.descripcion);
                $('#datosProducto .descripcion').text(data.detalle);
                $('#datosProducto .plataforma').text('Plataforma:');
                $('#datosProducto .dinero').text('$' + data.precio);
                $('#datosProducto .console').text(data.nombre_plataforma);
            },
            error: function(error) {
                console.log('Error al cargar el producto: ', error);
            }
        });
    }

    cargarProducto();

    $('.kart').on('click', function() {
        agregarAlCarrito(id_producto);
    });
});


function agregarAlCarrito(idProducto) {
    $.ajax({
        url: 'include/functions/agregarCarrito.php',
        type: 'POST',
        dataType: 'json',
        data: {
            idProducto: idProducto
        },
        success: function(response) {
            if (response.success) {
                console.log(response.message);
            } else {
                console.error('Error al agregar al carrito: ', response.message);
            }
        },
        error: function(error) {
            console.log('Error en la solicitud Ajax: ', error);
        }
    });
}
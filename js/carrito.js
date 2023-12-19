$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'include/functions/obtenerCarrito.php',
        dataType: 'json',
        success: function (data) {
            $('.cart-item').empty();
            for (let i = 0; i < data.length; i++) {
                agregarItemCarrito(data[i]);
            }
            calcularTotalCarrito(data);

            window.carritoData = data;
            llenarDatosFinales(data);
        },
        error: function () {
            console.log('Error al obtener datos del carrito');
        }
    });

    $.ajax({
        type: 'GET',
        url: 'include/functions/getusuario.php',
        dataType: 'json',
        success: function (usuario) {
            $('#nombre').val(usuario.nombre);
            $('#apellido').val(usuario.apellidos);
            $('#correo').val(usuario.correo);
        },
        error: function () {
            console.log('Error al obtener datos del usuario');
        }
    });


    $('#formularioCompra').submit(function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los datos del formulario
        var direccion = $('#direccion').val();
        var totalCarrito = calcularTotalPedido(window.carritoData); // Asegúrate de tener la función calcularTotalPedido implementada

        // Crear objeto con los datos a enviar
        var datosCompra = {
            direccion: direccion,
            total_pagar: totalCarrito,
            productos: window.carritoData // Datos del carrito
        };

        // Enviar datos al servidor para procesar la compra
        $.ajax({
            type: 'POST',
            url: 'include/functions/procesarCompra.php',
            data: datosCompra,
            dataType: 'json',
            success: function (respuesta) {
                // Procesar la respuesta del servidor
                console.log(respuesta);

                // Ejemplo: Mostrar un mensaje de éxito al usuario
                alert('Compra realizada con éxito. ID de compra: ' + respuesta.idCompra);

                window.location.href = 'Perfil.html';
            },
            error: function () {
                console.log('Error al procesar la compra');
            }
        });
    });
});

// Función para agregar un elemento al carrito
function agregarItemCarrito(producto) {

    var precioFormateado = typeof producto.precio === 'number' ? producto.precio.toFixed(2) : '0.00';
    
    var newItem = '<div class="cart-item">' +
        '<div class="item-details">' +
        '<h3>' + producto.descripcion + '</h3>' +
        '<p>Precio: <span class="price">$' + precioFormateado + '</span></p>' +
        '</div>' +
        '<button class="remove-button" data-id="' + producto.id_producto + '">Eliminar</button>' +
        '</div>';

    
    $('.cart-container').append(newItem);

    
    $('.remove-button[data-id="' + producto.id_producto + '"]').on('click', function () {
        eliminarItemCarrito(producto.id_producto);
    });
}


// Función para eliminar un elemento del carrito
function eliminarItemCarrito(idProducto) {
    // Lógica para eliminar el producto del carrito en el servidor (actualiza la sesión, etc.)
    $.ajax({
        type: 'POST',
        url: 'include/functions/eliminarProductoCarrito.php',
        data: {
            idProducto: idProducto
        },
        success: function (response) {
            // Lógica adicional si es necesario
            console.log(response);
        },
        error: function () {
            console.log('Error al eliminar el producto del carrito');
        }
    });

    // Elimina el elemento del DOM
    $('.cart-item .remove-button[data-id="' + idProducto + '"]').closest('.cart-item').remove();

    // Calcula y actualiza el total del carrito (si es necesario)
    calcularTotalCarrito();
}



// Función para calcular y actualizar el total del carrito
function calcularTotalCarrito() {
    var total = 0;
    $('.cart-item').each(function () {
        var precio = parseFloat($(this).find('.price').text().replace('$', ''));
        total += precio;
    });
    $('.TotalPrice').text('$' + total.toFixed(2));
}


function llenarDatosFinales(data) {
    // Referencia al div datosFinales
    var datosFinalesDiv = $('#datosFinales');

    // Limpiar el contenido existente
    datosFinalesDiv.empty();

    // Verificar si hay productos en el carrito
    if (data && data.length > 0) {
        // Crear elementos para cada producto en el carrito
        for (let i = 0; i < data.length; i++) {
            var producto = data[i];

            // Verificar si el producto tiene precio antes de acceder a toFixed
            var precioFormateado = (producto && producto.precio) ? producto.precio.toFixed(2) : 'Precio no disponible';

            // Crear elementos para mostrar la información del producto
            var infoProductoDiv = $('<div id=DatoFinalProducto>');
            infoProductoDiv.append('<p>Nombre: ' + producto.descripcion + '</p>');
            infoProductoDiv.append('<p>Precio: $' + precioFormateado + '</p>');

            // Agregar los elementos al div datosFinales
            datosFinalesDiv.append(infoProductoDiv);
        }

        // Calcular el total del carrito
        var totalCarrito = calcularTotalPedido(data);

        // Verificar si totalCarrito es un número antes de usar toFixed
        var totalCarritoFormateado = isNaN(totalCarrito) ? 'Total no disponible' : totalCarrito.toFixed(2);

        // Agregar el total del carrito al div datosFinales
        datosFinalesDiv.append('<p>Total del Carrito: $' + totalCarritoFormateado + '</p>');
    } else {
        // Mostrar un mensaje si no hay productos en el carrito
        datosFinalesDiv.append('<p>No hay productos en el carrito</p>');
    }
}


// Función para calcular y actualizar el total del carrito
function calcularTotalPedido(data) {
    var total = 0;

    // Verificar si hay productos en el carrito
    if (data && data.length > 0) {
        // Sumar los precios de los productos
        for (let i = 0; i < data.length; i++) {
            var producto = data[i];
            if (producto && producto.precio) {
                total += parseFloat(producto.precio);
            }
        }
    }

    return total;
}


function obtenerProductosEnCarrito() {
    var productosEnCarrito = [];

    $('#datosFinales div[id="DatoFinalProducto"]').each(function () {
        var descripcion = $(this).find('p:first-child').text().replace('Nombre: ', '');
        var precio = parseFloat($(this).find('p:last-child').text().replace('Precio: $', ''));

        productosEnCarrito.push({
            descripcion: descripcion,
            precio: precio
        });
    });

    return productosEnCarrito;
}

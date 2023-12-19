$(document).ready(function () {
    // Realizar la petición Ajax al servidor
    $.ajax({
        type: 'GET',
        url: 'include/functions/getpedidos.php',
        dataType: 'json',
        success: function (data) {
            // Manejar la respuesta exitosa del servidor
            console.log(data);

            // Rellenar la tabla con los datos obtenidos
            if (data && data.length > 0) {
                var pedidosUsuario = $('#PedidosUsuario');
                pedidosUsuario.empty();  // Limpiar la tabla antes de rellenar

                data.forEach(function (pedido) {
                    var fila = `<tr>
                                    <td>${pedido.id_compra}</td>
                                    <td>${pedido.fecha_compra}</td>
                                    <td>${pedido.productos}</td>
                                    <td>${pedido.total_pagar}</td>
                                </tr>`;
                    pedidosUsuario.append(fila);
                });
            } else {
                // Si no hay datos, puedes mostrar un mensaje o hacer algo más
                console.log('No hay datos de historial de pedidos');
            }
        },
        error: function () {
            // Manejar errores en la petición
            console.log('Error al obtener el historial de pedidos');
        }
    });
});

$(document).ready(function() {
    function cargarProductos() {
      $.ajax({
        url: 'include/functions/getproductos.php', 
        dataType: 'json',
        success: function(data) {
          $('#shopContent').empty();
 
          for (var i = 0; i < data.length; i++) {
            var producto = data[i];
            var cardHtml = '<div class="card-products">';
            cardHtml += '<a href="juego.html?codigo='+ producto.id_producto +'"><img src="' + producto.ruta_imagen + '" alt="' + producto.descripcion + '"></a>';
            cardHtml += '<h3>' + producto.descripcion + '</h3>';
            cardHtml += '<p class="price">$' + producto.precio + '</p>';
            cardHtml += '<button id="btnAgregarCarrito" onclick="agregarAlCarrito(' + producto.id_producto + ')">Agregar al carrito</button>';
            cardHtml += '</div>';
  
            $('#shopContent').append(cardHtml);
          }
        },
        error: function(error) {
          console.log('Error al cargar productos: ', error);
        }
      });
    }
  
    cargarProductos();
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
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
            cardHtml += '<img src="' + producto.ruta_imagen + '" alt="' + producto.descripcion + '">';
            cardHtml += '<h3>' + producto.descripcion + '</h3>';
            cardHtml += '<p class="price">$' + producto.precio + '</p>';
            cardHtml += '<button onclick="agregarAlCarrito(' + producto.id_producto + ')">Agregar al carrito</button>';
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
    console.log('Producto agregado al carrito con ID: ', idProducto);
  }
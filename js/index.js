$(document).ready(function() {
  let products;

  function cargarProductos() {
    $.ajax({
      url: 'include/functions/getproductos.php', 
      dataType: 'json',
      success: function(data) {
        products = data; 
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


  
  const handleSearch = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) => product.descripcion.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
  };

  searchInput.addEventListener("input", handleSearch);
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

const shopContent = document.getElementById("shopContent");
const searchInput = document.getElementById("search-input");
const noResults = document.getElementById("NoResults");

const displayProducts = (productList) => {
    shopContent.innerHTML = "";

    if (productList.length === 0) {
        noResults.style.display = "block";
    } else {
        productList.forEach((product) => {
            const content = document.createElement("div");
            content.className = "card-products";
            content.innerHTML = `
                <a href="juego.html?codigo=${product.id_producto}"><img src="${product.ruta_imagen}" alt="${product.descripcion}"></a>
                <h3>${product.descripcion}</h3>
                <p class="price">$${product.precio}</p>
                <button onclick="agregarAlCarrito(${product.id_producto})">Agregar al carrito</button>
            `;
            shopContent.append(content);
        });
        noResults.style.display = "none";
    }
};

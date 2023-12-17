  const handleSearch = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) => product.productName.toLowerCase().includes(searchTerm));
  
    displayProducts(filteredProducts);
  };
  
  displayProducts(products);
  
  searchInput.addEventListener("input", handleSearch);

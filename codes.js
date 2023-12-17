const products = [
    {
      productName: "FARCRY 6",
      price: "$70",
      img: "https://media.discordapp.net/attachments/1184708724183531521/1184708743984840814/gii4krv7qha51.png?ex=658cf4ff&is=657a7fff&hm=26470d69bc4328a4f94785413d36ef2a9cae82d5eb98a9e00420e6a61f34c7cf&=&format=webp&quality=lossless&width=396&height=503",
    },
    {
      productName: "GRAN TURISMO 7",
      price: 70,
      img: "https://media.discordapp.net/attachments/1184708724183531521/1184713915217739776/image.png?ex=658cf9d0&is=657a84d0&hm=8619e375ea971fa57f21954b4a3db667638a8a7c8eb3fa6c0e1f93f9c905c814&=&format=webp&quality=lossless&width=400&height=503",
    },
    {
      productName: "Mario Kart 8 Deluxe",
      price: 60,
      img: "https://media.discordapp.net/attachments/1184708724183531521/1184715594679975997/image.png?ex=658cfb60&is=657a8660&hm=8e3ac70a09fc6f72267f89f6f57c96431257b09c37be5c0071273fe980d0a21a&=&format=webp&quality=lossless&width=308&height=502",
    },
    {
        productName: "HALO INFINITE",
        price: 70,
        img: "https://media.discordapp.net/attachments/1184708724183531521/1184716850433634334/image.png?ex=658cfc8c&is=657a878c&hm=b7bdc466d776b88e5824320323922b9db7504c530e886388427257602f727270&=&format=webp&quality=lossless&width=395&height=503",
    },
    {
        productName: "NBA2K24",
        price: 80,
        img: "https://media.discordapp.net/attachments/1184708724183531521/1184716117386735626/image.png?ex=658cfbdd&is=657a86dd&hm=7e4455afebfeb14c4a0a8ae197e44d6e4dcff605042def20a2018b73c6de4dba&=&format=webp&quality=lossless&width=393&height=503",
    },
    {
        productName: "ZELDA: TOTK",
        price: 60,
        img: "https://media.discordapp.net/attachments/1184708724183531521/1184717129744908358/image.png?ex=658cfcce&is=657a87ce&hm=60ff00d766bf206fd3410a304566bec6d752a9a90e6c2b26a25cd240123fff6d&=&format=webp&quality=lossless&width=307&height=502",
    },
  ];
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
            <img src="${product.img}">
            <h3>${product.productName}</h3>
            <p class="price">${product.price}</p>
            <button>comprar</button>
            `;
        shopContent.append(content);
      });
      noResults.style.display = "none";
    }
  };
  
  const handleSearch = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) => product.productName.toLowerCase().includes(searchTerm));
  
    displayProducts(filteredProducts);
  };
  
  displayProducts(products);
  
  searchInput.addEventListener("input", handleSearch);

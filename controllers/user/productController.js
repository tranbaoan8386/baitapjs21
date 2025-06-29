export function searchProducts(keyword, products) {
    return products.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  
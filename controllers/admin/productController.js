import { getProducts,getProductsPaginated, addProduct, deleteProduct, updateProduct, getProduct } from "../../services/api.js";
import { Product } from "../../models/Product.js";
export const fetchPaginatedProducts = (page, limit) => {
  return getProductsPaginated(page, limit)
    .then(res => res.data)
    .catch(err => {
      console.error("Lỗi khi lấy danh sách phân trang:", err);
      return [];
    });
};
export const fetchAllProducts = () => getProducts(); 
export const createProduct = (data) => {
    const product = new Product
        (
            null,
            data.name,
            data.price,
            data.screen,
            data.backCamera,
            data.frontCamera,
            data.img,
            data.desc,
            data.type
        )
    return addProduct(product);
}
export const removeProduct = (id) => deleteProduct(id);
export const editProduct = (id, data) => {
    const product = new Product
        (
            null,
            data.name,
            data.price,
            data.screen,
            data.backCamera,
            data.frontCamera,
            data.img,
            data.desc,
            data.type
        )
    return updateProduct(id, product);
}
export const fetchProductById = (id) => getProduct(id);
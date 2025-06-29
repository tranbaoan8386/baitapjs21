const BASE_URL = 'https://685165ca8612b47a2c09e420.mockapi.io/products';

export const getProducts = () =>
  axios.get(BASE_URL).then(res => res.data);
export const getProduct = (id) => axios.get(`${BASE_URL}/${id}`);
export const addProduct = (product) => axios.post(BASE_URL, product);
export const deleteProduct = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateProduct = (id, product) => axios.put(`${BASE_URL}/${id}`, product);
export const getProductsPaginated = (page, limit) => {
  return axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
};
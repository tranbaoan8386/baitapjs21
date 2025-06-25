import {
  fetchPaginatedProducts,
  fetchAllProducts,
  createProduct,
  removeProduct,
  editProduct,
  fetchProductById
} from '../controllers/admin/productController.js';
import { getDataForm } from '../utils/form.js';
import { validate } from '../utils/validate.js';
const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'top'
  }
});

function getElement(id) {
  return document.getElementById(id);
}

let currentPage = 1;
const limit = 4;
const list = getElement("body-table");

function renderProducts(page) {
  fetchPaginatedProducts(page, limit).then(products => {
    list.innerHTML = products.map(p => `
      <div class="row bg-white mb-2 border border-white d-flex align-items-center justify-content-center shadow-custom">
        <div class="col-6 col-md-9">
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-4 col-md-3 text-center">
              <img class="custom-img" src="${p.img}" alt="${p.name}">
            </div>
            <div class="col-8 col-md-9">
              <div class="row d-flex align-items-center justify-content-center">
                <div class="col-12 col-md-4 text-center">
                  <div class="mb-1"><strong>Tên: </strong>${p.name}</div>
                  <div><strong>Thương Hiệu: </strong>${p.type}</div>
                </div>
                <div class="col-12 d-none d-md-block col-md-4 text-center">
                  <div><strong>Màn Hình: </strong>${p.screen}</div>
                  <div><strong>FrontCam: </strong>${p.frontCamera}</div>
                  <div><strong>BackCam: </strong>${p.backCamera}</div>
                </div>
                <div class="col-12 d-none d-md-block col-md-4 text-center">
                  <div>${p.desc}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-4 col-md-6 p-0 text-center">
              ${Number(p.price).toLocaleString('vi-VN')} đ
            </div>
            <div class="col-8 col-md-6 text-center">
              <div class="row d-flex align-items-center justify-content-center">
                <div class="col-6 p-md-1 col-md-6">
                  <button class="btn btn-primary" onclick="onEdit('${p.id}')">Sửa</button>
                </div>
                <div class="col-6 p-md-1 col-md-6">
                  <button class="btn btn-danger" onclick="onDelete('${p.id}')">Xóa</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
    renderPagination(page, products.length);
  });
}
function renderPagination(page, itemCount) {
  const pagination = getElement("pagination");
  pagination.innerHTML = `
    <li class="page-item ${page === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="changePage(${page - 1})">Trước</a>
    </li>
    <li class="page-item active"><span class="page-link">${page}</span></li>
    <li class="page-item ${itemCount < limit ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="changePage(${page + 1})">Sau</a>
    </li>
  `;
}

window.changePage = function (newPage) {
  if (newPage < 1) return;
  currentPage = newPage;
  renderProducts(currentPage);
};

getElement("btnThemSP").onclick = () => {
  let product = getDataForm();
  const errors = validate(product);
  if (errors.length > 0) {
    errors.forEach(err => notyf.error(err));
    return;
  }
  createProduct(product);
  $("#exampleModal").modal("hide");
  renderProducts(currentPage)
  notyf.success("Thêm sản phẩm thành công!");
}

window.onDelete = function (id) {
  Swal.fire({
    title: 'Xác nhận xóa?',
    text: "Hành động này không thể hoàn tác!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  }).then((result) => {
    if (result.isConfirmed) {
      removeProduct(id).then(() => {
        notyf.success("Xóa sản phẩm thành công!");
        renderProducts(currentPage);
      });
    }
  });
};

window.onEdit = function (id) {
  fetchProductById(id).then(res => {
    const sp = res.data;
    alert(`Chỉnh sửa: ${sp.name}`);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(currentPage);
});
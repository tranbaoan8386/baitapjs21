import {
  fetchPaginatedProducts,
  fetchAllProducts,
  createProduct,
  removeProduct,
  editProduct,
  fetchProductById
} from '../controllers/admin/productController.js';
import { getDataForm, resetForm } from '../utils/form.js';
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

let allProducts = [];
let currentList = [];
let currentPage = 1;
const limit = 4;
const list = getElement("body-table");
let productID = null;
window.currentPage = currentPage;

async function init() {
  allProducts = await fetchAllProducts();
  currentList = allProducts;
  renderProducts(currentPage);
}
// hàm dùng sắp sếp nhé
function sortProducts(type) {
  if (type === "asc") {
    allProducts.sort((a, b) => a.price - b.price);
  } else if (type === "desc") {
    allProducts.sort((a, b) => b.price - a.price);
  }
}
// thêm sự kiện cho select sx

getElement("sortPrice").addEventListener("change", function () {
  const sortType = this.value;
  sortProducts(sortType);
  renderProducts(currentPage);
});
// render ds sp

window.renderProducts = function (page) {
  const start = (page - 1) * limit;
  const paged = currentList.slice(start, start + limit);
  list.innerHTML = paged.map(p => `
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
  `).join("");
  renderPagination(page, currentList.length);
};
// reder ptrang

function renderPagination(page, totalItems) {
  const totalPages = Math.ceil(totalItems / limit);
  let html = "";

  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item ${i === page ? 'active' : ''}">
      <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
    </li>`;
  }

  getElement("pagination").innerHTML = html;
}
// sk thay đổi trang

window.changePage = function (newPage) {
  if (newPage < 1) return;
  currentPage = newPage;
  renderProducts(currentPage);
};

const modalEl = document.getElementById('exampleModal');
modalEl.addEventListener('show.bs.modal', function () {
  getElement("btnThemSP").style.display = "block";
  getElement("btnEditSP").style.display = "none";
  resetForm();
});

// them san pham

getElement("btnThemSP").onclick = async () => {
  let product = getDataForm();
  const errors = validate(product);
  if (errors.length > 0) {
    errors.forEach(err => notyf.error(err));
    return;
  }
  await createProduct(product);
  resetForm();
  allProducts = await fetchAllProducts();
  currentList = allProducts;
  $("#exampleModal").modal("hide");
  renderProducts(currentPage);
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
  }).then(async (result) => {
    if (result.isConfirmed) {
      await removeProduct(id);
      notyf.success("Xóa sản phẩm thành công!");
      allProducts = await fetchAllProducts();
      currentList = allProducts;
      renderProducts(currentPage);
    }
  });
};


window.onEdit = function (id) {
  $("#exampleModal").modal("show");
  getElement("btnThemSP").style.display = "none";
  getElement("btnEditSP").style.display = "block";
  productID = id;
  fetchProductById(id).then(res => {
    const sp = res.data;
    document.getElementById("name").value = sp.name;
    document.getElementById("price").value = sp.price;
    document.getElementById("screen").value = sp.screen;
    document.getElementById("backCamera").value = sp.backCamera;
    document.getElementById("frontCamera").value = sp.frontCamera;
    document.getElementById("img").value = sp.img;
    document.getElementById("desc").value = sp.desc;
    document.getElementById("type").value = sp.type;
  });
};

getElement("btnEditSP").onclick = async () => {
  let product = getDataForm();
  const errors = validate(product);
  if (errors.length > 0) {
    errors.forEach(err => notyf.error(err));
    return;
  }
  try {
    await editProduct(productID, product);
    resetForm();
    allProducts = await fetchAllProducts();
    currentList = allProducts;
    $("#exampleModal").modal("hide");
    getElement("btnThemSP").style.display = "block";
    getElement("btnEditSP").style.display = "none";
    renderProducts(currentPage);
    notyf.success("Cập Nhật sản phẩm thành công!");
  } catch (error) {
    notyf.error("Cập nhật thất bại!");
  }
}
// tìm kiếm
window.clearSearch = function () {
  getElement("searchInput").value = "";
  toggleClearBtn();
  currentList = allProducts;
  renderProducts(1);
}

function toggleClearBtn() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.querySelector(".clear-button");
  clearBtn.style.display = input.value ? "block" : "none";
}
window.handleSearch = function () {
  const keyword = getElement("searchInput").value.trim().toLowerCase();
  toggleClearBtn();
  if (!keyword) {
    currentList = allProducts;
  } else {
    currentList = allProducts.filter(p =>
      p.name.toLowerCase().includes(keyword)
    );
  }
  renderProducts(1);
}
document.addEventListener("DOMContentLoaded", () => {
  init();
});
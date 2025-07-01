const toggleBtn = document.getElementById('toggle-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const logo = document.querySelector('.img-logo');
toggleBtn.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
        sidebar.classList.add('show');
        logo.style.width = "100px";
    } else {
        sidebar.classList.toggle('collapsed');
    }
    if (sidebar.classList.contains('collapsed')) {
        logo.style.width = "50px";
    } else {
        logo.style.width = "100px";
    }
});

closeBtn.addEventListener('click', function () {
    sidebar.classList.remove('show');
});
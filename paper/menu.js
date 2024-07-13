//移动端列表按钮
function toggleMenu() {
    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// 监测向下滑动
window.addEventListener('scroll', function() {
    var header = document.querySelector('.header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
//移动端列表按钮
function toggleMenu() {
    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// 首页图片轮播
var currentIndex = 0;
var slides = document.querySelectorAll('.carousel-images img');
var indicators = document.querySelectorAll('.carousel-indicators div');
var slideInterval = setInterval(nextSlide, 5000); // 自动切换图片

function showSlide(index) {
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }

    var offset = -currentIndex * 100;
    document.querySelector('.carousel-images').style.transform = 'translateX(' + offset + '%)';

    indicators.forEach(function(indicator, i) {
        indicator.classList.toggle('active', i === currentIndex);
    });
}

// 切换
function nextSlide() {
    currentIndex++;
    resetSlideInterval();
    showSlide(currentIndex);
}
function prevSlide() {
    currentIndex--;
    resetSlideInterval();
    showSlide(currentIndex);
}

// 定时切换
function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000); // 自动切换图片
}

document.querySelectorAll('.carousel-indicators div').forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        resetSlideInterval(); // 手动切换后重置定时器
    });
});

resetSlideInterval(); // 初始化定时器
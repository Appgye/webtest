//移动端列表按钮
function toggleMenu() {
    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// 首页图片轮播
var currentIndex = 3; //初始图片是第几个，0代表第一个，这里设置1是因为首尾页切换逻辑
var slides = document.querySelectorAll('.carousel-images img');
var indicators = document.querySelectorAll('.carousel-indicators div');
var slideInterval = setInterval(nextSlide, 5000); // 自动切换图片

function showSlide(index) {
    if (index >= slides.length - 1) {
        currentIndex = 1; // 切换到克隆的第一张图片
        document.querySelector('.carousel-images').style.transition = 'none'; // 瞬间切换
        document.querySelector('.carousel-images').style.transform = 'translateX(-100%)';
        setTimeout(function() {
            document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out'; // 添加过渡效果
            showSlide(currentIndex);
        }, 0);
    } else if (index <= 0) {
        currentIndex = slides.length - 2; // 切换到克隆的最后一张图片
        document.querySelector('.carousel-images').style.transition = 'none'; // 瞬间切换
        document.querySelector('.carousel-images').style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
        setTimeout(function() {
            document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out'; // 添加过渡效果
            showSlide(currentIndex);
        }, 0);
    } else {
        currentIndex = index;
        var offset = -currentIndex * 100;
        document.querySelector('.carousel-images').style.transform = 'translateX(' + offset + '%)';
    }

    updateIndicators();
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

//移动端列表按钮
function toggleMenu() {
    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// 首页图片轮播
var currentIndex = 1;
var slides = document.querySelectorAll('.carousel-images img');
var indicators = document.querySelectorAll('.carousel-indicators div');
var slideInterval = setInterval(nextSlide, 5000); // 自动切换图片
console.log('新的定时器已设置', slideInterval);

// 定时切换
function resetSlideInterval() {
    console.log('重置定时器');
    clearInterval(slideInterval);
    console.log('定时器已清楚', slideInterval);
    slideInterval = setInterval(nextSlide, 5000); // 自动切换图片
    console.log('新的定时器已设置', slideInterval);
}



//初始化第二张照片
// function initSlide(index) {
//     document.querySelector('.carousel-images').style.transition = 'none';  //防止快速刷新能看到切换到第二张图片的bug
//     document.querySelector('.carousel-images').style.transform = 'translateX(' + -100 + '%)';
//     // document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out';
//     // 恢复过渡效果
//     setTimeout(function() {
//         document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out';
//     }, 0);
//
// }
// initSlide();// 页面加载时，显示实际第二张图片


// 老版本切换
// function showSlide(index) {
//     if (index >= slides.length) {
//         currentIndex = 0;
//     } else if (index < 0) {
//         currentIndex = slides.length - 1;
//     } else {
//         currentIndex = index;
//     }
//
//     var offset = -currentIndex * 100;
//     document.querySelector('.carousel-images').style.transform = 'translateX(' + offset + '%)';
//
//     indicators.forEach(function(indicator, i) {
//         indicator.classList.toggle('active', i === currentIndex);
//     });
// }

// 新版本切换：优化首尾页无缝切换
function showSlide(index) {
    if (index >= slides.length - 1) {
        // console.log('s'+index);
        // var offset = -currentIndex * 100 - 100;
        currentIndex = 1; // 切换到克隆的第一张图片（更新实际的index）
        document.querySelector('.carousel-images').style.transition = 'none'; // 瞬间切换
        document.querySelector('.carousel-images').style.transform = 'translateX(0)';
        setTimeout(function() {
            document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out'; // 添加过渡效果
            showSlide(currentIndex);
        }, 0);
    } else if (index <= 0) {
        // console.log(2);
        currentIndex = slides.length - 1; // 切换到克隆的最后一张图片
        document.querySelector('.carousel-images').style.transition = 'none'; // 瞬间切换
        document.querySelector('.carousel-images').style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
        currentIndex = slides.length - 2; // 更新实际的index
        setTimeout(function() {
            document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out'; // 添加过渡效果
            showSlide(currentIndex);
        }, 0);
    } else {
        // console.log('z'+index);
        // console.log(3);
        currentIndex = index;
        var offset = -currentIndex * 100;
        document.querySelector('.carousel-images').style.transform = 'translateX(' + offset + '%)';

    }
    updateIndicators();
    // resetSlideInterval(); // 手动切换后重置定时器
}
//下面的灯亮起逻辑
function updateIndicators() {
    indicators.forEach(function(indicator, i) {
        if (i === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 切换
function nextSlide() {
    // console.log('ok1');
    currentIndex++;

    showSlide(currentIndex);
    resetSlideInterval();
}
function prevSlide() {
    currentIndex--;

    showSlide(currentIndex);
    resetSlideInterval();
}



// 点击的检测，重置计时器
document.querySelectorAll('.carousel-indicators div').forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        console.log('点击指示器：', index);
        showSlide(index);
        resetSlideInterval(); // 手动切换后重置定时器
    });
});



// resetSlideInterval(); // 初始化定时器


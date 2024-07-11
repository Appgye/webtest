//移动端列表按钮
function toggleMenu() {
    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// 首页图片轮播
var currentIndex = 1; // 这里初始化的是实际上第二张图片
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
        document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out'; // 添加过渡效果
        currentIndex = index;
        var offset = -currentIndex * 100;
        document.querySelector('.carousel-images').style.transform = 'translateX(' + offset + '%)';

        console.log('s'+index);
        // currentIndex = 1;
        setTimeout(() => {
            // 瞬间切换到第一张
            document.querySelector('.carousel-images').style.transition = 'none';
            currentIndex = 1;
            offset = -currentIndex * 100;
            document.querySelector('.carousel-images').style.transform = 'translateX(' + offset + '%)';
            updateIndicators();
            // 恢复过渡效果
            setTimeout(() => {
                document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out';
            }, 50); // 50 毫秒的延迟可以根据需要调整
        }, 500); // 500 毫秒的延迟与过渡时间相同

        // var offset = -currentIndex * 100 - 100;
        // document.querySelector('.carousel-images').style.transition = 'none'; // 瞬间切换
        // document.querySelector('.carousel-images').style.transform = 'translateX(-100%)';
        // document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out'; // 添加过渡效果
        // currentIndex = 1; // 切换到克隆的第一张图片（更新实际的index）
        // setTimeout(function() {
        //     document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out'; // 添加过渡效果
        //     showSlide(currentIndex);
        // }, 0);
    } else if (index <= 0) {
        // console.log(2);
        // currentIndex = slides.length - 1; // 切换到克隆的最后一张图片
        // document.querySelector('.carousel-images').style.transition = 'none'; // 瞬间切换
        // document.querySelector('.carousel-images').style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
        // currentIndex = slides.length - 2; // 更新实际的index
        // setTimeout(function() {
        //     document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out'; // 添加过渡效果
        //     showSlide(currentIndex);
        //     updateIndicators();
        // }, 0);
        document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out'; // 添加过渡效果
        currentIndex = index;
        var offset = -currentIndex * 100;
        document.querySelector('.carousel-images').style.transform = 'translateX(0)';

        setTimeout(() => {
            // 瞬间切换到第一张
            document.querySelector('.carousel-images').style.transition = 'none';
            currentIndex = slides.length - 2;
            offset = -currentIndex * 100;
            document.querySelector('.carousel-images').style.transform = 'translateX(' + offset + '%)';
            updateIndicators();
            // 恢复过渡效果
            setTimeout(() => {
                document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out';
            }, 50); // 50 毫秒的延迟可以根据需要调整
        }, 500); // 500 毫秒的延迟与过渡时间相同

    } else {
        console.log('z'+index);
        // console.log(3);
        currentIndex = index;
        var offset = -currentIndex * 100;
        document.querySelector('.carousel-images').style.transform = 'translateX(' + offset + '%)';
        updateIndicators();
    }
    // updateIndicators();
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
    console.log(currentIndex);
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


// 实现手指滑动切换图片

// 老版本：可以移动，但是图片不跟手
// // 手指滑动变量
// var startX, endX;
//
// document.querySelector('.carousel').addEventListener('touchstart', function(event) {
//     startX = event.touches[0].clientX;
// }, false);
//
// document.querySelector('.carousel').addEventListener('touchmove', function(event) {
//     endX = event.touches[0].clientX;
// }, false);
//
// document.querySelector('.carousel').addEventListener('touchend', function(event) {
//     var threshold = 50; // 定义滑动切换的最小距离
//     if (startX - endX > threshold) {
//         nextSlide();
//     } else if (endX - startX > threshold) {
//         prevSlide();
//     }
// }, false);

// 新版本：图片实时更新位置
var startX, endX, moveX, moveY; //moveY是为了在左右滑动时忽略上下的移动带来的影响（手感问题）

document.querySelector('.carousel').addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    document.querySelector('.carousel-images').style.transition = 'none'; // 移除过渡效果
}, false);

document.querySelector('.carousel').addEventListener('touchmove', function(event) {
    moveX = event.touches[0].clientX;
    moveY = event.touches[0].clientY;

    // 计算水平和垂直移动距离
    var deltaX = Math.abs(moveX - startX);
    var deltaY = Math.abs(moveY - startY);

    if (deltaX > deltaY) { // 只关注水平移动
        var offset = (moveX - startX) / document.querySelector('.carousel').offsetWidth * 100;
        var translateX = -currentIndex * 100 + offset;
        document.querySelector('.carousel-images').style.transform = 'translateX(' + translateX + '%)';

        event.preventDefault();  // 阻止默认的滚动行为
    }
}, false);

document.querySelector('.carousel').addEventListener('touchend', function(event) {
    endX = event.changedTouches[0].clientX;
    var threshold = 50; // 定义滑动切换的最小距离
    if (startX - endX > threshold) {
        nextSlide();
    } else if (endX - startX > threshold) {
        prevSlide();
    } else {
        showSlide(currentIndex); // 滑动距离不足，回弹到当前图片
    }
    document.querySelector('.carousel-images').style.transition = 'transform 0.5s ease-in-out'; // 恢复过渡效果
}, false);
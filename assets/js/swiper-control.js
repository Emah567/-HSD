document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 3,
        spaceBetween: 32,
        navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
            810: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1,
            }
        }
    });
});
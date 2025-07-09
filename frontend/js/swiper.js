var swiper = new Swiper(".homeSwiper", {
    slidesPerView: 2,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

var swiper2 = new Swiper(".teamSwiper", {
      slidesPerView: 2,
      grabCursor: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-120%", 0, -500],
        },
        next: {
          shadow: true,
          translate: ["120%", 0, -500],
        },
      },
      loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
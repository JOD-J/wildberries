'use strict';
const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

// cart
const buttonCart = document.querySelector('.button-cart'),
modalCart = document.querySelector('#modal-cart'),
modalClose = document.querySelector('.modal-close');
const showCart = () => {
	modalCart.classList.add('show')
};
const closeCart = () => {
	modalCart.classList.remove('show')
};
buttonCart.addEventListener('click', showCart);
modalCart.addEventListener('click', (e) => {
	const target = e.target;
	if (target === modalClose || target === modalCart) {
		closeCart();
	}
});


// scroll-link
const scrollLinks = document.querySelectorAll('a.scroll-link');
scrollLinks.forEach((item, index) => {
	item.addEventListener('click', (e) => {
		e.preventDefault();
		const idScroll = item.getAttribute('href')
		document.querySelector(idScroll).scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	})
});

console.log(123123);
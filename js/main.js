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


// общий скрол
const scrollTop = (elem) => {
	const idScroll = elem.getAttribute('href')
	document.querySelector(idScroll).scrollIntoView({
		behavior: 'smooth',
		block: 'start',
	})
};

// scroll-link
const scrollLinks = document.querySelectorAll('a.scroll-link');
scrollLinks.forEach((item, index) => {
	item.addEventListener('click', (e) => {
		e.preventDefault();
		scrollTop(item);
	})
});


// goods
const more = document.querySelector('.more');
const navigationLinks = document.querySelectorAll('.navigation-link');
const longGoodsList = document.querySelector('.long-goods-list');

const getGoods = async () => {
	const result = await fetch('db/db.json')
	if (!result.ok) {
		throw 'Ошбка вышла:' + result.status;
	}
	return result.json();
	
};

const createCard = ({category, description, gender, id, img, label, name, price }) => {
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6'
	card.innerHTML = `
			<div class="goods-card">
			${label ?
				`<span class="label">${label}</span>`:
				''}
			<img src="db/${img}" alt="${name}" class="goods-image">
			<h3 class="goods-title">${name}</h3>
			<p class="goods-description">${description}</p>
			<button class="button goods-card-btn add-to-cart" data-id="${id}">
				<span class="button-price">$${price}</span>
			</button>
			</div>
	`
	return card;
};

const renderCards = (data) => {
	longGoodsList.textContent = '';
	const cards = data.map(createCard)
	longGoodsList.append(...cards);
	document.body.classList.add('show-goods')
};

more.addEventListener('click', (event) => {
	event.preventDefault();
	getGoods().then(renderCards)
	scrollTop(more);
});

const filterCards = (field, value) => {
	getGoods().then((data) => {
		const filterdGoods = data.filter((good) =>{
			return good[field] === value			
		});
		if (filterdGoods.length) {
			return filterdGoods;
		} else {
			return data;
		}
	})
	.then(renderCards);
};

navigationLinks.forEach((linlk) => {
	linlk.addEventListener('click', (event) => {
		event.preventDefault();
		const field = linlk.dataset.field;
		const value = linlk.textContent;
		filterCards(field, value);
	});
});
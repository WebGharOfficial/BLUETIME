/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: 'true',

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',

    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close')

/*===== CART SHOW =====*/
/* Validate if constant exists */
if(cartShop){
    cartShop.addEventListener('click', () =>{
        cart.classList.add('show-cart')
    })
}

/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cart.classList.remove('show-cart')
    })
}

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== DEMO ADD TO CART ===============*/
const cartContainer = document.querySelector('.cart__container');
const cartPricesItem = document.querySelector('.cart__prices-item');
const cartPricesTotal = document.querySelector('.cart__prices-total');

// Demo cart state
let demoCart = [];

// Helper to get product info from button context
function getProductInfo(button) {
    const card = button.closest('article, .home__data');
    let title = card.querySelector('.featured__title, .products__title, .new__title, .home__title');
    let price = card.querySelector('.featured__price, .products__price, .new__price, .home__price');
    let img = card.querySelector('img');
    if (title && price && img) {
        return {
            title: title.textContent.trim(),
            price: parseInt(price.textContent.replace(/[^\d]/g, '')),
            img: img.src
        };
    }
    return null;
}

// Add to cart handler
function addToCart(product) {
    const existing = demoCart.find(item => item.title === product.title);
    if (existing) {
        existing.qty += 1;
    } else {
        demoCart.push({ ...product, qty: 1 });
    }
    renderCart();
}

// Remove from cart handler
function removeFromCart(title) {
    demoCart = demoCart.filter(item => item.title !== title);
    renderCart();
}

// Render cart
function renderCart() {
    cartContainer.innerHTML = '';
    let total = 0;
    let count = 0;
    demoCart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
        const article = document.createElement('article');
        article.className = 'cart__card';
        article.innerHTML = `
            <div class="cart__box">
                <img src="${item.img}" alt="" class="cart__img">
            </div>
            <div class="cart__details">
                <h3 class="cart__title">${item.title}</h3>
                <span class="cart__price">NPR${item.price}</span>
                <div class="cart__amount">
                    <div class="cart__amount-content">
                        <span class="cart__amount-box" data-action="decrease" data-title="${item.title}"><i class='bx bx-minus'></i></span>
                        <span class="cart__amount-number">${item.qty}</span>
                        <span class="cart__amount-box" data-action="increase" data-title="${item.title}"><i class='bx bx-plus'></i></span>
                    </div>
                    <i class='bx bx-trash-alt cart__amount-trash' data-action="remove" data-title="${item.title}"></i>
                </div>
            </div>
        `;
        cartContainer.appendChild(article);
    });
    cartPricesItem.textContent = `${count} item${count !== 1 ? 's' : ''}`;
    cartPricesTotal.textContent = `NPR${total}`;
}

// Listen for Add to Cart buttons
[...document.querySelectorAll('.featured__button, .products__button, .new__button, .home__button')].forEach(btn => {
    btn.addEventListener('click', function() {
        const product = getProductInfo(this);
        if (product) addToCart(product);
        // Animation: show checkmark and "Added" text
        const originalText = this.textContent;
        this.classList.add('added-to-cart');
        this.textContent = 'Added';
        setTimeout(() => {
            this.classList.remove('added-to-cart');
            this.textContent = originalText;
        }, 1000);
    });
});

// Listen for cart actions (remove, increase, decrease)
cartContainer.addEventListener('click', function(e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const action = target.getAttribute('data-action');
    const title = target.getAttribute('data-title');
    const item = demoCart.find(i => i.title === title);
    if (!item) return;
    if (action === 'remove') {
        removeFromCart(title);
    } else if (action === 'increase') {
        item.qty += 1;
        renderCart();
    } else if (action === 'decrease') {
        if (item.qty > 1) {
            item.qty -= 1;
        } else {
            removeFromCart(title);
        }
        renderCart();
    }
});

// Initialize cart on page load
renderCart();

"use strict";


// ==========================================
// NEXORA - MAIN JAVASCRIPT
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const cartCountElement = document.getElementById("cartCount");

const addCartButtons =
    document.querySelectorAll(".add-cart-btn");

const wishlistButtons =
    document.querySelectorAll(".wishlist-btn");

const cartToast =
    document.getElementById("cartToast");

const toastProduct =
    document.getElementById("toastProduct");

const toastClose =
    document.getElementById("toastClose");


// ==========================================
// CART STATE
// ==========================================

let cartCount = 0;

let toastTimer;


// ==========================================
// ADD TO CART
// ==========================================

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Get product name
        const productName =
            button.dataset.product;


        // Increase cart
        cartCount++;


        // Update navbar
        cartCountElement.textContent =
            cartCount;


        // Show product in notification
        toastProduct.textContent =
            productName + " has been added to your cart.";


        // Show toast
        showCartToast();


        // Temporary button feedback
        button.classList.add("added");

        button.innerHTML =
            '<i class="bi bi-check-lg"></i> Added';


        // Restore button
        setTimeout(function () {

            button.classList.remove("added");

            button.innerHTML =
                '<i class="bi bi-bag-plus"></i> Add to Cart';

        }, 1200);

    });

});


// ==========================================
// CART TOAST
// ==========================================

function showCartToast() {

    // Prevent previous timer from hiding
    // a newly displayed notification

    clearTimeout(toastTimer);


    cartToast.classList.add("show");


    toastTimer = setTimeout(function () {

        cartToast.classList.remove("show");

    }, 3000);

}


// Close manually

toastClose.addEventListener("click", function () {

    cartToast.classList.remove("show");

    clearTimeout(toastTimer);

});


// ==========================================
// WISHLIST
// ==========================================

wishlistButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const icon =
            button.querySelector("i");


        // Toggle selected state
        button.classList.toggle("active");


        if (button.classList.contains("active")) {

            icon.classList.remove("bi-heart");

            icon.classList.add("bi-heart-fill");

        } else {

            icon.classList.remove("bi-heart-fill");

            icon.classList.add("bi-heart");

        }

    });

});

// ==========================================
// NEWSLETTER VALIDATION
// ==========================================

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");

const newsletterMessage =
    document.getElementById("newsletterMessage");


newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        newsletterEmail.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    // Empty email
    if (email === "") {

        showNewsletterMessage(
            "Please enter your email address.",
            "error"
        );

        return;
    }


    // Invalid email
    if (!emailPattern.test(email)) {

        showNewsletterMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;
    }


    // Success
    showNewsletterMessage(
        "Thanks for subscribing to NEXORA!",
        "success"
    );


    newsletterForm.reset();

});


function showNewsletterMessage(message, type) {

    newsletterMessage.textContent = message;

    newsletterMessage.className =
        "newsletter-message " + type;

}

// ==========================================
// CURRENT YEAR
// ==========================================

const currentYear =
    document.getElementById("currentYear");

currentYear.textContent =
    new Date().getFullYear();


// ==========================================
// CLOSE MOBILE NAVBAR AFTER CLICK
// ==========================================

const navbarCollapse =
    document.getElementById("mainNavbar");

const navLinks =
    document.querySelectorAll(".nexora-navbar .nav-link");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (
            window.innerWidth < 992 &&
            navbarCollapse.classList.contains("show")
        ) {

            const bootstrapCollapse =
                bootstrap.Collapse.getOrCreateInstance(
                    navbarCollapse
                );

            bootstrapCollapse.hide();

        }

    });

});


// ==========================================
// ACTIVE NAVIGATION
// ==========================================

const pageSections =
    document.querySelectorAll(
        "#home, #categories, #products, #deals"
    );

window.addEventListener("scroll", function () {

    let currentSection = "home";


    pageSections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});
console.log("NEXORA interactions loaded successfully.");
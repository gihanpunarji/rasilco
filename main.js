// Load Components
document.addEventListener('DOMContentLoaded', function() {
    // Load all components
    loadComponent('header', 'header.html');
    loadComponent('hero', 'hero.html');
    loadComponent('products', 'products.html');
    loadComponent('about', 'about.html');
    loadComponent('blog', 'blog.html');
    loadComponent('testimonials', 'testimonials.html');
    loadComponent('contact', 'contact.html');
    loadComponent('footer', 'footer.html');
    
    // Initialize scripts after all components are loaded
    setTimeout(initializeScripts, 1000);
});

// Function to load component
function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => {
            console.error(`Error loading component Rs {id}:`, error);
        });
}

// Initialize all scripts
function initializeScripts() {
    // Initialize Hero Background Swiper
    const heroSwiper = new Swiper(".heroSwiper", {
        slidesPerView: 1,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 1500,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        loop: true,
    });

    // Initialize Products Swiper
    const productSwiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Initialize Testimonial Swiper
    const testimonialSwiper = new Swiper(".testimonialsSwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
        });
    }

    if (mobileLinks) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add('translate-x-full');
            });
        });
    }

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-bakery-darker', 'shadow-lg', 'py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('bg-bakery-darker', 'shadow-lg', 'py-2');
            navbar.classList.add('py-4');
        }
    });

    // Scroll Reveal Animation
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Trigger once on load
    handleScrollAnimation();

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('opacity-100', 'visible');
            backToTopButton.classList.remove('opacity-0', 'invisible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitButton.innerHTML = 'Send Message';
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Image lazy loading
    const blurDivs = document.querySelectorAll('.blur-load');
    blurDivs.forEach(div => {
        const img = div.querySelector('img');
        function loaded() {
            div.classList.add('loaded');
        }
        if (img.complete) {
            loaded();
        } else {
            img.addEventListener('load', loaded);
        }
    });

    // Additional initialization for animation effects on the blog posts
    const blogPosts = document.querySelectorAll('#blog .card-hover');
    if (blogPosts) {
        blogPosts.forEach(post => {
            post.addEventListener('mouseenter', function() {
                const img = this.querySelector('img');
                if (img) img.classList.add('scale-110');
            });
            post.addEventListener('mouseleave', function() {
                const img = this.querySelector('img');
                if (img) img.classList.remove('scale-110');
            });
        });
    }

    console.log('All scripts initialized successfully');
}
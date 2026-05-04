const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});


// Lancer l’animation quand la section est visible
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        animateStats();
    }
}, { once: true });

let slides = document.querySelectorAll('.about-slider .slide');
let index = 0;

function showSlide() {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
    index = (index + 1) % slides.length;
}

setInterval(showSlide, 3000); // change toutes les 3 secondes

function animateStats() {
    const stats = document.querySelectorAll('.stat h2');
    stats.forEach(stat => {
        const target = +stat.parentElement.getAttribute('data-target');
        const suffix = stat.parentElement.getAttribute('data-suffix') || '';
        let count = 0;
        const increment = target / 100;

        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.textContent = Math.floor(count) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + suffix;
            }
        };

        updateCount();
    });
}

// Observer pour déclencher l’animation quand la section est visible
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            obs.disconnect(); // éviter de relancer plusieurs fois
        }
    });
}, { threshold: 0.3 }); // déclenche quand 30% de la section est visible

observer.observe(statsSection);

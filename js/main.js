
// spa router and some animations idk

document.addEventListener('DOMContentLoaded', () => {
    // grab all the elements 
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // handles switching between sections without reloading
    function navigateTo(hash) {
        const targetId = hash.replace('#', '') || 'home';

        // hide all sections
        pageSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        // update which nav link is highlighted
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });


        navLinksContainer.classList.remove('active');
        navToggle.classList.remove('active');

        // scroll back to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // re-trigger the fade in stuff
        setTimeout(triggerFadeIn, 100);
    }

    // when someone clicks a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // only do spa stuff for hash links, let gallery.html redirect normally
            if (href.startsWith('#')) {
                e.preventDefault();
                window.location.hash = href;
                navigateTo(href);
            }
        });
    });

    window.addEventListener('hashchange', () => {
        navigateTo(window.location.hash);
    });

    if (window.location.hash) {
        navigateTo(window.location.hash);
    }

    // hamburger menu toggle for mobile
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });

    // fade in elements when they scroll into view
    // using intersection observer bc its smoother than scroll events
    function triggerFadeIn() {
        const fadeElements = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(el => {
            el.classList.remove('visible');
            observer.observe(el);
        });
    }

    triggerFadeIn();

    // make stars twinkle at different times 
    const stars = document.querySelectorAll('.stars span');
    stars.forEach((star, index) => {
        star.style.animationDelay = `${index * 0.5}s`;
    });

    // this is kinda redundant but whatever, handles anchor clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                const targetSection = document.querySelector(targetId);
                if (targetSection && targetSection.classList.contains('page-section')) {
                    // let the spa router handle it
                    return;
                }
            }
        });
    });
});

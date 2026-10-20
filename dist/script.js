document.documentElement.classList.add('dark');

const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const navbar = document.getElementById('navbar');

const words = ['création d\'affiches', 'montage vidéos', 'pubicité et marketing'];
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');
const speed = 100;
const delayBetweenWords = 3000;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        letterIndex--;
    } else {
        letterIndex++;
    }

    if (typingElement) {
        typingElement.textContent = currentWord.substring(0, letterIndex);
    }

    if (!isDeleting && letterIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenWords);
        return;
    }

    if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    type();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const mobileBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileClose = document.getElementById('mobile-menu-close');

    const openMobileMenu = () => {
        mobileMenu.classList.remove('translate-x-full');
        mobileOverlay.classList.remove('hidden');
        mobileBtn?.setAttribute('aria-expanded', 'true');
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.add('translate-x-full');
        mobileOverlay.classList.add('hidden');
        mobileBtn?.setAttribute('aria-expanded', 'false');
    };

    mobileBtn?.addEventListener('click', () => {
        const isOpen = mobileBtn.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMobileMenu() : openMobileMenu();
    });

    mobileOverlay?.addEventListener('click', closeMobileMenu);
    mobileClose?.addEventListener('click', closeMobileMenu);

    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.querySelectorAll('.faq-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.toggle('open');

            if (isOpen) {
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    scrollToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active nav link on scroll
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('#navbar a[href^="#"]'));

    const setActiveNavLink = () => {
        const scrollPosition = window.scrollY + 140;
        let currentSectionId = sections[0]?.id || null;

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${currentSectionId}`;
            link.classList.toggle('nav-active', isActive);
        });
    };

    setActiveNavLink();
    window.addEventListener('scroll', setActiveNavLink);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn?.classList.add('active');
        } else {
            scrollToTopBtn?.classList.remove('active');
        }

        if (navbar) {
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
});

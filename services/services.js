document.addEventListener('DOMContentLoaded', function () {
    if (window.AOS) AOS.init({ duration: 800, once: true });

    const menuBtn = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav-links');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });
        document.querySelectorAll('.nav-links a').forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.classList.remove('open');
            });
        });
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;

    // Pointer-driven 3D parallax for service hero stack
    const stack = document.querySelector('.svc-stack');
    const visual = document.querySelector('.svc-hero-visual');
    if (stack && visual && !reduce && !isTouch) {
        visual.addEventListener('mousemove', (e) => {
            const r = visual.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            stack.style.animation = 'none';
            stack.style.transform = `rotateY(${-22 + px * 18}deg) rotateX(${8 - py * 14}deg)`;
        });
        visual.addEventListener('mouseleave', () => {
            stack.style.animation = '';
            stack.style.transform = '';
        });
    }

    // Tilt for feature mini-cards
    document.querySelectorAll('.svc-feature').forEach((card) => {
        if (reduce || isTouch) return;
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `translateY(-8px) rotateX(${-py * 8}deg) rotateY(${px * 10}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

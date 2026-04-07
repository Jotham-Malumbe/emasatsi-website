// =======================
// Smooth scrolling with header offset
// =======================
const headerHeight = document.querySelector('header').offsetHeight;

document.querySelectorAll('nav ul li a').forEach(link => {
    const targetId = link.getAttribute('href');
    // Only apply smooth scroll for internal links
    if(targetId.startsWith('#')){
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            const sectionPosition = targetSection.offsetTop - headerHeight; // offset for header
            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
        });
    }
});

// =======================
// Active navigation highlighting
// =======================
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 10;
        const sectionHeight = section.clientHeight;
        if(pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight){
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === '#' + current){
            link.classList.add('active');
        }
    });
});

// =======================
// Floating WhatsApp button animation
// =======================
const whatsappBtn = document.querySelector('.whatsapp-float');

setInterval(() => {
    whatsappBtn.style.transform = 'scale(1.05)';
    setTimeout(() => {
        whatsappBtn.style.transform = 'scale(1)';
    }, 400);
}, 4000);
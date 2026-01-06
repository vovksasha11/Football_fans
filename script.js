// Головний скрипт для фан-сайту

document.addEventListener('DOMContentLoaded', function() {
    // Мобільне меню
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Закрити меню при кліку на пункт
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Анімація карток клубів при скролі
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Спостерігаємо за картками клубів
    document.querySelectorAll('.club-card').forEach(card => {
        observer.observe(card);
    });
    
    // Анімація для заголовків секцій
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });
    
    // Плавна прокрутка для всіх посилань з хешем
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаємо посилання, які не посилаються на існуючий елемент
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Якщо це посилання всередині сторінки клубу
                if (window.location.pathname !== 'index.html' && href === '#clubs') {
                    window.location.href = 'index.html' + href;
                    return;
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анімація для кнопок
    const buttons = document.querySelectorAll('.btn, .club-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Динамічне оновлення року у футері
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Імітація завантаження зображень (якщо зображення відсутні)
    const placeholderImages = document.querySelectorAll('img');
    placeholderImages.forEach(img => {
        img.addEventListener('error', function() {
            // Якщо зображення не завантажилося, встановлюємо placeholder
            const clubType = this.closest('.club-card') ? 
                this.closest('.club-card').getAttribute('data-club') : 'default';
            
            const colors = {
                'podillya': '#0057b7',
                'nyva-vin': '#006400',
                'nyva-tern': '#8B0000',
                'epicenter': '#FF8C00',
                'default': '#6c757d'
            };
            
            const color = colors[clubType] || colors.default;
            this.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                    <rect width="200" height="200" fill="${color}" opacity="0.2"/>
                    <text x="50%" y="50%" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" dy=".3em">${clubType.toUpperCase()}</text>
                </svg>
            `)}`;
        });
    });
    
    // Ефект паралаксу для герой-секції
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        });
    }
    
    // Анімація логотипів клубів при наведенні
    const clubLogos = document.querySelectorAll('.club-logo');
    clubLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease';
        });
        
        logo.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Додаємо клас активності для поточної сторінки в навігації
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Додаємо ефект "типу" для заголовків (якщо це сторінка клубу)
    const clubHeaderTitle = document.querySelector('.club-header-title');
    if (clubHeaderTitle) {
        const text = clubHeaderTitle.textContent;
        clubHeaderTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                clubHeaderTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
});


// Інтерактивність для логотипу
document.addEventListener('DOMContentLoaded', function() {
    const logoCircle = document.querySelector('.logo-circle');
    const logoBall = document.querySelector('.logo-ball');
    
    if (logoCircle) {
        // При наведенні миші на логотип
        logoCircle.addEventListener('mouseenter', function() {
            this.style.animation = 'pulseLogo 1s ease-in-out infinite';
            if (logoBall) {
                logoBall.style.animation = 'bounceBall 1s ease-in-out infinite';
            }
        });
        
        logoCircle.addEventListener('mouseleave', function() {
            this.style.animation = 'rotateLogo 20s linear infinite, pulseLogo 3s ease-in-out infinite';
            if (logoBall) {
                logoBall.style.animation = 'bounceBall 2s ease-in-out infinite';
            }
        });
        
        // При кліку на логотип
        logoCircle.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Плавна прокрутка до початку сторінки
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Додаємо ефект паралаксу для логотипу
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.1;
            
            if (logoCircle) {
                logoCircle.style.transform = `rotate(${rate}deg)`;
            }
        });
    }
    
    // Анімація при завантаженні сторінки
    const logoTitle = document.querySelector('.logo-title');
    const logoSubtitle = document.querySelector('.logo-subtitle');
    
    if (logoTitle && logoSubtitle) {
        // Додаємо затримку для послідовної анімації
        setTimeout(() => {
            logoTitle.style.animation = 'slideInRight 1s ease-out both';
        }, 300);
        
        setTimeout(() => {
            logoSubtitle.style.animation = 'slideInRight 1s ease-out both';
        }, 500);
    }
});

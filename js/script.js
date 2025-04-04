// Функция для отображения уведомления о куках
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, принял ли пользователь куки
    if (!localStorage.getItem('cookiesAccepted')) {
        // Если нет, показываем уведомление
        document.getElementById('cookieConsent').style.display = 'block';
    }

    // Обработчик нажатия на кнопку принятия куков
    document.getElementById('acceptCookies').addEventListener('click', function() {
        // Сохраняем в localStorage информацию о том, что пользователь принял куки
        localStorage.setItem('cookiesAccepted', 'true');
        // Скрываем уведомление
        document.getElementById('cookieConsent').style.display = 'none';
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Добавление активного класса к текущему пункту меню
    const currentLocation = window.location.pathname;
    const menuItems = document.querySelectorAll('nav ul li a');
    
    menuItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (currentLocation.includes(itemPath) && itemPath !== 'index.html') {
            item.parentElement.classList.add('active');
        } else if (currentLocation.endsWith('/') && itemPath === 'index.html') {
            item.parentElement.classList.add('active');
        }
    });
    
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Анимация гамбургер-меню
            const spans = this.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Скрытие/показ навигации при прокрутке
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Если прокрутили больше 200px, показываем кнопку "наверх"
        if (scrollTop > 200) {
            document.querySelector('.back-to-top').classList.add('visible');
        } else {
            document.querySelector('.back-to-top').classList.remove('visible');
        }
        
        // Скрываем/показываем навигацию
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Прокрутка вниз - скрываем навигацию
            header.classList.add('hide');
        } else {
            // Прокрутка вверх - показываем навигацию
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Кнопка "наверх"
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

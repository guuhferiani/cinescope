/*
    CineScope - Navigation & Theme Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    // Seletores
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const body = document.body;

    // 1. Lógica do Menu Mobile (Hamburger)
    function toggleMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Impede scroll do body quando menu está aberto
        body.style.overflow = !isExpanded ? 'hidden' : 'auto';
    }

    hamburger.addEventListener('click', toggleMenu);

    // Fecha menu ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) toggleMenu();
        });
    });

    // 2. Lógica do Toggle de Tema
    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('cinescope-theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('cinescope-theme', 'dark');
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
        setTheme(currentTheme);
    });

    // Carregar tema preferido
    const savedTheme = localStorage.getItem('cinescope-theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
    }

    // 3. Lógica da Busca Overlay
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => document.getElementById('search-input').focus(), 300);
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    // Fechar busca com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });

    // 4. Efeito Sticky no Header
    let lastScroll = 0;
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
            return;
        }

        if (currentScroll > lastScroll) {
            // Rola para baixo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Rola para cima
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        lastScroll = currentScroll;
    });
});

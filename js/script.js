// =========================================
// SCRIPT TEMPORÁRIO DO MAZE (APAGAR APÓS O TESTE)
// =========================================
(function (m, a, z, e) {
  var s, t, u, v;
  try {
    t = m.sessionStorage.getItem('maze-us');
  } catch (err) {}

  if (!t) {
    t = new Date().getTime();
    try {
      m.sessionStorage.setItem('maze-us', t);
    } catch (err) {}
  }

  u = document.currentScript || (function () {
    var w = document.getElementsByTagName('script');
    return w[w.length - 1];
  })();
  v = u && u.nonce;

  s = a.createElement('script');
  s.src = z + '?apiKey=' + e;
  s.async = true;
  if (v) s.setAttribute('nonce', v);
  a.getElementsByTagName('head')[0].appendChild(s);
  m.mazeUniversalSnippetApiKey = e;
})(window, document, 'https://snippet.maze.co/maze-universal-loader.js', 'a86da4b4-ebbb-4c2e-bedd-f9368592b080');









document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 1. MENU MOBILE
    // =========================================
    const navMenu = document.getElementById("nav-menu");
    
    const toggleMenu = (isActive) => {
        navMenu?.classList.toggle("active", isActive);
        document.body.style.overflow = isActive ? "hidden" : "";
    };

    document.getElementById("menu-btn")?.addEventListener("click", () => toggleMenu(true));
    document.getElementById("close-btn")?.addEventListener("click", () => toggleMenu(false));
    
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => toggleMenu(false));
    });

    // =========================================
    // 2. INDICADOR FLUTUANTE E SCROLLSPY
    // =========================================
    const navUl = document.querySelector(".nav-menu ul");
    const navLinksText = document.querySelectorAll(".nav-menu ul > li > a:not(.btn-primary)");
    const indicator = document.querySelector(".nav-indicator");
    const sections = document.querySelectorAll("section[id]");
    const defaultActiveLink = document.querySelector(".nav-menu a.active-link");
    
    let isMenuHovered = false;

    if (navUl && indicator) {
        const moveIndicator = (element) => {
            if (!element) {
                indicator.style.width = "0px";
                return;
            }
            const { left: ulLeft } = navUl.getBoundingClientRect();
            const { left: linkLeft, width } = element.getBoundingClientRect();
            
            indicator.style.width = `${width}px`;
            indicator.style.left = `${linkLeft - ulLeft}px`;
        };

        navUl.addEventListener("mouseenter", () => isMenuHovered = true);
        navUl.addEventListener("mouseleave", () => {
            isMenuHovered = false;
            moveIndicator(document.querySelector(".nav-menu a.active-link"));
        });

        navLinksText.forEach(link => {
            link.addEventListener("mouseenter", () => moveIndicator(link));
        });

        setTimeout(() => moveIndicator(document.querySelector(".nav-menu a.active-link")), 100);

        if (sections.length > 0) {
            const updateActiveOnScroll = () => {
                const scrollY = window.scrollY;
                let currentSection = "";

                sections.forEach(section => {
                    if (scrollY >= section.offsetTop - 180) {
                        currentSection = section.id;
                    }
                });

                navLinksText.forEach(link => {
                    const isMatch = link.getAttribute("href").endsWith(`#${currentSection}`);
                    link.classList.toggle("active-link", Boolean(currentSection && isMatch));
                });

                if (!currentSection && scrollY < 200 && defaultActiveLink) {
                    defaultActiveLink.classList.add("active-link");
                }

                if (!isMenuHovered) {
                    moveIndicator(document.querySelector(".nav-menu a.active-link"));
                }
            };

            let isScrolling = false;
            window.addEventListener("scroll", () => {
                if (!isScrolling) {
                    window.requestAnimationFrame(() => {
                        updateActiveOnScroll();
                        isScrolling = false;
                    });
                    isScrolling = true;
                }
            }, { passive: true });
            
            setTimeout(updateActiveOnScroll, 100);
        }
    }

    // =========================================
    // 3. CARDS CLICÁVEIS (REDIRECIONAMENTO)
    // =========================================
    document.querySelectorAll('.card-clicavel').forEach(card => {
        card.addEventListener('click', function() {
            const destino = this.getAttribute('data-link');
            if (destino) window.location.href = destino;
        });
    });

    // =========================================
    // 4. PROTEÇÃO DE IMAGENS
    // =========================================
    document.addEventListener('contextmenu', function(evento) {
        if (evento.target.tagName === 'IMG') {
            evento.preventDefault();
        }
    });

});

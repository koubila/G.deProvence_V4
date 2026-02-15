document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
    const countries = await response.json();
    
    const select = document.getElementById('zone');
    const frenchNames = countries
      .map(country => country.name.common?.fr || country.name.common)
      .sort();
    
    frenchNames.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Erreur chargement pays:', error);
  }
});

        // Toggle menu mobile
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        // Gestion des sous-menus sur mobile (au clic)
        document.querySelectorAll('.has-subnav > a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 960) {
                    const parentLi = this.parentElement;
                    parentLi.classList.toggle('active');
                    
                    const subLinks = parentLi.querySelectorAll('.subnav a');
                    subLinks.forEach(sub => {
                        sub.addEventListener('click', () => {
                            setTimeout(() => {
                                document.getElementById('navLinks').classList.remove('active');
                            }, 300);
                        });
                    });
                }
            });
        });

        // Smooth scroll avec compensation de la navbar
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Permet au menu mobile de se fermer avant le scroll si besoin
                if (window.innerWidth <= 960) {
                    // Note: On ne ferme pas immédiatement si c'est un parent de submenu
                    if (!this.parentElement.classList.contains('has-subnav')) {
                         document.getElementById('navLinks').classList.remove('active');
                    }
                }

                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        // 1. Récupérer la hauteur de la navbar
                        const navHeight = document.querySelector('nav').offsetHeight;
                        
                        // 2. Calculer la position de l'élément cible
                        const elementPosition = target.getBoundingClientRect().top;
                        
                        // 3. Calculer la position de scroll finale (position actuelle + position élément - hauteur navbar - marge de confort)
                        const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                }
            });
        });

        // Formulaire de contact
        // document.getElementById('contactForm').addEventListener('submit', function(e) {
        //     e.preventDefault();
        //     const successMessage = document.getElementById('successMessage');
        //     successMessage.style.display = 'block';
        //     this.reset();
        //     setTimeout(() => {
        //         successMessage.style.display = 'none';
        //     }, 5000);
        // });
        const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = new FormData(form);

    const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        form.reset();
        successMessage.style.display = "block";
        successMessage.scrollIntoView({ behavior: "smooth" });
    } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

        // Effet parallaxe léger sur le hero banner
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroBanner = document.querySelector('.hero-banner');
            if (heroBanner) {
                heroBanner.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
            }
        });

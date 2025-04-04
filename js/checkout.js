document.addEventListener('DOMContentLoaded', function() {
    const navBtn = document.getElementById('nav-btn');
    const navbar = document.querySelector('.navbar');
    
    navBtn.addEventListener('click', function() {
        // Toggle classes activas
        this.classList.toggle('active');
        navbar.classList.toggle('active');
        
        // Bloquear scroll cuando el menú está abierto
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('.menu-items a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navBtn.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && e.target !== navBtn) {
            navBtn.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar el botón de pagar
    const payButton = document.querySelector(".pay");

    // Agregar evento de clic
    payButton.addEventListener("click", function () {
        Swal.fire({
            title: "Processing Payment...",
            text: "Please wait while we confirm your payment.",
            icon: "success",
            draggable: true
        });
    });
});
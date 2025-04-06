document.addEventListener('DOMContentLoaded', function() {
    // Productos
    const products = [
        {
            id: 1,
            name: 'Modern light clothes',
            description: 'Dress modern',
            price: 212.99,
            quantity: 4,
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 2,
            name: 'Modern light clothes',
            description: 'Dress modern',
            price: 162.99,
            quantity: 1,
            image: 'https://via.placeholder.com/80'
        }
    ];

    // Elementos DOM
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');
    const quantityElements = document.querySelectorAll('.quantity');
    const totalPriceElement = document.getElementById('total-price');
    const subTotalElement = document.getElementById('sub-total');
    const payButton = document.querySelector('.pay-button');

    // Actualizar cantidades
    function updateQuantity(id, change) {
        const product = products.find(p => p.id === id);
        if (product) {
            const newQuantity = product.quantity + change;
            if (newQuantity >= 1) {
                product.quantity = newQuantity;
                
                // Actualizar el DOM
                const quantityElement = document.querySelector(`.quantity[data-id="${id}"]`);
                if (quantityElement) {
                    quantityElement.textContent = newQuantity;
                }
                
                // Recalcular totales
                updateTotals();
            }
        }
    }

    // Calcular y actualizar totales
    function updateTotals() {
        const total = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        const itemCount = products.reduce((count, product) => count + product.quantity, 0);
        
        // Actualizar el DOM
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
        subTotalElement.textContent = `$${total.toFixed(2)}`;
        
        // Actualizar el contador de items (opcional)
        const totalText = document.querySelector('.summary-row:first-child span:first-child');
        if (totalText) {
            totalText.textContent = `Total (${itemCount} items)`;
        }
    }

    // Event listeners para los botones de incremento
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            updateQuantity(id, 1);
        });
    });

    // Event listeners para los botones de decremento
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            updateQuantity(id, -1);
        });
    });

    // Event listener para el botón de pago
    payButton.addEventListener('click', function() {
        alert('Procesando pago...');
    });

    // Inicializar totales
    updateTotals();
});
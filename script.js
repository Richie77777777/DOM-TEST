document.addEventListener("DOMContentLoaded", function() {
    const cartItems = [
        { id: 1, name: "Item 1", price: 10.00, quantity: 1, liked: false },
        { id: 2, name: "Item 2", price: 20.00, quantity: 1, liked: false },
        { id: 3, name: "Item 3", price: 15.00, quantity: 1, liked: false }
    ];

    const cartContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');

    function updateTotalPrice() {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalPriceEl.textContent = total.toFixed(2);
    }

    function renderCartItems() {
        cartContainer.innerHTML = '';
        cartItems.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <h3>${item.name} - $${item.price.toFixed(2)}</h3>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <div>
                    <span class="like-button ${item.liked ? 'liked' : ''}" onclick="toggleLike(${item.id})">❤️</span>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </div>
            `;
            cartContainer.appendChild(itemEl);
        });
        updateTotalPrice();
    }

    window.increaseQuantity = function(id) {
        const item = cartItems.find(item => item.id === id);
        item.quantity++;
        renderCartItems();
    }

    window.decreaseQuantity = function(id) {
        const item = cartItems.find(item => item.id === id);
        if (item.quantity > 1) {
            item.quantity--;
        }
        renderCartItems();
    }

    window.deleteItem = function(id) {
        const index = cartItems.findIndex(item => item.id === id);
        cartItems.splice(index, 1);
        renderCartItems();
    }

    window.toggleLike = function(id) {
        const item = cartItems.find(item => item.id === id);
        item.liked = !item.liked;
        renderCartItems();
    }

    renderCartItems();
});


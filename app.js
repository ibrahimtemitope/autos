// ============================================================================
// STORE APPLICATION - Main JavaScript File
// ============================================================================

// STATE MANAGEMENT
const state = {
    cart: [],
    theme: localStorage.getItem('app-theme') || 'dark',
    filters: {
        type: '',
        price: '',
        year: '',
        sort: 'featured'
    }
};

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBadge = document.getElementById('cartBadge');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const overlay = document.getElementById('overlay');
const themeToggle = document.getElementById('themeToggle');
const typeFilter = document.getElementById('typeFilter');
const priceFilter = document.getElementById('priceFilter');
const yearFilter = document.getElementById('yearFilter');
const sortFilter = document.getElementById('sortFilter');
const resetBtn = document.getElementById('resetBtn');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// ============================================================================
// INITIALIZATION
// ============================================================================

function init() {
    loadTheme();
    loadCart();
    renderProducts();
    attachEventListeners();
    console.log('[v0] Application initialized');
}

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

function loadTheme() {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
        state.theme = savedTheme;
        document.body.setAttribute('data-theme', savedTheme);
    }
}

themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', state.theme);
    localStorage.setItem('app-theme', state.theme);
}

// ============================================================================
// PRODUCT RENDERING
// ============================================================================

function renderProducts() {
    let filtered = filterProducts(state.filters.type, state.filters.price, state.filters.year);
    let sorted = sortProducts(filtered, state.filters.sort);
    
    productsGrid.innerHTML = '';
    
    sorted.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
    
    console.log(`[v0] Rendered ${sorted.length} products`);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const priceFormatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(product.price);
    
    const specsHtml = product.specs.map(s => `<span class="spec">${s}</span>`).join('');
    const starsHtml = '★'.repeat(Math.floor(product.rating)) + 
                      (product.rating % 1 >= 0.5 ? '½' : '');
    
    card.innerHTML = `
        <div class="product-image">
            ${product.image}
            ${product.condition !== 'Like New' ? `<div class="product-badge">${product.condition}</div>` : ''}
        </div>
        <div class="product-content">
            <div class="product-brand">${product.brand}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-specs">
                ${specsHtml}
            </div>
            <div class="product-rating">
                <span class="stars">${starsHtml}</span>
                <span>(${product.reviews})</span>
            </div>
            <div class="product-footer">
                <div>
                    <span class="product-price-label">From</span>
                    <div class="product-price">${priceFormatted}</div>
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}">Add</button>
            </div>
        </div>
    `;
    
    // Add to cart functionality
    const addBtn = card.querySelector('.add-to-cart-btn');
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product);
    });
    
    // View details on card click
    card.addEventListener('click', () => {
        showProductDetails(product);
    });
    
    return card;
}

// ============================================================================
// CART MANAGEMENT
// ============================================================================

function loadCart() {
    const saved = localStorage.getItem('app-cart');
    if (saved) {
        state.cart = JSON.parse(saved);
    }
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('app-cart', JSON.stringify(state.cart));
}

function addToCart(product) {
    const existing = state.cart.find(item => item.id === product.id);
    
    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({
            id: product.id,
            brand: product.brand,
            name: product.name,
            price: product.price,
            qty: 1
        });
    }
    
    saveCart();
    updateCartUI();
    openCart();
    showCartNotification();
    console.log(`[v0] Added ${product.name} to cart`);
}

function removeFromCart(id) {
    state.cart = state.cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = count;
    
    if (state.cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = '';
    
    state.cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div>
                <div class="cart-item-name">${item.brand} ${item.name}</div>
                <div style="font-size: 0.85rem; color: var(--text-tertiary);">Qty: ${item.qty}</div>
            </div>
            <div style="text-align: right;">
                <div class="cart-item-price">${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(itemTotal)}</div>
                <button style="background: none; border: none; color: var(--text-tertiary); cursor: pointer; font-size: 0.8rem; margin-top: 4px;" data-id="${item.id}">Remove</button>
            </div>
        `;
        
        const removeBtn = itemEl.querySelector('button');
        removeBtn.addEventListener('click', () => removeFromCart(item.id));
        cartItems.appendChild(itemEl);
    });
    
    cartTotal.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(total);
}

function openCart() {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
}

// ============================================================================
// FILTERING & SORTING
// ============================================================================

typeFilter.addEventListener('change', (e) => {
    state.filters.type = e.target.value;
    renderProducts();
});

priceFilter.addEventListener('change', (e) => {
    state.filters.price = e.target.value;
    renderProducts();
});

yearFilter.addEventListener('change', (e) => {
    state.filters.year = e.target.value;
    renderProducts();
});

sortFilter.addEventListener('change', (e) => {
    state.filters.sort = e.target.value;
    renderProducts();
});

resetBtn.addEventListener('click', () => {
    state.filters = { type: '', price: '', year: '', sort: 'featured' };
    typeFilter.value = '';
    priceFilter.value = '';
    yearFilter.value = '';
    sortFilter.value = 'featured';
    renderProducts();
});

// ============================================================================
// CART SIDEBAR
// ============================================================================

cartToggle.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartSidebar);
overlay.addEventListener('click', closeCartSidebar);

checkoutBtn.addEventListener('click', () => {
    if (state.cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    // In a real app, this would go to a checkout page
    alert(`Proceeding to checkout with ${state.cart.length} item(s). Total: ${cartTotal.textContent}`);
    console.log('[v0] Checkout initiated', state.cart);
});

// ============================================================================
// PRODUCT DETAILS MODAL
// ============================================================================

function showProductDetails(product) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 500;
        backdrop-filter: blur(4px);
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: var(--surface);
        border-radius: 16px;
        padding: 32px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;
    
    const priceFormatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(product.price);
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 24px;">
            <div>
                <div style="font-size: 2.5rem; margin-bottom: 12px;">${product.image}</div>
                <h2 style="font-size: 1.8rem; margin-bottom: 4px;">${product.brand} ${product.name}</h2>
                <p style="color: var(--text-secondary);">${product.year} • ${product.mileage}</p>
            </div>
            <button style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary);" onclick="this.closest('.modal').remove()">✕</button>
        </div>
        
        <div style="background: var(--surface-alt); padding: 20px; border-radius: 12px; margin-bottom: 24px;">
            <div style="font-size: 0.85rem; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 8px;">Price</div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--accent);">${priceFormatted}</div>
        </div>
        
        <div style="margin-bottom: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 16px;">Specifications</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div style="background: var(--surface-alt); padding: 12px; border-radius: 8px;">
                    <div style="font-size: 0.8rem; color: var(--text-tertiary);">Condition</div>
                    <div style="font-weight: 600;">${product.condition}</div>
                </div>
                <div style="background: var(--surface-alt); padding: 12px; border-radius: 8px;">
                    <div style="font-size: 0.8rem; color: var(--text-tertiary);">Color</div>
                    <div style="font-weight: 600;">${product.color}</div>
                </div>
                <div style="background: var(--surface-alt); padding: 12px; border-radius: 8px;">
                    <div style="font-size: 0.8rem; color: var(--text-tertiary);">Type</div>
                    <div style="font-weight: 600; text-transform: capitalize;">${product.type}</div>
                </div>
                <div style="background: var(--surface-alt); padding: 12px; border-radius: 8px;">
                    <div style="font-size: 0.8rem; color: var(--text-tertiary);">Year</div>
                    <div style="font-weight: 600;">${product.year}</div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 12px;">Features</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${product.features.map(f => `<span style="background: var(--accent-light); color: var(--accent); padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 500;">${f}</span>`).join('')}
            </div>
        </div>
        
        <div style="margin-bottom: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 12px;">Engine & Performance</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${product.specs.map(s => `<span style="background: var(--surface-alt); padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">${s}</span>`).join('')}
            </div>
        </div>
        
        <div style="display: flex; gap: 12px;">
            <button onclick="
                const product = ${JSON.stringify(product).replace(/"/g, '&quot;')};
                addToCart(JSON.parse(product.replace(/&quot;/g, '\"')));
                this.closest('.modal').remove();
            " style="flex: 1; padding: 14px; background: var(--accent); border: none; border-radius: 8px; color: var(--bg); font-weight: 600; cursor: pointer;">
                Add to Cart
            </button>
            <button onclick="this.closest('.modal').remove()" style="flex: 1; padding: 14px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary); font-weight: 600; cursor: pointer;">
                Close
            </button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ============================================================================
// CHATBOT - AI ASSISTANT
// ============================================================================

const botResponses = {
    greet: [
        'Hello! How can I help you find the perfect vehicle today?',
        'Welcome to ALLIOSH Motors! What are you looking for?',
        'Hi there! I\'m here to help. What questions do you have?'
    ],
    price: [
        'We offer vehicles ranging from $26,700 to $125,400. What\'s your budget?',
        'Our collection spans various price points. Are you looking for something under $50k or premium luxury?',
        'Budget-friendly or luxury? We have options for every price range!'
    ],
    vehicle: [
        'We have sedans, SUVs, trucks, luxury vehicles, and sports cars. What interests you?',
        'Looking for a sedan, SUV, truck, or something sportier?',
        'Our collection includes everything from practical daily drivers to high-performance sports cars.'
    ],
    test_drive: [
        'Absolutely! You can schedule a test drive by contacting our team. Would you like our contact information?',
        'Test drives are available! Please call +234 810 0000 000 to schedule yours.',
        'We\'d love to have you test drive a vehicle. Contact us to book an appointment.'
    ],
    delivery: [
        'We offer delivery services across the region. Most deliveries happen within 48 hours.',
        'Delivery is available and usually takes 1-2 business days. Want more info?',
        'Yes, we deliver! Standard delivery takes 2-3 business days depending on location.'
    ],
    default: [
        'That\'s a great question! Could you tell me more about what you\'re looking for?',
        'I can help with that! Ask me about our vehicles, prices, delivery, or test drives.',
        'Interesting! Is there anything specific about our vehicles you\'d like to know?'
    ]
};

function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    if (msg.match(/price|cost|expensive|budget|afford/)) return randomResponse(botResponses.price);
    if (msg.match(/vehicle|car|model|sedan|suv|truck|sports/)) return randomResponse(botResponses.vehicle);
    if (msg.match(/test drive|drive|test|demo/)) return randomResponse(botResponses.test_drive);
    if (msg.match(/delivery|deliver|ship|transport/)) return randomResponse(botResponses.delivery);
    if (msg.match(/hello|hi|hey|greet|good morning/)) return randomResponse(botResponses.greet);
    if (msg.match(/thank|thanks|thanks|appreciate/)) return 'You\'re welcome! Let me know if you need anything else.';
    if (msg.match(/contact|call|phone|email|whatsapp/)) return 'You can reach us at +234 810 0000 000 or visit our admin portal.';
    
    return randomResponse(botResponses.default);
}

function randomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function addMessageToChat(text, isUser) {
    const message = document.createElement('div');
    message.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
    message.innerHTML = `<div class="message-content">${escapeHtml(text)}</div>`;
    chatbotMessages.appendChild(message);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('open');
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('open');
});

function sendChatMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;
    
    addMessageToChat(text, true);
    chatbotInput.value = '';
    
    setTimeout(() => {
        const response = getBotResponse(text);
        addMessageToChat(response, false);
        console.log('[v0] Bot response sent');
    }, 600);
}

chatbotSend.addEventListener('click', sendChatMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
});

// ============================================================================
// NOTIFICATIONS
// ============================================================================

function showCartNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--accent);
        color: var(--bg);
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = '✓ Added to cart';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================================================
// ATTACH EVENT LISTENERS
// ============================================================================

function attachEventListeners() {
    // All listeners are already attached above
    console.log('[v0] Event listeners attached');
}

// ============================================================================
// INITIALIZE APP
// ============================================================================

document.addEventListener('DOMContentLoaded', init);

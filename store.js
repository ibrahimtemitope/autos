// =========================================================
//  UNIQUE ALLIOSH — STORE ENGINE
// =========================================================
let currentFilter = 'all';
let currentSort = 'featured';
let cart = JSON.parse(localStorage.getItem('ua-cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('ua-wishlist') || '[]');
let activeProduct = null;
let hoverTimer = null;

function formatPrice(n) { return '\u20a6' + n.toLocaleString('en-NG'); }
function formatShort(n) {
    if (n >= 1000000) return '\u20a6' + (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + 'M';
    return '\u20a6' + n.toLocaleString('en-NG');
}
function starSvg(filled) {
    return '<svg viewBox="0 0 24 24" fill="' + (filled ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
}
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ---------- RENDER PRODUCTS ----------
function renderProducts() {
    let q = document.getElementById('searchInput').value.toLowerCase();
    let filtered = products.filter(function (p) {
        if (currentFilter !== 'all' && p.category !== currentFilter) return false;
        if (q && p.name.toLowerCase().indexOf(q) === -1 && p.desc.toLowerCase().indexOf(q) === -1 && p.brand.toLowerCase().indexOf(q) === -1) return false;
        return true;
    });
    if (currentSort === 'price-low') filtered.sort(function (a, b) { return a.price - b.price; });
    if (currentSort === 'price-high') filtered.sort(function (a, b) { return b.price - a.price; });
    if (currentSort === 'rating') filtered.sort(function (a, b) { return b.rating - a.rating; });

    var grid = document.getElementById('productGrid');
    document.getElementById('resultsCount').textContent = 'Showing ' + filtered.length + ' vehicle' + (filtered.length !== 1 ? 's' : '');

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--text-dim)">No vehicles match your search. Try a different filter or ask our concierge.</div>';
        return;
    }

    grid.innerHTML = filtered.map(function (p) {
        var badgeClass = p.badge === 'sale' ? 'badge-sale' : p.badge === 'new' ? 'badge-new' : 'badge-certified';
        var badgeText = p.badge === 'sale' ? 'SALE' : p.badge === 'new' ? 'BRAND NEW' : 'CERTIFIED';
        var filled = Math.round(p.rating);
        var stars = '';
        for (var i = 0; i < 5; i++) stars += starSvg(i < filled);
        var year = p.specs['Year'] || '';
        var fuel = p.specs['Fuel'] || (p.specs['Range'] ? 'Electric' : '');
        var trans = (p.specs['Transmission'] || '').split(' ')[0];
        var isWished = wishlist.indexOf(p.id) !== -1;
        return '<div class="product-card" onclick="openProductModal(' + p.id + ')" onmouseenter="onProductHover(' + p.id + ')" onmouseleave="onProductLeave()">' +
            '<div class="product-img-wrap">' +
                '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" onerror="this.src=\'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80\'">' +
                '<span class="product-badge ' + badgeClass + '">' + badgeText + '</span>' +
                '<button class="wish-btn ' + (isWished ? 'active' : '') + '" onclick="event.stopPropagation(); toggleWish(' + p.id + ', this)" aria-label="Save">' +
                    '<svg viewBox="0 0 24 24" fill="' + (isWished ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>' +
                '</button>' +
            '</div>' +
            '<div class="product-info">' +
                '<div class="product-cat">' + p.brand + '</div>' +
                '<div class="product-name">' + p.name + '</div>' +
                '<div class="product-quickspecs">' +
                    (year ? '<span class="qspec">' + year + '</span>' : '') +
                    (p.specs['Mileage'] ? '<span class="qspec">' + p.specs['Mileage'] + '</span>' : '') +
                    (trans ? '<span class="qspec">' + trans + '</span>' : '') +
                    (fuel ? '<span class="qspec">' + fuel + '</span>' : '') +
                '</div>' +
                '<div class="product-meta">' +
                    '<div class="product-rating">' + stars + '<span>(' + p.reviews + ')</span></div>' +
                    '<span class="product-condition">' + p.condition + '</span>' +
                '</div>' +
                '<div class="product-price-row">' +
                    '<span class="product-price">' + formatPrice(p.price) + '</span>' +
                    (p.oldPrice ? '<span class="product-old-price">' + formatPrice(p.oldPrice) + '</span>' : '') +
                '</div>' +
                '<button class="add-cart-btn" onclick="event.stopPropagation(); addToCart(' + p.id + ', 1)">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M6 6L5 3H2"/></svg>' +
                    'Reserve Vehicle' +
                '</button>' +
            '</div>' +
        '</div>';
    }).join('');
}

function setFilter(el, filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
    el.classList.add('active');
    // sync nav links
    document.querySelectorAll('.nav-links a').forEach(function (a) { a.classList.remove('active'); });
    renderProducts();
}
function setFilterByName(filter, navEl) {
    currentFilter = filter;
    document.querySelectorAll('.filter-chip').forEach(function (c) {
        c.classList.toggle('active', c.getAttribute('data-filter') === filter);
    });
    if (navEl) {
        document.querySelectorAll('.nav-links a').forEach(function (a) { a.classList.remove('active'); });
        navEl.classList.add('active');
    }
    document.querySelector('.products-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
    renderProducts();
}
function sortProducts() { currentSort = document.getElementById('sortSelect').value; renderProducts(); }
function filterProducts() { renderProducts(); }

// ---------- PRODUCT MODAL ----------
function openProductModal(id) {
    var p = products.find(function (x) { return x.id === id; });
    if (!p) return;
    activeProduct = p;
    var filled = Math.round(p.rating);
    var stars = '';
    for (var i = 0; i < 5; i++) stars += starSvg(i < filled);
    var specsHtml = '';
    for (var key in p.specs) specsHtml += '<div class="pd-spec"><span class="pd-spec-label">' + key + '</span><span class="pd-spec-value">' + p.specs[key] + '</span></div>';
    var discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    var gallery = p.gallery || [p.image];
    var thumbs = gallery.map(function (g, i) {
        return '<div class="pd-thumb ' + (i === 0 ? 'active' : '') + '" onclick="swapGallery(\'' + g + '\', this)"><img src="' + g + '" alt=""></div>';
    }).join('');

    document.getElementById('modalContent').innerHTML =
        '<div class="pd-gallery">' +
            '<div class="pd-img-main"><img id="pdMainImg" src="' + gallery[0] + '" alt="' + p.name + '"></div>' +
            '<div class="pd-thumbs">' + thumbs + '</div>' +
        '</div>' +
        '<div class="pd-content">' +
            '<div class="pd-cat">' + p.brand + ' &bull; ' + p.condition + '</div>' +
            '<h2 class="pd-title">' + p.name + '</h2>' +
            '<div class="pd-rating"><div class="pd-rating-stars">' + stars + '</div><span class="pd-rating-text">' + p.rating.toFixed(1) + ' (' + p.reviews + ' reviews)</span></div>' +
            '<div class="pd-price-row">' +
                '<span class="pd-price">' + formatPrice(p.price) + '</span>' +
                (p.oldPrice ? '<span class="pd-old-price">' + formatPrice(p.oldPrice) + '</span>' : '') +
                (discount ? '<span class="pd-discount">-' + discount + '%</span>' : '') +
            '</div>' +
            '<p class="pd-desc">' + p.desc + '</p>' +
            '<div class="pd-specs">' + specsHtml + '</div>' +
            '<div class="pd-actions">' +
                '<button class="pd-add-cart" onclick="addToCart(' + p.id + ', 1); closeProductModal();">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M6 6L5 3H2"/></svg>' +
                    'Reserve This Vehicle' +
                '</button>' +
                '<button class="pd-ask" onclick="askAboutProduct(' + p.id + ')">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>' +
                    'Ask' +
                '</button>' +
            '</div>' +
        '</div>';
    document.getElementById('productModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function swapGallery(src, el) {
    document.getElementById('pdMainImg').src = src;
    document.querySelectorAll('.pd-thumb').forEach(function (t) { t.classList.remove('active'); });
    el.classList.add('active');
}
function closeProductModal() {
    document.getElementById('productModal').classList.remove('open');
    document.body.style.overflow = '';
    activeProduct = null;
}

// ---------- CART ----------
function addToCart(id, qty) {
    var p = products.find(function (x) { return x.id === id; });
    if (!p) return;
    var existing = cart.find(function (i) { return i.id === id; });
    if (existing) existing.qty += qty;
    else cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty: qty });
    saveCart();
    showToast(p.name + ' reserved');
    updateCartBadge();
}
function removeFromCart(id) { cart = cart.filter(function (i) { return i.id !== id; }); saveCart(); renderCart(); updateCartBadge(); }
function updateCartQty(id, delta) {
    var item = cart.find(function (i) { return i.id === id; });
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart(); renderCart(); updateCartBadge();
}
function saveCart() { localStorage.setItem('ua-cart', JSON.stringify(cart)); }
function updateCartBadge() {
    var count = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    document.getElementById('cartBadge').textContent = count;
}
function renderCart() {
    var itemsEl = document.getElementById('cartItems');
    var footerEl = document.getElementById('cartFooter');
    if (cart.length === 0) {
        itemsEl.innerHTML = '<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M6 6L5 3H2"/></svg><span>Your garage is empty</span><span style="font-size:0.8rem">Reserve a premium vehicle to begin.</span></div>';
        footerEl.style.display = 'none';
        return;
    }
    itemsEl.innerHTML = cart.map(function (item) {
        return '<div class="cart-item">' +
            '<img src="' + item.image + '" alt="' + item.name + '" class="cart-item-img">' +
            '<div class="cart-item-info">' +
                '<div class="cart-item-name">' + item.name + '</div>' +
                '<div class="cart-item-price">' + formatPrice(item.price) + '</div>' +
                '<div class="cart-item-qty">' +
                    '<button onclick="updateCartQty(' + item.id + ', -1)">\u2212</button>' +
                    '<span>' + item.qty + '</span>' +
                    '<button onclick="updateCartQty(' + item.id + ', 1)">+</button>' +
                '</div>' +
            '</div>' +
            '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' +
        '</div>';
    }).join('');
    var subtotal = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    document.getElementById('cartSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('cartTotal').textContent = formatPrice(subtotal);
    footerEl.style.display = 'block';
}
function toggleCart() {
    var overlay = document.getElementById('cartOverlay');
    var sidebar = document.getElementById('cartSidebar');
    if (sidebar.classList.contains('open')) {
        overlay.classList.remove('open'); sidebar.classList.remove('open'); document.body.style.overflow = '';
    } else {
        renderCart(); overlay.classList.add('open'); sidebar.classList.add('open'); document.body.style.overflow = 'hidden';
    }
}
function handleCheckout() {
    if (cart.length === 0) { showToast('Your garage is empty'); return; }
    // Show sophisticated confirmation modal instead of just a toast
    showReservationConfirmation();
}

// ---------- RESERVATION CONFIRMATION ----------
function showReservationConfirmation() {
    var total = cart.reduce(function(sum, item) { 
        var p = products.find(function(x) { return x.id === item.id; });
        return sum + (p ? p.price * item.qty : 0);
    }, 0);
    
    var vehiclesList = cart.map(function(item) {
        var p = products.find(function(x) { return x.id === item.id; });
        return p ? '• ' + p.name + ' (x' + item.qty + ')' : '';
    }).join('\n');
    
    // Create confirmation modal
    var modal = document.createElement('div');
    modal.id = 'reservationModal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(10,10,15,0.8);z-index:500;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px)';
    
    var content = document.createElement('div');
    content.style.cssText = 'background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:48px;max-width:520px;width:90%;text-align:center;box-shadow:0 25px 80px rgba(0,0,0,0.6);animation:slideUp 0.4s ease';
    
    content.innerHTML = `
        <div style="font-size:3rem;margin-bottom:20px">✓</div>
        <h2 style="font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:600;margin-bottom:12px;color:var(--text)">Reservation Confirmed!</h2>
        <p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-bottom:24px">
            Your reservation has been received. Our dedicated team will contact you within the next <strong>2 hours</strong> to confirm details, arrange payment, and schedule your test drive or delivery.
        </p>
        
        <div style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:24px;text-align:left">
            <div style="font-size:0.85rem;font-weight:600;color:var(--accent);text-transform:uppercase;margin-bottom:12px">Reserved Vehicles:</div>
            ${cart.map(function(item) {
                var p = products.find(function(x) { return x.id === item.id; });
                if (!p) return '';
                return `
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem">
                        <span>${p.name}</span>
                        <span style="color:var(--accent);font-weight:600">${formatPrice(p.price)}</span>
                    </div>
                `;
            }).join('')}
            <div style="border-top:1px solid var(--border);padding-top:12px;margin-top:12px;display:flex;justify-content:space-between;font-weight:600">
                <span>Total Value:</span>
                <span style="color:var(--accent)">${formatPrice(total)}</span>
            </div>
        </div>
        
        <div style="background:var(--accent-soft);border:1px solid var(--accent);border-radius:10px;padding:16px;margin-bottom:24px">
            <div style="color:var(--accent);font-size:0.85rem;font-weight:600;margin-bottom:8px">Contact Information</div>
            <div style="font-size:0.9rem;color:var(--text);line-height:1.6">
                <strong>WhatsApp:</strong> +234 803 456 7890<br>
                <strong>Phone:</strong> +234 1 2700 700<br>
                <strong>Email:</strong> sales@uniquealliosh.com
            </div>
        </div>
        
        <div style="display:flex;gap:12px">
            <button onclick="document.getElementById('reservationModal').remove();toggleCart();showToast('Reservation saved to your account')" style="flex:1;padding:14px;background:var(--surface-hover);border:1px solid var(--border);border-radius:10px;color:var(--text);font-weight:600;cursor:pointer;transition:var(--transition)">Continue Shopping</button>
            <button onclick="document.getElementById('reservationModal').remove();toggleCart();window.location.href='#'" style="flex:1;padding:14px;background:var(--accent);border:none;border-radius:10px;color:var(--bg);font-weight:600;cursor:pointer;transition:var(--transition)">View Reservation</button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Add animation
    var style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.remove();
    });
    
    // Save reservation
    var reservation = {
        id: 'RES-' + Date.now(),
        date: new Date().toLocaleString(),
        vehicles: cart.slice(),
        total: total
    };
    localStorage.setItem('ua-reservation', JSON.stringify(reservation));
    
    // Clear cart after confirmation
    cart = []; 
    saveCart(); 
    updateCartBadge(); 
    renderCart();
}

// ---------- WISHLIST ----------
function toggleWish(id, el) {
    var idx = wishlist.indexOf(id);
    if (idx === -1) { wishlist.push(id); showToast('Saved to favourites'); }
    else { wishlist.splice(idx, 1); showToast('Removed from favourites'); }
    localStorage.setItem('ua-wishlist', JSON.stringify(wishlist));
    if (el) {
        var active = wishlist.indexOf(id) !== -1;
        el.classList.toggle('active', active);
        el.querySelector('svg').setAttribute('fill', active ? 'currentColor' : 'none');
    }
}

// ---------- AUTH ----------
function openAuth() { document.getElementById('authModal').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeAuth() { document.getElementById('authModal').classList.remove('open'); document.body.style.overflow = ''; }
function switchAuth(tab, e) {
    document.querySelectorAll('.auth-tab').forEach(function (t) { t.classList.remove('active'); });
    document.querySelectorAll('.auth-form').forEach(function (f) { f.classList.remove('active'); });
    e.target.classList.add('active');
    document.getElementById(tab + 'Form').classList.add('active');
}
function handleLogin(e) { e.preventDefault(); showToast('Welcome back! Signed in successfully.'); closeAuth(); }
function handleSignup(e) { e.preventDefault(); showToast('Account created! Welcome to Unique Alliosh.'); closeAuth(); }

// ---------- ADMIN (hidden in footer, password gated) ----------
function showAdminLogin() {
    var pw = prompt('Staff access code:');
    if (pw === null) return;
    if (pw === 'alliosh2024') window.location.href = 'admin/';
    else showToast('Access denied');
}

// =========================================================
//  AI CONCIERGE  — context-aware recommendation engine
// =========================================================
var chatHistory = [];
var chatOpened = false;
var lastRecommended = [];

function toggleChatbot() {
    var wrap = document.getElementById('chatbotWrap');
    var panel = document.getElementById('chatbotPanel');
    var isOpening = !panel.classList.contains('open');
    
    panel.classList.toggle('open');
    wrap.classList.toggle('active');
    document.getElementById('chatNotif').style.display = 'none';
    hideProactive();
    
    if (isOpening && !chatOpened) {
        chatOpened = true;
        setTimeout(function() {
            document.getElementById('chatInput').focus();
        }, 100);
        botSay('Welcome to Unique Alliosh. I\u2019m your personal automotive concierge. Tell me what you\u2019re looking for \u2014 a budget, a body style, a brand, or how you\u2019ll use it \u2014 and I\u2019ll match you with the perfect vehicle from our certified inventory.');
        showSuggestions(['SUVs under \u20a6100M', 'Show me luxury cars', 'Best for a family', 'What\u2019s on sale?']);
    }
}

// --- message renderers ---
function botSay(text, cards) {
    var c = document.getElementById('chatMessages');
    var typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    c.appendChild(typing);
    c.scrollTop = c.scrollHeight;
    setTimeout(function () {
        typing.remove();
        var row = document.createElement('div');
        row.className = 'chat-row bot';
        var inner = '<div class="chat-mini-avatar">AI</div><div><div class="chat-msg">' + text + '</div>';
        if (cards && cards.length) {
            cards.forEach(function (p) {
                inner += '<div class="chat-product-card" onclick="closeChatAndOpen(' + p.id + ')">' +
                    '<img src="' + p.image + '" alt="' + p.name + '">' +
                    '<div><div class="cpc-name">' + p.name + '</div><div class="cpc-price">' + formatPrice(p.price) + '</div></div>' +
                '</div>';
            });
        }
        inner += '</div>';
        row.innerHTML = inner;
        c.appendChild(row);
        c.scrollTop = c.scrollHeight;
        chatHistory.push({ role: 'bot', text: text });
    }, 650 + Math.random() * 450);
}
function userSay(text) {
    var c = document.getElementById('chatMessages');
    var row = document.createElement('div');
    row.className = 'chat-row user';
    row.innerHTML = '<div class="chat-msg">' + text.replace(/</g, '&lt;') + '</div>';
    c.appendChild(row);
    c.scrollTop = c.scrollHeight;
    chatHistory.push({ role: 'user', text: text });
}
function closeChatAndOpen(id) { openProductModal(id); }

function sendChat() {
    var input = document.getElementById('chatInput');
    var text = input.value.trim();
    if (!text) return;
    userSay(text);
    input.value = '';
    var res = generateReply(text);
    botSay(res.text, res.cards);
    if (res.suggestions) showSuggestions(res.suggestions);
}
function quickChat(text) {
    userSay(text);
    var res = generateReply(text);
    botSay(res.text, res.cards);
    if (res.suggestions) showSuggestions(res.suggestions);
}
function showSuggestions(arr) {
    document.getElementById('chatSuggestions').innerHTML = arr.map(function (s) {
        return '<button class="chat-suggestion" onclick="quickChat(this.textContent)">' + s + '</button>';
    }).join('');
}
function askAboutProduct(id) {
    var p = products.find(function (x) { return x.id === id; });
    if (!p) return;
    closeProductModal();
    document.getElementById('chatbotPanel').classList.add('open');
    document.getElementById('chatNotif').style.display = 'none';
    chatOpened = true;
    userSay('Tell me more about the ' + p.name);
    var res = describeVehicle(p);
    botSay(res.text, res.cards);
    showSuggestions(['Is financing available?', 'Book a test drive', 'Reserve this vehicle', 'Show similar options']);
}

// --- the brain: intent + entity extraction ---
function generateReply(raw) {
    var t = raw.toLowerCase();

    // entities
    var budget = extractBudget(t);
    var type = extractType(t);
    var brand = extractBrand(t);

    // intent: greeting
    if (/\b(hi|hello|hey|good (morning|afternoon|evening)|how far)\b/.test(t))
        return { text: 'Hello and welcome! I can help you find the right vehicle, compare options, check financing, or arrange a test drive. What matters most to you \u2014 budget, body style, or a particular brand?', suggestions: ['SUVs under \u20a6100M', 'Luxury options', 'Most affordable', 'Talk to a human'] };

    // intent: reserve / checkout
    if (/\b(reserve|buy|purchase|order|checkout|cart)\b/.test(t)) {
        if (lastRecommended.length === 1) { addToCart(lastRecommended[0].id, 1); return { text: 'Done \u2014 I\u2019ve reserved the ' + lastRecommended[0].name + ' in your garage. Tap the cart icon to complete checkout, or I can connect you to a sales agent. Anything else?', suggestions: ['Proceed to checkout', 'Financing options', 'Book a test drive'] }; }
        return { text: 'I can reserve any vehicle for you instantly. Which model would you like? You can also tap "Reserve Vehicle" on any card.', suggestions: ['Show me SUVs', 'Show me luxury', 'Most popular'] };
    }

    // intent: financing
    if (/\b(financ|loan|instal?ment|spread|pay.*(month|installment)|down ?payment)\b/.test(t))
        return { text: 'Yes \u2014 we offer flexible financing through our partner banks. Typically a <strong>30% down payment</strong> with the balance spread over 12\u201348 months, subject to approval. Tell me your budget and I\u2019ll show vehicles that fit your monthly comfort zone.', suggestions: ['My budget is \u20a650M', 'My budget is \u20a6100M', 'What documents do I need?'] };

    // intent: documents
    if (/\b(document|paperwork|registration|custom|duty|papers)\b/.test(t))
        return { text: 'Every vehicle comes <strong>fully documented</strong> \u2014 customs papers, proof of ownership, and registration are all handled by our team. For financing you\u2019ll need a valid ID, proof of income, and 3 months\u2019 bank statements. We make the process seamless.', suggestions: ['Financing options', 'Delivery info', 'Show me vehicles'] };

    // intent: warranty
    if (/\b(warrant|guarantee|inspect|condition|reliable|trust)\b/.test(t))
        return { text: 'Peace of mind is built in. Every vehicle passes a <strong>147-point inspection</strong>. Brand-new cars carry full manufacturer warranty; certified pre-owned vehicles include a <strong>6-month powertrain warranty</strong>. We also provide a detailed condition report on request.', suggestions: ['Show certified vehicles', 'Brand new only', 'Book a test drive'] };

    // intent: delivery
    if (/\b(deliver|shipping|logistics|how long|where are you|location)\b/.test(t))
        return { text: 'We deliver <strong>nationwide within 48 hours</strong> to Lagos, Abuja and Port Harcourt, and 3\u20135 days elsewhere \u2014 fully insured and free of charge. You\u2019re welcome to inspect at our showroom first. Want me to shortlist a few vehicles?', suggestions: ['SUVs', 'Sedans', 'Luxury'] };

    // intent: test drive
    if (/\b(test ?drive|inspect|view|see it|appointment|visit|showroom)\b/.test(t))
        return { text: 'Absolutely \u2014 I can arrange a test drive at our showroom or a doorstep viewing. Just share your preferred day and city, or sign in and our team will reach out within the hour. Which vehicle caught your eye?', suggestions: ['Show me luxury', 'Show me SUVs', 'Talk to a human'] };

    // intent: human handoff
    if (/\b(human|agent|call|whatsapp|speak|representative|sales)\b/.test(t))
        return { text: 'Of course. You can reach our sales team directly on <strong>WhatsApp</strong> or call our support line \u2014 both are linked in the footer. Share your details and a dedicated advisor will assist you personally. Shall I shortlist some vehicles in the meantime?', suggestions: ['SUVs under \u20a6100M', 'Luxury options', 'Most affordable'] };

    // intent: cheapest / most affordable
    if (/\b(cheap|affordable|budget|lowest|least expensive|entry)\b/.test(t) && !budget) {
        var cheap = products.slice().sort(function (a, b) { return a.price - b.price; }).slice(0, 3);
        lastRecommended = cheap;
        return { text: 'Here are our most accessible vehicles \u2014 reliable, certified, and ready to drive. The Corolla is our value champion:', cards: cheap, suggestions: ['Most expensive', 'SUVs', 'Sedans'] };
    }
    // intent: most expensive / flagship
    if (/\b(most expensive|flagship|best you have|top of the range|exotic|dream)\b/.test(t)) {
        var top = products.slice().sort(function (a, b) { return b.price - a.price; }).slice(0, 3);
        lastRecommended = top;
        return { text: 'Our flagship collection \u2014 the very finest in the showroom:', cards: top, suggestions: ['Sports cars', 'Luxury SUVs', 'Reserve one'] };
    }
    // intent: family
    if (/\b(family|kids|children|space|7 ?seat|seven seat|spacious)\b/.test(t)) {
        var fam = products.filter(function (p) { return p.specs['Seats'] && parseInt(p.specs['Seats']) >= 7; });
        if (budget) fam = fam.filter(function (p) { return p.price <= budget; });
        fam = fam.sort(function (a, b) { return b.rating - a.rating; }).slice(0, 3);
        lastRecommended = fam;
        return { text: fam.length ? 'For family duty you\u2019ll want space and safety. These 7+ seaters are perfect \u2014 comfortable, certified and built to last:' : 'I couldn\u2019t find a 7-seater in that budget, but tell me a bit more and I\u2019ll find the best fit.', cards: fam, suggestions: ['SUVs', 'Under \u20a6100M', 'Book a test drive'] };
    }
    // intent: fuel efficient / economy
    if (/\b(economical|fuel ?efficient|save fuel|low consumption|petrol|daily|commut)\b/.test(t)) {
        var eff = products.filter(function (p) { return p.category === 'sedan'; }).sort(function (a, b) { return a.price - b.price; }).slice(0, 3);
        lastRecommended = eff;
        return { text: 'For efficiency and low running costs, our sedans are unbeatable \u2014 economical, dependable and easy to maintain:', cards: eff, suggestions: ['SUVs', 'Most affordable', 'Financing'] };
    }
    // intent: electric
    if (/\b(electric|ev|tesla|battery)\b/.test(t)) {
        var ev = products.filter(function (p) { return p.specs['Fuel'] === 'Electric'; });
        lastRecommended = ev;
        return { text: ev.length ? 'Going electric? Here\u2019s our standout EV \u2014 blistering performance with zero emissions:' : 'We don\u2019t have an EV in stock right now, but new arrivals come weekly.', cards: ev, suggestions: ['Luxury cars', 'Sports cars', 'Reserve it'] };
    }

    // intent: performance / sports
    if (/\b(performance|fast|speed|powerful|horsepower|hp|acceleration|sports)\b/.test(t)) {
        var sports = products.filter(function (p) { return p.category === 'sports'; }).sort(function (a, b) { return b.rating - a.rating; }).slice(0, 3);
        lastRecommended = sports;
        return { text: sports.length ? 'For pure adrenaline \u2014 these are our performance kings. Raw power, precision engineering, and unforgettable thrills:' : 'Our sports collection is carefully curated. Let me show you what we have.', cards: sports, suggestions: ['Financing for sports cars', 'Most expensive', 'Book a test drive'] };
    }

    // intent: reliability / dependability
    if (/\b(reliable|dependable|trust|long ?lasting|years|durable|strong engine)\b/.test(t)) {
        var reliable = products.filter(function (p) { return p.rating >= 4.8; }).sort(function (a, b) { return b.rating - a.rating; }).slice(0, 4);
        lastRecommended = reliable;
        return { text: 'Looking for a workhorse you can count on? These vehicles have our highest reliability scores \u2014 built to serve you for years:', cards: reliable, suggestions: ['Show SUVs', 'Show sedans', 'Warranty details'] };
    }

    // intent: used vs new
    if (/\b(used|pre.?owned|second ?hand|certified pre.?owned|new|brand new|factory|unused)\b/.test(t)) {
        if (/\b(new|brand new|factory|unused)\b/.test(t)) {
            var brandnew = products.filter(function (p) { return p.specs['Mileage'] === '0 km'; }).slice(0, 4);
            lastRecommended = brandnew;
            return { text: brandnew.length ? 'Fresh from the factory \u2014 brand new, untouched, with full warranty:' : 'Our brand new collection arrives weekly. What body style interests you?', cards: brandnew, suggestions: ['Financing options', 'Delivery info', 'Reserve one'] };
        } else {
            var used = products.filter(function (p) { return p.specs['Mileage'] !== '0 km'; }).sort(function (a, b) { return b.rating - a.rating; }).slice(0, 4);
            lastRecommended = used;
            return { text: 'Pre-owned vehicles that have been thoroughly inspected and maintained. Each comes with a full condition report and 6-month warranty:', cards: used, suggestions: ['Financing', 'Warranty details', 'Reserve it'] };
        }
    }

    // intent: comparison / which one
    if (/\b(which|compare|versus|vs|better|difference|against)\b/.test(t)) {
        if (lastRecommended.length >= 2) return { text: 'Great question. All of these are excellent \u2014 it depends on your priorities. Need something spacious for family? Prefer efficiency? Speed? Tell me and I\u2019ll narrow it down.', suggestions: ['Show luxury', 'Show SUVs', 'Most affordable'] };
        return { text: 'I\u2019d love to compare options for you. First, let me shortlist a few vehicles based on what matters to you \u2014 budget, body style, or brand?', suggestions: ['SUVs', 'Sedans', 'Luxury'] };
    }

    // intent: color / appearance
    if (/\b(color|colour|black|white|silver|blue|red|gray|grey|appearance|looks)\b/.test(t)) {
        return { text: 'We stock vehicles in all the classic colors. When you reserve a vehicle or book a test drive, you can confirm the exact color and finish. Would you like to see our current inventory?', suggestions: ['Show me vehicles', 'Book a viewing', 'Most popular'] };
    }

    // intent: mileage / condition details
    if (/\b(mileage|kilometers?|miles|condition|wear|scratches|dents|accident|history)\b/.test(t)) {
        return { text: 'Every vehicle listing shows exact mileage and condition. Brand new cars are 0 km. Certified pre-owned vehicles come with a full inspection report showing all service history and any cosmetic notes. You can request a detailed inspection on any vehicle before purchase.', suggestions: ['Show brand new', 'Show certified pre-owned', 'Book an inspection'] };
    }

    // intent: trade-in / exchange
    if (/\b(trade.?in|exchange|trade|your car|my car|old car|selling)\b/.test(t)) {
        return { text: 'Absolutely \u2014 we accept trade-ins on any vehicle you\u2019re replacing. Our team will assess your current car and provide a fair valuation that can be applied as credit toward your purchase. Share your vehicle details and I\u2019ll arrange an inspection.', suggestions: ['Tell me about my car', 'Show me vehicles', 'Book a trade-in appraisal'] };
    }

    // intent: insurance / protection
    if (/\b(insurance|cover|protected|damage|accident|comprehensible|theft)\b/.test(t)) {
        return { text: 'We work with leading insurers nationwide. Most vehicles can be insured on the same day of purchase. Our team can connect you with preferred insurance partners who offer competitive rates for our customers. Delivery is always fully insured at no extra cost.', suggestions: ['Delivery info', 'Show insurance partners', 'Book a vehicle'] };
    }

    // intent: customization / modification
    if (/\b(customize|modify|upgrade|install|accessories|rims|lights|interior)\b/.test(t)) {
        return { text: 'Some vehicles come pre-configured with premium packages. For specific customization requests, our aftersales team can recommend trusted partners for quality upgrades and installations. Let\u2019s find your base vehicle first.', suggestions: ['Show luxury options', 'Show premium sedans', 'Talk to a sales agent'] };
    }

    // intent: payment methods / terms
    if (/\b(payment|pay|cash|credit|debit|bank transfer|cheque|terms)\b/.test(t)) {
        return { text: 'We accept cash, bank transfer, and credit arrangements. For customers without immediate cash, our financing partners offer 12\u201348 month terms with a 30% down payment. Early repayment is always welcome with no penalties. Which option suits you best?', suggestions: ['Full payment', 'Financing options', 'Lease terms'] };
    }

    // intent: showroom / visit
    if (/\b(showroom|office|location|where are you|directions|visit us|address)\b/.test(t)) {
        return { text: 'Our main showroom is in Lagos with viewing centers in Abuja and Port Harcourt. You can visit anytime, schedule a private viewing, or we can arrange doorstep showings. Which city are you in?', suggestions: ['Lagos', 'Abuja', 'Port Harcourt', 'Schedule a visit'] };
    }

    // entity-driven recommendation (type / brand / budget combinations)
    if (type || brand || budget) {
        var matches = products.filter(function (p) {
            if (type && p.category !== type) return false;
            if (brand && p.brand.toLowerCase().indexOf(brand) === -1) return false;
            if (budget && p.price > budget) return false;
            return true;
        });
        matches.sort(function (a, b) { return b.rating - a.rating; });
        var top3 = matches.slice(0, 3);
        lastRecommended = top3;
        if (top3.length === 0) {
            // relax budget if nothing fits
            if (budget) {
                var nearest = products.filter(function (p) { return (!type || p.category === type) && (!brand || p.brand.toLowerCase().indexOf(brand) !== -1); }).sort(function (a, b) { return a.price - b.price; }).slice(0, 2);
                lastRecommended = nearest;
                return { text: 'Nothing falls exactly within ' + formatShort(budget) + ', but these are the closest matches worth considering:', cards: nearest, suggestions: ['Increase budget', 'Show sedans', 'Financing options'] };
            }
            return { text: 'I couldn\u2019t find an exact match, but tell me your budget or preferred body style and I\u2019ll find something excellent.', suggestions: ['SUVs', 'Sedans', 'Luxury', 'Sports'] };
        }
        var lead = 'Based on what you described, here ' + (top3.length === 1 ? 'is a superb option' : 'are my top picks') + (budget ? ' within ' + formatShort(budget) : '') + ':';
        return { text: lead, cards: top3, suggestions: ['Compare these', 'Financing options', 'Book a test drive', 'Reserve one'] };
    }

    // direct vehicle name match
    var named = products.find(function (p) { return t.indexOf(p.name.toLowerCase()) !== -1 || (p.name.toLowerCase().split(' ').slice(0, 2).join(' ') && t.indexOf(p.name.toLowerCase().split(' ')[0].toLowerCase()) !== -1 && t.length > 4 && false); });
    if (named) { lastRecommended = [named]; return describeVehicle(named); }

    // thanks
    if (/\b(thank|thanks|appreciate|nice|great|awesome|cool)\b/.test(t))
        return { text: 'My pleasure! I\u2019m here whenever you need me. Would you like me to shortlist a few vehicles or arrange a viewing?', suggestions: ['Show me SUVs', 'Luxury options', 'Book a test drive'] };

    // fallback — helpful, not robotic
    return { text: 'I want to find you the perfect car. Could you tell me a little more \u2014 for example a <strong>budget</strong> (e.g. "under \u20a680M"), a <strong>body style</strong> (SUV, sedan, sports), or a <strong>brand</strong> you love? I\u2019ll do the rest.', suggestions: ['SUVs under \u20a6100M', 'Luxury cars', 'Most affordable', 'Toyota options'] };
}

function describeVehicle(p) {
    var d = p.specs['Mileage'] === '0 km' ? 'brand new' : 'beautifully kept';
    return {
        text: 'The <strong>' + p.name + '</strong> is ' + d + ' and one of our most admired models. ' + p.desc + ' It\u2019s listed at <strong>' + formatPrice(p.price) + '</strong>' + (p.oldPrice ? ' (down from ' + formatPrice(p.oldPrice) + ')' : '') + '. Would you like to reserve it or book a viewing?',
        cards: [p],
        suggestions: ['Reserve this vehicle', 'Financing options', 'Book a test drive', 'Show similar']
    };
}

function extractBudget(t) {
    // matches "80m", "80 million", "₦80m", "100,000,000", "under 50m"
    var m = t.match(/(\d+(?:\.\d+)?)\s*(m|million|mil)\b/);
    if (m) return parseFloat(m[1]) * 1000000;
    var k = t.match(/(\d+(?:\.\d+)?)\s*(k|thousand)\b/);
    if (k) return parseFloat(k[1]) * 1000;
    var raw = t.replace(/[,\s]/g, '').match(/(\d{6,})/);
    if (raw) return parseInt(raw[1]);
    return null;
}
function extractType(t) {
    if (/\b(suv|jeep|4x4|off ?road|crossover)\b/.test(t)) return 'suv';
    if (/\b(sedan|saloon|car for work|executive car)\b/.test(t)) return 'sedan';
    if (/\b(truck|pickup|pick ?up|haul|tow)\b/.test(t)) return 'truck';
    if (/\b(sport|fast|speed|coupe|supercar|race)\b/.test(t)) return 'sports';
    if (/\b(luxury|premium|exotic|high ?end|prestige)\b/.test(t)) return 'luxury';
    return null;
}
function extractBrand(t) {
    var brands = ['mercedes', 'bmw', 'toyota', 'lexus', 'porsche', 'honda', 'ford', 'audi', 'tesla', 'lamborghini', 'bentley', 'jeep', 'chevrolet', 'nissan', 'rolls'];
    for (var i = 0; i < brands.length; i++) if (t.indexOf(brands[i]) !== -1) return brands[i];
    return null;
}

// ---------- PROACTIVE ----------
function onProductHover(id) {
    if (hoverTimer) clearTimeout(hoverTimer);
    if (document.getElementById('chatbotPanel').classList.contains('open')) return;
    var p = products.find(function (x) { return x.id === id; });
    if (!p) return;
    hoverTimer = setTimeout(function () {
        var box = document.getElementById('chatProactive');
        document.getElementById('proactiveText').innerHTML = 'Eyeing the <strong>' + p.name + '</strong>? ' + (p.rating >= 4.9 ? 'It\u2019s one of our highest-rated vehicles.' : 'I can answer any question about it.') + ' Tap to chat.';
        box.classList.add('show');
        box.onclick = function (e) { if (e.target.classList.contains('chat-proactive-close')) return; toggleChatbot(); };
    }, 2800);
}
function onProductLeave() { if (hoverTimer) clearTimeout(hoverTimer); }
function hideProactive() { document.getElementById('chatProactive').classList.remove('show'); }

// ---------- UTIL ----------
function showToast(text) {
    var toast = document.getElementById('toast');
    document.getElementById('toastText').textContent = text;
    toast.classList.add('show');
    clearTimeout(window._toastT);
    window._toastT = setTimeout(function () { toast.classList.remove('show'); }, 2600);
}
function toggleTheme() {
    var next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('ua-theme', next);
}

// ---------- INIT ----------
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeProductModal(); closeAuth();
        if (document.getElementById('cartSidebar').classList.contains('open')) toggleCart();
    }
});
document.getElementById('productModal').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeProductModal(); });
document.getElementById('authModal').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeAuth(); });

// Close chatbot when clicking outside
document.addEventListener('click', function(e) {
    var wrap = document.getElementById('chatbotWrap');
    var panel = document.getElementById('chatbotPanel');
    var btn = document.getElementById('chatbotBtn');
    
    if (wrap && panel && wrap.classList.contains('active')) {
        if (!wrap.contains(e.target) && e.target !== btn) {
            panel.classList.remove('open');
            wrap.classList.remove('active');
        }
    }
});

(function init() {
    var savedTheme = localStorage.getItem('ua-theme');
    if (savedTheme) document.body.setAttribute('data-theme', savedTheme);
    // testimonial stars
    ['ts1', 'ts2', 'ts3'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) { var s = ''; for (var i = 0; i < 5; i++) s += starSvg(true); el.innerHTML = s; }
    });
    document.getElementById('statCount').textContent = products.length;
    renderProducts();
    updateCartBadge();
    // proactive nudge after a while
    setTimeout(function () {
        if (!chatOpened) document.getElementById('chatProactive').classList.add('show');
    }, 8000);
})();

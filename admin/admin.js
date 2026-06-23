// ============================================================================
// ADMIN DASHBOARD - JavaScript Logic
// ============================================================================

// STATE
const adminState = {
    isLoggedIn: false,
    currentSection: 'dashboard',
    adminUser: {
        name: 'Admin User',
        email: 'admin@alliosh.com',
        phone: '+234 810 0000 000'
    }
};

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const logoutBtn = document.getElementById('logoutBtn');

// ============================================================================
// INITIALIZATION
// ============================================================================

function init() {
    checkLoginStatus();
    attachEventListeners();
    loadAdminData();
    console.log('[v0] Admin dashboard initialized');
}

function checkLoginStatus() {
    const token = localStorage.getItem('admin-token');
    if (token) {
        adminState.isLoggedIn = true;
        showDashboard();
    } else {
        showLoginPage();
    }
}

// ============================================================================
// AUTHENTICATION
// ============================================================================

function showLoginPage() {
    loginPage.classList.remove('hidden');
    dashboard.classList.remove('active');
}

function showDashboard() {
    loginPage.classList.add('hidden');
    dashboard.classList.add('active');
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const user = username.value.trim();
    const pass = password.value.trim();
    
    // Demo credentials
    if (user === 'admin' && pass === 'alliosh2024') {
        localStorage.setItem('admin-token', 'authenticated');
        adminState.isLoggedIn = true;
        showDashboard();
        loadAdminData();
        console.log('[v0] Admin logged in successfully');
    } else {
        alert('Invalid credentials. Use admin / alliosh2024');
        console.log('[v0] Login failed with credentials:', user);
    }
});

logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('admin-token');
        adminState.isLoggedIn = false;
        username.value = '';
        password.value = '';
        showLoginPage();
        console.log('[v0] Admin logged out');
    }
});

// ============================================================================
// NAVIGATION
// ============================================================================

function attachEventListeners() {
    // Section navigation
    document.querySelectorAll('[data-section]').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            navigateToSection(section);
        });
    });
}

function navigateToSection(section) {
    // Update active nav item
    document.querySelectorAll('[data-section]').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Show content section
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');
    
    adminState.currentSection = section;
    console.log(`[v0] Navigated to section: ${section}`);
}

// ============================================================================
// LOAD DATA INTO DASHBOARD
// ============================================================================

function loadAdminData() {
    // This calls the function from admin-data.js
    if (typeof populateAdminData === 'function') {
        populateAdminData();
    }
    
    // Additional dashboard initialization
    updateDashboardStats();
}

function updateDashboardStats() {
    const totalRevenue = document.getElementById('totalRevenue');
    const totalOrders = document.getElementById('totalOrders');
    const activeVehicles = document.getElementById('activeVehicles');
    const customerCount = document.getElementById('customerCount');
    
    if (totalRevenue) totalRevenue.textContent = '$487,320';
    if (totalOrders) totalOrders.textContent = '156';
    if (activeVehicles) activeVehicles.textContent = '24';
    if (customerCount) customerCount.textContent = '2,847';
}

// ============================================================================
// SEARCH & FILTER
// ============================================================================

const orderSearch = document.getElementById('orderSearch');
if (orderSearch) {
    orderSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#ordersBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
        
        console.log(`[v0] Filtered orders with query: ${query}`);
    });
}

// ============================================================================
// INITIALIZATION ON LOAD
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Simulate some additional data loading
    setTimeout(() => {
        console.log('[v0] Admin dashboard fully loaded');
    }, 500);
});

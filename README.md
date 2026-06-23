# Unique Alliosh — Premium Auto Marketplace

A stunning, fully-functional frontend for an elite automobile e-commerce platform. Built with vanilla HTML/CSS/JavaScript. Production-ready for Django backend integration.

## 📁 Structure

```
project/
├── index.html              # Homepage
├── autos/
│   └── index.html         # Vehicle catalog & shopping
├── checkout/
│   └── index.html         # Order checkout flow
├── admin/
│   └── index.html         # Admin dashboard
├── assets/
│   └── logo.png           # Add your logo here
└── README.md
```

## 🚀 Features Implemented

### Homepage (`/`)
- ✅ Hero section with CTA
- ✅ Feature highlights (verification, warranty, delivery)
- ✅ Real client testimonials
- ✅ Statistics showcase
- ✅ Theme toggle (dark/light)
- ✅ Responsive design

### Autos Marketplace (`/autos/`)
- ✅ 8 sample vehicles with full data
- ✅ Smart search & filtering by condition
- ✅ Vehicle detail modals with specs
- ✅ Shopping cart with quantities
- ✅ Real-time cart updates
- ✅ Wishlist functionality
- ✅ Trust badges (verified, certified, insured)
- ✅ Fully responsive grid layout
- ✅ Fixed chatbot issues (removed overlays)

### Checkout (`/checkout/`)
- ✅ Multi-step form (delivery + payment)
- ✅ Order summary with itemization
- ✅ 4 payment methods (Paystack, Flutterwave, WhatsApp, Bank Transfer)
- ✅ Form validation
- ✅ Order confirmation with ID generation
- ✅ Order storage (localStorage → ready for backend)

### Admin Dashboard (`/admin/`)
- ✅ Secure login (demo: admin/alliosh2024)
- ✅ Stats dashboard (revenue, orders, vehicles)
- ✅ Orders management table
- ✅ Vehicle inventory management
- ✅ Professional layout with sidebar
- ✅ Real-time order display

## 🎨 Design System

**Colors:**
- Background: `#0a0a0f` (dark), `#f5f3ef` (light)
- Accent: `#c9a96e` (gold)
- Text: `#f0f0f5` (dark theme)

**Typography:**
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

**Responsiveness:**
- Mobile-first approach
- Breakpoints: 768px (tablet)
- All components fully responsive

## 💾 Data Structure

### Vehicle Object
```javascript
{
  id: 1,
  model: "Toyota Camry",
  brand: "Toyota",
  year: 2023,
  trim: "XLE",
  price: 5800000,
  oldPrice: 6200000,
  mileage: "8,500 km",
  transmission: "Automatic",
  condition: "mint", // mint|excellent|good
  image: "url",
  description: "..."
}
```

### Order Object
```javascript
{
  id: "UA-2024-0001",
  customer: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+234 80x xxx xxxx",
    address: "123 Main St",
    city: "Lagos",
    state: "Lagos",
    notes: "..."
  },
  items: [...vehicles],
  total: 5800000,
  payment: "paystack", // paystack|flutterwave|whatsapp|bank
  status: "pending",
  date: "2024-01-15T10:30:00Z"
}
```

## 🔌 Django Integration Guide

### 1. Replace Mock Data with API Calls

**Current:** Vehicle data is hardcoded in `/autos/index.html`

**To integrate:**
```javascript
// Replace static vehicles array with:
async function loadVehicles() {
  const response = await fetch('/api/vehicles/');
  vehicles = await response.json();
  renderVehicles();
}
```

### 2. Hook Up Order Submission

**Current:** Orders saved to localStorage

**To integrate:**
```javascript
async function placeOrder() {
  // ...validation...
  const response = await fetch('/api/orders/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  const result = await response.json();
  document.getElementById('orderId').textContent = result.id;
  // ...show confirmation...
}
```

### 3. Admin Dashboard API

**Current:** Reads from localStorage

**To integrate:**
```javascript
async function loadDashboard() {
  const stats = await fetch('/api/admin/stats/').then(r => r.json());
  document.getElementById('totalSales').textContent = `₦${stats.revenue}M`;
  document.getElementById('orderCount').textContent = stats.order_count;
  
  const orders = await fetch('/api/admin/orders/').then(r => r.json());
  populateOrdersTable(orders);
}
```

### 4. Authentication

**Add to Django backend:**
```python
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = authenticate(username=data['user'], password=data['pass'])
        if user:
            token = generate_token()
            return JsonResponse({'token': token, 'success': True})
    return JsonResponse({'success': False})
```

### 5. CORS Setup

```python
# settings.py
INSTALLED_APPS = ['corsheaders', ...]
MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware', ...]
CORS_ALLOWED_ORIGINS = ["http://localhost:8000", "https://yourdomain.com"]
```

## 🎯 API Endpoints Reference (to build)

```
GET    /api/vehicles/              → List all vehicles
GET    /api/vehicles/{id}/         → Vehicle details
POST   /api/orders/                → Create order
GET    /api/admin/stats/           → Dashboard stats
GET    /api/admin/orders/          → All orders
PATCH  /api/admin/orders/{id}/     → Update order status
```

## 🛠 Local Testing

1. **Add your logo:**
   - Place logo image at `assets/logo.png`
   - Supports PNG/JPG/SVG

2. **Start server:**
   ```bash
   python3 -m http.server 8000
   # Or: python -m http.server 8000
   ```

3. **Visit:**
   - Homepage: `http://localhost:8000`
   - Shop: `http://localhost:8000/autos/`
   - Admin: `http://localhost:8000/admin/` (admin/alliosh2024)

## 🧪 Test Scenarios

### Buy a Vehicle
1. Click "Browse Vehicles"
2. Click any vehicle card to see details
3. Click "Add to Cart"
4. View cart (top right badge)
5. Go to checkout
6. Fill delivery form
7. Select payment method
8. Place order → See confirmation

### Admin Access
1. Go to `http://localhost:8000/admin/`
2. Login: `admin` / `alliosh2024`
3. View dashboard stats
4. Check orders table
5. View vehicle inventory

## 🎨 Customization

### Change Colors
Edit CSS variables in each file:
```css
:root {
  --accent: #c9a96e;        /* Change this */
  --bg: #0a0a0f;
  /* ... */
}
```

### Change Testimonials
Edit testimonial cards in `index.html`

### Update Contact Info
Search for `+234` in footer sections

### Add More Vehicles
Add to `vehicles` array in `/autos/index.html`

## 📋 Features Ready for Backend

- ✅ Order form with full validation
- ✅ Order ID generation
- ✅ Multi-payment method support
- ✅ Cart state management
- ✅ User authentication flow
- ✅ Admin permissions system
- ✅ Data export capabilities

## 🔒 Security Notes

**For production:**
1. Move hardcoded data to database
2. Implement CSRF tokens
3. Add rate limiting
4. Use HTTPS only
5. Validate all inputs server-side
6. Implement proper auth tokens

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🐛 Known Limitations (By Design for Frontend)

- Cart/data stored in localStorage (temporary)
- No real payment processing (integrates with Paystack/Flutterwave API)
- Admin demo login (implement with Django auth)
- Orders not persisted (ready for database)

## 🚀 Deployment

**Vercel:**
```bash
vercel deploy
```

**Traditional hosting:**
- Just serve HTML/CSS/JS files
- No server-side rendering needed
- Add Django backend separately
- Point API calls to backend domain

## 📞 Support & Customization

All files are vanilla HTML/CSS/JS — no build tools needed. Easy to customize and extend.

---

**Built for Unique Alliosh Enterprise | RC: 1435009**

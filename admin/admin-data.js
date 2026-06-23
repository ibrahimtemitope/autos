// ============================================================================
// ADMIN DEMO DATA
// ============================================================================

const DEMO_ORDERS = [
    {
        id: 'ORD-001',
        customerName: 'Chidi Okoro',
        email: 'chidi@example.com',
        vehicle: 'BMW 330i M Sport',
        price: '$52,400',
        date: '2024-01-15',
        status: 'Completed',
        phone: '+234 803 123 4567',
        address: 'Lagos, Nigeria'
    },
    {
        id: 'ORD-002',
        customerName: 'Zainab Hassan',
        email: 'zainab@example.com',
        vehicle: 'Tesla Model 3 Long Range',
        price: '$48,200',
        date: '2024-01-14',
        status: 'Completed',
        phone: '+234 805 456 7890',
        address: 'Abuja, Nigeria'
    },
    {
        id: 'ORD-003',
        customerName: 'Emeka Nwosu',
        email: 'emeka@example.com',
        vehicle: 'Toyota Camry 2024',
        price: '$28,500',
        date: '2024-01-13',
        status: 'Pending',
        phone: '+234 807 789 0123',
        address: 'Port Harcourt, Nigeria'
    },
    {
        id: 'ORD-004',
        customerName: 'Amina Ibrahim',
        email: 'amina@example.com',
        vehicle: 'Lexus RX 350',
        price: '$58,900',
        date: '2024-01-12',
        status: 'Completed',
        phone: '+234 809 234 5678',
        address: 'Kano, Nigeria'
    },
    {
        id: 'ORD-005',
        customerName: 'David Okafor',
        email: 'david@example.com',
        vehicle: 'Ford F-150 SuperCrew',
        price: '$38,900',
        date: '2024-01-11',
        status: 'Processing',
        phone: '+234 811 567 8901',
        address: 'Ibadan, Nigeria'
    },
    {
        id: 'ORD-006',
        customerName: 'Ngozi Ekwueme',
        email: 'ngozi@example.com',
        vehicle: 'Chevrolet Corvette Stingray',
        price: '$65,400',
        date: '2024-01-10',
        status: 'Completed',
        phone: '+234 813 890 1234',
        address: 'Enugu, Nigeria'
    },
    {
        id: 'ORD-007',
        customerName: 'Kunle Adeyemi',
        email: 'kunle@example.com',
        vehicle: 'Mercedes C-Class Sedan',
        price: '$42,800',
        date: '2024-01-09',
        status: 'Pending',
        phone: '+234 815 123 4567',
        address: 'Accra, Ghana'
    },
    {
        id: 'ORD-008',
        customerName: 'Blessing Okeke',
        email: 'blessing@example.com',
        vehicle: 'Hyundai Tucson GLS',
        price: '$31,200',
        date: '2024-01-08',
        status: 'Completed',
        phone: '+234 817 456 7890',
        address: 'Benin City, Nigeria'
    }
];

const DEMO_CUSTOMERS = [
    {
        name: 'Chidi Okoro',
        email: 'chidi@example.com',
        phone: '+234 803 123 4567',
        location: 'Lagos, Nigeria',
        purchases: 3,
        totalSpent: '$156,200',
        joinDate: '2023-06-15'
    },
    {
        name: 'Zainab Hassan',
        email: 'zainab@example.com',
        phone: '+234 805 456 7890',
        location: 'Abuja, Nigeria',
        purchases: 1,
        totalSpent: '$48,200',
        joinDate: '2024-01-10'
    },
    {
        name: 'Emeka Nwosu',
        email: 'emeka@example.com',
        phone: '+234 807 789 0123',
        location: 'Port Harcourt, Nigeria',
        purchases: 2,
        totalSpent: '$87,400',
        joinDate: '2023-11-20'
    },
    {
        name: 'Amina Ibrahim',
        email: 'amina@example.com',
        phone: '+234 809 234 5678',
        location: 'Kano, Nigeria',
        purchases: 1,
        totalSpent: '$58,900',
        joinDate: '2024-01-12'
    },
    {
        name: 'David Okafor',
        email: 'david@example.com',
        phone: '+234 811 567 8901',
        location: 'Ibadan, Nigeria',
        purchases: 4,
        totalSpent: '$204,600',
        joinDate: '2023-08-05'
    },
    {
        name: 'Ngozi Ekwueme',
        email: 'ngozi@example.com',
        phone: '+234 813 890 1234',
        location: 'Enugu, Nigeria',
        purchases: 2,
        totalSpent: '$118,300',
        joinDate: '2023-09-18'
    },
    {
        name: 'Kunle Adeyemi',
        email: 'kunle@example.com',
        phone: '+234 815 123 4567',
        location: 'Accra, Ghana',
        purchases: 1,
        totalSpent: '$42,800',
        joinDate: '2024-01-09'
    },
    {
        name: 'Blessing Okeke',
        email: 'blessing@example.com',
        phone: '+234 817 456 7890',
        location: 'Benin City, Nigeria',
        purchases: 3,
        totalSpent: '$121,500',
        joinDate: '2023-10-22'
    }
];

// Data loading function
function populateAdminData() {
    // Load recent orders
    const recentOrdersBody = document.getElementById('recentOrdersBody');
    if (recentOrdersBody) {
        recentOrdersBody.innerHTML = DEMO_ORDERS.slice(0, 5).map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.vehicle}</td>
                <td>${order.price}</td>
                <td>${order.date}</td>
                <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
            </tr>
        `).join('');
    }

    // Load all orders
    const ordersBody = document.getElementById('ordersBody');
    if (ordersBody) {
        ordersBody.innerHTML = DEMO_ORDERS.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.email}</td>
                <td>${order.vehicle}</td>
                <td>${order.price}</td>
                <td>${order.date}</td>
                <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
                <td><button style="background: var(--accent-light); border: none; color: var(--accent); padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 0.8rem;">View</button></td>
            </tr>
        `).join('');
    }

    // Load customers
    const customersBody = document.getElementById('customersBody');
    if (customersBody) {
        customersBody.innerHTML = DEMO_CUSTOMERS.map(customer => `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customer.location}</td>
                <td>${customer.purchases}</td>
                <td>${customer.totalSpent}</td>
                <td>${customer.joinDate}</td>
            </tr>
        `).join('');
    }

    // Load vehicles from main products data
    const vehiclesBody = document.getElementById('vehiclesBody');
    if (vehiclesBody && typeof PRODUCTS !== 'undefined') {
        vehiclesBody.innerHTML = PRODUCTS.slice(0, 10).map(vehicle => `
            <tr>
                <td>${vehicle.brand}</td>
                <td>${vehicle.name}</td>
                <td>${vehicle.year}</td>
                <td style="text-transform: capitalize;">${vehicle.type}</td>
                <td>$${vehicle.price.toLocaleString()}</td>
                <td>${vehicle.condition}</td>
                <td><span class="status-badge status-available">AVAILABLE</span></td>
            </tr>
        `).join('');
    }
}

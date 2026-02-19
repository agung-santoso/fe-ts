// ============================================================================
// TYPESCRIPT CONVERSION EXERCISE - E-Commerce Shopping Cart System
// ============================================================================
// Your Task: Convert this JavaScript code to TypeScript with proper types
// Enable strict mode in tsconfig.json and fix all type errors
// ============================================================================

// ============================================================================
// SHOPPING CART SYSTEM
// ============================================================================

/*
 * Business Requirements:
 * - Manage a shopping cart with products
 * - Calculate totals with discounts and tax
 * - Handle different product types (physical, digital)
 * - Track order status through different stages
 * - Validate user permissions for admin operations
 * 
 * Your Goal:
 * 1. Add proper TypeScript types for all functions, objects, and variables
 * 2. Create type aliases or interfaces where appropriate
 * 3. Use enums for order status and product types
 * 4. Add type guards for validation functions
 * 5. Handle null/undefined cases properly
 * 6. Use union types and literal types where needed
 * 7. Make the code compile with strict mode enabled
 */

// Product categories
const ProductCategory = {
  PHYSICAL: "PHYSICAL",
  DIGITAL: "DIGITAL",
  SUBSCRIPTION: "SUBSCRIPTION"
};

// Order status workflow
const OrderStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};

// User roles
const UserRole = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR"
};

// Sample product data
function createProduct(id, name, price, category, stock, downloadUrl) {
  return {
    id,
    name,
    price,
    category,
    stock: stock || 0,
    downloadUrl: downloadUrl || null,
    createdAt: new Date()
  };
}

// Sample user data
function createUser(id, username, email, role) {
  return {
    id,
    username,
    email,
    role: role || UserRole.CUSTOMER,
    isActive: true,
    cart: []
  };
}

// Create an empty cart
function createCart(userId) {
  return {
    userId,
    items: [],
    createdAt: new Date(),
    lastModified: new Date()
  };
}

// Add item to cart
function addToCart(cart, product, quantity) {
  const existingItem = cart.items.find(item => item.productId === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      category: product.category
    });
  }
  
  cart.lastModified = new Date();
  return cart;
}

// Calculate cart subtotal
function calculateSubtotal(cart) {
  return cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

// Apply discount based on type
function applyDiscount(amount, discountType, discountValue) {
  if (discountType === "PERCENTAGE") {
    return amount - (amount * discountValue / 100);
  } else if (discountType === "FIXED") {
    return Math.max(0, amount - discountValue);
  }
  return amount;
}

// Calculate tax
function calculateTax(amount, taxRate) {
  return amount * (taxRate / 100);
}

// Calculate cart total with discount and tax
function calculateTotal(cart, discountType, discountValue, taxRate) {
  const subtotal = calculateSubtotal(cart);
  const afterDiscount = applyDiscount(subtotal, discountType, discountValue);
  const tax = calculateTax(afterDiscount, taxRate || 0);
  return afterDiscount + tax;
}

// Create an order from cart
function createOrder(cart, user, shippingAddress) {
  return {
    id: generateOrderId(),
    userId: user.id,
    items: [...cart.items],
    subtotal: calculateSubtotal(cart),
    total: calculateTotal(cart, null, 0, 10),
    status: OrderStatus.PENDING,
    shippingAddress: shippingAddress || null,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

// Update order status
function updateOrderStatus(order, newStatus, user) {
  if (!isValidStatusTransition(order.status, newStatus)) {
    throw new Error(`Invalid status transition from ${order.status} to ${newStatus}`);
  }
  
  if (newStatus === OrderStatus.CANCELLED && !canCancelOrder(user)) {
    throw new Error("User does not have permission to cancel orders");
  }
  
  order.status = newStatus;
  order.updatedAt = new Date();
  return order;
}

// Validate status transition
function isValidStatusTransition(currentStatus, newStatus) {
  const validTransitions = {
    [OrderStatus.PENDING]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
    [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
    [OrderStatus.DELIVERED]: [],
    [OrderStatus.CANCELLED]: []
  };
  
  return validTransitions[currentStatus]?.includes(newStatus) || false;
}

// Check if user can cancel orders
function canCancelOrder(user) {
  return user.role === UserRole.ADMIN || user.role === UserRole.MODERATOR;
}

// Type guard to check if product is in stock
function isInStock(product, quantity) {
  if (product.category === ProductCategory.DIGITAL || product.category === ProductCategory.SUBSCRIPTION) {
    return true; // Digital and subscription products never run out
  }
  return product.stock >= quantity;
}

// Process digital product delivery
function processDigitalDelivery(order) {
  const digitalItems = order.items.filter(item => 
    item.category === ProductCategory.DIGITAL
  );
  
  return digitalItems.map(item => ({
    productId: item.productId,
    downloadUrl: `/download/${item.productId}`,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  }));
}

// Generate a unique order ID
function generateOrderId() {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

// Get order summary
function getOrderSummary(order) {
  return {
    orderId: order.id,
    status: order.status,
    itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
    total: order.total,
    createdAt: order.createdAt
  };
}

// Validate cart before checkout
function validateCart(cart, products) {
  for (const item of cart.items) {
    const product = products.find(p => p.id === item.productId);
    
    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }
    
    if (!isInStock(product, item.quantity)) {
      throw new Error(`Product ${product.name} is out of stock`);
    }
  }
  
  return true;
}

// ============================================================================
// EXAMPLE USAGE (Don't modify this part, just make it type-safe)
// ============================================================================

console.log("=== E-Commerce Shopping Cart System ===\n");

// Create sample products
const laptop = createProduct(1, "Gaming Laptop", 1299.99, ProductCategory.PHYSICAL, 5);
const ebook = createProduct(2, "TypeScript Guide", 29.99, ProductCategory.DIGITAL, null, "https://example.com/download/ts-guide");
const subscription = createProduct(3, "Premium Membership", 9.99, ProductCategory.SUBSCRIPTION);

// Create a user
const customer = createUser(101, "johndoe", "john@example.com", UserRole.CUSTOMER);
const admin = createUser(102, "admin", "admin@example.com", UserRole.ADMIN);

// Create and populate cart
const cart = createCart(customer.id);
addToCart(cart, laptop, 1);
addToCart(cart, ebook, 2);
addToCart(cart, subscription, 1);
console.log("Cart after adding items:", JSON.stringify(cart, null, 2));

// Calculate totals
const subtotal = calculateSubtotal(cart);
const total = calculateTotal(cart, "PERCENTAGE", 10, 8);
console.log(`\nSubtotal: $${subtotal.toFixed(2)}`);
console.log(`Total (with 10% discount and 8% tax): $${total.toFixed(2)}`);

// Validate cart
validateCart(cart, [laptop, ebook, subscription]);

// Create and process order
const order = createOrder(cart, customer, "123 Main St, City, Country");
console.log("\nOrder created:", getOrderSummary(order));

// Update order status
updateOrderStatus(order, OrderStatus.PROCESSING, admin);
console.log("Order status updated:", order.status);

// Process digital delivery
if (order.items.some(item => item.category === ProductCategory.DIGITAL)) {
  const downloads = processDigitalDelivery(order);
  console.log("\nDigital downloads:", downloads);
}

console.log("\n=== Exercise Complete ===");
console.log("Now convert this code to TypeScript with proper types!");

// ============================================================================
// TYPESCRIPT CONVERSION EXERCISE - E-Commerce Shopping Cart System
// ============================================================================
// Converted to TypeScript with proper types, enums, interfaces, and type guards
// ============================================================================

// ============================================================================
// SHOPPING CART SYSTEM
// ============================================================================

// ============================================================================
// ENUMS
// ============================================================================

// Product categories
const ProductCategory = {
  PHYSICAL: "PHYSICAL",
  DIGITAL: "DIGITAL",
  SUBSCRIPTION: "SUBSCRIPTION"
} as const;

type ProductCategoryValue = typeof ProductCategory[keyof typeof ProductCategory];

// Order status workflow
const OrderStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
} as const;

type OrderStatusValue = typeof OrderStatus[keyof typeof OrderStatus];

// User roles
const UserRole = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR"
} as const;

type UserRoleValue = typeof UserRole[keyof typeof UserRole];

// ============================================================================
// TYPE / INTERFACE DEFINITIONS
// ============================================================================

type DiscountType = "PERCENTAGE" | "FIXED" | null;

interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategoryValue;
  stock: number;
  downloadUrl: string | null;
  createdAt: Date;
}

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  category: ProductCategoryValue;
}

interface Cart {
  userId: number;
  items: CartItem[];
  createdAt: Date;
  lastModified: Date;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: UserRoleValue;
  isActive: boolean;
  cart: CartItem[];
}

interface Order {
  id: string;
  userId: number;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: OrderStatusValue;
  shippingAddress: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderSummary {
  orderId: string;
  status: OrderStatusValue;
  itemCount: number;
  total: number;
  createdAt: Date;
}

interface DigitalDelivery {
  productId: number;
  downloadUrl: string;
  expiresAt: Date;
}

// ============================================================================
// FUNCTIONS
// ============================================================================

// Sample product data
function createProduct(id: number, name: string, price: number, category: ProductCategoryValue, stock?: number | null, downloadUrl?: string | null): Product {
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
function createUser(id: number, username: string, email: string, role?: UserRoleValue): User {
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
function createCart(userId: number): Cart {
  return {
    userId,
    items: [],
    createdAt: new Date(),
    lastModified: new Date()
  };
}

// Add item to cart
function addToCart(cart: Cart, product: Product, quantity: number): Cart {
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
function calculateSubtotal(cart: Cart): number {
  return cart.items.reduce((total: number, item: CartItem) => {
    return total + (item.price * item.quantity);
  }, 0);
}

// Apply discount based on type
function applyDiscount(amount: number, discountType: DiscountType, discountValue: number): number {
  if (discountType === "PERCENTAGE") {
    return amount - (amount * discountValue / 100);
  } else if (discountType === "FIXED") {
    return Math.max(0, amount - discountValue);
  }
  return amount;
}

// Calculate tax
function calculateTax(amount: number, taxRate: number): number {
  return amount * (taxRate / 100);
}

// Calculate cart total with discount and tax
function calculateTotal(cart: Cart, discountType: DiscountType, discountValue: number, taxRate?: number): number {
  const subtotal = calculateSubtotal(cart);
  const afterDiscount = applyDiscount(subtotal, discountType, discountValue);
  const tax = calculateTax(afterDiscount, taxRate || 0);
  return afterDiscount + tax;
}

// Generate a unique order ID
function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

// Create an order from cart
function createOrder(cart: Cart, user: User, shippingAddress?: string | null): Order {
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

// Validate status transition
function isValidStatusTransition(currentStatus: OrderStatusValue, newStatus: OrderStatusValue): boolean {
  const validTransitions: Record<OrderStatusValue, OrderStatusValue[]> = {
    [OrderStatus.PENDING]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
    [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
    [OrderStatus.DELIVERED]: [],
    [OrderStatus.CANCELLED]: []
  };
  
  return validTransitions[currentStatus]?.includes(newStatus) || false;
}

// Check if user can cancel orders
function canCancelOrder(user: User): boolean {
  return user.role === UserRole.ADMIN || user.role === UserRole.MODERATOR;
}

// Update order status
function updateOrderStatus(order: Order, newStatus: OrderStatusValue, user: User): Order {
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

// Type guard to check if product is in stock
function isInStock(product: Product, quantity: number): boolean {
  if (product.category === ProductCategory.DIGITAL || product.category === ProductCategory.SUBSCRIPTION) {
    return true; // Digital and subscription products never run out
  }
  return product.stock >= quantity;
}

// Process digital product delivery
function processDigitalDelivery(order: Order): DigitalDelivery[] {
  const digitalItems = order.items.filter(item => 
    item.category === ProductCategory.DIGITAL
  );
  
  return digitalItems.map(item => ({
    productId: item.productId,
    downloadUrl: `/download/${item.productId}`,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  }));
}

// Get order summary
function getOrderSummary(order: Order): OrderSummary {
  return {
    orderId: order.id,
    status: order.status,
    itemCount: order.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    total: order.total,
    createdAt: order.createdAt
  };
}

// Validate cart before checkout
function validateCart(cart: Cart, products: Product[]): boolean {
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

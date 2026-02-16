// ============================================================================
// TYPE COVERAGE REFERENCE - FOUNDATION.TS
// ============================================================================
// This file shows what properly typed foundation.ts should look like
// Use this as a reference when converting JavaScript to TypeScript
// ============================================================================

/*
 * STUDENTS: This file shows you the EXPECTED types for foundation.ts
 * 
 * Compare your foundation.ts against this reference to ensure:
 * - All enums are properly defined
 * - All interfaces/types are created
 * - All function parameters are typed
 * - All function return types are specified
 */

// ============================================================================
// EXPECTED TYPE DEFINITIONS
// ============================================================================

/**
 * Step 1: Convert const objects to proper TypeScript enums
 */

// Product categories enum
enum ProductCategoryEnum {
  PHYSICAL = "PHYSICAL",
  DIGITAL = "DIGITAL",
  SUBSCRIPTION = "SUBSCRIPTION"
}

// Order status workflow enum
enum OrderStatusEnum {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}

// User roles enum
enum UserRoleEnum {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR"
}

/**
 * Step 2: Define interfaces/types for all data structures
 */

// Product interface
interface ProductInterface {
  id: number;
  name: string;
  price: number;
  category: string; // In real implementation, use ProductCategory enum
  stock: number;
  downloadUrl: string | null;
  createdAt: Date;
}

// User interface
interface UserInterface {
  id: number;
  username: string;
  email: string;
  role: string; // In real implementation, use UserRole enum
  isActive: boolean;
  cart: any[]; // In real implementation, use CartItem[]
}

// Cart item interface
interface CartItemInterface {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  category: string; // In real implementation, use ProductCategory enum
}

// Cart interface
interface CartInterface {
  userId: number;
  items: CartItemInterface[];
  createdAt: Date;
  lastModified: Date;
}

// Order interface
interface OrderInterface {
  id: string;
  userId: number;
  items: CartItemInterface[];
  subtotal: number;
  total: number;
  status: string; // In real implementation, use OrderStatus enum
  shippingAddress: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Discount type (union type)
type DiscountTypeUnion = "PERCENTAGE" | "FIXED" | null;

// Download link interface
interface DownloadLinkInterface {
  productId: number;
  downloadUrl: string;
  expiresAt: Date;
}

// Order summary interface
interface OrderSummaryInterface {
  orderId: string;
  status: string;
  itemCount: number;
  total: number;
  createdAt: Date;
}

/**
 * Step 3: Type all function signatures
 */

// Sample function signatures (students should implement these in foundation.ts)

type CreateProductFn = (
  id: number,
  name: string,
  price: number,
  category: string,
  stock?: number,
  downloadUrl?: string | null
) => ProductInterface;

type CreateUserFn = (
  id: number,
  username: string,
  email: string,
  role?: string
) => UserInterface;

type CreateCartFn = (userId: number) => CartInterface;

type AddToCartFn = (
  cart: CartInterface,
  product: ProductInterface,
  quantity: number
) => CartInterface;

type CalculateSubtotalFn = (cart: CartInterface) => number;

type ApplyDiscountFn = (
  amount: number,
  discountType: DiscountTypeUnion,
  discountValue: number
) => number;

// ... add more function types as needed

// ============================================================================
// TYPE VALIDATION TESTS
// ============================================================================

console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║                     TYPE COVERAGE VALIDATION                           ║
╚════════════════════════════════════════════════════════════════════════╝

This file defines the EXPECTED types for foundation.ts

TO CHECK YOUR IMPLEMENTATION:

1. Run TypeScript compiler on foundation.ts:
   npx tsc --noEmit --strict foundation.ts

2. You should see errors for:
   ❌ Parameters with implicit 'any' type
   ❌ Missing return type annotations
   ❌ Undefined types/interfaces
   ❌ Incorrect optional parameters

3. Fix foundation.ts by:
   ✅ Creating enums (ProductCategory, OrderStatus, UserRole)
   ✅ Creating interfaces (Product, User, Cart, CartItem, Order, etc.)
   ✅ Adding type annotations to ALL function parameters
   ✅ Adding return type annotations to ALL functions
   ✅ Making optional parameters explicit with ? or defaults
   ✅ Using proper union types (DiscountType)

4. When you get 0 errors, your types are complete!

CHECKLIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ENUMS:
□ ProductCategory enum with PHYSICAL, DIGITAL, SUBSCRIPTION
□ OrderStatus enum with all 5 statuses
□ UserRole enum with CUSTOMER, ADMIN, MODERATOR

INTERFACES/TYPES:
□ Product interface
□ User interface  
□ Cart interface
□ CartItem interface
□ Order interface
□ DiscountType union type
□ DownloadLink interface
□ OrderSummary interface

FUNCTION TYPES (12 functions total):
□ createProduct - all 6 params typed, return type
□ createUser - all 4 params typed, return type
□ createCart - param typed, return type
□ addToCart - all params typed, return type
□ removeFromCart - all params typed, return type
□ updateQuantity - all params typed, return type
□ calculateSubtotal - param typed, return type
□ applyDiscount - all params typed, return type
□ calculateTax - all params typed, return type
□ calculateTotal - all params typed, return type
□ createOrder - all params typed, return type
□ updateOrderStatus - all params typed, return type

TYPE GUARDS & HELPERS:
□ isValidStatusTransition - params and return type
□ canCancelOrder - param and return type
□ isDigitalProduct - type guard with 'is' predicate
□ isInStock - params and return type
□ processDigitalDelivery - param and return type
□ generateOrderId - return type
□ getOrderSummary - param and return type
□ validateCart - params and return type

VALIDATION COMMANDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Check foundation.ts for type errors
npx tsc --noEmit foundation.ts

# Check with strict mode (recommended)
npx tsc --noEmit --strict foundation.ts

# Count remaining errors
npx tsc --noEmit foundation.ts 2>&1 | grep "error TS" | wc -l

TARGET: 0 errors ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

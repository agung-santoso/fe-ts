# TypeScript Foundations Project

## Overview
This project is designed to help you learn and practice TypeScript type annotations. The code is already implemented in Typescript, but your goal is to **add proper TypeScript type declarations** to eliminate all TypeScript errors and achieve at least **80% test coverage**.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify setup**
   ```bash
   npm test
   ```
   This should run the test suite and show current coverage.

## Project Structure

```
fe-ts/
├── src/
│   └── foundation/
│       ├── foundation.ts       # JavaScript code needing type annotations (EDIT THIS)
│       ├── foundation.test.ts  # Test file (READ ONLY)
│       └── check-types.ts      # Type checking utilities (DO NOT MODIFY)
├── coverage/                   # Test coverage reports (generated)
├── jest.config.cjs            # Jest configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## Your Mission
### 0. Create your onw branch

You will edit, push in you own branch. Create MR when you ready and attach the test screenshot and coverage score in the MR description
```
git checkout -b 'task/my-name'
```

### 1. Add Type Declarations

Open `src/foundation/foundation.ts` - you'll find a fully functional e-commerce shopping cart system written in TypeScript. Your job is to add proper type annotations.

**What you need to add:**
- Type annotations for function parameters and return types
- Interface or type alias definitions for objects (Product, User, Cart, Order, etc.)
- Enums for constants (ProductCategory, OrderStatus, UserRole)
- Type guards with proper type predicates
- Proper handling of optional and nullable values
- Union types and literal types where appropriate

**Example of what you'll be doing:**
```typescript
// BEFORE (Typescript):
function createProduct(id, name, price, category, stock, downloadUrl) {
  return { id, name, price, category, stock: stock || 0 };
}

// AFTER (TypeScript):
interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  stock: number;
  downloadUrl: string | null;
  createdAt: Date;
}

function createProduct(
  id: number, 
  name: string, 
  price: number, 
  category: ProductCategory, 
  stock?: number, 
  downloadUrl?: string | null
): Product {
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
```

### 2. Run the test
To check if your type annotations work correctly with the tests:

```bash
npm run test
```

This will:
- Run all test cases
- Show which tests pass/fail

### 3. Check Test Coverage

To view detailed coverage:

```bash
npm run test:coverage
```

Or open the HTML coverage report:
```bash
# The coverage report is in: coverage/lcov-report/index.html
# Open this file in your browser
```

### Required Type Declarations

You need to add the following to `foundation.ts`:
1. **Enums** for constants:
   - `ProductCategory` enum (PHYSICAL, DIGITAL, SUBSCRIPTION)
   - `OrderStatus` enum (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
   - `UserRole` enum (CUSTOMER, ADMIN, MODERATOR)

2. **Interfaces or Type Aliases** for data structures:
   - `Product` - product information
   - `User` - user information
   - `Cart` - shopping cart
   - `CartItem` - individual cart item
   - `Order` - order information
   - `ShippingAddress` - address information
   - `DigitalDownload` - digital product download info
   - `OrderSummary` - order summary information

3. **Function Type Annotations**:
   - Add parameter types to all function parameters
   - Add return types to all functions
   - Use proper optional parameters (`?:`) where applicable

4. **Type Guards**:
   - Add proper type predicates (`: product is DigitalProduct`) for type guard functions

5. **Union Types and Literals**:
   - Use literal types for discount types ("PERCENTAGE" | "FIXED")
   - Use union types for nullable values (e.g., `string | null`)


## Success Criteria

Your implementation is complete when:
1. ✅ All TypeScript errors are resolved (0 errors in `npm run type-check`)
2. ✅ All tests pass
3. ✅ Test coverage is at least 80%
4. ✅ No implicit 'any' types
5. ✅ Code logic remains unchanged (only types added)

Good luck! 🚀

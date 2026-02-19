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
│       ├── foundation.ts       # Typescript code needing type annotations (EDIT THIS)
│       ├── foundation.test.ts  # Test file (READ ONLY)
│       └── check-types.ts      # Type checking utilities (DO NOT MODIFY)
├── coverage/                   # Test coverage reports (generated)
├── jest.config.cjs            # Jest configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## Your Mission
### 0. Create and move to your onw branch

You will work in you own branch.
```
git checkout -b 'task/your-name'
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

### 3. Create Merge Request

Create MR and attach the screenshot of test list (should be visible when you run the test). Then send the MR link to Has, Adit or Agung via Teams.

## Success Criteria

Your implementation is complete when:
1. ✅ Pass 90% of the test
3. ✅ No implicit 'any' types
4. ✅ Code logic remains unchanged (only types added)

Good luck! 🚀

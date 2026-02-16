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

### 1. Add Type Declarations

Open `src/foundation/foundation.ts` - you'll find a fully functional e-commerce shopping cart system written in JavaScript. Your job is to convert it to TypeScript by adding proper type annotations.

**What you need to add:**
- Type annotations for function parameters and return types
- Interface or type alias definitions for objects (Product, User, Cart, Order, etc.)
- Enums for constants (ProductCategory, OrderStatus, UserRole)
- Type guards with proper type predicates
- Proper handling of optional and nullable values
- Union types and literal types where appropriate

**Example of what you'll be doing:**
```typescript
// BEFORE (JavaScript):
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

### 2. What Files to Change

✅ **EDIT THIS FILE:**
- `src/foundation/foundation.ts` - Add type annotations to all functions, parameters, and variables

❌ **DO NOT MODIFY:**
- `src/foundation/foundation.test.ts` - Test cases (read-only)
- `src/foundation/check-types.ts` - Type utilities (read-only)
- `jest.config.cjs` - Test configuration
- `tsconfig.json` - TypeScript configuration
- **DO NOT change the logic** - Only add types!

### 3. Check TypeScript Errors

First, check what TypeScript errors exist:

```bash
npm run type-check
```

You'll see errors because the code lacks type annotations. Your goal is to add types until all errors are gone!

### 4. Run Tests

To check if your type annotations work correctly with the tests:

```bash
npm test
```

This will:
- Run all test cases
- Show which tests pass/fail
- Generate a coverage report

### 5. Check Test Coverage

To view detailed coverage:

```bash
npm test -- --coverage
```

Or open the HTML coverage report:
```bash
# The coverage report is in: coverage/lcov-report/index.html
# Open this file in your browser
```

**Coverage Requirements:**
- ✅ **Minimum: 80% coverage required**
- Adding proper types helps the tests run correctly
- The coverage report shows:
  - **Statements**: Percentage of code statements executed
  - **Branches**: Percentage of conditional branches tested
  - **Functions**: Percentage of functions called
  - **Lines**: Percentage of code lines executed

### 6. Verify Your Work

### 6. Verify Your Work

Ensure your code has no TypeScript errors:

```bash
npm run type-check
```

This verifies that:
- All parameters have type annotations
- All functions have return type annotations
- All objects have proper interfaces or type aliases
- No implicit 'any' types exist
- Your type annotations are correct

## What You Need to Do

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

## Validation Checklist

Before submitting your work, ensure:

- [ ] All TypeScript errors are resolved (`npm run type-check` shows 0 errors)
- [ ] All tests pass (`npm test`)
- [ ] Test coverage is **≥ 80%** (`npm test -- --coverage`)
- [ ] No implicit 'any' types (strict mode is enforced)
- [ ] All functions have proper type annotations
- [ ] All interfaces/types are properly defined
- [ ] You did NOT change the logic, only added types

## Available Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm test -- --coverage` | Run tests with coverage report |
| `npm test -- --watch` | Run tests in watch mode |
| `npm run type-check` | Check TypeScript types |
| `npm run build` | Build the project |

## Tips for Success

1. **Start with the enums** - Convert the const objects to proper TypeScript enums
2. **Define interfaces next** - Create interfaces for Product, User, Cart, Order, etc.
3. **Add function signatures** - Add parameter and return types to all functions
4. **Look at the test file** - The tests show how the types should work
5. **Use TypeScript features** - Optional parameters (`?:`), union types (`|`), literal types
6. **Run type-check frequently** - Fix errors as you go
7. **Read error messages carefully** - TypeScript errors tell you exactly what's wrong
8. **Don't change the logic** - Only add type annotations, don't modify behavior

## Common TypeScript Patterns You'll Need

```typescript
// Enums
enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

// Interfaces
interface User {
  id: number;
  name: string;
  email?: string;  // optional property
}

// Union types
type Result = "success" | "error";

// Nullable types
let value: string | null = null;

// Function with types
function greet(name: string, age?: number): string {
  return `Hello ${name}`;
}

// Type predicates (type guards)
function isAdmin(user: User): user is AdminUser {
  return user.role === "ADMIN";
}
```

## Getting Help

- Check the test file (`foundation.test.ts`) to see how types are used
- Review TypeScript documentation: https://www.typescriptlang.org/docs/
- Look at TypeScript Handbook sections on:
  - Interfaces: https://www.typescriptlang.org/docs/handbook/interfaces.html
  - Enums: https://www.typescriptlang.org/docs/handbook/enums.html
  - Type Guards: https://www.typescriptlang.org/docs/handbook/advanced-types.html
- Read the error messages carefully - they tell you exactly what type is expected

## Success Criteria

Your implementation is complete when:
1. ✅ All TypeScript errors are resolved (0 errors in `npm run type-check`)
2. ✅ All tests pass
3. ✅ Test coverage is at least 80%
4. ✅ No implicit 'any' types
5. ✅ Code logic remains unchanged (only types added)

Good luck! 🚀

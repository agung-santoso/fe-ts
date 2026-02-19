// ============================================================================
// JEST TEST SUITE FOR FOUNDATION.TS TYPE COVERAGE
// ============================================================================
// This test validates that foundation.ts has complete TypeScript type coverage
// Run with: npm test
// ============================================================================

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Foundation.ts Type Coverage Tests', () => {
  const foundationPath = join(__dirname, 'foundation.ts');
  const foundationContent = readFileSync(foundationPath, 'utf-8');

  describe('1. TypeScript Compilation', () => {
    test('should compile without errors', () => {
      try {
        execSync('npx tsc --noEmit foundation.ts', { 
          stdio: 'pipe',
          encoding: 'utf-8' 
        });
      } catch (error: any) {
        const output = error.stdout || error.stderr || '';
        const errorCount = (output.match(/error TS/g) || []).length;
        
        if (errorCount > 0) {
          fail(`Found ${errorCount} TypeScript compilation error(s):\n${output}`);
        }
      }
    });

    test('should compile with strict mode enabled', () => {
      try {
        execSync('npx tsc --noEmit --strict foundation.ts', { 
          stdio: 'pipe',
          encoding: 'utf-8' 
        });
      } catch (error: any) {
        const output = error.stdout || error.stderr || '';
        const errorCount = (output.match(/error TS/g) || []).length;
        
        if (errorCount > 0) {
          fail(`Found ${errorCount} strict mode error(s):\n${output}`);
        }
      }
    });
  });

  describe('2. No Implicit Any Types', () => {
    test('should not have implicit "any" parameters', () => {
      try {
        execSync('npx tsc --noEmit --noImplicitAny foundation.ts', { 
          stdio: 'pipe',
          encoding: 'utf-8' 
        });
      } catch (error: any) {
        const output = error.stdout || error.stderr || '';
        const implicitAnyErrors = (output.match(/TS7006/g) || []).length;
        
        if (implicitAnyErrors > 0) {
          const lines = output.split('\n').filter((line: string) => line.includes('TS7006'));
          fail(
            `Found ${implicitAnyErrors} function(s) with implicit 'any' type:\n` +
            lines.slice(0, 10).join('\n') +
            (lines.length > 10 ? `\n... and ${lines.length - 10} more` : '')
          );
        }
      }
    });
  });

  describe('3. Enums Definition', () => {
    test('should define ProductCategory enum', () => {
      const hasEnum = /enum\s+ProductCategory/i.test(foundationContent);
      const hasConstAssertion = /const\s+ProductCategory.*as const/s.test(foundationContent);
      
      expect(hasEnum || hasConstAssertion).toBe(true);
    });

    test('should define OrderStatus enum', () => {
      const hasEnum = /enum\s+OrderStatus/i.test(foundationContent);
      const hasConstAssertion = /const\s+OrderStatus.*as const/s.test(foundationContent);
      
      expect(hasEnum || hasConstAssertion).toBe(true);
    });

    test('should define UserRole enum', () => {
      const hasEnum = /enum\s+UserRole/i.test(foundationContent);
      const hasConstAssertion = /const\s+UserRole.*as const/s.test(foundationContent);
      
      expect(hasEnum || hasConstAssertion).toBe(true);
    });
  });

  describe('4. Type/Interface Definitions', () => {
    test('should define Product type or interface', () => {
      const hasType = /(type|interface)\s+Product\s*[={]/i.test(foundationContent);
      expect(hasType).toBe(true);
    });

    test('should define User type or interface', () => {
      const hasType = /(type|interface)\s+User\s*[={]/i.test(foundationContent);
      expect(hasType).toBe(true);
    });

    test('should define Cart type or interface', () => {
      const hasType = /(type|interface)\s+Cart\s*[={]/i.test(foundationContent);
      expect(hasType).toBe(true);
    });

    test('should define CartItem type or interface', () => {
      const hasType = /(type|interface)\s+CartItem\s*[={]/i.test(foundationContent);
      expect(hasType).toBe(true);
    });

    test('should define Order type or interface', () => {
      const hasType = /(type|interface)\s+Order\s*[={]/i.test(foundationContent);
      expect(hasType).toBe(true);
    });

    test('should define DiscountType union type', () => {
      const hasType = /type\s+DiscountType\s*=/i.test(foundationContent);
      expect(hasType).toBe(true);
    });
  });

  describe('5. Function Type Annotations', () => {
    const functions = [
      'createProduct',
      'createUser',
      'createCart',
      'addToCart',
      'calculateSubtotal',
      'applyDiscount',
      'calculateTax',
      'calculateTotal',
      'createOrder',
      'updateOrderStatus',
      'isValidStatusTransition',
      'canCancelOrder',
      'isInStock',
      'processDigitalDelivery',
      'generateOrderId',
      'getOrderSummary',
      'validateCart'
    ];

    functions.forEach(funcName => {
      test(`${funcName} should have parameter types`, () => {
        // Check if function has typed parameters (not using implicit any)
        const funcRegex = new RegExp(`function\\s+${funcName}\\s*\\([^)]*\\)`, 'i');
        const match = foundationContent.match(funcRegex);
        
        if (!match) {
          fail(`Function ${funcName} not found`);
          return;
        }

        const funcSignature = match[0];
        
        // Check if parameters have type annotations (contains ':' in params)
        const hasParams = /\([^)]+\)/.test(funcSignature);
        if (hasParams) {
          const paramsMatch = funcSignature.match(/\(([^)]+)\)/);
          if (paramsMatch && paramsMatch[1].trim()) {
            const hasTypeAnnotations = /:/.test(paramsMatch[1]);
            expect(hasTypeAnnotations).toBe(true);
          }
        }
      });

      test(`${funcName} should have return type annotation`, () => {
        const funcRegex = new RegExp(
          `function\\s+${funcName}\\s*\\([^)]*\\)\\s*:\\s*\\w+`,
          'i'
        );
        const hasReturnType = funcRegex.test(foundationContent);
        
        expect(hasReturnType).toBe(true);
      });
    });
  });

  describe('6. Code Quality Checks', () => {
    test('should have no TODO or FIXME comments indicating incomplete types', () => {
      const todos = foundationContent.match(/\/\/\s*(TODO|FIXME).*type/gi) || [];
      expect(todos.length).toBe(0);
    });

    test('should not use "any" type explicitly (except in valid cases)', () => {
      // Count explicit uses of 'any' type (excluding comments)
      const lines = foundationContent.split('\n').filter(line => !line.trim().startsWith('//'));
      const codeOnly = lines.join('\n');
      const anyMatches = codeOnly.match(/:\s*any\b/g) || [];
      
      // Allow up to 2 uses of 'any' (some edge cases might be valid)
      expect(anyMatches.length).toBeLessThanOrEqual(2);
    });
  });

  describe('7. Type Coverage Summary', () => {
    test('should generate type coverage report', () => {
      let totalErrors = 0;
      const report: string[] = [];

      report.push('\n╔════════════════════════════════════════════════════════════════╗');
      report.push('║           TypeScript Type Coverage Report                     ║');
      report.push('╚════════════════════════════════════════════════════════════════╝\n');

      // Check compilation
      try {
        execSync('npx tsc --noEmit --strict foundation.ts', { stdio: 'pipe' });
        report.push('✅ TypeScript Compilation: PASS');
      } catch (error: any) {
        const output = error.stdout || error.stderr || '';
        const errors = (output.match(/error TS/g) || []).length;
        totalErrors += errors;
        report.push(`❌ TypeScript Compilation: ${errors} error(s)`);
      }

      // Check implicit any
      try {
        execSync('npx tsc --noEmit --noImplicitAny foundation.ts', { stdio: 'pipe' });
        report.push('✅ No Implicit Any: PASS');
      } catch (error: any) {
        const output = error.stdout || error.stderr || '';
        const errors = (output.match(/TS7006/g) || []).length;
        totalErrors += errors;
        report.push(`❌ No Implicit Any: ${errors} error(s)`);
      }

      // Count enums
      const enumCount = (foundationContent.match(/enum\s+\w+/g) || []).length;
      report.push(`\n📊 Statistics:`);
      report.push(`   - Enums defined: ${enumCount}/3 expected`);
      
      // Count interfaces/types
      const typeCount = (foundationContent.match(/(type|interface)\s+\w+/g) || []).length;
      report.push(`   - Types/Interfaces: ${typeCount}`);

      report.push(`\n${totalErrors === 0 ? '✅ ALL TESTS PASSED!' : `❌ ${totalErrors} total error(s) found`}`);
      report.push('════════════════════════════════════════════════════════════════\n');

      console.log(report.join('\n'));

      expect(totalErrors).toBe(0);
    });
  });
});

export {};

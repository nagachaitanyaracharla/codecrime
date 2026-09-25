// Safe Code Validator - Zero Unsafe eval()
// Designed for safe client-side case verification and educational feedback

export function validateCaseCode(caseData, userCode) {
  const code = (userCode || "").trim();
  const logs = [];
  const testResults = [];

  if (!code) {
    return {
      success: false,
      error: "Investigation incomplete: Suspect code cannot be empty.",
      logs: ["> ERROR: Empty submission detected", "> Please inspect the suspect code and apply your patch."],
      testResults: []
    };
  }

  logs.push(`> Initializing sandbox verification for ${caseData.caseNumber}...`);
  logs.push(`> Language runtime: ${caseData.language}`);
  logs.push(`> Parsing syntax AST structure...`);

  switch (caseData.id) {
    case "case-001": {
      // Python calculate_total
      const hasDef = /def\s+calculate_total\s*\(\s*price\s*,\s*quantity\s*\)\s*:/.test(code);
      if (!hasDef) {
        logs.push("> Syntax Error: Function header 'def calculate_total(price, quantity):' is required.");
        return {
          success: false,
          error: "Syntax Error: Function definition header was modified or missing.",
          logs,
          testResults: []
        };
      }

      // Check operation
      const hasMultiplication = /total\s*=\s*(?:price\s*\*\s*quantity|quantity\s*\*\s*price)/.test(code) ||
                                /return\s+(?:price\s*\*\s*quantity|quantity\s*\*\s*price)/.test(code);
      const hasAddition = /total\s*=\s*(?:price\s*\+\s*quantity|quantity\s*\+\s*price)/.test(code) ||
                          /return\s+(?:price\s*\+\s*quantity|quantity\s*\+\s*price)/.test(code);

      caseData.testCases.forEach((tc) => {
        const { price, quantity } = tc.inputs;
        let actual;
        let passed = false;

        if (hasMultiplication) {
          actual = price * quantity;
          passed = actual === tc.expected;
        } else if (hasAddition) {
          actual = price + quantity;
          passed = false;
        } else {
          actual = "NaN (Invalid expression)";
          passed = false;
        }

        testResults.push({
          id: tc.id,
          name: `Test #${tc.id} (${tc.inputLabel})`,
          input: `price=${price}, quantity=${quantity}`,
          expected: String(tc.expected),
          actual: String(actual),
          passed
        });

        if (passed) {
          logs.push(`[PASS] Test #${tc.id}: input (${price}, ${quantity}) -> ${actual} == ${tc.expected}`);
        } else {
          logs.push(`[FAIL] Test #${tc.id}: input (${price}, ${quantity}) -> Expected ${tc.expected}, received ${actual}`);
        }
      });

      const allPassed = testResults.every(t => t.passed);
      if (allPassed) {
        logs.push("> ALL TEST CASES PASSED VERIFICATION.");
        logs.push("> Status: CASE SOLVED. Evidence confirmed.");
      } else {
        logs.push("> VERIFICATION FAILED: Ledger calculations do not match expected product.");
      }

      return {
        success: allPassed,
        error: allPassed ? null : "Output calculation does not match expected arithmetic.",
        logs,
        testResults
      };
    }

    case "case-002": {
      // JavaScript getUserProfile
      // Check if `let role` is still declared solely inside the if/else block
      const hasScopedLetInsideIf = /if\s*\(user\.isActive\)\s*\{\s*let\s+role/m.test(code);
      const hasScopedLetInsideElse = /else\s*\{\s*let\s+role/m.test(code);
      const hasOuterRoleDeclaration = /(?:let|var)\s+role\s*[;=]/.test(code.replace(/if\s*\(user\.isActive\)[\s\S]*?else\s*\{[\s\S]*?\}/, '')) ||
                                      /let\s+role\b/.test(code.split(/if\s*\(/)[0]);
      const hasTernary = /(?:let|const|var)\s+role\s*=\s*user\.isActive\s*\?\s*["']Agent["']\s*:\s*["']Guest["']/.test(code) ||
                         /clearance:\s*user\.isActive\s*\?\s*["']Agent["']\s*:\s*["']Guest["']/.test(code);

      const isFixed = (hasOuterRoleDeclaration && !hasScopedLetInsideIf) || hasTernary ||
                      (/var\s+role\s*=/.test(code)) ||
                      (/let\s+role\s*;[\s\S]*?if\s*\(user\.isActive\)\s*\{\s*role\s*=/.test(code));

      caseData.testCases.forEach((tc) => {
        const u = tc.inputs.user;
        let actual;
        let passed = false;

        if (isFixed) {
          actual = JSON.stringify({ name: u.name, clearance: u.isActive ? "Agent" : "Guest" });
          passed = true;
          logs.push(`[PASS] Test #${tc.id}: (${u.name}, active=${u.isActive}) -> clearance: "${u.isActive ? "Agent" : "Guest"}"`);
        } else {
          actual = "ReferenceError: role is not defined";
          passed = false;
          logs.push(`[CRASH] Test #${tc.id}: Uncaught ReferenceError: role is not defined at line 7`);
        }

        testResults.push({
          id: tc.id,
          name: `Test #${tc.id} (${tc.inputLabel})`,
          input: `name: "${u.name}", isActive: ${u.isActive}`,
          expected: JSON.stringify(tc.expected),
          actual: actual,
          passed
        });
      });

      const allPassed = isFixed;
      if (allPassed) {
        logs.push("> Scope analysis confirmed: 'role' variable is safely bound in outer scope.");
        logs.push("> Status: CASE SOLVED. Memory token verified.");
      } else {
        logs.push("> VERIFICATION FAILED: Variable 'role' is unreachable outside block scope.");
      }

      return {
        success: allPassed,
        error: allPassed ? null : "ReferenceError: 'role' is scoped inside the block and unreachable at return.",
        logs,
        testResults
      };
    }

    case "case-003": {
      // SQL Cadets marks > 80
      const upper = code.toUpperCase();
      const hasSelect = /SELECT\b/.test(upper);
      const hasFrom = /FROM\s+CADETS\b/.test(upper);
      const hasWhereGreater = /WHERE\s+MARKS\s*(?:>|>=)\s*80\b/.test(upper);
      const hasWhereLess = /WHERE\s+MARKS\s*(?:<|<=)\s*80\b/.test(upper);

      if (!hasSelect || !hasFrom) {
        logs.push("> SQL Syntax Error: Query must contain valid SELECT and FROM cadets clauses.");
        return {
          success: false,
          error: "SQL Syntax Error: Incomplete query structure.",
          logs,
          testResults: []
        };
      }

      let passed = false;
      let actualRows = "";
      if (hasWhereGreater) {
        passed = true;
        actualRows = "3 records: Kaelen (98), Samantha (92), Chaitanya (85)";
        logs.push("[PASS] Query executed against Academy Database.");
        logs.push("  -> Returned 3 cadet records with marks > 80.");
      } else if (hasWhereLess) {
        actualRows = "3 records: Derek (45), Liam (62), Priya (78)";
        logs.push("[FAIL] Query returned 3 probation records with marks < 80.");
      } else {
        actualRows = "0 records returned (Condition not matched)";
        logs.push("[FAIL] Query WHERE condition does not match required threshold.");
      }

      testResults.push({
        id: 1,
        name: "Honors Filter (> 80)",
        input: "Dataset of 6 Academy Cadets",
        expected: "3 records: Kaelen (98), Samantha (92), Chaitanya (85)",
        actual: actualRows,
        passed
      });

      if (passed) {
        logs.push("> DATABASE VERIFICATION CONFIRMED: Correct cadets retrieved.");
        logs.push("> Status: CASE SOLVED.");
      } else {
        logs.push("> VERIFICATION FAILED: Inverted condition selected low-scoring records.");
      }

      return {
        success: passed,
        error: passed ? null : "Query condition filters for marks < 80 instead of marks > 80.",
        logs,
        testResults
      };
    }

    case "case-004": {
      // Java Infinite Loop
      const hasDecrement = /pendingPackets\s*--/.test(code) || /pendingPackets\s*-=\s*1/.test(code);
      const hasIncrement = /pendingPackets\s*\+\+/.test(code);

      caseData.testCases.forEach((tc) => {
        let actual;
        let passed = false;
        if (hasDecrement) {
          actual = tc.expected;
          passed = true;
          logs.push(`[PASS] Test #${tc.id}: Queue processed in ${actual} cycles.`);
        } else if (hasIncrement) {
          actual = "TIMEOUT (> 10000ms - Infinite Loop)";
          passed = false;
          logs.push(`[HALT] Test #${tc.id}: Thread hung at while (pendingPackets > 0).`);
        } else {
          actual = "Unhandled loop step";
          passed = false;
          logs.push(`[FAIL] Test #${tc.id}: pendingPackets divergence detected.`);
        }

        testResults.push({
          id: tc.id,
          name: `Test #${tc.id} (${tc.inputLabel})`,
          input: `pendingPackets: ${tc.inputs.pendingPackets}`,
          expected: String(tc.expected),
          actual: String(actual),
          passed
        });
      });

      const allPassed = hasDecrement;
      return {
        success: allPassed,
        error: allPassed ? null : "Infinite Loop detected: Queue size never converges to zero.",
        logs,
        testResults
      };
    }

    case "case-005": {
      // C++ Memory Leak
      const hasDelete = /delete\s*\[\s*\]\s*buffer\s*;/.test(code) || /std::unique_ptr/.test(code);
      const passed = hasDelete;

      if (passed) {
        logs.push("[PASS] Valgrind memory leak inspection passed.");
        logs.push("  -> All 4,096 heap bytes safely reclaimed with delete[].");
      } else {
        logs.push("[FAIL] Valgrind error: 4,096 heap bytes definitely lost at exit.");
      }

      testResults.push({
        id: 1,
        name: "Heap Deallocation Test",
        input: "inspectPayload(4096)",
        expected: "0 memory leaks",
        actual: passed ? "0 leaks (Clean)" : "4096 bytes leaked",
        passed
      });

      return {
        success: passed,
        error: passed ? null : "Memory Leak detected: Allocated buffer was not deallocated before return.",
        logs,
        testResults
      };
    }

    case "case-006": {
      // SQL Injection
      const hasConcat = /\+\s*userInput\s*\+/.test(code) || /username\s*=\s*['"]\s*\+\s*userInput/.test(code);
      const hasParameterized = /\?/.test(code) || /\$1/.test(code) || /prepare\s*\(/.test(code) || /execute\s*\(/.test(code);
      const passed = !hasConcat && hasParameterized;

      if (passed) {
        logs.push("[PASS] SQL Injection test with payload admin'-- completed.");
        logs.push("  -> Input safely quarantined inside parameterized placeholder.");
      } else {
        logs.push("[FAIL] SQL Injection test failed: Attacker payload successfully modified query AST.");
      }

      testResults.push({
        id: 1,
        name: "OWASP SQLi Sanitization Test",
        input: "admin' OR '1'='1",
        expected: "Query Parameterized",
        actual: passed ? "Parameterized" : "Vulnerable to String Concatenation",
        passed
      });

      return {
        success: passed,
        error: passed ? null : "SQL Injection vulnerability present: Direct string concatenation detected.",
        logs,
        testResults
      };
    }

    default:
      return {
        success: false,
        error: "Unrecognized case definition.",
        logs: ["> Error: Case validation protocol not found."],
        testResults: []
      };
  }
}

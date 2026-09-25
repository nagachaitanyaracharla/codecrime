// CODECRIME - Master Case Database
// Created by NAGA CHAITANYA RACHARLA

export const CASE_FILES = [
  {
    id: "case-001",
    caseNumber: "CASE #001",
    title: "THE BROKEN CALCULATOR",
    subtitle: "Suspect arithmetic in automated transaction ledger",
    difficulty: "BEGINNER",
    language: "Python",
    crime: "Incorrect calculation",
    status: "AVAILABLE",
    reward: 100,
    timeLimit: 300, // 5:00
    description: "An automated billing module is issuing drastically undercharged invoices. Witnesses report that buying 5 units at $10 each only charges $15 instead of $50. Locate the flawed arithmetic operator in the suspect subroutine.",
    initialCode: `def calculate_total(price, quantity):
    total = price + quantity
    return total`,
    expectedOperator: "*",
    targetLine: 2,
    evidence: [
      {
        id: "ev-01",
        label: "EVIDENCE #01",
        title: "Expected Operation",
        detail: "Ledger specifications dictate Multiplication between unit price and count.",
        type: "rule",
        connectedLine: 2
      },
      {
        id: "ev-02",
        label: "EVIDENCE #02",
        title: "Observed Output",
        detail: "For input (10, 5), function returns 15 instead of 50.",
        type: "log",
        connectedLine: 2
      },
      {
        id: "ev-03",
        label: "EVIDENCE #03",
        title: "Expected Output",
        detail: "For input (20, 3), function must return 60. Current run yields 23.",
        type: "target",
        connectedLine: 3
      },
      {
        id: "ev-04",
        label: "EVIDENCE #04",
        title: "Suspicious Line",
        detail: "Line 2 assigns total using the addition operator (+) rather than product (*).",
        type: "suspect",
        connectedLine: 2
      }
    ],
    hints: [
      {
        level: 1,
        cost: 20,
        text: "Look carefully at the operation used to calculate the total on Line 2."
      },
      {
        level: 2,
        cost: 30,
        text: "The problem is in the mathematical operator between price and quantity."
      },
      {
        level: 3,
        cost: 50,
        text: "Should price and quantity be added or multiplied? Replace '+' with '*'."
      }
    ],
    testCases: [
      {
        id: 1,
        inputLabel: "price = 10, quantity = 5",
        inputs: { price: 10, quantity: 5 },
        expected: 50
      },
      {
        id: 2,
        inputLabel: "price = 20, quantity = 3",
        inputs: { price: 20, quantity: 3 },
        expected: 60
      },
      {
        id: 3,
        inputLabel: "price = 7, quantity = 8",
        inputs: { price: 7, quantity: 8 },
        expected: 56
      }
    ],
    bugIdentified: "Incorrect arithmetic operator",
    rootCause: "Addition (+) was used instead of multiplication (*)",
    explanation: "In high-throughput billing systems, using an additive operator instead of a multiplier causes catastrophic revenue under-reporting. Replacing '+' with '*' restores the expected product."
  },
  {
    id: "case-002",
    caseNumber: "CASE #002",
    title: "THE VANISHING USER",
    subtitle: "Block-scope clearance token vanishing into the void",
    difficulty: "BEGINNER",
    language: "JavaScript",
    crime: "Undefined variable / Scope leakage",
    status: "AVAILABLE",
    reward: 150,
    timeLimit: 300,
    description: "The authentication gateway keeps throwing ReferenceErrors when compiling detective profiles. The `role` clearance variable seems to disappear as soon as the conditional check completes.",
    initialCode: `function getUserProfile(user) {
  if (user.isActive) {
    let role = "Agent";
  } else {
    let role = "Guest";
  }
  return {
    name: user.name,
    clearance: role
  };
}`,
    targetLine: 7,
    evidence: [
      {
        id: "ev-01",
        label: "EVIDENCE #01",
        title: "Console Trace",
        detail: "Uncaught ReferenceError: role is not defined at return statement.",
        type: "log",
        connectedLine: 7
      },
      {
        id: "ev-02",
        label: "EVIDENCE #02",
        title: "Block Scope Trap",
        detail: "Variables declared with `let` inside { ... } blocks are not accessible outside their enclosing braces.",
        type: "rule",
        connectedLine: 3
      },
      {
        id: "ev-03",
        label: "EVIDENCE #03",
        title: "Expected Clearance",
        detail: "Active users must receive 'Agent' clearance; inactive users receive 'Guest'.",
        type: "target",
        connectedLine: 2
      },
      {
        id: "ev-04",
        label: "EVIDENCE #04",
        title: "Suspicious Declaration",
        detail: "Declare `let role` before the conditional branch so it remains in outer function scope.",
        type: "suspect",
        connectedLine: 2
      }
    ],
    hints: [
      {
        level: 1,
        cost: 25,
        text: "Notice where `let role` is declared. Is it accessible outside the if/else curly brackets?"
      },
      {
        level: 2,
        cost: 35,
        text: "In JavaScript, `let` is block-scoped. You need to declare `let role;` before the if statement."
      },
      {
        level: 3,
        cost: 50,
        text: "Declare `let role = user.isActive ? 'Agent' : 'Guest';` or declare `let role;` outside the if-else block."
      }
    ],
    testCases: [
      {
        id: 1,
        inputLabel: "user = { name: 'Viper', isActive: true }",
        inputs: { user: { name: "Viper", isActive: true } },
        expected: { name: "Viper", clearance: "Agent" }
      },
      {
        id: 2,
        inputLabel: "user = { name: 'Ghost', isActive: false }",
        inputs: { user: { name: "Ghost", isActive: false } },
        expected: { name: "Ghost", clearance: "Guest" }
      }
    ],
    bugIdentified: "Block-scoped variable leakage",
    rootCause: "`role` was scoped locally inside isolated if/else blocks and inaccessible at return",
    explanation: "JavaScript block scoping prevents inner `let` declarations from being visible outside their curly braces. Elevating `let role` to function scope or using a ternary expression resolves the ReferenceError."
  },
  {
    id: "case-003",
    caseNumber: "CASE #003",
    title: "THE SILENT DATABASE",
    subtitle: "Inverted relational filter hiding cadet honor roll records",
    difficulty: "INTERMEDIATE",
    language: "SQL",
    crime: "Incorrect query condition",
    status: "AVAILABLE",
    reward: 200,
    timeLimit: 360,
    description: "The Cyber Academy dean requested an honors roster of all students with marks strictly greater than 80. Instead, the terminal returned low-scoring cadets facing academic probation.",
    initialCode: `SELECT student_id, name, marks
FROM cadets
WHERE marks < 80
ORDER BY marks DESC;`,
    targetLine: 3,
    evidence: [
      {
        id: "ev-01",
        label: "EVIDENCE #01",
        title: "Filter Specification",
        detail: "Query must filter for cadets whose marks exceed the threshold: marks > 80.",
        type: "rule",
        connectedLine: 3
      },
      {
        id: "ev-02",
        label: "EVIDENCE #02",
        title: "Inverted Output",
        detail: "Current query returned marks of 42, 65, 78 instead of top scorers 85, 92, 98.",
        type: "log",
        connectedLine: 3
      },
      {
        id: "ev-03",
        label: "EVIDENCE #03",
        title: "Query Condition",
        detail: "Line 3 contains 'WHERE marks < 80'. The comparison operator is inverted.",
        type: "suspect",
        connectedLine: 3
      },
      {
        id: "ev-04",
        label: "EVIDENCE #04",
        title: "Target Column",
        detail: "Ensure SELECT preserves student_id, name, marks sorted descending.",
        type: "target",
        connectedLine: 1
      }
    ],
    hints: [
      {
        level: 1,
        cost: 30,
        text: "Inspect the WHERE condition. Is '<' returning cadets with marks above or below 80?"
      },
      {
        level: 2,
        cost: 40,
        text: "To find students with marks greater than 80, the comparison operator should be '>'."
      },
      {
        level: 3,
        cost: 60,
        text: "Change 'WHERE marks < 80' to 'WHERE marks > 80'."
      }
    ],
    testCases: [
      {
        id: 1,
        inputLabel: "Database table: 6 cadets [45, 62, 78, 85, 92, 98]",
        inputs: { threshold: 80 },
        expectedCount: 3,
        expectedStudents: ["Kaelen (98)", "Samantha (92)", "Chaitanya (85)"]
      }
    ],
    bugIdentified: "Inverted relational operator",
    rootCause: "Less-than (<) was used instead of greater-than (>)",
    explanation: "Relational operator inversion in WHERE clauses is one of the most common causes of data leakage and false reporting in database queries. Changing '<' to '>' correctly selects honor students."
  },
  {
    id: "case-004",
    caseNumber: "CASE #004",
    title: "THE INFINITE LOOP",
    subtitle: "Security watchdog thread hung in an endless iteration cycle",
    difficulty: "INTERMEDIATE",
    language: "Java",
    crime: "Program never terminates",
    status: "AVAILABLE",
    reward: 250,
    timeLimit: 360,
    description: "The firewall rule sync daemon pegs CPU cores at 100% and freezes the server. A countdown validator loop fails to decrement its pointer, holding the lock indefinitely.",
    initialCode: `public class SecuritySync {
    public static int drainQueue(int pendingPackets) {
        int processed = 0;
        while (pendingPackets > 0) {
            processed++;
            // Watchdog increment error:
            pendingPackets++;
        }
        return processed;
    }
}`,
    targetLine: 7,
    evidence: [
      {
        id: "ev-01",
        label: "EVIDENCE #01",
        title: "Thread Dump",
        detail: "Process hangs forever at while (pendingPackets > 0).",
        type: "log",
        connectedLine: 4
      },
      {
        id: "ev-02",
        label: "EVIDENCE #02",
        title: "Counter Progression",
        detail: "Instead of approaching 0, pendingPackets increases towards Integer.MAX_VALUE.",
        type: "suspect",
        connectedLine: 7
      },
      {
        id: "ev-03",
        label: "EVIDENCE #03",
        title: "Expected Drain",
        detail: "Each processed packet must decrement pendingPackets until queue hits 0.",
        type: "rule",
        connectedLine: 7
      }
    ],
    hints: [
      {
        level: 1,
        cost: 35,
        text: "Check what is happening to pendingPackets inside the while loop."
      },
      {
        level: 2,
        cost: 45,
        text: "Line 7 increments pendingPackets instead of reducing it."
      },
      {
        level: 3,
        cost: 70,
        text: "Change 'pendingPackets++' to 'pendingPackets--'."
      }
    ],
    testCases: [
      {
        id: 1,
        inputLabel: "pendingPackets = 5",
        inputs: { pendingPackets: 5 },
        expected: 5
      },
      {
        id: 2,
        inputLabel: "pendingPackets = 12",
        inputs: { pendingPackets: 12 },
        expected: 12
      }
    ],
    bugIdentified: "Divergent loop progression",
    rootCause: "pendingPackets was incremented instead of decremented, preventing the exit condition",
    explanation: "Loops require monotonic progress towards their termination condition. Incrementing a positive counter in a `> 0` check causes integer overflow and infinite loop stalls."
  },
  {
    id: "case-005",
    caseNumber: "CASE #005",
    title: "THE MEMORY LEAK",
    subtitle: "Orphaned heap buffers exhausting perimeter gateway RAM",
    difficulty: "ADVANCED",
    language: "C++",
    crime: "Improper memory handling",
    status: "AVAILABLE",
    reward: 400,
    timeLimit: 420,
    description: "A packet packet inspection hook continuously requests new heap buffers without releasing existing allocations, triggering an out-of-memory kernel panic.",
    initialCode: `char* inspectPayload(int size) {
    char* buffer = new char[size];
    // Inspect and sanitize buffer...
    // Critical: release prior allocation before returning
    // delete[] buffer; (missing)
    return buffer;
}`,
    targetLine: 5,
    evidence: [
      {
        id: "ev-01",
        label: "EVIDENCE #01",
        title: "Valgrind Log",
        detail: "LEAK SUMMARY: definitely lost 4,096 bytes in 1 blocks at 'new char[size]'.",
        type: "log",
        connectedLine: 2
      },
      {
        id: "ev-02",
        label: "EVIDENCE #02",
        title: "Missing Deallocation",
        detail: "Allocations created with `new[]` must be matched with `delete[]`.",
        type: "suspect",
        connectedLine: 5
      }
    ],
    hints: [
      {
        level: 1,
        cost: 40,
        text: "Look for how dynamic memory allocated with `new char[size]` is reclaimed."
      },
      {
        level: 2,
        cost: 60,
        text: "C++ arrays allocated on the heap must be freed using `delete[]`."
      },
      {
        level: 3,
        cost: 80,
        text: "Ensure clean deallocation with `delete[] buffer;` or using smart pointers."
      }
    ],
    testCases: [
      {
        id: 1,
        inputLabel: "Payload inspection 4096 bytes",
        inputs: { size: 4096 },
        expected: "Clean deallocation verified"
      }
    ],
    bugIdentified: "Unfreed dynamic array allocation",
    rootCause: "Missing delete[] call for heap memory allocated with new[]",
    explanation: "Manual memory management in C++ demands rigorous deallocation pairing. Neglecting delete[] on dynamically allocated arrays creates persistent memory leaks that degrade system performance."
  },
  {
    id: "case-006",
    caseNumber: "CASE #006",
    title: "THE HIDDEN INJECTION",
    subtitle: "Direct string concatenation permitting SQL query hijacking",
    difficulty: "ADVANCED",
    language: "SQL",
    crime: "Security vulnerability",
    status: "AVAILABLE",
    reward: 500,
    timeLimit: 420,
    description: "An internal security credential verification routine constructs queries using raw string concatenation, allowing an attacker to inject `admin' OR '1'='1` and bypass all authentication.",
    initialCode: `// VULNERABLE QUERY CONSTRUCTOR:
const query = "SELECT * FROM agents WHERE username = '" + userInput + "' AND pass = '" + password + "'";`,
    targetLine: 2,
    evidence: [
      {
        id: "ev-01",
        label: "EVIDENCE #01",
        title: "Vulnerability Scan",
        detail: "CWE-89: Improper Neutralization of Special Elements used in an SQL Command.",
        type: "suspect",
        connectedLine: 2
      },
      {
        id: "ev-02",
        label: "EVIDENCE #02",
        title: "Payload Sample",
        detail: "Attacker payload: admin'-- bypasses password check completely.",
        type: "log",
        connectedLine: 2
      },
      {
        id: "ev-03",
        label: "EVIDENCE #03",
        title: "Remediation Standard",
        detail: "Use parameterized queries with placeholders ($1, ? or :username) instead of concatenation.",
        type: "rule",
        connectedLine: 2
      }
    ],
    hints: [
      {
        level: 1,
        cost: 50,
        text: "Direct string concatenation with '+' allows untrusted input to alter SQL syntax."
      },
      {
        level: 2,
        cost: 70,
        text: "Replace raw concatenation with parameterized placeholders like ? or $1, $2."
      },
      {
        level: 3,
        cost: 100,
        text: "Use parameterized query format: 'SELECT * FROM agents WHERE username = ? AND pass = ?' with parameters array."
      }
    ],
    testCases: [
      {
        id: 1,
        inputLabel: "Attacker payload: 'admin\\' OR \\'1\\'=\\'1'",
        inputs: { testPayload: "admin' OR '1'='1" },
        expected: "Parameterized / Sanitized"
      }
    ],
    bugIdentified: "SQL Injection via String Concatenation",
    rootCause: "Directly concatenating untrusted user input into raw SQL command strings",
    explanation: "Concatenating user input directly into SQL strings allows characters like single quotes to break out of data context and execute unauthorized commands. Parameterized prepared statements ensure input is treated strictly as data."
  }
];

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for CORS - restrict to app domains
const ALLOWED_ORIGINS = [
  "https://lovableproject.com",
  "https://lovable.app",
  "http://localhost:5173",
  "http://localhost:8080",
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  // Check if origin is allowed
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith('.lovableproject.com') || origin.endsWith('.lovable.app')
  ) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Credentials": "true",
  };
}

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = 10; // Maximum 10 submissions per window
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window

// In-memory rate limit store (resets on cold start, but provides protection during hot instances)
const rateLimitStore = new Map<string, { count: number; resetTime: number; lastFailedAt?: number }>();

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number;
}

function checkRateLimit(userId: string): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(userId);

  // Cleanup old entries periodically (simple memory management)
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitStore.set(userId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count, resetIn: record.resetTime - now };
}

// Track failed submissions for cooldown (prevent rapid retry abuse)
function recordFailedSubmission(userId: string): void {
  const record = rateLimitStore.get(userId);
  if (record) {
    record.lastFailedAt = Date.now();
  }
}

function isInCooldown(userId: string): boolean {
  const record = rateLimitStore.get(userId);
  if (!record?.lastFailedAt) return false;
  
  // 5 second cooldown after failed submission
  const COOLDOWN_MS = 5000;
  return Date.now() - record.lastFailedAt < COOLDOWN_MS;
}

interface TestCase {
  input: string;
  output: string;
}

interface JudgeRequest {
  problem_id: string;
  code: string;
  user_id: string;
  run_only?: boolean;
  custom_input?: string;
}

interface JudgeResult {
  status: string;
  output: string;
  execution_time: number;
  passed_tests?: number;
  total_tests?: number;
}

// Blocked imports for security
const BLOCKED_IMPORTS = [
  "os", "sys", "subprocess", "socket", "requests", "urllib",
  "http", "ftplib", "smtplib", "telnetlib", "pickle", "marshal",
  "ctypes", "multiprocessing", "threading", "asyncio", "__import__",
  "eval", "exec", "compile", "open", "file", "input"
];

function validateCode(code: string): { valid: boolean; error?: string } {
  const codeLines = code.toLowerCase();
  
  for (const blocked of BLOCKED_IMPORTS) {
    // Check for import statements
    if (new RegExp(`import\\s+${blocked}\\b`).test(codeLines)) {
      return { valid: false, error: `Blocked import: ${blocked}` };
    }
    if (new RegExp(`from\\s+${blocked}\\b`).test(codeLines)) {
      return { valid: false, error: `Blocked import: ${blocked}` };
    }
  }
  
  // Check for dangerous built-in functions
  const dangerousFunctions = ["open(", "exec(", "eval(", "__import__(", "compile("];
  for (const func of dangerousFunctions) {
    if (codeLines.includes(func)) {
      return { valid: false, error: `Blocked function: ${func.replace("(", "")}` };
    }
  }
  
  return { valid: true };
}

// Simple Python execution simulator
// In production, this would call a secure sandboxed Python executor
async function executePython(code: string, input: string, timeLimit: number): Promise<{ output: string; error?: string; executionTime: number }> {
  const startTime = Date.now();
  
  try {
    // For demo purposes, we'll simulate execution
    // In production, you would call a secure Python sandbox API
    // Options: Piston API, Judge0, or custom Docker-based solution
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
    
    const executionTime = (Date.now() - startTime) / 1000;
    
    // Check timeout
    if (executionTime > timeLimit) {
      return { output: "", error: "Time Limit Exceeded", executionTime };
    }
    
    // Simulate code execution based on common patterns
    // This is a placeholder - real implementation would execute Python code
    const simulatedOutput = simulateExecution(code, input);
    
    return { output: simulatedOutput, executionTime };
  } catch (error) {
    return { 
      output: "", 
      error: `Runtime Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      executionTime: (Date.now() - startTime) / 1000 
    };
  }
}

function simulateExecution(code: string, input: string): string {
  // This is a simplified simulation for demo purposes
  // In production, use a real Python executor
  
  const inputLines = input.trim().split("\n");
  
  // Two Sum simulation
  if (code.includes("complement") && code.includes("seen")) {
    if (inputLines.length >= 2) {
      const nums = inputLines[0].split(" ").map(Number);
      const target = parseInt(inputLines[1]);
      const seen: Record<number, number> = {};
      
      for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (complement in seen) {
          return `${seen[complement]} ${i}`;
        }
        seen[nums[i]] = i;
      }
    }
    return "0 1";
  }
  
  // Palindrome simulation
  if (code.includes("palindrome") || (code.includes("str(") && code.includes("[::-1]"))) {
    const x = parseInt(inputLines[0]);
    const isPalindrome = x.toString() === x.toString().split("").reverse().join("");
    return isPalindrome ? "true" : "false";
  }
  
  // Maximum subarray (Kadane's algorithm) simulation
  if (code.includes("max_sum") || code.includes("kadane") || code.includes("current_sum")) {
    const nums = inputLines[0].split(" ").map(Number);
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
      currentSum = Math.max(nums[i], currentSum + nums[i]);
      maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum.toString();
  }
  
  // Valid parentheses simulation
  if (code.includes("stack") && code.includes("(") && code.includes("{")) {
    const s = inputLines[0].trim();
    const stack: string[] = [];
    const pairs: Record<string, string> = { ")": "(", "}": "{", "]": "[" };
    
    for (const char of s) {
      if ("({[".includes(char)) {
        stack.push(char);
      } else if (")}]".includes(char)) {
        if (stack.length === 0 || stack.pop() !== pairs[char]) {
          return "false";
        }
      }
    }
    return stack.length === 0 ? "true" : "false";
  }
  
  // N-Queens simulation
  if (code.includes("queens") || code.includes("backtrack")) {
    const n = parseInt(inputLines[0]);
    // Pre-computed solutions for common N values
    const solutions: Record<number, number> = { 1: 1, 2: 0, 3: 0, 4: 2, 5: 10, 6: 4, 7: 40, 8: 92, 9: 352 };
    return (solutions[n] || 0).toString();
  }
  
  // Default: return the first line of output based on print statement
  return "Output simulated";
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { problem_id, code, user_id, run_only, custom_input }: JudgeRequest = await req.json();
    
    console.log(`Judge request for problem: ${problem_id}, user: ${user_id}, run_only: ${run_only}`);
    
    // Rate limiting check - apply to all requests
    const rateLimit = checkRateLimit(user_id);
    
    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for user: ${user_id}`);
      return new Response(
        JSON.stringify({
          status: "Rate Limited",
          output: `Too many submissions. Please wait ${Math.ceil(rateLimit.resetIn / 1000)} seconds before trying again.`,
          execution_time: 0,
        }),
        { 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": Math.ceil(rateLimit.resetIn / 1000).toString(),
            "X-RateLimit-Remaining": "0",
          },
          status: 429,
        }
      );
    }
    
    // Check cooldown after failed submission
    if (isInCooldown(user_id)) {
      console.log(`Cooldown active for user: ${user_id}`);
      return new Response(
        JSON.stringify({
          status: "Rate Limited",
          output: "Please wait a few seconds before retrying after a failed submission.",
          execution_time: 0,
        }),
        { 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": "5",
          },
          status: 429,
        }
      );
    }
    
    // Validate code for security
    const validation = validateCode(code);
    if (!validation.valid) {
      recordFailedSubmission(user_id); // Track failed attempt
      return new Response(
        JSON.stringify({
          status: "Compilation Error",
          output: validation.error,
          execution_time: 0,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Fetch problem data
    const { data: problem, error: problemError } = await supabase
      .from("problems")
      .select("testcases, samples, time_limit")
      .eq("id", problem_id)
      .single();
    
    if (problemError || !problem) {
      console.error("Problem fetch error:", problemError);
      return new Response(
        JSON.stringify({ status: "Error", output: "Problem not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }
    
    let result: JudgeResult;
    
    if (run_only) {
      // Just run against sample input or custom input
      const testInput = custom_input || (problem.samples[0] as TestCase)?.input || "";
      const execution = await executePython(code, testInput, problem.time_limit);
      
      result = {
        status: execution.error ? "Runtime Error" : "Executed",
        output: execution.error || execution.output,
        execution_time: execution.executionTime,
      };
    } else {
      // Full submission - run against all test cases
      const testcases = problem.testcases as TestCase[];
      let passedTests = 0;
      let totalTime = 0;
      let failedOutput = "";
      let status = "Accepted";
      
      for (let i = 0; i < testcases.length; i++) {
        const testcase = testcases[i];
        const execution = await executePython(code, testcase.input, problem.time_limit);
        totalTime += execution.executionTime;
        
        if (execution.error) {
          if (execution.error.includes("Time Limit")) {
            status = "Time Limit Exceeded";
          } else {
            status = "Runtime Error";
          }
          failedOutput = execution.error;
          break;
        }
        
        const expectedOutput = testcase.output.trim();
        const actualOutput = execution.output.trim();
        
        if (actualOutput === expectedOutput) {
          passedTests++;
        } else {
          status = "Wrong Answer";
          failedOutput = `Test ${i + 1}: Expected "${expectedOutput}", got "${actualOutput}"`;
          break;
        }
      }
      
      result = {
        status,
        output: status === "Accepted" 
          ? `All ${testcases.length} test cases passed!` 
          : failedOutput,
        execution_time: totalTime,
        passed_tests: passedTests,
        total_tests: testcases.length,
      };
      
      // Save submission to database
      const { error: submissionError } = await supabase
        .from("submissions")
        .insert({
          user_id,
          problem_id,
          code,
          status: result.status,
          output: result.output,
          execution_time: result.execution_time,
        });
      
      if (submissionError) {
        console.error("Submission save error:", submissionError);
      }
      
      // Update user XP if accepted
      if (status === "Accepted") {
        const xpGain = 50; // Base XP for solving a problem
        
        const { data: profile } = await supabase
          .from("profiles")
          .select("xp, level")
          .eq("user_id", user_id)
          .single();
        
        if (profile) {
          const newXp = profile.xp + xpGain;
          const newLevel = Math.floor(newXp / 300) + 1; // Level up every 300 XP
          
          await supabase
            .from("profiles")
            .update({ 
              xp: newXp, 
              level: newLevel,
              last_active: new Date().toISOString().split("T")[0]
            })
            .eq("user_id", user_id);
        }
      }
    }
    
    console.log(`Judge result: ${result.status}`);
    
    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Judge error:", error);
    const origin = req.headers.get("origin");
    const corsHeaders = getCorsHeaders(origin);
    return new Response(
      JSON.stringify({ 
        status: "Error", 
        output: error instanceof Error ? error.message : "Unknown error",
        execution_time: 0 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

import { NextRequest, NextResponse } from "next/server";
import { chromium } from 'playwright';

export async function POST(request: NextRequest) {
  let browser;
  
  try {
    console.log("Starting browser automation...");
    
    // Launch browser with Playwright
    browser = await chromium.launch({
      headless: false
    });
    
    const page = await browser.newPage();
    
    // Step 1: Navigate to the specific signup page
    console.log("Navigating to https://ui.chaicode.com/auth/signup");
    await page.goto("https://ui.chaicode.com/auth/signup", { 
      waitUntil: 'networkidle'
    });
    
    // Step 2: Wait for the form to load
    console.log("Waiting for signup form to load...");
    await page.waitForSelector('form', {
      timeout: 10000
    });
    
    // Step 3: Fill in the form details based on the actual form structure
    console.log("Filling form details...");
    
    // Fill First Name
    const firstNameInput = await page.$('input[placeholder="John"], input[name*="firstName"], input[name*="first"]');
    if (firstNameInput) {
      await firstNameInput.fill("John");
      console.log("First Name filled");
    }
    
    // Fill Last Name  
    const lastNameInput = await page.$('input[placeholder="Doe"], input[name*="lastName"], input[name*="last"]');
    if (lastNameInput) {
      await lastNameInput.fill("Doe");
      console.log("Last Name filled");
    }
    
    // Fill Email
    const emailInput = await page.$('input[type="email"], input[placeholder*="example.com"], input[name*="email"]');
    if (emailInput) {
      await emailInput.fill("john.doe@example.com");
      console.log("Email filled");
    }
    
    // Fill Password
    const passwordInput = await page.$('input[type="password"]:not([name*="confirm"])');
    if (passwordInput) {
      await passwordInput.fill("SecurePassword123");
      console.log("Password filled");
    }
    
    // Fill Confirm Password
    const confirmPasswordInput = await page.$('input[type="password"][name*="confirm"], input[placeholder*="confirm" i]');
    if (confirmPasswordInput) {
      await confirmPasswordInput.fill("SecurePassword123");
      console.log("Confirm Password filled");
    }
    
    // Add human-like delay
    await page.waitForTimeout(1500);
    
    // Step 4: Find and click the "Create Account" button
    console.log("Looking for Create Account button...");
    
    let submitButton = null;
    const submitSelectors = [
      'button:has-text("Create Account")',
      'button[type="submit"]',
      'input[type="submit"]',
      'button:has-text("Sign Up")',
      'button:has-text("Register")'
    ];
    
    for (const selector of submitSelectors) {
      try {
        submitButton = await page.$(selector);
        if (submitButton && await submitButton.isVisible()) {
          console.log(`Found submit button with selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (submitButton) {
      // Scroll to button if needed
      await submitButton.scrollIntoViewIfNeeded();
      
      // Click the button
      await submitButton.click();
      console.log("Create Account button clicked!");
      
      // Wait for potential redirect, success message, or error
      await page.waitForTimeout(3000);
      
      // Check if we're still on the same page or redirected
      const currentUrl = page.url();
      console.log("Current URL after submission:", currentUrl);
      
    } else {
      throw new Error("Create Account button not found");
    }
    
    const finalUrl = page.url();
    
    return NextResponse.json({ 
      success: true, 
      message: "Signup form filled and submitted successfully!",
      initialUrl: "https://ui.chaicode.com/auth/signup",
      finalUrl: finalUrl,
      formData: {
        firstName: "John",
        lastName: "Doe", 
        email: "john.doe@example.com",
        password: "SecurePassword123"
      }
    });
    
  } catch (error) {
    console.error("Automation error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      message: "Failed to complete signup automation"
    }, { status: 500 });
    
  } finally {
    // Always close the browser
    if (browser) {
      await browser.close();
    }
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: "AI Browser Automation Agent is ready for ChaiCode signup",
    status: "online",
    targetUrl: "https://ui.chaicode.com/auth/signup",
    endpoints: {
      POST: "/api/agent - Execute signup form automation"
    }
  });
}

#!/usr/bin/env node

/**
 * Test Script for DeshDarshan MERN Setup
 * Run this to verify your setup is working correctly
 */

const http = require('http');

// Test backend health endpoint
function testBackend() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/health',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        status: 'ERROR',
        error: err.message
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        status: 'TIMEOUT',
        error: 'Request timed out'
      });
    });

    req.end();
  });
}

// Test AI endpoint
function testAI() {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      promptType: 'faq',
      userInput: 'What is the best time to visit India?'
    });

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/ai/gemini',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        status: 'ERROR',
        error: err.message
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        status: 'TIMEOUT',
        error: 'Request timed out'
      });
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing DeshDarshan MERN Setup...\n');

  // Test 1: Backend Health Check
  console.log('1. Testing Backend Health Endpoint...');
  const healthResult = await testBackend();
  
  if (healthResult.status === 200) {
    console.log('✅ Backend is running and healthy!');
    console.log('   Response:', JSON.parse(healthResult.data).message);
  } else if (healthResult.status === 'ERROR' && healthResult.error.includes('ECONNREFUSED')) {
    console.log('❌ Backend is not running!');
    console.log('   Please start the backend with: npm run backend:dev');
    return;
  } else {
    console.log('❌ Backend health check failed:', healthResult);
    return;
  }

  console.log('\n2. Testing AI API Endpoint...');
  const aiResult = await testAI();
  
  if (aiResult.status === 200) {
    console.log('✅ AI API is working!');
    const response = JSON.parse(aiResult.data);
    console.log('   AI Response preview:', response.response.substring(0, 100) + '...');
  } else if (aiResult.status === 500) {
    console.log('❌ AI API configuration issue');
    console.log('   Check your GEMINI_API_KEY in .env file');
  } else {
    console.log('❌ AI API test failed:', aiResult);
  }

  console.log('\n🎉 Testing complete!');
  console.log('\nNext steps:');
  console.log('- Start frontend: npm run frontend:dev');
  console.log('- Test AI Assistant Panel in browser');
  console.log('- Check http://localhost:5173 for your app');
}

runTests().catch(console.error);

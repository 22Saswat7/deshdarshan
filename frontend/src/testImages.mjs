console.log("DeshDarshan Image System Verification");
console.log("=====================================");

// Test the image mapping functions
import { getStateImage, getTopSpotImage } from './utils/imageUtils.js';

// Test some state images
const testStates = ['Odisha', 'West Bengal', 'Bihar', 'Kerala'];
console.log("\nState Image Tests:");
testStates.forEach(state => {
  const image = getStateImage(state);
  console.log(`${state}: ${image ? '✅ Image found' : '❌ No image'}`);
});

// Test some top spot images  
const testSpots = ['Puri', 'Mumbai', 'Agra', 'Nainital'];
console.log("\nTop Spot Image Tests:");
testSpots.forEach(spot => {
  const image = getTopSpotImage(spot);
  console.log(`${spot}: ${image ? '✅ Image found' : '❌ No image'}`);
});

console.log("\nImage system ready! 🎉");

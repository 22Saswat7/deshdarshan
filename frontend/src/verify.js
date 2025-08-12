const fs = require('fs');
const content = fs.readFileSync('./topSpotsData.js', 'utf8');

// Count spots with image properties
const imageCount = (content.match(/image: getTopSpotImage/g) || []).length;
const spotCount = (content.match(/name: "/g) || []).length;

console.log('Verification Report:');
console.log('==================');
console.log('Total spots found:', spotCount);
console.log('Spots with image properties:', imageCount);
console.log('Coverage:', Math.round((imageCount / spotCount) * 100) + '%');

// Check if helper function exists
if (content.includes('getTopSpotImage')) {
  console.log('✅ Helper function getTopSpotImage exists');
} else {
  console.log('❌ Helper function getTopSpotImage missing');
}

// Check if import exists
if (content.includes('import defaultPlaceholder')) {
  console.log('✅ Default placeholder import exists');
} else {
  console.log('❌ Default placeholder import missing');
}

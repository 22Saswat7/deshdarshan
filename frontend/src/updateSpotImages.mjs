// Update script to add image properties to all top spots
import fs from 'fs';

const topSpotsDataPath = './topSpotsData.js';

// Read the current file
let content = fs.readFileSync(topSpotsDataPath, 'utf8');

// Extract all spot names that don't have image properties
const spotsWithoutImage = [];
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Look for spot name lines
  if (line.includes('name: "') && line.includes('",')) {
    const nameMatch = line.match(/name: "([^"]+)"/);
    if (nameMatch) {
      const spotName = nameMatch[1];
      
      // Check if the next few lines contain an image property
      let hasImage = false;
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        if (lines[j].includes('image:')) {
          hasImage = true;
          break;
        }
        if (lines[j].includes('points:')) {
          break; // Reached points section, no image found
        }
      }
      
      if (!hasImage) {
        spotsWithoutImage.push({
          name: spotName,
          lineIndex: i
        });
      }
    }
  }
}

console.log('Spots without image properties:', spotsWithoutImage);

// Now update the content by adding image properties
let updatedContent = content;

// Process from bottom to top to avoid line number changes
for (let i = spotsWithoutImage.length - 1; i >= 0; i--) {
  const spot = spotsWithoutImage[i];
  const imageProperty = `      image: getTopSpotImage("${spot.name}"),`;
  
  // Find the description line and add image after it
  const lines = updatedContent.split('\n');
  for (let j = spot.lineIndex; j < lines.length; j++) {
    if (lines[j].includes('description:')) {
      // Insert image property after description line
      lines.splice(j + 1, 0, imageProperty);
      break;
    }
  }
  updatedContent = lines.join('\n');
}

// Write the updated content back
fs.writeFileSync(topSpotsDataPath, updatedContent, 'utf8');

console.log('Successfully updated topSpotsData.js with all image properties');

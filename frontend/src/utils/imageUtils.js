// Image mapping utilities for DeshDarshan
// Handles dynamic imports and filename mapping for states and top spots

/**
 * Predefined mapping for state images that don't follow standard naming
 */
const stateImageMap = {
  'odisha': 'odisha.jpg',
  'west-bengal': 'west-bengal.jpg', 
  'bihar': 'bihar.jpg',
  'jharkhand': 'jharkhand.jpg',
  'maharashtra': 'maharashtra.jpg',
  'goa': 'goa.jpg',
  'gujarat': 'gujarat.jpg',
  'rajasthan': 'rajasthan.jpg',
  'uttarakhand': 'uttarakhand.jpg',
  'himachal-pradesh': 'himachal-pradesh.jpg',
  'delhi': 'delhi.jpg',
  'uttar-pradesh': 'uttar-pradesh.jpg',
  'kerala': 'kerala.jpg',
  'tamil-nadu': 'tamil-nadu.jpg',
  'karnataka': 'karnataka.jpg',
  'andhra-pradesh': 'andhra-pradesh.jpg'
};

/**
 * Predefined mapping for top spots with exact filename matches
 * This ensures we use the correct extension and handle special cases
 */
const topSpotImageMap = {
  // Exact filename matches from assets folder
  'agra': 'Agra.jpg',
  'ahmedabad': 'ahmedabad.webp',
  'ajanta-caves': 'Ajanta Caves.jpg',
  'alleppey': 'Alleppey.jpeg',
  'araku-valley': 'Araku Valley.avif',
  'bengaluru': 'Bengaluru.jpg',
  'bodh-gaya': 'bodhgaya.avif',
  'calangute-beach': 'Calangute Beach.webp',
  'chennai': 'Chennai.webp',
  'chilika-lake': 'chilika.jpg',
  'coorg': 'Coorg.jpg',
  'darjeeling': 'darjeeling.jpg',
  'deoghar': 'Deoghar.jpg',
  'deomali': 'deomali.jpg',
  'dharamshala': 'Dharamshala.avif',
  'digha': 'digha.webp',
  'dudhsagar-falls': 'Dudhsagar Falls.jpg',
  'gir': 'Gir.jpg',
  'gokarna': 'Gokarna.png',
  'hampi': 'Hampi.jpg',
  'haridwar': 'Haridwar.jpg',
  'hundru-falls': 'Hundru Falls.jpg',
  'india-gate': 'India Gate.jpg',
  'jaipur': 'Jaipur.jpg',
  'jaisalmer': 'Jaisalmer.jpg',
  'kalimpong': 'kalimpong.jpg',
  'kochi': 'Kochi.webp',
  'kodaikanal': 'Kodaikanal.jpg',
  'kolkata': 'kolkata.jpg_cf-webp_w-450_h-240',
  'konark': 'Konark.jpg',
  'kovalam': 'Kovalam.jpg',
  'kullu': 'Kullu.avif',
  'kutch': 'Kutch.webp',
  'lonavala': 'Lonavala.webp',
  'lotus-temple': 'Lotus Temple.jpg',
  'lucknow': 'Lucknow.jpg',
  'madurai': 'Madurai.avif',
  'mahabaleshwar': 'Mahabaleshwar.jpg',
  'mahabalipuram': 'Mahabalipuram.jpg',
  'manali': 'Manali.jpg',
  'mathura': 'Mathura.jpg',
  'mount-abu': 'Mount Abu.webp',
  'mumbai': 'Mumbai.jpg',
  'munnar': 'Munnar.jpg',
  'mussoorie': 'Mussoorie.avif',
  'mysuru': 'Mysuru.jpg',
  'nainital': 'Nainital.jpg',
  'nalanda': 'nalanda.jpg',
  'nandankanan': 'nandankanan.jpg',
  'netarhat': 'Netarhat.webp',
  'old-goa': 'Old Goa.webp',
  'ooty': 'Ooty.jpg',
  'panaji': 'Panaji.jpg',
  'patna': 'patna.png',
  'prayagraj': 'Prayagraj.jpg',
  'puri': 'puri.jpg',
  'pushkar': 'Pushkar.jpg',
  'qutub-minar': 'Qutub Minar.jpg',
  'rajgir': 'Rajgir.jpg',
  'ranchi': 'Ranchi.avif',
  'red-fort': 'Red Fort.jpg',
  'rishikesh': 'Rishikesh.jpg',
  'shimla': 'Shimla.jpg',
  'shirdi': 'Shirdi.jpg',
  'somnath': 'Somnath.jpeg',
  'spiti-valley': 'Spiti Valley.avif',
  'sundarbans': 'Sundarban.jpg',
  'tirupati': 'Tirupati.jpg',
  'udaipur': 'Udaipur.avif',
  'valley-of-flowers': 'Valley of Flowers.jpg',
  'valmiki-national-park': 'Valmiki National Park.jpeg',
  'varanasi': 'Varanasi.jpg',
  'vijayawada': 'Vijayawada.jpg',
  'visakhapatnam': 'Visakhapatnam.jpg',
  'wayanad': 'Wayanad.jpg'
};

/**
 * Get state image with fallback handling
 */
export const getStateImage = (stateName) => {
  try {
    const fileName = stateName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Check if we have a predefined mapping
    const mappedFile = stateImageMap[fileName];
    if (mappedFile) {
      return new URL(`../assets/${mappedFile}`, import.meta.url).href;
    }
    
    // Fallback to standard naming
    return new URL(`../assets/${fileName}.jpg`, import.meta.url).href;
  } catch {
    console.warn(`State image not found for "${stateName}"`);
    return null;
  }
};

/**
 * Get top spot image with exact filename mapping
 */
export const getTopSpotImage = (spotName) => {
  try {
    const fileName = spotName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Check if we have a predefined mapping for exact filename
    const mappedFile = topSpotImageMap[fileName];
    if (mappedFile) {
      return new URL(`../assets/${mappedFile}`, import.meta.url).href;
    }
    
    // Fallback to standard naming with jpg extension
    return new URL(`../assets/${fileName}.jpg`, import.meta.url).href;
  } catch {
    console.warn(`Top spot image not found for "${spotName}"`);
    return null;
  }
};

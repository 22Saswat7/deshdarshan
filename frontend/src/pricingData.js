// pricingData.js - Dynamic pricing for DeshDarshan tourist spots
export const pricingData = {
  // Temple Entries
  Puri_TempleEntry: 100,
  Konark_SunTempleEntry: 150,
  
  // Chilika Lake - Free entry
  ChilikaLake_Entry: 0,
  
  // Chilika Boat Rides
  ChilikaBoat_60min: 250,         // ₹250 per person, 60-90 min
  ChilikaBoat_1hrFamily: 1300,    // Dolphin ride package ₹1300/hour (all taxes incl.)
  ChilikaBoat_210min: 2500,       // 3.5 hrs standard boat plan ₹2500 per boat
  
  // Wildlife Sanctuary - Free entry
  Nalabana_IslandEntry: 0,
  
  // Tour Packages
  OTDC_ChilikaPackage: 1899,      // One-day tour package per head ₹1899
  
  // Additional popular spots
  Bhubaneswar_CaveEntry: 50,
  Cuttack_ChandiBariEntry: 25,
  Puri_BeachActivity: 200,
  Konark_MuseumEntry: 75,
  Jagannath_Darshan: 150,
  Chilika_Dolphin_Watching: 500,
  
  // Activity packages
  Puri_FullDay_Package: 800,
  Konark_Heritage_Tour: 300,
  Chilika_Wildlife_Safari: 1200,

  // Darjeeling pricing
  Darjeeling_ToyTrain: 1500,
  Darjeeling_TigerHill_Sunrise: 200,
  Darjeeling_Tea_Garden_Tour: 500,
  Darjeeling_Monastery_Visit: 100,
  Darjeeling_Cable_Car: 300,

  // Kolkata pricing
  Kolkata_Victoria_Memorial: 30,
  Kolkata_Science_City: 200,
  Kolkata_Howrah_Bridge_Tour: 0,
  Kolkata_Dakshineswar_Temple: 0,
  Kolkata_Food_Tour: 800,

  // Bodh Gaya pricing
  BodhGaya_Mahabodhi_Temple: 0,
  BodhGaya_Monastery_Tour: 200,
  BodhGaya_Buddha_Statue: 0,
  BodhGaya_Archaeological_Museum: 25,

  // Nalanda pricing
  Nalanda_University_Ruins: 25,
  Nalanda_Museum: 10,
  Nalanda_Heritage_Tour: 300,

  // Patna pricing
  Patna_Museum: 20,
  Patna_Golghar: 15,
  Patna_Gandhi_Maidan: 0,
  Patna_City_Tour: 500,
};

// Helper function to format price in Indian Rupees
export const formatPrice = (price) => {
  if (price === 0) return "Free";
  if (price >= 1000) {
    return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}k`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

// Helper function to format detailed price
export const formatDetailedPrice = (price) => {
  if (price === 0) return "Free Entry";
  return `₹${price.toLocaleString('en-IN')}`;
};

// Helper function to get pricing info for a destination
export const getPricingInfo = (destinationName) => {
  const destination = destinationName.toLowerCase().replace(/\s+/g, '');
  const pricingInfo = {};
  
  // Look for matching pricing keys
  Object.keys(pricingData).forEach(key => {
    if (key.toLowerCase().includes(destination)) {
      pricingInfo[key] = pricingData[key];
    }
  });
  
  return pricingInfo;
};

// Pricing categories for different destinations
export const destinationPricing = {
  'puri': {
    entryFee: pricingData.Puri_TempleEntry,
    activities: [
      { name: "Temple Entry", price: pricingData.Puri_TempleEntry, unit: "per person" },
      { name: "Beach Activities", price: pricingData.Puri_BeachActivity, unit: "per person" },
      { name: "Jagannath Darshan", price: pricingData.Jagannath_Darshan, unit: "per person" },
      { name: "Full Day Package", price: pricingData.Puri_FullDay_Package, unit: "per person" }
    ]
  },
  'konark': {
    entryFee: pricingData.Konark_SunTempleEntry,
    activities: [
      { name: "Sun Temple Entry", price: pricingData.Konark_SunTempleEntry, unit: "per person" },
      { name: "Museum Entry", price: pricingData.Konark_MuseumEntry, unit: "per person" },
      { name: "Heritage Tour", price: pricingData.Konark_Heritage_Tour, unit: "per person" }
    ]
  },
  'chilika': {
    entryFee: pricingData.ChilikaLake_Entry,
    activities: [
      { name: "Lake Entry", price: pricingData.ChilikaLake_Entry, unit: "per person" },
      { name: "Boat Ride (60 min)", price: pricingData.ChilikaBoat_60min, unit: "per person" },
      { name: "Family Dolphin Package", price: pricingData.ChilikaBoat_1hrFamily, unit: "per family" },
      { name: "Extended Boat Tour (3.5 hrs)", price: pricingData.ChilikaBoat_210min, unit: "per boat" },
      { name: "OTDC Day Package", price: pricingData.OTDC_ChilikaPackage, unit: "per person" },
      { name: "Dolphin Watching", price: pricingData.Chilika_Dolphin_Watching, unit: "per person" },
      { name: "Wildlife Safari", price: pricingData.Chilika_Wildlife_Safari, unit: "per person" }
    ]
  },
  'nalabana': {
    entryFee: pricingData.Nalabana_IslandEntry,
    activities: [
      { name: "Island Entry", price: pricingData.Nalabana_IslandEntry, unit: "per person" },
      { name: "Boat Transfer", price: pricingData.ChilikaBoat_60min, unit: "per person" },
      { name: "Wildlife Safari", price: pricingData.Chilika_Wildlife_Safari, unit: "per person" }
    ]
  },
  'darjeeling': {
    entryFee: 0,
    activities: [
      { name: "Toy Train Ride", price: pricingData.Darjeeling_ToyTrain, unit: "per person" },
      { name: "Tiger Hill Sunrise", price: pricingData.Darjeeling_TigerHill_Sunrise, unit: "per person" },
      { name: "Tea Garden Tour", price: pricingData.Darjeeling_Tea_Garden_Tour, unit: "per person" },
      { name: "Monastery Visit", price: pricingData.Darjeeling_Monastery_Visit, unit: "per person" },
      { name: "Cable Car Ride", price: pricingData.Darjeeling_Cable_Car, unit: "per person" }
    ]
  },
  'kolkata': {
    entryFee: 0,
    activities: [
      { name: "Victoria Memorial", price: pricingData.Kolkata_Victoria_Memorial, unit: "per person" },
      { name: "Science City", price: pricingData.Kolkata_Science_City, unit: "per person" },
      { name: "Howrah Bridge Tour", price: pricingData.Kolkata_Howrah_Bridge_Tour, unit: "per person" },
      { name: "Dakshineswar Temple", price: pricingData.Kolkata_Dakshineswar_Temple, unit: "per person" },
      { name: "Food Tour", price: pricingData.Kolkata_Food_Tour, unit: "per person" }
    ]
  },
  'bodhGaya': {
    entryFee: 0,
    activities: [
      { name: "Mahabodhi Temple", price: pricingData.BodhGaya_Mahabodhi_Temple, unit: "per person" },
      { name: "Monastery Tour", price: pricingData.BodhGaya_Monastery_Tour, unit: "per person" },
      { name: "Buddha Statue Visit", price: pricingData.BodhGaya_Buddha_Statue, unit: "per person" },
      { name: "Archaeological Museum", price: pricingData.BodhGaya_Archaeological_Museum, unit: "per person" }
    ]
  },
  'nalanda': {
    entryFee: pricingData.Nalanda_University_Ruins,
    activities: [
      { name: "University Ruins", price: pricingData.Nalanda_University_Ruins, unit: "per person" },
      { name: "Museum Entry", price: pricingData.Nalanda_Museum, unit: "per person" },
      { name: "Heritage Tour", price: pricingData.Nalanda_Heritage_Tour, unit: "per person" }
    ]
  },
  'patna': {
    entryFee: 0,
    activities: [
      { name: "Patna Museum", price: pricingData.Patna_Museum, unit: "per person" },
      { name: "Golghar Visit", price: pricingData.Patna_Golghar, unit: "per person" },
      { name: "Gandhi Maidan", price: pricingData.Patna_Gandhi_Maidan, unit: "per person" },
      { name: "City Tour", price: pricingData.Patna_City_Tour, unit: "per person" }
    ]
  }
};

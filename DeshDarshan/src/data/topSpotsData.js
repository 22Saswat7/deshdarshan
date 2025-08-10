const pricingData = require('./pricingData');

const topSpotsData = [
  {
    name: 'Puri Temple',
    price: pricingData.Puri_TempleEntry,
    description: 'A famous temple known for its architecture and religious significance.'
  },
  {
    name: 'Konark Sun Temple',
    price: pricingData.Konark_SunTempleEntry,
    description: 'A UNESCO World Heritage Site, renowned for its stunning carvings.'
  },
  {
    name: 'Chilika Lake',
    price: pricingData.ChilikaLake_Entry,
    description: 'A beautiful brackish water lagoon, perfect for bird watching.'
  },
  {
    name: 'Chilika Boat Ride (60 min)',
    price: pricingData.ChilikaBoat_60min,
    description: 'Enjoy a scenic boat ride in Chilika Lake for about 60 minutes.'
  },
  {
    name: 'Chilika Boat Ride (1 hr Family)',
    price: pricingData.ChilikaBoat_1hrFamily,
    description: 'A family package for a dolphin ride in Chilika Lake.'
  },
  {
    name: 'Chilika Boat Ride (210 min)',
    price: pricingData.ChilikaBoat_210min,
    description: 'A standard boat plan for 3.5 hours in Chilika Lake.'
  },
  {
    name: 'Nalabana Island',
    price: pricingData.Nalabana_IslandEntry,
    description: 'A wildlife sanctuary island, known for its rich biodiversity.'
  },
  {
    name: 'OTDC Chilika Package',
    price: pricingData.OTDC_ChilikaPackage,
    description: 'A one-day tour package that includes various activities.'
  }
];

module.exports = topSpotsData;
function getDynamicPricing(touristSpot) {
    const basePrice = pricingData[touristSpot];
    const demandFactor = calculateDemandFactor(touristSpot);
    const dynamicPrice = basePrice * demandFactor;

    return formatPrice(dynamicPrice);
}

function calculateDemandFactor(touristSpot) {
    // Placeholder for demand calculation logic
    // This could be based on factors like seasonality, events, etc.
    const currentDemand = Math.random() * (1.5 - 0.5) + 0.5; // Random factor between 0.5 and 1.5
    return currentDemand;
}

function formatPrice(price) {
    return `₹${price.toFixed(2)}`;
}

function getPricingInfo(touristSpots) {
    return touristSpots.map(spot => ({
        name: spot,
        price: getDynamicPricing(spot)
    }));
}

export { getDynamicPricing, getPricingInfo };
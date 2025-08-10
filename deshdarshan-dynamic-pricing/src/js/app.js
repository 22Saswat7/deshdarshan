// This file is the main entry point for the JavaScript application.
// It initializes the application, sets up event listeners, and integrates the pricing engine with the UI components.

import { pricingData } from './pricingData.js';
import { calculateDynamicPricing } from './pricingEngine.js';
import PriceDisplay from '../components/PriceDisplay.js';
import TouristSpotCard from '../components/TouristSpotCard.js';
import PricingControls from '../components/PricingControls.js';

const app = () => {
    const touristSpotsContainer = document.getElementById('tourist-spots');
    const pricingControlsContainer = document.getElementById('pricing-controls');

    const renderTouristSpots = () => {
        touristSpotsContainer.innerHTML = '';
        for (const spot in pricingData) {
            const spotData = pricingData[spot];
            const dynamicPrice = calculateDynamicPricing(spotData.basePrice);
            const touristSpotCard = new TouristSpotCard(spotData.name, spotData.description, dynamicPrice);
            touristSpotsContainer.appendChild(touristSpotCard.render());
        }
    };

    const setupEventListeners = () => {
        const pricingControls = new PricingControls();
        pricingControls.onChange(renderTouristSpots);
        pricingControlsContainer.appendChild(pricingControls.render());
    };

    const init = () => {
        renderTouristSpots();
        setupEventListeners();
    };

    init();
};

document.addEventListener('DOMContentLoaded', app);
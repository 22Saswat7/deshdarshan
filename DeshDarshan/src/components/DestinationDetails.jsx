import React from 'react';
import { useParams } from 'react-router-dom';
import pricingData from '../data/pricingData';
import topSpotsData from '../data/topSpotsData';

const DestinationDetails = () => {
    const { spotId } = useParams();
    const spotDetails = topSpotsData.find(spot => spot.id === spotId);

    if (!spotDetails) {
        return <div>Spot not found</div>;
    }

    const { name, description } = spotDetails;
    const entryFee = pricingData[`${name.replace(/\s+/g, '_')}Entry`] || 'Free';
    const boatRidePrice = pricingData[`${name.replace(/\s+/g, '_')}Boat_60min`] || 'N/A';
    const packagePrice = pricingData[`${name.replace(/\s+/g, '_')}Package`] || 'N/A';

    return (
        <div className="destination-details">
            <h1>{name}</h1>
            <p>{description}</p>
            <div className="pricing-info">
                <p>Entry Fee: ₹{entryFee}</p>
                <p>Boat Ride: ₹{boatRidePrice} per person</p>
                <p>Package: ₹{packagePrice} per person</p>
            </div>
        </div>
    );
};

export default DestinationDetails;
import React from 'react';
import PriceDisplay from './PriceDisplay';

const TouristSpotCard = ({ spot }) => {
    return (
        <div className="tourist-spot-card">
            <h2>{spot.name}</h2>
            <p>{spot.description}</p>
            <PriceDisplay price={spot.price} />
        </div>
    );
};

export default TouristSpotCard;
import React from 'react';

const PriceDisplay = ({ price }) => {
    return (
        <div className="price-display">
            <h2>Price: {price}</h2>
        </div>
    );
};

export default PriceDisplay;
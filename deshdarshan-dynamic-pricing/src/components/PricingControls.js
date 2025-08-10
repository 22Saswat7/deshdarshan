import React, { useState } from 'react';

const PricingControls = ({ onPricingChange }) => {
    const [selectedPackage, setSelectedPackage] = useState('');

    const handlePackageChange = (event) => {
        const newPackage = event.target.value;
        setSelectedPackage(newPackage);
        onPricingChange(newPackage);
    };

    return (
        <div className="pricing-controls">
            <h2>Select Pricing Package</h2>
            <select value={selectedPackage} onChange={handlePackageChange}>
                <option value="">--Select a Package--</option>
                <option value="standard">Standard Package</option>
                <option value="premium">Premium Package</option>
                <option value="family">Family Package</option>
            </select>
        </div>
    );
};

export default PricingControls;
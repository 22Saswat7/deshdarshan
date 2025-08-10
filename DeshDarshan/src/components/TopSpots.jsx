import React from 'react';
import topSpotsData from '../data/topSpotsData';

const TopSpots = () => {
    return (
        <div>
            <h1>Top Tourist Spots</h1>
            <ul>
                {topSpotsData.map((spot) => (
                    <li key={spot.name}>
                        <h2>{spot.name}</h2>
                        <p>Entry Fee: ₹{spot.price.entry}</p>
                        <p>Boat Ride: ₹{spot.price.boatRide} per person</p>
                        {spot.price.package && <p>Package: ₹{spot.price.package} per person</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopSpots;
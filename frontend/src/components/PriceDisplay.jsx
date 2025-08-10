// PriceDisplay.jsx - Reusable component for displaying pricing information
import React from 'react';
import { formatPrice, formatDetailedPrice } from '../pricingData';

const PriceDisplay = ({ pricing, compact = false, className = "" }) => {
  if (!pricing) return null;

  const { entryFee, activities = [] } = pricing;

  if (compact) {
    return (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        <span className="text-green-600 font-semibold">
          From {formatPrice(entryFee)}
        </span>
        {activities.length > 1 && (
          <span className="text-gray-500 text-xs">+ activities</span>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">💰</span>
        Pricing Information
      </h3>
      
      {/* Entry Fee */}
      <div className="mb-4 p-3 bg-white rounded-lg border border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Entry Fee:</span>
          <span className="text-xl font-bold text-green-600">
            {formatDetailedPrice(entryFee)}
            {entryFee > 0 && <span className="text-sm font-normal text-gray-500 ml-1">per person</span>}
          </span>
        </div>
      </div>

      {/* Activities */}
      {activities.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700 border-b border-gray-200 pb-2 mb-3">
            Additional Activities:
          </h4>
          <div className="grid gap-2">
            {activities.map((activity, index) => (
              <div key={index} className="flex justify-between items-center py-2 px-3 bg-white rounded-md border border-gray-100 hover:border-blue-200 transition-colors">
                <span className="text-gray-600 text-sm font-medium">{activity.name}:</span>
                <div className="text-right">
                  <span className="font-semibold text-blue-600">
                    {formatDetailedPrice(activity.price)}
                  </span>
                  <span className="text-xs font-normal text-gray-500 ml-1 block">
                    {activity.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special offers indicator */}
      {entryFee === 0 && (
        <div className="mt-4 bg-green-100 text-green-800 px-3 py-2 rounded-md text-sm font-medium flex items-center">
          <span className="mr-2">🎉</span>
          Free Entry!
        </div>
      )}

      {/* Best value indicator */}
      {activities.some(activity => activity.name.includes('Package')) && (
        <div className="mt-3 bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm font-medium flex items-center">
          <span className="mr-2">⭐</span>
          Package deals available for better value!
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;

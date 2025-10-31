import React from 'react';

const Stats = ({ providerCount = 0, categoryCount = 0, customerCount = 0, satisfaction = '98%' }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
    <div className="text-center">
      <div className="text-3xl font-bold text-purple-700">{providerCount.toLocaleString()}+</div>
      <div className="text-gray-700">Service Providers</div>
    </div>
    <div className="text-center">
      <div className="text-3xl font-bold text-purple-700">{categoryCount}+</div>
      <div className="text-gray-700">Categories</div>
    </div>
    <div className="text-center">
      <div className="text-3xl font-bold text-purple-700">{customerCount.toLocaleString()}+</div>
      <div className="text-gray-700">Customers</div>
    </div>
    <div className="text-center">
      <div className="text-3xl font-bold text-purple-700">{satisfaction}</div>
      <div className="text-gray-700">Satisfaction</div>
    </div>
  </div>
);

export default Stats; 
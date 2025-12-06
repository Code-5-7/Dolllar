import React from 'react';

interface CardProps {
  title: string;
  description: string;
  price: number;
  tier: 'basic' | 'pro' | 'premium';
  features: string[];
  onEnroll: () => void;
}

export const PricingCard: React.FC<CardProps> = ({
  title,
  description,
  price,
  tier,
  features,
  onEnroll,
}) => {
  const tierColors = {
    basic: 'border-blue-500 bg-blue-50',
    pro: 'border-purple-500 bg-purple-50',
    premium: 'border-pink-500 bg-pink-50',
  };

  return (
    <div className={`border-2 ${tierColors[tier]} rounded-lg p-6 shadow-lg`}>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-primary">${price}</span>
        <span className="text-gray-600 ml-2">/month</span>
      </div>
      <ul className="mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onEnroll}
        className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-secondary transition-colors"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default PricingCard;

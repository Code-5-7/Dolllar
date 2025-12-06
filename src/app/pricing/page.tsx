'use client';

import React from 'react';
import PricingCard from '@/components/PricingCard';

export default function PricingPage() {
  const handleEnroll = (tier: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/auth/login';
      return;
    }

    // Implement payment processing
    alert(`Enrolling in ${tier} tier - Payment processing would happen here`);
  };

  const plans = [
    {
      title: 'Basic',
      description: 'Perfect for beginners',
      price: 300,
      tier: 'basic' as const,
      features: [
        'Access to 5 beginner courses',
        'Community support',
        'Basic writing gigs',
        '1 month access',
      ],
    },
    {
      title: 'Pro',
      description: 'For serious writers',
      price: 500,
      tier: 'pro' as const,
      features: [
        'Access to 15 intermediate courses',
        'Priority support',
        'Premium writing gigs',
        '3 months access',
        'Monthly coaching',
      ],
    },
    {
      title: 'Premium',
      description: 'Ultimate writing package',
      price: 1000,
      tier: 'premium' as const,
      features: [
        'Access to all courses',
        'VIP support',
        'High-paying exclusive gigs',
        '12 months access',
        'Weekly 1-on-1 coaching',
        'Portfolio review',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Choose the plan that best fits your writing journey
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.tier}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              tier={plan.tier}
              features={plan.features}
              onEnroll={() => handleEnroll(plan.tier)}
            />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I upgrade my tier?',
                a: 'Yes, you can upgrade anytime. You will only pay the difference.',
              },
              {
                q: 'Is there a refund policy?',
                a: 'We offer a 7-day money-back guarantee if you are not satisfied.',
              },
              {
                q: 'Do I get lifetime access?',
                a: 'Your tier includes access for the specified period. Renewal is optional.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

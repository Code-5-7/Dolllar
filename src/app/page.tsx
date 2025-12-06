import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Your Writing Career Starts Here
          </h1>
          <p className="text-xl mb-8 text-gray-100">
            Learn from expert instructors, complete writing gigs, and build your portfolio
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/courses"
              className="bg-white text-primary px-8 py-3 rounded font-semibold hover:bg-gray-100 transition"
            >
              Explore Courses
            </Link>
            <Link
              href="/gigs"
              className="border-2 border-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-primary transition"
            >
              Find Gigs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose WriteGigs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border-l-4 border-primary">
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from published authors and industry experts</p>
            </div>
            <div className="p-6 border-l-4 border-secondary">
              <h3 className="text-xl font-bold mb-2">Real Gigs</h3>
              <p className="text-gray-600">Get paid for your writing with verified clients</p>
            </div>
            <div className="p-6 border-l-4 border-accent">
              <h3 className="text-xl font-bold mb-2">Flexible Learning</h3>
              <p className="text-gray-600">Study at your own pace with lifetime access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { tier: 'BASIC', price: 300, color: 'bg-blue-500' },
              { tier: 'PRO', price: 500, color: 'bg-purple-500' },
              { tier: 'PREMIUM', price: 1000, color: 'bg-pink-500' },
            ].map((plan) => (
              <div key={plan.tier} className={`${plan.color} text-white p-8 rounded-lg shadow-lg`}>
                <h3 className="text-2xl font-bold mb-4">{plan.tier}</h3>
                <div className="text-4xl font-bold mb-4">${plan.price}</div>
                <p className="mb-6 opacity-90">Unlock premium features and gigs</p>
                <Link
                  href="/pricing"
                  className="block text-center bg-white text-gray-800 py-2 rounded font-semibold hover:bg-gray-100 transition"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Writing Journey?</h2>
          <p className="mb-8 text-lg">Join thousands of writers making money online</p>
          <Link
            href="/auth/register"
            className="inline-block bg-white text-primary px-8 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}

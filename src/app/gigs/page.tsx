'use client';

import React, { useState, useEffect } from 'react';

interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  requiredTier: string;
  status: string;
}

export default function GigsPage() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const response = await fetch('/api/gigs/open/available');
      const data = await response.json();
      setGigs(data);
    } catch (error) {
      console.error('Failed to fetch gigs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (gigId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/auth/login';
      return;
    }

    try {
      await fetch(`/api/gigs/${gigId}/assign`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Applied successfully!');
      fetchGigs();
    } catch (error) {
      console.error('Failed to apply:', error);
      alert('Failed to apply for gig');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Writing Gigs</h1>
        <p className="text-gray-600 mb-12">
          Find and apply for writing projects from verified clients
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading gigs...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {gigs.length > 0 ? (
              gigs.map((gig) => (
                <div
                  key={gig._id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{gig.title}</h2>
                      <p className="text-gray-600 mt-2">{gig.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">${gig.budget}</p>
                      <p className="text-sm text-gray-600">Tier: {gig.requiredTier}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApply(gig._id)}
                    className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
                  >
                    Apply Now
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600">No gigs available at the moment</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

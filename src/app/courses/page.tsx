'use client';

import React, { useState, useEffect } from 'react';
import PricingCard from '@/components/PricingCard';

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  tier: 'basic' | 'pro' | 'premium';
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/auth/login';
      return;
    }

    try {
      await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });
      alert('Enrolled successfully!');
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert('Enrollment failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Writing Courses</h1>
        <p className="text-gray-600 mb-12">
          Explore our comprehensive writing courses taught by industry experts
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading courses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.map((course) => (
                <PricingCard
                  key={course._id}
                  title={course.title}
                  description={course.description}
                  price={course.price}
                  tier={course.tier}
                  features={[
                    'Video lessons',
                    'Live feedback',
                    'Certificate on completion',
                    '24/7 support',
                  ]}
                  onEnroll={() => handleEnroll(course._id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">No courses available yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

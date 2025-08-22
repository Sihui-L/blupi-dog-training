import React, { useState } from 'react';

interface WorkshopOption {
  id: string;
  title: string;
  price: string;
  description: string;
  duration: string;
  upcomingDates: string[];
  maxParticipants: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
}

const Workshop: React.FC = () => {
  const [expandedWorkshop, setExpandedWorkshop] = useState<string | null>(null);
  const [, setSelectedWorkshop] = useState<string | null>(null);

  const workshopOptions: WorkshopOption[] = [
    {
      id: 'puppy-foundation',
      title: 'PUPPY FOUNDATION WORKSHOP | £45',
      price: '£45',
      description: 'Comprehensive workshop covering essential puppy training fundamentals, socialization techniques, and setting your puppy up for success.',
      duration: '3 hours',
      upcomingDates: ['March 15, 2024', 'March 29, 2024', 'April 12, 2024'],
      maxParticipants: 6,
      level: 'Beginner',
    },
    {
      id: 'reactive-dog',
      title: 'REACTIVE DOG MANAGEMENT | £65',
      price: '£65',
      description: 'Specialized workshop for owners dealing with reactive behaviors. Learn management techniques and counter-conditioning methods.',
      duration: '4 hours',
      upcomingDates: ['March 22, 2024', 'April 5, 2024', 'April 19, 2024'],
      maxParticipants: 4,
      level: 'Intermediate',
    },
    {
      id: 'recall-training',
      title: 'PERFECT RECALL WORKSHOP | £35',
      price: '£35',
      description: 'Master the art of reliable recall training. Perfect for dogs who struggle with coming when called or for owners wanting to improve off-leash reliability.',
      duration: '2.5 hours',
      upcomingDates: ['March 18, 2024', 'April 1, 2024', 'April 15, 2024'],
      maxParticipants: 8,
      level: 'All Levels',
    },
    {
      id: 'separation-anxiety',
      title: 'SEPARATION ANXIETY SOLUTIONS | £55',
      price: '£55',
      description: 'Learn to help your dog overcome separation anxiety with proven techniques and gradual conditioning methods.',
      duration: '3.5 hours',
      upcomingDates: ['March 25, 2024', 'April 8, 2024', 'April 22, 2024'],
      maxParticipants: 5,
      level: 'Intermediate',
    },
    {
      id: 'agility-intro',
      title: 'INTRODUCTION TO AGILITY | £40',
      price: '£40',
      description: 'Fun introduction to dog agility with basic equipment and foundational movements. Great for bonding and mental stimulation.',
      duration: '2 hours',
      upcomingDates: ['March 20, 2024', 'April 3, 2024', 'April 17, 2024'],
      maxParticipants: 6,
      level: 'Beginner',
    },
    {
      id: 'advanced-tricks',
      title: 'ADVANCED TRICK TRAINING | £50',
      price: '£50',
      description: 'Take your dog\'s trick repertoire to the next level with complex behaviors and impressive party tricks that showcase intelligence.',
      duration: '3 hours',
      upcomingDates: ['March 27, 2024', 'April 10, 2024', 'April 24, 2024'],
      maxParticipants: 6,
      level: 'Advanced',
    },
  ];

  const toggleExpanded = (workshopId: string) => {
    setExpandedWorkshop(expandedWorkshop === workshopId ? null : workshopId);
  };

  const selectWorkshop = (workshopId: string) => {
    setSelectedWorkshop(workshopId);
    // In a real app, this would redirect to booking form or open booking modal
    alert(`Selected: ${workshopOptions.find(w => w.id === workshopId)?.title}\n\nBooking functionality would be implemented here with calendar integration.`);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Workshop</h1>
        
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Don't let minor concerns escalate into expensive issues. We're here for your pet as much as you need us 
          to be, so your best friends can live their longest, healthiest lives.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Who are workshops for?</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Perfect for:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Owners wanting intensive, focused learning</li>
                  <li>• Dogs with specific training challenges</li>
                  <li>• Those seeking specialized knowledge</li>
                  <li>• Groups wanting to tackle particular topics</li>
                  <li>• Anyone looking for advanced techniques</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Workshop Benefits:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Intensive, focused training sessions</li>
                  <li>• Small class sizes for personalized attention</li>
                  <li>• Specialized topic expertise</li>
                  <li>• Take-home materials and resources</li>
                  <li>• Networking with like-minded owners</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Workshop Options */}
        <div className="space-y-4">
          {workshopOptions.map((workshop) => (
            <div key={workshop.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-800">
                        {workshop.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(workshop.level)}`}>
                        {workshop.level}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpanded(workshop.id)}
                    className="text-primary hover:text-opacity-80 transition-colors flex-shrink-0"
                  >
                    <svg
                      className={`w-6 h-6 transition-transform ${
                        expandedWorkshop === workshop.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {expandedWorkshop === workshop.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                        <p className="text-gray-600 text-sm mb-4">{workshop.description}</p>
                        
                        <h4 className="font-semibold text-gray-800 mb-2">Duration</h4>
                        <p className="text-gray-600 text-sm mb-4">{workshop.duration}</p>

                        <h4 className="font-semibold text-gray-800 mb-2">Level</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(workshop.level)}`}>
                          {workshop.level}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Upcoming Dates</h4>
                        <ul className="space-y-1 mb-4">
                          {workshop.upcomingDates.map((date, index) => (
                            <li key={index} className="text-gray-600 text-sm">• {date}</li>
                          ))}
                        </ul>
                        
                        <h4 className="font-semibold text-gray-800 mb-2">Class Size</h4>
                        <p className="text-gray-600 text-sm">Max {workshop.maxParticipants} participants</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t border-gray-100">
                      <div className="text-2xl font-bold text-primary">
                        {workshop.price}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => selectWorkshop(workshop.id)}
                          className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
                        >
                          Book Workshop
                        </button>
                        <button className="border border-primary text-primary px-6 py-2 rounded-md font-semibold hover:bg-primary hover:text-white transition-colors">
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Workshop Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">What's Included:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Intensive hands-on training</li>
                <li>• Printed handouts and resources</li>
                <li>• Practice exercises and homework</li>
                <li>• Q&A session with expert trainer</li>
                <li>• Light refreshments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Workshop Policies:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Early bird discounts available</li>
                <li>• 48-hour cancellation policy</li>
                <li>• Certificate of completion provided</li>
                <li>• Follow-up email support included</li>
                <li>• Group discounts for 3+ registrations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-primary text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="mb-6">
              Can't find the perfect workshop? Contact us to discuss custom workshops tailored to your specific needs.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Contact Us for Custom Workshops
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
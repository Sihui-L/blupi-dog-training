import React, { useState } from 'react';

interface ClassOption {
  id: string;
  title: string;
  price: string;
  description: string;
  duration: string;
  schedule: string[];
  maxParticipants: number;
}

const GroupClass: React.FC = () => {
  const [expandedClass, setExpandedClass] = useState<string | null>(null);
  const [, setSelectedClass] = useState<string | null>(null);

  const classOptions: ClassOption[] = [
    {
      id: 'behaviour-consultation',
      title: 'BEHAVIOUR CONSULTATION | £15 | FOLLOW UP: £9',
      price: '£15',
      description: 'Initial consultation to assess your dog\'s behavioral needs and create a customized training plan.',
      duration: '60 minutes',
      schedule: ['Monday 10:00 AM', 'Wednesday 2:00 PM', 'Friday 10:00 AM'],
      maxParticipants: 3,
    },
    {
      id: 'foundation-training',
      title: 'TRAINING or FOUNDATION PUPPY TRAINING | £110: FOLLOW UP: £15',
      price: '£110',
      description: 'Comprehensive foundation training covering basic commands, socialization, and good manners.',
      duration: '90 minutes',
      schedule: ['Tuesday 11:00 AM', 'Thursday 10:00 AM', 'Saturday 9:00 AM'],
      maxParticipants: 4,
    },
    {
      id: 'training-walk',
      title: 'TRAINING WALK | £30/HR',
      price: '£30/hr',
      description: 'Practical training session focusing on leash manners, recall, and real-world obedience.',
      duration: '60 minutes',
      schedule: ['Daily 8:00 AM', 'Daily 4:00 PM'],
      maxParticipants: 3,
    },
    {
      id: 'pre-ownership',
      title: 'PRE-OWNERSHIP CONSULTATIONS | £35',
      price: '£35',
      description: 'Essential guidance for prospective dog owners covering breed selection, preparation, and training basics.',
      duration: '45 minutes',
      schedule: ['By appointment'],
      maxParticipants: 2,
    },
    {
      id: 'behaviour-evaluation',
      title: 'BEHAVIOUR EVALUATION | £110 - FOLLOW UP: £30',
      price: '£110',
      description: 'Comprehensive behavioral assessment for dogs with complex issues requiring detailed evaluation.',
      duration: '120 minutes',
      schedule: ['Monday 1:00 PM', 'Wednesday 1:00 PM'],
      maxParticipants: 2,
    },
    {
      id: 'online-course',
      title: 'ONLINE PUPPY | FULL FOUNDATION COURSE | £165: EXTRA 30MIN CALLS | £60/HR',
      price: '£165',
      description: 'Complete online foundation course with live video sessions and comprehensive training materials.',
      duration: '4 weeks program',
      schedule: ['Flexible online scheduling'],
      maxParticipants: 6,
    },
  ];

  const toggleExpanded = (classId: string) => {
    setExpandedClass(expandedClass === classId ? null : classId);
  };

  const selectClass = (classId: string) => {
    setSelectedClass(classId);
    // In a real app, this would redirect to booking form or open booking modal
    alert(`Selected: ${classOptions.find(c => c.id === classId)?.title}\n\nBooking functionality would be implemented here with calendar integration.`);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Group Class</h1>
        
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Don't let minor concerns escalate into expensive issues. We're here for your pet as much as you need us 
          to be, so your best friends can live their longest, healthiest lives.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Who is this class for?</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Perfect for:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Dogs that benefit from social learning</li>
                  <li>• Owners wanting community support</li>
                  <li>• Well-socialized dogs</li>
                  <li>• Dogs needing group interaction skills</li>
                  <li>• Budget-conscious training options</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Class Benefits:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Socialization opportunities</li>
                  <li>• Cost-effective training</li>
                  <li>• Peer learning environment</li>
                  <li>• Regular scheduled sessions</li>
                  <li>• Community support network</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Class Options */}
        <div className="space-y-4">
          {classOptions.map((classOption) => (
            <div key={classOption.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800 flex-1 pr-4">
                    {classOption.title}
                  </h3>
                  <button
                    onClick={() => toggleExpanded(classOption.id)}
                    className="text-primary hover:text-opacity-80 transition-colors"
                  >
                    <svg
                      className={`w-6 h-6 transition-transform ${
                        expandedClass === classOption.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {expandedClass === classOption.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                        <p className="text-gray-600 text-sm mb-4">{classOption.description}</p>
                        
                        <h4 className="font-semibold text-gray-800 mb-2">Duration</h4>
                        <p className="text-gray-600 text-sm">{classOption.duration}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Available Times</h4>
                        <ul className="space-y-1 mb-4">
                          {classOption.schedule.map((time, index) => (
                            <li key={index} className="text-gray-600 text-sm">• {time}</li>
                          ))}
                        </ul>
                        
                        <h4 className="font-semibold text-gray-800 mb-2">Max Participants</h4>
                        <p className="text-gray-600 text-sm">{classOption.maxParticipants} dogs per class</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t border-gray-100">
                      <div className="text-2xl font-bold text-primary">
                        {classOption.price}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => selectClass(classOption.id)}
                          className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
                        >
                          Book Now
                        </button>
                        <button className="border border-primary text-primary px-6 py-2 rounded-md font-semibold hover:bg-primary hover:text-white transition-colors">
                          Learn More
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
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Group Class Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">What to Bring:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Your dog's favorite treats</li>
                <li>• A standard leash (no retractable leashes)</li>
                <li>• Water bowl and water</li>
                <li>• Vaccination certificates</li>
                <li>• Positive attitude!</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Class Policies:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• All dogs must be up-to-date on vaccinations</li>
                <li>• 24-hour cancellation policy</li>
                <li>• Make-up classes available</li>
                <li>• Payment due at time of booking</li>
                <li>• Refund policy available upon request</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupClass;
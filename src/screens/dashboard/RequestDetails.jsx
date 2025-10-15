import { useState } from 'react';
import { 
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

export default function RequestDetails() {
  const [status, setStatus] = useState('Pending');
  
  const requestData = {
    id: 1,
    devotee: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@gmail.com',
      address: '123, MG Road, Sector 15, Lucknow',
      qualification: 'Post Graduate',
      occupation: 'Software Engineer'
    },
    guidanceType: 'Career Guidance',
    status: 'Pending',
    requestedOn: '2025-10-12 10:30 AM',
    message: 'I am currently working as a software engineer with 5 years of experience. I am considering a career switch to data science and would like guidance on how to make this transition. Should I pursue additional certifications or take up a masters degree? What are the job prospects and salary expectations in this field?'
  };

  const handleAccept = () => {
    setStatus('Accepted');
    alert('Request accepted! Chat initiated with devotee.');
  };

  const handleReject = () => {
    setStatus('Rejected');
    alert('Request rejected successfully.');
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button className="flex items-center text-primary hover:text-primaryHover mb-4">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Requests
        </button>

        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-textDark">Request Details</h1>
              <p className="text-sm text-textLight mt-1">Request ID: #{requestData.id}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                status === 'Accepted' ? 'bg-green text-white' :
                status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                status === 'Rejected' ? 'bg-red text-white' :
                'bg-blue text-white'
              }`}>
                {status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Devotee Details */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold text-textDark mb-4 flex items-center">
                <UserCircleIcon className="h-6 w-6 mr-2 text-primary" />
                Devotee Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                    <UserCircleIcon className="h-12 w-12 text-textMuted" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-textDark">{requestData.devotee.name}</p>
                    <p className="text-sm text-textLight">{requestData.devotee.occupation}</p>
                  </div>
                </div>

                <div className="border-t border-gray200 pt-4 space-y-3">
                  <div className="flex items-start">
                    <PhoneIcon className="h-5 w-5 text-textMuted mr-3 mt-0.5" />
                    <div>
                      <p className="text-xs text-textLight">Phone</p>
                      <p className="text-sm text-textDark">{requestData.devotee.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <EnvelopeIcon className="h-5 w-5 text-textMuted mr-3 mt-0.5" />
                    <div>
                      <p className="text-xs text-textLight">Email</p>
                      <p className="text-sm text-textDark">{requestData.devotee.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-textMuted mr-3 mt-0.5" />
                    <div>
                      <p className="text-xs text-textLight">Address</p>
                      <p className="text-sm text-textDark">{requestData.devotee.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualification Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-md font-semibold text-textDark mb-3">Additional Details</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-textLight">Qualification</p>
                  <p className="text-sm text-textDark">{requestData.devotee.qualification}</p>
                </div>
                <div>
                  <p className="text-xs text-textLight">Current Occupation</p>
                  <p className="text-sm text-textDark">{requestData.devotee.occupation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Request Details */}
          <div className="lg:col-span-2">
            {/* Request Information */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold text-textDark mb-4">Request Information</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-textLight">Guidance Type</p>
                    <p className="text-base font-medium text-textDark mt-1">{requestData.guidanceType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-textLight">Requested On</p>
                    <p className="text-base font-medium text-textDark mt-1">{requestData.requestedOn}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-textLight mb-2">Message from Devotee</p>
                  <div className="bg-secondary rounded-lg p-4">
                    <p className="text-sm text-textDark leading-relaxed">{requestData.message}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {status === 'Pending' && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-bold text-textDark mb-4">Take Action</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAccept}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-green hover:bg-green text-white rounded-md font-medium"
                  >
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Accept Request
                  </button>
                  <button
                    onClick={handleReject}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-red hover:bg-red text-white rounded-md font-medium"
                  >
                    <XCircleIcon className="h-5 w-5 mr-2" />
                    Reject Request
                  </button>
                </div>
              </div>
            )}

            {status === 'Accepted' && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-bold text-textDark mb-4">Chat Options</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 px-6 py-3 bg-primary hover:bg-primaryHover text-white rounded-md font-medium">
                    Open Chat
                  </button>
                  <button className="flex-1 px-6 py-3 bg-green hover:bg-green text-white rounded-md font-medium">
                    Continue on WhatsApp
                  </button>
                </div>
              </div>
            )}

            {status === 'Rejected' && (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="text-center py-4">
                  <XCircleIcon className="h-12 w-12 text-red mx-auto mb-2" />
                  <p className="text-lg font-medium text-textDark">Request Rejected</p>
                  <p className="text-sm text-textLight mt-1">This request has been rejected and closed.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
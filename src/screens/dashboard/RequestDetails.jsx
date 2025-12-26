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
      <div className="max-w-5xl mx-auto px-3 sm:px-5 lg:px-6 py-4">
        {/* Back Button */}
        <button className="flex items-center text-primary hover:text-primaryHover mb-3 text-xs">
          <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
          Back to Requests
        </button>

        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-lg font-bold text-textDark">Request Details</h1>
              <p className="text-2xs text-textLight mt-0.5">Request ID: #{requestData.id}</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Devotee Details */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-4 mb-4">
              <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
                <UserCircleIcon className="h-5 w-5 mr-1.5 text-primary" />
                Devotee Information
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                    <UserCircleIcon className="h-8 w-8 text-textMuted" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm text-textDark">{requestData.devotee.name}</p>
                    <p className="text-xs text-textLight">{requestData.devotee.occupation}</p>
                  </div>
                </div>

                <div className="border-t border-gray200 pt-3 space-y-2">
                  <div className="flex items-start">
                    <PhoneIcon className="h-4 w-4 text-textMuted mr-2 mt-0.5" />
                    <div>
                      <p className="text-2xs text-textLight">Phone</p>
                      <p className="text-xs text-textDark">{requestData.devotee.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <EnvelopeIcon className="h-4 w-4 text-textMuted mr-2 mt-0.5" />
                    <div>
                      <p className="text-2xs text-textLight">Email</p>
                      <p className="text-xs text-textDark">{requestData.devotee.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 text-textMuted mr-2 mt-0.5" />
                    <div>
                      <p className="text-2xs text-textLight">Address</p>
                      <p className="text-xs text-textDark">{requestData.devotee.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualification Card */}
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-sm font-semibold text-textDark mb-2">Additional Details</h3>
              <div className="space-y-1.5">
                <div>
                  <p className="text-2xs text-textLight">Qualification</p>
                  <p className="text-xs text-textDark">{requestData.devotee.qualification}</p>
                </div>
                <div>
                  <p className="text-2xs text-textLight">Current Occupation</p>
                  <p className="text-xs text-textDark">{requestData.devotee.occupation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Request Details */}
          <div className="lg:col-span-2">
            {/* Request Information */}
            <div className="bg-white shadow rounded-lg p-4 mb-4">
              <h2 className="text-base font-bold text-textDark mb-3">Request Information</h2>
              
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-textLight">Guidance Type</p>
                    <p className="text-sm font-medium text-textDark mt-0.5">{requestData.guidanceType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-textLight">Requested On</p>
                    <p className="text-sm font-medium text-textDark mt-0.5">{requestData.requestedOn}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-textLight mb-1.5">Message from Devotee</p>
                  <div className="bg-secondary rounded-lg p-3">
                    <p className="text-xs text-textDark leading-relaxed">{requestData.message}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {status === 'Pending' && (
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-base font-bold text-textDark mb-3">Take Action</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAccept}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-green hover:bg-green text-white rounded-md font-medium text-sm"
                  >
                    <CheckCircleIcon className="h-4 w-4 mr-1.5" />
                    Accept Request
                  </button>
                  <button
                    onClick={handleReject}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-red hover:bg-red text-white rounded-md font-medium text-sm"
                  >
                    <XCircleIcon className="h-4 w-4 mr-1.5" />
                    Reject Request
                  </button>
                </div>
              </div>
            )}

            {status === 'Accepted' && (
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-base font-bold text-textDark mb-3">Chat Options</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-md font-medium text-sm">
                    Open Chat
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green hover:bg-green text-white rounded-md font-medium text-sm">
                    Continue on WhatsApp
                  </button>
                </div>
              </div>
            )}

            {status === 'Rejected' && (
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-center py-3">
                  <XCircleIcon className="h-8 w-8 text-red mx-auto mb-1.5" />
                  <p className="text-sm font-medium text-textDark">Request Rejected</p>
                  <p className="text-xs text-textLight mt-0.5">This request has been rejected and closed.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { 
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  PencilSquareIcon,
  BuildingLibraryIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@iskcon.org',
    address: '123, MG Road, Sector 15',
    pincode: '226001',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    country: 'India',
    qualification: 'Post Graduate',
    maritalStatus: 'Married',
    yearsMarried: '5',
    numberOfChildren: '1',
    occupationType: 'Job',
    jobType: 'Software Engineer',
    businessType: '',
    currentQualificationOccupation: 'MBA in Finance, Working as Senior Software Engineer at Tech Corp',
    // ISKCON Guidance Information
    iskconName: 'ISKCON KANPUR',
    president: 'Prem Harinam Prabhu',
    counsellor: 'Dinanath Gopal Prabhu',
    // Guidance Preferences
    careerGuidance: true,
    financeGuidance: true,
    babyCareGuidance: false,
    healthGuidance: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-primary to-primaryHover"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-white bg-secondary flex items-center justify-center">
                <UserCircleIcon className="h-20 w-20 sm:h-28 sm:w-28 text-textMuted" />
              </div>
              <div className="mt-4 sm:mt-0 lg:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-textDark">{formData.name}</h1>
                <p className="text-textLight">Admin • ISKCON Community</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.careerGuidance && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Career Guidance
                    </span>
                  )}
                  {formData.financeGuidance && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Finance Guidance
                    </span>
                  )}
                  {formData.babyCareGuidance && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      Baby Care Guidance
                    </span>
                  )}
                  {formData.healthGuidance && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Health Guidance
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryHover"
                >
                  <PencilSquareIcon className="h-5 w-5 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ISKCON Guidance Information */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
              <BuildingLibraryIcon className="h-6 w-6 mr-2 text-primary" />
              ISKCON Guidance Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">ISKCON Center Name</label>
                <input
                  type="text"
                  name="iskconName"
                  value={formData.iskconName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">President</label>
                <input
                  type="text"
                  name="president"
                  value={formData.president}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-textLabel mb-1">Counsellor</label>
                <input
                  type="text"
                  name="counsellor"
                  value={formData.counsellor}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
            </div>
            
            {/* Guidance Preferences */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-textDark mb-3 flex items-center">
                <UserGroupIcon className="h-5 w-5 mr-2 text-primary" />
                Guidance Preferences
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="careerGuidance"
                    checked={formData.careerGuidance}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray300 rounded"
                  />
                  <span className="text-sm font-medium text-textDark">Career Guidance</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="financeGuidance"
                    checked={formData.financeGuidance}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray300 rounded"
                  />
                  <span className="text-sm font-medium text-textDark">Finance Guidance</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="babyCareGuidance"
                    checked={formData.babyCareGuidance}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray300 rounded"
                  />
                  <span className="text-sm font-medium text-textDark">Baby Care Guidance</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="healthGuidance"
                    checked={formData.healthGuidance}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray300 rounded"
                  />
                  <span className="text-sm font-medium text-textDark">Health Guidance</span>
                </label>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
              <UserCircleIcon className="h-6 w-6 mr-2 text-primary" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">Qualification</label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                >
                  <option>High School</option>
                  <option>Graduate</option>
                  <option>Post Graduate</option>
                  <option>Doctorate</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
              <MapPinIcon className="h-6 w-6 mr-2 text-primary" />
              Address Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-textLabel mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="2"
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                >
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                >
                  <option>Uttar Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Delhi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                >
                  <option>Lucknow</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Delhi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Marital & Family Information */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
              <HeartIcon className="h-6 w-6 mr-2 text-primary" />
              Marital & Family Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">Marital Status</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                >
                  <option>Single</option>
                  <option>Married</option>
                </select>
              </div>
              {formData.maritalStatus === 'Married' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-textLabel mb-1">Years Married</label>
                    <input
                      type="number"
                      name="yearsMarried"
                      value={formData.yearsMarried}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textLabel mb-1">Number of Children (Optional)</label>
                    <input
                      type="number"
                      name="numberOfChildren"
                      value={formData.numberOfChildren}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Occupation Information */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
              <BriefcaseIcon className="h-6 w-6 mr-2 text-primary" />
              Occupation Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">Occupation Type</label>
                <select
                  name="occupationType"
                  value={formData.occupationType}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                >
                  <option>Job</option>
                  <option>Business</option>
                </select>
              </div>
              {formData.occupationType === 'Job' && (
                <div>
                  <label className="block text-sm font-medium text-textLabel mb-1">Job Type</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                  >
                    <option>Software Engineer</option>
                    <option>Teacher</option>
                    <option>Doctor</option>
                    <option>Manager</option>
                    <option>Other</option>
                  </select>
                </div>
              )}
              {formData.occupationType === 'Business' && (
                <div>
                  <label className="block text-sm font-medium text-textLabel mb-1">Business Type</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                  >
                    <option>Retail</option>
                    <option>Manufacturing</option>
                    <option>Services</option>
                    <option>IT/Technology</option>
                    <option>Other</option>
                  </select>
                </div>
              )}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-textLabel mb-1">Current Qualification & Occupation</label>
                <textarea
                  name="currentQualificationOccupation"
                  value={formData.currentQualificationOccupation}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="3"
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-gray200 rounded-md text-textDark hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
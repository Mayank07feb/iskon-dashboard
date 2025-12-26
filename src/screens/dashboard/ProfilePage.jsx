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
      <div className="max-w-4xl mx-auto px-3 sm:px-5 lg:px-6 py-4">
        {/* Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-4">
          <div className="h-24 bg-gradient-to-r from-primary to-primaryHover"></div>
          <div className="px-4 pb-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-8">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-white bg-secondary flex items-center justify-center">
                <UserCircleIcon className="h-12 w-12 sm:h-16 sm:w-16 text-textMuted" />
              </div>
              <div className="mt-2 sm:mt-0 lg:mt-0 sm:ml-4 text-center sm:text-left flex-1">
                <h1 className="text-lg font-bold text-textDark">{formData.name}</h1>
                <p className="text-2xs text-textLight">Admin • ISKCON Community</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {formData.careerGuidance && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-2xs font-medium bg-blue-100 text-blue-800">
                      Career Guidance
                    </span>
                  )}
                  {formData.financeGuidance && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-2xs font-medium bg-green-100 text-green-800">
                      Finance Guidance
                    </span>
                  )}
                  {formData.babyCareGuidance && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-2xs font-medium bg-pink-100 text-pink-800">
                      Baby Care Guidance
                    </span>
                  )}
                  {formData.healthGuidance && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-2xs font-medium bg-red-100 text-red-800">
                      Health Guidance
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2 sm:mt-0">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-primary hover:bg-primaryHover"
                >
                  <PencilSquareIcon className="h-4 w-4 mr-1.5" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ISKCON Guidance Information */}
          <div className="bg-white shadow rounded-lg p-3 mb-4">
            <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
              <BuildingLibraryIcon className="h-5 w-5 mr-1.5 text-primary" />
              ISKCON Guidance Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">ISKCON Center Name</label>
                <input
                  type="text"
                  name="iskconName"
                  value={formData.iskconName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">President</label>
                <input
                  type="text"
                  name="president"
                  value={formData.president}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-textLabel mb-1">Counsellor</label>
                <input
                  type="text"
                  name="counsellor"
                  value={formData.counsellor}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
            </div>
            
            {/* Guidance Preferences */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-textDark mb-2 flex items-center">
                <UserGroupIcon className="h-4 w-4 mr-1.5 text-primary" />
                Guidance Preferences
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="careerGuidance"
                    checked={formData.careerGuidance}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="h-3.5 w-3.5 text-primary focus:ring-primary border-gray300 rounded"
                  />
                  <span className="text-xs font-medium text-textDark">Career Guidance</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="financeGuidance"
                    checked={formData.financeGuidance}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="h-3.5 w-3.5 text-primary focus:ring-primary border-gray300 rounded"
                  />
                  <span className="text-xs font-medium text-textDark">Finance Guidance</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="babyCareGuidance"
                    checked={formData.babyCareGuidance}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="h-3.5 w-3.5 text-primary focus:ring-primary border-gray300 rounded"
                  />
                  <span className="text-xs font-medium text-textDark">Baby Care Guidance</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="healthGuidance"
                    checked={formData.healthGuidance}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="h-3.5 w-3.5 text-primary focus:ring-primary border-gray300 rounded"
                  />
                  <span className="text-xs font-medium text-textDark">Health Guidance</span>
                </label>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white shadow rounded-lg p-3 mb-4">
            <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
              <UserCircleIcon className="h-5 w-5 mr-1.5 text-primary" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">Qualification</label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
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
          <div className="bg-white shadow rounded-lg p-3 mb-4">
            <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
              <MapPinIcon className="h-5 w-5 mr-1.5 text-primary" />
              Address Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-textLabel mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="2"
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                >
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                >
                  <option>Uttar Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Delhi</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
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
          <div className="bg-white shadow rounded-lg p-3 mb-4">
            <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
              <HeartIcon className="h-5 w-5 mr-1.5 text-primary" />
              Marital & Family Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">Marital Status</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                >
                  <option>Single</option>
                  <option>Married</option>
                </select>
              </div>
              {formData.maritalStatus === 'Married' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-textLabel mb-1">Years Married</label>
                    <input
                      type="number"
                      name="yearsMarried"
                      value={formData.yearsMarried}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-textLabel mb-1">Number of Children (Optional)</label>
                    <input
                      type="number"
                      name="numberOfChildren"
                      value={formData.numberOfChildren}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Occupation Information */}
          <div className="bg-white shadow rounded-lg p-3 mb-4">
            <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
              <BriefcaseIcon className="h-5 w-5 mr-1.5 text-primary" />
              Occupation Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">Occupation Type</label>
                <select
                  name="occupationType"
                  value={formData.occupationType}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                >
                  <option>Job</option>
                  <option>Business</option>
                </select>
              </div>
              {formData.occupationType === 'Job' && (
                <div>
                  <label className="block text-xs font-medium text-textLabel mb-1">Job Type</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
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
                  <label className="block text-xs font-medium text-textLabel mb-1">Business Type</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
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
                <label className="block text-xs font-medium text-textLabel mb-1">Current Qualification & Occupation</label>
                <textarea
                  name="currentQualificationOccupation"
                  value={formData.currentQualificationOccupation}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="3"
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 border border-gray200 rounded-md text-textDark hover:bg-secondary text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-primary hover:bg-primaryHover text-white rounded-md text-sm"
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
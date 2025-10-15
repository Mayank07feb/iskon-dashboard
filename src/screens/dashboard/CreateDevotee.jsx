import { useState } from 'react';
import { 
  UserPlusIcon,
  LinkIcon,
  ClipboardDocumentIcon,
  DocumentArrowUpIcon
} from "@heroicons/react/24/outline";

export default function CreateDevotee() {
  const [signupLink, setSignupLink] = useState('');
  const [showLink, setShowLink] = useState(false);
  const [bulkImportData, setBulkImportData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    state: '',
    city: '',
    country: 'India',
    qualification: '',
    maritalStatus: 'Single',
    occupationType: 'Job'
  });

  const generateSignupLink = () => {
    const link = `https://iskcon-app.com/signup/devotee/${Math.random().toString(36).substring(7)}`;
    setSignupLink(link);
    setShowLink(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(signupLink);
    alert('Link copied to clipboard!');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert('Devotee account created successfully! Signup link sent to their phone.');
  };

  const handleBulkImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert('Bulk import feature: CSV file processing...');
    }
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-textDark">Create Devotee Account</h1>
          <p className="mt-1 text-sm text-textLight">Add new devotees to the ISKCON community</p>
        </div>

        {/* Generate Signup Link */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
            <LinkIcon className="h-6 w-6 mr-2 text-primary" />
            Generate Signup Link
          </h2>
          <p className="text-sm text-textLight mb-4">
            Generate a unique signup link to share with the new devotee. They can use this link to complete their registration.
          </p>
          <button
            onClick={generateSignupLink}
            className="w-full sm:w-auto px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-md font-medium"
          >
            Generate Link
          </button>

          {showLink && (
            <div className="mt-4 p-4 bg-secondary rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <p className="text-sm text-textLabel mb-1">Signup Link:</p>
                  <p className="text-sm text-textDark break-all">{signupLink}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 p-2 text-primary hover:text-primaryHover"
                  title="Copy to clipboard"
                >
                  <ClipboardDocumentIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Import */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
            <DocumentArrowUpIcon className="h-6 w-6 mr-2 text-primary" />
            Bulk Import Devotees
          </h2>
          <p className="text-sm text-textLight mb-4">
            Import multiple devotees at once using a CSV file. Each devotee will receive a signup link on their phone number.
          </p>
          <div className="border-2 border-dashed border-gray200 rounded-lg p-8 text-center">
            <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-textMuted" />
            <p className="mt-2 text-sm text-textLight">Upload CSV file with Name and Phone Number</p>
            <label className="mt-4 inline-flex items-center px-6 py-2 bg-secondary hover:bg-secondaryHover text-textDark rounded-md font-medium cursor-pointer">
              <input
                type="file"
                accept=".csv"
                onChange={handleBulkImport}
                className="hidden"
              />
              Choose File
            </label>
          </div>
        </div>

        {/* Manual Devotee Creation */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
            <UserPlusIcon className="h-6 w-6 mr-2 text-primary" />
            Add Devotee Manually
          </h2>

          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-textDark mb-3">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textLabel mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textLabel mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <p className="mt-1 text-xs text-textMuted">Signup link will be sent to this number</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-textLabel mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="devotee@example.com"
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textLabel mb-1">Qualification</label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Qualification</option>
                    <option>High School</option>
                    <option>Graduate</option>
                    <option>Post Graduate</option>
                    <option>Doctorate</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-semibold text-textDark mb-3">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-textLabel mb-1">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    rows="2"
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textLabel mb-1">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
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
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select State</option>
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
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select City</option>
                    <option>Lucknow</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                    <option>Delhi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-textLabel mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold text-textDark mb-3">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textLabel mb-1">Marital Status</label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Single</option>
                    <option>Married</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-textLabel mb-1">Occupation Type</label>
                  <select
                    name="occupationType"
                    value={formData.occupationType}
                    onChange={handleChange}
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Job</option>
                    <option>Business</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 sm:flex-none px-8 py-2 bg-primary hover:bg-primaryHover text-white rounded-md font-medium"
              >
                Add Devotee
              </button>
              <button
                type="button"
                className="flex-1 sm:flex-none px-8 py-2 border border-gray200 rounded-md text-textDark hover:bg-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
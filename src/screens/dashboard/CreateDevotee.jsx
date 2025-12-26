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
      <div className="max-w-4xl mx-auto px-3 sm:px-5 lg:px-6 py-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-lg font-bold text-textDark">Create Devotee Account</h1>
          <p className="mt-0.5 text-2xs text-textLight">Add new devotees to the ISKCON community</p>
        </div>

        {/* Generate Signup Link */}
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
            <LinkIcon className="h-5 w-5 mr-1.5 text-primary" />
            Generate Signup Link
          </h2>
          <p className="text-xs text-textLight mb-3">
            Generate a unique signup link to share with the new devotee. They can use this link to complete their registration.
          </p>
          <button
            onClick={generateSignupLink}
            className="w-full sm:w-auto px-4 py-1.5 bg-primary hover:bg-primaryHover text-white rounded-md font-medium text-sm"
          >
            Generate Link
          </button>

          {showLink && (
            <div className="mt-3 p-3 bg-secondary rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-3">
                  <p className="text-xs text-textLabel mb-0.5">Signup Link:</p>
                  <p className="text-xs text-textDark break-all">{signupLink}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 p-1.5 text-primary hover:text-primaryHover"
                  title="Copy to clipboard"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Import */}
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
            <DocumentArrowUpIcon className="h-5 w-5 mr-1.5 text-primary" />
            Bulk Import Devotees
          </h2>
          <p className="text-xs text-textLight mb-3">
            Import multiple devotees at once using a CSV file. Each devotee will receive a signup link on their phone number.
          </p>
          <div className="border-2 border-dashed border-gray200 rounded-lg p-6 text-center">
            <DocumentArrowUpIcon className="mx-auto h-10 w-10 text-textMuted" />
            <p className="mt-2 text-xs text-textLight">Upload CSV file with Name and Phone Number</p>
            <label className="mt-3 inline-flex items-center px-4 py-1.5 bg-secondary hover:bg-secondaryHover text-textDark rounded-md font-medium text-sm cursor-pointer">
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
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
            <UserPlusIcon className="h-5 w-5 mr-1.5 text-primary" />
            Add Devotee Manually
          </h2>

          <div className="space-y-4">
            {/* Basic Information */}
            <div>
              <h3 className="text-sm font-semibold text-textDark mb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-textLabel mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-textLabel mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    required
                  />
                  <p className="mt-0.5 text-2xs text-textMuted">Signup link will be sent to this number</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-textLabel mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="devotee@example.com"
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-textLabel mb-1">Qualification</label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
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
              <h3 className="text-sm font-semibold text-textDark mb-2">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-textLabel mb-1">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    rows="2"
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-textLabel mb-1">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
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
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  >
                    <option value="">Select State</option>
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
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  >
                    <option value="">Select City</option>
                    <option>Lucknow</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                    <option>Delhi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-textLabel mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-sm font-semibold text-textDark mb-2">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-textLabel mb-1">Marital Status</label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  >
                    <option>Single</option>
                    <option>Married</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-textLabel mb-1">Occupation Type</label>
                  <select
                    name="occupationType"
                    value={formData.occupationType}
                    onChange={handleChange}
                    className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  >
                    <option>Job</option>
                    <option>Business</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                onClick={handleSubmit}
                className="flex-1 sm:flex-none px-6 py-1.5 bg-primary hover:bg-primaryHover text-white rounded-md font-medium text-sm"
              >
                Add Devotee
              </button>
              <button
                type="button"
                className="flex-1 sm:flex-none px-6 py-1.5 border border-gray200 rounded-md text-textDark hover:bg-secondary text-sm"
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
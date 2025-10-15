import { useState } from 'react';
import { 
  UserPlusIcon,
  LinkIcon,
  ClipboardDocumentIcon
} from "@heroicons/react/24/outline";

export default function CreateAdmin() {
  const [signupLink, setSignupLink] = useState('');
  const [showLink, setShowLink] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    state: '',
    city: '',
    country: 'India'
  });

  const generateSignupLink = () => {
    const link = `https://iskcon-app.com/signup/admin/${Math.random().toString(36).substring(7)}`;
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
    alert('Admin account created successfully!');
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-textDark">Create Admin Account</h1>
          <p className="mt-1 text-sm text-textLight">Add a new admin to the ISKCON community</p>
        </div>

        {/* Generate Signup Link */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
            <LinkIcon className="h-6 w-6 mr-2 text-primary" />
            Generate Signup Link
          </h2>
          <p className="text-sm text-textLight mb-4">
            Generate a unique signup link to share with the new admin. They can use this link to complete their registration.
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

        {/* Manual Admin Creation */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
            <UserPlusIcon className="h-6 w-6 mr-2 text-primary" />
            Create Admin Manually
          </h2>

          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-textDark mb-3">Personal Information</h3>
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
                </div>
                <div>
                  <label className="block text-sm font-medium text-textLabel mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@iskcon.org"
                    className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 sm:flex-none px-8 py-2 bg-primary hover:bg-primaryHover text-white rounded-md font-medium"
              >
                Create Admin
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
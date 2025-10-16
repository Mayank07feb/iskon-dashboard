import { useState } from "react";
import {
  Cog6ToothIcon,
  BellIcon,
  MoonIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    name: "Rajesh Kumar",
    email: "rajesh@iskcon.org",
    phone: "+91 98765 43210",
    receiveEmail: true,
    receiveSMS: false,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
          <div className="px-6 pb-6 -mt-12 flex flex-col sm:flex-row items-center sm:items-end">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-secondary flex items-center justify-center">
              <Cog6ToothIcon className="h-14 w-14 text-textMuted" />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-textDark">
                Settings
              </h1>
              <p className="text-textLight">Manage your account preferences</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryHover"
              >
                {isEditing ? "Cancel" : "Edit Settings"}
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Account Settings */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
              <UserCircleIcon className="h-6 w-6 mr-2 text-primary" />
              Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textLabel mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-2 px-3 focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
              <BellIcon className="h-6 w-6 mr-2 text-primary" />
              Notification Preferences
            </h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="receiveEmail"
                  checked={settings.receiveEmail}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray300 rounded"
                />
                <span className="text-sm text-textDark">
                  Receive Email Notifications
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="receiveSMS"
                  checked={settings.receiveSMS}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray300 rounded"
                />
                <span className="text-sm text-textDark">
                  Receive SMS Notifications
                </span>
              </label>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-textDark mb-4 flex items-center">
              <MoonIcon className="h-6 w-6 mr-2 text-primary" />
              Theme Preferences
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-textDark">
                Enable Dark Mode
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primaryHover transition-colors"></div>
                <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></span>
              </label>
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

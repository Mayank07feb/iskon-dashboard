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
      <div className="max-w-4xl mx-auto px-3 sm:px-5 lg:px-6 py-4">
        {/* Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-4">
          <div className="h-24 bg-gradient-to-r from-primary to-primaryHover"></div>
          <div className="px-4 pb-4 -mt-8 flex flex-col sm:flex-row items-center sm:items-end">
            <div className="h-16 w-16 rounded-full border-2 border-white bg-secondary flex items-center justify-center">
              <Cog6ToothIcon className="h-10 w-10 text-textMuted" />
            </div>
            <div className="mt-2 sm:mt-0 sm:ml-4 text-center sm:text-left flex-1">
              <h1 className="text-lg font-bold text-textDark">
                Settings
              </h1>
              <p className="text-2xs text-textLight">Manage your account preferences</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-primary hover:bg-primaryHover"
              >
                {isEditing ? "Cancel" : "Edit Settings"}
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Account Settings */}
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
              <UserCircleIcon className="h-5 w-5 mr-1.5 text-primary" />
              Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textLabel mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-secondary disabled:text-textMuted text-sm"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
              <BellIcon className="h-5 w-5 mr-1.5 text-primary" />
              Notification Preferences
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="receiveEmail"
                  checked={settings.receiveEmail}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-3.5 w-3.5 text-primary focus:ring-primary border-gray300 rounded"
                />
                <span className="text-xs text-textDark">
                  Receive Email Notifications
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="receiveSMS"
                  checked={settings.receiveSMS}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-3.5 w-3.5 text-primary focus:ring-primary border-gray300 rounded"
                />
                <span className="text-xs text-textDark">
                  Receive SMS Notifications
                </span>
              </label>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="text-base font-bold text-textDark mb-3 flex items-center">
              <MoonIcon className="h-5 w-5 mr-1.5 text-primary" />
              Theme Preferences
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-textDark">
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
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primaryHover transition-colors"></div>
                <span className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-all peer-checked:translate-x-4"></span>
              </label>
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
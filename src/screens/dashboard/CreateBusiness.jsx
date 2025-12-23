import React, { useState } from "react";
import {
  BuildingStorefrontIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  TagIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const BUSINESS_CATEGORIES = [
  "Technology & IT",
  "Healthcare & Medical",
  "Restaurants & Food",
  "Retail & Shopping",
  "Education & Training",
  "Real Estate",
  "Automotive",
  "Beauty & Wellness",
  "Professional Services",
  "Entertainment",
  "Sports & Fitness",
  "Home Services",
  "Travel & Tourism",
  "Finance & Banking",
  "Manufacturing",
];

export default function CreateBusiness() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    phone: "",
    email: "",
    website: "",
    description: "",
  });

  const [businessPhoto, setBusinessPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setBusinessPhoto(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setBusinessPhoto(null);
    setPhotoPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.location ||
      !formData.phone
    ) {
      alert(
        "Please fill all required fields (Name, Category, Location, Phone)."
      );
      return;
    }

    console.log("Create Business Data:", formData);
    console.log("Business Photo:", businessPhoto);
    // API call here

    setShowSuccessModal(true);

    setFormData({
      name: "",
      category: "",
      location: "",
      phone: "",
      email: "",
      website: "",
      description: "",
    });
    setBusinessPhoto(null);
    setPhotoPreview(null);

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <Link
            to="/businesses"
            className="flex items-center gap-2 text-primary font-semibold mb-4 hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Businesses
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <BuildingStorefrontIcon className="w-6 h-6 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-textDark">
              Add Business
            </h1>
          </div>
          <p className="text-sm text-textLight">
            Register your business listing
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                <BuildingStorefrontIcon className="w-5 h-5 text-primary" />
                Business Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. Tech Solutions Ltd"
              />
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                <TagIcon className="w-5 h-5 text-primary" />
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">Select category</option>
                {BUSINESS_CATEGORIES.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Business Photo */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-textDark mb-2">
                <PhotoIcon className="w-5 h-5 text-primary" />
                Business Photo (Optional)
              </label>
              
              {!photoPreview ? (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray200 rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors"
                  >
                    <PhotoIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-textLight mb-1">
                      Click to upload business photo
                    </span>
                    <span className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 5MB
                    </span>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Business preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                <MapPinIcon className="w-5 h-5 text-primary" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. Gomti Nagar, Lucknow"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                  <PhoneIcon className="w-5 h-5 text-primary" />
                  Phone *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. +91 9876543210"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                  <EnvelopeIcon className="w-5 h-5 text-primary" />
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. info@business.com"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                <GlobeAltIcon className="w-5 h-5 text-primary" />
                Website (Optional)
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. www.business.com"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                <DocumentTextIcon className="w-5 h-5 text-primary" />
                Business Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none resize-y"
                placeholder="Describe your business, services, products..."
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primaryHover w-full sm:w-auto"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Add Business
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-11/12 text-center shadow-2xl">
            <CheckCircleIcon className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-textDark mb-2">
              Business Added Successfully! 🎉
            </h3>
            <p className="text-textLight text-sm">
              Your business is now listed
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
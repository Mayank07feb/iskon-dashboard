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

    console.log("Create Shop/Business Data:", formData);
    console.log("Shop/Business Photo:", businessPhoto);
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
      <div className="max-w-4xl mx-auto px-3 sm:px-5 lg:px-6 py-4 space-y-4">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4">
          <Link
            to="/businesses"
            className="flex items-center gap-1.5 text-primary font-semibold mb-3 hover:underline text-sm"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            Back to Shops and Business
          </Link>

          <div className="flex items-center gap-2 mb-1.5">
            <BuildingStorefrontIcon className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-textDark">
              Add Shop/Business
            </h1>
          </div>
          <p className="text-2xs text-textLight">
            Register your shop/business listing
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Business Name */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                <BuildingStorefrontIcon className="w-4 h-4 text-primary" />
                Shop/Business Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                placeholder="e.g. Tech Solutions Ltd"
              />
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                <TagIcon className="w-4 h-4 text-primary" />
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
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
              <label className="flex items-center gap-1.5 text-xs font-medium text-textDark mb-1.5">
                <PhotoIcon className="w-4 h-4 text-primary" />
                Shop/Business Photo (Optional)
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
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray200 rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors"
                  >
                    <PhotoIcon className="w-10 h-10 text-gray-400 mb-1.5" />
                    <span className="text-xs text-textLight mb-1">
                      Click to upload shop/business photo
                    </span>
                    <span className="text-2xs text-gray-400">
                      PNG, JPG, GIF up to 5MB
                    </span>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Shop/Business preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                <MapPinIcon className="w-4 h-4 text-primary" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                placeholder="e.g. Gomti Nagar, Lucknow"
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                  <PhoneIcon className="w-4 h-4 text-primary" />
                  Phone *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  placeholder="e.g. +91 9876543210"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                  <EnvelopeIcon className="w-4 h-4 text-primary" />
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  placeholder="e.g. info@business.com"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                <GlobeAltIcon className="w-4 h-4 text-primary" />
                Website (Optional)
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                placeholder="e.g. www.business.com"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                <DocumentTextIcon className="w-4 h-4 text-primary" />
                Shop/Business Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none resize-y text-sm"
                placeholder="Describe your shop/business, services, products..."
              />
            </div>

            {/* Submit */}
            <div className="pt-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-white font-medium hover:bg-primaryHover w-full sm:w-auto text-sm"
              >
                <CheckCircleIcon className="w-4 h-4" />
                Add Shop/Business
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-11/12 text-center shadow-lg">
            <CheckCircleIcon className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="text-base font-bold text-textDark mb-1.5">
              Shop/Business Added Successfully! 🎉
            </h3>
            <p className="text-textLight text-xs">
              Your shop/business is now listed
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
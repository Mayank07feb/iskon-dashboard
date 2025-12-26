import React, { useState } from "react";
import {
  BuildingStorefrontIcon,
  MapPinIcon,
  PhoneIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  StarIcon,
  CheckCircleIcon,
  CheckBadgeIcon,
  PhotoIcon,
  TagIcon,
  EyeIcon,
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

export default function MyBusiness() {
  const [myBusinesses, setMyBusinesses] = useState([
    {
      id: 1,
      name: "Tech Solutions Ltd",
      category: "Technology & IT",
      location: "Gomti Nagar, Lucknow",
      phone: "+91 9876543210",
      email: "info@techsolutions.com",
      website: "www.techsolutions.com",
      description:
        "Leading IT solutions provider offering software development and digital marketing.",
      isVerified: true,
      rating: 4.5,
      reviewCount: 125,
      photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
      tags: ['Web Development', 'Mobile Apps', 'Digital Marketing'],
    },
    {
      id: 2,
      name: "Green Valley Cafe",
      category: "Restaurants & Food",
      location: "Hazratganj, Lucknow",
      phone: "+91 9876543211",
      email: "contact@greenvalley.com",
      description:
        "Cozy cafe serving organic food, fresh coffee, and healthy meals.",
      isVerified: true,
      rating: 5,
      reviewCount: 89,
      photo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop",
      tags: ['Vegetarian', 'Organic', 'Coffee'],
    },
  ]);

  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setForm({ ...form, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setForm({ ...form, photo: null });
  };

  const openAddModal = () => {
    setEditingBusiness(null);
    setForm({
      name: "",
      category: "",
      location: "",
      phone: "",
      email: "",
      website: "",
      description: "",
      photo: null,
    });
    setPhotoPreview(null);
    setShowBusinessModal(true);
  };

  const openEditModal = (business) => {
    setEditingBusiness(business);
    setForm({
      name: business.name,
      category: business.category,
      location: business.location,
      phone: business.phone,
      email: business.email,
      website: business.website || "",
      description: business.description,
      photo: business.photo || null,
    });
    setPhotoPreview(business.photo || null);
    setShowBusinessModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.location || !form.phone) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingBusiness) {
      // Update existing shop/business
      setMyBusinesses(
        myBusinesses.map((business) =>
          business.id === editingBusiness.id ? { ...business, ...form } : business
        )
      );
      alert("Shop/Business updated successfully!");
    } else {
      // Add new shop/business
      const newBusiness = {
        id: Date.now(),
        ...form,
        isVerified: false,
        rating: 0,
        reviewCount: 0,
        tags: ['Service', 'Quality'],
      };
      setMyBusinesses([newBusiness, ...myBusinesses]);
      alert("Shop/Business added successfully!");
    }

    setShowBusinessModal(false);
    setPhotoPreview(null);
  };

  const confirmDelete = (business) => {
    setBusinessToDelete(business);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    setMyBusinesses(
      myBusinesses.filter((business) => business.id !== businessToDelete.id)
    );
    setShowDeleteConfirm(false);
    setBusinessToDelete(null);
    alert("Shop/Business deleted successfully!");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon
          key={`full-${i}`}
          className="w-3 h-3 fill-yellow-400 text-yellow-400"
        />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarIcon
          key="half"
          className="w-3 h-3 fill-yellow-400 text-yellow-400"
        />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="w-3 h-3 text-yellow-400" />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-4">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-textDark">My Shops and Business</h1>
            <p className="text-2xs text-textLight mt-0.5">
              Manage your shop and business listings
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center justify-center gap-1.5 self-start sm:self-auto text-xs"
          >
            <PlusIcon className="w-3.5 h-3.5" />
            Add Shop/Business
          </button>
        </div>

        {/* Businesses List */}
        {myBusinesses.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <BuildingStorefrontIcon className="w-8 h-8 text-textLight mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-textDark mb-1">
              No shops or businesses yet
            </h3>
            <p className="text-2xs text-textLight mb-3">
              Start by adding your first shop or business
            </p>
            <button
              onClick={openAddModal}
              className="bg-primary text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-primaryHover transition text-xs"
            >
              Add a Shop/Business
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {myBusinesses.map((business) => (
              <div
                key={business.id}
                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-100"
              >
                {/* Business Photo with Overlay */}
                <div className="relative h-40 overflow-hidden">
                  {business.photo ? (
                    <img
                      src={business.photo}
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <BuildingStorefrontIcon className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Rating Overlay */}
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded flex items-center gap-1">
                    {renderStars(business.rating)}
                    <span className="text-xs font-semibold">{business.rating}</span>
                  </div>

                  {/* Verified Badge */}
                  {business.isVerified && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-2xs font-semibold flex items-center gap-1 shadow">
                      <CheckBadgeIcon className="w-2.5 h-2.5" />
                      Verified
                    </div>
                  )}
                </div>

                {/* Business Info */}
                <div className="p-3">
                  <div className="mb-3">
                    <h3 className="text-base font-bold text-gray-900 mb-0.5">
                      {business.name}
                    </h3>
                    <p className="text-2xs text-gray-600 mb-2">
                      {business.category}
                    </p>

                    <div className="flex flex-wrap gap-2 text-2xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-3 h-3 text-gray-500" />
                        <span className="truncate max-w-[180px]">{business.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <PhoneIcon className="w-3 h-3 text-gray-500" />
                        <span>{business.phone}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {business.tags && business.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {business.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons - 3 buttons in one row */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    {/* View Details Button */}
                    <Link
                      to={`/business-details`}
                      state={{ business }}
                      className="flex-1 bg-primary hover:bg-primaryHover text-white px-3 py-1.5 rounded-lg font-semibold transition flex items-center justify-center gap-1 text-2xs"
                    >
                      <EyeIcon className="w-3 h-3" />
                      View
                    </Link>

                    {/* Edit Button */}
                    <button
                      onClick={() => openEditModal(business)}
                      className="flex-1 bg-blue hover:bg-blue text-white px-3 py-1.5 rounded-lg font-semibold transition flex items-center justify-center gap-1 text-2xs"
                    >
                      <PencilIcon className="w-3 h-3" />
                      Edit
                    </button>

                    {/* Offers Button */}
                    <Link
                      to={`/offers`}
                      state={{ 
                        businessId: business.id, 
                        businessName: business.name 
                      }}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg font-semibold transition flex items-center justify-center gap-1 text-2xs"
                    >
                      <TagIcon className="w-3 h-3" />
                      Offers
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => confirmDelete(business)}
                      className="flex-1 bg-red hover:bg-red text-white px-3 py-1.5 rounded-lg font-semibold transition flex items-center justify-center gap-1 text-2xs"
                    >
                      <TrashIcon className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Business Modal */}
      {showBusinessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  {editingBusiness ? "Edit Shop/Business" : "Add New Shop/Business"}
                </h2>
                <p className="text-2xs text-gray-600">
                  {editingBusiness
                    ? "Update shop/business details"
                    : "Fill in shop/business information"}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowBusinessModal(false);
                  setPhotoPreview(null);
                }}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Shop/Business Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition text-sm"
                  placeholder="e.g. Tech Solutions Ltd"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition text-sm"
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
                <label className="flex items-center gap-1 text-xs font-semibold text-gray-900 mb-1">
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
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors group"
                    >
                      <PhotoIcon className="w-8 h-8 text-gray-400 mb-1 group-hover:text-primary transition-colors" />
                      <span className="text-xs text-gray-600 mb-0.5 group-hover:text-gray-900 transition-colors">
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

              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition text-sm"
                  placeholder="e.g. Gomti Nagar, Lucknow"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Phone *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition text-sm"
                  placeholder="e.g. +91 9876543210"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition text-sm"
                  placeholder="e.g. info@business.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition text-sm"
                  placeholder="e.g. www.business.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition resize-y text-sm"
                  placeholder="Describe your shop/business..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primaryHover text-white px-4 py-2.5 rounded-lg font-semibold transition flex items-center justify-center gap-1.5 shadow-sm text-sm"
              >
                <CheckCircleIcon className="w-4 h-4" />
                {editingBusiness ? "Update Shop/Business" : "Add Shop/Business"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-lg p-4 max-w-md w-full text-center">
            <div className="bg-red-100 rounded-full p-2 inline-block mb-3">
              <TrashIcon className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Delete Shop/Business?
            </h3>
            <p className="text-2xs text-gray-600 mb-4">
              Are you sure you want to delete "
              <span className="font-semibold">{businessToDelete?.name}</span>"?
              This action cannot be undone.
            </p>

            <div className="space-y-1.5">
              <button
                onClick={handleDelete}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
              >
                Delete Shop/Business
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
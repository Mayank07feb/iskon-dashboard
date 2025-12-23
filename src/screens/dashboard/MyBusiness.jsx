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
} from "@heroicons/react/24/outline";

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
    },
  ]);

  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    phone: "",
    email: "",
    website: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
    });
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
    });
    setShowBusinessModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.location || !form.phone) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingBusiness) {
      // Update existing business
      setMyBusinesses(
        myBusinesses.map((business) =>
          business.id === editingBusiness.id ? { ...business, ...form } : business
        )
      );
      alert("Business updated successfully!");
    } else {
      // Add new business
      const newBusiness = {
        id: Date.now(),
        ...form,
        isVerified: false,
        rating: 0,
        reviewCount: 0,
      };
      setMyBusinesses([newBusiness, ...myBusinesses]);
      alert("Business added successfully!");
    }

    setShowBusinessModal(false);
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
    alert("Business deleted successfully!");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarIcon
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-5 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-textDark">My Businesses</h1>
            <p className="text-sm text-textLight mt-1">
              Manage your business listings
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Business
          </button>
        </div>

        {/* Businesses List */}
        {myBusinesses.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <BuildingStorefrontIcon className="w-12 h-12 text-textLight mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-textDark mb-2">
              No businesses yet
            </h3>
            <p className="text-sm text-textLight mb-6">
              Start by adding your first business
            </p>
            <button
              onClick={openAddModal}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primaryHover transition"
            >
              Add a Business
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {myBusinesses.map((business) => (
              <div
                key={business.id}
                className="bg-white shadow rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-textDark">
                        {business.name}
                      </h3>
                      {business.isVerified && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                          <CheckBadgeIcon className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-textLight mb-3">
                      {business.category}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-textLight">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{business.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <PhoneIcon className="w-4 h-4" />
                        <span>{business.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating & Reviews */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  {business.rating > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(business.rating)}</div>
                      <span className="text-sm font-semibold text-textDark">
                        {business.rating} ({business.reviewCount} reviews)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-textLight">
                      <StarIcon className="w-5 h-5" />
                      <span className="text-sm">No reviews yet</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(business)}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center justify-center gap-2 text-sm"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(business)}
                    className="flex-1 bg-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Business Modal */}
      {showBusinessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-textDark">
                  {editingBusiness ? "Edit Business" : "Add New Business"}
                </h2>
                <p className="text-sm text-textLight">
                  {editingBusiness
                    ? "Update business details"
                    : "Fill in business information"}
                </p>
              </div>
              <button
                onClick={() => setShowBusinessModal(false)}
                className="text-textDark hover:text-primary transition"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. Tech Solutions Ltd"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">Select category</option>
                  {BUSINESS_CATEGORIES.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. Gomti Nagar, Lucknow"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Phone *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. +91 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. info@business.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. www.business.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none resize-y"
                  placeholder="Describe your business..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center justify-center gap-2"
              >
                <CheckCircleIcon className="w-5 h-5" />
                {editingBusiness ? "Update Business" : "Add Business"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
            <div className="bg-red-100 rounded-full p-3 inline-block mb-4">
              <TrashIcon className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-textDark mb-2">
              Delete Business?
            </h3>
            <p className="text-sm text-textLight mb-6">
              Are you sure you want to delete "
              <span className="font-semibold">{businessToDelete?.name}</span>"?
              This action cannot be undone.
            </p>

            <div className="space-y-2">
              <button
                onClick={handleDelete}
                className="w-full bg-red text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Delete Business
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full bg-gray-100 text-textDark px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition"
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
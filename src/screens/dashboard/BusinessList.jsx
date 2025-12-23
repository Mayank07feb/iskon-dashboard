import React, { useState } from "react";
import {
  BuildingStorefrontIcon,
  MapPinIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
  StarIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

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

export default function BusinessList() {
  const navigate = useNavigate();

  // Sample businesses data
  const [businesses] = useState([
    {
      id: 1,
      name: "Tech Solutions Ltd",
      category: "Technology & IT",
      location: "Gomti Nagar, Lucknow",
      phone: "+91 9876543210",
      email: "info@techsolutions.com",
      website: "www.techsolutions.com",
      rating: 4.5,
      reviewCount: 125,
      description:
        "Leading IT solutions provider offering software development and digital marketing.",
      isVerified: true,
    },
    {
      id: 2,
      name: "Green Valley Cafe",
      category: "Restaurants & Food",
      location: "Hazratganj, Lucknow",
      phone: "+91 9876543211",
      email: "contact@greenvalley.com",
      rating: 5,
      reviewCount: 89,
      description:
        "Cozy cafe serving organic food, fresh coffee, and healthy meals.",
      isVerified: true,
    },
    {
      id: 3,
      name: "Fitness Pro Gym",
      category: "Sports & Fitness",
      location: "Alambagh, Lucknow",
      phone: "+91 9876543212",
      email: "info@fitnesspro.com",
      rating: 4,
      reviewCount: 67,
      description:
        "Modern gym with state-of-the-art equipment and personal trainers.",
      isVerified: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    location: "",
    category: "",
    rating: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      category: "",
      rating: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  // Filter businesses based on search and filters
  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      !filters.location ||
      business.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesCategory =
      !filters.category || business.category === filters.category;
    const matchesRating =
      !filters.rating || business.rating >= parseFloat(filters.rating);

    return (
      matchesSearch && matchesLocation && matchesCategory && matchesRating
    );
  });

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
          style={{ clipPath: "inset(0 50% 0 0)" }}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <BuildingStorefrontIcon className="w-7 h-7 text-primary" />
              <h1 className="text-2xl sm:text-3xl font-bold text-textDark">
                Businesses
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/create-business"
                className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center gap-2 text-sm"
              >
                <BuildingStorefrontIcon className="w-4 h-4" />
                Add Business
              </Link>
              <Link
                to="/my-business"
                className="bg-gray-100 text-textDark px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center gap-2 text-sm"
              >
                <BuildingStorefrontIcon className="w-4 h-4" />
                My Business
              </Link>
            </div>
          </div>
          <p className="text-sm text-textLight">
            Discover and explore local businesses
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textLight" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                showFilters
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-textDark hover:bg-gray-200"
              }`}
            >
              <FunnelIcon className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.values(filters).filter((v) => v !== "").length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-xs font-semibold text-textLight mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  >
                    <option value="">All categories</option>
                    {BUSINESS_CATEGORIES.map((cat, i) => (
                      <option key={i} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-xs font-semibold text-textLight mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lucknow, Delhi"
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-xs font-semibold text-textLight mb-2">
                    Minimum Rating
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.5"
                    placeholder="e.g. 4.0"
                    value={filters.rating}
                    onChange={(e) =>
                      handleFilterChange("rating", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  />
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center gap-2"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-textLight">
          {filteredBusinesses.length} business
          {filteredBusinesses.length !== 1 ? "es" : ""} found
        </p>

        {/* Business List */}
        <div className="space-y-4">
          {filteredBusinesses.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-12 text-center">
              <BuildingStorefrontIcon className="w-12 h-12 text-textLight mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-textDark mb-2">
                No businesses found
              </h3>
              <p className="text-sm text-textLight">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            filteredBusinesses.map((business) => (
              <div
                key={business.id}
                onClick={() =>
                  navigate("/business-details", { state: { business } })
                }
                className="bg-white shadow rounded-lg p-5 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
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
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-textLight mb-3">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{business.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PhoneIcon className="w-4 h-4" />
                    <span>{business.phone}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">{renderStars(business.rating)}</div>
                  <span className="text-sm font-semibold text-textDark">
                    {business.rating}
                  </span>
                  <span className="text-sm text-textLight">
                    ({business.reviewCount} reviews)
                  </span>
                </div>

                {/* View Details Arrow */}
                <div className="flex items-center justify-end mt-3 text-primary font-semibold text-sm">
                  <span className="mr-1">View Details</span>
                  <ChevronDownIcon className="w-4 h-4 transform -rotate-90" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <Link
        to="/create-business"
        className="fixed bottom-6 right-6 bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:bg-primaryHover transition flex items-center justify-center"
      >
        <BuildingStorefrontIcon className="w-6 h-6" />
      </Link>
    </div>
  );
}
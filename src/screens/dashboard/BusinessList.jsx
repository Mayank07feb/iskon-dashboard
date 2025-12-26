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
      photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
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
      photo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop",
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
      photo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop",
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
          className="w-3 h-3 fill-yellow-400 text-yellow-400"
        />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarIcon
          key="half"
          className="w-3 h-3 fill-yellow-400 text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
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
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-3 space-y-3">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <BuildingStorefrontIcon className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-bold text-textDark">
               Shops and Business
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/create-business"
                className="bg-primary text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center gap-1 text-xs"
              >
                <BuildingStorefrontIcon className="w-3 h-3" />
                Add Shop/Business
              </Link>
              <Link
                to="/my-business"
                className="bg-gray-100 text-textDark px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center gap-1 text-xs"
              >
                <BuildingStorefrontIcon className="w-3 h-3" />
                My Shops & Business
              </Link>
            </div>
          </div>
          <p className="text-2xs text-textLight">
            Discover and explore local shops and business
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white shadow rounded-lg p-3">
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textLight" />
              <input
                type="text"
                placeholder="Search shops and businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition text-xs ${
                showFilters
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-textDark hover:bg-gray-200"
              }`}
            >
              <FunnelIcon className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="bg-red-500 text-white text-2xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {Object.values(filters).filter((v) => v !== "").length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Category Filter */}
                <div>
                  <label className="block text-2xs font-semibold text-textLight mb-1">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="w-full px-2 py-1.5 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-xs"
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
                  <label className="block text-2xs font-semibold text-textLight mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lucknow, Delhi"
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    className="w-full px-2 py-1.5 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-xs"
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-2xs font-semibold text-textLight mb-1">
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
                    className="w-full px-2 py-1.5 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-xs"
                  />
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full bg-red-500 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center gap-1 text-xs"
                    >
                      <XMarkIcon className="w-3 h-3" />
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-2xs text-textLight">
          {filteredBusinesses.length} shop{filteredBusinesses.length !== 1 ? "s" : ""} and business
          {filteredBusinesses.length !== 1 ? "es" : ""} found
        </p>

        {/* Business List */}
        <div className="space-y-3">
          {filteredBusinesses.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <BuildingStorefrontIcon className="w-8 h-8 text-textLight mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-textDark mb-1">
                No shops or businesses found
              </h3>
              <p className="text-2xs text-textLight">
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
                className="bg-white shadow rounded-lg hover:shadow-md transition cursor-pointer overflow-hidden"
              >
                {/* Business Photo */}
                {business.photo && (
                  <div className="w-full h-36 overflow-hidden">
                    <img
                      src={business.photo}
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-0.5">
                        <h3 className="text-base font-bold text-textDark">
                          {business.name}
                        </h3>
                        {business.isVerified && (
                          <span className="bg-green-500 text-white text-2xs px-1 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
                            <CheckBadgeIcon className="w-2.5 h-2.5" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-2xs text-textLight mb-1.5">
                        {business.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-2xs text-textLight mb-1.5">
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3" />
                      <span>{business.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <PhoneIcon className="w-3 h-3" />
                      <span>{business.phone}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-1.5">
                    <div className="flex">{renderStars(business.rating)}</div>
                    <span className="text-2xs font-semibold text-textDark ml-0.5">
                      {business.rating}
                    </span>
                    <span className="text-2xs text-textLight">
                      ({business.reviewCount} reviews)
                    </span>
                  </div>

                  {/* View Details Arrow */}
                  <div className="flex items-center justify-end mt-1.5 text-primary font-semibold text-2xs">
                    <span className="mr-0.5">View Details</span>
                    <ChevronDownIcon className="w-2.5 h-2.5 transform -rotate-90" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <Link
        to="/create-business"
        className="fixed bottom-4 right-4 bg-primary text-white w-10 h-10 rounded-full shadow-lg hover:bg-primaryHover transition flex items-center justify-center"
      >
        <BuildingStorefrontIcon className="w-4 h-4" />
      </Link>
    </div>
  );
}
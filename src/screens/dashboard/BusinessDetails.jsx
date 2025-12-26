import React, { useState } from "react";
import {
  ArrowLeftIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  StarIcon as StarIconOutline,
  BookmarkIcon,
  ShareIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

export default function BusinessDetails() {
  const location = useLocation();
  const { business } = location.state || {};

  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // Sample reviews data
  const dummyReviews = [
    {
      id: 1,
      userName: "John Doe",
      rating: 5,
      comment: "Excellent service! Highly recommended.",
      date: "2 days ago",
      userAvatar: "J",
    },
    {
      id: 2,
      userName: "Sarah Smith",
      rating: 4,
      comment: "Good experience overall. The staff was friendly and helpful.",
      date: "1 week ago",
      userAvatar: "S",
    },
    {
      id: 3,
      userName: "Michael Johnson",
      rating: 5,
      comment: "Amazing! Will definitely come back again.",
      date: "2 weeks ago",
      userAvatar: "M",
    },
  ];

  // Use business data from navigation or fallback to dummy data
  const businessData = business || {
    id: 1,
    name: "Tech Solutions Ltd",
    category: "Technology & IT",
    location: "Gomti Nagar, Lucknow",
    phone: "+91 9876543210",
    email: "info@techsolutions.com",
    website: "www.techsolutions.com",
    rating: 4.5,
    reviewCount: 125,
    description: "Leading IT solutions provider offering software development and digital marketing.",
    isVerified: true,
    photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
  };

  if (!business && !businessData) {
    return (
      <div className="min-h-screen bg-screenBg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-bold text-textDark mb-3">
            Shop/Business not found
          </h2>
          <Link
            to="/businesses"
            className="text-primary font-semibold hover:underline text-sm"
          >
            ← Back to Shops and Business
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (reviewRating === 0 || !reviewComment.trim()) {
      alert("Please provide a rating and comment");
      return;
    }

    alert("Your review has been submitted!");

    setShowReviewModal(false);
    setReviewRating(0);
    setReviewComment("");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIconSolid key={`full-${i}`} className="w-3 h-3 text-yellow-400" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarIconOutline key="half" className="w-3 h-3 text-yellow-400" />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIconOutline
          key={`empty-${i}`}
          className="w-3 h-3 text-yellow-400"
        />
      );
    }
    return stars;
  };

  const renderRatingStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setReviewRating(star)}
        className="focus:outline-none"
      >
        {star <= reviewRating ? (
          <StarIconSolid className="w-6 h-6 text-yellow-400" />
        ) : (
          <StarIconOutline className="w-6 h-6 text-yellow-400" />
        )}
      </button>
    ));
  };

  const handleCall = () => {
    if (businessData.phone) {
      alert(`Calling ${businessData.phone}`);
    }
  };

  const handleEmail = () => {
    if (businessData.email) {
      alert(`Opening email to ${businessData.email}`);
    }
  };

  const handleWebsite = () => {
    if (businessData.website) {
      alert(`Opening ${businessData.website}`);
    }
  };

  const handleDirections = () => {
    alert(`Getting directions to ${businessData.location}`);
  };

  const handleShare = () => {
    alert(`Sharing ${businessData.name}`);
  };

  return (
    <div className="min-h-screen bg-screenBg pb-6">
      {/* Header with Business Photo */}
      {businessData.photo ? (
        <div className="relative">
          {/* Business Photo Banner */}
          <div className="w-full h-60 overflow-hidden">
            <img
              src={businessData.photo}
              alt={businessData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </div>
          
          {/* Header Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 text-white px-3 pb-4 pt-14">
            <div className="max-w-5xl mx-auto">
              <Link
                to="/businesses"
                className="inline-flex items-center gap-1 font-semibold hover:underline mb-2 bg-black/30 px-2 py-1 rounded backdrop-blur-sm text-xs"
              >
                <ArrowLeftIcon className="w-3 h-3" />
                Back to Shops and Business
              </Link>

              <div className="flex justify-between items-start gap-2">
                <div>
                  <h1 className="text-lg sm:text-xl font-bold mb-0.5 drop-shadow-lg">
                    {businessData.name}
                  </h1>
                  <p className="opacity-90 drop-shadow text-xs">{businessData.category}</p>
                </div>

                {businessData.isVerified && (
                  <div className="bg-green-500 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-0.5 shadow">
                    <CheckBadgeIcon className="w-3 h-3" />
                    Verified
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-primary text-white pt-6 pb-8 px-3">
          <div className="max-w-5xl mx-auto">
            <Link
              to="/businesses"
              className="inline-flex items-center gap-1 font-semibold hover:underline mb-3 text-xs"
            >
              <ArrowLeftIcon className="w-3 h-3" />
              Back to Shops and Business
            </Link>

            <div className="flex justify-between items-start gap-2">
              <div>
                <h1 className="text-lg sm:text-xl font-bold mb-0.5">
                  {businessData.name}
                </h1>
                <p className="opacity-90 text-xs">{businessData.category}</p>
              </div>

              {businessData.isVerified && (
                <div className="bg-green-500 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-0.5">
                  <CheckBadgeIcon className="w-3 h-3" />
                  Verified
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-5xl mx-auto px-3 mt-4">
        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-lg shadow p-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <MapPinIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xs font-semibold text-textLight uppercase mb-1">Location</span>
            <p className="font-semibold text-xs text-textDark">{businessData.location}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <PhoneIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xs font-semibold text-textLight uppercase mb-1">Phone</span>
            <p className="font-semibold text-xs text-textDark">{businessData.phone}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <EnvelopeIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xs font-semibold text-textLight uppercase mb-1">Email</span>
            <p className="font-semibold text-xs text-textDark break-all">{businessData.email || "N/A"}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-base font-bold mb-4 text-textDark">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ActionButton
              icon={<PhoneIcon className="w-5 h-5" />}
              label="Call"
              onClick={handleCall}
            />
            <ActionButton
              icon={<MapPinIcon className="w-5 h-5" />}
              label="Directions"
              onClick={handleDirections}
            />
            {businessData.website && (
              <ActionButton
                icon={<GlobeAltIcon className="w-5 h-5" />}
                label="Website"
                onClick={handleWebsite}
              />
            )}
            <ActionButton
              icon={<ShareIcon className="w-5 h-5" />}
              label="Share"
              onClick={handleShare}
            />
          </div>
        </div>

        {/* About */}
        <Section icon={InformationCircleIcon} title="About">
          <p className="text-sm text-textDark leading-relaxed">
            {businessData.description || "No description available."}
          </p>
        </Section>

        {/* What We Offer */}
        <Section icon={CheckCircleIcon} title="What We Offer">
          <BulletPoint text="Quality products and services" />
          <BulletPoint text="Professional and experienced team" />
          <BulletPoint text="Customer satisfaction guaranteed" />
          <BulletPoint text="Competitive pricing" />
          <BulletPoint text="Timely delivery and support" />
        </Section>

        {/* Reviews */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <StarIconSolid className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold">Reviews & Ratings</h2>
          </div>

          {/* Rating Summary */}
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-textDark mb-1">
                {businessData.rating || 0}
              </div>
              <div className="flex justify-center mb-1">
                {renderStars(businessData.rating || 0)}
              </div>
              <p className="text-xs text-textLight">
                {businessData.reviewCount || 0} reviews
              </p>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primaryHover transition text-sm"
            >
              Write Review
            </button>
          </div>

          {/* Individual Reviews */}
          {dummyReviews.length > 0 ? (
            <div className="space-y-4">
              {dummyReviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`pb-4 ${
                    index < dummyReviews.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                      {review.userAvatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-textDark">
                        {review.userName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-xs text-textLight">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-textDark leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <StarIconOutline className="w-8 h-8 text-textLight mx-auto mb-2" />
              <p className="text-textLight text-sm">
                No reviews yet. Be the first to review!
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons (NON-FLOATING) */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-gray-100 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 text-sm flex items-center justify-center gap-1.5"
            >
              <BookmarkIcon className="w-4 h-4" />
              {isFavorite ? "Saved" : "Save"}
            </button>

            <button
              onClick={handleShare}
              className="bg-gray-100 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 text-sm flex items-center justify-center gap-1.5"
            >
              <ShareIcon className="w-4 h-4" />
              Share
            </button>

            <button
              onClick={handleCall}
              className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primaryHover text-sm flex items-center justify-center gap-1.5"
            >
              <PhoneIcon className="w-4 h-4" />
              Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base font-bold">Write a Review</h3>
            </div>

            <form onSubmit={handleSubmitReview} className="p-4 space-y-4">
              {/* Business Name */}
              <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
                <InformationCircleIcon className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm">{businessData.name}</span>
              </div>

              {/* Rating */}
              <div className="text-center">
                <p className="font-semibold mb-3 text-sm">Rate your experience</p>
                <div className="flex justify-center gap-1">
                  {renderRatingStars()}
                </div>
                {reviewRating > 0 && (
                  <p className="text-xs text-textLight mt-1">
                    {reviewRating} {reviewRating === 1 ? "star" : "stars"}{" "}
                    selected
                  </p>
                )}
              </div>

              {/* Comment */}
              <div>
                <label className="block font-semibold mb-1 text-sm">Your Review</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience..."
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none resize-y text-sm"
                />
                <p className="text-xs text-textLight mt-0.5">
                  {reviewComment.length}/500 characters
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primaryHover text-sm"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="w-full bg-gray-100 py-2.5 rounded-lg font-semibold hover:bg-gray-200 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Components ---------- */

const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-4">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-5 h-5 text-primary" />
      <h2 className="text-base font-bold">{title}</h2>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="text-center">
    <div className="flex justify-center items-center gap-1 text-textLight mb-1">
      {icon}
      <span className="text-xs font-semibold uppercase">{label}</span>
    </div>
    <p className="font-semibold text-xs break-words text-textDark">{value}</p>
  </div>
);

const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 transition rounded group"
  >
    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow">
      {icon}
    </div>
    <span className="text-xs font-semibold text-textDark">{label}</span>
  </button>
);

const BulletPoint = ({ text }) => (
  <li className="flex gap-2 text-sm">
    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
    <span>{text}</span>
  </li>
);
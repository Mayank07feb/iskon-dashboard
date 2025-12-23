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

  if (!business) {
    return (
      <div className="min-h-screen bg-screenBg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-textDark mb-4">
            Business not found
          </h2>
          <Link
            to="/businesses"
            className="text-primary font-semibold hover:underline"
          >
            ← Back to Businesses
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
        <StarIconSolid key={`full-${i}`} className="w-4 h-4 text-yellow-400" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarIconOutline key="half" className="w-4 h-4 text-yellow-400" />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIconOutline
          key={`empty-${i}`}
          className="w-4 h-4 text-yellow-400"
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
          <StarIconSolid className="w-10 h-10 text-yellow-400" />
        ) : (
          <StarIconOutline className="w-10 h-10 text-yellow-400" />
        )}
      </button>
    ));
  };

  const handleCall = () => {
    if (business.phone) {
      alert(`Calling ${business.phone}`);
    }
  };

  const handleEmail = () => {
    if (business.email) {
      alert(`Opening email to ${business.email}`);
    }
  };

  const handleWebsite = () => {
    if (business.website) {
      alert(`Opening ${business.website}`);
    }
  };

  const handleDirections = () => {
    alert(`Getting directions to ${business.location}`);
  };

  const handleShare = () => {
    alert(`Sharing ${business.name}`);
  };

  return (
    <div className="min-h-screen bg-screenBg pb-12">
      {/* Header */}
      <div className="bg-primary text-white pt-8 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/businesses"
            className="inline-flex items-center gap-2 font-semibold hover:underline mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Businesses
          </Link>

          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                {business.name}
              </h1>
              <p className="opacity-90">{business.category}</p>
            </div>

            {business.isVerified && (
              <div className="bg-green-500 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <CheckBadgeIcon className="w-5 h-5" />
                Verified
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-6">
        {/* Info */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <InfoItem
              icon={<MapPinIcon className="w-5 h-5" />}
              label="Location"
              value={business.location}
            />
            <InfoItem
              icon={<PhoneIcon className="w-5 h-5" />}
              label="Phone"
              value={business.phone}
            />
            {business.email && (
              <InfoItem
                icon={<EnvelopeIcon className="w-5 h-5" />}
                label="Email"
                value={business.email}
              />
            )}
            {business.website && (
              <InfoItem
                icon={<GlobeAltIcon className="w-5 h-5" />}
                label="Website"
                value={business.website}
              />
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="flex justify-around gap-4">
            <ActionButton
              icon={<PhoneIcon className="w-6 h-6" />}
              label="Call"
              onClick={handleCall}
            />
            <ActionButton
              icon={<MapPinIcon className="w-6 h-6" />}
              label="Directions"
              onClick={handleDirections}
            />
            {business.website && (
              <ActionButton
                icon={<GlobeAltIcon className="w-6 h-6" />}
                label="Website"
                onClick={handleWebsite}
              />
            )}
            {business.email && (
              <ActionButton
                icon={<EnvelopeIcon className="w-6 h-6" />}
                label="Email"
                onClick={handleEmail}
              />
            )}
          </div>
        </div>

        {/* About */}
        <Section icon={InformationCircleIcon} title="About">
          {business.description || "No description available."}
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
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <StarIconSolid className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
          </div>

          {/* Rating Summary */}
          <div className="bg-gray-100 rounded-xl p-6 flex items-center justify-between mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-textDark mb-2">
                {business.rating || 0}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(business.rating || 0)}
              </div>
              <p className="text-sm text-textLight">
                {business.reviewCount || 0} reviews
              </p>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryHover transition"
            >
              Write Review
            </button>
          </div>

          {/* Individual Reviews */}
          {dummyReviews.length > 0 ? (
            <div className="space-y-6">
              {dummyReviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`pb-6 ${
                    index < dummyReviews.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold">
                      {review.userAvatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-textDark">
                        {review.userName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-xs text-textLight">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-textDark leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <StarIconOutline className="w-12 h-12 text-textLight mx-auto mb-3" />
              <p className="text-textLight">
                No reviews yet. Be the first to review!
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons (NON-FLOATING) */}
        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-gray-100 text-primary px-5 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              <BookmarkIcon className="w-5 h-5 inline mr-2" />
              {isFavorite ? "Saved" : "Save"}
            </button>

            <button
              onClick={handleShare}
              className="bg-gray-100 text-primary px-5 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              <ShareIcon className="w-5 h-5 inline mr-2" />
              Share
            </button>

            <button
              onClick={handleCall}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryHover"
            >
              <PhoneIcon className="w-5 h-5 inline mr-2" />
              Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold">Write a Review</h3>
            </div>

            <form onSubmit={handleSubmitReview} className="p-6 space-y-6">
              {/* Business Name */}
              <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-3">
                <InformationCircleIcon className="w-6 h-6 text-primary" />
                <span className="font-semibold">{business.name}</span>
              </div>

              {/* Rating */}
              <div className="text-center">
                <p className="font-semibold mb-4">Rate your experience</p>
                <div className="flex justify-center gap-2">
                  {renderRatingStars()}
                </div>
                {reviewRating > 0 && (
                  <p className="text-sm text-textLight mt-2">
                    {reviewRating} {reviewRating === 1 ? "star" : "stars"}{" "}
                    selected
                  </p>
                )}
              </div>

              {/* Comment */}
              <div>
                <label className="block font-semibold mb-2">Your Review</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience..."
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none resize-y"
                />
                <p className="text-xs text-textLight mt-1">
                  {reviewComment.length}/500 characters
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primaryHover"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="w-full bg-gray-100 py-3 rounded-lg font-semibold hover:bg-gray-200"
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
  <div className="bg-white rounded-xl shadow p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-6 h-6 text-primary" />
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center gap-2 text-textLight mb-1">
      {icon}
      <span className="text-xs font-semibold uppercase">{label}</span>
    </div>
    <p className="ml-7 font-semibold text-sm break-words">{value}</p>
  </div>
);

const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 hover:opacity-75 transition"
  >
    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center">
      {icon}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const BulletPoint = ({ text }) => (
  <li className="flex gap-3">
    <span className="w-2 h-2 bg-primary rounded-full mt-2" />
    <span>{text}</span>
  </li>
);
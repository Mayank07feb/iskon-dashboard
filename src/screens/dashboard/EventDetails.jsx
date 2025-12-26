import React, { useState } from "react";
import {
  ArrowLeftIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  VideoCameraIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  ShareIcon,
  BookmarkIcon,
  CheckBadgeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EventDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const event = state?.event;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Default event data if none is provided
  const eventData = event || {
    id: 1,
    title: "Tech Startup Meetup",
    type: "Meetup",
    category: "Technology & IT",
    description: "Join us for an exciting evening of networking with fellow tech entrepreneurs and startup founders.",
    location: "Gomti Nagar, Lucknow",
    venue: "Innovation Hub, 3rd Floor",
    date: "2024-02-15",
    time: "6:00 PM",
    duration: "2 hours",
    organizer: "Tech Community Lucknow",
    contactPhone: "+91 9876543210",
    contactEmail: "info@techlucknow.com",
    maxAttendees: 50,
    currentAttendees: 23,
    isOnline: false,
    isFree: true,
    price: "",
    registrationRequired: true,
    status: "upcoming",
  };

  // Handle missing event data
  if (!event && !eventData) {
    return (
      <div className="min-h-screen bg-screenBg flex items-center justify-center p-3">
        <div className="text-center">
          <h2 className="text-lg font-bold text-textDark mb-3">
            Event not found
          </h2>
          <Link
            to="/events"
            className="text-primary font-semibold hover:underline inline-flex items-center gap-1.5 text-sm"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const getEventIcon = (type) => {
    const iconClass = "w-5 h-5 text-textDark";
    switch (type) {
      case 'Meetup': return <UsersIcon className={iconClass} />;
      case 'Workshop': return <BuildingOfficeIcon className={iconClass} />;
      case 'Community Gathering': return <UsersIcon className={iconClass} />;
      case 'Guidance Session': return <UserIcon className={iconClass} />;
      case 'Camp': return <CalendarIcon className={iconClass} />;
      case 'Class': return <BuildingOfficeIcon className={iconClass} />;
      case 'Seminar': return <UserIcon className={iconClass} />;
      case 'Conference': return <BuildingOfficeIcon className={iconClass} />;
      case 'Webinar': return <VideoCameraIcon className={iconClass} />;
      case 'Training': return <ClipboardDocumentListIcon className={iconClass} />;
      case 'Networking Event': return <UsersIcon className={iconClass} />;
      case 'Festival': return <CalendarIcon className={iconClass} />;
      case 'Competition': return <CalendarIcon className={iconClass} />;
      case 'Exhibition': return <BuildingOfficeIcon className={iconClass} />;
      default: return <CalendarIcon className={iconClass} />;
    }
  };

  const getStatusBadge = () => {
    switch (eventData.status) {
      case 'upcoming':
        return (
          <div className="bg-green px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 text-white">
            <CheckBadgeIcon className="w-3.5 h-3.5" />
            Upcoming
          </div>
        );
      case 'ongoing':
        return (
          <div className="bg-orange-500 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 text-white">
            <CheckBadgeIcon className="w-3.5 h-3.5" />
            Ongoing
          </div>
        );
      case 'past':
        return (
          <div className="bg-textDisabled px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 text-white">
            <CheckBadgeIcon className="w-3.5 h-3.5" />
            Past
          </div>
        );
      default:
        return null;
    }
  };

  const handleShare = () => {
    alert(`Sharing ${eventData.title}`);
  };

  const handleGetDirections = () => {
    alert(`Getting directions to ${eventData.location}`);
  };

  const handleCall = () => {
    if (eventData.contactPhone) {
      alert(`Calling ${eventData.contactPhone}`);
    }
  };

  const handleEmail = () => {
    if (eventData.contactEmail) {
      alert(`Opening email to ${eventData.contactEmail}`);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!registrationForm.name || !registrationForm.email || !registrationForm.phone) {
      alert("Please fill all required fields");
      return;
    }

    alert("Registration successful! You will receive a confirmation email shortly.");
    setShowRegisterModal(false);
    setRegistrationForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="min-h-screen bg-screenBg pb-8">
      {/* Header */}
      <div className="bg-primary text-white pt-6 pb-8 px-3">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 font-semibold hover:underline mb-4 text-xs"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            Back to Events
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-3 rounded-lg">
                {getEventIcon(eventData.type)}
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5">
                  {eventData.title}
                </h1>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {eventData.type}
                  </span>
                  {eventData.category && (
                    <span className="opacity-90 text-xs">{eventData.category}</span>
                  )}
                </div>
              </div>
            </div>
            {getStatusBadge()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-3 -mt-6">
        {/* Event Badges */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {eventData.isFree && (
              <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <CurrencyDollarIcon className="w-3.5 h-3.5" />
                FREE Event
              </span>
            )}
            {!eventData.isFree && eventData.price && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <CurrencyDollarIcon className="w-3.5 h-3.5" />
                {eventData.price}
              </span>
            )}
            {eventData.isOnline && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <VideoCameraIcon className="w-3.5 h-3.5" />
                Online Event
              </span>
            )}
            {eventData.registrationRequired && (
              <span className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                <ClipboardDocumentListIcon className="w-3.5 h-3.5" />
                Registration Required
              </span>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-lg shadow p-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mb-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xs font-semibold text-textLabel uppercase mb-1">Date</span>
            <p className="font-semibold text-xs text-textDark">{eventData.date}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mb-2">
              <ClockIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xs font-semibold text-textLabel uppercase mb-1">Time</span>
            <p className="font-semibold text-xs text-textDark">{eventData.time}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mb-2">
              <MapPinIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xs font-semibold text-textLabel uppercase mb-1">Location</span>
            <p className="font-semibold text-xs text-textDark">{eventData.location}</p>
          </div>
        </div>

        {/* Attendee Progress */}
        {eventData.maxAttendees && (
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <UsersIcon className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-textDark">Event Capacity</h2>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-textLight">Registered Attendees</span>
              <span className="text-base font-bold text-primary">
                {eventData.currentAttendees}/{eventData.maxAttendees}
              </span>
            </div>
            <div className="h-2 bg-gray200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(eventData.currentAttendees / eventData.maxAttendees) * 100}%` }}
              />
            </div>
            <p className="text-xs text-textLight mt-1.5">
              {eventData.maxAttendees - eventData.currentAttendees} spots remaining
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-base font-bold mb-4 text-textDark">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={handleGetDirections}
              className="flex flex-col items-center gap-2 p-3 hover:bg-secondary transition rounded group"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-textDark">Directions</span>
            </button>

            <button
              onClick={handleCall}
              className="flex flex-col items-center gap-2 p-3 hover:bg-secondary transition rounded group"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow">
                <PhoneIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-textDark">Call</span>
            </button>

            <button
              onClick={handleEmail}
              className="flex flex-col items-center gap-2 p-3 hover:bg-secondary transition rounded group"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow">
                <EnvelopeIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-textDark">Email</span>
            </button>

            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-2 p-3 hover:bg-secondary transition rounded group"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow">
                <ShareIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-textDark">Share</span>
            </button>
          </div>
        </div>

        {/* About Event */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center gap-2.5 mb-3">
            <InformationCircleIcon className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-textDark">About This Event</h2>
          </div>
          <p className="text-textLight leading-relaxed text-sm">
            {eventData.description || "No description available."}
          </p>
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center gap-2.5 mb-3">
            <CheckCircleIcon className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-textDark">Event Details</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 p-3 bg-secondary rounded-lg">
              <div className="text-textLabel">
                <UserIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-textLabel mb-0.5">Organizer</p>
                <p className="font-semibold text-textDark text-sm">{eventData.organizer}</p>
              </div>
            </div>

            {eventData.venue && (
              <div className="flex items-center gap-2.5 p-3 bg-secondary rounded-lg">
                <div className="text-textLabel">
                  <BuildingOfficeIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-textLabel mb-0.5">Venue</p>
                  <p className="font-semibold text-textDark text-sm">{eventData.venue}</p>
                </div>
              </div>
            )}

            {eventData.duration && (
              <div className="flex items-center gap-2.5 p-3 bg-secondary rounded-lg">
                <div className="text-textLabel">
                  <ClockIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-textLabel mb-0.5">Duration</p>
                  <p className="font-semibold text-textDark text-sm">{eventData.duration}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2.5 p-3 bg-secondary rounded-lg">
              <div className="text-textLabel">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-textLabel mb-0.5">Event Type</p>
                <p className="font-semibold text-textDark text-sm">{eventData.type}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        {(eventData.contactPhone || eventData.contactEmail) && (
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center gap-2.5 mb-3">
              <PhoneIcon className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-textDark">Contact Information</h2>
            </div>
            <div className="space-y-3">
              {eventData.contactPhone && (
                <div className="flex items-center gap-2.5 p-3 bg-secondary rounded-lg">
                  <PhoneIcon className="w-4 h-4 text-textLabel" />
                  <div>
                    <p className="text-xs text-textLabel mb-0.5">Phone</p>
                    <a
                      href={`tel:${eventData.contactPhone}`}
                      className="font-semibold text-textDark hover:text-primary transition text-sm"
                    >
                      {eventData.contactPhone}
                    </a>
                  </div>
                </div>
              )}
              {eventData.contactEmail && (
                <div className="flex items-center gap-2.5 p-3 bg-secondary rounded-lg">
                  <EnvelopeIcon className="w-4 h-4 text-textLabel" />
                  <div>
                    <p className="text-xs text-textLabel mb-0.5">Email</p>
                    <a
                      href={`mailto:${eventData.contactEmail}`}
                      className="font-semibold text-textDark hover:text-primary transition break-all text-sm"
                    >
                      {eventData.contactEmail}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Event Settings */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-base font-bold text-textDark mb-3">Event Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2.5 p-3 bg-secondary rounded-lg">
              <div className={`p-1.5 rounded-lg ${eventData.isOnline ? 'bg-green-100' : 'bg-secondaryHover'}`}>
                <VideoCameraIcon className={`w-4 h-4 ${eventData.isOnline ? 'text-green' : 'text-textDisabled'}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-textLabel">Online Event</p>
                <p className="text-sm font-semibold text-textDark">
                  {eventData.isOnline ? 'Yes' : 'No'}
                </p>
              </div>
              {eventData.isOnline ? (
                <CheckCircleIcon className="w-4 h-4 text-green" />
              ) : (
                <XCircleIcon className="w-4 h-4 text-textDisabled" />
              )}
            </div>

            <div className="flex items-center gap-2.5 p-3 bg-secondary rounded-lg">
              <div className={`p-1.5 rounded-lg ${eventData.isFree ? 'bg-green-100' : 'bg-blue-100'}`}>
                <CurrencyDollarIcon className={`w-4 h-4 ${eventData.isFree ? 'text-green' : 'text-blue'}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-textLabel">Ticket Price</p>
                <p className="text-sm font-semibold text-textDark">
                  {eventData.isFree ? 'Free' : eventData.price || 'Paid'}
                </p>
              </div>
              {eventData.isFree && (
                <CheckCircleIcon className="w-4 h-4 text-green" />
              )}
            </div>

            <div className="flex items-center gap-2.5 p-3 bg-secondary rounded-lg">
              <div className={`p-1.5 rounded-lg ${eventData.registrationRequired ? 'bg-orange-100' : 'bg-secondaryHover'}`}>
                <ClipboardDocumentListIcon className={`w-4 h-4 ${eventData.registrationRequired ? 'text-orange-500' : 'text-textDisabled'}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-textLabel">Registration</p>
                <p className="text-sm font-semibold text-textDark">
                  {eventData.registrationRequired ? 'Required' : 'Not Required'}
                </p>
              </div>
              {eventData.registrationRequired ? (
                <CheckCircleIcon className="w-4 h-4 text-orange-500" />
              ) : (
                <XCircleIcon className="w-4 h-4 text-textDisabled" />
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="bg-secondary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-secondaryHover transition flex items-center justify-center text-sm"
            >
              <BookmarkIcon className="w-4 h-4 mr-1.5" />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>

            <button
              onClick={handleShare}
              className="bg-secondary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-secondaryHover transition flex items-center justify-center text-sm"
            >
              <ShareIcon className="w-4 h-4 mr-1.5" />
              Share Event
            </button>

            {eventData.registrationRequired && eventData.status === "upcoming" && (
              <button
                onClick={() => setShowRegisterModal(true)}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center justify-center text-sm"
              >
                <CheckCircleIcon className="w-4 h-4 mr-1.5" />
                Register Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-heroOverlayMedium flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray200">
              <h3 className="text-base font-bold text-textDark">Register for Event</h3>
              <p className="text-2xs text-textLight mt-0.5">{eventData.title}</p>
            </div>

            <form onSubmit={handleRegister} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-textLabel mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={registrationForm.name}
                  onChange={(e) =>
                    setRegistrationForm({ ...registrationForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textLabel mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={registrationForm.email}
                  onChange={(e) =>
                    setRegistrationForm({ ...registrationForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textLabel mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={registrationForm.phone}
                  onChange={(e) =>
                    setRegistrationForm({ ...registrationForm, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  placeholder="Enter your phone"
                  required
                />
              </div>

              <div className="space-y-2 pt-3">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primaryHover transition text-sm"
                >
                  Complete Registration
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="w-full bg-secondary text-textDark py-2.5 rounded-lg font-semibold hover:bg-secondaryHover transition text-sm"
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
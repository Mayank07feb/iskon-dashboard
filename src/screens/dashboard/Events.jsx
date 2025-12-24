import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  EyeIcon,
  CheckCircleIcon,
  VideoCameraIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const EVENT_TYPES = [
  "Meetup",
  "Workshop",
  "Community Gathering",
  "Guidance Session",
  "Camp",
  "Class",
  "Seminar",
  "Conference",
  "Webinar",
  "Training",
  "Networking Event",
  "Festival",
  "Competition",
  "Exhibition",
  "Other",
];

const EVENT_CATEGORIES = [
  "Technology & IT",
  "Business & Entrepreneurship",
  "Health & Wellness",
  "Education & Learning",
  "Career Development",
  "Arts & Culture",
  "Sports & Fitness",
  "Social & Community",
  "Entertainment",
  "Food & Dining",
  "Other",
];

export default function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Startup Meetup",
      type: "Meetup",
      category: "Technology & IT",
      description:
        "Join us for an exciting evening of networking with fellow tech entrepreneurs and startup founders.",
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
    },
    {
      id: 2,
      title: "Digital Marketing Workshop",
      type: "Workshop",
      category: "Business & Entrepreneurship",
      description:
        "Learn the latest digital marketing strategies and tools to grow your business online.",
      location: "Hazratganj, Lucknow",
      venue: "Business Center Hall",
      date: "2024-02-20",
      time: "10:00 AM",
      duration: "4 hours",
      organizer: "Marketing Academy",
      contactPhone: "+91 9876543211",
      contactEmail: "contact@marketingacademy.com",
      maxAttendees: 30,
      currentAttendees: 18,
      isOnline: false,
      isFree: false,
      price: "₹500",
      registrationRequired: true,
      status: "upcoming",
    },
  ]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const [form, setForm] = useState({
    title: "",
    type: "",
    category: "",
    description: "",
    location: "",
    venue: "",
    date: "",
    time: "",
    duration: "",
    organizer: "",
    contactPhone: "",
    contactEmail: "",
    maxAttendees: "",
    isOnline: false,
    isFree: true,
    price: "",
    registrationRequired: true,
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setForm({
      title: "",
      type: "",
      category: "",
      description: "",
      location: "",
      venue: "",
      date: "",
      time: "",
      duration: "",
      organizer: "",
      contactPhone: "",
      contactEmail: "",
      maxAttendees: "",
      isOnline: false,
      isFree: true,
      price: "",
      registrationRequired: true,
    });
    setShowEventModal(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      type: event.type,
      category: event.category,
      description: event.description,
      location: event.location,
      venue: event.venue || "",
      date: event.date,
      time: event.time,
      duration: event.duration || "",
      organizer: event.organizer,
      contactPhone: event.contactPhone,
      contactEmail: event.contactEmail || "",
      maxAttendees: event.maxAttendees?.toString() || "",
      isOnline: event.isOnline,
      isFree: event.isFree,
      price: event.price || "",
      registrationRequired: event.registrationRequired,
    });
    setShowEventModal(true);
  };

  const handleSubmit = () => {
    if (
      !form.title ||
      !form.type ||
      !form.date ||
      !form.time ||
      !form.organizer
    ) {
      alert(
        "Please fill all required fields (Title, Type, Date, Time, Organizer)."
      );
      return;
    }

    if (editingEvent) {
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                ...form,
                maxAttendees: form.maxAttendees
                  ? parseInt(form.maxAttendees)
                  : null,
              }
            : event
        )
      );
      alert("Event updated successfully!");
    } else {
      const newEvent = {
        id: Date.now(),
        ...form,
        maxAttendees: form.maxAttendees ? parseInt(form.maxAttendees) : null,
        currentAttendees: 0,
        status: "upcoming",
      };
      setEvents([newEvent, ...events]);
      alert("Event created successfully!");
    }

    setShowEventModal(false);
  };

  const confirmDelete = (event) => {
    setEventToDelete(event);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    setEvents(events.filter((event) => event.id !== eventToDelete.id));
    setShowDeleteConfirm(false);
    setEventToDelete(null);
    alert("Event deleted successfully!");
  };

  const handleViewDetails = (event) => {
    navigate("/event-details", { state: { event } });
  };

  const getEventIcon = (type) => {
    const iconClass = "w-7 h-7 text-textDark";
    switch (type) {
      case "Meetup":
        return <UsersIcon className={iconClass} />;
      case "Workshop":
        return <BuildingOfficeIcon className={iconClass} />;
      case "Community Gathering":
        return <UsersIcon className={iconClass} />;
      case "Guidance Session":
        return <UserIcon className={iconClass} />;
      case "Camp":
        return <CalendarIcon className={iconClass} />;
      case "Class":
        return <BuildingOfficeIcon className={iconClass} />;
      case "Seminar":
        return <UserIcon className={iconClass} />;
      case "Conference":
        return <BuildingOfficeIcon className={iconClass} />;
      case "Webinar":
        return <VideoCameraIcon className={iconClass} />;
      case "Training":
        return <ClipboardDocumentListIcon className={iconClass} />;
      case "Networking Event":
        return <UsersIcon className={iconClass} />;
      case "Festival":
        return <CalendarIcon className={iconClass} />;
      case "Competition":
        return <CalendarIcon className={iconClass} />;
      case "Exhibition":
        return <BuildingOfficeIcon className={iconClass} />;
      default:
        return <CalendarIcon className={iconClass} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "border-green";
      case "ongoing":
        return "border-orange-500";
      case "past":
        return "border-textDisabled";
      default:
        return "border-primary";
    }
  };

  const filteredEvents = events.filter((event) => {
    if (filterStatus === "all") return true;
    return event.status === filterStatus;
  });

  const EventInfoRow = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-textLabel" />
      <span className="text-sm text-textDark">{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-screenBg p-4 md:p-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-textDark">Events</h1>
            <p className="text-sm text-textLight mt-1">
              Create and manage events
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <PlusIcon className="w-5 h-5" />
            Create Event
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {["all", "upcoming", "past"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition ${
                filterStatus === status
                  ? "bg-primary text-white"
                  : "bg-secondary text-textDark hover:bg-secondaryHover"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-12 text-center">
          <CalendarIcon className="w-12 h-12 text-textMuted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-textDark mb-2">
            No events found
          </h3>
          <p className="text-sm text-textLight mb-6">
            Create your first event to get started
          </p>
          <button
            onClick={openAddModal}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primaryHover transition"
          >
            Create Event
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition border-l-4 ${getStatusColor(
                event.status
              )}`}
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="bg-secondary p-3 rounded-lg">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-textDark mb-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                          {event.type}
                        </span>
                        {event.isFree && (
                          <span className="bg-green text-white text-xs px-3 py-1 rounded-full font-semibold">
                            FREE
                          </span>
                        )}
                        {event.isOnline && (
                          <span className="bg-blue text-white text-xs px-3 py-1 rounded-full font-semibold">
                            ONLINE
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-textLight">{event.category}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-textDark mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="bg-secondary rounded-lg p-4 mb-4">
                  <EventInfoRow icon={CalendarIcon} text={event.date} />
                  <EventInfoRow icon={ClockIcon} text={event.time} />
                  {event.duration && (
                    <EventInfoRow icon={ClockIcon} text={event.duration} />
                  )}
                  <EventInfoRow icon={MapPinIcon} text={event.location} />
                  {event.venue && (
                    <EventInfoRow
                      icon={BuildingOfficeIcon}
                      text={event.venue}
                    />
                  )}
                  <EventInfoRow
                    icon={UserIcon}
                    text={`By ${event.organizer}`}
                  />

                  {event.maxAttendees && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray200">
                      <UsersIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-textDark">
                        {event.currentAttendees}/{event.maxAttendees} Attendees
                      </span>
                      <div className="flex-1 h-2 bg-gray200 rounded-full ml-3 overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${
                              (event.currentAttendees / event.maxAttendees) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleViewDetails(event)}
                    className="flex-1 bg-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center justify-center gap-2"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => openEditModal(event)}
                    className="flex-1 bg-secondary text-textDark px-4 py-2.5 rounded-lg font-semibold hover:bg-secondaryHover transition flex items-center justify-center gap-2"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(event)}
                    className="bg-red text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2 sm:px-6"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="sm:hidden">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-heroOverlayMedium flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray200 p-5 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-textDark">
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </h2>
                <p className="text-sm text-textLight">
                  {editingEvent
                    ? "Update event details"
                    : "Fill in event information"}
                </p>
              </div>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-textDark hover:text-primary transition"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-textLabel mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="e.g. Tech Startup Meetup"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textLabel mb-2">
                  Event Type *
                </label>
                <select
                  value={form.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                >
                  <option value="" className="text-textMuted">
                    Select event type
                  </option>
                  {EVENT_TYPES.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-textLabel mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                >
                  <option value="" className="text-textMuted">
                    Select category
                  </option>
                  {EVENT_CATEGORIES.map((category, i) => (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-textLabel mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none resize-y"
                  placeholder="Describe your event..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-textLabel mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-textLabel mb-2">
                    Time *
                  </label>
                  <input
                    type="text"
                    value={form.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                    placeholder="e.g. 6:00 PM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-textLabel mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={form.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="e.g. 2 hours"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textLabel mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="e.g. Gomti Nagar, Lucknow"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textLabel mb-2">
                  Venue
                </label>
                <input
                  type="text"
                  value={form.venue}
                  onChange={(e) => handleChange("venue", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="e.g. Innovation Hub, 3rd Floor"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textLabel mb-2">
                  Organizer Name *
                </label>
                <input
                  type="text"
                  value={form.organizer}
                  onChange={(e) => handleChange("organizer", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="e.g. Tech Community Lucknow"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-textLabel mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={form.contactPhone}
                    onChange={(e) =>
                      handleChange("contactPhone", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                    placeholder="e.g. +91 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-textLabel mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) =>
                      handleChange("contactEmail", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                    placeholder="e.g. info@event.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-textLabel mb-2">
                  Max Attendees
                </label>
                <input
                  type="number"
                  value={form.maxAttendees}
                  onChange={(e) => handleChange("maxAttendees", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="e.g. 50"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondaryHover transition">
                  <div className="flex items-center gap-2">
                    <VideoCameraIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-textDark">
                      Online Event
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.isOnline}
                    onChange={(e) => handleChange("isOnline", e.target.checked)}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondaryHover transition">
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-textDark">
                      Free Event
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.isFree}
                    onChange={(e) => handleChange("isFree", e.target.checked)}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondaryHover transition">
                  <div className="flex items-center gap-2">
                    <ClipboardDocumentListIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-textDark">
                      Registration Required
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.registrationRequired}
                    onChange={(e) =>
                      handleChange("registrationRequired", e.target.checked)
                    }
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                  />
                </label>
              </div>

              {!form.isFree && (
                <div>
                  <label className="block text-sm font-semibold text-textLabel mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                    placeholder="e.g. ₹500"
                  />
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center justify-center gap-2 mt-6"
              >
                <CheckCircleIcon className="w-5 h-5" />
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-heroOverlayMedium flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
            <div className="bg-red-100 rounded-full p-3 inline-block mb-4">
              <TrashIcon className="w-10 h-10 text-red" />
            </div>
            <h3 className="text-xl font-bold text-textDark mb-2">
              Delete Event
            </h3>
            <p className="text-sm text-textLight mb-6">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>

            <div className="space-y-2">
              <button
                onClick={handleDelete}
                className="w-full bg-red text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full bg-secondary text-textDark px-6 py-2.5 rounded-lg font-semibold hover:bg-secondaryHover transition"
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
import React, { useState } from 'react';
import {
  XMarkIcon,
  PlusIcon,
  ArrowLeftIcon,
  TagIcon,
  CurrencyDollarIcon,
  GiftIcon,
  TruckIcon,
  SunIcon,
  BoltIcon,
  ClockIcon,
  UserPlusIcon,
  TrophyIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';

const OFFER_TYPES = [
  'Percentage Discount',
  'Fixed Amount Off',
  'Buy One Get One',
  'Free Shipping',
  'Seasonal Sale',
  'Flash Sale',
  'Limited Time Offer',
  'First-Time Customer',
  'Loyalty Reward',
];

export default function Offers() {
  const location = useLocation();
  const navigate = useNavigate();
  const { businessId, businessName } = location.state || {};

  const [offers, setOffers] = useState([
    {
      id: 1,
      businessId: businessId,
      title: '50% Off on All Services',
      description: 'Get half price on all our premium services this month!',
      type: 'Percentage Discount',
      value: '50',
      code: 'SAVE50',
      validFrom: '2024-01-01',
      validUntil: '2024-01-31',
      isActive: true,
      terms: 'Valid for new customers only',
    },
    {
      id: 2,
      businessId: businessId,
      title: 'Free Delivery on Orders Above ₹500',
      description: 'No delivery charges for orders worth ₹500 or more',
      type: 'Free Shipping',
      value: '500',
      code: 'FREEDEL',
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      isActive: true,
      terms: 'Applicable on all areas',
    },
  ]);

  const [showOfferModal, setShowOfferModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);
  const [showTypeModal, setShowTypeModal] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    type: '',
    value: '',
    code: '',
    validFrom: '',
    validUntil: '',
    terms: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const closeModal = () => {
    setShowOfferModal(false);
    setShowTypeModal(false);
  };

  const openAddModal = () => {
    setEditingOffer(null);
    setForm({
      title: '',
      description: '',
      type: '',
      value: '',
      code: '',
      validFrom: '',
      validUntil: '',
      terms: '',
    });
    setShowOfferModal(true);
  };

  const openEditModal = (offer) => {
    setEditingOffer(offer);
    setForm({
      title: offer.title,
      description: offer.description,
      type: offer.type,
      value: offer.value,
      code: offer.code,
      validFrom: offer.validFrom,
      validUntil: offer.validUntil,
      terms: offer.terms || '',
    });
    setShowOfferModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.type || !form.validUntil) {
      alert('Please fill all required fields (Title, Type, Valid Until).');
      return;
    }

    if (editingOffer) {
      setOffers(offers.map(offer => 
        offer.id === editingOffer.id 
          ? { ...offer, ...form }
          : offer
      ));
      alert('Offer updated successfully!');
    } else {
      const newOffer = {
        id: Date.now(),
        businessId: businessId,
        ...form,
        isActive: true,
      };
      setOffers([newOffer, ...offers]);
      alert('Offer added successfully!');
    }

    closeModal();
  };

  const confirmDelete = (offer) => {
    setOfferToDelete(offer);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    setOffers(offers.filter(offer => offer.id !== offerToDelete.id));
    setShowDeleteConfirm(false);
    setOfferToDelete(null);
    alert('Offer deleted successfully!');
  };

  const toggleOfferStatus = (offerId) => {
    setOffers(offers.map(offer => 
      offer.id === offerId 
        ? { ...offer, isActive: !offer.isActive }
        : offer
    ));
  };

  const getOfferIcon = (type) => {
    const className = "w-5 h-5";
    switch (type) {
      case 'Percentage Discount': return <TagIcon className={className} />;
      case 'Fixed Amount Off': return <CurrencyDollarIcon className={className} />;
      case 'Buy One Get One': return <GiftIcon className={className} />;
      case 'Free Shipping': return <TruckIcon className={className} />;
      case 'Seasonal Sale': return <SunIcon className={className} />;
      case 'Flash Sale': return <BoltIcon className={className} />;
      case 'Limited Time Offer': return <ClockIcon className={className} />;
      case 'First-Time Customer': return <UserPlusIcon className={className} />;
      case 'Loyalty Reward': return <TrophyIcon className={className} />;
      default: return <TagIcon className={className} />;
    }
  };

  const OfferCard = ({ item }) => (
    <div className={`bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 border-l-4 ${item.isActive ? 'border-primary' : 'border-gray-400'}`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-start flex-1">
            <div className={`${item.isActive ? 'bg-primary/10' : 'bg-gray-100'} p-2.5 rounded-lg mr-3`}>
              <div className={item.isActive ? 'text-primary' : 'text-gray-400'}>
                {getOfferIcon(item.type)}
              </div>
            </div>
            <div className="flex-1">
              <h3 className={`text-base font-bold ${item.isActive ? 'text-gray-900' : 'text-gray-500'} mb-1`}>
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                {item.description}
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleOfferStatus(item.id)}
            className={`${item.isActive ? 'bg-green-500' : 'bg-gray-400'} text-white px-2 py-0.5 rounded-full text-xs font-semibold ml-2 hover:opacity-90 transition`}
          >
            {item.isActive ? 'Active' : 'Inactive'}
          </button>
        </div>

        {/* Offer Details */}
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <div className="grid grid-cols-2 gap-3 mb-2">
            <OfferInfoChip icon={<TagIcon className="w-3.5 h-3.5" />} label="Type" value={item.type} />
            {item.value && (
              <OfferInfoChip icon={<CurrencyDollarIcon className="w-3.5 h-3.5" />} label="Value" value={item.value} />
            )}
            {item.code && (
              <OfferInfoChip icon={<TagIcon className="w-3.5 h-3.5" />} label="Code" value={item.code} />
            )}
          </div>
          
          {item.validFrom && (
            <div className="flex items-center mb-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
              <span className="text-xs text-gray-600">
                Valid: {item.validFrom} to {item.validUntil}
              </span>
            </div>
          )}

          {item.terms && (
            <div className="flex items-start">
              <InformationCircleIcon className="w-3.5 h-3.5 text-gray-500 mr-1.5 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-gray-600">
                {item.terms}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1.5">
          <button
            onClick={() => openEditModal(item)}
            className="flex-1 bg-primary hover:bg-primaryHover text-white rounded-lg py-2 flex items-center justify-center gap-1.5 font-semibold text-xs transition"
          >
            <PencilIcon className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>

          <button
            onClick={() => confirmDelete(item)}
            className="flex-1 bg-red hover:bg-red text-white rounded-lg py-2 flex items-center justify-center gap-1.5 font-semibold text-xs transition"
          >
            <TrashIcon className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-4">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary font-semibold mb-2 hover:text-primaryHover transition text-xs"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            <span>Back</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-textDark">
                Offers & Discounts
              </h1>
              {businessName && (
                <p className="text-2xs text-textLight mt-0.5">
                  {businessName}
                </p>
              )}
            </div>
            <button
              onClick={openAddModal}
              className="bg-primary hover:bg-primaryHover text-white px-3 py-1.5 rounded-lg font-semibold transition flex items-center justify-center gap-1.5 self-start sm:self-auto text-xs"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Offer</span>
            </button>
          </div>
        </div>

        {/* Offers List */}
        {offers.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <TagIcon className="w-8 h-8 text-textLight mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-textDark mb-1.5">
              No offers yet
            </h3>
            <p className="text-2xs text-textLight mb-4">
              Create your first offer to attract more customers
            </p>
            <button
              onClick={openAddModal}
              className="bg-primary hover:bg-primaryHover text-white px-4 py-1.5 rounded-lg font-semibold transition text-xs"
            >
              Create Offer
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {offers.map(offer => <OfferCard key={offer.id} item={offer} />)}
          </div>
        )}
      </div>

      {/* Add/Edit Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  {editingOffer ? 'Edit Offer' : 'Create New Offer'}
                </h2>
                <p className="text-2xs text-gray-600">
                  {editingOffer ? 'Update offer details' : 'Add a special deal for customers'}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <Field
                label="Offer Title *"
                name="title"
                placeholder="e.g. 50% Off Summer Sale"
                value={form.title}
                onChange={handleChange}
              />

              <Field
                label="Description"
                name="description"
                placeholder="Describe your offer..."
                value={form.description}
                onChange={handleChange}
                multiline
              />

              {/* Offer Type Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1.5">
                  Offer Type *
                </label>
                <button
                  type="button"
                  onClick={() => setShowTypeModal(true)}
                  className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg flex items-center p-2.5 transition"
                >
                  <TagIcon className="w-4 h-4 text-gray-500" />
                  <span className={`flex-1 text-left ml-1.5 ${form.type ? 'text-gray-900' : 'text-gray-500'} text-sm`}>
                    {form.type || 'Select offer type'}
                  </span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <Field
                label="Value (%, Amount, or Min Order)"
                name="value"
                placeholder="e.g. 50 or 500"
                value={form.value}
                onChange={handleChange}
              />

              <Field
                label="Promo Code"
                name="code"
                placeholder="e.g. SAVE50"
                value={form.code}
                onChange={(e) => handleChange({ target: { name: 'code', value: e.target.value.toUpperCase() } })}
              />

              <Field
                label="Valid From (YYYY-MM-DD)"
                name="validFrom"
                placeholder="e.g. 2024-01-01"
                value={form.validFrom}
                onChange={handleChange}
              />

              <Field
                label="Valid Until (YYYY-MM-DD) *"
                name="validUntil"
                placeholder="e.g. 2024-12-31"
                value={form.validUntil}
                onChange={handleChange}
              />

              <Field
                label="Terms & Conditions"
                name="terms"
                placeholder="e.g. Valid for new customers only"
                value={form.terms}
                onChange={handleChange}
                multiline
              />

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primaryHover text-white px-4 py-2.5 rounded-lg font-semibold transition flex items-center justify-center gap-1.5 shadow-sm text-sm"
              >
                <CheckCircleIcon className="w-4 h-4" />
                <span>{editingOffer ? 'Update Offer' : 'Create Offer'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Offer Type Selection Modal */}
      {showTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden">
            <div className="p-3 border-b border-gray-200">
              <h3 className="text-base font-bold text-gray-900">Select Offer Type</h3>
            </div>
            <div className="overflow-y-auto max-h-[60vh]">
              {OFFER_TYPES.map((type, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setForm({ ...form, type });
                    setShowTypeModal(false);
                  }}
                  className={`w-full p-3 flex items-center transition ${
                    form.type === type ? 'bg-primary text-white' : 'hover:bg-gray-50'
                  } ${i < OFFER_TYPES.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className={form.type === type ? 'text-white' : 'text-primary'}>
                    {getOfferIcon(type)}
                  </div>
                  <span className={`ml-2.5 ${form.type === type ? 'text-white' : 'text-gray-900'} text-sm`}>
                    {type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-lg p-4 max-w-md w-full text-center">
            <div className="bg-red-100 rounded-full p-2.5 inline-block mb-3">
              <TrashIcon className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1.5">
              Delete Offer?
            </h3>
            <p className="text-2xs text-gray-600 mb-4">
              Are you sure you want to delete "<span className="font-semibold">{offerToDelete?.title}</span>"? This action cannot be undone.
            </p>

            <div className="space-y-1.5">
              <button
                onClick={handleDelete}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
              >
                Delete Offer
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

/* ---------- Reusable Components ---------- */

const Field = ({ label, name, placeholder, value, onChange, multiline }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-900 mb-1.5">
      {label}
    </label>
    {multiline ? (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition resize-y text-sm"
      />
    ) : (
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition text-sm"
      />
    )}
  </div>
);

const OfferInfoChip = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center mb-1">
      <div className="text-primary">{icon}</div>
      <span className="text-xs text-gray-600 ml-1 font-semibold">
        {label}
      </span>
    </div>
    <p className="text-xs text-gray-900 font-semibold truncate">
      {value}
    </p>
  </div>
);
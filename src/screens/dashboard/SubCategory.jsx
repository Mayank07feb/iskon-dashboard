import React, { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export default function SubCategory() {
  const { categoryId } = useParams();
  const location = useLocation();
  const category = location.state?.category;

  const [subCategories, setSubCategories] = useState(
    category?.subCategories || []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubCat, setNewSubCat] = useState("");

  const handleAddSubCat = () => {
    if (!newSubCat.trim()) return;

    const newSub = {
      id: Date.now(),
      name: newSubCat.trim(),
    };
    setSubCategories([...subCategories, newSub]);
    setNewSubCat("");
    setIsModalOpen(false); // Close modal
  };

  const handleDeleteSubCat = (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      setSubCategories(subCategories.filter((sub) => sub.id !== id));
    }
  };

  const handleEditSubCat = (id, currentName) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const handleSaveEdit = (id) => {
    if (!editValue.trim()) return;
    setSubCategories(
      subCategories.map((sub) =>
        sub.id === id ? { ...sub, name: editValue.trim() } : sub
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const filteredSubCategories = subCategories.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-screenBg min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-textDark mb-2">
            {category?.name || "Subcategories"}
          </h1>
          <p className="text-textMuted">
            Manage subcategories for this category
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover transition flex items-center gap-1"
          >
            <PlusIcon className="w-5 h-5" />
            Add Subcategory
          </button>
          <Link
            to="/categories"
            className="text-primary hover:bg-primary/10 font-medium px-4 py-2 rounded-lg transition inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textMuted w-5 h-5" />
        <input
          type="text"
          placeholder="Search subcategories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-12 py-3 border border-gray200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white text-textDark"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-textMuted hover:text-textLight transition"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Subcategories List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray200 overflow-hidden">
        {filteredSubCategories.length === 0 ? (
          <div className="p-12 text-center text-textMuted">
            <MagnifyingGlassIcon className="w-12 h-12 mx-auto mb-3 text-gray600" />
            <p className="text-lg font-medium">No subcategories found</p>
            <p className="text-sm mt-1">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Add your first subcategory to get started"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray200">
            {filteredSubCategories.map((sub) => (
              <div
                key={sub.id}
                className="p-4 hover:bg-secondaryHover transition"
              >
                {editingId === sub.id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 border border-gray200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit(sub.id);
                        else if (e.key === "Escape") handleCancelEdit();
                      }}
                    />
                    <button
                      onClick={() => handleSaveEdit(sub.id)}
                      className="bg-green text-white px-4 py-2 rounded-lg hover:bg-green/90 transition text-sm font-medium flex items-center gap-1"
                    >
                      <CheckIcon className="w-4 h-4" /> Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray600 text-white px-4 py-2 rounded-lg hover:bg-gray700 transition text-sm font-medium flex items-center gap-1"
                    >
                      <XMarkIcon className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-textDark text-lg">
                      {sub.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditSubCat(sub.id, sub.name)}
                        className="text-gray600 hover:text-primary p-2 hover:bg-primary/10 rounded-lg transition"
                        title="Edit subcategory"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubCat(sub.id)}
                        className="text-gray600 hover:text-red p-2 hover:bg-red/10 rounded-lg transition"
                        title="Delete subcategory"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue/10 border border-blue rounded-lg p-4">
          <p className="text-sm text-blue font-medium mb-1">
            Total Subcategories
          </p>
          <p className="text-3xl font-bold text-blue">{subCategories.length}</p>
        </div>
        <div className="bg-purple/10 border border-purple rounded-lg p-4">
          <p className="text-sm text-purple font-medium mb-1">
            {searchTerm ? "Filtered Results" : "Visible Items"}
          </p>
          <p className="text-3xl font-bold text-purple">
            {filteredSubCategories.length}
            {searchTerm && ` of ${subCategories.length}`}
          </p>
        </div>
      </div>

      {/* Add Subcategory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-textDark mb-4">
              Add New Subcategory
            </h2>
            <input
              type="text"
              placeholder="Enter subcategory name..."
              value={newSubCat}
              onChange={(e) => setNewSubCat(e.target.value)}
              className="w-full border border-gray200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleAddSubCat()}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray600 text-white hover:bg-gray700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubCat}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primaryHover transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
    <div className="max-w-6xl mx-auto px-3 sm:px-5 lg:px-6 py-4 bg-screenBg min-h-screen">
      {/* Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div className="flex-1">
          <h1 className="text-lg font-bold text-textDark">
            {category?.name || "Subcategories"}
          </h1>
          <p className="text-2xs text-textMuted">
            Manage subcategories for this category
          </p>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primaryHover transition flex items-center gap-1 text-xs"
          >
            <PlusIcon className="w-4 h-4" />
            Add Subcategory
          </button>
          <Link
            to="/categories"
            className="text-primary hover:bg-primary/10 font-medium px-3 py-1.5 rounded-md transition inline-flex items-center gap-1.5 text-xs"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            Back
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted w-4 h-4" />
        <input
          type="text"
          placeholder="Search subcategories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-9 py-2 border border-gray200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition bg-white text-textDark text-sm"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textMuted hover:text-textLight transition"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Subcategories List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray200 overflow-hidden">
        {filteredSubCategories.length === 0 ? (
          <div className="p-6 text-center text-textMuted">
            <MagnifyingGlassIcon className="w-8 h-8 mx-auto mb-2 text-gray600" />
            <p className="text-sm font-medium">No subcategories found</p>
            <p className="text-2xs mt-0.5">
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
                className="p-3 hover:bg-secondaryHover transition"
              >
                {editingId === sub.id ? (
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 border border-gray200 p-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit(sub.id);
                        else if (e.key === "Escape") handleCancelEdit();
                      }}
                    />
                    <button
                      onClick={() => handleSaveEdit(sub.id)}
                      className="bg-green text-white px-2 py-1 rounded-md hover:bg-green/90 transition text-xs font-medium flex items-center gap-1"
                    >
                      <CheckIcon className="w-3.5 h-3.5" /> Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray600 text-white px-2 py-1 rounded-md hover:bg-gray700 transition text-xs font-medium flex items-center gap-1"
                    >
                      <XMarkIcon className="w-3.5 h-3.5" /> Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-textDark text-sm">
                      {sub.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleEditSubCat(sub.id, sub.name)}
                        className="text-gray600 hover:text-primary p-1.5 hover:bg-primary/10 rounded-md transition"
                        title="Edit subcategory"
                      >
                        <PencilIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubCat(sub.id)}
                        className="text-gray600 hover:text-red p-1.5 hover:bg-red/10 rounded-md transition"
                        title="Delete subcategory"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
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
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-blue/10 border border-blue rounded-md p-3">
          <p className="text-xs text-blue font-medium mb-0.5">
            Total Subcategories
          </p>
          <p className="text-lg font-bold text-blue">{subCategories.length}</p>
        </div>
        <div className="bg-purple/10 border border-purple rounded-md p-3">
          <p className="text-xs text-purple font-medium mb-0.5">
            {searchTerm ? "Filtered Results" : "Visible Items"}
          </p>
          <p className="text-lg font-bold text-purple">
            {filteredSubCategories.length}
            {searchTerm && ` of ${subCategories.length}`}
          </p>
        </div>
      </div>

      {/* Add Subcategory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm">
            <h2 className="text-base font-bold text-textDark mb-3">
              Add New Subcategory
            </h2>
            <input
              type="text"
              placeholder="Enter subcategory name..."
              value={newSubCat}
              onChange={(e) => setNewSubCat(e.target.value)}
              className="w-full border border-gray200 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary mb-3 text-sm"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleAddSubCat()}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 rounded-md bg-gray600 text-white hover:bg-gray700 transition text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubCat}
                className="px-3 py-1.5 rounded-md bg-primary text-white hover:bg-primaryHover transition text-xs"
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
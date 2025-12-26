import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  ChevronRightIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { id: 1, name: "Career Guidance", subCategories: [] },
    { id: 2, name: "Finance Guidance", subCategories: [] },
    { id: 3, name: "Baby Care Guidance", subCategories: [] },
    { id: 4, name: "Health Guidance", subCategories: [] },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Add category
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const newCat = {
      id: Date.now(),
      name: newCategory.trim(),
      subCategories: []
    };
    setCategories([...categories, newCat]);
    setNewCategory("");
    setIsModalOpen(false); // Close modal after adding
  };

  // Edit category
  const handleEditCategory = (id, currentName) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const handleSaveEdit = (id) => {
    if (!editValue.trim()) return;
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, name: editValue.trim() } : cat
    ));
    setEditingId(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalSubCategories = () => {
    return categories.reduce((sum, cat) => sum + (cat.subCategories?.length || 0), 0);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-screenBg min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-textDark mb-1">Categories Management</h1>
          <p className="text-2xs text-textMuted">Organize and manage your guidance categories</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover transition flex items-center gap-1.5 font-medium text-xs shadow-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted w-4 h-4" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition bg-white text-textDark text-sm"
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
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray200 overflow-hidden">
        {filteredCategories.length === 0 ? (
          <div className="p-8 text-center text-textMuted">
            <MagnifyingGlassIcon className="w-8 h-8 mx-auto mb-2 text-gray600" />
            <p className="text-sm font-medium">No categories found</p>
            <p className="text-2xs mt-0.5">
              {searchTerm ? "Try adjusting your search terms" : "Add your first category to get started"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray200">
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="p-3 hover:bg-secondaryHover transition">
                {editingId === cat.id ? (
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 border border-gray200 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveEdit(cat.id)}
                      className="bg-green text-white px-3 py-1.5 rounded-lg hover:bg-green/90 transition text-xs font-medium flex items-center gap-1"
                    >
                      <CheckIcon className="w-3.5 h-3.5" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray600 text-white px-3 py-1.5 rounded-lg hover:bg-gray700 transition text-xs font-medium flex items-center gap-1"
                    >
                      <XMarkIcon className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-textDark text-base">{cat.name}</span>
                      <span className="text-2xs text-gray600 bg-secondary px-2 py-0.5 rounded-full whitespace-nowrap">
                        {cat.subCategories?.length || 0} subcategories
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleEditCategory(cat.id, cat.name)}
                        className="text-gray600 hover:text-primary p-1.5 hover:bg-primary/10 rounded-lg transition"
                        title="Edit category"
                      >
                        <PencilIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-gray600 hover:text-red p-1.5 hover:bg-red/10 rounded-lg transition"
                        title="Delete category"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigate(`/categories/${cat.id}/subcategories`, { state: { category: cat } })}
                        className="text-primary font-medium hover:bg-primary/10 px-3 py-1.5 rounded-lg transition flex items-center gap-1 whitespace-nowrap text-xs"
                      >
                        View Subcategories
                        <ChevronRightIcon className="w-3.5 h-3.5" />
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
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-blue/10 border border-blue rounded-lg p-3">
          <p className="text-2xs text-blue font-medium mb-1">Total Categories</p>
          <p className="text-2xl font-bold text-blue">{categories.length}</p>
        </div>
        <div className="bg-green/10 border border-green rounded-lg p-3">
          <p className="text-2xs text-green font-medium mb-1">Total Subcategories</p>
          <p className="text-2xl font-bold text-green">{getTotalSubCategories()}</p>
        </div>
        <div className="bg-purple/10 border border-purple rounded-lg p-3">
          <p className="text-2xs text-purple font-medium mb-1">Filtered Results</p>
          <p className="text-2xl font-bold text-purple">{filteredCategories.length}</p>
        </div>
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3">
          <div className="bg-white rounded-lg shadow p-4 w-full max-w-md">
            <h2 className="text-base font-bold text-textDark mb-3">Add New Category</h2>
            <input
              type="text"
              placeholder="Enter category name..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border border-gray200 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary mb-3 text-sm"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-gray600 text-white hover:bg-gray700 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primaryHover transition text-sm"
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
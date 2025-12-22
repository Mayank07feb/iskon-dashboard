import React, { useState } from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const JOB_DEPARTMENTS = [
  "Technology & IT",
  "Healthcare & Medical",
  "Business & Finance",
  "Creative Arts & Design",
  "Education & Training",
  "Engineering",
  "Customer Service & Support",
  "Skilled Trades",
  "Legal & Law Enforcement",
  "Hospitality & Food Services",
  "Science & Research",
  "Transportation & Logistics",
  "Marketing & Communications",
  "Sales & Retail",
  "Government & Public Sector",
];

export default function CreateJob() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    description: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.department ||
      !formData.location ||
      !formData.jobType
    ) {
      alert(
        "Please fill all required fields (Title, Department, Location, Job Type)."
      );
      return;
    }

    console.log("Create Job Data:", formData);
    // API call here

    setShowSuccessModal(true);

    setFormData({
      title: "",
      department: "",
      location: "",
      jobType: "",
      experience: "",
      salary: "",
      description: "",
      status: "Active",
    });

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <Link
            to="/jobs"
            className="flex items-center gap-2 text-primary font-semibold mb-4 hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Jobs
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <BriefcaseIcon className="w-6 h-6 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-textDark">
              Create Job
            </h1>
          </div>
          <p className="text-sm text-textLight">Add a new job opening</p>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                <BriefcaseIcon className="w-5 h-5 text-primary" />
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. Senior Software Developer"
              />
            </div>

            {/* Department */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                <AcademicCapIcon className="w-5 h-5 text-primary" />
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">Select department</option>
                {JOB_DEPARTMENTS.map((dept, i) => (
                  <option key={i} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                <MapPinIcon className="w-5 h-5 text-primary" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. Vrindavan, Delhi"
              />
            </div>

            {/* Job Type & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-textDark">
                  Job Type *
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">Select job type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-textDark">
                  Experience Required
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. 2-4 Years"
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                <CurrencyRupeeIcon className="w-5 h-5 text-primary" />
                Salary (Optional)
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. ₹40,000 – ₹60,000"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-textDark">
                <ClipboardDocumentListIcon className="w-5 h-5 text-primary" />
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none resize-y"
                placeholder="Describe responsibilities, skills, and expectations..."
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-textDark">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray200 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primaryHover w-full sm:w-auto"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal (NO animation) */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-11/12 text-center shadow-2xl">
            <CheckCircleIcon className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-textDark mb-2">
              Job Posted Successfully! 🎉
            </h3>
            <p className="text-textLight text-sm">
              Your job listing is now live
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

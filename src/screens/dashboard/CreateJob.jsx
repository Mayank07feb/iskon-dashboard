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
      <div className="max-w-4xl mx-auto px-3 sm:px-5 lg:px-6 py-4 space-y-4">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4">
          <Link
            to="/jobs"
            className="flex items-center gap-1.5 text-primary font-semibold mb-3 hover:underline text-sm"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            Back to Jobs
          </Link>

          <div className="flex items-center gap-2 mb-1.5">
            <BriefcaseIcon className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-textDark">
              Create Job
            </h1>
          </div>
          <p className="text-2xs text-textLight">Add a new job opening</p>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Job Title */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                <BriefcaseIcon className="w-4 h-4 text-primary" />
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                placeholder="e.g. Senior Software Developer"
              />
            </div>

            {/* Department */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                <AcademicCapIcon className="w-4 h-4 text-primary" />
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
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
              <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                <MapPinIcon className="w-4 h-4 text-primary" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                placeholder="e.g. Vrindavan, Delhi"
              />
            </div>

            {/* Job Type & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-textDark">
                  Job Type *
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                  className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
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
                <label className="text-xs font-medium text-textDark">
                  Experience Required
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  placeholder="e.g. 2-4 Years"
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                <CurrencyRupeeIcon className="w-4 h-4 text-primary" />
                Salary (Optional)
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                placeholder="e.g. ₹40,000 – ₹60,000"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-textDark">
                <ClipboardDocumentListIcon className="w-4 h-4 text-primary" />
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none resize-y text-sm"
                placeholder="Describe responsibilities, skills, and expectations..."
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-medium text-textDark">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-gray200 px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Submit */}
            <div className="pt-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-white font-medium hover:bg-primaryHover w-full sm:w-auto text-sm"
              >
                <CheckCircleIcon className="w-4 h-4" />
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal (NO animation) */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-11/12 text-center shadow-lg">
            <CheckCircleIcon className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="text-base font-bold text-textDark mb-1.5">
              Job Posted Successfully! 🎉
            </h3>
            <p className="text-textLight text-xs">
              Your job listing is now live
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
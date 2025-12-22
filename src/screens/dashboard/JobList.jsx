import React, { useState } from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

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

export default function JobList() {
  const navigate = useNavigate();

  // Sample jobs data
  const [jobs] = useState([
    {
      id: 1,
      title: "Senior Software Developer",
      department: "Technology & IT",
      location: "Vrindavan",
      jobType: "Full Time",
      experience: "3-5 Years",
      salary: "₹60,000 – ₹90,000",
      description:
        "Looking for an experienced developer with React Native and Node.js expertise.",
      status: "Active",
    },
    {
      id: 2,
      title: "School Counsellor",
      department: "Education & Training",
      location: "Delhi",
      jobType: "Full Time",
      experience: "2-4 Years",
      salary: "₹40,000 – ₹60,000",
      description:
        "Guidance counsellor needed for student support and career planning.",
      status: "Active",
    },
    {
      id: 3,
      title: "Marketing Manager",
      department: "Marketing & Communications",
      location: "Mumbai",
      jobType: "Full Time",
      experience: "5-7 Years",
      salary: "₹80,000 – ₹120,000",
      description:
        "Lead marketing campaigns and strategy for growing tech startup.",
      status: "Active",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    department: "",
  });

  const jobTypes = ["Full Time", "Part Time", "Contract", "Internship", "Freelance"];

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      jobType: "",
      experience: "",
      salary: "",
      department: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesJobType = !filters.jobType || job.jobType === filters.jobType;
    const matchesExperience =
      !filters.experience ||
      job.experience.toLowerCase().includes(filters.experience.toLowerCase());
    const matchesSalary =
      !filters.salary ||
      job.salary.toLowerCase().includes(filters.salary.toLowerCase());
    const matchesDepartment =
      !filters.department || job.department === filters.department;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType &&
      matchesExperience &&
      matchesSalary &&
      matchesDepartment
    );
  });

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <BriefcaseIcon className="w-7 h-7 text-primary" />
              <h1 className="text-2xl sm:text-3xl font-bold text-textDark">Jobs</h1>
            </div>
            <Link
              to="/my-jobs"
              className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center gap-2 text-sm"
            >
              <BriefcaseIcon className="w-4 h-4" />
              My Jobs
            </Link>
          </div>
          <p className="text-sm text-textLight">Browse available job openings</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textLight" />
              <input
                type="text"
                placeholder="Search jobs by title or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                showFilters
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-textDark hover:bg-gray-200"
              }`}
            >
              <FunnelIcon className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.values(filters).filter((v) => v !== "").length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Department Filter */}
                <div>
                  <label className="block text-xs font-semibold text-textLight mb-2">
                    Department
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) => handleFilterChange("department", e.target.value)}
                    className="w-full px-3 py-2 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  >
                    <option value="">All departments</option>
                    {JOB_DEPARTMENTS.map((dept, i) => (
                      <option key={i} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-xs font-semibold text-textLight mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi, Mumbai"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    className="w-full px-3 py-2 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  />
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-xs font-semibold text-textLight mb-2">
                    Job Type
                  </label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange("jobType", e.target.value)}
                    className="w-full px-3 py-2 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  >
                    <option value="">All types</option>
                    {jobTypes.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-xs font-semibold text-textLight mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2-4 Years"
                    value={filters.experience}
                    onChange={(e) => handleFilterChange("experience", e.target.value)}
                    className="w-full px-3 py-2 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  />
                </div>

                {/* Salary Filter */}
                <div>
                  <label className="block text-xs font-semibold text-textLight mb-2">
                    Salary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 40000"
                    value={filters.salary}
                    onChange={(e) => handleFilterChange("salary", e.target.value)}
                    className="w-full px-3 py-2 border border-gray200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  />
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center gap-2"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-textLight">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
        </p>

        {/* Job List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-12 text-center">
              <BriefcaseIcon className="w-12 h-12 text-textLight mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-textDark mb-2">
                No jobs found
              </h3>
              <p className="text-sm text-textLight">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate("/job-details", { state: { job } })}
                className="bg-white shadow rounded-lg p-5 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-textDark mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-textLight mb-3">{job.department}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      job.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-textLight">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BriefcaseIcon className="w-4 h-4" />
                    <span>{job.jobType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{job.experience}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-1">
                      <CurrencyRupeeIcon className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>

                {/* View Details Arrow */}
                <div className="flex items-center justify-end mt-3 text-primary font-semibold text-sm">
                  <span className="mr-1">View Details</span>
                  <ChevronDownIcon className="w-4 h-4 transform -rotate-90" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating Action Button */}
        <Link
          to="/create-job"
          className="fixed bottom-6 right-6 bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:bg-primaryHover transition flex items-center justify-center hover:scale-110 transform"
        >
          <PlusIcon className="w-7 h-7" />
        </Link>
      </div>
    </div>
  );
}
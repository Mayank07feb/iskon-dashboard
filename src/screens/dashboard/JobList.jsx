import React, { useState } from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
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
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-4 space-y-4">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-bold text-textDark">Jobs</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/create-job"
                className="bg-primary text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center gap-1 text-xs"
              >
                <BriefcaseIcon className="w-3.5 h-3.5" />
                Add Job
              </Link>
              <Link
                to="/my-jobs"
                className="bg-gray-100 text-textDark px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center gap-1 text-xs"
              >
                <BriefcaseIcon className="w-3.5 h-3.5" />
                My Jobs
              </Link>
            </div>
          </div>
          <p className="text-2xs text-textLight">Browse available job openings</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white shadow rounded-lg p-3">
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textLight" />
              <input
                type="text"
                placeholder="Search jobs by title or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition text-xs ${
                showFilters
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-textDark hover:bg-gray-200"
              }`}
            >
              <FunnelIcon className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {Object.values(filters).filter((v) => v !== "").length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Department Filter */}
                <div>
                  <label className="block text-2xs font-semibold text-textLight mb-1">
                    Department
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) => handleFilterChange("department", e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-xs"
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
                  <label className="block text-2xs font-semibold text-textLight mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi, Mumbai"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-xs"
                  />
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-2xs font-semibold text-textLight mb-1">
                    Job Type
                  </label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange("jobType", e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-xs"
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
                  <label className="block text-2xs font-semibold text-textLight mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2-4 Years"
                    value={filters.experience}
                    onChange={(e) => handleFilterChange("experience", e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-xs"
                  />
                </div>

                {/* Salary Filter */}
                <div>
                  <label className="block text-2xs font-semibold text-textLight mb-1">
                    Salary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 40000"
                    value={filters.salary}
                    onChange={(e) => handleFilterChange("salary", e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray200 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-xs"
                  />
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full bg-red-500 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center gap-1 text-xs"
                    >
                      <XMarkIcon className="w-3 h-3" />
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-2xs text-textLight">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
        </p>

        {/* Job List */}
        <div className="space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <BriefcaseIcon className="w-8 h-8 text-textLight mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-textDark mb-1.5">
                No jobs found
              </h3>
              <p className="text-2xs text-textLight">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate("/job-details", { state: { job } })}
                className="bg-white shadow rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-textDark mb-1">
                      {job.title}
                    </h3>
                    <p className="text-xs text-textLight mb-2">{job.department}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      job.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 text-xs text-textLight mb-2">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-3 h-3" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BriefcaseIcon className="w-3 h-3" />
                    <span>{job.jobType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" />
                    <span>{job.experience}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-1">
                      <CurrencyRupeeIcon className="w-3 h-3" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>

                {/* View Details Arrow */}
                <div className="flex items-center justify-end mt-2 text-primary font-semibold text-xs">
                  <span className="mr-1">View Details</span>
                  <ChevronDownIcon className="w-3 h-3 transform -rotate-90" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  UsersIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

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

export default function MyJobs() {
  const [myJobs, setMyJobs] = useState([
    {
      id: 1,
      title: "Senior Software Developer",
      department: "Technology & IT",
      location: "Vrindavan",
      jobType: "Full Time",
      experience: "3-5 Years",
      salary: "₹60,000 – ₹90,000",
      description: "Looking for an experienced developer with React Native and Node.js expertise.",
      status: "Active",
      applicants: 12,
      postedDate: "Dec 15, 2024",
    },
    {
      id: 2,
      title: "School Counsellor",
      department: "Education & Training",
      location: "Delhi",
      jobType: "Full Time",
      experience: "2-4 Years",
      salary: "₹40,000 – ₹60,000",
      description: "Guidance counsellor needed for student support.",
      status: "Active",
      applicants: 8,
      postedDate: "Dec 18, 2024",
    },
  ]);

  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    description: "",
    status: "Active",
  });

  const jobTypes = ["Full Time", "Part Time", "Contract", "Internship", "Freelance"];
  const statuses = ["Active", "Inactive"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const openAddModal = () => {
    setEditingJob(null);
    setForm({
      title: "",
      department: "",
      location: "",
      jobType: "",
      experience: "",
      salary: "",
      description: "",
      status: "Active",
    });
    setShowJobModal(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      jobType: job.jobType,
      experience: job.experience,
      salary: job.salary,
      description: job.description,
      status: job.status,
    });
    setShowJobModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.department || !form.location || !form.jobType) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingJob) {
      // Update existing job
      setMyJobs(myJobs.map(job => 
        job.id === editingJob.id 
          ? { ...job, ...form }
          : job
      ));
      alert("Job updated successfully!");
    } else {
      // Add new job
      const newJob = {
        id: Date.now(),
        ...form,
        applicants: 0,
        postedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };
      setMyJobs([newJob, ...myJobs]);
      alert("Job posted successfully!");
    }

    setShowJobModal(false);
  };

  const confirmDelete = (job) => {
    setJobToDelete(job);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    setMyJobs(myJobs.filter(job => job.id !== jobToDelete.id));
    setShowDeleteConfirm(false);
    setJobToDelete(null);
    alert("Job deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-4">
        
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-textDark">My Jobs</h1>
            <p className="text-2xs text-textLight mt-0.5">Manage your job postings</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center gap-1.5 text-xs"
          >
            <PlusIcon className="w-4 h-4" />
            Add Job
          </button>
        </div>

        {/* Jobs List */}
        {myJobs.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <BriefcaseIcon className="w-8 h-8 text-textLight mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-textDark mb-1.5">No jobs posted yet</h3>
            <p className="text-2xs text-textLight mb-4">Start by posting your first job</p>
            <button
              onClick={openAddModal}
              className="bg-primary text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-primaryHover transition text-xs"
            >
              Post a Job
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {myJobs.map((job) => (
              <div key={job.id} className="bg-white shadow rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-textDark mb-1">{job.title}</h3>
                    <p className="text-xs text-textLight mb-2">{job.department}</p>
                    
                    <div className="flex flex-wrap gap-3 text-xs text-textLight">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-3 h-3" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BriefcaseIcon className="w-3 h-3" />
                        <span>{job.jobType}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{job.postedDate}</span>
                      </div>
                    </div>
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

                {/* Applicants */}
                <div className="bg-gray-50 rounded-lg p-2.5 mb-3 flex items-center gap-1.5">
                  <UsersIcon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-textDark">
                    {job.applicants} Applicants
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5">
                  <button
                    onClick={() => openEditModal(job)}
                    className="flex-1 bg-primary text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center justify-center gap-1.5 text-xs"
                  >
                    <PencilIcon className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(job)}
                    className="flex-1 bg-red text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-1.5 text-xs"
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add/Edit Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-textDark">
                  {editingJob ? "Edit Job" : "Add New Job"}
                </h2>
                <p className="text-2xs text-textLight">
                  {editingJob ? "Update job details" : "Fill in job information"}
                </p>
              </div>
              <button
                onClick={() => setShowJobModal(false)}
                className="text-textDark hover:text-primary transition"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-textDark mb-1.5">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  placeholder="e.g. Senior Software Developer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textDark mb-1.5">
                  Department *
                </label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                >
                  <option value="">Select department</option>
                  {JOB_DEPARTMENTS.map((dept, i) => (
                    <option key={i} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-textDark mb-1.5">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  placeholder="e.g. Vrindavan, Delhi"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textDark mb-1.5">
                    Job Type *
                  </label>
                  <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  >
                    <option value="">Select</option>
                    {jobTypes.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textDark mb-1.5">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                    placeholder="e.g. 2-4 Years"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-textDark mb-1.5">
                  Salary (Optional)
                </label>
                <input
                  type="text"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  placeholder="e.g. ₹40,000 – ₹60,000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textDark mb-1.5">
                  Job Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none resize-y text-sm"
                  placeholder="Describe responsibilities, skills, expectations..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textDark mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                >
                  {statuses.map((status, i) => (
                    <option key={i} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center justify-center gap-1.5 text-sm"
              >
                <CheckCircleIcon className="w-4 h-4" />
                {editingJob ? "Update Job" : "Post Job"}
              </button>
            </form>
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
            <h3 className="text-base font-bold text-textDark mb-1.5">Delete Job?</h3>
            <p className="text-2xs text-textLight mb-4">
              Are you sure you want to delete "<span className="font-semibold">{jobToDelete?.title}</span>"? 
              This action cannot be undone.
            </p>

            <div className="space-y-1.5">
              <button
                onClick={handleDelete}
                className="w-full bg-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition text-sm"
              >
                Delete Job
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full bg-gray-100 text-textDark px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition text-sm"
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
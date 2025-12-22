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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-5 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-textDark">My Jobs</h1>
            <p className="text-sm text-textLight mt-1">Manage your job postings</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Job
          </button>
        </div>

        {/* Jobs List */}
        {myJobs.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <BriefcaseIcon className="w-12 h-12 text-textLight mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-textDark mb-2">No jobs posted yet</h3>
            <p className="text-sm text-textLight mb-6">Start by posting your first job</p>
            <button
              onClick={openAddModal}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primaryHover transition"
            >
              Post a Job
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {myJobs.map((job) => (
              <div key={job.id} className="bg-white shadow rounded-lg p-5 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-textDark mb-1">{job.title}</h3>
                    <p className="text-sm text-textLight mb-3">{job.department}</p>
                    
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
                        <CalendarIcon className="w-4 h-4" />
                        <span>{job.postedDate}</span>
                      </div>
                    </div>
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

                {/* Applicants */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4 flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-textDark">
                    {job.applicants} Applicants
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(job)}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center justify-center gap-2 text-sm"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(job)}
                    className="flex-1 bg-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <TrashIcon className="w-4 h-4" />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-textDark">
                  {editingJob ? "Edit Job" : "Add New Job"}
                </h2>
                <p className="text-sm text-textLight">
                  {editingJob ? "Update job details" : "Fill in job information"}
                </p>
              </div>
              <button
                onClick={() => setShowJobModal(false)}
                className="text-textDark hover:text-primary transition"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. Senior Software Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Department *
                </label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
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
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. Vrindavan, Delhi"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-textDark mb-2">
                    Job Type *
                  </label>
                  <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
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
                  <label className="block text-sm font-semibold text-textDark mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="e.g. 2-4 Years"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Salary (Optional)
                </label>
                <input
                  type="text"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. ₹40,000 – ₹60,000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Job Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none resize-y"
                  placeholder="Describe responsibilities, skills, expectations..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
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
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryHover transition flex items-center justify-center gap-2"
              >
                <CheckCircleIcon className="w-5 h-5" />
                {editingJob ? "Update Job" : "Post Job"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
            <div className="bg-red-100 rounded-full p-3 inline-block mb-4">
              <TrashIcon className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-textDark mb-2">Delete Job?</h3>
            <p className="text-sm text-textLight mb-6">
              Are you sure you want to delete "<span className="font-semibold">{jobToDelete?.title}</span>"? 
              This action cannot be undone.
            </p>

            <div className="space-y-2">
              <button
                onClick={handleDelete}
                className="w-full bg-red text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Delete Job
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full bg-gray-100 text-textDark px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition"
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
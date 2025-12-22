import React, { useState } from "react";
import {
  ArrowLeftIcon,
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  SparklesIcon,
  GiftIcon,
  CalendarIcon,
  BookmarkIcon,
  ShareIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function JobDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {};

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen bg-screenBg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-textDark mb-4">
            Job not found
          </h2>
          <Link to="/jobs" className="text-primary font-semibold hover:underline">
            ← Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    setShowApplyModal(false);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/jobs");
    }, 2000);
  };

  const handleShare = () => {
    alert("Share functionality will be implemented here");
  };

  const handleSave = () => {
    alert("Job saved successfully");
  };

  return (
    <div className="min-h-screen bg-screenBg pb-12">
      {/* Header */}
      <div className="bg-primary text-white pt-8 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 font-semibold hover:underline mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Jobs
          </Link>

          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                {job.title}
              </h1>
              <p className="opacity-90">{job.department}</p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                job.status === "Active"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {job.status}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-6">
        {/* Info */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <InfoItem icon={<MapPinIcon className="w-5 h-5" />} label="Location" value={job.location} />
            <InfoItem icon={<BriefcaseIcon className="w-5 h-5" />} label="Job Type" value={job.jobType} />
            <InfoItem icon={<ClockIcon className="w-5 h-5" />} label="Experience" value={job.experience} />
            {job.salary && (
              <InfoItem icon={<CurrencyRupeeIcon className="w-5 h-5" />} label="Salary" value={job.salary} />
            )}
          </div>
        </div>

        {/* Description */}
        <Section icon={DocumentTextIcon} title="Job Description">
          {job.description || "No description available."}
        </Section>

        {/* Responsibilities */}
        <Section icon={CheckCircleIcon} title="Key Responsibilities">
          <BulletPoint text="Provide guidance and support to students" />
          <BulletPoint text="Develop counseling programs" />
          <BulletPoint text="Maintain student records" />
          <BulletPoint text="Work with parents and teachers" />
        </Section>

        {/* Requirements */}
        <Section icon={SparklesIcon} title="Requirements">
          <BulletPoint text="Bachelor's degree in relevant field" />
          <BulletPoint text="Good communication skills" />
          <BulletPoint text="Relevant experience preferred" />
        </Section>

        {/* Benefits */}
        <Section icon={GiftIcon} title="Benefits">
          <BulletPoint text="Attractive salary" />
          <BulletPoint text="Health insurance" />
          <BulletPoint text="Paid leaves" />
        </Section>

        {/* Posted Date */}
        <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-2 mb-6">
          <CalendarIcon className="w-5 h-5 text-textLight" />
          <span className="text-sm text-textLight">
            Posted on December 20, 2024
          </span>
        </div>

        {/* Apply Section (NON-FLOATING) */}
        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              className="bg-gray-100 text-primary px-5 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              <BookmarkIcon className="w-5 h-5 inline mr-2" />
              Save Job
            </button>

            <button
              onClick={handleShare}
              className="bg-gray-100 text-primary px-5 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              <ShareIcon className="w-5 h-5 inline mr-2" />
              Share
            </button>

            <button
              onClick={() => setShowApplyModal(true)}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryHover"
            >
              <PaperAirplaneIcon className="w-5 h-5 inline mr-2" />
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <Modal>
          <h3 className="text-2xl font-bold mb-4">Apply for this job?</h3>
          <p className="mb-6 text-textLight">
            Your profile will be shared with the employer.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleApply}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
            >
              Confirm Application
            </button>
            <button
              onClick={() => setShowApplyModal(false)}
              className="w-full bg-gray-100 py-3 rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <Modal>
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Application Submitted</h3>
          <p className="text-textLight">Good luck! 🎉</p>
        </Modal>
      )}
    </div>
  );
}

/* ---------- Components ---------- */

const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-xl shadow p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-6 h-6 text-primary" />
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    <ul className="space-y-3">{children}</ul>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center gap-2 text-textLight mb-1">
      {icon}
      <span className="text-xs font-semibold uppercase">{label}</span>
    </div>
    <p className="ml-7 font-semibold">{value}</p>
  </div>
);

const BulletPoint = ({ text }) => (
  <li className="flex gap-3">
    <span className="w-2 h-2 bg-primary rounded-full mt-2" />
    <span>{text}</span>
  </li>
);

const Modal = ({ children }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
      {children}
    </div>
  </div>
);

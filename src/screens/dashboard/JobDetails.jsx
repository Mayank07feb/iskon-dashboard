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
      <div className="min-h-screen bg-screenBg flex items-center justify-center p-3">
        <div className="text-center">
          <h2 className="text-lg font-bold text-textDark mb-3">
            Job not found
          </h2>
          <Link to="/jobs" className="text-primary font-semibold hover:underline text-sm">
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
    <div className="min-h-screen bg-screenBg pb-8">
      {/* Header */}
      <div className="bg-primary text-white pt-6 pb-8 px-3">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 font-semibold hover:underline mb-4 text-xs"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            Back to Jobs
          </Link>

          <div className="flex justify-between items-start gap-3">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5">
                {job.title}
              </h1>
              <p className="opacity-90 text-xs">{job.department}</p>
            </div>

            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
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
      <div className="max-w-5xl mx-auto px-3 -mt-5">
        {/* Info */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <InfoItem icon={<MapPinIcon className="w-4 h-4" />} label="Location" value={job.location} />
            <InfoItem icon={<BriefcaseIcon className="w-4 h-4" />} label="Job Type" value={job.jobType} />
            <InfoItem icon={<ClockIcon className="w-4 h-4" />} label="Experience" value={job.experience} />
            {job.salary && (
              <InfoItem icon={<CurrencyRupeeIcon className="w-4 h-4" />} label="Salary" value={job.salary} />
            )}
          </div>
        </div>

        {/* Description */}
        <Section icon={DocumentTextIcon} title="Job Description">
          <p className="text-sm text-textDark leading-relaxed">
            {job.description || "No description available."}
          </p>
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
        <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-1.5 mb-4">
          <CalendarIcon className="w-4 h-4 text-textLight" />
          <span className="text-xs text-textLight">
            Posted on December 20, 2024
          </span>
        </div>

        {/* Apply Section (NON-FLOATING) */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              className="bg-gray-100 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 text-sm flex items-center justify-center gap-1.5"
            >
              <BookmarkIcon className="w-4 h-4" />
              Save Job
            </button>

            <button
              onClick={handleShare}
              className="bg-gray-100 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 text-sm flex items-center justify-center gap-1.5"
            >
              <ShareIcon className="w-4 h-4" />
              Share
            </button>

            <button
              onClick={() => setShowApplyModal(true)}
              className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primaryHover text-sm flex items-center justify-center gap-1.5"
            >
              <PaperAirplaneIcon className="w-4 h-4" />
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <Modal>
          <h3 className="text-base font-bold mb-3">Apply for this job?</h3>
          <p className="mb-4 text-textLight text-sm">
            Your profile will be shared with the employer.
          </p>

          <div className="space-y-2">
            <button
              onClick={handleApply}
              className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm"
            >
              Confirm Application
            </button>
            <button
              onClick={() => setShowApplyModal(false)}
              className="w-full bg-gray-100 py-2.5 rounded-lg font-semibold text-sm"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <Modal>
          <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-base font-bold mb-1.5">Application Submitted</h3>
          <p className="text-textLight text-sm">Good luck! 🎉</p>
        </Modal>
      )}
    </div>
  );
}

/* ---------- Components ---------- */

const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-lg shadow p-4 mb-4">
    <div className="flex items-center gap-2.5 mb-3">
      <Icon className="w-5 h-5 text-primary" />
      <h2 className="text-base font-bold">{title}</h2>
    </div>
    <ul className="space-y-2">{children}</ul>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center gap-1.5 text-textLight mb-1">
      {icon}
      <span className="text-2xs font-semibold uppercase">{label}</span>
    </div>
    <p className="ml-5.5 font-semibold text-sm">{value}</p>
  </div>
);

const BulletPoint = ({ text }) => (
  <li className="flex gap-2.5 text-sm">
    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
    <span>{text}</span>
  </li>
);

const Modal = ({ children }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
    <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
      {children}
    </div>
  </div>
);
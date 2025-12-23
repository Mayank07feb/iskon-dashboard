import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const requests = [
  { id: 1, devotee: "Rajesh Kumar", phone: "+91 98765 43210", type: "Career Guidance", status: "Pending", requestedOn: "2025-10-12", message: "Need guidance on career switch to IT field" },
  { id: 2, devotee: "Priya Sharma", phone: "+91 98765 43211", type: "Financial Guidance", status: "Accepted", requestedOn: "2025-10-14", message: "Help with investment planning" },
  { id: 3, devotee: "Amit Patel", phone: "+91 98765 43212", type: "Baby Care Guidance", status: "Pending", requestedOn: "2025-10-13", message: "First time parent, need guidance" },
  { id: 4, devotee: "Sneha Reddy", phone: "+91 98765 43213", type: "Health Guidance", status: "Rejected", requestedOn: "2025-10-11", message: "Looking for diet advice" },
  { id: 5, devotee: "Vikram Singh", phone: "+91 98765 43214", type: "Career Guidance", status: "Completed", requestedOn: "2025-10-10", message: "MBA vs Job dilemma" },
  { id: 6, devotee: "Anita Desai", phone: "+91 98765 43215", type: "Financial Guidance", status: "Pending", requestedOn: "2025-10-15", message: "Debt management guidance needed" },
];

export default function GuidanceRequests() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.devotee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.phone.includes(searchTerm);
    const matchesType = filterType === "All" || req.type === filterType;
    const matchesStatus = filterStatus === "All" || req.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green text-white";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red text-white";
      case "Completed":
        return "bg-blue text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAccept = (id) => {
    alert(`Request ${id} accepted. Chat initiated.`);
  };

  const handleReject = (id) => {
    alert(`Request ${id} rejected.`);
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-textDark">Guidance Requests</h1>
          <p className="text-sm text-textLight">
            Manage guidance requests from devotees
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-textLabel">Search</label>
              <div className="relative mt-1">
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-textMuted" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search devotee or phone"
                  className="pl-10 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-textLabel">
                Guidance Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="mt-1 w-full border rounded-md py-2 px-3"
              >
                <option>All</option>
                <option>Career Guidance</option>
                <option>Financial Guidance</option>
                <option>Baby Care Guidance</option>
                <option>Health Guidance</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-textLabel">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="mt-1 w-full border rounded-md py-2 px-3"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Accepted</option>
                <option>Rejected</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray200">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase">
                  Devotee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray200">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-secondaryHover">
                  <td className="px-6 py-4">
                    <div className="font-medium text-textDark">
                      {req.devotee}
                    </div>
                    <div className="text-sm text-textLight">
                      {req.phone}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
                      {req.type}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-textLight max-w-xs truncate">
                    {req.message}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        req.status
                      )}`}
                    >
                      {req.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-textLight">
                    {req.requestedOn}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* 👁 STATIC NAVIGATION */}
                      <button
                        onClick={() => navigate("/request-details")}
                        title="View Details"
                        className="text-blue"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>

                      {req.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleAccept(req.id)}
                            className="text-green"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleReject(req.id)}
                            className="text-red"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

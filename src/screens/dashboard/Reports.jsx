import { useState } from 'react';
import { 
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

export default function Reports() {
  const [dateRange, setDateRange] = useState('This Month');
  const [reportType, setReportType] = useState('Overview');

  const stats = {
    totalDevotees: 1234,
    totalRequests: 456,
    acceptedRequests: 298,
    completedRequests: 215,
    pendingRequests: 89,
    rejectedRequests: 54
  };

  const guidanceTypeData = [
    { type: 'Career Guidance', requests: 156, percentage: 34 },
    { type: 'Financial Guidance', requests: 124, percentage: 27 },
    { type: 'Baby Care Guidance', requests: 98, percentage: 21 },
    { type: 'Health Guidance', requests: 78, percentage: 18 }
  ];

  const topCounsellors = [
    { name: 'Priya Sharma', requests: 45, rating: 4.8 },
    { name: 'Amit Patel', requests: 38, rating: 4.7 },
    { name: 'Sneha Reddy', requests: 32, rating: 4.6 },
    { name: 'Vikram Singh', requests: 28, rating: 4.5 },
    { name: 'Anita Desai', requests: 25, rating: 4.4 }
  ];

  const monthlyTrends = [
    { month: 'Jan', requests: 45 },
    { month: 'Feb', requests: 52 },
    { month: 'Mar', requests: 48 },
    { month: 'Apr', requests: 61 },
    { month: 'May', requests: 55 },
    { month: 'Jun', requests: 68 },
    { month: 'Jul', requests: 72 },
    { month: 'Aug', requests: 65 },
    { month: 'Sep', requests: 78 },
    { month: 'Oct', requests: 89 }
  ];

  const handleExport = (format) => {
    alert(`Exporting report as ${format}...`);
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-textDark flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-primary" />
              Reports & Analytics
            </h1>
            <p className="mt-0.5 text-2xs text-textLight">View detailed reports and insights</p>
          </div>
          <div className="mt-2 sm:mt-0 flex gap-1.5">
            <button
              onClick={() => handleExport('PDF')}
              className="inline-flex items-center px-3 py-1.5 border border-gray200 rounded-md text-xs font-medium text-textDark hover:bg-secondary"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-1.5" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('Excel')}
              className="inline-flex items-center px-3 py-1.5 bg-primary hover:bg-primaryHover text-white rounded-md text-xs font-medium"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-1.5" />
              Export Excel
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-3 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-textLabel mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              >
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>This Year</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-textLabel mb-1">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              >
                <option>Overview</option>
                <option>User Activity</option>
                <option>Guidance Requests</option>
                <option>Counsellor Performance</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-textLabel mb-1">Format</label>
              <select className="w-full border border-gray200 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm">
                <option>Detailed</option>
                <option>Summary</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-textLight">Total Devotees</p>
                <p className="text-xl font-bold text-textDark mt-1.5">{stats.totalDevotees}</p>
                <p className="text-2xs text-green mt-0.5">↑ 12% from last month</p>
              </div>
              <UserGroupIcon className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-textLight">Total Requests</p>
                <p className="text-xl font-bold text-textDark mt-1.5">{stats.totalRequests}</p>
                <p className="text-2xs text-green mt-0.5">↑ 8% from last month</p>
              </div>
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue" />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-textLight">Completed</p>
                <p className="text-xl font-bold text-textDark mt-1.5">{stats.completedRequests}</p>
                <p className="text-2xs text-green mt-0.5">↑ 15% from last month</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Guidance Types Distribution */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-base font-bold text-textDark mb-3">Guidance Type Distribution</h2>
            <div className="space-y-3">
              {guidanceTypeData.map((item) => (
                <div key={item.type}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-textDark font-medium">{item.type}</span>
                    <span className="text-textLight">{item.requests} requests ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Counsellors */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-base font-bold text-textDark mb-3">Top Performing Counsellors</h2>
            <div className="space-y-2">
              {topCounsellors.map((counsellor, index) => (
                <div key={counsellor.name} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-bold text-xs">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-textDark">{counsellor.name}</p>
                      <p className="text-2xs text-textLight">{counsellor.requests} requests handled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-yellow-500 text-xs">★</span>
                    <span className="text-xs font-medium text-textDark">{counsellor.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-base font-bold text-textDark mb-3">Monthly Request Trends</h2>
          <div className="flex items-end justify-between h-48 gap-1.5">
            {monthlyTrends.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary rounded-t-lg hover:bg-primaryHover transition-colors cursor-pointer"
                  style={{ height: `${(data.requests / 89) * 100}%` }}
                  title={`${data.requests} requests`}
                ></div>
                <p className="text-2xs text-textLight mt-1.5">{data.month}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Request Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <div className="bg-white shadow rounded-lg p-3">
            <p className="text-xs text-textLight">Accepted</p>
            <p className="text-lg font-bold text-green">{stats.acceptedRequests}</p>
            <p className="text-2xs text-textMuted mt-0.5">{((stats.acceptedRequests/stats.totalRequests)*100).toFixed(1)}% of total</p>
          </div>
          <div className="bg-white shadow rounded-lg p-3">
            <p className="text-xs text-textLight">Pending</p>
            <p className="text-lg font-bold text-yellow-600">{stats.pendingRequests}</p>
            <p className="text-2xs text-textMuted mt-0.5">{((stats.pendingRequests/stats.totalRequests)*100).toFixed(1)}% of total</p>
          </div>
          <div className="bg-white shadow rounded-lg p-3">
            <p className="text-xs text-textLight">Completed</p>
            <p className="text-lg font-bold text-blue">{stats.completedRequests}</p>
            <p className="text-2xs text-textMuted mt-0.5">{((stats.completedRequests/stats.totalRequests)*100).toFixed(1)}% of total</p>
          </div>
          <div className="bg-white shadow rounded-lg p-3">
            <p className="text-xs text-textLight">Rejected</p>
            <p className="text-lg font-bold text-red">{stats.rejectedRequests}</p>
            <p className="text-2xs text-textMuted mt-0.5">{((stats.rejectedRequests/stats.totalRequests)*100).toFixed(1)}% of total</p>
          </div>
        </div>
      </div>
    </div>
  );
}
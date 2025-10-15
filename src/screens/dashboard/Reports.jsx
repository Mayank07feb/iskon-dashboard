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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-textDark flex items-center">
              <ChartBarIcon className="h-8 w-8 mr-3 text-primary" />
              Reports & Analytics
            </h1>
            <p className="mt-1 text-sm text-textLight">View detailed reports and insights</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <button
              onClick={() => handleExport('PDF')}
              className="inline-flex items-center px-4 py-2 border border-gray200 rounded-md text-sm font-medium text-textDark hover:bg-secondary"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('Excel')}
              className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-md text-sm font-medium"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Export Excel
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-textLabel mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
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
              <label className="block text-sm font-medium text-textLabel mb-1">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Overview</option>
                <option>User Activity</option>
                <option>Guidance Requests</option>
                <option>Counsellor Performance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-textLabel mb-1">Format</label>
              <select className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Detailed</option>
                <option>Summary</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-textLight">Total Devotees</p>
                <p className="text-3xl font-bold text-textDark mt-2">{stats.totalDevotees}</p>
                <p className="text-xs text-green mt-1">↑ 12% from last month</p>
              </div>
              <UserGroupIcon className="h-12 w-12 text-primary" />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-textLight">Total Requests</p>
                <p className="text-3xl font-bold text-textDark mt-2">{stats.totalRequests}</p>
                <p className="text-xs text-green mt-1">↑ 8% from last month</p>
              </div>
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue" />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-textLight">Completed</p>
                <p className="text-3xl font-bold text-textDark mt-2">{stats.completedRequests}</p>
                <p className="text-xs text-green mt-1">↑ 15% from last month</p>
              </div>
              <CheckCircleIcon className="h-12 w-12 text-green" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Guidance Types Distribution */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-textDark mb-4">Guidance Type Distribution</h2>
            <div className="space-y-4">
              {guidanceTypeData.map((item) => (
                <div key={item.type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-textDark font-medium">{item.type}</span>
                    <span className="text-textLight">{item.requests} requests ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Counsellors */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-textDark mb-4">Top Performing Counsellors</h2>
            <div className="space-y-3">
              {topCounsellors.map((counsellor, index) => (
                <div key={counsellor.name} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-textDark">{counsellor.name}</p>
                      <p className="text-xs text-textLight">{counsellor.requests} requests handled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium text-textDark">{counsellor.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold text-textDark mb-4">Monthly Request Trends</h2>
          <div className="flex items-end justify-between h-64 gap-2">
            {monthlyTrends.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary rounded-t-lg hover:bg-primaryHover transition-colors cursor-pointer"
                  style={{ height: `${(data.requests / 89) * 100}%` }}
                  title={`${data.requests} requests`}
                ></div>
                <p className="text-xs text-textLight mt-2">{data.month}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Request Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-textLight">Accepted</p>
            <p className="text-2xl font-bold text-green">{stats.acceptedRequests}</p>
            <p className="text-xs text-textMuted mt-1">{((stats.acceptedRequests/stats.totalRequests)*100).toFixed(1)}% of total</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-textLight">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</p>
            <p className="text-xs text-textMuted mt-1">{((stats.pendingRequests/stats.totalRequests)*100).toFixed(1)}% of total</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-textLight">Completed</p>
            <p className="text-2xl font-bold text-blue">{stats.completedRequests}</p>
            <p className="text-xs text-textMuted mt-1">{((stats.completedRequests/stats.totalRequests)*100).toFixed(1)}% of total</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-textLight">Rejected</p>
            <p className="text-2xl font-bold text-red">{stats.rejectedRequests}</p>
            <p className="text-xs text-textMuted mt-1">{((stats.rejectedRequests/stats.totalRequests)*100).toFixed(1)}% of total</p>
          </div>
        </div>
      </div>
    </div>
    );
}
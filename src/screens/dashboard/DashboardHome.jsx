import { 
  UserGroupIcon, 
  BriefcaseIcon, 
  CurrencyRupeeIcon,
  AcademicCapIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

const stats = [
  { name: 'Total Devotees', value: '1,234', icon: UserGroupIcon, change: '+12%', changeType: 'positive' },
  { name: 'Pending Requests', value: '89', icon: ChatBubbleLeftRightIcon, change: '+8%', changeType: 'positive' },
  { name: 'Total Counsellors', value: '24', icon: BriefcaseIcon, change: '+15%', changeType: 'positive' },
  { name: 'Active Guidance', value: '78', icon: AcademicCapIcon, change: '+5%', changeType: 'positive' },
];

const guidanceRequests = [
  { id: 1, name: 'Rajesh Kumar', type: 'Career', status: 'Pending', requestedOn: '2025-10-12' },
  { id: 2, name: 'Priya Sharma', type: 'Finance', status: 'Accepted', requestedOn: '2025-10-14' },
  { id: 3, name: 'Amit Patel', type: 'Baby Care', status: 'Pending', requestedOn: '2025-10-13' },
  { id: 4, name: 'Sneha Reddy', type: 'Health', status: 'Rejected', requestedOn: '2025-10-11' },
];

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold leading-7 text-textDark sm:truncate sm:text-3xl">
              ISKCON Community Dashboard
            </h1>
            <p className="mt-1 text-sm text-textLight">
              Overview of devotees, guidance requests, and community activity
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-4 sm:p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-textLight" aria-hidden="true" />
                  </div>
                  <div className="ml-4 sm:ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-textLight truncate">{stat.name}</dt>
                      <dd>
                        <div className="text-base sm:text-lg font-medium text-textDark">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-secondary px-4 py-3 sm:px-5 sm:py-3">
                <div className="text-sm">
                  <span className={`font-medium ${
                    stat.changeType === 'positive' ? 'text-green' : 'text-red'
                  }`}>
                    {stat.change}
                  </span>{' '}
                  <span className="text-textMuted">from last month</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guidance Cards */}
        <h2 className="text-xl font-bold text-textDark mt-6">Guidance Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {[
            { name: 'Career Guidance', icon: AcademicCapIcon },
            { name: 'Finance Guidance', icon: CurrencyRupeeIcon },
            { name: 'Baby Care Guidance', icon: HeartIcon },
            { name: 'Health Guidance', icon: UserGroupIcon },
          ].map((card) => (
            <div key={card.name} className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer flex items-center gap-3">
              <card.icon className="h-6 w-6 text-primary" />
              <span className="font-medium text-textDark">{card.name}</span>
            </div>
          ))}
        </div>

        {/* Recent Guidance Requests */}
        <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray200">
            <h3 className="text-lg font-medium leading-6 text-textDark">Recent Guidance Requests</h3>
            <p className="mt-1 max-w-2xl text-sm text-textLight">Latest guidance requests from devotees</p>
          </div>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray200">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider">Guidance Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider hidden sm:table-cell">Requested On</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray200">
                  {guidanceRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-secondaryHover">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-textDark">{req.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-textLight">{req.type}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          req.status === 'Accepted' ? 'bg-green text-white' :
                          req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red text-white'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-textLight hidden sm:table-cell">{req.requestedOn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold text-textDark mt-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {[
            { name: 'Add Devotee', desc: 'Add new devotee to the system', icon: UserGroupIcon },
            { name: 'View Requests', desc: 'Check pending guidance requests', icon: ChatBubbleLeftRightIcon },
            { name: 'Generate Reports', desc: 'View reports and analytics', icon: CurrencyRupeeIcon },
          ].map((action) => (
            <div key={action.name} className="bg-white overflow-hidden shadow rounded-lg p-4 sm:p-6 flex flex-col justify-between">
              <div className="flex items-center">
                <action.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <div className="ml-4 sm:ml-5">
                  <h3 className="text-base sm:text-lg font-medium text-textDark">{action.name}</h3>
                  <p className="mt-1 text-sm text-textLight">{action.desc}</p>
                </div>
              </div>
              <div className="mt-4">
                <button className="text-primary hover:text-primaryHover text-sm font-medium">Go →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

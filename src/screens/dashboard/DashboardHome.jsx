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
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-3 sm:px-5 lg:px-6 py-4">
        {/* Page Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-bold text-textDark">
              ISKCON Community Dashboard
            </h1>
            <p className="mt-0.5 text-2xs text-textLight">
              Overview of devotees, guidance requests, and community activity
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-3 sm:p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-textLight" aria-hidden="true" />
                  </div>
                  <div className="ml-3 sm:ml-4 w-0 flex-1">
                    <dl>
                      <dt className="text-xs font-medium text-textLight truncate">{stat.name}</dt>
                      <dd>
                        <div className="text-sm sm:text-base font-medium text-textDark">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-secondary px-3 py-2 sm:px-4 sm:py-2">
                <div className="text-xs">
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
        <h2 className="text-base font-bold text-textDark">Guidance Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
          {[
            { name: 'Career Guidance', icon: AcademicCapIcon },
            { name: 'Finance Guidance', icon: CurrencyRupeeIcon },
            { name: 'Baby Care Guidance', icon: HeartIcon },
            { name: 'Health Guidance', icon: UserGroupIcon },
          ].map((card) => (
            <div key={card.name} className="bg-white p-3 rounded-lg shadow hover:shadow-lg cursor-pointer flex items-center gap-2">
              <card.icon className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm text-textDark">{card.name}</span>
            </div>
          ))}
        </div>

        {/* Recent Guidance Requests */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-3 py-4 sm:px-4 border-b border-gray200">
            <h3 className="text-sm font-medium text-textDark">Recent Guidance Requests</h3>
            <p className="mt-0.5 text-2xs text-textLight">Latest guidance requests from devotees</p>
          </div>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray200">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-3 py-2 text-left text-2xs font-medium text-textLight uppercase tracking-wider">Name</th>
                    <th className="px-3 py-2 text-left text-2xs font-medium text-textLight uppercase tracking-wider">Guidance Type</th>
                    <th className="px-3 py-2 text-left text-2xs font-medium text-textLight uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 text-left text-2xs font-medium text-textLight uppercase tracking-wider hidden sm:table-cell">Requested On</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray200">
                  {guidanceRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-secondaryHover">
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-textDark">{req.name}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-textLight">{req.type}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium ${
                          req.status === 'Accepted' ? 'bg-green text-white' :
                          req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red text-white'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-textLight hidden sm:table-cell">{req.requestedOn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-base font-bold text-textDark">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Add Devotee', desc: 'Add new devotee to the system', icon: UserGroupIcon },
            { name: 'View Requests', desc: 'Check pending guidance requests', icon: ChatBubbleLeftRightIcon },
            { name: 'Generate Reports', desc: 'View reports and analytics', icon: CurrencyRupeeIcon },
          ].map((action) => (
            <div key={action.name} className="bg-white overflow-hidden shadow rounded-lg p-3 sm:p-4 flex flex-col justify-between">
              <div className="flex items-center">
                <action.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <div className="ml-3 sm:ml-4">
                  <h3 className="text-sm sm:text-base font-medium text-textDark">{action.name}</h3>
                  <p className="mt-0.5 text-2xs text-textLight">{action.desc}</p>
                </div>
              </div>
              <div className="mt-3">
                <button className="text-primary hover:text-primaryHover text-xs font-medium">Go →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
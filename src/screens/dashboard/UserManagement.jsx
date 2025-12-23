import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserGroupIcon, 
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

const users = [
  { id: 1, name: 'Rajesh Kumar', role: 'Admin', phone: '+91 98765 43210', email: 'rajesh@iskcon.org', status: 'Active', createdBy: 'Super Admin', createdOn: '2025-09-15' },
  { id: 2, name: 'Priya Sharma', role: 'Counsellor', phone: '+91 98765 43211', email: 'priya@iskcon.org', status: 'Active', createdBy: 'Admin', createdOn: '2025-09-20' },
  { id: 3, name: 'Amit Patel', role: 'Devotee', phone: '+91 98765 43212', email: 'amit@gmail.com', status: 'Pending', createdBy: 'Counsellor', createdOn: '2025-10-01' },
  { id: 4, name: 'Sneha Reddy', role: 'Counsellor', phone: '+91 98765 43213', email: 'sneha@iskcon.org', status: 'Active', createdBy: 'Admin', createdOn: '2025-09-25' },
  { id: 5, name: 'Vikram Singh', role: 'Devotee', phone: '+91 98765 43214', email: 'vikram@gmail.com', status: 'Active', createdBy: 'Counsellor', createdOn: '2025-10-05' },
];

export default function UserManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCreateUserSelect = (e) => {
    const value = e.target.value;
    if (value === 'Create Admin') {
      navigate('/create-admin');
    } else if (value === 'Create Counsellor') {
      navigate('/create-counsellor');
    } else if (value === 'Create Devotee') {
      navigate('/create-devotee');
    }
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-textDark">User Management</h1>
            <p className="mt-1 text-sm text-textLight">Manage all users in the ISKCON community</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              onChange={handleCreateUserSelect}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Create User</option>
              <option value="Create Admin">Create Admin</option>
              <option value="Create Counsellor">Create Counsellor</option>
              <option value="Create Devotee">Create Devotee</option>
            </select>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-textLabel mb-1">Search</label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-textMuted" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-textLabel mb-1">Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>All</option>
                <option>Admin</option>
                <option>Counsellor</option>
                <option>Devotee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-textLabel mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border border-gray200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>All</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-textLight">Total Users</p>
                <p className="text-2xl font-bold text-textDark">1,234</p>
              </div>
              <UserGroupIcon className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-textLight">Admins</p>
                <p className="text-2xl font-bold text-textDark">12</p>
              </div>
              <UserGroupIcon className="h-10 w-10 text-blue" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-textLight">Counsellors</p>
                <p className="text-2xl font-bold text-textDark">48</p>
              </div>
              <UserGroupIcon className="h-10 w-10 text-green" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-textLight">Devotees</p>
                <p className="text-2xl font-bold text-textDark">1,174</p>
              </div>
              <UserGroupIcon className="h-10 w-10 text-purple" />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray200">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider">Created By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textLight uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-secondaryHover">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-secondary flex items-center justify-center">
                          <span className="text-primary font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-textDark">{user.name}</div>
                          <div className="text-sm text-textLight">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'Admin' ? 'bg-blue text-white' :
                        user.role === 'Counsellor' ? 'bg-green text-white' :
                        'bg-purple text-white'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-textLight">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green text-white' :
                        user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red text-white'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-textLight">{user.createdBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary hover:text-primaryHover mr-3">
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red hover:text-red">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray200 text-sm font-medium rounded-md text-textDark bg-white hover:bg-secondary">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray200 text-sm font-medium rounded-md text-textDark bg-white hover:bg-secondary">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-textLight">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                  <span className="font-medium">{filteredUsers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray200 bg-white text-sm font-medium text-textLight hover:bg-secondary">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray200 bg-white text-sm font-medium text-textDark hover:bg-secondary">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray200 bg-white text-sm font-medium text-textDark hover:bg-secondary">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray200 bg-white text-sm font-medium text-textLight hover:bg-secondary">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
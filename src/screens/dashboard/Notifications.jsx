import { useState } from 'react';
import { 
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

export default function Notifications() {
  const [filter, setFilter] = useState('All');
  
  const notifications = [
    { 
      id: 1, 
      type: 'request', 
      icon: ChatBubbleLeftRightIcon, 
      title: 'New Guidance Request', 
      message: 'Rajesh Kumar requested Career Guidance', 
      time: '5 minutes ago',
      read: false,
      color: 'primary'
    },
    { 
      id: 2, 
      type: 'accepted', 
      icon: CheckCircleIcon, 
      title: 'Request Accepted', 
      message: 'You accepted guidance request from Priya Sharma', 
      time: '1 hour ago',
      read: false,
      color: 'green'
    },
    { 
      id: 3, 
      type: 'message', 
      icon: ChatBubbleLeftRightIcon, 
      title: 'New Message', 
      message: 'Amit Patel sent you a message in Baby Care Guidance chat', 
      time: '2 hours ago',
      read: true,
      color: 'blue'
    },
    { 
      id: 4, 
      type: 'user', 
      icon: UserPlusIcon, 
      title: 'New Devotee Added', 
      message: 'Sneha Reddy was added to your devotee list', 
      time: '3 hours ago',
      read: true,
      color: 'purple'
    },
    { 
      id: 5, 
      type: 'rejected', 
      icon: XCircleIcon, 
      title: 'Request Rejected', 
      message: 'You rejected guidance request from Vikram Singh', 
      time: '5 hours ago',
      read: true,
      color: 'red'
    },
    { 
      id: 6, 
      type: 'reminder', 
      icon: ExclamationTriangleIcon, 
      title: 'Pending Requests', 
      message: 'You have 3 pending guidance requests awaiting response', 
      time: '1 day ago',
      read: true,
      color: 'yellow'
    },
    { 
      id: 7, 
      type: 'request', 
      icon: ChatBubbleLeftRightIcon, 
      title: 'New Guidance Request', 
      message: 'Anita Desai requested Financial Guidance', 
      time: '2 days ago',
      read: true,
      color: 'primary'
    },
  ];

  const filteredNotifications = filter === 'All' 
    ? notifications 
    : filter === 'Unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.read);

  const markAsRead = (id) => {
    alert(`Notification ${id} marked as read`);
  };

  const markAllAsRead = () => {
    alert('All notifications marked as read');
  };

  const deleteNotification = (id) => {
    alert(`Notification ${id} deleted`);
  };

  const getColorClass = (color) => {
    const colors = {
      primary: 'bg-primary',
      green: 'bg-green',
      blue: 'bg-blue',
      purple: 'bg-purple',
      red: 'bg-red',
      yellow: 'bg-yellow-500'
    };
    return colors[color] || 'bg-primary';
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-textDark flex items-center">
              <BellIcon className="h-8 w-8 mr-3 text-primary" />
              Notifications
            </h1>
            <p className="mt-1 text-sm text-textLight">
              {notifications.filter(n => !n.read).length} unread notifications
            </p>
          </div>
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm font-medium text-primary hover:text-primaryHover"
          >
            Mark all as read
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="flex border-b border-gray200">
            {['All', 'Unread', 'Read'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  filter === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-textLight hover:text-textDark'
                }`}
              >
                {tab}
                {tab === 'Unread' && ` (${notifications.filter(n => !n.read).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-12 text-center">
              <BellIcon className="h-16 w-16 text-textMuted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-textDark mb-2">No notifications</h3>
              <p className="text-sm text-textLight">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-primary' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 h-10 w-10 ${getColorClass(notification.color)} rounded-full flex items-center justify-center`}>
                    <notification.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          !notification.read ? 'text-textDark' : 'text-textLight'
                        }`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-textLight mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-textMuted mt-2">{notification.time}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-primary hover:text-primaryHover"
                            title="Mark as read"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-textMuted hover:text-red"
                          title="Delete"
                        >
                          <XCircleIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="mt-6 text-center">
            <button className="px-6 py-2 text-sm font-medium text-primary hover:text-primaryHover">
              Load More Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
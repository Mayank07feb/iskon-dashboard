import { useState } from 'react';
import { 
  PaperAirplaneIcon,
  XMarkIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

export default function Chat() {
  const [message, setMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [chatClosed, setChatClosed] = useState(false);
  
  const [messages, setMessages] = useState([
    { id: 1, sender: 'devotee', text: 'Hare Krishna! Thank you for accepting my request.', time: '10:30 AM', read: true },
    { id: 2, sender: 'counsellor', text: 'Hare Krishna! I am happy to help you with career guidance.', time: '10:32 AM', read: true },
    { id: 3, sender: 'devotee', text: 'I want to switch from software engineering to data science. What should I do?', time: '10:35 AM', read: true },
    { id: 4, sender: 'counsellor', text: 'That is a great career move. First, let me understand your current skillset and experience.', time: '10:37 AM', read: true },
    { id: 5, sender: 'devotee', text: 'I have 5 years of experience in Java development and basic knowledge of Python.', time: '10:40 AM', read: false },
  ]);

  const chatInfo = {
    devotee: 'Rajesh Kumar',
    topic: 'Career Guidance - Data Science Transition',
    status: 'Active'
  };

  const handleSend = () => {
    if (message.trim() && !chatClosed) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'counsellor',
        text: message,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        read: false
      }]);
      setMessage('');
    }
  };

  const handleCloseChat = () => {
    if (window.confirm('Are you sure you want to close this chat? This action cannot be undone.')) {
      setChatClosed(true);
      alert('Chat closed successfully!');
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/919876543210?text=Hare Krishna! Continuing our discussion...`, '_blank');
  };

  return (
    <div className="min-h-screen bg-screenBg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button className="flex items-center text-primary hover:text-primaryHover mb-4">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Requests
        </button>

        {/* Chat Container */}
        <div className="bg-white shadow rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          {/* Chat Header */}
          <div className="bg-primary px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">{chatInfo.devotee}</h2>
              <p className="text-sm text-white opacity-90">{chatInfo.topic}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                chatClosed ? 'bg-red text-white' : 'bg-green text-white'
              }`}>
                {chatClosed ? 'Closed' : chatInfo.status}
              </span>
              <div className="relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 hover:bg-primaryHover rounded-full"
                >
                  <EllipsisVerticalIcon className="h-6 w-6 text-white" />
                </button>
                
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <button
                      onClick={handleWhatsApp}
                      className="block w-full text-left px-4 py-2 text-sm text-textDark hover:bg-secondary"
                    >
                      Continue on WhatsApp
                    </button>
                    <button
                      onClick={handleCloseChat}
                      className="block w-full text-left px-4 py-2 text-sm text-red hover:bg-secondary"
                    >
                      Close Chat
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ height: 'calc(100vh - 380px)' }}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'counsellor' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${
                  msg.sender === 'counsellor' 
                    ? 'bg-primary text-white' 
                    : 'bg-secondary text-textDark'
                } rounded-lg px-4 py-2`}>
                  <p className="text-sm">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className={`text-xs ${
                      msg.sender === 'counsellor' ? 'text-white opacity-75' : 'text-textMuted'
                    }`}>
                      {msg.time}
                    </span>
                    {msg.sender === 'counsellor' && (
                      <CheckIcon className={`h-4 w-4 ${msg.read ? 'text-blue' : 'text-white opacity-75'}`} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {chatClosed && (
              <div className="text-center py-4">
                <div className="inline-block bg-secondary rounded-lg px-6 py-3">
                  <XMarkIcon className="h-8 w-8 text-red mx-auto mb-2" />
                  <p className="text-sm text-textDark font-medium">Chat Closed</p>
                  <p className="text-xs text-textLight mt-1">This conversation has been closed</p>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray200 p-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={chatClosed ? "Chat is closed" : "Type your message..."}
                disabled={chatClosed}
                className="flex-1 border border-gray200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-secondary disabled:text-textMuted"
              />
              <button
                onClick={handleSend}
                disabled={chatClosed || !message.trim()}
                className="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg font-medium disabled:bg-textDisabled disabled:cursor-not-allowed flex items-center gap-2"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
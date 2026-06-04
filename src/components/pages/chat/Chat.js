import React, { useState, useRef, useEffect } from "react";
import { FiSmile, FiPaperclip, FiSend, FiSearch, FiMoreVertical, FiX } from "react-icons/fi";

const Chat = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState({
    "success-seekers-1": [
      {
        id: 1,
        sender: "other",
        name: "Success Seekers Network",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Success1",
        text: "We will be working with that then",
        timestamp: "11:50 pm",
      },
      {
        id: 2,
        sender: "other",
        name: "Gregory Sam",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gregory",
        text: "We will be working with that then We will be working with that then",
        timestamp: "12:04 pm",
      },
      {
        id: 3,
        sender: "other",
        name: "Marvin Stanley",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin",
        text: "We will be working with that then We will be working with that then",
        timestamp: "12:04 pm",
      },
      {
        id: 4,
        sender: "other",
        name: "Jenny Simone",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny",
        text: "We will be working with that then",
        timestamp: "12:10 pm",
      },
      {
        id: 5,
        sender: "self",
        text: "I am doing fine. Thank you, a reminder that we will have a meeting today.",
        timestamp: "12:30 pm",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
    ],
    "success-seekers-2": [
      {
        id: 1,
        sender: "other",
        name: "Success Seekers Network",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Success2",
        text: "Hello! How are you?",
        timestamp: "10:30 am",
      },
      {
        id: 2,
        sender: "self",
        text: "Hi! I'm doing well, thank you for asking!",
        timestamp: "10:45 am",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
    ],
    "success-seekers-3": [
      {
        id: 1,
        sender: "other",
        name: "Success Seekers Network",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Success3",
        text: "Good morning!",
        timestamp: "09:15 am",
      },
      {
        id: 2,
        sender: "self",
        text: "Good morning! Hope you're having a great day!",
        timestamp: "09:30 am",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
    ],
    "group-1": [
      {
        id: 1,
        sender: "other",
        name: "User One",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User1",
        text: "Welcome to this group!",
        timestamp: "08:00 am",
      },
      {
        id: 2,
        sender: "other",
        name: "User Two",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User2",
        text: "Thanks for inviting me!",
        timestamp: "08:15 am",
      },
      {
        id: 3,
        sender: "self",
        text: "Great to have everyone here!",
        timestamp: "08:30 am",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
    ],
    "group-2": [
      {
        id: 1,
        sender: "other",
        name: "User Two",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User2",
        text: "Great to have everyone here",
        timestamp: "07:30 am",
      },
      {
        id: 2,
        sender: "other",
        name: "User Three",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User3",
        text: "Looking forward to working together!",
        timestamp: "07:45 am",
      },
      {
        id: 3,
        sender: "self",
        text: "Let's make this a productive session!",
        timestamp: "08:00 am",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
    ],
    "group-3": [
      {
        id: 1,
        sender: "other",
        name: "User Three",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User3",
        text: "Let's get started!",
        timestamp: "06:45 am",
      },
      {
        id: 2,
        sender: "other",
        name: "User Four",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User4",
        text: "Count me in!",
        timestamp: "07:00 am",
      },
      {
        id: 3,
        sender: "self",
        text: "Perfect! Let's begin the discussion.",
        timestamp: "07:15 am",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
    ],
    "group-4": [
      {
        id: 1,
        sender: "other",
        name: "User Four",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User4",
        text: "Excited to join!",
        timestamp: "05:20 am",
      },
      {
        id: 2,
        sender: "other",
        name: "User One",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User1",
        text: "Welcome aboard!",
        timestamp: "05:35 am",
      },
      {
        id: 3,
        sender: "self",
        text: "Welcome to our group!",
        timestamp: "05:50 am",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
    ],
  });

  const [chatList] = useState([
    {
      id: "success-seekers-1",
      name: "Success Seekers Network",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Success1",
      lastMessage: "We will be working with that then",
      timestamp: "11:50 am",
      online: true,
      type: "individual",
    },
    {
      id: "success-seekers-2",
      name: "Success Seekers Network",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Success2",
      lastMessage: "We will be working with that then",
      timestamp: "10:30 am",
      online: false,
      type: "individual",
    },
    {
      id: "success-seekers-3",
      name: "Success Seekers Network",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Success3",
      lastMessage: "We will be working with that then",
      timestamp: "09:15 am",
      online: true,
      type: "individual",
    },
  ]);

  const [groupChats] = useState([
    {
      id: "group-1",
      name: "Success Seekers Network",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Group1",
      participants: "20 participants",
      type: "group",
      category: "Other groups",
    },
    {
      id: "group-2",
      name: "Success Seekers Network",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Group2",
      participants: "20 participants",
      type: "group",
      category: "My Group",
    },
    {
      id: "group-3",
      name: "Success Seekers Network",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Group3",
      participants: "20 participants",
      type: "group",
      category: "Other groups",
    },
    {
      id: "group-4",
      name: "Success Seekers Network",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Group4",
      participants: "20 participants",
      type: "group",
      category: "Other groups",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, selectedChat]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      sender: "self",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));

    setInputMessage("");
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      console.log("Creating group:", groupName);
      setGroupName("");
      setShowGroupModal(false);
    }
  };

  const currentChatUser = [...chatList, ...groupChats].find(
    (c) => c.id === selectedChat
  );
  const currentMessages = messages[selectedChat] || [];

  const filteredChats = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const otherGroups = groupChats.filter(
    (group) => group.category === "Other groups"
  );
  const myGroups = groupChats.filter((group) => group.category === "My Group");

  return (
    <div className="flex h-full bg-gray-50">
      {/* Left Panel - Chat List */}
      <div className="w-96 border-r border-gray-200 flex flex-col bg-white shadow-sm">
        {/* Header */}
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Messages</h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                activeTab === "chat"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab("discussions")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                activeTab === "discussions"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Discussions
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "chat" ? (
            <>
              {/* Individual Chats */}
              {filteredChats.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No conversations found
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition flex items-center gap-3 ${
                      selectedChat === chat.id
                        ? "bg-red-50 border-l-4 border-l-red-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {chat.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {chat.timestamp}
                      </p>
                    </div>
                    <FiMoreVertical
                      size={18}
                      className="text-gray-400 flex-shrink-0"
                    />
                  </div>
                ))
              )}
            </>
          ) : (
            <>
              {/* Other Groups */}
              {otherGroups.length > 0 && (
                <>
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 uppercase">
                      Other groups
                    </p>
                  </div>
                  {otherGroups.map((group) => (
                    <div
                      key={group.id}
                      onClick={() => setSelectedChat(group.id)}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition flex items-center gap-3 ${
                        selectedChat === group.id
                          ? "bg-red-50 border-l-4 border-l-red-600"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={group.avatar}
                          alt={group.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {group.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {group.participants}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
                        Join
                      </span>
                    </div>
                  ))}
                </>
              )}

              {/* My Groups */}
              {myGroups.length > 0 && (
                <>
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 uppercase">
                      My Group
                    </p>
                  </div>
                  {myGroups.map((group) => (
                    <div
                      key={group.id}
                      onClick={() => setSelectedChat(group.id)}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition flex items-center gap-3 ${
                        selectedChat === group.id
                          ? "bg-red-50 border-l-4 border-l-red-600"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={group.avatar}
                          alt={group.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {group.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {group.participants}
                        </p>
                      </div>
                      <FiMoreVertical
                        size={18}
                        className="text-gray-400 flex-shrink-0"
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>

        {/* Create Discussion Group Button */}
        {activeTab === "discussions" && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <button
              onClick={() => setShowGroupModal(true)}
              className="w-full px-4 py-2 text-red-600 border border-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 transition"
            >
              Create Discussion Group
            </button>
          </div>
        )}
      </div>

      {/* Right Panel - Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200 bg-white shadow-sm flex items-center justify-between">
              {currentChatUser && (
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={currentChatUser.avatar}
                      alt={currentChatUser.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {currentChatUser.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {currentChatUser.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {currentChatUser.type === "group"
                        ? currentChatUser.participants
                        : currentChatUser.online
                        ? "Active now"
                        : "Offline"}
                    </p>
                  </div>
                </div>
              )}
              <FiMoreVertical size={20} className="text-gray-400 cursor-pointer" />
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentMessages && currentMessages.length > 0 ? (
                <>
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "self" ? "justify-end" : "justify-start"
                      } items-end gap-3`}
                    >
                      {message.sender === "other" && (
                        <img
                          src={message.avatar}
                          alt={message.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                      )}

                      <div
                        className={`max-w-sm px-4 py-3 rounded-2xl shadow-sm ${
                          message.sender === "self"
                            ? "bg-indigo-600 text-white rounded-br-none"
                            : "bg-white text-gray-900 rounded-bl-none border border-gray-200"
                        }`}
                      >
                        {message.sender === "other" && message.name && (
                          <p className="text-xs font-semibold mb-1 opacity-75">
                            {message.name}
                          </p>
                        )}
                        <p className="text-sm font-medium">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "self"
                              ? "text-indigo-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>

                      {message.sender === "self" && (
                        <img
                          src={message.avatar}
                          alt="You"
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-3">
                      <img
                        src={currentChatUser?.avatar}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-200">
                        <div className="flex gap-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area */}
            <div className="p-6 bg-white border-t border-gray-200 shadow-lg">
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-indigo-600 transition flex-shrink-0">
                  <FiSmile size={24} />
                </button>

                <button className="text-gray-400 hover:text-indigo-600 transition flex-shrink-0">
                  <FiPaperclip size={24} />
                </button>

                <input
                  type="text"
                  placeholder="Write your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white p-3 rounded-lg transition flex-shrink-0"
                >
                  <FiSend size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          // Empty State
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <svg
                width="140"
                height="140"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto opacity-50"
              >
                <rect
                  x="20"
                  y="40"
                  width="80"
                  height="60"
                  rx="4"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M20 40L60 60L100 40"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="60" cy="70" r="3" fill="#9CA3AF" />
              </svg>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-lg font-medium mb-2">
                No messages yet
              </p>
              <p className="text-gray-500 text-sm">
                Select a chat to start a conversation
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Create Discussion Group
              </h3>
              <button
                onClick={() => setShowGroupModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowGroupModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={!groupName.trim()}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-semibold transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

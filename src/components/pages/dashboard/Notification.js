import React, { useState, useEffect } from "react";
// 1. IMPORT THE ROUTER HOOK FROM YOUR ROUTING LIBRARY
import { useNavigate } from "react-router-dom";
import { FiBell, FiX, FiCheckCircle, FiInfo, FiCalendar, FiMessageSquare, FiArrowLeft } from "react-icons/fi";

export default function Notifications() {
  // 2. INITIALIZE THE NAVIGATE INSTANCE
  const navigate = useNavigate();

  // --- STATE MATRIX ---
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // --- LOCALSTORAGE INITIALIZATION ---
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("ekedc_mentor_notifications"));
    if (storedNotifications) {
      setNotifications(storedNotifications);
    }
  }, []);

  // --- SEED SIMULATED MENTOR DATA ---
  const loadSampleMentorNotifications = () => {
    const sampleData = [
      {
        id: 1,
        title: "Welcome to Virtual Mentoring Portal!",
        description: "Welcome to VMP! We're thrilled to have you on board as an expert Mentor. Explore your platform, review resource curriculum folders, and prepare to guide future leaders step-by-step through their assignment modules.",
        type: "welcome",
        isUnread: true,
        date: "Just now"
      },
      {
        id: 2,
        title: "You've Been Matched with a Mentee!",
        description: "Great news! You have been successfully matched with a new mentee, Grace Femi. Check your mentee management dashboard to view their profile background, learning targets, and project goals.",
        type: "match",
        isUnread: true,
        date: "2 hours ago"
      },
      {
        id: 3,
        title: "Reminder: Mentoring Session Tomorrow!",
        description: "Just a friendly reminder that your upcoming guidance session with Grace Femi is scheduled for tomorrow at 3:30 pm. Please review her submitted course material benchmarks and come prepared with questions.",
        type: "session",
        isUnread: true,
        date: "1 day ago"
      },
      {
        id: 4,
        title: "Feedback Request - Tell Us About Your Mentor",
        description: "We value your expert insights! Please share your progress evaluation notes regarding Grace Femi's performance over the past quarter to help maintain institutional delivery metrics.",
        type: "feedback",
        isUnread: false,
        date: "3 days ago"
      }
    ];
    localStorage.setItem("ekedc_mentor_notifications", JSON.stringify(sampleData));
    setNotifications(sampleData);
  };

  // --- ACTION HANDLERS ---
  const handleReadSingleNotification = (item) => {
    setSelectedNotification(item);

    const updated = notifications.map((n) => {
      if (n.id === item.id) {
        return { ...n, isUnread: false };
      }
      return n;
    });
    
    setNotifications(updated);
    localStorage.setItem("ekedc_mentor_notifications", JSON.stringify(updated));
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, isUnread: false }));
    localStorage.setItem("ekedc_mentor_notifications", JSON.stringify(updated));
    setNotifications(updated);
    if (selectedNotification) {
      setSelectedNotification({ ...selectedNotification, isUnread: false });
    }
  };

  const handleClearAll = () => {
    localStorage.removeItem("ekedc_mentor_notifications");
    setNotifications([]);
    setSelectedNotification(null);
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case "welcome": return <FiInfo className="text-blue-500" size={16} />;
      case "match": return <FiCheckCircle className="text-emerald-500" size={16} />;
      case "session": return <FiCalendar className="text-amber-500" size={16} />;
      default: return <FiMessageSquare className="text-indigo-500" size={16} />;
    }
  };

  return (
    <div className="w-full max-w-[420px] bg-white h-screen border-l border-slate-100 flex flex-col justify-between shadow-2xl overflow-hidden animate-fadeIn text-left font-sans">
      
      {/* HEADER BAR SECTION */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          {selectedNotification ? (
            <button 
              onClick={() => setSelectedNotification(null)}
              className="p-1 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-lg transition mr-1 flex items-center gap-1 text-xs font-bold"
            >
              <FiArrowLeft size={16} /> Back
            </button>
          ) : (
            <>
              <h2 className="text-md font-bold text-slate-900 tracking-tight">Notifications</h2>
              {notifications.filter(n => n.isUnread).length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {notifications.filter(n => n.isUnread).length} new
                </span>
              )}
            </>
          )}
        </div>
        
        {/* 3. EXTRACTED PROPS CLEANLY AND FIXED DIRECTLY WITH YOUR ROUTE STRATEGY */}
        <button 
          onClick={() => navigate("/Dashboard")}
          className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg transition"
          title="Return to Dashboard Home"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* BODY CANVAS VIEW DISPLAY */}
      <div className="flex-1 overflow-y-auto bg-white">
        {selectedNotification ? (
          <div className="p-6 space-y-6 animate-fadeIn">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-3xs">
                {getNotificationIcon(selectedNotification.type)}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 block mb-0.5 uppercase tracking-wider">
                  {selectedNotification.type} Alert
                </span>
                <span className="text-[11px] text-slate-400 font-medium font-mono">{selectedNotification.date}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {selectedNotification.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed bg-slate-50/50 border border-slate-100/60 p-4 rounded-xl">
                {selectedNotification.description}
              </p>
            </div>

            <button 
              onClick={() => setSelectedNotification(null)}
              className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 px-4 py-2.5 rounded-xl transition w-full text-center block border border-indigo-100/20"
            >
              Return to Notifications Feed
            </button>
          </div>
        ) : (
          <>
            {notifications.length === 0 ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 relative shadow-3xs">
                  <FiBell size={26} />
                  <div className="w-2.5 h-2.5 bg-slate-200 rounded-full absolute top-4 right-4 border-2 border-white" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-800">All caught up!</h3>
                  <p className="text-xs text-slate-400 max-w-[240px] mx-auto leading-relaxed">
                    You have no active alerts right now. Incoming mentee assignments and milestones will display here.
                  </p>
                </div>
                <button 
                  onClick={loadSampleMentorNotifications}
                  className="mt-2 text-[11px] font-bold text-indigo-600 bg-indigo-50/60 hover:bg-indigo-50 px-4 py-2 rounded-xl transition border border-indigo-100/30"
                >
                  Simulate Incoming Feed
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {notifications.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-5 flex gap-4 transition relative ${
                      item.isUnread ? "bg-slate-50/50" : "bg-white hover:bg-slate-50/20"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center relative shadow-3xs">
                        {getNotificationIcon(item.type)}
                        {item.isUnread && (
                          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-xs font-bold text-slate-900 leading-snug truncate ${item.isUnread ? "font-bold" : "font-semibold"}`}>
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-300 whitespace-nowrap font-medium font-mono">{item.date}</span>
                      </div>
                      
                      <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <button 
                        onClick={() => handleReadSingleNotification(item)}
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center pt-0.5 transition"
                      >
                        Read Message →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* FOOTER ACTIONS STRIP */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-slate-100 bg-slate-50/70 grid grid-cols-2 gap-2 text-center">
          <button 
            onClick={handleMarkAllRead}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl transition shadow-3xs"
          >
            Mark all read
          </button>
          <button 
            onClick={handleClearAll}
            className="text-xs font-bold text-rose-600 hover:bg-rose-50 bg-white border border-rose-100 px-3 py-2 rounded-xl transition shadow-3xs"
          >
            Clear all view
          </button>
        </div>
      )}

    </div>
  );
}
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiAlertCircle, FiInbox, FiUsers, FiClock, FiCalendar, 
  FiMessageSquare, FiUserCheck, FiLayers 
} from "react-icons/fi";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardView, setDashboardView] = useState("empty");

  // State arrays for your data buckets
  const [requests, setRequests] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [chats, setChats] = useState([]);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    // 1. Pull data keys out from localStorage safely (parsing arrays if they exist)
    const storedRequests = JSON.parse(localStorage.getItem("ekedc_mentee_requests")) || [];
    const storedMentees = JSON.parse(localStorage.getItem("ekedc_active_mentees")) || [];
    const storedChats = JSON.parse(localStorage.getItem("ekedc_recent_chats")) || [];
    const storedMeetings = JSON.parse(localStorage.getItem("ekedc_upcoming_meetings")) || [];

    // Sync state hooks with storage data
    setRequests(storedRequests);
    setMentees(storedMentees);
    setChats(storedChats);
    setMeetings(storedMeetings);

    // 2. Evaluate User Lifecycle Stage Conditionally
    if (storedMentees.length > 0 || storedChats.length > 0 || storedMeetings.length > 0) {
      // Existing user layer (Screenshot 2026-06-01 125905.png)
      setDashboardView("existing");
    } else if (storedRequests.length > 0) {
      // First-time user getting initial incoming requests (Screenshot 2026-06-01 125847.png)
      setDashboardView("requests");
    } else {
      // Brand new user with completely clean slate (Screenshot 2026-06-01 125754.png)
      setDashboardView("empty");
    }
  }, []);

  // Static fallback data for standard discussion groups displayed across states
  const discussionGroups = Array(5).fill({
    title: "Wisdom Exchange",
    subtitle: "Where Knowledge Meets Conversation",
    mentees: 14,
    mentors: 5
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-1 text-slate-800">
      
      {/* Top Warning Banner Notice */}
      <div className="flex items-center justify-between bg-[#FDF8E7] border border-[#F5E6C4] rounded-xl px-5 py-3 text-sm text-[#8A6D3B]">
        <div className="flex items-center gap-2">
          <FiAlertCircle className="text-amber-600 flex-shrink-0" size={18} />
          <span>Hey Mercy! kindly complete your VMP profile</span>
        </div>
        <button onClick={() => navigate("/profile")} className="font-bold underline hover:text-amber-900 transition">
          Update Profile
        </button>
      </div>

      {/* Dynamic Main Headline Typography */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {dashboardView === "existing" ? "Welcome Back!" : "Welcome!"} Mercy Adams 😇
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Your wisdom and support make dreams a reality. Let's empower lives together.
        </p>
      </div>

      {/* Main Column Grid System Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COMPONENT MAIN ACTION CONTENT (2/3 Width) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Vector Welcome Canvas - Appears ONLY for Existing Staged Profiles */}
          {dashboardView === "existing" && (
            <div className="bg-gradient-to-r from-violet-50 to-indigo-100 rounded-2xl border border-indigo-100/60 p-6 flex items-center justify-between overflow-hidden relative min-h-[160px]">
              <div className="space-y-2 z-10 max-w-md">
                <h3 className="text-lg font-bold text-slate-900">Empower and Inspire as a Trusted Mentor</h3>
                <p className="text-xs font-bold text-rose-500 uppercase tracking-wider">Your Impact, Our Pride!</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Igniting Success, Empowering Dreams - Continue Your Journey of Impact and Growth as You Guide Aspiring Talents to Achieve Their Best.
                </p>
              </div>
              <div className="hidden sm:block absolute right-4 bottom-0 top-0 w-44">
                <div className="h-full w-full flex items-center justify-center text-indigo-300">
                  <FiLayers size={100} className="opacity-40 animate-pulse" />
                </div>
              </div>
            </div>
          )}

          {/* 1. EMPTY STATE CONTAINER LOOKUP */}
          {dashboardView === "empty" && (
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-8 min-h-[480px] flex flex-col justify-between">
              <h3 className="text-sm font-bold text-slate-800">Recent Mentee Request</h3>
              <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto my-auto space-y-4">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full">
                  <FiInbox size={36} />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">No Mentee Request</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  It appears there are no mentee requests awaiting your attention right now. Stay ready for upcoming requests, as your guidance and mentorship are in high demand.
                </p>
              </div>
            </div>
          )}

          {/* 2. REQUEST LISTS CONTAINER LOOKUP */}
          {dashboardView === "requests" && (
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">Recent Mentee Request</h3>
                <button onClick={() => navigate("/mentee-request")} className="text-xs font-semibold text-rose-500 hover:underline">
                  View all
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-medium">
                      <th className="py-3 px-2">First Name</th>
                      <th className="py-3 px-2">Last Name</th>
                      <th className="py-3 px-2">Designation</th>
                      <th className="py-3 px-2">Email Address</th>
                      <th className="py-3 px-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {requests.map((req, i) => (
                      <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2.5 px-2 font-medium text-slate-800 flex items-center gap-2">
                          <img src={req.img || "https://via.placeholder.com/150"} alt="" className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                          {req.firstName}
                        </td>
                        <td className="py-2.5 px-2">{req.lastName}</td>
                        <td className="py-2.5 px-2 text-slate-400">{req.designation}</td>
                        <td className="py-2.5 px-2">{req.email}</td>
                        <td className="py-2.5 px-2 text-right">
                          <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-semibold text-[10px] border border-amber-100">
                            {req.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. EXISTING MATURE RUNTIME DATA BLOCK LOOKUP */}
          {dashboardView === "existing" && (
            <div className="space-y-6">
              {/* Active Assignment Block Subview */}
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">My Mentees</h3>
                  <button onClick={() => navigate("/my-mentee")} className="text-xs font-semibold text-rose-500 hover:underline">
                    View all
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {mentees.map((mentee, i) => (
                    <div key={i} className="border border-slate-100 rounded-xl p-3 flex items-center justify-between bg-slate-50/30">
                      <div className="flex items-center gap-3">
                        <img src={mentee.img || "https://via.placeholder.com/150"} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{mentee.name}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Role: {mentee.role}</p>
                        </div>
                      </div>
                      <button className="text-[10px] font-semibold text-slate-600 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white hover:bg-slate-50 transition">
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Messaging Feed Module Subview */}
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">Recent Chats</h3>
                  <button onClick={() => navigate("/chat")} className="text-xs font-semibold text-rose-500 hover:underline">
                    View all
                  </button>
                </div>
                <div className="space-y-2.5">
                  {chats.map((chat, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-2.5 last:border-none last:pb-0">
                      <div className="flex items-center gap-3">
                        <img src={chat.img || "https://via.placeholder.com/150"} alt="" className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{chat.name}</h4>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{chat.msg}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-slate-400">{chat.time || "10:05 am"}</span>
                        {chat.unread > 0 && (
                          <span className="bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {chat.unread}
                          </span>
                        )}
                        <button onClick={() => navigate("/chat")} className="text-[10px] font-semibold text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition">
                          Reply chat
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT SIDE ASIDE COMPONENT WORKSPACE (1/3 Width) */}
        <div className="space-y-6">
          
          {/* UPCOMING EVENTS SCHEDULER VIEW CONTAINER */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 flex flex-col justify-between min-h-[250px]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Upcoming Meetings</h3>
              {dashboardView === "existing" && (
                <button onClick={() => navigate("/meetings")} className="text-xs font-semibold text-rose-500 hover:underline">
                  View all
                </button>
              )}
            </div>

            {dashboardView !== "existing" ? (
              <div className="flex flex-col items-center justify-center text-center py-6 my-auto space-y-2">
                <div className="w-24 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 border border-slate-100">
                  <FiCalendar size={24} />
                </div>
                <p className="text-xs text-slate-400">No scheduled meeting yet</p>
              </div>
            ) : (
              <div className="space-y-2.5 mt-4 my-auto">
                {meetings.map((meet, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl p-3 bg-slate-50/20 relative pl-6">
                    <span className="absolute left-2.5 top-4 w-1.5 h-1.5 bg-rose-500 rounded-full" />
                    <h4 className="text-xs font-bold text-slate-800">{meet.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Mentee: {meet.mentee}</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-50">
                      <span className="flex items-center gap-1"><FiCalendar size={12}/>{meet.date}</span>
                      <span className="flex items-center gap-1"><FiClock size={12}/>{meet.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* GROUPS NETWORKING COMMUNICATIONS PANEL CONTAINER */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 flex flex-col justify-between min-h-[350px]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Discussion Groups</h3>
              {dashboardView !== "empty" && (
                <button onClick={() => navigate("/materials")} className="text-xs font-semibold text-rose-500 hover:underline">
                  View all
                </button>
              )}
            </div>

            {dashboardView === "empty" ? (
              <div className="flex flex-col items-center justify-center text-center max-w-xs mx-auto my-auto space-y-3 py-4">
                <div className="p-3 bg-slate-50 text-slate-300 rounded-full border border-slate-100">
                  <FiMessageSquare size={28} />
                </div>
                <h4 className="font-bold text-slate-800 text-xs">No Discussion Groups Found</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed px-2">
                  It appears there are no discussion groups available right now. Stay tuned for upcoming group discussions, where you can connect with like-minded individuals and engage in meaningful conversations
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 mt-4">
                {discussionGroups.map((group, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl p-3 flex items-center justify-between bg-slate-50/20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold flex items-center justify-center">
                        WE
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{group.title}</h4>
                        <p className="text-[9px] text-slate-400 line-clamp-1">{group.subtitle}</p>
                        <div className="flex items-center gap-2 text-[9px] text-slate-400 mt-1">
                          <span className="flex items-center gap-0.5"><FiUsers size={10}/> {group.mentees} mentees</span>
                          <span className="flex items-center gap-0.5"><FiUserCheck size={10}/> {group.mentors} mentors</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-[10px] font-semibold text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 bg-white hover:bg-slate-50 transition">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
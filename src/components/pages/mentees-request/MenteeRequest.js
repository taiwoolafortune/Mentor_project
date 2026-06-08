import React, { useState, useEffect } from "react";
import { 
  FiFolder, FiSearch, FiChevronDown, FiArrowLeft, 
  FiMail, FiTarget, FiAward, FiUser 
} from "react-icons/fi";

export default function MenteeRequest() {
  // Component Workflow States
  const [requests, setRequests] = useState([]);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [openDropdownIdx, setOpenDropdownIdx] = useState(null); // FIXED: Tracking by index instead of data ID
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesCount, setEntriesCount] = useState(10);

  // Load state conditionally based on localStorage records
  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("ekedc_mentee_requests")) || [];
    setRequests(storedRequests);
  }, []);

  // FIXED: Optimized global click-outside listener using element class detection
  useEffect(() => {
    function handleClickOutside(event) {
      if (openDropdownIdx !== null && !event.target.closest(".action-dropdown-container")) {
        setOpenDropdownIdx(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownIdx]);

  // Update localStorage helper
  const updateStorage = (updatedList) => {
    setRequests(updatedList);
    localStorage.setItem("ekedc_mentee_requests", JSON.stringify(updatedList));
    
    if (updatedList.length === 0) {
      localStorage.removeItem("ekedc_mentee_requests");
    }
  };

  // Action Handlers
  const handleAccept = (id) => {
    const target = requests.find(r => r.id === id);
    if (target) {
      const activeMentees = JSON.parse(localStorage.getItem("ekedc_active_mentees")) || [];
      const newActive = {
        name: `${target.firstName} ${target.lastName}`,
        role: target.designation || "Mentee Applicant",
        img: target.img
      };
      localStorage.setItem("ekedc_active_mentees", JSON.stringify([...activeMentees, newActive]));
    }
    
    const filtered = requests.filter(r => r.id !== id);
    updateStorage(filtered);
    setSelectedMentee(null);
    setOpenDropdownIdx(null);
  };

  const handleDecline = (id) => {
    const filtered = requests.filter(r => r.id !== id);
    updateStorage(filtered);
    setSelectedMentee(null);
    setOpenDropdownIdx(null);
  };

  const toggleDropdown = (index, e) => {
    e.stopPropagation();
    setOpenDropdownIdx(openDropdownIdx === index ? null : index);
  };

  // Filter logic based on table search inputs
  const filteredRequests = requests.filter(req => {
    const fullName = `${req.firstName} ${req.lastName}`.toLowerCase();
    const email = req.emailAddress ? req.emailAddress.toLowerCase() : "";
    return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
  });

  // --- VIEW 4: MENTEE INDIVIDUAL PROFILE WORKSPACE VIEW ---
  if (selectedMentee) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-5xl mx-auto text-slate-700 animate-fadeIn">
        <button 
          onClick={() => setSelectedMentee(null)}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition mb-6"
        >
          <FiArrowLeft size={18} />
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-100 pb-6">
          <img 
            src={selectedMentee.img} 
            alt="" 
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-50/50 shadow-sm"
          />
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-[#1A1C23]">{selectedMentee.firstName} {selectedMentee.lastName}</h2>
            <p className="text-sm text-[#1A1C23] font-medium">{selectedMentee.designation}</p>
            <p className="text-xs text-indigo-600 flex items-center justify-center sm:justify-start gap-1.5 font-medium pt-0.5">
              <FiMail size={13} /> {selectedMentee.emailAddress}
            </p>
            <p className="text-[11px] text-[#1A1C23] font-mono bg-slate-50 px-2 py-0.5 rounded inline-block">
              {selectedMentee.id}
            </p>
          </div>
        </div>

        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#1A1C23]">Bio/Summary</h3>
            <p className="text-xs text-[#1A1C23] leading-relaxed max-w-4xl">
              {selectedMentee.bio || "A driven and resourceful professional with a passion for learning, personal development, and workflow optimizations."}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1A1C23]">Area of Improvement</h3>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-xs text-slate-600 font-medium">
                <FiTarget className="text-amber-500" size={14} /> Skill Development
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-xs text-slate-600 font-medium">
                <FiAward className="text-amber-500" size={14} /> Personal Development
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
          <button 
            onClick={() => handleAccept(selectedMentee.id)}
            className="bg-[#2D2B5A] hover:bg-[#1E1C3D] text-white px-6 py-2 rounded-xl text-xs font-semibold transition shadow-sm"
          >
            Accept Mentee
          </button>
          <button 
            onClick={() => handleDecline(selectedMentee.id)}
            className="bg-[#D92D2D] hover:bg-[#B82323] text-white px-6 py-2 rounded-xl text-xs font-semibold transition shadow-sm"
          >
            Decline Mentee
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN MODULE CONTEXT SCREEN ---
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-1 text-slate-800">
      <div>
        <h1 className="text-xl font-bold text-[#1A1C23]">Mentee Request</h1>
        <p className="text-xs text-[#1A1C23] mt-0.5">Unlocking Potential: Responding to Mentee Requests</p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl min-h-[500px] flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
          <div className="max-w-xs mx-auto space-y-4">
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center text-indigo-100 bg-slate-50 rounded-full border border-slate-100/60">
              <FiFolder size={56} className="text-indigo-200" />
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              You have no request from mentee
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 space-y-5 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <div className="relative">
                <select 
                  value={entriesCount}
                  onChange={(e) => setEntriesCount(Number(e.target.value))}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 font-medium text-slate-700 cursor-pointer outline-none focus:border-indigo-300"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <FiChevronDown className="absolute right-2.5 top-2.5 pointer-events-none text-slate-400" />
              </div>
              <span>entries</span>
            </div>

            <div className="relative max-w-sm w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-[#1A1C23] placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-400 transition"
              />
              <FiSearch className="absolute left-3 top-3 text-slate-400" size={14} />
            </div>
          </div>

          {/* Core Table Section Container */}
          <div className="overflow-visible">
            <table className="w-full text-left text-xs text-[#1A1C23] border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[#1A1C23] font-semibold bg-slate-50/40">
                  <th className="py-3 px-3">First Name</th>
                  <th className="py-3 px-3">Last Name</th>
                  <th className="py-3 px-3">Designation</th>
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredRequests.slice(0, entriesCount).map((req, idx) => {
                  const isDropdownOpen = openDropdownIdx === idx;
                  
                  return (
                    <tr 
                      key={req.id || idx} 
                      // FIXED: Elevated dynamic layout layering via z-index context assignment on the active row
                      className={`transition-colors group ${
                        isDropdownOpen ? "bg-slate-50 relative z-30" : "hover:bg-slate-50/50 relative z-10"
                      }`}
                    >
                      <td className="py-3 px-3 font-semibold text-[#1A1C23] flex items-center gap-2.5">
                        <img src={req.img} alt="" className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-sm" />
                        {req.firstName}
                      </td>
                      <td className="py-3 px-3 font-medium text-[#1A1C23]">{req.lastName}</td>
                      <td className="py-3 px-3 text-[#1A1C23] font-medium">{req.designation}</td>
                      <td className="py-3 px-3 text-[#1A1C23] font-mono">{req.emailAddress || "—"}</td>
                      <td className="py-3 px-3">
                        <span className="bg-amber-50 text-amber-600 font-semibold px-2.5 py-0.5 rounded-full text-[10px] border border-amber-100">
                          {req.status}
                        </span>
                      </td>
                      
                      <td className="py-3 px-3 text-center relative action-dropdown-container">
                        <button 
                          onClick={(e) => toggleDropdown(idx, e)}
                          className={`inline-flex items-center gap-1.5 border px-3 py-1 rounded-lg text-[11px] font-semibold transition ${
                            isDropdownOpen 
                              ? "bg-rose-50 border-rose-200 text-rose-500" 
                              : "border-rose-200 text-rose-500 hover:bg-rose-50/40"
                          }`}
                        >
                          Action <FiChevronDown size={12} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isDropdownOpen && (
                          <div 
                            className="absolute right-3 top-10 bg-white border border-slate-200 shadow-xl rounded-xl py-1.5 w-40 text-left z-50 font-medium text-[#1A1C23] block"
                            style={{ minWidth: "160px" }}
                          >
                            <button 
                              onClick={() => setSelectedMentee(req)}
                              className="w-full px-3.5 py-1.5 text-xs text-left hover:bg-slate-50 hover:text-slate-900 transition flex items-center gap-2"
                            >
                              <FiUser size={13} /> View Profile
                            </button>
                            <button 
                              onClick={() => handleAccept(req.id)}
                              className="w-full px-3.5 py-1.5 text-xs text-left hover:bg-slate-50 text-emerald-600 hover:text-emerald-700 transition flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Accept Mentee
                            </button>
                            <button 
                              onClick={() => handleDecline(req.id)}
                              className="w-full px-3.5 py-1.5 text-xs text-left hover:bg-slate-50 text-rose-500 hover:text-rose-600 transition flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Decline Mentee
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
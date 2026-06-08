import React, { useState, useEffect } from "react";
import { 
  FiFolder, FiArrowLeft, FiMail, FiTarget, FiAward, 
  FiCalendar, FiMessageSquare, FiAlertCircle, FiX, FiCheckCircle
} from "react-icons/fi";

export default function MyMentee() {
  // Component Workflow States
  const [mentees, setMentees] = useState([]);
  const [selectedMentee, setSelectedMentee] = useState(null);
  
  // Modal Triggers
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Form input control
  const [changeReason, setChangeReason] = useState("");

  // Conditional State Loading from localStorage
  useEffect(() => {
    const storedMentees = JSON.parse(localStorage.getItem("ekedc_active_mentees")) || [];
    setMentees(storedMentees);
  }, []);

  // Form submission handler for changing a mentee
  const handleChangeSubmit = (e) => {
    e.preventDefault();
    if (!changeReason.trim()) return;
    
    // Close form view, flash the confirmation modal text context
    setShowChangeModal(false);
    setChangeReason("");
    setShowSuccessModal(true);
  };

  // --- VIEW 3: DETAILED MENTEE PROFILE WORKSPACE (Screenshot 3) ---
  if (selectedMentee) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-5xl mx-auto text-[#1A1C23] animate-fadeIn relative">
        
        {/* Back navigation control */}
        <button 
          onClick={() => setSelectedMentee(null)}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition mb-6"
        >
          <FiArrowLeft size={18} />
        </button>

        {/* Profile Card Summary Block */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-100 pb-6">
          <img 
            src={selectedMentee.img} 
            alt="" 
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-50/50 shadow-sm"
          />
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-slate-900">{selectedMentee.name}</h2>
            <p className="text-sm text-slate-500 font-medium">{selectedMentee.role}</p>
            <p className="text-xs text-slate-400 font-medium">Contact: 0902345834</p>
            <p className="text-xs text-indigo-600 flex items-center justify-center sm:justify-start gap-1.5 font-medium pt-0.5">
              <FiMail size={13} /> {selectedMentee.email || "gideontayo124@gmail.com"}
            </p>
            <p className="text-[11px] text-[#1A1C23] font-mono bg-slate-50 px-2 py-0.5 rounded inline-block">
              Gideon12D890
            </p>
          </div>
        </div>

        {/* Structured Copy Area */}
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#1A1C23]">Bio/Summary</h3>
            <p className="text-xs text-[#1A1C23] leading-relaxed max-w-4xl">
              A driven and resourceful personal assistant with a passion for organization and efficiency. With an extensive background in managing schedules, travel itineraries, and administrative tasks, I am on a mission to excel in my role and contribute to my employer's success. my proactive approach, coupled with exceptional problem-solving skills, makes me an invaluable asset in any professional setting. I am on a journey of self-improvement and aspires to take my career to new heights. I seek mentorship to refine my time management, communication, and leadership abilities, and to gain insights from an experienced mentor who has thrived in a similar role. With a commitment to personal growth and a thirst for knowledge, i am ready to learn, adapt, and embrace new challenges in my quest for excellence.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1A1C23]">Area of Improvement</h3>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-xs text-[#1A1C23] font-medium">
                <FiTarget className="text-amber-500" size={14} /> Skill Development
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-xs text-slate-600 font-medium">
                <FiAward className="text-amber-500" size={14} /> Personal Development
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links Menu Strip */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <h4 className="text-xs font-bold text-rose-800 tracking-wide uppercase">Quick links</h4>
          <div className="flex flex-wrap gap-2.5">
            <button className="flex items-center gap-2 bg-indigo-50/60 hover:bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2 text-xs text-indigo-600 font-semibold transition">
              <FiMessageSquare size={13} /> Send a message
            </button>
            <button 
              onClick={() => setShowFeedbackModal(true)}
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-xs text-[#1A1C23] font-semibold transition"
            >
              <FiAward size={13} /> Give Feedbacks
            </button>
            <button 
              onClick={() => setShowChangeModal(true)}
              className="flex items-center gap-2 bg-rose-50/60 hover:bg-rose-50 border border-rose-100 rounded-xl px-4 py-2 text-xs text-rose-600 font-semibold transition"
            >
              <FiX size={13} /> Change mentee
            </button>
          </div>
        </div>

        {/* --- MODAL LAYER 4: QUARTERLY FEEDBACK BLOCKER (Screenshot 4) --- */}
        {showFeedbackModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full border border-slate-100 text-center relative space-y-4">
              <button 
                onClick={() => setShowFeedbackModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition"
              >
                <FiX size={16} />
              </button>
              <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <FiAlertCircle size={26} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-[#2D2B5A]">Dear Grace!</h3>
                <p className="text-xs text-[#1A1C23] leading-relaxed">
                  Feedback is collected quarterly. We'll notify you when it's time to provide your valuable input. Thank you for your patience!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL LAYER 5: REQUEST CHANGE FORM MODAL (Screenshot 5) --- */}
        {showChangeModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-xl w-full shadow-xl border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800">Request to change a mentee</h3>
                <button onClick={() => setShowChangeModal(false)} className="text-slate-400 hover:text-slate-600 transition">
                  <FiX size={16} />
                </button>
              </div>
              <form onSubmit={handleChangeSubmit} className="p-6 space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Mentee</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={selectedMentee.name}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-700 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Reason <span className="text-rose-500">*</span></label>
                  <textarea 
                    required
                    rows={4}
                    value={changeReason}
                    onChange={(e) => setChangeReason(e.target.value)}
                    placeholder="Give brief reason about your decision"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    className="bg-[#D92D2D] hover:bg-[#B82323] text-white px-6 py-2 rounded-xl text-xs font-semibold transition shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL LAYER 6: SUCCESS CONFIRMATION BANNER (Screenshot 6) --- */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-[#ECEBFA] rounded-xl px-8 py-5 shadow-xl max-w-xl w-full text-center border border-indigo-100 relative">
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="absolute right-3 top-3 text-indigo-900/60 hover:text-indigo-900 transition"
              >
                <FiX size={16} />
              </button>
              <p className="text-xs font-bold text-[#1E1C3D] flex items-center justify-center gap-2.5">
                <FiCheckCircle className="text-emerald-500" size={16} />
                Your request has been received. You will be notified once the change is confirmed.
              </p>
            </div>
          </div>
        )}

      </div>
    );
  }

  // --- MAIN LAYOUT RENDER ---
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-1 text-[#1A1C23]">
      
      <div>
        <h1 className="text-xl font-bold text-[#1A1C23]">My Mentee</h1>
      </div>

      {/* VIEW 1: EMPTY LIST DATA PLACEHOLDER (Screenshot 1) */}
      {mentees.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl min-h-[500px] flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
          <div className="max-w-xs mx-auto space-y-4">
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center text-indigo-100 bg-slate-50 rounded-full border border-slate-100/60">
              <FiFolder size={56} className="text-indigo-200" />
            </div>
            <p className="text-xs text-[#1A1C23] font-medium tracking-wide">
              You have no mentee yet
            </p>
          </div>
        </div>
      ) : (
        
        /* VIEW 2: ACTIVE RELATIONSHIPS CONTAINER (Screenshot 2) */
        <div className="space-y-4 animate-fadeIn">
          {mentees.map((item, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-100 shadow-xs rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-sm transition"
            >
              {/* Profile Meta Segment */}
              <div className="flex items-center gap-4 min-w-[280px]">
                <img 
                  src={item.img || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120"} 
                  alt="" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-50 shadow-xs"
                />
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-[#1A1C23]">{item.name}</h3>
                  <p className="text-xs text-[#1A1C23] font-medium">{item.role}</p>
                  <p className="text-[11px] text-[#1A1C23] font-medium underline flex items-center gap-1">
                    Email: <span className="font-mono text-[#1A1C23] select-all">{item.email || "gideontayo124@gmail.com"}</span>
                  </p>
                </div>
              </div>

              {/* Central Scheduling Status Core */}
              <div className="flex flex-col items-center justify-center px-6 py-2 border-y md:border-y-0 md:border-x border-slate-100 text-center min-w-[200px] space-y-1">
                <div className="w-7 h-7 bg-rose-600 text-white rounded-lg flex items-center justify-center shadow-xs">
                  <FiCalendar size={14} />
                </div>
                {index === 0 ? (
                  <>
                    <span className="text-[11px] font-bold text-[#1A1C23]">No Meeting Scheduled</span>
                    <button className="text-[10px] text-rose-600 font-semibold underline hover:text-rose-700">View all</button>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] font-bold text-[#1A1C23]">Next Meeting</span>
                    <p className="text-[10px] text-[#1A1C23] font-medium">Date: October 11, 2023</p>
                    <p className="text-[10px] text-[#1A1C23] font-medium">Time: 3:30PM</p>
                    <button  className="text-[10px] text-rose-600 font-semibold underline hover:text-rose-700 pt-0.5">View all</button>
                  </>
                )}
              </div>

              {/* Direct Communication Strip */}
              <div className="flex items-center justify-between md:justify-end gap-6 flex-1">
                <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1C23] hover:text-[#1A1C23] transition">
                  <FiMessageSquare size={14} className="text-[#1A1C23]" /> Send a message
                </button>
                <button 
                  onClick={() => setSelectedMentee(item)}
                  className="bg-[#2D2B5A] hover:bg-[#1E1C3D] text-white px-5 py-2 rounded-xl text-xs font-semibold transition shadow-xs"
                >
                  View Profile
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

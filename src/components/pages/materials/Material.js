import React, { useState, useEffect, useRef } from "react";
import { 
  FiFolder, FiUploadCloud, FiX, FiSearch, FiMoreVertical, 
  FiChevronDown, FiAlertCircle, FiPlus, FiEdit2, FiTrash2, FiFileText, FiArrowLeft
} from "react-icons/fi";

export default function Materials() {
  // --- CORE VIEW ROUTING STATES ---
  const [currentView, setCurrentView] = useState("LIST");
  const [viewHistory, setViewHistory] = useState([]);
  
  // --- DATA ARCHITECTURE STATES ---
  const [materials, setMaterials] = useState([]);
  const [performanceRecords, setPerformanceRecords] = useState([]);
  
  // --- DRILLDOWN & TOGGLE CONTROLS ---
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [activeQuestionMenu, setActiveQuestionMenu] = useState(null);
  const [activeOptionMenu, setActiveOptionMenu] = useState(null);

  // --- MODAL TRIGGERS ---
  const [showMaterialDeleteModal, setShowMaterialDeleteModal] = useState(false);
  const [showQuestionDeleteModal, setShowQuestionDeleteModal] = useState(false);

  // --- FORM STRUCTURAL MANAGEMENT STATES ---
  const [courseTitle, setCourseTitle] = useState("");
  const [learningObjective, setLearningObjective] = useState("");
  const [department, setDepartment] = useState("");
  const [duration, setDuration] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null); // Tracks the chosen file object

  // --- NATIVE FILE INPUT REF ---
  const fileInputRef = useRef(null);

  // Assessment Management Fields
  const [assessmentQuestions, setAssessmentQuestions] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum, purus vel varius convallis, justo felis lacinia elit, a volutpat odio justo eget elit?",
      options: [
        { key: "A", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { key: "B", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { key: "C", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { key: "D", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
      ],
      correctKey: "A",
      isEditing: false
    }
  ]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [editingOptionTarget, setEditingOptionTarget] = useState(null);

  // --- LOCALSTORAGE BASELINE INITIALIZATION ---
  useEffect(() => {
    const storedMaterials = JSON.parse(localStorage.getItem("ekedc_materials")) || [];
    const storedPerformance = JSON.parse(localStorage.getItem("ekedc_material_scores")) || [];
    setMaterials(storedMaterials);
    setPerformanceRecords(storedPerformance);
  }, []);

  // --- NAVIGATION MANAGER (WITH HISTORY TRACKING) ---
  const navigateTo = (nextView) => {
    setViewHistory((prev) => [...prev, currentView]);
    setCurrentView(nextView);
    setActiveDropdownId(null);
  };

  const navigateBack = () => {
    if (viewHistory.length > 0) {
      const prev = viewHistory[viewHistory.length - 1];
      setViewHistory((prevHistory) => prevHistory.slice(0, -1));
      setCurrentView(prev);
    } else {
      setCurrentView("LIST");
    }
    setActiveDropdownId(null);
  };

  // --- FILE HANDLING METHODS ---
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileBrowser = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Drag and Drop extra utility
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // --- CONTROLLER HANDLERS & SIMULATIONS ---
  const handleStartUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file from your computer before publishing.");
      return;
    }
    navigateTo("UPLOAD_PROGRESS");
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const commitMaterialToStorage = () => {
    const newItem = {
      id: Date.now(),
      title: courseTitle || "Untitled Course",
      objective: learningObjective || "Understand core execution paths.",
      department: department || "All Departments",
      status: "Not verified",
      date: new Date().toLocaleDateString("en-GB"),
      fileName: selectedFile ? selectedFile.name : ""
    };
    const updated = [newItem, ...materials];
    localStorage.setItem("ekedc_materials", JSON.stringify(updated));
    setMaterials(updated);
    
    // Clear Form and reset history stack safely
    setCourseTitle("");
    setLearningObjective("");
    setDepartment("");
    setDuration("");
    setSelectedFile(null);
    setViewHistory([]);
    setCurrentView("LIST");
  };

  const handleDeleteMaterial = () => {
    const updated = materials.filter(m => m.id !== selectedMaterial.id);
    localStorage.setItem("ekedc_materials", JSON.stringify(updated));
    setMaterials(updated);
    setShowMaterialDeleteModal(false);
    setSelectedMaterial(null);
  };

  const handleAddQuestion = () => {
    if (!newQuestionText.trim()) return;
    const newQ = {
      id: Date.now(),
      text: newQuestionText,
      options: [
        { key: "A", text: optA || "Empty Option Placeholder A" },
        { key: "B", text: optB || "Empty Option Placeholder B" },
        { key: "C", text: optC || "Empty Option Placeholder C" },
        { key: "D", text: optD || "Empty Option Placeholder D" }
      ],
      correctKey: "A",
      isEditing: false
    };
    setAssessmentQuestions([...assessmentQuestions, newQ]);
    setNewQuestionText(""); setOptA(""); setOptB(""); setOptC(""); setOptD("");
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-4 text-[#1A1C23] min-h-screen relative">
      
      {/* SECTION HEADER BLOCK WITH SMART LINEAR RETREAT NAVIGATION */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          {currentView !== "LIST" && (
            <button 
              onClick={navigateBack}
              className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl transition flex items-center justify-center border border-slate-200 shadow-3xs"
              title="Go back to previous screen"
            >
              <FiArrowLeft size={16} />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold text-[#1A1C23] tracking-tight">
              {currentView === "CREATE_ASSESSMENT" || currentView === "VIEW_ASSESSMENT" ? "Assessment Space" : "Learning Management Materials"}
            </h1>
            <p className="text-xs text-[#1A1C23] font-medium">
              {currentView === "LIST" && "Manage courses, publish learning paths, and audit mentee progress metrics."}
              {currentView === "UPLOAD_FORM" && "Fill out metadata details to package course material assets."}
              {currentView === "CREATE_ASSESSMENT" && "Author evaluation metrics for matching modules safely."}
              {currentView === "VIEW_ASSESSMENT" && "Audit structure and inline options configuration."}
              {currentView === "VIEW_PERFORMANCE" && "Score breakdown metrics from attached student profiles."}
            </p>
          </div>
        </div>
        
        {currentView !== "LIST" && (
          <button 
            onClick={() => { setViewHistory([]); setCurrentView("LIST"); }}
            className="text-xs font-bold text-[#1A1C23] bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
          >
            Reset to Home View
          </button>
        )}
      </div>

      {/* --- VIEW 1: EMPTY REPOSITORY PLATFORM --- */}
      {currentView === "LIST" && materials.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-2xl min-h-[500px] flex flex-col items-center justify-center text-center p-6 shadow-3xs">
          <div className="max-w-md mx-auto space-y-5 flex flex-col items-center">
            <div className="w-52 h-36 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center relative p-4">
              <div className="text-slate-300 space-y-2 text-center">
                <div className="w-12 h-14 bg-white rounded-md border border-slate-200 mx-auto relative flex flex-col gap-1 p-1.5 shadow-xs">
                  <div className="w-full h-1 bg-indigo-200 rounded" />
                  <div className="w-4/5 h-1 bg-slate-100 rounded" />
                  <div className="w-3/5 h-1 bg-slate-100 rounded" />
                </div>
                <div className="w-9 h-9 bg-indigo-600/10 rounded-full text-indigo-600 absolute -bottom-1 -right-2 flex items-center justify-center border-2 border-white shadow-sm">
                  <FiUploadCloud size={14} />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#1A1C23] font-semibold tracking-wide uppercase mb-1">Repository Empty</p>
              <p className="text-xs text-[#1A1C23] max-w-xs">You have no course materials uploaded. Get started by publishing your first course pack asset.</p>
            </div>
            <button 
              onClick={() => navigateTo("UPLOAD_FORM")}
              className="flex items-center gap-2 bg-[#2D2B5A] hover:bg-[#1E1C3D] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <FiUploadCloud size={14} /> Upload Material
            </button>
          </div>
        </div>
      )}

      {/* --- VIEW 2: ACTIVE REPOSITORY DATAGRID --- */}
      {currentView === "LIST" && materials.length > 0 && (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-3xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <button 
              onClick={() => navigateTo("UPLOAD_FORM")}
              className="flex items-center justify-center gap-2 bg-[#2D2B5A] hover:bg-[#1E1C3D] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition self-start shadow-sm"
            >
              <FiUploadCloud size={14} /> Upload Material
            </button>
            <div className="flex items-center gap-4 self-end">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span>Show</span>
                <select className="border border-slate-200 rounded-lg px-2 py-1 outline-none text-slate-700 bg-slate-50">
                  <option>10</option>
                  <option>25</option>
                </select>
                <span>entries</span>
              </div>
              <div className="relative w-64">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" placeholder="Search Materials..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-slate-300 placeholder-slate-400 font-medium"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-visible">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-[#1A1C23] uppercase tracking-wider bg-slate-50/70">
                  <th className="py-3.5 px-4 w-12 text-center">S/N</th>
                  <th className="py-3.5 px-4">Course Title</th>
                  <th className="py-3.5 px-4 max-w-xs">Learning Objective</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-center w-32">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs font-medium text-[#1A1C23]">
                {materials.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/40 transition">
                    <td className="py-4 px-4 text-center text-[#1A1C23] font-bold">{idx + 1}</td>
                    <td className="py-4 px-4 font-bold text-[#1A1C23]">{item.title}</td>
                    <td className="py-4 px-4 max-w-xs text-[#1A1C23] truncate">
                      {item.fileName ? `[File: ${item.fileName}] ` : ""}{item.objective}
                    </td>
                    <td className="py-4 px-4 text-[#1A1C23]">{item.department}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === "Verified" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#1A1C23] font-mono">{item.date}</td>

                    <td className="py-4 px-4 text-center relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMaterial(item);
                          setActiveDropdownId(activeDropdownId === item.id ? null : item.id);
                        }}
                        className="inline-flex items-center gap-1.5 border border-slate-200 px-3 py-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-50 shadow-3xs transition font-bold"
                      >
                        Action <FiChevronDown size={12} className="text-slate-400" />
                      </button>

                      {activeDropdownId === item.id && (
                        <>
                          <div className="fixed inset-0 z-30" onClick={() => setActiveDropdownId(null)} />
                          
                          <div className="absolute right-4 top-12 w-56 bg-white rounded-xl border border-slate-100 shadow-xl z-40 overflow-hidden py-1.5 text-left font-semibold text-slate-700 animate-fadeIn">
                            <button onClick={() => setActiveDropdownId(null)} className="w-full px-4 py-2.5 text-xs hover:bg-slate-50 transition flex items-center gap-2">
                              Download Course Asset
                            </button>
                            <button onClick={() => navigateTo("CREATE_ASSESSMENT")} className="w-full px-4 py-2.5 text-xs hover:bg-slate-50 transition text-indigo-600 flex items-center gap-2">
                              Create Assessment
                            </button>
                            <button onClick={() => navigateTo("VIEW_ASSESSMENT")} className="w-full px-4 py-2.5 text-xs hover:bg-slate-50 transition flex items-center gap-2">
                              View Active Assessment
                            </button>
                            <button onClick={() => navigateTo("VIEW_PERFORMANCE")} className="w-full px-4 py-2.5 text-xs hover:bg-slate-50 transition flex items-center gap-2">
                              View Mentees Assessment
                            </button>
                            <hr className="my-1.5 border-slate-100" />
                            <button 
                              onClick={() => { setShowMaterialDeleteModal(true); setActiveDropdownId(null); }}
                              className="w-full px-4 py-2.5 text-xs hover:bg-rose-50 text-rose-600 transition flex items-center gap-2 font-bold"
                            >
                              Delete Course Unit
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- VIEW 3: UPLOAD ENTRY SUBMISSION FORM --- */}
      {currentView === "UPLOAD_FORM" && (
        <div className="max-w-2xl bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden mx-auto animate-fadeIn">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-[#1A1C23]">Upload Material Document</h2>
            <button onClick={navigateBack} className="text-[#1A1C23]hover:text-slate-600 transition">
              <FiX size={18} />
            </button>
          </div>
          <form onSubmit={handleStartUpload} className="p-6 space-y-5 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1C23]">Course Title <span className="text-rose-500">*</span></label>
              <input 
                type="text" required placeholder="Enter your course title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#1A1C23] placeholder-slate-400 outline-none focus:border-indigo-400 transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1C23]">Learning Objective</label>
              <input 
                type="text" placeholder="Enter your learning objective" value={learningObjective} onChange={(e) => setLearningObjective(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#1A1C23] placeholder-slate-400 outline-none focus:border-indigo-400 transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1C23]">Department <span className="text-rose-500">*</span></label>
              <select 
                required value={department} onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#1A1C23] outline-none focus:border-indigo-400 transition appearance-none"
              >
                <option value="">Select department</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="IT Support">IT Support</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1C23]">Estimated Course Duration <span className="text-rose-500">*</span></label>
              <input 
                type="text" required placeholder="e.g 1 hour, 25 minutes" value={duration} onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#1A1C23] placeholder-slate-400 outline-none focus:border-indigo-400 transition"
              />
            </div>

            {/* --- ACTIVATED NATIVE FILE PICKER DRAG/CLICK COMPONENT --- */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1C23]">Upload Course Pack File <span className="text-rose-500">*</span></label>
              
              {/* Hidden Native Input */}
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              />

              <div 
                onClick={triggerFileBrowser}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center space-y-3 transition cursor-pointer ${
                  selectedFile 
                    ? "border-emerald-300 bg-emerald-50/10 hover:bg-emerald-50/20" 
                    : "border-indigo-100 bg-indigo-50/10 hover:bg-indigo-50/20"
                }`}
              >
                <FiPlus size={24} className={`mx-auto ${selectedFile ? "text-emerald-600" : "text-[#2D2B5A]"}`} />
                
                {selectedFile ? (
                  <div>
                    <p className="text-xs font-bold text-emerald-600">Selected File:</p>
                    <p className="text-xs text-[#1A1C23] font-mono mt-1 break-all bg-white px-2 py-1 rounded border border-slate-100 inline-block">
                      {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2">Click or drag a different file to replace</p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-medium text-slate-400">Drag and drop files here <br /><span className="text-[11px] text-slate-300">or</span></p>
                    <button 
                      type="button" 
                      className="border border-slate-200 rounded-xl px-4 py-2 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 transition shadow-3xs"
                    >
                      Browse Assets
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button type="button" onClick={navigateBack} className="text-xs font-bold text-slate-400 hover:text-slate-600 transition">
                Cancel
              </button>
              <button 
                type="submit" 
                className={`px-8 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
                  selectedFile 
                    ? "bg-[#D92D2D] hover:bg-[#B82323] text-white" 
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                Publish Asset
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- VIEW 4: FILE UPLOADING TIMELINE GRAPHIC --- */}
      {currentView === "UPLOAD_PROGRESS" && (
        <div className="max-w-2xl bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden mx-auto p-6 space-y-6 text-left animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-800">Processing Upload Queue</h2>
          </div>
          
          <div className="space-y-4 opacity-50 pointer-events-none">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Course Title</label>
              <input type="text" readOnly value={courseTitle || "ABC of mentoring"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500" />
            </div>
            {selectedFile && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400">File Payload Name</label>
                <input type="text" readOnly value={selectedFile.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-mono" />
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-600">Upload Status <span className="text-rose-500">*</span></label>
            <div className="border border-slate-100 rounded-xl p-6 bg-slate-50/50 space-y-4">
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-[#D92D2D] h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 font-bold tracking-wide uppercase">Writing blocks to database - {uploadProgress}%</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            {uploadProgress < 100 ? (
              <button disabled className="bg-slate-100 text-slate-400 px-8 py-2.5 rounded-xl text-xs font-bold cursor-not-allowed">
                Syncing Asset...
              </button>
            ) : (
              <button 
                type="button"
                onClick={commitMaterialToStorage}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-xl text-xs font-bold transition shadow-sm animate-bounce"
              >
                Complete & Deploy
              </button>
            )}
          </div>
        </div>
      )}

      {/* --- VIEW 5: CREATE ASSESSMENT CANVAS CONTAINER --- */}
      {currentView === "CREATE_ASSESSMENT" && (
        <div className="max-w-5xl bg-white border border-slate-100 rounded-2xl shadow-3xs p-6 md:p-8 space-y-6 text-left mx-auto animate-fadeIn">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="text-xs text-[#1A1C23] leading-relaxed font-medium italic">
              Kindly ensure each question is clear, concise, and free of ambiguity. Craft clear and concise answer choices, maintaining consistency in formatting. Note that the correct answer should be inputted in the field for Option A.
            </p>
          </div>

          <div className="space-y-5 pt-2">
            <h3 className="text-xs font-bold text-rose-600 uppercase tracking-wider">Questions</h3>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1A1C23]">Question {assessmentQuestions.length + 1} <span className="text-rose-500">*</span></label>
              <textarea 
                rows={3} placeholder="Type question string text here..." value={newQuestionText} onChange={(e) => setNewQuestionText(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#1A1C23] outline-none focus:border-indigo-400 transition placeholder-slate-300"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-rose-600 uppercase tracking-wider">Options Grid</h3>
            <div className="grid grid-cols-1 gap-4">
              {["A", "B", "C", "D"].map((opt) => (
                <div key={opt} className="space-y-1">
                  <label className="text-xs font-semibold text-[#1A1C23]">Option {opt} {opt === "A" && "(System Marked Solution Answer Key)"} <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" placeholder={`Enter Option ${opt} text matching requirements`}
                    value={opt === "A" ? optA : opt === "B" ? optB : opt === "C" ? optC : optD}
                    onChange={(e) => {
                      if (opt === "A") setOptA(e.target.value);
                      if (opt === "B") setOptB(e.target.value);
                      if (opt === "C") setOptC(e.target.value);
                      if (opt === "D") setOptD(e.target.value);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#1A1C23] outline-none focus:border-indigo-400 transition placeholder-slate-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-50">
            <button 
              onClick={navigateBack}
              className="text-xs font-bold text-[#1A1C23] hover:text-slate-600 transition"
            >
              Back to List
            </button>
            <div className="flex gap-3">
              <button 
                onClick={handleAddQuestion}
                className="border border-rose-200 text-rose-600 hover:bg-rose-50 px-6 py-2 rounded-xl text-xs font-bold transition"
              >
                Add Option Row Item
              </button>
              <button 
                onClick={() => navigateTo("VIEW_ASSESSMENT")}
                className="bg-[#2D2B5A] hover:bg-[#1E1C3D] text-white px-8 py-2 rounded-xl text-xs font-bold transition shadow-3xs"
              >
                Commit & Compile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- VIEW 6: ASSESSMENT PREVIEW AND UPDATE WORKSPACE --- */}
      {currentView === "VIEW_ASSESSMENT" && (
        <div className="max-w-5xl bg-white border border-slate-100 rounded-2xl shadow-3xs p-6 md:p-8 space-y-6 text-left mx-auto animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Exam Board Structure View</span>
          </div>

          {assessmentQuestions.map((q) => (
            <div key={q.id} className="space-y-6 border-b border-slate-50 pb-6 last:border-0">
              <div className="space-y-2 relative">
                <div className="flex items-start justify-between gap-4">
                  <label className="text-xs font-bold text-[#1A1C23]">Question {q.id} <span className="text-rose-500">*</span></label>
                  <button 
                    onClick={() => setActiveQuestionMenu(activeQuestionMenu === q.id ? null : q.id)}
                    className="p-1 text-slate-400 hover:text-slate-600 transition rounded"
                  >
                    <FiMoreVertical size={16} />
                  </button>

                  {activeQuestionMenu === q.id && (
                    <div className="absolute right-0 top-6 w-36 bg-white rounded-lg border border-slate-100 shadow-lg z-20 py-1 text-xs font-medium">
                      <button className="w-full px-3 py-1.5 text-left hover:bg-slate-50 transition">Edit Question</button>
                      <button onClick={() => setShowQuestionDeleteModal(true)} className="w-full px-3 py-1.5 text-left hover:bg-rose-50 text-rose-600 font-bold transition">Delete Question</button>
                    </div>
                  )}
                </div>
                <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-[#1A1C23] leading-relaxed">
                  {q.text}
                </div>
              </div>

              <div className="space-y-3 pl-2">
                <span className="text-xs font-bold text-[#1A1C23] uppercase tracking-wider block">Target Answers</span>
                {q.options.map((opt) => (
                  <div key={opt.key} className="space-y-1.5 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1A1C23]">Option {opt.key} {opt.key === q.correctKey && "(Marked Correct Solution)"}</span>
                      <button 
                        onClick={() => setActiveOptionMenu(activeOptionMenu === opt.key ? null : opt.key)}
                        className="p-1 text-slate-400 hover:text-slate-600 transition"
                      >
                        <FiMoreVertical size={14} />
                      </button>

                      {activeOptionMenu === opt.key && (
                        <div className="absolute right-0 top-5 w-32 bg-white rounded-lg border border-slate-100 shadow-md z-20 py-1 text-xs font-medium">
                          <button 
                            onClick={() => {
                              setEditingOptionTarget({ qId: q.id, optKey: opt.key });
                              setActiveOptionMenu(null);
                            }}
                            className="w-full px-3 py-1.5 text-left hover:bg-slate-50 transition"
                          >
                            Edit Option Value
                          </button>
                        </div>
                      )}
                    </div>

                    {editingOptionTarget?.qId === q.id && editingOptionTarget?.optKey === opt.key ? (
                      <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-indigo-100">
                        <input 
                          type="text" defaultValue={opt.text} id={`input-opt-${opt.key}`}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-[#1A1C23] outline-none animate-fadeIn"
                        />
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              const txt = document.getElementById(`input-opt-${opt.key}`).value;
                              setAssessmentQuestions(prev => prev.map(curQ => {
                                if (curQ.id === q.id) {
                                  return {
                                    ...curQ,
                                    options: curQ.options.map(o => o.key === opt.key ? { ...o, text: txt } : o)
                                  };
                                }
                                return curQ;
                              }));
                              setEditingOptionTarget(null);
                            }}
                            className="bg-[#D92D2D] text-white px-3 py-1 rounded-lg text-[11px] font-bold transition"
                          >
                            Update
                          </button>
                          <button onClick={() => setEditingOptionTarget(null)} className="text-slate-400 text-[11px] font-semibold">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs text-[#1A1C23]">
                        {opt.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4 border-t border-slate-50">
            <button onClick={navigateBack} className="text-xs font-bold text-slate-500 hover:text-slate-800 transition flex items-center gap-1">
              <FiArrowLeft /> Back to Previous View
            </button>
            <button className="bg-[#D92D2D] hover:bg-[#B82323] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs transition">
              Verify & Lock Template
            </button>
          </div>
        </div>
      )}

      {/* --- VIEW 7: ASSESSMENT SCORESHEET MATRIX --- */}
      {currentView === "VIEW_PERFORMANCE" && (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-3xs p-6 space-y-6 mx-auto animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Show</span>
              <select className="border border-slate-200 rounded-lg px-2 py-1 bg-slate-50 text-slate-700 outline-none">
                <option>10</option>
              </select>
              <span>entries</span>
            </div>
            <div className="relative w-64">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="text" placeholder="Search Mentees..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs outline-none" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70">
                  <th className="py-3 px-4 w-16 text-center">S/N</th>
                  <th className="py-3 px-4">Mentees</th>
                  <th className="py-3 px-4">Email Address</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Assessment Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs font-medium text-[#1A1C23]">
                {[
                  { name: "Daniel Solomon", email: "solomonbenji012@gmail.com", score: "100%", style: "text-emerald-600" },
                  { name: "Daniel Solomon", email: "solomonbenji012@gmail.com", score: "20%", style: "text-rose-500" }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-4 text-center text-[#1A1C23] font-mono">{index + 1}</td>
                    <td className="py-4 px-4 font-bold text-[#1A1C23]">{row.name}</td>
                    <td className="py-4 px-4 font-mono text-[#1A1C23]">{row.email}</td>
                    <td className={`py-4 px-4 font-bold ${row.style}`}>{row.score}</td>
                    <td className="py-4 px-4 text-[#1A1C23] font-mono">13-08-2023</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="pt-4 border-t border-slate-50 flex justify-start">
            <button onClick={navigateBack} className="text-xs font-bold text-slate-500 hover:text-slate-800 transition flex items-center gap-1">
              <FiArrowLeft /> Return to Workspace Dashboard
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL LAYER 1: MATERIAL DISMISSAL CONFIRMATION --- */}
      {showMaterialDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 border border-rose-100 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <FiAlertCircle size={24} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[#1A1C23]">Delete Material</h3>
              <p className="text-xs text-[#1A1C23] leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-[#1A1C23]">"{selectedMaterial?.title}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => setShowMaterialDeleteModal(false)}
                className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 py-2 rounded-xl text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteMaterial}
                className="flex-1 bg-[#D92D2D] hover:bg-[#B82323] text-white py-2 rounded-xl text-xs font-semibold transition shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL LAYER 2: QUESTION DISMISSAL PLATFORM --- */}
      {showQuestionDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 border border-rose-100 rounded-full flex items-center justify-center mx-auto">
              <FiAlertCircle size={24} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[#1A1C23]">Delete Question</h3>
              <p className="text-xs text-[#1A1C23] leading-relaxed">
                Are you sure you want to delete this question? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => setShowQuestionDeleteModal(false)}
                className="flex-1 border border-slate-200 hover:bg-slate-50 text-[#1A1C23] py-2 rounded-xl text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setAssessmentQuestions(prev => prev.filter(q => q.id !== activeQuestionMenu));
                  setShowQuestionDeleteModal(false);
                  setActiveQuestionMenu(null);
                }}
                className="flex-1 bg-[#D92D2D] hover:bg-[#B82323] text-white py-2 rounded-xl text-xs font-semibold transition shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
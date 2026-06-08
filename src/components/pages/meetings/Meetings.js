import React, { useState } from 'react';
import { Inbox, X, ChevronDown, Calendar } from 'lucide-react';

const Meetings = () => {
  const [viewState, setViewState] = useState('empty');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [formData, setFormData] = useState({
    title: 'Self Evaluation',
    description: 'A reflective session for personal growth and goal assessment',
    date: '2023-10-22',
    time: '15:30'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Meeting Rescheduled Successfully!");
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 md:mb-8">My Meetings</h1>

      {/* View State Toggle: Clicking the surrounding area moves to next state */}
      {viewState === 'empty' ? (
        <div 
          onClick={() => setViewState('populated')} 
          className="flex flex-col items-center justify-center h-[50vh] border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all p-4"
        >
          <div className="bg-red-50 p-6 rounded-full mb-4">
            <Inbox size={48} className="text-red-500" strokeWidth={1} />
          </div>
          <p className="text-gray-400 font-medium text-center">No scheduled meeting yet</p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table Controls */}
          <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-50">
            <div className="text-sm text-gray-500 w-full md:w-auto">
              Show <select className="border border-gray-300 rounded px-2 py-1 mx-1"><option>10</option></select> entries
            </div>
            <input type="text" placeholder="Search" className="border border-gray-200 rounded-md py-1.5 px-4 text-sm w-full md:w-64" />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="text-xs text-gray-500 uppercase border-b border-gray-50 bg-gray-50">
                <tr>{['S/N', 'Title', 'Mentor', 'Meeting Type', 'Description', 'Status', 'Date', 'Action'].map(h => <th key={h} className="px-6 py-4 font-medium">{h}</th>)}</tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4">Self Evaluation</td>
                    <td className="px-6 py-4">Daniel Francis</td>
                    <td className="px-6 py-4">{i % 2 === 0 ? "Physical" : "Virtual"}</td>
                    <td className="px-6 py-4 text-gray-500 truncate max-w-[120px]">A reflective session...</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${i===0 ? "bg-yellow-50 text-yellow-600" : i<2 ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}>
                        {i===0 ? "Ongoing" : i<2 ? "Upcoming" : "Completed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">13/10/2023</td>
                    <td className="px-6 py-4 relative">
                      <button 
                        onClick={() => setOpenDropdownId(openDropdownId === i ? null : i)}
                        className="border border-gray-200 px-3 py-1 rounded text-xs hover:bg-gray-50 flex items-center gap-1"
                      >
                        Action <ChevronDown size={12} />
                      </button>
                      
                      {openDropdownId === i && (
                        <div className="absolute right-6 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-xl z-20 overflow-hidden">
                          <button className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-50">Active</button>
                          <button 
                            onClick={() => { setIsModalOpen(true); setOpenDropdownId(null); }}
                            className="block w-full text-left px-4 py-2 text-xs hover:bg-red-50 text-red-600 font-medium"
                          >
                            Reschedule
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
            <div className="md:w-1/3 p-8 bg-gray-50 border-r border-gray-100 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
              <h3 className="font-bold text-lg">Daniel Francis</h3>
              <p className="text-sm text-gray-500 mb-6">Head of marketing</p>
              <div className="text-sm text-gray-600 text-left w-full px-4 mb-16 space-y-2">
                <p><strong>Contact:</strong> 09023456789</p>
                <p><strong>Email:</strong> danielfrancis20@gmail.com</p>
              </div>
              <div className="mt-auto flex flex-col items-center text-gray-400">
                <div className="bg-red-50 p-3 rounded-full mb-3"><Calendar size={24} className="text-[#D11A2A]" /></div>
                <p className="text-xs">Plan your next mentorship meeting and take a step towards your personal growth</p>
              </div>
            </div>

            <div className="w-full md:w-2/3 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Reschedule a Session</h2>
                <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-gray-700">Title *</label>
                  <input className="w-full border border-gray-200 rounded-lg p-3 mt-1 text-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700">Description *</label>
                  <textarea className="w-full border border-gray-200 rounded-lg p-3 mt-1 text-sm h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Availability Session *</label>
                    <input type="date" className="w-full border border-gray-200 rounded-lg p-3 mt-1 text-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700">Availability Time Slot *</label>
                    <input type="time" className="w-full border border-gray-200 rounded-lg p-3 mt-1 text-sm" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#D11A2A] text-white py-3 rounded-lg font-bold">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meetings;
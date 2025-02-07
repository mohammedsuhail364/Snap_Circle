// import React from 'react';
// import { FaCheck, FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Camera = () => {
  const currentPhotographer=JSON.parse(sessionStorage.getItem("photographer"));
  const navigate = useNavigate();
  const earnings=currentPhotographer.fees.split('/')[0].split('$')[1]
  
  
  // const photographerData = {
  //   earnings: 15000, // Total earnings in currency (e.g., dollars)
  //   appointments: [
  //     {
  //       name: 'John Doe',
  //       location: 'New York, NY',
  //       type: 'Wedding',
  //       date: '2024-12-20',
  //       session: 'Forenoon',
  //     },
  //     {
  //       name: 'Jane Smith',
  //       location: 'Los Angeles, CA',
  //       type: 'Birthday',
  //       date: '2024-12-22',
  //       session: 'Forenoon',
  //     },
  //     {
  //       name: 'Emily Johnson',
  //       location: 'Miami, FL',
  //       type: 'Corporate Event',
  //       date: '2024-12-25',
  //       session: 'Forenoon',
  //     },
  //   ],
  // };
  function fetchphotographerData() {
    
  }
  useEffect(()=>{
    fetchphotographerData();
  },[])
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Photographer Dashboard</h1>
        <button className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => (navigate("/portfolio"))}>MyPortfolio</button>
      </div>

      {/* Total Earnings */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Total Earnings</h2>
        <p className="text-xl sm:text-2xl font-bold mt-2 text-green-500">${Number(earnings)*currentPhotographer.appointments.length}</p>
      </div>

      {/* Appointments Overview */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Appointments</h2>
        <p className="text-base sm:text-lg font-medium">Total Appointments: {currentPhotographer.appointments.length}</p>
        <div className="overflow-x-auto">
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 sm:p-3 border-b">Name</th>
                <th className="p-2 sm:p-3 border-b">Location</th>
                <th className="p-2 sm:p-3 border-b">Type of Function</th>
                <th className="p-2 sm:p-3 border-b">Date</th>
                <th className="p-2 sm:p-3 border-b">Session</th>
              </tr>
            </thead>
            <tbody>
              {currentPhotographer.appointments.map((appointment, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 sm:p-3 border-b">{appointment.name}</td>
                  <td className="p-2 sm:p-3 border-b">{appointment.location}</td>
                  <td className="p-2 sm:p-3 border-b">{appointment.functionType}</td>
                  <td className="p-2 sm:p-3 border-b">{appointment.selectedDate.split('T')[0].split('-').reverse().join('-')}</td>
                  <td className="p-2 sm:p-3 border-b">{appointment.session}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Camera;

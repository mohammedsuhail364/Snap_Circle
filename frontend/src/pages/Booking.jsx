import { useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import axiosInstance from "../api/axiosInstance.js";

const Booking = () => {
  const [location, setLocation] = useState("");
  const [functionType, setFunctionType] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [session, setSession] = useState("");
  const [step, setStep] = useState(1);
  const {id}=useParams();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const allPhotographers = JSON.parse(sessionStorage.getItem("photographers"));
  const navigate=useNavigate();
  // Generate an array of dates from tomorrow to the next 15 days
  const photographerName = allPhotographers.find(p => p.id === id);
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 15; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSession(""); // Reset session when date changes
  };

  const handleSessionSelect = (session) => {
    setSession(session);
  };

  const handleNext = () => {
    if (step === 1 && location) {
      setStep(2);
    } else if (step === 2 && functionType) {
      setStep(3);
    } else if (step === 3 && selectedDate) {
      setStep(4);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  async function registerAppointmentService() {
    try {
      const { data } = await axiosInstance.put(`/auth/register-appointments/${id}`, {
        name:currentUser.userName,
        location,
        functionType,
        selectedDate,
        session,
        photographerName,
        userId:currentUser._id  
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  const handleConfirm =async () => {
    if (selectedDate && session) {
      const response =await registerAppointmentService();
      
      if (response.success) {
        alert(
          `Booking confirmed for ${location} - ${functionType} on ${selectedDate.toDateString()} (${session})`
        );
        navigate('/mybookings');
      }
    } else {
      alert("Please select a date and session.");
    }
  };

  const dates = generateDates();

  return (
    <div className="booking-page bg-gradient-to-b from-blue-200 via-orange-300 to-green-200 text-white p-6 h-1/5">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-500">
          Book Your Appointment
        </h1>

        {/* Location Selection */}
        {step === 1 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Select a Location</h2>
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 w-full rounded-lg border border-gray-300"
            />
          </div>
        )}

        {/* Type of Function Selection */}
        {step === 2 && location && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              Select Type of Function
            </h2>
            <div className="flex gap-4">
              {["Wedding", "Birthday", "Corporate Event"].map((option) => (
                <button
                  key={option}
                  onClick={() => setFunctionType(option)}
                  className={`p-3 rounded-lg transition duration-300 ${
                    functionType === option
                      ? "bg-teal-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-purple-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Date Selection */}
        {step === 3 && functionType && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Select a Date</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {dates.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateSelect(date)}
                  className={`p-3 rounded-lg transition duration-300 ${
                    selectedDate?.toDateString() === date.toDateString()
                      ? "bg-teal-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-purple-200"
                  }`}
                >
                  {date.toDateString()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Session Selection */}
        {step === 4 && selectedDate && (
          <div className="mb-6 flex flex-col gap-10">
            <h2 className="text-2xl font-semibold mb-3">Select a Session</h2>
            <div className="flex gap-4 justify-center">
              {["Forenoon", "Afternoon", "Whole Day"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleSessionSelect(option)}
                  className={`p-3 rounded-lg transition duration-300 ${
                    session === option
                      ? "bg-teal-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-purple-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleConfirm}
              className="mx-auto px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-52 items-center"
            >
              Confirm Booking
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              onClick={handlePrevious}
              className="px-6 py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            >
              Previous
            </button>
          )}
          {step < 4 && (
            <button
              onClick={handleNext}
              className="ml-auto px-6 py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;

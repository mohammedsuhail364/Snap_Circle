import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const Mybookings = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  // Example Booking Data
  // const bookings = [
  //   {
  //     id: 1,
  //     profilePicture: 'https://via.placeholder.com/150',
  //     location: 'Central Park, NY',
  //     date: '2024-06-20',
  //     session: 'Forenoon',
  //     fees: '$300',
  //   },
  //   {
  //     id: 2,
  //     profilePicture: 'https://via.placeholder.com/150',
  //     location: 'Downtown Studio, CA',
  //     date: '2024-07-05',
  //     session: 'Afternoon',
  //     fees: '$450',
  //   },
  // ];

  // const handlePay = (id) => {
  //   alert(`Paying for booking ID: ${id}`);
    // Integrate payment logic here
  // };
  async function cancelAppointmentService(photographerId,index,date) {
    try {
           
      const {data}=await axiosInstance.delete(`/auth/cancel-appointment/${photographerId}/${currentUser._id}`,{ data: { index1: index,date:date } });
      return data;
    } catch (error) {
      console.log(error);
      
    } 
  }
  async function cancelAppointment(photographerId,index,date) {
    const response =await cancelAppointmentService(photographerId,index,date);
    console.log(response);
    setBookings(response.appointments);
    
    if (response.success){
      setBookings(response.appointments)
    }
     
  }
  const handleCancel = (photographerId,index,date) => {
    cancelAppointment(photographerId,index,date);
    
    // Integrate cancellation logic here
  };
  async function fetchBookingService() {
    try {
      const { data } = await axiosInstance.get(
        `/auth/my-bookings/${currentUser._id}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchBookings() {
    const response = await fetchBookingService();
    console.log(response);
    
    setBookings(response.myAppointments);
  }
  useEffect(() => {
    fetchBookings();
  }, []);
  if (bookings.length === 0) {
    return (
      <div className=" flex justify-center">
        <h1 className=" font-bold text-5xl">No Bookings</h1>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>

      {/* Booking Cards */}
      {bookings.map((booking,index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 mb-6 bg-white shadow-lg rounded-lg"
        >
          {/* Profile Picture */}
          <img
            src={booking.photographerImage}
            alt="Photographer"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />

          {/* Booking Details */}
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-700">
              Location:{" "}
              <span className="text-gray-900">{booking.location}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Date: <span className="text-gray-900">{booking.selectedDate.split('T')[0].split('-').reverse().join('-')}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Session: <span className="text-gray-900">{booking.session}</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Fees:{" "}
              <span className="text-gray-900">{booking.photographerFees}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            {/*<button
              onClick={() => handlePay(booking.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Pay Online
            </button>*/}
            <button
              onClick={() => handleCancel(booking.photographer,index,booking.selectedDate)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mybookings;

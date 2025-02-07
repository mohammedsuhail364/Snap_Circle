import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Importing the cancel icon

const Appointment = () => {
  // Sample data for today's appointments
  const appointments = [
    {
      id: 1,
      photographer: {
        name: 'John Doe',
        photo: 'https://via.placeholder.com/150', // Placeholder image
        location: 'New York, USA',
      },
      session: 'Wedding Photography',
      fees: '$500',
      functionType: 'Photography',
    },
    {
      id: 2,
      photographer: {
        name: 'Jane Smith',
        photo: 'https://via.placeholder.com/150', // Placeholder image
        location: 'Los Angeles, USA',
      },
      session: 'Portrait Session',
      fees: '$400',
      functionType: 'Photography',
    },
    {
      id: 3,
      photographer: {
        name: 'Alice Johnson',
        photo: 'https://via.placeholder.com/150', // Placeholder image
        location: 'San Francisco, USA',
      },
      session: 'Event Photography',
      fees: '$600',
      functionType: 'Photography',
    },
  ];

  // Function to handle appointment cancellation
  const handleCancelAppointment = (id) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this appointment?');
    if (confirmCancel) {
      alert(`Appointment with ID ${id} has been cancelled.`);
      // You can add logic here to actually remove the appointment or update the state
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Today's Appointments</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center relative"
          >
            {/* Cancel Button */}
            <button
              onClick={() => handleCancelAppointment(appointment.id)}
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-300"
            >
              <FaTimes size={18} />
            </button>

            {/* Photographer Photo */}
            <img
              src={appointment.photographer.photo}
              alt={appointment.photographer.name}
              className="w-32 h-32 object-cover rounded-full mb-4"
            />

            {/* Photographer Details */}
            <h3 className="font-semibold text-xl">{appointment.photographer.name}</h3>
            <p className="text-sm text-gray-600">{appointment.photographer.location}</p>

            {/* Session Details */}
            <p className="text-lg text-green-600">{appointment.session}</p>

            {/* Fees */}
            <p className="text-lg text-blue-600">{appointment.fees}</p>

            {/* Function Type */}
            <p className="text-sm text-gray-600">{appointment.functionType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointment;

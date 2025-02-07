import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PhotographerCard = ({ id, name, jobTitle, location, profileImage, description, fees }) => {
  const navigate=useNavigate();
  const handleClick = () => {
    navigate(`/photographer/${id}`); // Navigate to the specific photographer's page
  };
  
  
  

  return (
    <motion.div
      className="bg-gradient-to-r from-blue-200 via-orange-300 to-green-200 rounded-lg shadow-xl p-6 max-w-xs mx-auto transform transition duration-500 hover:scale-105"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative group">
        {/* Profile Image */}
        <img
          src={profileImage}
          alt={name}
          className="w-full h-48 object-cover rounded-lg group-hover:opacity-80 transition-opacity duration-300"
        />
        {/* Hover Effect on Image */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleClick}
            className="text-white font-bold py-2 px-4 rounded-full bg-teal-500 hover:bg-teal-600 transform transition duration-200"
          >
            View Portfolio
          </button>
        </div>
      </div>
      <div className="mt-4">
        {/* Name and Job Title */}
        <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
        <p className="text-md text-gray-800">{jobTitle}</p>
        <p className="text-sm text-gray-700">{location}</p>
      </div>
      <div className="mt-4">
        {/* Fees */}
        <p className="text-lg text-gray-900 font-bold">Fees: {fees}</p>
      </div>
      <div className="mt-4">
        {/* Description */}
        <p className="text-gray-800 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default PhotographerCard;

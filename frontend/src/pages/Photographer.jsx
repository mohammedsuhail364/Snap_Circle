import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Photographer = ({ photographer }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const photographerCurr=JSON.parse(sessionStorage.getItem('photographer'));
  const user=JSON.parse(sessionStorage.getItem('user'));

  // const { name, jobTitle, profileImage, location, fees, description } =
  //   photographer[id - 1];
  const [profile, setProfile] = useState({
    name: "",
    jobTitle: "",
    profileImage: "",
    location: "",
    fees: "",
    description: "",
    samplePhotos: [],
    email:"",
  });

  async function getPhotographerService(id) {
    try {
      const { data } = await axiosInstance.get(`/auth/photographer/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getPhotographer() {
    const response = await getPhotographerService(id);
    setProfile({
      name: response.photographer.name,
      jobTitle: response.photographer.specialization,
      profileImage: response.photographer.profilePicture,
      location: response.photographer.locality,
      fees: response.photographer.fees,
      description: response.photographer.address,
      samplePhotos: response.photographer.samplePhotos,
      email: response.photographer.email,

    });
  }
  useEffect(() => {
    getPhotographer();
  }, []);
  const handleBack = () => {
    navigate("/community");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row relative">
          {/* Back to Community Button for small screens (cross icon) */}
          <button
            onClick={handleBack}
            className="absolute top-4 right-4 flex items-center justify-center text-teal-600 hover:text-teal-800 transition font-semibold space-x-2 md:hidden rounded-full bg-white p-3 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Back to Community Button for larger screens (arrow + text) */}
          <button
            onClick={handleBack}
            className="absolute top-4 right-4 hidden md:flex items-center justify-center text-teal-600 hover:text-teal-800 transition font-semibold space-x-2 bg-white p-3 rounded-lg shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Community</span>
          </button>

          {/* Profile Image */}
          <div className="md:w-1/3">
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-full h-72 object-cover md:h-full"
            />
          </div>

          {/* Details Section */}
          <div className="md:w-2/3 p-6 flex flex-col space-y-4 bg-gray-50 rounded-lg shadow-sm">
            <h1 className="text-4xl font-extrabold text-teal-600">
              {profile.name}
            </h1>
            <p className="text-xl font-medium text-gray-800 italic">
              {profile.jobTitle}
            </p>
            <div className="flex items-center text-gray-700">
              <span className="font-semibold">📍 Location:</span>
              <span className="ml-2">{profile.location}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="font-semibold">💰 Fees:</span>
              <span className="ml-2">₹{profile.fees}</span>
            </div>
            <p className="text-gray-700 leading-relaxed border-t pt-4">
              <span className="block font-semibold mb-2">About:</span>
              {profile.description}
            </p>
          </div>
        </div>

        {/* Portfolio Gallery Section */}
        <div className="p-6 border-t">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Portfolio Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {profile.samplePhotos.map((image, index) => (
              <img key={index} src={image} alt="sample Image" />
            ))}
          </div>
        </div>
        {/* Contact Section */}
        <div className="p-6 border-t bg-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact {profile.name}
          </h2>
          <p className="text-gray-700">
            If you{"'"}re interested in hiring {profile.name}, feel free to
            reach out for availability and bookings.
          </p>
          <button
            onClick={() =>{
              if(profile.email===user.userEmail){
               return alert("You can't book yourself ")
              }
              navigate(`/booking/${id}`)}}
            className="mt-4 px-4 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition"
            
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Photographer;

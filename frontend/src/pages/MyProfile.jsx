import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const MyProfile = () => {
  // Initial profile data (empty by default)

  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser.userName,
    email: currentUser.userEmail,
    gender: currentUser.gender,
    profilePicture: currentUser.profilePicture,
    contactNumber: currentUser.contactNumber,
    address: currentUser.address,
  });

  // State to toggle between edit mode and view mode
  const [isEditing, setIsEditing] = useState(false);

  // updateService
  async function updateService(formData) {
    try {
      const { data } = await axiosInstance.post("/auth/update", formData);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // Handle input change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    //
  };

  // Handle file change (for profile picture)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: file ? URL.createObjectURL(file) : '',
      
    }));
  };

// Converts blob URL to a File
async function urlToFile(url, filename = "file.jpg") {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    const blob = await response.blob(); // Convert blob to a File
    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    console.error("Error in urlToFile:", error);
    throw error;
  }
}

// Uploads the image to your backend
async function mediaUploadService(formData) {
  try {
    const { data } = await axiosInstance.post("/auth/updateImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data; // Return the response from the backend
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

// Handles the actual image upload
async function handleImageUploadChange() {
  try {

    const file = await urlToFile(profile.profilePicture, "profile.jpg"); // Convert blob to File
    const formData = new FormData();
    formData.append("file", file);

    const response = await mediaUploadService(formData); // Upload to Cloudinary via backend
    if (response?.url) {
      console.log("Image uploaded successfully:", response.url);
      return response.url; // Return the Cloudinary URL
    } else {
      console.error("Invalid response format from server:", response);
    }
  } catch (error) {
    console.error("Error during image upload:", error);
    throw error;
  }
}

// Handles image upload and profile saving
const handleSave = async () => {
  try {
    if(!profile.profilePicture){
      return alert('upload image to save')
    }
    setLoading(true);
    const url = await handleImageUploadChange();
     // Upload the image to Cloudinary
     const updatedProfile = {
      ...profile,
      profilePicture: url, // Update profile picture with Cloudinary URL
    };

    
    const response = await updateService(updatedProfile);
    sessionStorage.removeItem("user");
    sessionStorage.setItem("user", JSON.stringify(response.data));
    sessionStorage.setItem("token", "authenticate");

    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    setProfile({
      name: currentUser.userName,
      email: currentUser.userEmail,
      gender: currentUser.gender,
      profilePicture: currentUser.profilePicture,
      contactNumber: currentUser.contactNumber,
      address: currentUser.address,
    });

    alert("Profile saved!");
  } catch (error) {
    console.error("Error saving profile:", error);
    alert("Failed to save profile. Please try again.");
  } finally {
    setLoading(false);
    setIsEditing(false); // Exit editing mode
  }
};




  // Handle edit action
  const handleEdit = () => {
    setIsEditing(true); // Switch to edit mode
  };

  return (
    <div className="p-6 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isEditing ? "Edit Your Profile" : "Profile Details"}
        </h2>

        {/* If editing, show the form */}
        {isEditing ? (
          <form className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out">
            {/* Name */}
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date of Birth */}
            {/* <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}

            {/* Gender */}
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Profile Picture */}
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="profilePicture"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {profile.profilePicture && (
                <div className="mt-4">
                  <img
                    src={profile.profilePicture}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-full transition-all duration-500 ease-in-out transform"
                  />
                </div>
              )}
            </div>

            {/* Contact Number */}
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="contactNumber"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={profile.contactNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>

            {/* Save Button */}
            <div className="mb-4 flex justify-center">
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="w-full bg-teal-500 text-white px-6 py-2 rounded-lg font-semibold transform transition-all duration-300 hover:bg-teal-600"
              >
                {loading?'Loading...':'Save'}
              </button>
            </div>
          </form>
        ) : (
          // If not editing, show the profile details in a card
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out">
            <div className="flex justify-center mb-4">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full transition-all duration-500 ease-in-out"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">No Image</span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <strong>Name: </strong>
              <span>{profile.name || "Not set"}</span>
            </div>

            <div className="mb-4">
              <strong>Email: </strong>
              <span>{profile.email || "Not set"}</span>
            </div>

            {/* <div className="mb-4">
              <strong>Date of Birth: </strong>
              <span>{profile.dob || "Not set"}</span>
            </div> */}

            <div className="mb-4">
              <strong>Gender: </strong>
              <span>{profile.gender || "Not set"}</span>
            </div>

            <div className="mb-4">
              <strong>Contact Number: </strong>
              <span>{profile.contactNumber || "Not set"}</span>
            </div>

            <div className="mb-4">
              <strong>Address: </strong>
              <span>{profile.address || "Not set"}</span>
            </div>

            {/* Edit Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleEdit}
                className="bg-teal-500 text-white px-6 py-2 rounded-lg font-semibold transform transition-all duration-300 hover:bg-teal-600"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

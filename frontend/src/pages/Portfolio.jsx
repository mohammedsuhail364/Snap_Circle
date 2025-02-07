import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
const Portfolio = () => {
  const currentPhotographer = JSON.parse(
    sessionStorage.getItem("photographer")
  );
  const [formData, setFormData] = useState({
    name: currentPhotographer.name,
    specialization: currentPhotographer.specialization,
    fees: currentPhotographer.fees,
    address: currentPhotographer.address,
    locality: currentPhotographer.locality,
    availability: currentPhotographer.availability,
    profilePicture: currentPhotographer.profilePicture,
    samplePhotos: currentPhotographer.samplePhotos,
  });

  const [uniquePhoto, setUniquePhoto] = useState(
    currentPhotographer.uniquePhoto // Default placeholder for the special photo
  );

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePhotoChange = (e, index, isUnique = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (isUnique) {
          setUniquePhoto(reader.result);
        } else if (index === -1) {
          setFormData({ ...formData, profilePicture: reader.result });
        } else {
          const updatedPhotos = [...formData.samplePhotos];
          updatedPhotos[index] = reader.result;
          setFormData({ ...formData, samplePhotos: updatedPhotos });
        }
      };
      reader.readAsDataURL(file);
    }
  };
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
  async function handleImageUploadChange(picture) {
    try {
      const file = await urlToFile(picture, "profile.jpg"); // Convert blob to File
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
  async function savePortfolioService(formData) {
    try {
      const { data } = await axiosInstance.post(
        "/auth/update-portfolio",
        formData
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  const handleSave = async () => {
    // console.log(formData);
    
    if (formData.profilePicture === "https://via.placeholder.com/130") {
      alert("click the profile and change the profile picture");
      return;
    }
    for (const item of formData.samplePhotos) {
      if (item === "https://via.placeholder.com/300") {
        alert("Set the sample Photos");
        return; // Exit the loop after the first alert
      }
    }
    if (uniquePhoto === "https://via.placeholder.com/400") {
      alert("set your unique photo");
      return;
    }
    setLoading(true)
    const updatedProfilePic = await handleImageUploadChange(
      formData.profilePicture
    );
    const updatedSamplePhotos = [];
    formData.samplePhotos.map(async (item) => {
      const updatedSamplePic = await handleImageUploadChange(item);
      updatedSamplePhotos.push(updatedSamplePic);
    });
    const updatedUniquePhoto = await handleImageUploadChange(uniquePhoto);
    // console.log(updatedProfilePic);
    // console.log(updatedSamplePhotos);
    // console.log(updatedUniquePhoto);
    const updatedFormdata = {
      ...formData,
      profilePicture: updatedProfilePic,
      samplePhotos: updatedSamplePhotos,
      updatedUniquePhoto,
      email: currentPhotographer.email,
    };

    const response = await savePortfolioService(updatedFormdata);
    sessionStorage.removeItem("photographer");
    sessionStorage.setItem(
      "photographer",
      JSON.stringify(response.photographer)
    );
    setLoading(false)
    alert("Portfolio updated")
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-teal-50 via-white to-teal-50 rounded-xl shadow-xl">
      {/* Header Section */}
      <div className="flex items-center gap-6 mb-8">
        {isEditing ? (
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoChange(e, -1)}
              className="hidden"
            />
            <img
              src={formData.profilePicture}
              alt="Photographer"
              className="w-28 h-28 rounded-full border-4 border-teal-300 shadow-md cursor-pointer"
              title="Click to edit profile picture"
            />
          </label>
        ) : (
          <img
            src={formData.profilePicture}
            alt="Photographer"
            className="w-28 h-28 rounded-full border-4 border-teal-300 shadow-md"
          />
        )}
        <div>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-3xl font-extrabold text-teal-600 border-b-2 focus:outline-none focus:border-teal-400"
            />
          ) : (
            <h1 className="text-3xl font-extrabold text-teal-600">
              {formData.name}
            </h1>
          )}
          {isEditing ? (
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="text-lg text-gray-500 italic border-b-2 focus:outline-none focus:border-teal-400"
            />
          ) : (
            <p className="text-lg text-gray-500 italic">
              Specialized in: {formData.specialization}
            </p>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        {isEditing ? (
          <>
            <p className="text-lg font-semibold mb-2">
              Fees:
              <input
                type="text"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                className="ml-2 text-teal-600 border-b-2 focus:outline-none focus:border-teal-400"
              />
            </p>
            <p className="text-lg font-semibold mb-2">
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="ml-2 text-teal-600 border-b-2 focus:outline-none focus:border-teal-400"
              />
            </p>
            <p className="text-lg font-semibold">
              Locality:
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                className="ml-2 text-teal-600 border-b-2 focus:outline-none focus:border-teal-400"
              />
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold mb-2">
              Fees: <span className="text-teal-600">{formData.fees}</span>
            </p>
            <p className="text-lg font-semibold mb-2">
              Address: <span className="text-teal-600">{formData.address}</span>
            </p>
            <p className="text-lg font-semibold">
              Locality:{" "}
              <span className="text-teal-600">{formData.locality}</span>
            </p>
          </>
        )}
      </div>

      {/* Sample Photos */}
      <h2 className="text-2xl font-bold text-teal-600 mb-4">Sample Work</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {formData.samplePhotos.map((photo, index) => (
          <div key={index} className="relative group">
            <img
              src={photo}
              alt={`Sample Work ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
            />
            {isEditing && (
              <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(e, index)}
                  className="hidden"
                />
                Change Photo
              </label>
            )}
          </div>
        ))}
      </div>

      {/* Special Unique Photo */}
      <h2 className="text-2xl font-bold text-teal-600 mb-4">
        Add Your Special and Unique Photo Here (Visible to All SnapCircle Users)
      </h2>
      <div className="relative group mb-8">
        <img
          src={uniquePhoto}
          alt="Special Unique Photo"
          className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
        />
        {isEditing && (
          <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoChange(e, null, true)}
              className="hidden"
            />
            Change Photo
          </label>
        )}
      </div>

      {/* Edit/Save Button */}
      <div className="mt-8 text-center">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Loading...":"Save"}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Portfolio;

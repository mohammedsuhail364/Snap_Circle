
const AllPhotographers = () => {
  // Sample photographer data
  const photographers = [
    {
      id: 1,
      name: 'John Doe',
      location: 'New York, USA',
      fees: '$500',
      availability: true,
      photo: 'https://via.placeholder.com/150', // Placeholder image
    },
    {
      id: 2,
      name: 'Jane Smith',
      location: 'Los Angeles, USA',
      fees: '$600',
      availability: false,
      photo: 'https://via.placeholder.com/150', // Placeholder image
    },
    {
      id: 3,
      name: 'Alice Johnson',
      location: 'San Francisco, USA',
      fees: '$450',
      availability: true,
      photo: 'https://via.placeholder.com/150', // Placeholder image
    },
  ];

  // Sample user data (for count purposes)
  const users = [
    { id: 1, name: 'User One' },
    { id: 2, name: 'User Two' },
    { id: 3, name: 'User Three' },
  ];

  // Handle checkbox change for photographers' availability
  const handleAvailabilityChange = (id) => {
    const updatedPhotographers = photographers.map((photographer) =>
      photographer.id === id
        ? { ...photographer, availability: !photographer.availability }
        : photographer
    );
    console.log(updatedPhotographers);
  };

  // Handle cross click event for deleting photographer
  const handleDeletePhotographer = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this photographer?');
    if (confirmDelete) {
      console.log(`Photographer with ID ${id} has been removed.`);
      // You can filter or delete the photographer from the array here
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Photographers</h2>

      {/* Display total counts */}
      <div className="mb-6 text-lg font-medium">
        <p>Total Photographers: {photographers.length}</p>
        <p>Total Users: {users.length}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photographers.map((photographer) => (
          <div
            key={photographer.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center relative"
          >
            {/* Cross icon */}
            <button
              onClick={() => handleDeletePhotographer(photographer.id)}
              className="absolute top-2 right-2 text-2xl text-gray-800 hover:text-red-600 hover:scale-125 transition-all duration-300"
            >
              &times;
            </button>

            <img
              src={photographer.photo}
              alt={photographer.name}
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h3 className="font-semibold text-xl">{photographer.name}</h3>
            <p className="text-sm text-gray-600">{photographer.location}</p>
            <p className="text-lg text-green-600">{photographer.fees}</p>

            {/* Availability Checkbox */}
            <label className="mt-4 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={photographer.availability}
                onChange={() => handleAvailabilityChange(photographer.id)}
                className="form-checkbox"
              />
              <span>Available</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPhotographers;

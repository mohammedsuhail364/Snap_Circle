import { assets } from "../assets/assests";
import "./Offers.css";

const Offers = () => {
  const offers = [
    {
      title: "Flat 20% Off on Holiday Shoots",
      description: "Capture your holiday memories with exclusive discounts. Book before Dec 31!",
      validity: "Valid till Dec 31, 2024",
      bgColor: "bg-orange-100",
    },
    {
      title: "Special Wedding Packages",
      description: "Book your wedding photographer now and save big with customized packages.",
      validity: "Limited Time Offer",
      bgColor: "bg-green-100",
    },
    {
      title: "Portrait Photography at $99",
      description: "Get stunning portraits at an unbeatable price. Offer valid for early bookings.",
      validity: "Valid till Jan 15, 2025",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            📸 Exclusive Christmas Offers 🎁
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ${offer.bgColor}`}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <p className="text-sm text-gray-500">{offer.validity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="santa-container">
        <div className="bg-overlay"></div>
        <img
          className="santa-image w-96 mx-auto"
          src={assets.santa}
          alt="Santa"
        />
        {/* Snowflakes */}
        <div className="snow-container">
          <div className="snowflake"></div>
          <div className="snowflake"></div>
          <div className="snowflake"></div>
          <div className="snowflake"></div>
          <div className="snowflake"></div>
        </div>
      </div>
    </div>
  );
};

export default Offers;

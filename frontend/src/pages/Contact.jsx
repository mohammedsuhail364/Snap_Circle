import { useRef } from "react";
import { PhoneIcon, Mail, MapPin } from "lucide-react";
import { assets } from "../assets/assests";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hzjmsno", // Replace with your EmailJS Service ID
        "template_69lwwfq", // Replace with your EmailJS Template ID
        formRef.current,
        "Y4u_-kyILAXBT8eUR" // Replace with your EmailJS User ID
      )
      .then(
        (result) => {
          alert("Feedback submitted successfully!");
          console.log(result.text);
        },
        (error) => {
          alert("Failed to send feedback. Please try again.");
          console.log(error.text);
        }
      );

    // Reset the form after submission
    e.target.reset();
  };

  return (
    <div>
      {/* First Section (Get in Touch) */}
      <motion.section
        className="bg-gradient-to-r from-blue-200 via-orange-300 to-green-200 py-20 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto px-5">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700">
            Get in Touch with SnapCircle
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            We’re here to answer your queries, listen to your feedback, and help
            you connect with our team!
          </p>
        </div>
      </motion.section>

      {/* Contact Details Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phone */}
          <motion.div
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="p-6 rounded-full bg-blue-100 w-fit mx-auto">
              <PhoneIcon size={24} color="currentColor" />
            </div>
            <h2 className="text-xl font-semibold mt-4">Phone</h2>
            <p className="text-gray-600 mt-2">+91 8778354283</p>
          </motion.div>

          {/* Email */}
          <motion.div
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="p-6 rounded-full bg-green-100 w-fit mx-auto">
              <Mail size={24} color="currentColor" />
            </div>
            <h2 className="text-xl font-semibold mt-4">Email</h2>
            <p className="text-gray-600 mt-2">snapcircle@gmail.com</p>
          </motion.div>

          {/* Address */}
          <motion.div
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="p-6 rounded-full bg-yellow-100 w-fit mx-auto">
              <MapPin size={24} color="currentColor" />
            </div>
            <h2 className="text-xl font-semibold mt-4">Address</h2>
            <p className="text-gray-600 mt-2">Eachanari, Coimbatore</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Feedback Form Section */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <section className="py-16 w-full">
          <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Feedback Form */}
            <motion.div
              className="flex flex-col justify-center md:pr-8"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-center">
                We{"'"}d Love to Hear Your Feedback!
              </h2>
              <p className="text-center text-gray-600 mt-4">
                Please let us know your thoughts and suggestions.
              </p>
              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="mt-8 space-y-6"
              >
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="from_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    id="from_name"
                    name="from_name" // This "name" must match the template variable
                    type="text"
                    placeholder="Enter your name"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                {/* Feedback Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Feedback
                  </label>
                  <textarea
                    id="message"
                    name="message" // This "name" must match the template variable
                    rows="6"
                    placeholder="Type your feedback here..."
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                </div>

                

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 text-gray-800 bg-gradient-to-r from-blue-200 via-orange-300 to-green-200 hover:shadow-xl font-semibold rounded-md shadow transition"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Image Section */}
            <motion.div
              className="flex justify-center items-center relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <img
                src={assets.feedback}
                alt="Feedback"
                className="w-full h-auto max-w-md"
              />
              {/* Message Box Below the Image */}
              <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-lg shadow-xl text-center text-sm text-gray-700">
                <p>
                  Your voice matters! Share your feedback, and together we{"'"}
                  ll create something amazing.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Contact;

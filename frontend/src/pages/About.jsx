import { motion } from 'framer-motion'; // Importing motion for animations
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Intro Section */}
      <motion.section
        className="bg-gradient-to-r from-blue-200 via-orange-300 to-green-200 py-20 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto px-5">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-700"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            About SnapCircle
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Connecting you with skilled photographers and making your moments unforgettable!
          </motion.p>
        </div>
      </motion.section>

      {/* How SnapCircle Works Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-5 text-center">
          <motion.h2
            className="text-2xl font-bold text-gray-700"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            How SnapCircle Works
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            SnapCircle helps you easily find and book professional photographers based on your needs. 
            Whether you{"'"}re looking for a portrait session or a wedding photographer, we have you covered!
          </motion.p>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="bg-gray-100 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="max-w-6xl mx-auto px-5 text-center">
          <motion.h2
            className="text-2xl font-bold text-gray-700"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            Meet Our Team
          </motion.h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member Cards with Motion */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              {/* <img src="team-member1.jpg" alt="Team Member 1" className="w-full h-40 object-cover rounded-t-lg" /> */}
              <h3 className="mt-4 text-xl font-semibold text-gray-700">Mohammed Suhail</h3>
              <p className="text-gray-500">Backend Developer</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              {/* <img src="team-member2.jpg" alt="Team Member 2" className="w-full h-40 object-cover rounded-t-lg" /> */}
              <h3 className="mt-4 text-xl font-semibold text-gray-700">Mufeeth Lafir</h3>
              <p className="text-gray-500">Flutter Developer</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              {/* <img src="team-member3.jpg" alt="Team Member 3" className="w-full h-40 object-cover rounded-t-lg" /> */}
              <h3 className="mt-4 text-xl font-semibold text-gray-700">Somasundaram</h3>
              <p className="text-gray-500">Frontend Developer</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* What Makes Us Unique Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <div className="max-w-6xl mx-auto px-5 text-center">
          <motion.h2
            className="text-2xl font-bold text-gray-700"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, delay: 2.4 }}
          >
            What Makes SnapCircle Unique?
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.6 }}
          >
            SnapCircle is not just a platform to find photographers – it{"'"}s a community. 
            With personalized profiles, real-time availability, and seamless booking, we make it easy to capture your best moments.
          </motion.p>
        </div>
      </motion.section>

      {/* Customer Testimonials Section */}
      <motion.section
        className="bg-gray-100 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
      >
        <div className="max-w-6xl mx-auto px-5 text-center">
          <motion.h2
            className="text-2xl font-bold text-gray-700"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 3 }}
          >
            What Our Users Say
          </motion.h2>
          <div className="mt-8 space-y-6">
            <motion.blockquote
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.2 }}
            >
              SnapCircle made booking my wedding photographer so easy! The process was smooth, and the photographer captured our day perfectly.
              – Emma & Liam
            </motion.blockquote>
            <motion.blockquote
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.4 }}
            >
              I love how I can browse portfolios and instantly book the perfect photographer for my family portraits. 
              – Sarah T.
            </motion.blockquote>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="py-16 text-center bg-gradient-to-r from-blue-200 via-orange-300 to-green-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.6 }}
      >
        <motion.h2
          className="text-2xl font-bold text-white"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 3.8 }}
        >
          Join SnapCircle Today!
        </motion.h2>
        <motion.p
          className="text-lg text-white mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
        >
          Sign up now to find your next photographer or apply to be a part of our amazing team!
        </motion.p>
        <motion.button
          onClick={() => navigate("/login")}
          className="mt-8 py-3 px-6 bg-gray-800 text-white font-bold rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4.2 }}
        >
          Get Started
        </motion.button>
      </motion.section>
    </div>
  );
};

export default About;

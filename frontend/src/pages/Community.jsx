import PhotographerCard from '../components/PhotographerCard';
import { motion } from 'framer-motion';

const Community = () => {
  const allPhotographers=JSON.parse(sessionStorage.getItem('photographers'));
  const user=JSON.parse(sessionStorage.getItem('user'));
  
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-8">Meet Our Talented Photographers</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Mapping through photographers data and rendering PhotographerCard with animations */}
          {allPhotographers.map((photographer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}  // Initial state (hidden and slightly below)
              animate={{ opacity: 1, y: 0 }}   // Final state (visible and at normal position)
              transition={{ duration: 0.5, delay: index * 0.1 }} // Animation duration and staggered delay
            >
              {photographer.email===user.userEmail ? <p className=' text-2xl font-bold mb-3'>It{"'"}s You</p>:<p className='text-2xl font-bold mb-3'>Book Now</p>}
              <PhotographerCard
                id={photographer._id}
                name={photographer.name}
                jobTitle={photographer.jobTitle}
                location={photographer.locality}
                profileImage={photographer.profilePicture}
                description={photographer.address}
                fees={photographer.fees}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;

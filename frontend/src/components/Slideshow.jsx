import  { useState, useEffect } from 'react';
import { images } from '../assets/assests';
import { SquareArrowRight , SquareArrowLeft} from 'lucide-react';
import { motion } from 'framer-motion';



const Slideshow = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1)
        );
    };

    return (
        <motion.div 
        initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
            <h2 className="text-3xl font-bold text-center my-6">
                See Our Photographers{"'"} Latest Captured Pictures
            </h2>
            <div className="relative w-96 mx-auto bg-slate-400">
                {/* Image */}
                <img
                    src={images[currentImageIndex]}
                    alt={`Slide ${currentImageIndex + 1}`}
                    className="w-full  object-cover"
                />

                {/* Buttons Outside the Image */}
                <div className="absolute inset-0 flex justify-between items-center px-4 -translate-y-1/2">
                    <button
                        onClick={handlePrevious}
                        className="sm:hidden lg:flex p-3 rounded-full top-1/2 shadow hover:bg-gray-200"
                        style={{ left: '-10rem', position: 'relative' }}
                    >
                       <SquareArrowLeft/>
                    </button>
                    <button
                        onClick={handleNext}
                        className="sm:hidden lg:flex p-3 rounded-full shadow-md top-1/2 hover:bg-gray-200"
                        style={{ right: '-10rem', position: 'relative' }}
                    >
                        <SquareArrowRight/>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Slideshow;

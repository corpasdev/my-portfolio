import React from "react";
import { motion } from "motion/react";

const Hero: React.FC = () => {
    return (
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Brandon Corpas
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Full-Stack Web Developer
        </motion.p>
      </section>
    );
  };
  
export default Hero;
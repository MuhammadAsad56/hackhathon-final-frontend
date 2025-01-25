import React, { useContext } from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  if(!user) return <Navigate to={"/"} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-landing-background text-landing-text"
    >
      <Header />
      {/* <Hero />
      <Courses />
      <Management />
      <Reviews />
      <Footer /> */}
    </motion.div>
  );
};

export default HomePage;

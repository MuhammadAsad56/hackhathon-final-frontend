import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link as LinkScroll } from "react-scroll";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(AuthContext);
  const handleLogout = () => {
    Cookies.remove("token"); // Clear the token cookie
    setUser(null); 
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="w-full sticky top-0 left-0 right-0 bg-landing-background shadow-md z-50"
    >
      <div className="w-[90%] mx-auto px-4 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.1 }}>
          <img
            className="w-[70px] h-[70px]"
            src="https://images.unsplash.com/photo-1737403428945-c584529b7b17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </motion.div>
        <nav className="hidden md:flex space-x-6">
          {["Home", "Courses", "Teachers", "Management", "Reviews"].map(
            (item) => (
              <LinkScroll
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                className="text-landing-text hover:text-landing-button cursor-pointer"
              >
                {item}
              </LinkScroll>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user && (
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

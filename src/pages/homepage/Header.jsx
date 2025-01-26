import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link as LinkScroll } from "react-scroll";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { sendEmail } from "../../api/email";
import { AppRoutes } from "../../constant/constant";
import axios from "axios";
import LoginPage from "../auth/login";
import { Link } from "react-router";
import { Flag } from "lucide-react";
import { toast } from "react-toastify";
import ButtonSpinner from "../../components/ButtonSpinner";

const Header = () => {

  const { user, setUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading , setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnic: "",
  });

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateRandomPassword = (length = 6) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      e.preventDefault();
      console.log("Submitted Data:", formData);
      const uniquePassword = generateRandomPassword();
      const response = await sendEmail({
        senderName: formData.name,
        sender: "ar535363@gmail.com",
        receiver: formData.email,
        subject: "Your Account Password",
        message: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f9;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #333;
                  text-align: center;
                }
                p {
                  color: #555;
                  line-height: 1.6;
                  font-size: 16px;
                }
                .highlight {
                  color: #0066cc;
                  font-weight: bold;
                }
                .footer {
                  text-align: center;
                  font-size: 14px;
                  color: #888;
                  margin-top: 30px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Your Account Password</h1>
                <p>Hello <strong class="highlight">${formData.name}</strong>,</p>
                <p>Thank you for registering with us!</p>
                <p>Your account password is: <strong class="highlight">${uniquePassword}</strong></p>
                <p>Please keep this information secure and do not share it with anyone.</p>
                <div class="footer">
                  <p>Best regards,</p>
                  <p><strong>Your Support Team</strong></p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
      const signup = await axios.post(AppRoutes.signUp, {
        fullName: formData.name,
        email: formData.email,
        password: uniquePassword,
        cnic: formData.cnic
      });
      console.log("cinc", formData.cnic);
      
      Cookies.set("token", signup.data?.data?.token);
      setUser(signup.data?.data?.newUser);
      console.log("response in signup", signup);
      toast.success("Password sent to your Email", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      toggleModal();
      setLoading(false)
    } catch (error) {
      console.log("error in send email ", error);
      toggleModal();
      setLoading(false)
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="w-full sticky top-0 left-0 right-0 bg-landing-background shadow-md z-50"
      >
        <div className="w-[90%] mx-auto px-4 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.1 }}>
            <img
              className="w-[150px] h-[70px]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP9EqPLa0BmYTjbJBIe4ilglWiMXW6u-HreA&s"
              alt="Logo"
            />
          </motion.div>

          <div className="flex items-center gap-4">
            <>
              <motion.button
                onClick={toggleModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Proceed
              </motion.button>
              <Link to={"/login"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Login
                </motion.button>
              </Link>
            </>
          </div>
        </div>
      </motion.header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Enter Your Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Email Field */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* CNIC Field */}
              <div>
                <Label htmlFor="cnic">CNIC</Label>
                <Input
                  id="cnic"
                  name="cnic"
                  placeholder="Enter your CNIC"
                  value={formData.cnic}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Submit Button */}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={toggleModal}
                  className="bg-gray-100 hover:bg-gray-200"
                >
                  Close
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                 {loading ? <ButtonSpinner/>: "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

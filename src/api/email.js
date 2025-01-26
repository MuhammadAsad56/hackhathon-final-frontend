import axios from "axios";
import { AppRoutes } from "../constant/constant";

export const sendEmail = async (emailObj) => {
    try {
        console.log("email obj in sendEmail>>", emailObj); 
      const response = await axios.post(
        AppRoutes.sendEmail, emailObj,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating batch:", error);
      throw error;
    }
  };
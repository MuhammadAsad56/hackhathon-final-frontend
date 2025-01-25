import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AppRoutes } from "../constant/constant";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    if (!user) {
      const token = Cookies.get("token");
      console.log("token=>", token);
      
      if (token) {
        getUser();
      }
    }
  }, [user]);

  const getUser = () => {
    axios
      .get(AppRoutes.getMyInfo, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("response from get my info API=>", res.data);
        setUser(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}


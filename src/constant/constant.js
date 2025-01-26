const devUrl = "http://localhost:3000/";
const prodUrl = "https://batch-11-node-with-mongodb.onrender.com/";

export const BASE_URL = devUrl; 

export const AppRoutes = {
  login: BASE_URL + "auth/login",
  signUp: BASE_URL + "auth/signup",
  getMyInfo: BASE_URL + "user/getMyInfo",
  getCourses: BASE_URL + "course",
  getStudents: BASE_URL + "students",
  addCourse: BASE_URL + "course",
  sendEmail: BASE_URL + "sendEmail",
}

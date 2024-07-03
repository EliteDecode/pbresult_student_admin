import axios from "axios";
import { API_URL } from "../api";

const logout = async () => {
  localStorage.removeItem("pbSchoolStudentUser");
  localStorage.removeItem("pbSchoolStudentUserToken");
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/student/login`, userData);

  if (response.data.status == true) {
    localStorage.setItem(
      "pbSchoolStudentUserToken",
      JSON.stringify(response.data.token)
    );
    localStorage.setItem(
      "pbSchoolStudentUser",
      JSON.stringify(response.data.data)
    );
  }
  return response.data;
};

const authService = {
  logout,
  login,
};

export default authService;

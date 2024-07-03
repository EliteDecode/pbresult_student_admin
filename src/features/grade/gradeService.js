import axios from "axios";
import { API_URL } from "../api";

const getStudentResult = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${API_URL}/result/student/${data.studentId}`,
    config
  );
  if (response.data) {
    localStorage.setItem(
      "pbSchoolSingleStudentResult",
      JSON.stringify(response.data)
    );
  }
  return response.data;
};

const grade = {
  getStudentResult,
};

export default grade;

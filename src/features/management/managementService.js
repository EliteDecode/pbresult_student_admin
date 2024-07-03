import axios from "axios";
import { API_URL } from "../api";

const getSubjects = async (token, classId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/classroom/${classId}/subjects`,
    config
  );

  return response.data;
};

const getSubjectsOffered = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/student/${data.studentId}/term/${data.termId}/subjects`,
    config
  );

  return response.data;
};

const addSubjectsOffered = async (token, subjects) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/student/term/subject/bulk`,
    subjects,
    config
  );

  console.log(response.data);

  return response.data;
};

const updateSubjectsOffered = async (token, subjects) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/student/term/subject/bulk`,
    subjects,
    config
  );

  return response.data;
};

const getTerms = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/term`, config);
  return response.data;
};

const mgtService = {
  getTerms,
  getSubjects,
  addSubjectsOffered,
  updateSubjectsOffered,
  getSubjectsOffered,
};

export default mgtService;

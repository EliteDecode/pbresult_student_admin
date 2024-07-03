import {
  addSubjectsOffered,
  reset,
} from "@/features/management/managementSlice";
import { addClassroomSubjectSchema } from "@/lib/schemas";
import AddOfferedSubject from "@/pages/dashboard/subjects/AddOfferedSubjects";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAddClassroomSubjectForm = () => {
  const { subjects, terms, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.mgt);
  const { user } = useSelector((state) => state.pbStudentAuth);

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      term: "",
      subjects: [],
    },
    validationSchema: addClassroomSubjectSchema,
    onSubmit: (values) => {
      const term_id = terms?.data?.find(
        (term) => term?.name == values?.term
      )?.id;
      const compulsorySubjectIds = [];
      subjects?.subjects
        ?.filter((subject) => subject?.is_compulsory == "1")
        ?.map((filteredItem) => {
          compulsorySubjectIds.push(filteredItem?.subject_id);
        });

      const data = {
        term_id,
        subjects: [...compulsorySubjectIds, ...formik.values.subjects],
        student_id: user?.id,
      };

      dispatch(addSubjectsOffered(data));
    },
  });

  const handleSubjectChange = (subjectId) => {
    const isSelected = selectedSubjects.includes(subjectId);
    const updatedSubjects = isSelected
      ? selectedSubjects.filter((id) => id !== subjectId)
      : [...selectedSubjects, subjectId];

    setSelectedSubjects(updatedSubjects);
    formik.setFieldValue("subjects", updatedSubjects);
  };

  useEffect(() => {
    if (isSuccess && message == "subject offered added successfully") {
      toast.success("Congratulations classroom subjects added successfully");
      dispatch(reset());
      navigate("/dashboard/subjects");
    }

    if (isError) {
      toast.error(message, {});
      dispatch(reset());
    }
    if (isSuccess && isError) {
      dispatch(reset());
    }
  }, [isLoading, isError, isLoading, dispatch, message]);

  return {
    isLoading,
    formik,
    subjects,
    terms,
    selectedSubjects,
    handleSubjectChange,
  };
};

export default useAddClassroomSubjectForm;

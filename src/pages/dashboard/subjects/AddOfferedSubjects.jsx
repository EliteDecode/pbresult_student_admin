import React, { useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HeaderTitle from "@/components/Headers/HeaderTitle";
import schoolImg from "../../../assets/icons/education.png";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import AddClassroomSubjectForm from "@/components/Forms/AddClassroomSubjectForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubjects,
  getTerms,
  reset,
} from "@/features/management/managementSlice";
import Loader from "@/lib/Loader";

const AddOfferedSubject = () => {
  const { user } = useSelector((state) => state.pbStudentAuth);
  const { isLoading, isSuccess, isError, subjects, terms } = useSelector(
    (state) => state.mgt
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubjects(user?.classroom?.classroom_id));
    dispatch(getTerms());
  }, []);

  useEffect(() => {
    if (isSuccess || isError) {
      dispatch(reset());
    }
  }, [isError, isSuccess]);

  return (
    <Box>
      <HeaderTitle
        img={schoolImg}
        title="Add New Classroom Subjects"
        subtitle="Add a new classroom subjects"
      />
      <Box role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/subjects"
            className="hover:underline"
            style={{ fontSize: "14px" }}>
            Subjects
          </Link>

          <Link
            className="hover:underline"
            aria-current="page"
            style={{ fontSize: "14px" }}>
            Add Offered Subjects
          </Link>
        </Breadcrumbs>
      </Box>
      <Box className="mt-5">
        {isLoading && !terms && !subjects ? (
          <Loader />
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Box className="bg-white rounded-md p-5 ">
                <Box>
                  <AddClassroomSubjectForm />
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default AddOfferedSubject;

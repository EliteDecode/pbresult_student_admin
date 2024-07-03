import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Tag, Typography } from "antd";
import teachersImg from "../../assets/icons/teachers-day.png";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import Error from "@/lib/Error";
import { getTerms } from "@/features/management/managementSlice";
import { getStudentResult } from "@/features/grade/gradeSlice";
import StudentResultTables from "@/components/Tables/StudentResultTables";

const ResultsPage = () => {
  const { user } = useSelector((state) => state.pbStudentAuth);
  const dispatch = useDispatch();
  const { isLoading, terms } = useSelector((state) => state.mgt);

  useEffect(() => {
    dispatch(getTerms());
    dispatch(getStudentResult({ studentId: user?.id }));
  }, []);

  return (
    <Box>
      <Box className="bg-white flex justify-between my-3 rounded-md p-1.5  w-full py-5">
        <Box className="flex items-center space-x-2">
          <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
          <Box>
            <Typography
              className="text-primary text-[15px]"
              style={{ fontWeight: "bold" }}>
              Overview of Student Result {user?.data?.id}
            </Typography>
            <Typography className="text-gray-400 -mt-0.5 text-[11px]">
              Student Result
            </Typography>
          </Box>
        </Box>
      </Box>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user ? (
            <Box>
              <StudentResultTables />
            </Box>
          ) : (
            <>
              {" "}
              <Error />{" "}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ResultsPage;

import { Box } from "@mui/material";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import SubjectTables from "@/components/Tables/SubjectTables";
import SubjectHeader from "@/components/Headers/SubjectHeader";
import { getTerms } from "@/features/management/managementSlice";

const SubjectsPage = () => {
  const { isLoading } = useSelector((state) => state.mgt);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTerms());
  }, []);

  return (
    <Box className="sm:p-5 space-y-4 p-3">
      <SubjectHeader />
      <Box className="overflow-x-scroll  bg-white">
        {isLoading ? <Loader /> : <SubjectTables />}
      </Box>
    </Box>
  );
};

export default SubjectsPage;

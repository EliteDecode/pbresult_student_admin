import React, { useEffect, useState } from "react";
import teachersImg from "../../assets/icons/student.png";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectsOffered } from "@/features/management/managementSlice";

const SubjectHeader = () => {
  const { terms, isLoading } = useSelector((state) => state.mgt);
  const { user } = useSelector((state) => state.pbStudentAuth);
  const dispatch = useDispatch();
  const [term, setTerm] = useState();

  const fetchTerm = () => {
    dispatch(getSubjectsOffered({ studentId: user?.id, termId: term }));
  };

  return (
    <Box className={`w-full mt-5 bg-white sm:px-5 sm:py-5 p-3 rounded-md mb-5`}>
      <Box className="flex flex-wrap  items-center justify-between">
        <Box className="flex items-center space-x-2">
          <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
          <Box>
            <Typography
              className="text-primary text-[15px]"
              style={{ fontWeight: "bold" }}>
              Overview of all Subjects
            </Typography>
            <Typography className="text-gray-400 -mt-0.5 text-[11px]">
              All subjects and creation date
            </Typography>
          </Box>
        </Box>
        <Box className="flex flex-wrap sm:mt-0 mt-5 sm:space-x-4 space-x-0 items-center">
          {/* <Link to="/dashboard/subjects/add-subjects">
            <Button>Add Term Subjects </Button>
          </Link> */}
          <Box className="flex border p-2 sm:mt-0 mt-3 rounded-md space-x-2 items-center">
            <Select
              name="gender"
              onValueChange={(value) => setTerm(value)}
              value={term}
              className="text-[12px]">
              <SelectTrigger className="w-[100%] text-xs">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Term</SelectLabel>
                  {terms?.data?.map((item, index) => {
                    return (
                      <SelectItem key={index} value={item?.id}>
                        {item?.name}{" "}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              variant="secondary"
              disabled={isLoading}
              onClick={fetchTerm}>
              {isLoading ? "Please wait..." : "Fetch Term Subject"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubjectHeader;

import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAddClassroomSubjectForm from "@/hooks/form-hooks/useAddClassroomSubjectForm";

const AddClassroomSubjectForm = () => {
  const {
    terms,
    isLoading,
    formik,
    subjects,
    selectedSubjects,
    handleSubjectChange,
  } = useAddClassroomSubjectForm();

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box className="mt-5 w-full">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Label className="text-[11px]" htmlFor="class">
                Term
              </Label>
              <Select
                name="term"
                onValueChange={(value) => formik.setFieldValue("term", value)}
                className="text-[12px]">
                <SelectTrigger className="w-[100%] text-xs">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Term</SelectLabel>
                    {terms?.data?.map((term) => (
                      <SelectItem key={term.name} value={term.name}>
                        {term.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formik.touched.term && formik.errors.term ? (
                <span className="text-[10px] text-red-500 -mt-2 leading-none">
                  (*) {formik.errors.term}
                </span>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Label className="text-[11px]" htmlFor="name">
                Select Subjects
              </Label>
              <div className="grid sm:grid-cols-5 grid-cols-2 gap-6 mt-2">
                {subjects?.subjects?.map((subject) => (
                  <div className="flex flex-col" key={subject.subject_id}>
                    <div className="flex items-center">
                      <Checkbox
                        id={`subject_${subject.subject_id}`}
                        className="h-3 w-3"
                        onCheckedChange={() =>
                          handleSubjectChange(subject.subject_id)
                        }
                        checked={
                          subject.is_compulsory === "1" ||
                          selectedSubjects.includes(subject.subject_id)
                        }
                        disabled={subject.is_compulsory === "1"}
                      />
                      <label
                        htmlFor={`subject_${subject.subject_id}`}
                        className="text-[12px] ml-2">
                        {subject.subject_name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              {formik.touched.subjects && formik.errors.subjects ? (
                <span className="text-[10px] text-red-500 -mt-2 leading-none">
                  (*) {formik.errors.subjects}
                </span>
              ) : null}
            </Grid>
          </Grid>

          <Box className="flex justify-center mt-10">
            <Button
              className="sm:w-[30%] w-full"
              type="submit"
              disabled={isLoading}>
              {isLoading ? "Please wait..." : "Complete"}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddClassroomSubjectForm;

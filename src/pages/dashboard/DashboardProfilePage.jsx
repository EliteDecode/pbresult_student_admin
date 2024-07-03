import React from "react";
import { Box, Grid } from "@mui/material";
import { Tag, Typography } from "antd";
import teachersImg from "../../assets/icons/teachers-day.png";
import { useSelector } from "react-redux";
import Loader from "@/lib/Loader";
import Error from "@/lib/Error";

const Profile = () => {
  const { isError, isSuccess, isLoading, user } = useSelector(
    (state) => state.pbStudentAuth
  );

  const studentsDetails = [
    {
      title: "Firstname",
      value: user?.firstname,
    },
    {
      title: "Lastname",
      value: user?.lastname,
    },
    {
      title: "Email",
      value: user?.email,
    },
    {
      title: "Gender",
      value: user?.gender,
    },
    {
      title: "Date of Birth",
      value: new Date(user?.dob).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      title: "Phone Number",
      value: user?.phone,
    },
    {
      title: "Address",
      value: user?.address,
    },
    {
      title: " Active Status",
      value: (
        <span>
          <Tag color={user?.active == "1" ? "success" : "error"}>
            {user?.active == "1" ? "Currently Active" : "Inactive"}
          </Tag>
        </span>
      ),
    },
  ];

  const classDetails = [
    {
      title: "Class Name",
      value: user?.classroom?.classroom?.name,
    },

    {
      title: "Date Enrolled",
      value: new Date(user?.classroom?.date_enrolled).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ),
    },

    {
      title: " Active Status",
      value: (
        <span>
          <Tag color={user?.classroom?.active == "1" ? "success" : "error"}>
            {user?.active == "1" ? "Currently Active" : "Inactive"}
          </Tag>
        </span>
      ),
    },
  ];

  const schoolDetails = [
    {
      title: " Name",
      value: user?.school?.name,
    },
    {
      title: " Abbreviation",
      value: user?.school?.domain_prefix,
    },
    {
      title: "Address",
      value: user?.school?.address,
    },
    {
      title: "Email",
      value: user?.school?.email,
    },

    {
      title: "Description",
      value: user?.school?.description,
    },
    {
      title: " Active Status",
      value: (
        <span>
          <Tag color={user?.school?.active == "1" ? "success" : "error"}>
            {user?.active == "1" ? "Currently Active" : "Inactive"}
          </Tag>
        </span>
      ),
    },
  ];

  return (
    <Box>
      <Box className="bg-white flex justify-between my-3 rounded-md p-1.5  w-full py-5">
        <Box className="flex items-center space-x-2">
          <img src={teachersImg} alt="dashboard icon" className="w-[32px]" />
          <Box>
            <Typography
              className="text-primary text-[15px]"
              style={{ fontWeight: "bold" }}>
              Overview of Teachers Profile
            </Typography>
            <Typography className="text-gray-400 -mt-0.5 text-[11px]">
              My Profile
            </Typography>
          </Box>
        </Box>
      </Box>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user ? (
            <Box className="mt-5">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={8}>
                  <Box className="gap-2 grid sm:grid-cols-2 grid-cols-1">
                    <Box className="bg-white rounded-md p-5 ">
                      <Box>
                        <Box className="space-y-4 p-3">
                          <Typography className="text-[13px] font-semibold">
                            Student Personal Details
                          </Typography>
                          {studentsDetails.map((item, index) => (
                            <Box
                              key={index}
                              className="flex  items-center justify-between space-x-2">
                              <Typography className="font-bold text-[14px] text-primary">
                                {item.title}:
                              </Typography>
                              <Typography>{item.value}</Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                    <Box className="bg-white rounded-md p-5 ">
                      <Box className="space-y-4 p-3">
                        <Typography className="text-[13px] font-semibold">
                          School Details
                        </Typography>
                        {schoolDetails.map((item, index) => (
                          <Box
                            key={index}
                            className="flex  items-center justify-between space-x-2">
                            <Typography className="font-bold text-[14px] text-primary">
                              {item.title}:
                            </Typography>
                            <Typography>{item.value}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box className="bg-white rounded-md p-5 ">
                      <Box className="space-y-4 p-3">
                        <Typography className="text-[13px] font-semibold">
                          Class Details
                        </Typography>
                        {classDetails.map((item, index) => (
                          <Box
                            key={index}
                            className="flex  items-center justify-between space-x-2">
                            <Typography className="font-bold text-[14px] text-primary">
                              {item.title}:
                            </Typography>
                            <Typography>{item.value}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={12} md={4}>
                  <Box className="bg-white rounded-md p-5 space-y-4">
                    <Box className="grid gap-2 grid-cols-2">
                      <img
                        src={user?.picture}
                        alt="school Logo"
                        className=" w-full"
                      />
                      <img
                        src={user?.school?.picture}
                        alt="school Logo"
                        className=" w-full"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
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

export default Profile;

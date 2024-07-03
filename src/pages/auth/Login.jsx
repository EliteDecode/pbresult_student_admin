import React, { useEffect, useLayoutEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import LoginForm from "@/components/Forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const { token } = useSelector((state) => state.pbStudentAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <Box className="h-screen bg-[#f7f7f7]">
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Box className="logbg h-screen"></Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box className="bg-white  py-5">
            <Box className="container-c">
              <Box className="flex items-center">
                <Box className="sm:h-16 h-12 sm:w-16 w-12 flex justify-center items-center flex-col rounded-full bg-primary">
                  <Typography className="text-white sm:text-[30px] text-[20px] font-black">
                    PB
                  </Typography>
                </Box>
                <Box className="text-center w-[100%]">
                  <Typography className="sm:text-[30px] text-[20px] font-bold">
                    PBResultVault Students Portal
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className=" w-[80%] rounded-md sm:h-[50vh] h-[30vh] flex flex-col items-center justify-center m-auto bg-[white]"
            style={{ marginTop: 100 }}>
            <LoginForm />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

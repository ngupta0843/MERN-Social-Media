import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import Input from "./Input";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const state = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
    console.log("form data: ", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const pwordhandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.value !== formData.password){
      alert("Incorrect password");
    }
  };

  const switchMode = () => {
    setIsSignUp((prevSetSignup) => !prevSetSignup);
    setShowPassword(false);
  };
  // email, familyName, googleId, imageUrl, name

  const googleSuccess = async (res) => {
    const token = res?.credential;
    const { email, family_name, name, sub, picture } = jwtDecode(token);
    const result = {
      email: email,
      familyName: family_name,
      google_id: sub,
      imageUrl: picture,
      name: name,
    };
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={(theme) => ({
          marginTop: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: theme.spacing(2),
        })}
        elevation={3}
      >
        <Avatar
          sx={(theme) => ({
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          })}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form style={{ width: "100%", margin: 5 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={(theme) => ({ margin: theme.spacing(3, 0, 2) })}
          >
            {isSignUp ? "Sign Up" : "Sign In"}{" "}
          </Button>

          <GoogleLogin
            onSuccess={googleSuccess}
            onError={(error) => console.log(error)}
            //shape="circle"
            width="363"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

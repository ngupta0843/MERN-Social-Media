import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import memories from "../../images/memories.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const [user, setUser]=  useState(JSON.parse(localStorage.getItem('profile')));

  const logout = () => {
    dispatch({type: 'LOGOUT'});

    navigate('/');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }


    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location])

  console.log("current user: ", user);
  return (
    <AppBar
      sx={{
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
      }}
      position="static"
      color="inherit"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          component={Link}
          to="/"
          sx={{ color: "rgba(0,183,255, 1)" }}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          style={{
            marginLeft: "15px",
          }}
          src={memories}
          alt="memories"
          height={60}
        />
      </div>
      <Toolbar
        sx={{ display: "flex", justifyContent: "flex-end", width: "400px" }}
      >
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <Avatar
              sx={(theme) => ({
                color: theme.palette.getContrastText(deepPurple[500]),
                backgroundColor: deepPurple[500],
              })}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{ display: "flex", alignItems: "center" }} variant="h6"
            >
                {user.result.name}
            </Typography>
            <Button variant="contained" sx={{}} color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

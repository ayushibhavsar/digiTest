import React from "react";
import { Outlet, useLocation } from "react-router-dom";
//MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// ASSETS
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'

//OTHER
import Sidebar from "../../Components/Sidebar/Sidebar";


const Home = () => {
  const location = useLocation();


  const navigationData = [
    {
      title: 'Dashboard',
      to: '/dashboard',
      listItemIconTxt: 'dashboard',
      upcoming: false,
      activeTabIcon: function () {
        return <GridViewRoundedIcon />
      }
    },
    {
      title: 'User-List',
      to: '/user-list',
      listItemIconTxt: 'user-list',
      upcoming: false,
      activeTabIcon: function () {
        return <BusinessCenterIcon />
      }}
    
  ]


  return (
      <Box container className="oh-background-setting">
        <Grid container spacing={2}>
          <Grid item xs={12} md={2} lg={2}>
              <Sidebar data={navigationData} />
          </Grid>
          <Grid item xs={12} md={10} lg={10}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
  )
}

export default Home;


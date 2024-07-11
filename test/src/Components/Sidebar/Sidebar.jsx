import React from 'react'
import { NavLink as NavLinkBase } from 'react-router-dom'

// MUI
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import './Sidebar.scss'


const Sidebar = ({ data = [] }) => {
  const NavLink = React.forwardRef((props, ref) => {
    return (
      <NavLinkBase ref={ref} {...props} className={props.activeClassName} />
    )
  })

  return (
    <>
      <Box className='oh-sidebar'>
        <List className='oh-sidebar-list'>
          {data?.map((item, index) => (
            <>
              <ListItem
                key={index}
                sx={{
                  '&:hover': {
                    background: '#dee4ff'
                  },
                  '&:active': {
                    background: '#dee4ff'
                  }
                }}
                className={'oh-list-item'}>
                <ListItemButton
                  to={item.to}
                  component={NavLink}
                  className='oh-item-btn'
                >
                  {
                    item?.activeTabIcon() && <ListItemIcon sx={{ minWidth: '27px' }}>
                      {item?.activeTabIcon()}
                    </ListItemIcon>
                  }
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Box>
    </>
  )
}

export default Sidebar


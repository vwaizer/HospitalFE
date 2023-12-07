
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink, Form, Outlet } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
const drawerWidth = 248;

function handleLogOut(){
  localStorage.removeItem('username');
}

function ListItemLink({ text, icon, to, ...other }) {


  return (
    <>
      <NavLink to={to} {...other} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      </NavLink>
    </>
  )
}

function ListItemLogOut({ text, icon, to, ...other }) {
  return (
    <>
      <NavLink to={to} {...other} style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* <Form method="POST" >
        <button type="submit" style={{ 
          background: 'none',
          color: 'inherit',
          border: 'none',
          padding: '0',
          font: 'inherit',
          cursor: 'pointer',
          outline: 'inherit',
          width: '100%',
        }}> */}
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
        {/* </button>
      </Form> */}
      </NavLink>
    </>
  )
}

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar >
        <Typography variant="h6" noWrap component="div" style={{ flexGrow: 1 }}>
          Hospital management
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{display: 'flex', flexDirection:'column',flexGrow: '1'}}>
        <ListItemLink text="SearchPage" icon={<SearchIcon />} to="/Home/SearchPage" />
        {/* <ListItemLink text="Report" icon={<DescriptionIcon />} to="/Home/Report" /> */}
        <ListItemLink text="SearchDoctorPage" icon={<SearchIcon />} to="/Home/SearchDoctor" />
      </List>
        <ListItemLogOut text="Log Out" icon={<LogoutIcon />} to={"/LogIn"} onClick={handleLogOut}/>
    </>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
      
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: {xs:'block',sm:'none'},
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar sx={{ 
          display: {xs:'block',sm:'none'},
        }}
        />
        <Outlet />
        
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;

import * as React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";


import DraftsIcon from "@mui/icons-material/Drafts";

import HomeIcon from '@mui/icons-material/Home';
import {
  Link as RouterLink,
  useLocation,
} from "react-router-dom";







const Link = React.forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};



export default function NavBar() {
  return (
    <Box sx={{ width: 360}}>
      <Paper elevation={0} style={{height:"700px",backgroundColor:"transparent"}}>
        <List aria-label="main mailbox folders">
          <ListItemLink to="/Home" primary="Home" icon={<HomeIcon/>} />
          <ListItemLink to="/drafts" primary="Drafts" icon={<DraftsIcon />} />
        </List>
      </Paper>
    </Box>
   
  );
}

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
  userRole: 'freelancer' | 'client' | 'admin';
  credit: number; // Receive the credit as a prop
}

const Navbar: React.FC<NavbarProps> = ({ userRole, credit }) => (
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Freelance App
      </Typography>
      {userRole === 'client' && (
          <Box sx={{ marginLeft: 'auto', paddingRight: 2 }}>
            <Typography variant="subtitle1">Credit: ${credit}</Typography>
          </Box>
        )}
    </Toolbar>
  </AppBar>
);

export default Navbar;

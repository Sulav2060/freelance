import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
  isFreelancer: boolean;
  credit: number; // Receive the credit as a prop
}

const Navbar: React.FC<NavbarProps> = ({ isFreelancer, credit }) => (
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Freelance App
      </Typography>
      {/* Show credit only for client */}
      {!isFreelancer && (
        <Box sx={{ marginLeft: 'auto', paddingRight: 2 }}>
          <Typography variant="subtitle1">Credit: ${credit}</Typography>
        </Box>
      )}
    </Toolbar>
  </AppBar>
);

export default Navbar;

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const freelancerMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Working On', icon: <WorkIcon /> },
  { text: 'Work Now', icon: <WorkIcon /> },
  { text: 'Submitted Bids', icon: <SupportAgentIcon /> },
  { text: 'Payment', icon: <PaymentIcon /> },
  { text: 'History', icon: <SupportAgentIcon /> },
];

const clientMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Post Job', icon: <WorkIcon /> },
  { text: 'Posted Jobs', icon: <WorkIcon /> },
  { text: 'Assigned Jobs', icon: <SupportAgentIcon /> },
  { text: 'Payment', icon: <PaymentIcon /> },
  { text: 'Support', icon: <SupportAgentIcon /> },
];

const Sidebar: React.FC<{ isFreelancer: boolean }> = ({ isFreelancer }) => {
  const menuItems = isFreelancer ? freelancerMenuItems : clientMenuItems;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' },
      }}
    >
      {/* Logo Section */}
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h6">LOGO</Typography>
      </Box>

      {/* Menu List */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map(({ text, icon }) => (
          <ListItem
            key={text}
            button
            component={Link as React.ElementType}
            to={`/${isFreelancer ? 'freelancer' : 'client'}/${text.toLowerCase().replace(/\s+/g, '')}`}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Profile at the Bottom */}
      <Box sx={{ width: '100%' }}>
        <List>
          <ListItem
            button
            component={Link as React.ElementType}
            to={`/${isFreelancer ? 'freelancer' : 'client'}/profile`}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

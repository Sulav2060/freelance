import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ClockIcon from '@mui/icons-material/AccessTime';

const freelancerMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Working On', icon: <WorkIcon /> },
  { text: 'Work Now', icon: <WorkIcon /> },
  { text: 'Submitted Bids', icon: <SupportAgentIcon /> },
  { text: 'Payment', icon: <PaymentIcon /> },
  { text: 'History', icon: <ClockIcon /> },
];

const clientMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Post Job', icon: <WorkIcon /> },
  { text: 'Posted Jobs', icon: <WorkIcon /> },
  { text: 'Assigned Jobs', icon: <SupportAgentIcon /> },
  { text: 'Payment', icon: <PaymentIcon /> },
  { text: 'Support', icon: <SupportAgentIcon /> },
  { text: 'History', icon: <ClockIcon /> },
];

const adminMenuItems = [
  { text: 'Admin Dashboard', icon: <DashboardIcon /> },
  { text: 'Account Management', icon: <AccountCircleIcon /> },
  { text: 'Job Oversight', icon: <WorkIcon /> },
];

interface SidebarProps {
  userRole: 'freelancer' | 'client' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  // Select the menu items based on the role
  const menuItems =
    userRole === 'freelancer'
      ? freelancerMenuItems
      : userRole === 'client'
      ? clientMenuItems
      : adminMenuItems;

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
            to={`/${userRole}/${text.toLowerCase().replace(/\s+/g, '')}`}
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
            to={`/${userRole}/profile`}
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

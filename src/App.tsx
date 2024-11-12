import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { acceptJob, addJob, clearSuccessMessage, setMode } from './store';
import { RootState } from './store';

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import WorkingOn from "./pages/WorkingOn";
import WorkNow from "./pages/WorkNow";
import SubmittedBids from "./pages/SubmittedBids";
import History from "./pages/History";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import JobDetails from "./pages/JobDetails";
import Support from "./pages/Support";
import PostJob from "./pages/PostJob";
import PostedJobs from "./pages/PostedJobs";
import JobBids from "./pages/JobBids";
import AssignedJobs from "./pages/AssignedJobs";
import AdminAccountManagement from "./pages/admin/AccountManagement";
import AdminJobOversight from "./pages/admin/JobOversight";

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { jobs, assignedJobs, credit, successMessage } = useSelector((state: RootState) => state);
  const [userRole, setUserRole] = useState<'freelancer' | 'client' | 'admin'>('freelancer');

  useEffect(() => {
    const role = pathname.startsWith('/client') 
      ? 'client' 
      : pathname.startsWith('/admin') 
        ? 'admin' 
        : 'freelancer';
    setUserRole(role);
    dispatch(setMode(role));
  }, [pathname, dispatch]);

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const role = event.target.value as 'freelancer' | 'client' | 'admin';
    setUserRole(role);
    dispatch(setMode(role));
    const basePath = role === 'admin' ? '/admin' : role === 'client' ? '/client' : '/freelancer';
    window.location.href = `${basePath}/dashboard`;
  };

  const handleAcceptJob = (jobId: number) => {
    dispatch(acceptJob(jobId));
  };

  const handlePostJob = (job: any) => {
    dispatch(addJob(job));
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  const basePath = `/${userRole}`;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userRole={userRole} />
      <div style={{ flexGrow: 1 }}>
        <Navbar userRole={userRole} credit={credit} />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            value={userRole}
            onChange={handleRoleChange}
            label="Role"
          >
            <MenuItem value="freelancer">Freelancer</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        {successMessage && (
          <div style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
            {successMessage}
          </div>
        )}

        <Routes>
          <Route path="/" element={<Navigate to={`${basePath}/dashboard`} />} />

          {/* Freelancer Routes */}
          <Route path="/freelancer/dashboard" element={<Dashboard />} />
          <Route path="/freelancer/payment" element={<Payment />} />
          <Route path="/freelancer/history" element={<History />} />
          <Route path="/freelancer/profile" element={<Profile />} />
          <Route path="/freelancer/workingon" element={<WorkingOn />} />
          <Route path="/freelancer/worknow" element={<WorkNow />} />
          <Route path="/freelancer/worknow/:id" element={<JobDetails />} />
          <Route path="/freelancer/submittedbids" element={<SubmittedBids />} />
          <Route path="/freelancer/support" element={<Support />} />

          {/* Client Routes */}
          <Route path="/client/dashboard" element={<Dashboard />} />
          <Route path="/client/postjob" element={<PostJob onPost={handlePostJob} />} />
          <Route
            path="/client/postedjobs"
            element={<PostedJobs jobs={jobs} onAccept={handleAcceptJob} />}
          />
          <Route
            path="/client/assignedjobs"
            element={<AssignedJobs jobs={assignedJobs} />}
          />
          <Route
            path="/client/postedjobs/:jobId"
            element={<JobBids onAccept={handleAcceptJob} />}
          />
          <Route path="/client/payment" element={<Payment />} />
          <Route path="/client/profile" element={<Profile />} />
          <Route path="/client/support" element={<Support />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/accountmanagement" element={<AdminAccountManagement />} />
          <Route path="/admin/joboversight" element={<AdminJobOversight />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
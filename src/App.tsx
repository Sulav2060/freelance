import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Button } from "@mui/material";
import Sidebar from "./components/Sidebar.tsx";
import Navbar from "./components/Navbar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import WorkingOn from "./pages/WorkingOn.tsx";
import WorkNow from "./pages/WorkNow.tsx";
import SubmittedBids from "./pages/SubmittedBids.tsx";
import History from "./pages/History.tsx";
import Payment from "./pages/Payment.tsx";
import Profile from "./pages/Profile.tsx";
import JobDetails from "./pages/JobDetails.tsx";
import Support from "./pages/Support.tsx";
import PostJob from "./pages/PostJob.tsx";
import PostedJobs from "./pages/PostedJobs.tsx";
import JobBids from "./pages/JobBids.tsx";
import AssignedJobs from "./pages/AssignedJobs.tsx";

const App: React.FC = () => {
  const [isFreelancer, setIsFreelancer] = useState(true); // State to track mode
  const [jobs, setJobs] = useState<any[]>([
    { id: 1, sector: "Design", details: "Create a website", amount: 300 },
    { id: 2, sector: "Writing", details: "Write SEO articles", amount: 500 },
    {
      id: 3,
      sector: "Development",
      details: "Build a mobile app",
      amount: 800,
    },
  ]);

  const [assignedJobs, setAssignedJobs] = useState<any[]>([]);
  const [credit, setCredit] = useState(500);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const [redirectToAssignedJobs, setRedirectToAssignedJobs] = useState(false); // Redirect state

  const handleSwitchMode = () => setIsFreelancer((prev) => !prev); // Toggle mode
  const basePath = isFreelancer ? "/freelancer" : "/client"; // Determine the base path

  const handleAcceptJob = (job: any) => {
    if (credit >= job.amount) {
      setAssignedJobs((prevAssigned) => [...prevAssigned, job]); // Add job to assigned jobs
      setJobs((prevJobs) => prevJobs.filter((j) => j.id !== job.id)); // Remove job from posted jobs
      setCredit((prevCredit) => prevCredit - job.amount); // Deduct credit
      setSuccessMessage(
        `Accepted job ${job.id}. Credit deducted: $${job.amount}`
      ); // Set success message
          // navigate('/client/postedjobs');

    } else {
      alert(`Insufficient credit to accept job ${job.id}.`);
    }
  };

  const handlePostJob = (job: any) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  };

  // Check for redirection
  if (redirectToAssignedJobs) {
    setRedirectToAssignedJobs(false); // Reset the flag after redirection
    return (
      <Navigate
        to={`${basePath}/assignedjobs`}
        state={{ message: successMessage }}
      />
    ); // Redirect to assigned jobs
  }

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar isFreelancer={isFreelancer} />
        <div style={{ flexGrow: 1 }}>
          <Navbar isFreelancer={isFreelancer} credit={credit} />
          <Button
            onClick={handleSwitchMode}
            variant="contained"
            sx={{
              padding: "8px 16px",
              margin: "4px",
              borderRadius: "999px",
              display: "flex",
              justifyContent: "flex-end",
              marginLeft: "auto",
            }}
          >
            Switch to {isFreelancer ? "Client" : "Freelancer"}
          </Button>

          <Routes>
            <Route
              path="/"
              element={<Navigate to={`${basePath}/dashboard`} />}
            />

            {/* Freelancer Routes */}
            <Route path="/freelancer/dashboard" element={<Dashboard />} />
            <Route
              path="/freelancer/payment"
              element={<Payment isFreelancer={true} />}
            />
            <Route path="/freelancer/history" element={<History />} />
            <Route path="/freelancer/profile" element={<Profile />} />
            <Route path="/freelancer/workingon" element={<WorkingOn />} />
            <Route path="/freelancer/worknow" element={<WorkNow />} />
            <Route path="/freelancer/worknow/:id" element={<JobDetails />} />
            <Route
              path="/freelancer/submittedbids"
              element={<SubmittedBids />}
            />
            <Route path="/freelancer/support" element={<Support />} />

            {/* Client Routes */}
            <Route path="/client/dashboard" element={<Dashboard />} />
            <Route
              path="/client/postjob"
              element={<PostJob onPost={handlePostJob} />}
            />
            <Route
              path="/client/postedjobs"
              element={
                <PostedJobs
                  jobs={jobs}
                  onAccept={handleAcceptJob}
                  credit={credit}
                  setCredit={setCredit}
                />
              }
            />
            <Route
              path="/client/assignedjobs"
              element={
                <AssignedJobs
                  jobs={assignedJobs}
                  successMessage={successMessage}
                />
              } // Pass the success message
            />
            <Route
              path="/client/postedjobs/:jobId"
              element={
                <JobBids
                  onAccept={handleAcceptJob}
                  credit={credit}
                  setCredit={setCredit}
                />
              }
            />
            <Route
              path="/client/payment"
              element={<Payment isFreelancer={false} />}
            />
            <Route path="/client/profile" element={<Profile />} />
            <Route path="/client/support" element={<Support />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

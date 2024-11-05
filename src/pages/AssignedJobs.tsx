import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface AssignedJob {
  jobId: number;
  bid: {
    freelancer: string;
    amount: number;
  };
  deadline: string; // Deadline for delivery
  fileReceived?: string; // Name or path to the received file
  sentForEdit?: boolean; // Flag to indicate if the job is sent for edit
}

const AssignedJobs: React.FC = () => {
  const location = useLocation();
  const { jobAccepted } = location.state || {};

  // State to track which job has been viewed
  const [viewedFiles, setViewedFiles] = useState<number[]>([]);

  // Dummy data for assigned jobs
  const jobs: AssignedJob[] = [
    {
      jobId: 1,
      bid: { freelancer: 'Freelancer A', amount: 300 },
      deadline: '2024-11-01',
      fileReceived: undefined, // No file received yet
      sentForEdit: false,
    },
    {
      jobId: 2,
      bid: { freelancer: 'Freelancer B', amount: 450 },
      deadline: '2024-10-25',
      fileReceived: 'file2.pdf', // File received
      sentForEdit: false,
    },
    {
      jobId: 3,
      bid: { freelancer: 'Freelancer C', amount: 500 },
      deadline: '2024-10-30',
      fileReceived: undefined,
      sentForEdit: true, // Sent for edit
    },
  ];

  const handleViewFile = (jobId: number) => {
    // Logic to view the received file
    setViewedFiles((prev) => [...prev, jobId]);
    console.log(`Viewing file for Job ID: ${jobId}`);
  };

  const handleReleasePayment = (jobId: number) => {
    // Logic to release payment
    console.log(`Payment released for Job ID: ${jobId}`);
  };

  const handleSendForEdit = (jobId: number) => {
    // Logic to send job for edit
    console.log(`Job ID: ${jobId} sent for edit.`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Assigned Jobs
      </Typography>
      {jobAccepted && (
        <Typography variant="h6" color="success.main" align="center" gutterBottom>
          Job Accepted!
        </Typography>
      )}
      
      {jobs.length === 0 ? (
        <Typography align="center">No assigned jobs.</Typography>
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Job ID: {job.jobId}</Typography>
                  <Typography>Freelancer: {job.bid.freelancer}</Typography>
                  <Typography>Bid Amount: ${job.bid.amount}</Typography>
                  
                  {/* Show deadline only if the file is not received */}
                  {!job.fileReceived && (
                    <Typography>Will receive by: {job.deadline}</Typography>
                  )}
                  
                  {/* Show "View Received File" button if the file is received */}
                  {job.fileReceived && !viewedFiles.includes(job.jobId) && (
                    <Button 
                      variant="outlined" 
                      onClick={() => handleViewFile(job.jobId)} 
                      sx={{ mt: 2, float: 'right' }}
                    >
                      View Received File
                    </Button>
                  )}

                  {/* Show the name of the received file if it has been received */}
                  {job.fileReceived && (
                    <Typography variant="body1" sx={{ mt: 2, float: 'right' }}>
                      Received File: {job.fileReceived}
                    </Typography>
                  )}

                  {/* Show Accept & Release Payment and Submit Feedback buttons only if the file is viewed */}
                  {viewedFiles.includes(job.jobId) && (
                    <>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => handleReleasePayment(job.jobId)} 
                        sx={{ mt: 2, mr: 2 }}
                      >
                        Accept & Release Payment
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={() => handleSendForEdit(job.jobId)} 
                        sx={{ mt: 2 }}
                      >
                        Submit Feedback & Send for Edit
                      </Button>
                    </>
                  )}

                  {/* Show "Sent for Edit" message with a different color */}
                  {job.sentForEdit && (
                    <Typography variant="body1" color="warning.main" sx={{ mt: 2 }}>
                      Sent for Edit
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AssignedJobs;

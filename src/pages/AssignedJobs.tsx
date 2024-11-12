import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, updateJobStatus } from '../store';
import { Card, CardContent, Typography, Box, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { CloudDownload, Check, Edit } from '@mui/icons-material';

interface Job {
  id: number;
  sector: string;
  details: string;
  deadline: string;
  status: 'not_received' | 'received' | 'accepted' | 'sent_for_edit';
  fileUrl?: string;
}

const AssignedJobs: React.FC = () => {
  const dispatch = useDispatch();
  const assignedJobs = useSelector((state: RootState) => state.assignedJobs);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const calculateTimeLeft = (deadline: string) => {
    const difference = +new Date(deadline) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft: { [key: string]: any } = {};
      assignedJobs.forEach((job) => {
        if (job.status === 'not_received') {
          updatedTimeLeft[job.id] = calculateTimeLeft(job.deadline);
        }
      });
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [assignedJobs]);

  const handleViewFile = (job: Job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  const handleAcceptJob = (jobId: number) => {
    dispatch(updateJobStatus({ jobId, status: 'accepted' }));
  };

  const handleSendForEdit = (jobId: number) => {
    dispatch(updateJobStatus({ jobId, status: 'sent_for_edit' }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_received':
        return 'error';
      case 'received':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'sent_for_edit':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Assigned Jobs</Typography>
      {assignedJobs.map((job: Job) => (
        <Card key={job.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{job.sector}</Typography>
            <Typography variant="body2" color="text.secondary">{job.details}</Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip label={job.status.replace('_', ' ')} color={getStatusColor(job.status)} />
              {job.status === 'not_received' && timeLeft[job.id] && (
                <Typography variant="body2">
                  Deadline: {timeLeft[job.id].days}d {timeLeft[job.id].hours}h {timeLeft[job.id].minutes}m {timeLeft[job.id].seconds}s
                </Typography>
              )}
            </Box>
            {job.status === 'received' && (
              <Box sx={{ mt: 2 }}>
                <Button
                  startIcon={<CloudDownload />}
                  onClick={() => handleViewFile(job)}
                  variant="outlined"
                  sx={{ mr: 1 }}
                >
                  View File
                </Button>
                <Button
                  startIcon={<Check />}
                  onClick={() => handleAcceptJob(job.id)}
                  variant="contained"
                  color="success"
                  sx={{ mr: 1 }}
                >
                  Accept & Release Payment
                </Button>
                <Button
                  startIcon={<Edit />}
                  onClick={() => handleSendForEdit(job.id)}
                  variant="contained"
                  color="warning"
                >
                  Send for Edit
                </Button>
              </Box>
            )}
            {job.status === 'sent_for_edit' && (
              <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                Sent for edit
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>View File</DialogTitle>
        <DialogContent>
          {selectedJob && (
            <iframe
              src={selectedJob.fileUrl}
              width="100%"
              height="500px"
              title="Job File"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssignedJobs;
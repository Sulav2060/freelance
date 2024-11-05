import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

const ongoingJobs = [
  {
    id: 1,
    title: 'Logo Design',
    description: 'Create a modern logo',
    deadline: new Date(Date.now() + 86400000), // 1 day from now
    payment: 200, // Added payment for the job
  },
  {
    id: 2,
    title: 'Website Development',
    description: 'Develop a new landing page',
    deadline: new Date(Date.now() + 172800000), // 2 days from now
    payment: 500, // Added payment for the job
  },
];

const WorkingOn: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Handle file upload logic here
    alert(`File: ${file?.name}, Description: ${description}`);
    setOpenDialog(false);
    setFile(null);
    setDescription('');
  };

  return (
    <div className="p-6 text-black">
      <h2 className="text-xl font-bold mb-4">Ongoing Jobs</h2>
      {ongoingJobs.map((job) => (
        <Card
          key={job.id}
          className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-300" // Added shadow for elegant design
          variant="outlined"
          style={{ border: '1px solid #ccc' }} // Subtle border for separation
        >
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {job.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mt-1">
              Deadline: {job.deadline.toLocaleString()}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Time Left: {Math.max(0, Math.floor((job.deadline.getTime() - Date.now()) / 1000))} seconds
            </Typography> */}
            <Typography variant="h6" component="div" className="mt-2">
              Payment: ${job.payment}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setSelectedJob(job);
                setOpenDialog(true);
              }}
              className="mt-2"
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      ))}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Submit Work for {selectedJob?.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="File Upload"
            type="file"
            fullWidth
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!file}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkingOn;

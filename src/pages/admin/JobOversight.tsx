import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';

const dummyJobs = [
  { id: 1, sector: 'Web Development', details: 'Create a responsive website', amount: 500, status: 'open', fileUrl: 'https://example.com/file1.pdf' },
  { id: 2, sector: 'Graphic Design', details: 'Design a logo', amount: 300, status: 'in_progress', fileUrl: 'https://example.com/file2.pdf' },
  { id: 3, sector: 'Content Writing', details: 'Write 5 blog posts', amount: 200, status: 'completed', fileUrl: 'https://example.com/file3.pdf' },
];

const dummyBids = [
  { id: 1, jobId: 1, freelancerId: 101, amount: 450, deadline: '3 days' },
  { id: 2, jobId: 1, freelancerId: 102, amount: 480, deadline: '2 days' },
  { id: 3, jobId: 2, freelancerId: 103, amount: 280, deadline: '4 days' },
];

const dummyOngoingJobs = [
  { id: 2, sector: 'Graphic Design', freelancerId: 103, amount: 300, deliveryTime: '2023-06-15 18:00:00' },
  { id: 4, sector: 'Data Analysis', freelancerId: 104, amount: 400, deliveryTime: '2023-06-16 12:00:00' },
];

const AdminJobOversight: React.FC = () => {
  const handleViewFile = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Job Oversight</Typography>

      <Typography variant="h5" gutterBottom>All Posted Jobs</Typography>
      <Paper sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.sector}</TableCell>
                <TableCell>{job.details}</TableCell>
                <TableCell>${job.amount}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewFile(job.fileUrl)} variant="contained" color="primary">
                    View File
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h5" gutterBottom>All Bids</Typography>
      <Paper sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bid ID</TableCell>
              <TableCell>Job ID</TableCell>
              <TableCell>Freelancer ID</TableCell>
              <TableCell>Amount</TableCell>
              {/* <TableCell>deadline</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyBids.map((bid) => (
              <TableRow key={bid.id}>
                <TableCell>{bid.id}</TableCell>
                <TableCell>{bid.jobId}</TableCell>
                <TableCell>{bid.freelancerId}</TableCell>
                <TableCell>${bid.amount}</TableCell>
                {/* <TableCell>{bid.deadline}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h5" gutterBottom>Ongoing Jobs</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Freelancer ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Delivery Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyOngoingJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.sector}</TableCell>
                <TableCell>{job.freelancerId}</TableCell>
                <TableCell>${job.amount}</TableCell>
                <TableCell>{job.deliveryTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminJobOversight;
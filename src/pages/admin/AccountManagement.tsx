import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';

const dummyJobsInProgress = [
  { id: 1, sector: 'Web Development', amount: 500, status: 'in_progress' },
  { id: 2, sector: 'Graphic Design', amount: 300, status: 'in_progress' },
];

const dummyJobsWithPaymentOnHold = [
  { id: 3, sector: 'Content Writing', amount: 200, status: 'payment_on_hold' },
  { id: 4, sector: 'Data Analysis', amount: 400, status: 'payment_on_hold' },
];

const dummyDepositRequests = [
  { id: 1, userId: 101, amount: 1000, status: 'pending' },
  { id: 2, userId: 102, amount: 500, status: 'pending' },
  { id: 3, userId: 103, amount: 750, status: 'approved' },
];

const AdminAccountManagement: React.FC = () => {
  const handleReleasePayment = (jobId: number) => {
    console.log(`Payment released for job ${jobId}`);
  };

  const handleApproveDeposit = (requestId: number) => {
    console.log(`Deposit request ${requestId} approved`);
  };

  const handleRejectDeposit = (requestId: number) => {
    console.log(`Deposit request ${requestId} rejected`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Account Management</Typography>

      <Typography variant="h5" gutterBottom>Jobs in Progress</Typography>
      <Paper sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyJobsInProgress.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.sector}</TableCell>
                <TableCell>${job.amount}</TableCell>
                <TableCell>{job.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h5" gutterBottom>Jobs with Payment on Hold</Typography>
      <Paper sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyJobsWithPaymentOnHold.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.sector}</TableCell>
                <TableCell>${job.amount}</TableCell>
                <TableCell>
                  <Button onClick={() => handleReleasePayment(job.id)} variant="contained" color="primary">
                    Release Payment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h5" gutterBottom>Deposit Requests</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyDepositRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.userId}</TableCell>
                <TableCell>${request.amount}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {request.status === 'pending' && (
                    <>
                      <Button onClick={() => handleApproveDeposit(request.id)} variant="contained" color="primary" sx={{ mr: 1 }}>
                        Approve
                      </Button>
                      <Button onClick={() => handleRejectDeposit(request.id)} variant="contained" color="secondary">
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminAccountManagement;
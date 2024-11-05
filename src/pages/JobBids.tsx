import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
} from "@mui/material";

interface Bid {
  freelancer: string;
  amount: number;
}

interface JobBidsProps {
  onAccept: (bid: Bid) => void;
  credit: number;
  setCredit: React.Dispatch<React.SetStateAction<number>>;
}

const JobBids: React.FC<JobBidsProps> = ({ onAccept, credit, setCredit }) => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate(); // Use navigate for redirection
  const [alert, setAlert] = useState<string | null>(null);

  const generateBidsForJob = (jobId: string): Bid[] => [
    { freelancer: `Freelancer ${jobId}A`, amount: Math.floor(Math.random() * 500) },
    { freelancer: `Freelancer ${jobId}B`, amount: Math.floor(Math.random() * 500) },
  ];

  const jobBids = jobId ? generateBidsForJob(jobId) : [];

  const handleAcceptBid = (bid: Bid) => {
    if (credit >= bid.amount) {
      setCredit((prev) => prev - bid.amount); // Deduct credit
      onAccept(bid); // Move bid to assigned jobs
      setAlert(`Accepted bid by ${bid.freelancer}. Credit deducted: $${bid.amount}`);
      navigate('/client/assignedjobs');
    } else {
      setAlert(`Insufficient credit to accept this bid.`);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Bids for Job ID: {jobId}
      </Typography>

      {alert && (
        <Alert severity={alert.includes('Insufficient') ? 'error' : 'success'} sx={{ mb: 2 }}>
          {alert}
        </Alert>
      )}

      {jobBids.length === 0 ? (
        <Typography align="center">No bids available for this job.</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Freelancer</TableCell>
                <TableCell>Bid Amount ($)</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobBids.map((bid, index) => (
                <TableRow key={index}>
                  <TableCell>{bid.freelancer}</TableCell>
                  <TableCell>{bid.amount}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleAcceptBid(bid)}
                      variant="contained"
                      color="primary"
                    >
                      Accept Bid
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default JobBids;

import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, updateCredit, clearSuccessMessage } from '../store';

interface Bid {
  freelancer: string;
  amount: number;
}

const JobBids: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const credit = useSelector((state: RootState) => state.credit);
  const [alert, setAlert] = useState<string | null>(null);

  // Initialize bids for the job in component state
  const [jobBids, setJobBids] = useState<Bid[]>([]);

  useEffect(() => {
    if (jobId) {
      // Generate initial bids based on the job ID
      setJobBids([
        { freelancer: `Freelancer ${jobId}A`, amount: Math.floor(Math.random() * 500) },
        { freelancer: `Freelancer ${jobId}B`, amount: Math.floor(Math.random() * 500) },
      ]);
    }
  }, [jobId]);

  const handleAcceptBid = (bid: Bid) => {
    if (credit >= bid.amount) {
      dispatch(updateCredit(credit - bid.amount));
      setAlert(`Accepted bid by ${bid.freelancer}. Credit deducted: $${bid.amount}`);
      
      // Remove the accepted bid from the jobBids state
      setJobBids(prevBids => prevBids.filter(b => b.freelancer !== bid.freelancer));
      
      navigate('/client/assignedjobs');
    } else {
      setAlert(`Insufficient credit to accept this bid.`);
    }

    // Clear the success message after a delay
    setTimeout(() => dispatch(clearSuccessMessage()), 3000);
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

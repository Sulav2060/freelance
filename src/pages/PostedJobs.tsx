import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  AppDispatch,
  updateCredit,
  clearSuccessMessage,
  updateJob,
  removeJob,
  editAndRebidJob,
} from "../store";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

interface Bid {
  id: string;
  freelancer: string;
  amount: number;
}

interface Job {
  id: number;
  sector: string;
  details: string;
  amount: number;
  status: "open" | "in_progress" | "completed" | "deadline_passed";
  biddingDeadline: string;
}

const PostedJobs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, credit, successMessage } = useSelector(
    (state: RootState) => state
  );
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [jobBids, setJobBids] = useState<{ [jobId: number]: Bid[] }>({});
  const [alert, setAlert] = useState<string | null>(null);

  const generateBids = useCallback((job: Job): Bid[] => {
    if (job.status === "deadline_passed") return [];
    const numberOfBids = Math.floor(Math.random() * 3); // 0 to 2 bids
    return Array.from({ length: numberOfBids }, (_, index) => ({
      id: `bid-${job.id}-${index}`,
      freelancer: `Freelancer ${job.id}${String.fromCharCode(65 + index)}`,
      amount: Math.floor(Math.random() * (job.amount * 0.8)) + job.amount * 0.2,
    }));
  }, []);

  useEffect(() => {
    jobs.forEach((job) => {
      if (!jobBids[job.id]) {
        const generatedBids = generateBids(job);
        setJobBids((prev) => ({ ...prev, [job.id]: generatedBids }));
      }
    });
  }, [jobs, jobBids, generateBids]);

  const handleAcceptBid = (jobId: number, bid: Bid) => {
    if (credit >= bid.amount) {
      dispatch(updateCredit(credit - bid.amount));
      setAlert(
        `Accepted bid by ${bid.freelancer}. Credit deducted: $${bid.amount}`
      );
      dispatch(updateJob({ id: jobId, status: "in_progress" }));
      setJobBids((prev) => {
        const { [jobId]: _, ...rest } = prev;
        return rest;
      });
      setSelectedJob(null);
    } else {
      setAlert(`Insufficient credit to accept this bid.`);
    }

    setTimeout(() => {
      setAlert(null);
      dispatch(clearSuccessMessage());
    }, 3000);
  };

  const handleShowBids = (jobId: number) => {
    setSelectedJob(selectedJob === jobId ? null : jobId);
  };

  const handleEditAndRebid = (jobId: number) => {
    dispatch(editAndRebidJob(jobId));
    setAlert(`Job ${jobId} has been reset for bidding.`);
  };

  const renderJobStatus = (job: Job) => {
    const now = new Date();
    const deadline = new Date(job.biddingDeadline);
    const timeLeft = deadline.getTime() - now.getTime();

    if (job.status === "deadline_passed") {
      return (
        <Box>
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Bidding deadline over, no bids from freelancers.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditAndRebid(job.id)}
            sx={{ mt: 1 }}
          >
            Edit and Put for Bid Again
          </Button>
        </Box>
      );
    } else if (timeLeft > 0 && jobBids[job.id]?.length === 0) {
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      return (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No bids yet. Bidding deadline: {hours}h {minutes}m
        </Typography>
      );
    } else if (jobBids[job.id]?.length > 0) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleShowBids(job.id)}
          sx={{ mt: 2 }}
        >
          {selectedJob === job.id ? "Hide Bids" : "Show Bids"}
        </Button>
      );
    }
  };

  if (jobs.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Posted Jobs
      </Typography>
      {(alert || successMessage) && (
        <Alert
          severity={alert?.includes("Insufficient") ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {alert || successMessage}
        </Alert>
      )}
      {jobs.map((job) => (
        <Card key={job.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{job.sector}</Typography>
            <Typography variant="body2" color="text.secondary">
              {job.details}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Budget: ${job.amount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {job.status}
            </Typography>

            {renderJobStatus(job)}
          </CardContent>
          {selectedJob === job.id && jobBids[job.id]?.length > 0 && (
            <Paper sx={{ mt: 2, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Bids for {job.sector}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Freelancer</TableCell>
                    <TableCell>Bid Amount ($)</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobBids[job.id].map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell>{bid.freelancer}</TableCell>
                      <TableCell>{bid.amount}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleAcceptBid(job.id, bid)}
                          variant="contained"
                          color="primary"
                          size="small"
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
        </Card>
      ))}
    </Box>
  );
};

export default PostedJobs;

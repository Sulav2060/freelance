import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Job {
  id: number;
  sector: string;
  details: string;
  amount: number;
}

interface PostedJobsProps {
  jobs: Job[];
  onAccept: (job: Job) => void;
  credit: number;
  setCredit: React.Dispatch<React.SetStateAction<number>>;
}

const PostedJobs: React.FC<PostedJobsProps> = ({
  jobs,
  onAccept,
  credit,
  setCredit,
}) => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<string | null>(null);

  const handleViewBids = (jobId: number) => {
    navigate(`/client/postedjobs/${jobId}`);
  };

  const handleAcceptJob = (job: Job) => {
    if (credit >= job.amount) {
      setCredit((prev) => prev - job.amount);
      onAccept(job);
      setAlert(`Accepted job ${job.id}. Credit deducted: $${job.amount}`);
    } else {
      setAlert(`Insufficient credit to accept job ${job.id}.`);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Posted Jobs
      </Typography>

      {alert && (
        <Alert
          severity={alert.includes("Insufficient") ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {alert}
        </Alert>
      )}

      {jobs.length === 0 ? (
        <Typography align="center">No jobs posted yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item xs={12} key={job.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Sector: {job.sector}</Typography>
                  <Typography>Details: {job.details}</Typography>
                  <Typography>Amount: ${job.amount}</Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 2, ml: 2 }}
                    onClick={() => handleViewBids(job.id)}
                  >
                    View Bids
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PostedJobs;

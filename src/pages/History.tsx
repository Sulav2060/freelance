import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

const pastJobs = [
  {
    id: 1,
    title: "Logo Design",
    paymentStatus: "Paid",
    amount: 300,
  },
  {
    id: 2,
    title: "Website Development",
    paymentStatus: "On Hold",
    amount: 500,
  },
  {
    id: 3,
    title: "Content Writing",
    paymentStatus: "Paid",
    amount: 150,
  },
  {
    id: 4,
    title: "Graphic Design",
    paymentStatus: "Pending",
    amount: 250,
  },
];

const History: React.FC = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment History
      </Typography>
      <Grid container spacing={3}>
        {pastJobs.map((job) => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Payment Status: {job.paymentStatus}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  Amount: ${job.amount}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Note: File details are deleted after payment is completed by admin.
      </Typography>
    </Box>
  );
};

export default History;
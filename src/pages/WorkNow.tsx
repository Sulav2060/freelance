import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardActions, Typography, Button, Grid } from "@mui/material";

const jobs = [
  { id: 1, title: "Logo Design", description: "Create a modern logo" },
  { id: 2, title: "Job 1", description: "This is a simple job description." },
  { id: 3, title: "Website Development", description: "Build a responsive website." },
  { id: 4, title: "App Development", description: "Develop a cross-platform mobile app." },
];

export default function WorkNow() {
  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Find Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  component={Link} 
                  to={`/freelancer/worknow/${job.id}`} 
                  size="small"
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

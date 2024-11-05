import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>(); // Retrieve job ID from URL
  const [workloadPrice, setWorkloadPrice] = useState<number>(0);
  const [complexityPrice, setComplexityPrice] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [totalBid, setTotalBid] = useState<number>(0);
  const [agreed, setAgreed] = useState<boolean>(false);

  const submitBid = () => {
    if (workloadPrice <= 0 || complexityPrice < 0) {
      alert("Please enter valid positive prices.");
      return;
    }
    const total = workloadPrice + complexityPrice;
    setTotalBid(total);
    setOpenDialog(true);
  };

  const handleDialogSubmit = () => {
    alert(`Bid submitted: $${totalBid}`);
    setWorkloadPrice(0);
    setComplexityPrice(0);
    setAgreed(false);
    setOpenDialog(false);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Job Details {/* (ID: {id}) */}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Job description and other details go here.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(!showForm)}
        sx={{ mt: 2 }}
      >
        {showForm ? "Cancel" : "Submit Bid"}
      </Button>

      {showForm && (
        <Box mt={4} display="flex" flexDirection="column" gap={2}>
          <TextField
            type="number"
            label="Workload Price"
            value={workloadPrice}
            onChange={(e) => setWorkloadPrice(+e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="number"
            label="Complexity Price"
            value={complexityPrice}
            onChange={(e) => setComplexityPrice(+e.target.value)}
            fullWidth
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
            }
            label="I’ve read the terms and conditions"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={submitBid}
            disabled={!agreed}
          >
            Submit
          </Button>
        </Box>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Bid Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit a bid of ${totalBid}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

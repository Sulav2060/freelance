import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

interface PaymentProps {
  userRole: 'freelancer' | 'client' | 'admin';}

const Payment: React.FC<PaymentProps> = ({ userRole }) => {
  // Freelancer-specific payment variables
  const workOngoingMoney = 1000;
  const moneyOnHold = 300;
  const moneyReceived = 500;

  // Client-specific payment variables
  const totalWorkDone = 1500;
  const creditOnHold = 200;
  const currentCredit = 1000; // Current credit amount

  // State for deposit functionality
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [depositMessage, setDepositMessage] = useState("");

  const handleDeposit = () => {
    // Add logic to handle the deposit
    console.log(`Deposited ${depositAmount} via ${paymentMethod}`);
    // Show the deposit verification message with the credit amount
    setDepositMessage(`Credit of $${depositAmount} will be verified in 1 business day.`);
    // Resetting the form after deposit
    setDepositAmount(0);
    setPaymentMethod("");
    setShowDepositForm(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
      {userRole === 'freelancer' ? "Freelancer Payment Overview" : "Client Payment Overview"}
   
      </Typography>
      <Grid container spacing={3}>
      {userRole === 'freelancer' ? (
          <>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Work ongoing of
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ${workOngoingMoney}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Money Received
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ${moneyReceived}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Money On Hold
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ${moneyOnHold}
                  </Typography>
                </CardContent>
              </Card>
              credit will be sent to you once verified
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Total Work Done
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ${totalWorkDone}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Credit On Hold
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ${creditOnHold}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Credit
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ${currentCredit}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowDepositForm((prev) => !prev)}
              >
                {showDepositForm ? "Cancel Deposit" : "Deposit Credit"}
              </Button>
            </Grid>
          </>
        )}
      </Grid>

      {/* Deposit Form */}
      {showDepositForm && userRole === 'client' && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Deposit Credit
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="esewa">eSewa</MenuItem>
              <MenuItem value="banking">Banking</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="number"
            label="Deposit Amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleDeposit}
          >
            Deposit
          </Button>
        </Box>
      )}

      {/* Deposit Confirmation Message */}
      {depositMessage && (
        <Typography variant="h6" color="success.main" sx={{ marginTop: 4 }}>
          {depositMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Payment;

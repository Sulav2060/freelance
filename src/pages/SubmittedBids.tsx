//this is for freelancers
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

// Example structure of a submitted bid
interface Bid {
  id: number;
  title: string;
  workloadPrice: number;
  complexityPrice: number;
  totalBid: number;
}

const sampleBids: Bid[] = [
  {
    id: 1,
    title: "Logo Design",
    workloadPrice: 300,
    complexityPrice: 150,
    totalBid: 450,
  },
  {
    id: 2,
    title: "Website Development",
    workloadPrice: 800,
    complexityPrice: 200,
    totalBid: 1000,
  },
];

const SubmittedBids: React.FC = () => {
  const [bids, setBids] = useState<Bid[]>(sampleBids); 

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Submitted Bids</h2>
      <div className="grid grid-cols-1 gap-4">
        {bids.map((bid) => (
          <Card key={bid.id} className="bg-gray-800 text-white">
            <CardContent>
              <Typography variant="h5">{bid.title}</Typography>
              <Typography>Workload Price: ${bid.workloadPrice}</Typography>
              <Typography>Complexity Price: ${bid.complexityPrice}</Typography>
              <Typography>Total Bid: ${bid.totalBid}</Typography>
              <Link to={`/worknow/${bid.id}`}>
                <Button variant="contained" color="primary" className="mt-2">
                  View Job Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubmittedBids;

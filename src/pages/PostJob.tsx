import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const sectors = ['Writing', 'Charts', 'Other'];

const PostJob: React.FC<{ onPost: (job: any) => void }> = ({ onPost }) => {
  const [sector, setSector] = useState('');
  const [details, setDetails] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const navigate = useNavigate();

  const handlePost = () => {
    if (!sector) return alert('Select a sector!');
    
    onPost({ id: Date.now(), sector, details, files: files ? Array.from(files) : [] });
    navigate('/client/postedjobs');
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>Post a Job</Typography>

      <Select fullWidth value={sector} onChange={(e) => setSector(e.target.value)} displayEmpty>
        <MenuItem value="" disabled>Select Sector</MenuItem>
        {sectors.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
      </Select>

      {sector === 'Other' && (
        <TextField 
          fullWidth 
          label="Explain Task" 
          value={details} 
          onChange={(e) => setDetails(e.target.value)} 
          margin="normal"
        />
      )}

      <Button fullWidth variant="outlined" component="label" sx={{ mt: 2 }}>
        Upload Files
        <input type="file" hidden multiple onChange={(e) => setFiles(e.target.files)} />
      </Button>

      <Button 
        fullWidth 
        variant="contained" 
        color="primary" 
        sx={{ mt: 2 }} 
        onClick={handlePost}
      >
        Post Job
      </Button>
    </Box>
  );
};

export default PostJob;

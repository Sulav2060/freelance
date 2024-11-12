import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addJob } from '../store';
import { Button, Box, Typography, Input, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const sectors = [
  'Web Development',
  'Content Writing',
  'Other'
];

const PostJob: React.FC = () => {
  const dispatch = useDispatch();
  const [sector, setSector] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSectorChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSector(event.target.value as string);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && sector) {
      // In a real application, you would upload the file to a server here
      // For now, we'll just use the file name as the job details
      dispatch(addJob({ id: Date.now(), sector, details: file.name }));
      setSector('');
      setFile(null);
    } else {
      alert('Please select a sector and upload a file with job details');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Post a New Job</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="sector-label">Sector</InputLabel>
          <Select
            labelId="sector-label"
            value={sector}
            onChange={handleSectorChange}
            label="Sector"
          >
            {sectors.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Input
            type="file"
            onChange={handleFileChange}
            sx={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Upload Job Details
            </Button>
          </label>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {file.name}
            </Typography>
          )}
        </Box>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }}
          disabled={!sector || !file}
        >
          Post Job
        </Button>
      </form>
    </Box>
  );
};

export default PostJob;
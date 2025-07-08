import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const AdminCounter = () => {
  const [counterData, setCounterData] = useState({
    clients: 0,
    placements: 0,
    experience: 0
  });

  useEffect(() => {
    const fetchCounterData = async () => {
      try {
        const response = await axios.get('https://consulting-main.onrender.com/api/counter');
        setCounterData(response.data);
      } catch (error) {
        console.error('Error fetching counter data:', error);
      }
    };

    fetchCounterData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCounterData(prevState => ({
      ...prevState,
      [name]: Number(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://consulting-main.onrender.com/api/counter', counterData);
      alert('Counter data updated successfully!');
    } catch (error) {
      console.error('Error updating counter data:', error);
      alert('Error updating counter data');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Counter Management
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Total Clients"
            name="clients"
            type="number"
            value={counterData.clients}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Placements"
            name="placements"
            type="number"
            value={counterData.placements}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Years of Experience"
            name="experience"
            type="number"
            value={counterData.experience}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Update Counter Data
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AdminCounter;

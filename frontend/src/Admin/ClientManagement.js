import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';

const ClientManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('https://consulting-4rbe.onrender.com/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    images.forEach((image) => data.append('images', image)); // `images` should match multer field name in backend

    try {
      await axios.post('https://consulting-4rbe.onrender.com/api/clients', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Client uploaded successfully!');
      fetchClients(); // refresh list
      setFormData({ name: '', description: '' }); // reset form
      setImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.error('Error uploading client:', error.response?.data || error.message);
      alert('Error uploading client');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this client?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://consulting-4rbe.onrender.com/api/clients/${id}`);
      setClients((prev) => prev.filter((client) => client._id !== id));
      alert('Client deleted successfully!');
    } catch (error) {
      console.error('Error deleting client:', error.response?.data || error.message);
      alert('Error deleting client');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Client Management
        </Typography>

        {/* Upload Client Form */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Upload Client
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
                required
              />
              <Box sx={{ mt: 2 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  multiple
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<PhotoCamera />}
                    fullWidth
                  >
                    Upload Images
                  </Button>
                </label>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {previewImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Preview ${i}`}
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                ))}
              </Box>
              <CardActions>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Submit
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>

        {/* Client Table */}
        <Typography variant="h6" gutterBottom>
          Client Data
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client._id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.description}</TableCell>
                  <TableCell>
                    {client.images?.map((img, i) => (
                      <img
                        key={i}
                        src={`https://consulting-4rbe.onrender.com/${img}`}
                        alt={`Client ${i}`}
                        style={{ width: 50, height: 50, marginRight: 5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDelete(client._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ClientManagement;

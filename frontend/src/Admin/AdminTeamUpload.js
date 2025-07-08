import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function AdminTeamUpload() {
  const [teamMember, setTeamMember] = useState({
    _id: null,
    name: '',
    role: '',
    image: null,
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/team');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
        toast.error('Error fetching team members.');
      }
    };

    fetchTeamMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setTeamMember((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', teamMember.name);
    formData.append('role', teamMember.role);
    if (teamMember.image) {
      formData.append('image', teamMember.image);
    }

    try {
      if (teamMember._id) {
        // Update existing team member
        await axios.put(`https://consulting-4rbe.onrender.com/api/team/${teamMember._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Team member updated successfully!');
      } else {
        // Add new team member
        await axios.post('https://consulting-4rbe.onrender.com/api/team', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Team member uploaded successfully!');
      }
      // Refresh the team members list
      const response = await axios.get('https://consulting-4rbe.onrender.com/api/team');
      setTeamMembers(response.data);
      // Reset form
      setTeamMember({ _id: null, name: '', role: '', image: null });
    } catch (error) {
      console.error('Error uploading team member:', error);
      toast.error('Error uploading team member.');
    }
  };

  const handleEdit = (member) => {
    setTeamMember({
      _id: member._id,
      name: member.name,
      role: member.role,
      image: null, // Do not pre-fill the image to allow for new uploads
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://consulting-4rbe.onrender.com/api/team/${id}`);
      setTeamMembers(teamMembers.filter((member) => member._id !== id));
      toast.success('Team member deleted successfully!');
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast.error('Error deleting team member.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {teamMember._id ? 'Edit Team Member' : 'Upload Team Member'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={teamMember.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={teamMember.role}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }} style={{width:'100%'}}>
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              required={!teamMember._id}
            />
          </Button>
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" style={{width:'100%'}}>
              {teamMember._id ? 'Update' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Paper>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ p: 2 }}>
          Team Members
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member._id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <img
                    src={`https://consulting-4rbe.onrender.com${member.imageUrl}`}
                    alt={member.name}
                    width="50"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(member)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(member._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </Container>
  );
}

export default AdminTeamUpload;

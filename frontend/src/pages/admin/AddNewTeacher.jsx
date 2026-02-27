import React, { useState, useRef } from 'react';
import {
     Box, TextField, Button, Typography, Paper,
     Avatar, IconButton, Divider, Grid, Alert, CircularProgress
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { usePostTeacher } from '../../hooks/createTeacher';
import { useNavigate } from 'react-router-dom';


export default function AddNewTeacher(){

     const navigate = useNavigate();
     const {error,isLoading,handleCreate} = usePostTeacher();
     const [preview,setPreview] = useState(null);
     const [imageFile,setImageFile] = useState(null);

     const nameInput = useRef();
     const emailInput = useRef();
     const passwordInput = useRef();
     const employeeIdInput = useRef();
     const qualificationInput = useRef();
     const joiningDateInput = useRef();

     const handleImageChange = e => {

          const file = e.target.files[0];

          if(file){
               setImageFile(file)
               setPreview(URL.createObjectURL(file));
          }
     };

     const handleSubmit = e => {

          e.preventDefault();

          const formData = new FormData();

          formData.append("name",nameInput.current.value);
          formData.append("email", emailInput.current.value);
          formData.append("password", passwordInput.current.value);
          formData.append("employee_id", employeeIdInput.current.value);
          formData.append("qualification", qualificationInput.current.value);
          formData.append("joining_date", joiningDateInput.current.value);

          if (imageFile) {
               formData.append("image",imageFile);
          }
          handleCreate(formData);
          // navigate("/admin/users");
     }

     return (
          <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
               <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                    Register New Teacher
               </Typography>

               {isLoading && (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                                             <CircularProgress />
                                             <Typography sx={{ ml: 2 }}>Loading Dashboard Data...</Typography>
                                        </Box>
                                   )}
               {error && <Alert severity="error" sx={{ mb: 2 }}>Error creating teacher</Alert>}

               <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                         <Avatar
                              src={preview}
                              sx={{ width: 100, height: 100, mb: 1, border: '2px solid #1976d2' }}
                         />
                         <IconButton color="primary" aria-label="upload picture" component="label">
                              <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                              <PhotoCamera />
                         </IconButton>
                         <Typography variant="caption">Upload Profile Picture</Typography>
                    </Box>

                    <Grid container spacing={2}>
                         <Grid item xs={12}>
                              <TextField fullWidth label="Full Name" inputRef={nameInput} required />
                         </Grid>
                         <Grid item xs={12} sm={6}>
                              <TextField fullWidth label="Email Address" type="email" inputRef={emailInput} required />
                         </Grid>
                         <Grid item xs={12} sm={6}>
                              <TextField fullWidth label="Password" type="password" inputRef={passwordInput} required />
                         </Grid>

                         <Grid item xs={12}>
                              <Divider sx={{ my: 1 }}>Professional Info</Divider>
                         </Grid>

                         <Grid item xs={12} sm={6}>
                              <TextField fullWidth label="Employee ID" type="number" inputRef={employeeIdInput} required />
                         </Grid>
                         <Grid item xs={12} sm={6}>
                              <TextField
                                   fullWidth
                                   label="Joining Date"
                                   type="date"
                                   inputRef={joiningDateInput}
                                   InputLabelProps={{ shrink: true }}
                                   required
                              />
                         </Grid>
                         <Grid item xs={12}>
                              <TextField fullWidth label="Qualification" inputRef={qualificationInput} required multiline rows={2} />
                         </Grid>
                    </Grid>

                    <Button
                         type="submit"
                         variant="contained"
                         fullWidth
                         size="large"
                         sx={{ mt: 4 }}
                    >
                         {isLoading ? 'Creating...' : 'Register Teacher'}
                    </Button>
               </form>
          </Paper>
     );
     
}
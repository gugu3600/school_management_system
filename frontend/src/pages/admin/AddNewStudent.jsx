import { useCreateStudent } from "../../hooks/createStudent";
import {
     Box, Typography, Alert, TextField, Button, CircularProgress,
     MenuItem, Divider, FormControl, InputLabel, Select, Avatar, IconButton, Paper
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material"; // Append
import { useRef, useState } from "react";
import { useApp } from "../../ThemeApp";

export default function AddNewStudent() {
     const { handleCreate, isLoading } = useCreateStudent();
     const [error, setError] = useState(null);
     const { setGlobalMsg } = useApp();

     // --- Append: Image Upload States ---
     const [preview, setPreview] = useState(null);
     const [imageFile, setImageFile] = useState(null);

     const nameInput = useRef();
     const emailInput = useRef();
     const passwordInput = useRef();
     const studentIdInput = useRef();
     const dobInput = useRef();
     const genderInput = useRef();
     const fatherNameInput = useRef();
     const motherNameInput = useRef();
     const addressInput = useRef();
     const phoneInput = useRef();
     const previousSchoolInput = useRef();

     const handleImageChange = e => {
          const file = e.target.files[0];
          if (file) {
               setImageFile(file);
               setPreview(URL.createObjectURL(file));
          }
     };

     const getLimitDate = yearsAgo => {
          const d = new Date();
          d.setFullYear(d.getFullYear() - yearsAgo);
          return d.toISOString().split('T')[0];
     }

     const minDateStr = getLimitDate(18);
     const maxDateStr = getLimitDate(5);

     const handleSubmit = (e) => {
          e.preventDefault();

          const birthDate = new Date(dobInput.current.value);
          const today = new Date();

          if (!dobInput.current.value) {
               setError("Date of birth is required");
               return 0;
          }

          let age = today.getFullYear() - birthDate.getFullYear();

          if (age < 5 || age > 18) {
               setGlobalMsg("You can't add new Student");
               setError("Student age must be between 5 and 18 years old");
               return false;
          }

          setError(null);

          const formData = new FormData();
          formData.append("name", nameInput.current.value);
          formData.append("email", emailInput.current.value);
          formData.append("password", passwordInput.current.value);
          formData.append("student_id", Number(studentIdInput.current.value));
          formData.append("dob", dobInput.current.value);
          formData.append("gender", genderInput.current.value);
          formData.append("father_name", fatherNameInput.current.value);
          formData.append("mother_name", motherNameInput.current.value);
          formData.append("address", addressInput.current.value);
          formData.append("phone", phoneInput.current.value);
          formData.append("previous_school", previousSchoolInput.current.value);

          if (imageFile) {
               formData.append("image", imageFile); 
          }

          handleCreate(formData); 
     }

     return (
          <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', p: 4, mt: 4, borderRadius: '20px' }}>
               <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Add New Student
               </Typography>

               {isLoading && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', my: 3 }}>
                         <CircularProgress />
                         <Typography sx={{ mt: 2 }}>Processing Student Data...</Typography>
                    </Box>
               )}

               {error && (
                    <Alert severity="warning" sx={{ my: 2 }}>
                         {error}
                    </Alert>
               )}

               <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                         <Avatar
                              src={preview}
                              sx={{ width: 110, height: 110, mb: 1, border: '3px solid #6366f1', boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)' }}
                         />
                         <IconButton color="primary" component="label">
                              <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                              <PhotoCamera />
                         </IconButton>
                         <Typography variant="caption" sx={{ color: 'text.secondary' }}>Upload Student Photo</Typography>
                    </Box>

                    <TextField fullWidth label="Name" inputRef={nameInput} sx={{ mb: 2 }} required />
                    <TextField fullWidth label="Email" inputRef={emailInput} sx={{ mb: 2 }} required />
                    <TextField type="password" fullWidth label="Password" inputRef={passwordInput} sx={{ mb: 2 }} required />

                    <Divider sx={{ my: 3 }}>Student Information</Divider>

                    <TextField fullWidth label="Student ID (Integer)" type="number" inputRef={studentIdInput} sx={{ mb: 2 }} required />

                    <TextField
                         fullWidth
                         label="Date of Birth"
                         type="date"
                         inputRef={dobInput}
                         sx={{ mb: 2 }}
                         InputLabelProps={{ shrink: true }}
                         slotProps={{
                              htmlInput: {
                                   min: minDateStr,
                                   max: maxDateStr,
                              }
                         }}
                         required
                    />

                    <FormControl fullWidth sx={{ mb: 2 }}>
                         <InputLabel id="gender-label">Gender</InputLabel>
                         <Select
                              labelId="gender-label"
                              label="Gender"
                              inputRef={genderInput}
                              defaultValue="male"
                         >
                              <MenuItem value="male">Male</MenuItem>
                              <MenuItem value="female">Female</MenuItem>
                         </Select>
                    </FormControl>

                    <TextField fullWidth label="Father Name" inputRef={fatherNameInput} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Mother Name" inputRef={motherNameInput} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Address" multiline rows={2} inputRef={addressInput} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Phone" inputRef={phoneInput} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Previous School" inputRef={previousSchoolInput} sx={{ mb: 2 }} />

                    <Button
                         type="submit"
                         variant="contained"
                         color="primary"
                         fullWidth
                         size="large"
                         disabled={isLoading}
                         sx={{ py: 1.5, borderRadius: '12px', fontWeight: 'bold' }}
                    >
                         {isLoading ? 'Registering...' : 'Register Student'}
                    </Button>
               </form>
          </Paper>
     )
}
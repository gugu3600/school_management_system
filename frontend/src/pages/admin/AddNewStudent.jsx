import { useCreateStudent } from "../../hooks/createStudent";
import { Box, Typography, Alert, TextField, Button, CircularProgress, MenuItem, Divider, FormControl, InputLabel, Select } from "@mui/material";
// import { useApp } from "../../ThemeApp";
// import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useApp } from "../../ThemeApp";

export default function AddNewStudent() {

     // const navigate = useNavigate();
     const { handleCreate, isLoading } = useCreateStudent();
     const [error, setError] = useState(null);
     const {  setGlobalMsg } = useApp();
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
          const data = {
               name: nameInput.current.value,
               email: emailInput.current.value,
               password: passwordInput.current.value,
               student_id: Number(studentIdInput.current.value),
               dob: dobInput.current.value,
               gender: genderInput.current.value,
               father_name: fatherNameInput.current.value,
               mother_name: motherNameInput.current.value,
               address: addressInput.current.value,
               phone: phoneInput.current.value,
               previous_school: previousSchoolInput.current.value
          }

          handleCreate(data);
     }





     return (
          <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
               <Typography variant="h4" sx={{ mb: 3 }}>
                    Add New Student
               </Typography>

               {
                    isLoading && (
                         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                              <CircularProgress />
                              <Typography sx={{ ml: 2 }}>Loading Dashboard Data...</Typography>
                         </Box>
                    )
               }

               {
                    error && (
                         <Alert severity="warning" sx={{ my: 2 }}>
                              {error}
                         </Alert>
                    )
               }

               <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Name" inputRef={nameInput} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Email" inputRef={emailInput} sx={{ mb: 2 }} />
                    <TextField type="password" fullWidth label="Password" inputRef={passwordInput} sx={{ mb: 2 }} />

                    <Divider sx={{ my: 3 }}>Student Information</Divider>

                    {/* Student Specific Info */}
                    <TextField fullWidth label="Student ID (Integer)" type="number" inputRef={studentIdInput} sx={{ mb: 2 }} />

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

                    <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                         Register Student
                    </Button>
               </form>
          </Box>
     )

}
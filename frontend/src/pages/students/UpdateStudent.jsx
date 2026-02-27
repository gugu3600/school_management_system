import { useParams } from "react-router-dom"
import { useApp } from "../../ThemeApp"
import { useEditStudent } from "../../hooks/studentupdate"
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Box, Typography, CircularProgress,TextField,Divider,FormControl,InputLabel,Select,MenuItem,Button,Alert} from "@mui/material"

export default function UpdateStudent()
{

     const {id} = useParams();
     const navigate = useNavigate();
     const studentIdInput = useRef();
     const dobInput = useRef();
     const genderInput = useRef();
     const fatherNameInput = useRef();
     const motherNameInput = useRef();
     const addressInput = useRef();
     const phoneInput = useRef();
     const previousSchoolInput = useRef();
     const {handleUpdate,isLoading,isError,error,data} = useEditStudent(id);
     const {setGlobalMsg} = useApp();

     const getLimitDate = yearsAgo => {

          const d = new Date();

          d.setFullYear(d.getFullYear() - yearsAgo);
          return d.toISOString().split('T')[0];
     }

     const minDateStr = getLimitDate(18);
     const maxDateStr = getLimitDate(5);

     const formSubmit = (e) => {


          e.preventDefault();

          const birthDate = new Date(dobInput.current.value);
          const today = new Date();

          if (!dobInput.current.value) {
               // createError("Date of birth is required");
               return 0;
          }

          let age = today.getFullYear() - birthDate.getFullYear();

          if (age < 5 || age > 18) {
               setGlobalMsg("You can't add new Student");
               // createError("Student age must be between 5 and 18 years old");
               return false;
          }

          // createError(null);

         const updateData = {
               student_id: Number(studentIdInput.current.value),
               dob: dobInput.current.value,
               gender: genderInput.current.value,
               father_name: fatherNameInput.current.value,
               mother_name: motherNameInput.current.value,
               address: addressInput.current.value,
               phone: phoneInput.current.value,
               previous_school: previousSchoolInput.current.value
          }

          handleUpdate(updateData,id);
          navigate("/admin/users");
     }
     return (
          <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
               <Typography variant="h4" sx={{ mb: 3 }}>
                    Update Student {data?.name}
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
                    isError && (
                         <Alert severity="warning" sx={{ my: 2 }}>
                              {/* {error.message} */}
                         </Alert>
                    )
               }

               <form onSubmit={formSubmit}>
                    <TextField fullWidth label="Name" value={data?.name} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} disabled/>
                    <TextField fullWidth label="Email" value={data?.email} disabled sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                    
                    <Divider sx={{ my: 3 }}>Student Information Update</Divider>

                    {/* Student Specific Info */}
                    <TextField fullWidth label="Student ID (Integer)" type="number" inputRef={studentIdInput} defaultValue={data?.student_id || ""} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />

                    <TextField
                         fullWidth
                         label="Date of Birth"
                         type="date"
                         inputRef={dobInput}
                         defaultValue = {data?.dob || ""}
                         sx={{ mb: 2 }}
                         slotProps={{
                              htmlInput: {
                                   min: minDateStr,
                                   max: maxDateStr,
                              },
                              inputLabel :{ shrink: true },
                         }}

                    />

                    <FormControl fullWidth sx={{ mb: 2 }}>
                         <InputLabel id="gender-label">Gender</InputLabel>
                         <Select
                              labelId="gender-label"
                              label="Gender"
                              inputRef={genderInput}
                              defaultValue={data?.gender || ""}
                              key = {data?.gender}
                              InputLabelProps={{ shrink: true }}
                         >
                              <MenuItem value="male">Male</MenuItem>
                              <MenuItem value="female">Female</MenuItem>
                         </Select>
                    </FormControl>

                    <TextField fullWidth label="Father Name" inputRef={fatherNameInput} defaultValue={data?.father_name || ""} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                    <TextField fullWidth label="Mother Name" inputRef={motherNameInput} defaultValue={data?.mother_name || ""} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                    <TextField fullWidth label="Address" multiline rows={2} inputRef={addressInput} defaultValue={data?.address || ""} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                    <TextField fullWidth label="Phone" inputRef={phoneInput} defaultValue={data?.phone || ""} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                    <TextField fullWidth label="Previous School" inputRef={previousSchoolInput} defaultValue={data?.previous_school || ""} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />

                    <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                         Update Student
                    </Button>
               </form>
          </Box>
     )
}
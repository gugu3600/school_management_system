import { Box, Typography, CircularProgress, TextField, Divider, FormControl, InputLabel, Select, MenuItem, Button, Alert } from "@mui/material";

import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateTeacher } from "../../hooks/teacherupdate";

export default function UpdateTeacher(){

     const {id} = useParams();
     const navigate = useNavigate();
     const {isLoading,error,isError,teacher,handleUpdate} = useUpdateTeacher(id);

     const employeeIdInput = useRef();
     const qualificationInput = useRef();
     const joining_date_Input = useRef();

     const formSubmit = e => {
          e.preventDefault();

          const data = {
               "employee_id" : Number(employeeIdInput.current.value),
               "qualification" : qualificationInput.current.value,
               "joining_date" : joining_date_Input.current.value
          };

          handleUpdate(data,id);
          navigate("/admin/users");
     }

     return (
          <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
               <Typography variant="h4" sx={{ mb: 3 }}>
                    Update Teacher {teacher?.name}
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
                              {error.message}
                         </Alert>
                    )
               }

               <form onSubmit={formSubmit}>
                    <TextField fullWidth label="Name" value={teacher?.name} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} disabled />
                    <TextField fullWidth label="Email" value={teacher?.email} disabled sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />

                    <Divider sx={{ my: 3 }}>Student Information Update</Divider>

                    {/* Student Specific Info */}
                    <TextField fullWidth label="Student ID (Integer)" type="number" inputRef={employeeIdInput} defaultValue={teacher?.employee_id || ""} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />

                    <TextField
                         fullWidth
                         label="Joining Date"
                         type="date"
                         inputRef={joining_date_Input}
                         defaultValue={teacher?.joining_date || ""}
                         sx={{ mb: 2 }}
                         slotProps={{
                              // htmlInput: {
                              //      min: minDateStr,
                              //      max: maxDateStr,
                              // },
                              inputLabel: { shrink: true },
                         }}

                    />


                    <TextField fullWidth label="Qualification" inputRef={qualificationInput} defaultValue={teacher?.qualification || ""} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />

                    <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                         Update Student
                    </Button>
               </form>
          </Box>
     )
}
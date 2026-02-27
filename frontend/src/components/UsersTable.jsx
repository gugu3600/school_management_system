import React from 'react';
import {
     Table, TableBody, TableCell, TableContainer,
     TableHead, TableRow, Paper, Typography, Chip, Avatar, Box, Button, Stack
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useApp } from '../ThemeApp';
import {
     Edit as EditIcon,
     Delete as DeleteIcon,
     AdminPanelSettings as AdminIcon,
     School as TeacherIcon,
     Face as StudentIcon
} from '@mui/icons-material';

const UsersTable = ({ users, deleteFun }) => {
     const navigate = useNavigate();
     const { auth } = useApp();

     const getRoleConfig = (roleName) => {
          const role = roleName?.toLowerCase();
          if (role === 'admin') return { color: '#f43f5e', icon: <AdminIcon fontSize="small" />, bg: 'rgba(244, 63, 94, 0.1)' };
          if (role === 'teacher') return { color: '#6366f1', icon: <TeacherIcon fontSize="small" />, bg: 'rgba(99, 102, 241, 0.1)' };
          if (role === 'student') return { color: '#10b981', icon: <StudentIcon fontSize="small" />, bg: 'rgba(16, 185, 129, 0.1)' };
          return { color: '#94a3b8', icon: null, bg: 'rgba(148, 163, 184, 0.1)' };
     };

     return (
          <Box sx={{
               width: '100%',
               mt: 4,
               px: { xs: 1, md: 0 }
          }}>
               <TableContainer
                    component={Paper}
                    sx={{
                         background: 'rgba(255, 255, 255, 0.02)',
                         backdropFilter: 'blur(20px)',
                         borderRadius: '24px',
                         border: '1px solid rgba(255, 255, 255, 0.08)',
                         boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                         overflowX: "auto", // Mobile responsiveness
                         '&::-webkit-scrollbar': { height: '6px' },
                         '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }
                    }}
               >
                    <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, letterSpacing: '0.5px' }}>
                              User Management
                         </Typography>
                         <Chip
                              label={`${users?.length || 0} Total Users`}
                              sx={{ bgcolor: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', fontWeight: 700, borderRadius: '8px' }}
                         />
                    </Box>

                    <Table sx={{ minWidth: { xs: 750, md: 900 } }}>
                         <TableHead>
                              <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}>
                                   <TableCell sx={{ color: '#94a3b8', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>USER IDENTITY</TableCell>
                                   <TableCell sx={{ color: '#94a3b8', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>EMAIL ADDRESS</TableCell>
                                   <TableCell sx={{ color: '#94a3b8', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>GENDER</TableCell>
                                   <TableCell sx={{ color: '#94a3b8', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>ROLE STATUS</TableCell>
                                   <TableCell align="right" sx={{ color: '#94a3b8', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>CONTROLS</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {users && users.length > 0 ? (
                                   users.map((user) => {
                                        const roleName = user.roles?.[0]?.name || "No Role";
                                        const config = getRoleConfig(roleName);

                                        return (
                                             <TableRow
                                                  key={user.id}
                                                  sx={{
                                                       '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
                                                       transition: '0.3s'
                                                  }}
                                             >
                                                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                                       <Stack direction="row" spacing={2} alignItems="center">
                                                            <Avatar
                                                                 onClick={() => {if(user.id !== 1 ) {navigate(`/profile/${user.id}`)}}}
                                                                 sx={{
                                                                      width: 42,
                                                                      height: 42,
                                                                      cursor: 'pointer',
                                                                      background: `linear-gradient(45deg, ${config.color}, #000)`,
                                                                      fontSize: '1rem',
                                                                      fontWeight: 800,
                                                                      boxShadow: `0 0 15px ${config.color}44`
                                                                 }}
                                                            >
                                                                 {user.name?.charAt(0).toUpperCase()}
                                                            </Avatar>
                                                            <Typography sx={{ color: '#f1f5f9', fontWeight: 600 }} sx={{cursor : "pointer"}} onClick={e => {e.stopPropagation; if(user.id !== 1){navigate(`/profile/${user.id}`)}}}>{user.name}</Typography>
                                                       </Stack>
                                                  </TableCell>

                                                  <TableCell sx={{ color: '#cbd5e1', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                                       {user.email}
                                                  </TableCell>

                                                  <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.03)', textTransform: 'capitalize' }}>
                                                       {user?.student?.gender || user?.gender || "-"}
                                                  </TableCell>

                                                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                                       <Chip
                                                            icon={config.icon}
                                                            label={roleName}
                                                            sx={{
                                                                 bgcolor: config.bg,
                                                                 color: config.color,
                                                                 fontWeight: 800,
                                                                 borderRadius: '10px',
                                                                 textTransform: 'uppercase',
                                                                 fontSize: '0.65rem'
                                                            }}
                                                       />
                                                  </TableCell>

                                                  <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                                       {auth && user.id !== auth.id && (
                                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                                 <Button
                                                                      onClick={() => {
                                                                           roleName.toLowerCase() === "student"
                                                                                ? navigate(`/admin/students/edit/${user.id}`)
                                                                                : navigate(`/admin/teachers/edit/${user.id}`)
                                                                      }}
                                                                      sx={{
                                                                           minWidth: '40px',
                                                                           height: '40px',
                                                                           borderRadius: '12px',
                                                                           color: '#818cf8',
                                                                           '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.1)' }
                                                                      }}
                                                                 >
                                                                      <EditIcon fontSize="small" />
                                                                 </Button>
                                                                 <Button
                                                                      onClick={() => deleteFun(user.id)}
                                                                      sx={{
                                                                           minWidth: '40px',
                                                                           height: '40px',
                                                                           borderRadius: '12px',
                                                                           color: '#f43f5e',
                                                                           '&:hover': { bgcolor: 'rgba(244, 63, 94, 0.1)' }
                                                                      }}
                                                                 >
                                                                      <DeleteIcon fontSize="small" />
                                                                 </Button>
                                                            </Stack>
                                                       )}
                                                  </TableCell>
                                             </TableRow>
                                        );
                                   })
                              ) : (
                                   <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 10, color: '#64748b' }}>
                                             No users found in the database.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </TableContainer>
          </Box>
     );
};

export default UsersTable;
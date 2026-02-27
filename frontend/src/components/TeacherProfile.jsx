import { Box, Container, Grid, Paper, Avatar, Typography, Stack, Chip, Divider, Button } from "@mui/material";
import {
     Badge as BadgeIcon,
     WorkspacePremium as WorkspacePremiumIcon,
     CalendarMonth as CalendarMonthIcon,
     Groups as GroupsIcon,
     Hub as HubIcon,
     Email as EmailIcon,
     VerifiedUser as VerifiedIcon
} from "@mui/icons-material";

export default function TeacherProfile({ user }) {
     return (
          <Box sx={{
               minHeight: '100vh',
               width: '100vw',
               position: 'relative',
               left: '50%',
               right: '50%',
               marginLeft: '-50vw',
               marginRight: '-50vw',
               background: '#020617', // Pitch Black for OLED contrast
               overflowX: 'hidden',
               pt: { xs: 4, md: 10 },
               pb: 8
          }}>
               {/* Cyber Background Lines */}
               <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }} />

               <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={4}>
                         {/* Side Card */}
                         <Grid item xs={12} md={4}>
                              <Paper elevation={0} sx={{
                                   p: 5, borderRadius: '40px',
                                   background: 'rgba(15, 23, 42, 0.6)',
                                   border: '1px solid rgba(244, 63, 94, 0.2)',
                                   boxShadow: '0 0 50px rgba(244, 63, 94, 0.1)'
                              }}>
                                   <Box sx={{ position: 'relative', mb: 3 }}>
                                        <Avatar
                                             src={user?.photo}
                                             sx={{
                                                  width: 180, height: 180, mx: 'auto',
                                                  border: '6px solid rgba(244, 63, 94, 0.5)',
                                                  padding: '4px'
                                             }}
                                        />
                                   </Box>

                                   <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900 }}>{user.name}</Typography>
                                   <Typography variant="subtitle1" sx={{ color: '#f43f5e', fontWeight: 800, mt: 1 }}>PROFESSOR</Typography>

                                   <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
                                        <Chip label={`ID: ${user.employee_id}`} sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: '10px' }} />
                                   </Stack>

                                   <Stack spacing={2} sx={{ mt: 5 }}>
                                        <Box sx={{ p: 2.5, borderRadius: '20px', bgcolor: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.1)' }}>
                                             <Typography variant="caption" sx={{ color: '#f43f5e', fontWeight: 800 }}>JOINED DATE</Typography>
                                             <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>{user.joining_date}</Typography>
                                        </Box>
                                        <Box sx={{ p: 2.5, borderRadius: '20px', bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                             <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800 }}>EXPERIENCE</Typography>
                                             <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>12+ Years</Typography>
                                        </Box>
                                   </Stack>
                              </Paper>
                         </Grid>

                         {/* Details Column */}
                         <Grid item xs={12} md={8}>
                              <Stack spacing={4}>
                                   {/* Professional Records */}
                                   <Paper elevation={0} sx={{ p: 5, borderRadius: '40px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                                             <VerifiedIcon sx={{ color: '#f43f5e' }} />
                                             <Typography variant="h5" sx={{ color: '#fff', fontWeight: 900 }}>Academic Credentials</Typography>
                                        </Stack>

                                        <Grid container spacing={3}>
                                             {[
                                                  { label: 'Highest Qualification', val: user.qualification, icon: <WorkspacePremiumIcon /> },
                                                  { label: 'Official Email', val: user.email, icon: <EmailIcon /> },
                                                  { label: 'Employment Status', val: 'Permanent Faculty', icon: <BadgeIcon /> },
                                                  { label: 'Staff Group', val: 'Senior Academic (Grade A)', icon: <GroupsIcon /> },
                                             ].map((item, i) => (
                                                  <Grid item xs={12} sm={6} key={i}>
                                                       <Box sx={{
                                                            p: 4, borderRadius: '30px',
                                                            bgcolor: 'rgba(255,255,255,0.01)',
                                                            border: '1px solid rgba(255,255,255,0.03)',
                                                            '&:hover': { border: '1px solid #f43f5e', transition: '0.4s' }
                                                       }}>
                                                            <Box sx={{ color: '#f43f5e', mb: 2 }}>{item.icon}</Box>
                                                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>{item.label}</Typography>
                                                            <Typography sx={{ color: '#f1f5f9', fontWeight: 700, mt: 1 }}>{item.val}</Typography>
                                                       </Box>
                                                  </Grid>
                                             ))}
                                        </Grid>
                                   </Paper>

                                   {/* Bottom Research Link */}
                                   <Paper elevation={0} sx={{
                                        p: 4, borderRadius: '40px',
                                        background: 'linear-gradient(45deg, #f43f5e 0%, #fb7185 100%)'
                                   }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                             <Stack direction="row" spacing={2} alignItems="center">
                                                  <HubIcon sx={{ color: '#fff', fontSize: 30 }} />
                                                  <Box>
                                                       <Typography sx={{ color: '#fff', fontWeight: 900 }}>RESEARCH PORTFOLIO</Typography>
                                                       <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>Check journals and publications</Typography>
                                                  </Box>
                                             </Stack>
                                             <Button sx={{ bgcolor: 'rgba(0,0,0,0.3)', color: '#fff', px: 4, borderRadius: '15px' }}>Explore</Button>
                                        </Stack>
                                   </Paper>
                              </Stack>
                         </Grid>
                    </Grid>
               </Container>
          </Box>
     );
}
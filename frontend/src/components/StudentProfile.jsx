import { Grid, Chip, Divider, Paper, Stack, Avatar, Box, Typography, Container, Button } from "@mui/material";
import {
     School as SchoolIcon,
     Hub as HubIcon,
     Business as BusinessIcon,
     CalendarMonth as CalendarMonthIcon,
     Person as PersonIcon,
     LocationOn as LocationOnIcon,
     CalendarToday as CalendarTodayIcon,
     Email as EmailIcon,
     Verified as VerifiedIcon,
     LocalPhone as PhoneIcon
} from "@mui/icons-material";

export default function StudentProfile({ user }) {
     return (
          <Box sx={{
               minHeight: '100vh',
               width: '100vw', // Full width background
               position: 'relative',
               left: '50%',
               right: '50%',
               marginLeft: '-50vw',
               marginRight: '-50vw',
               background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)',
               overflowX: 'hidden',
               pt: { xs: 4, md: 10 },
               pb: 8
          }}>
               {/* Background Glow Effect */}
               <Box sx={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: 'rgba(99, 102, 241, 0.15)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }} />
               <Box sx={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: 'rgba(244, 63, 94, 0.1)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0 }} />

               <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={4}>
                         {/* Left Column: Glassmorphism Profile */}
                         <Grid item xs={12} md={4}>
                              <Paper elevation={0} sx={{
                                   p: 5,
                                   textAlign: 'center',
                                   borderRadius: '32px',
                                   background: 'rgba(255, 255, 255, 0.02)',
                                   backdropFilter: 'blur(20px)',
                                   border: '1px solid rgba(255, 255, 255, 0.08)',
                                   boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)'
                              }}>
                                   <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                        <Avatar
                                             sx={{
                                                  width: 160, height: 160, mx: 'auto',
                                                  border: '2px solid rgba(255, 255, 255, 0.2)',
                                                  background: 'linear-gradient(45deg, #6366f1, #a855f7)'
                                             }}
                                        />
                                        <Box sx={{ position: 'absolute', bottom: 12, right: 12, bgcolor: '#10b981', p: 0.5, borderRadius: '50%', border: '4px solid #0f172a' }}>
                                             <VerifiedIcon sx={{ fontSize: 18, color: '#fff' }} />
                                        </Box>
                                   </Box>

                                   <Typography variant="h4" sx={{ mt: 3, fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>
                                        {user?.name || ""}
                                   </Typography>
                                   <Typography sx={{ color: '#94a3b8', fontWeight: 600, mb: 3 }}>
                                        ID: STUDENT-{user?.student_id || ""}
                                   </Typography>

                                   <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4 }}>
                                        <Chip label="Level 4" sx={{ background: 'linear-gradient(90deg, #6366f1, #4f46e5)', color: '#fff', fontWeight: 700 }} />
                                        <Chip label={user?.gender || ""} variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }} />
                                   </Stack>

                                   <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.05)' }} />

                                   <Box sx={{ textAlign: 'left' }}>
                                        <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 800, letterSpacing: 1.5 }}>OVERALL PROGRESS</Typography>
                                        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, my: 1 }}>88%</Typography>
                                        <Box sx={{ height: 8, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 10 }}>
                                             <Box sx={{ width: '88%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: 10 }} />
                                        </Box>
                                   </Box>
                              </Paper>
                         </Grid>

                         {/* Right Column: Detailed Cards */}
                         <Grid item xs={12} md={8}>
                              <Stack spacing={4}>
                                   {/* Info Grid */}
                                   <Paper elevation={0} sx={{ p: 4, borderRadius: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, mb: 4 }}>Personal Information</Typography>
                                        <Grid container spacing={2}>
                                             {[
                                                  { label: 'Date of Birth', val: user?.dob || "", icon: <CalendarTodayIcon /> },
                                                  { label: 'Institutional Email', val: user?.email || "", icon: <EmailIcon /> },
                                                  { label: 'Father Name', val: user?.father_name || "", icon: <PersonIcon /> },
                                                  { label: 'Mother Name', val: user?.mother_name || "", icon: <PersonIcon /> },
                                             ].map((item, i) => (
                                                  <Grid item xs={12} sm={6} key={i}>
                                                       <Box sx={{ p: 3, borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.03)' }}>
                                                            <Stack direction="row" spacing={2} alignItems="center">
                                                                 <Box sx={{ color: '#6366f1' }}>{item.icon}</Box>
                                                                 <Box>
                                                                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>{item.label}</Typography>
                                                                      <Typography sx={{ color: '#f1f5f9', fontWeight: 600 }}>{item.val}</Typography>
                                                                 </Box>
                                                            </Stack>
                                                       </Box>
                                                  </Grid>
                                             ))}
                                        </Grid>
                                   </Paper>

                                   {/* Address & Phone */}
                                   <Paper elevation={0} sx={{
                                        p: 4, borderRadius: '32px',
                                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
                                        border: '1px solid rgba(99, 102, 241, 0.2)'
                                   }}>
                                        <Grid container spacing={4} alignItems="center">
                                             <Grid item xs={12} sm={7}>
                                                  <Stack spacing={2}>
                                                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                            <LocationOnIcon sx={{ color: '#6366f1' }} />
                                                            <Typography sx={{ color: '#cbd5e1', lineHeight: 1.6 }}>{user?.address || ""}</Typography>
                                                       </Box>
                                                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                            <PhoneIcon sx={{ color: '#6366f1' }} />
                                                            <Typography sx={{ color: '#fff', fontWeight: 800 }}>{user?.phone || ""}</Typography>
                                                       </Box>
                                                  </Stack>
                                             </Grid>
                                             <Grid item xs={12} sm={5} sx={{ textAlign: { sm: 'right' } }}>
                                                  <Button variant="contained" sx={{ borderRadius: '12px', background: '#fff', color: '#000', fontWeight: 800, '&:hover': { bgcolor: '#cbd5e1' } }}>
                                                       Contact Support
                                                  </Button>
                                             </Grid>
                                        </Grid>
                                   </Paper>
                              </Stack>
                         </Grid>
                    </Grid>
               </Container>
          </Box>
     );
}
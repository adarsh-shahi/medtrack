import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    Button,
    TextField,
    Paper,
    Grid
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AddDoctor = () => {
    const navigate = useNavigate();
    const [doctorForm, setDoctorForm] = useState({ 
        name: '', 
        speciality: '', 
        experience: '',
        startTime: null,
        endTime: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically save the doctor data
        console.log('Doctor data:', doctorForm);
        // Redirect to doctors list
        navigate('/doctors');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>Add New Doctor</Typography>

            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Doctor Name"
                                fullWidth
                                required
                                variant="outlined"
                                value={doctorForm.name}
                                onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Speciality"
                                fullWidth
                                required
                                variant="outlined"
                                value={doctorForm.speciality}
                                onChange={(e) => setDoctorForm({ ...doctorForm, speciality: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Years of Experience"
                                type="number"
                                fullWidth
                                required
                                variant="outlined"
                                value={doctorForm.experience}
                                onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    label="Shift Start Time"
                                    value={doctorForm.startTime}
                                    onChange={(newValue) => setDoctorForm({ ...doctorForm, startTime: newValue })}
                                    renderInput={(params) => <TextField {...params} fullWidth required />}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            required: true,
                                            variant: "outlined"
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    label="Shift End Time"
                                    value={doctorForm.endTime}
                                    onChange={(newValue) => setDoctorForm({ ...doctorForm, endTime: newValue })}
                                    renderInput={(params) => <TextField {...params} fullWidth required />}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            required: true,
                                            variant: "outlined"
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={() => navigate('/doctors')}>Cancel</Button>
                            <Button type="submit" variant="contained">Save Doctor</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default AddDoctor;
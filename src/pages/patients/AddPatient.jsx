import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    Button,
    TextField,
    Paper,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

const AddPatient = () => {
    const navigate = useNavigate();
    const [patientForm, setPatientForm] = useState({ name: '', age: '', weight: '', height: '', bloodGroup: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically save the patient data
        console.log('Patient data:', patientForm);
        // Redirect to patients list
        navigate('/patients');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>Add New Patient</Typography>

            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Patient Name"
                                fullWidth
                                required
                                variant="outlined"
                                value={patientForm.name}
                                onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Age"
                                type="number"
                                fullWidth
                                required
                                variant="outlined"
                                value={patientForm.age}
                                onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Weight (kg)"
                                type="number"
                                fullWidth
                                required
                                variant="outlined"
                                value={patientForm.weight}
                                onChange={(e) => setPatientForm({ ...patientForm, weight: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Height (cm)"
                                type="number"
                                fullWidth
                                required
                                variant="outlined"
                                value={patientForm.height}
                                onChange={(e) => setPatientForm({ ...patientForm, height: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Blood Group</InputLabel>
                                <Select
                                    value={patientForm.bloodGroup}
                                    label="Blood Group"
                                    onChange={(e) => setPatientForm({ ...patientForm, bloodGroup: e.target.value })}
                                >
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A-">A-</MenuItem>
                                    <MenuItem value="B+">B+</MenuItem>
                                    <MenuItem value="B-">B-</MenuItem>
                                    <MenuItem value="AB+">AB+</MenuItem>
                                    <MenuItem value="AB-">AB-</MenuItem>
                                    <MenuItem value="O+">O+</MenuItem>
                                    <MenuItem value="O-">O-</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={() => navigate('/patients')}>Cancel</Button>
                            <Button type="submit" variant="contained">Save Patient</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default AddPatient;
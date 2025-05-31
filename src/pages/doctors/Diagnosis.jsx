import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Box,
    Paper,
    TextField,
    Button,
    Grid,
    Divider,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppointments } from '../../context/AppointmentContext';

const Diagnosis = () => {
    const { appointmentId } = useParams();
    const { appointments } = useAppointments();
    const [diagnosis, setDiagnosis] = useState({
        observations: '',
        medications: [],
        tests: ''
    });
    const [patientData, setPatientData] = useState(null);
    const [appointment, setAppointment] = useState(null);

    // Find the appointment and related patient data
    useEffect(() => {
        const currentAppointment = appointments.find(apt => apt.id === parseInt(appointmentId));
        if (currentAppointment) {
            setAppointment(currentAppointment);

            // In a real application, you would fetch patient data from an API
            // For now, we'll use mock data
            setPatientData({
                name: currentAppointment.patientName,
                age: 35,
                weight: 65,
                height: 165,
                bloodGroup: 'A+',
                medicalHistory: [
                    { date: '2023-10-15', condition: 'Common Cold', treatment: 'Prescribed antibiotics' },
                    { date: '2022-05-20', condition: 'Annual Checkup', treatment: 'No issues found' }
                ]
            });
        }
    }, [appointmentId, appointments]);

    // Initialize medications with one empty row
    useEffect(() => {
        if (diagnosis.medications.length === 0) {
            setDiagnosis(prev => ({
                ...prev,
                medications: [{ name: '', dosage: '', frequency: '', duration: '' }]
            }));
        }
    }, []);

    const handleDiagnosisChange = (e) => {
        const { name, value } = e.target;
        setDiagnosis(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMedicationChange = (index, field, value) => {
        const updatedMedications = [...diagnosis.medications];
        updatedMedications[index][field] = value;
        setDiagnosis(prev => ({
            ...prev,
            medications: updatedMedications
        }));
    };

    const addMedicationRow = () => {
        setDiagnosis(prev => ({
            ...prev,
            medications: [...prev.medications, { name: '', dosage: '', frequency: '', duration: '' }]
        }));
    };

    const removeMedicationRow = (index) => {
        if (diagnosis.medications.length > 1) {
            const updatedMedications = diagnosis.medications.filter((_, i) => i !== index);
            setDiagnosis(prev => ({
                ...prev,
                medications: updatedMedications
            }));
        }
    };

    const handleSaveDiagnosis = () => {
        // In a real application, you would save this to a database
        console.log('Saving diagnosis:', {
            appointmentId,
            patientName: patientData?.name,
            ...diagnosis
        });
        alert('Diagnosis saved successfully!');
    };

    if (!appointment || !patientData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h5">Loading patient data...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Patient Diagnosis</Typography>

            <Grid container spacing={3}>
                {/* Patient Information - Right Side (25% width) */}
                <Grid item xs={12} md={3}>
                    <Box
                        component={Paper}
                        sx={{
                            p: 2,
                            position: { md: 'sticky' },
                            top: { md: 80 },
                            height: 'fit-content'
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>Patient Information</Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Typography variant="subtitle1" fontWeight="bold">
                            {patientData.name}
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2">Age: {patientData.age} years</Typography>
                            <Typography variant="body2">Weight: {patientData.weight} kg</Typography>
                            <Typography variant="body2">Height: {patientData.height} cm</Typography>
                            <Typography variant="body2">Blood Group: {patientData.bloodGroup}</Typography>
                        </Box>

                        <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                            Appointment Details
                        </Typography>
                        <Typography variant="body2">Date: {appointment.date}</Typography>
                        <Typography variant="body2">Time: {appointment.time}</Typography>
                        {appointment.note && (
                            <Typography variant="body2">Note: {appointment.note}</Typography>
                        )}

                        <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                            Medical History
                        </Typography>
                        <List dense>
                            {patientData.medicalHistory.map((record, index) => (
                                <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                                    <ListItemText
                                        primary={record.condition}
                                        secondary={`${record.date} - ${record.treatment}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>

                {/* Diagnosis Form - Left Side (75% width) */}
                <Grid item xs={12} md={9}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 3 }}>
                            Doctor's Observations & Medications
                        </Typography>

                        <TextField
                            name="observations"
                            label="Observations"
                            multiline
                            rows={8}
                            fullWidth
                            value={diagnosis.observations}
                            onChange={handleDiagnosisChange}
                            placeholder="Enter your observations about the patient's condition..."
                            sx={{ mb: 3 }}
                        />

                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Prescribed Medications
                        </Typography>
                        
                        <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Medication Name</TableCell>
                                        <TableCell>Dosage</TableCell>
                                        <TableCell>Frequency</TableCell>
                                        <TableCell>Duration</TableCell>
                                        <TableCell width="60px">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {diagnosis.medications.map((medication, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    variant="standard"
                                                    placeholder="Medication name"
                                                    value={medication.name}
                                                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    variant="standard"
                                                    placeholder="e.g., 500mg"
                                                    value={medication.dosage}
                                                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    variant="standard"
                                                    placeholder="e.g., 3 times daily"
                                                    value={medication.frequency}
                                                    onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    variant="standard"
                                                    placeholder="e.g., 7 days"
                                                    value={medication.duration}
                                                    onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton 
                                                    size="small" 
                                                    color="error" 
                                                    onClick={() => removeMedicationRow(index)}
                                                    disabled={diagnosis.medications.length <= 1}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={addMedicationRow}
                            >
                                Add Medication
                            </Button>
                        </Box>

                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Recommended Tests
                        </Typography>
                        
                        <TextField
                            name="tests"
                            label="Tests"
                            multiline
                            rows={6}
                            fullWidth
                            value={diagnosis.tests}
                            onChange={handleDiagnosisChange}
                            placeholder="Enter recommended tests for the patient (e.g., Blood work, X-ray, MRI, etc.)..."
                            sx={{ mb: 3 }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveDiagnosis}
                                size="large"
                            >
                                Save Diagnosis
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Diagnosis;
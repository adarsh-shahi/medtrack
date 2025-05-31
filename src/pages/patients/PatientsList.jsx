import React, { useState } from 'react';
import {
    Typography,
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

const PatientsList = () => {
    const [patients, setPatients] = useState([
        { id: 1, name: 'Alice Brown', age: 35, weight: 65, height: 165, bloodGroup: 'A+' },
        { id: 2, name: 'Bob Wilson', age: 42, weight: 80, height: 175, bloodGroup: 'O-' }
    ]);
    const [patientDialog, setPatientDialog] = useState(false);
    const [patientForm, setPatientForm] = useState({ name: '', age: '', weight: '', height: '', bloodGroup: '' });
    const [editingPatient, setEditingPatient] = useState(null);

    const handlePatientSubmit = () => {
        if (editingPatient) {
            setPatients(patients.map(patient =>
                patient.id === editingPatient.id
                    ? {
                        ...editingPatient,
                        ...patientForm,
                        age: parseInt(patientForm.age),
                        weight: parseFloat(patientForm.weight),
                        height: parseInt(patientForm.height)
                    }
                    : patient
            ));
            setEditingPatient(null);
        } else {
            const newPatient = {
                id: Date.now(),
                ...patientForm,
                age: parseInt(patientForm.age),
                weight: parseFloat(patientForm.weight),
                height: parseInt(patientForm.height)
            };
            setPatients([...patients, newPatient]);
        }
        setPatientForm({ name: '', age: '', weight: '', height: '', bloodGroup: '' });
        setPatientDialog(false);
    };

    const handleEditPatient = (patient) => {
        setEditingPatient(patient);
        setPatientForm({
            name: patient.name,
            age: patient.age.toString(),
            weight: patient.weight.toString(),
            height: patient.height.toString(),
            bloodGroup: patient.bloodGroup
        });
        setPatientDialog(true);
    };

    const handleDeletePatient = (id) => {
        setPatients(patients.filter(patient => patient.id !== id));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Patient Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setPatientDialog(true)}
                >
                    Add Patient
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Weight (kg)</TableCell>
                            <TableCell>Height (cm)</TableCell>
                            <TableCell>Blood Group</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>{patient.age}</TableCell>
                                <TableCell>{patient.weight}</TableCell>
                                <TableCell>{patient.height}</TableCell>
                                <TableCell>{patient.bloodGroup}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditPatient(patient)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeletePatient(patient.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Patient Dialog */}
            <Dialog open={patientDialog} onClose={() => setPatientDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingPatient ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Patient Name"
                        fullWidth
                        variant="outlined"
                        value={patientForm.name}
                        onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                margin="dense"
                                label="Age"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={patientForm.age}
                                onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="dense"
                                label="Weight (kg)"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={patientForm.weight}
                                onChange={(e) => setPatientForm({ ...patientForm, weight: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="dense"
                                label="Height (cm)"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={patientForm.height}
                                onChange={(e) => setPatientForm({ ...patientForm, height: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="dense">
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
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPatientDialog(false)}>Cancel</Button>
                    <Button onClick={handlePatientSubmit} variant="contained">
                        {editingPatient ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PatientsList;
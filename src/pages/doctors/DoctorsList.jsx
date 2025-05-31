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
    Grid
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([
        { 
            id: 1, 
            name: 'Dr. John Smith', 
            speciality: 'Cardiology', 
            experience: 15,
            startTime: new Date('2023-01-01T09:00:00'),
            endTime: new Date('2023-01-01T17:00:00')
        },
        { 
            id: 2, 
            name: 'Dr. Sarah Johnson', 
            speciality: 'Neurology', 
            experience: 12,
            startTime: new Date('2023-01-01T10:00:00'),
            endTime: new Date('2023-01-01T18:00:00')
        }
    ]);
    const [doctorDialog, setDoctorDialog] = useState(false);
    const [doctorForm, setDoctorForm] = useState({ 
        name: '', 
        speciality: '', 
        experience: '',
        startTime: null,
        endTime: null
    });
    const [editingDoctor, setEditingDoctor] = useState(null);

    const formatTime = (time) => {
        if (!time) return 'Not set';
        return format(new Date(time), 'h:mm a');
    };

    const handleDoctorSubmit = () => {
        if (editingDoctor) {
            setDoctors(doctors.map(doc =>
                doc.id === editingDoctor.id
                    ? { 
                        ...editingDoctor, 
                        ...doctorForm, 
                        experience: parseInt(doctorForm.experience)
                    }
                    : doc
            ));
            setEditingDoctor(null);
        } else {
            const newDoctor = {
                id: Date.now(),
                ...doctorForm,
                experience: parseInt(doctorForm.experience)
            };
            setDoctors([...doctors, newDoctor]);
        }
        setDoctorForm({ name: '', speciality: '', experience: '', startTime: null, endTime: null });
        setDoctorDialog(false);
    };

    const handleEditDoctor = (doctor) => {
        setEditingDoctor(doctor);
        setDoctorForm({
            name: doctor.name,
            speciality: doctor.speciality,
            experience: doctor.experience.toString(),
            startTime: doctor.startTime,
            endTime: doctor.endTime
        });
        setDoctorDialog(true);
    };

    const handleDeleteDoctor = (id) => {
        setDoctors(doctors.filter(doc => doc.id !== id));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Doctor Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setEditingDoctor(null);
                        setDoctorForm({ name: '', speciality: '', experience: '', startTime: null, endTime: null });
                        setDoctorDialog(true);
                    }}
                >
                    Add Doctor
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Speciality</TableCell>
                            <TableCell>Years of Experience</TableCell>
                            <TableCell>Shift Start</TableCell>
                            <TableCell>Shift End</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctors.map((doctor) => (
                            <TableRow key={doctor.id}>
                                <TableCell>{doctor.name}</TableCell>
                                <TableCell>{doctor.speciality}</TableCell>
                                <TableCell>{doctor.experience}</TableCell>
                                <TableCell>{formatTime(doctor.startTime)}</TableCell>
                                <TableCell>{formatTime(doctor.endTime)}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditDoctor(doctor)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteDoctor(doctor.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Doctor Dialog */}
            <Dialog open={doctorDialog} onClose={() => setDoctorDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Doctor Name"
                        fullWidth
                        variant="outlined"
                        value={doctorForm.name}
                        onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Speciality"
                        fullWidth
                        variant="outlined"
                        value={doctorForm.speciality}
                        onChange={(e) => setDoctorForm({ ...doctorForm, speciality: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Years of Experience"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={doctorForm.experience}
                        onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    label="Shift Start Time"
                                    value={doctorForm.startTime}
                                    onChange={(newValue) => setDoctorForm({ ...doctorForm, startTime: newValue })}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            margin: "dense"
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
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            margin: "dense"
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDoctorDialog(false)}>Cancel</Button>
                    <Button onClick={handleDoctorSubmit} variant="contained">
                        {editingDoctor ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DoctorsList;
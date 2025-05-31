import React, { useState } from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import {
    Check as CheckIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useAppointments } from '../context/AppointmentContext';

const Appointments = () => {
    const { appointments, updateAppointment } = useAppointments();
    const [noteDialog, setNoteDialog] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointmentNote, setAppointmentNote] = useState('');

    const handleAppointmentAction = (appointmentId, action, note = '') => {
        updateAppointment(appointmentId, { status: action, note: note });
        setNoteDialog(false);
        setSelectedAppointment(null);
        setAppointmentNote('');
    };

    const openNoteDialog = (appointment, action) => {
        setSelectedAppointment({ ...appointment, action });
        setAppointmentNote(appointment.note || '');
        setNoteDialog(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'success';
            case 'rejected': return 'error';
            default: return 'warning';
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Appointment Management</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient</TableCell>
                            <TableCell>Doctor</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Note</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell>{appointment.patientName}</TableCell>
                                <TableCell>{appointment.doctorName}</TableCell>
                                <TableCell>{appointment.date}</TableCell>
                                <TableCell>{appointment.time}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={appointment.status}
                                        color={getStatusColor(appointment.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{appointment.note}</TableCell>
                                <TableCell>
                                    {appointment.status === 'pending' && (
                                        <>
                                            <IconButton
                                                color="success"
                                                onClick={() => openNoteDialog(appointment, 'accepted')}
                                            >
                                                <CheckIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => openNoteDialog(appointment, 'rejected')}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Appointment Note Dialog */}
            <Dialog open={noteDialog} onClose={() => setNoteDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {selectedAppointment?.action === 'accepted' ? 'Accept' : 'Reject'} Appointment
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Patient: {selectedAppointment?.patientName}<br />
                        Doctor: {selectedAppointment?.doctorName}<br />
                        Date: {selectedAppointment?.date} at {selectedAppointment?.time}
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Add Note (Optional)"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        value={appointmentNote}
                        onChange={(e) => setAppointmentNote(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNoteDialog(false)}>Cancel</Button>
                    <Button
                        onClick={() => handleAppointmentAction(
                            selectedAppointment?.id,
                            selectedAppointment?.action,
                            appointmentNote
                        )}
                        variant="contained"
                        color={selectedAppointment?.action === 'accepted' ? 'success' : 'error'}
                    >
                        {selectedAppointment?.action === 'accepted' ? 'Accept' : 'Reject'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Appointments;
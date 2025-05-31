import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    Chip
} from '@mui/material';
import {
    LocalHospital as DiagnosisIcon
} from '@mui/icons-material';
import { useAppointments } from '../../context/AppointmentContext';

const DoctorAppointments = () => {
    const navigate = useNavigate();
    const { appointments } = useAppointments();
    
    // Filter only accepted appointments
    const acceptedAppointments = appointments.filter(apt => apt.status === 'accepted');

    const handleDiagnosis = (appointmentId) => {
        navigate(`/doctor/diagnosis/${appointmentId}`);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>My Appointments</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Note</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {acceptedAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell>{appointment.patientName}</TableCell>
                                <TableCell>{appointment.date}</TableCell>
                                <TableCell>{appointment.time}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={appointment.status}
                                        color="success"
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{appointment.note}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleDiagnosis(appointment.id)}
                                        title="Start Diagnosis"
                                    >
                                        <DiagnosisIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {acceptedAppointments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="body1" sx={{ py: 2 }}>
                                        No accepted appointments found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DoctorAppointments;
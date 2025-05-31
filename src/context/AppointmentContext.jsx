import React, { createContext, useState, useContext, useEffect } from 'react';

const AppointmentContext = createContext();

export const useAppointments = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            patientName: 'Alice Brown',
            doctorName: 'Dr. John Smith',
            date: '2024-01-15',
            time: '10:00 AM',
            status: 'pending',
            note: ''
        },
        {
            id: 2,
            patientName: 'Bob Wilson',
            doctorName: 'Dr. Sarah Johnson',
            date: '2024-01-16',
            time: '2:00 PM',
            status: 'accepted',
            note: 'Regular checkup scheduled'
        },
        {
            id: 3,
            patientName: 'Carol Davis',
            doctorName: 'Dr. John Smith',
            date: '2024-01-17',
            time: '3:30 PM',
            status: 'accepted',
            note: 'Follow-up appointment'
        }
    ]);

    const [diagnoses, setDiagnoses] = useState([]);

    const pendingAppointmentsCount = appointments.filter(apt => apt.status === 'pending').length;

    const updateAppointment = (appointmentId, updates) => {
        setAppointments(appointments.map(apt =>
            apt.id === appointmentId ? { ...apt, ...updates } : apt
        ));
    };

    const addAppointment = (newAppointment) => {
        setAppointments([...appointments, {
            id: appointments.length + 1,
            ...newAppointment,
            status: 'pending'
        }]);
    };

    const addDiagnosis = (appointmentId, diagnosisData) => {
        setDiagnoses([...diagnoses, {
            id: diagnoses.length + 1,
            appointmentId,
            createdAt: new Date().toISOString(),
            ...diagnosisData
        }]);
    };

    const getDiagnosisByAppointmentId = (appointmentId) => {
        return diagnoses.find(d => d.appointmentId === appointmentId) || null;
    };

    return (
        <AppointmentContext.Provider value={{ 
            appointments, 
            setAppointments, 
            pendingAppointmentsCount,
            updateAppointment,
            addAppointment,
            diagnoses,
            addDiagnosis,
            getDiagnosisByAppointmentId
        }}>
            {children}
        </AppointmentContext.Provider>
    );
};
import React from 'react';
import { Navigate } from 'react-router-dom';

// Page components
import Dashboard from '../pages/Dashboard';
import DoctorsList from '../pages/doctors/DoctorsList';
import AddDoctor from '../pages/doctors/AddDoctor';
import PatientsList from '../pages/patients/PatientsList';
import AddPatient from '../pages/patients/AddPatient';
import Appointments from '../pages/Appointments';
import Settings from '../pages/Settings';
// New components
import DoctorAppointments from '../pages/doctors/DoctorAppointments';
import Diagnosis from '../pages/doctors/Diagnosis';

const routes = [
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/doctors',
        element: <DoctorsList />
    },
    {
        path: '/doctors/add',
        element: <AddDoctor />
    },
    {
        path: '/patients',
        element: <PatientsList />
    },
    {
        path: '/patients/add',
        element: <AddPatient />
    },
    {
        path: '/appointments',
        element: <Appointments />
    },
    {
        path: '/settings',
        element: <Settings />
    },
    // New routes
    {
        path: '/doctor/appointments',
        element: <DoctorAppointments />
    },
    {
        path: '/doctor/diagnosis/:appointmentId',
        element: <Diagnosis />
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />
    }
];

export default routes;
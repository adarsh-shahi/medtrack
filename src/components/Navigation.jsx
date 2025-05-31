import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Collapse,
    Divider,
    IconButton,
    Box,
    AppBar,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
    Badge
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Person as PersonIcon,
    MedicalServices as DoctorIcon,
    Assignment as AppointmentIcon,
    ExpandLess,
    ExpandMore,
    People as PatientsIcon,
    Add as AddIcon,
    List as ListIcon,
    Settings as SettingsIcon,
    EventNote as DoctorAppointmentIcon
} from '@mui/icons-material';
import { useAppointments } from '../context/AppointmentContext';

const Navigation = ({ open, handleDrawerToggle }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const drawerWidth = 240;
    const { pendingAppointmentsCount } = useAppointments();

    // State for menu expansion
    const [doctorsOpen, setDoctorsOpen] = useState(location.pathname.includes('/doctors'));
    const [patientsOpen, setPatientsOpen] = useState(location.pathname.includes('/patients'));

    const handleDoctorsClick = () => {
        setDoctorsOpen(!doctorsOpen);
    };

    const handlePatientsClick = () => {
        setPatientsOpen(!patientsOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (isMobile) {
            handleDrawerToggle();
        }
    };

    const drawer = (
        <>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    MedTrack
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => handleNavigation('/dashboard')}
                        selected={location.pathname === '/dashboard'}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                {/* Doctors Menu */}
                <ListItem disablePadding>
                    <ListItemButton onClick={handleDoctorsClick}>
                        <ListItemIcon>
                            <DoctorIcon />
                        </ListItemIcon>
                        <ListItemText primary="Doctors" />
                        {doctorsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={doctorsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => handleNavigation('/doctors/add')}
                            selected={location.pathname === '/doctors/add'}
                        >
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Doctor" />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => handleNavigation('/doctors')}
                            selected={location.pathname === '/doctors'}
                        >
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="View All" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Patients Menu */}
                <ListItem disablePadding>
                    <ListItemButton onClick={handlePatientsClick}>
                        <ListItemIcon>
                            <PatientsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Patients" />
                        {patientsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={patientsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => handleNavigation('/patients/add')}
                            selected={location.pathname === '/patients/add'}
                        >
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Patient" />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => handleNavigation('/patients')}
                            selected={location.pathname === '/patients'}
                        >
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="View All" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Admin Appointments */}
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => handleNavigation('/appointments')}
                        selected={location.pathname === '/appointments'}
                    >
                        <ListItemIcon>
                            <Badge badgeContent={pendingAppointmentsCount} color="error">
                                <AppointmentIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary="Appointments" />
                    </ListItemButton>
                </ListItem>

                {/* New Doctor Appointments Menu Item */}
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => handleNavigation('/doctor/appointments')}
                        selected={location.pathname === '/doctor/appointments' || location.pathname.includes('/doctor/diagnosis')}
                    >
                        <ListItemIcon>
                            <DoctorAppointmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Doctor Appointments" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => handleNavigation('/settings')}
                        selected={location.pathname === '/settings'}
                    >
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );

    // ... rest of the component remains the same
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        MedTrack - EMR Admin Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                {/* Mobile drawer */}
                <Drawer
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};

export default Navigation;
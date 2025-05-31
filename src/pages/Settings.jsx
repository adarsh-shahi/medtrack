import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Paper,
    Switch,
    FormControlLabel,
    Divider,
    Button,
    TextField,
    Grid,
    useTheme as useMuiTheme,
    Checkbox,
    FormGroup,
    FormLabel
} from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Settings = () => {
    const muiTheme = useMuiTheme();
    const { darkMode, toggleDarkMode } = useTheme();

    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        hospitalName: 'MedTrack Hospital',
        adminEmail: 'admin@medtrack.com',
        clinicDays: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            sunday: false
        },
        clinicHours: {
            monday: { open: new Date('2023-01-01T09:00:00'), close: new Date('2023-01-01T17:00:00') },
            tuesday: { open: new Date('2023-01-01T09:00:00'), close: new Date('2023-01-01T17:00:00') },
            wednesday: { open: new Date('2023-01-01T09:00:00'), close: new Date('2023-01-01T17:00:00') },
            thursday: { open: new Date('2023-01-01T09:00:00'), close: new Date('2023-01-01T17:00:00') },
            friday: { open: new Date('2023-01-01T09:00:00'), close: new Date('2023-01-01T17:00:00') },
            saturday: { open: new Date('2023-01-01T10:00:00'), close: new Date('2023-01-01T15:00:00') },
            sunday: { open: new Date('2023-01-01T10:00:00'), close: new Date('2023-01-01T15:00:00') }
        }
    });

    const handleChange = (event) => {
        if (event.target.name === 'darkMode') {
            toggleDarkMode();
        } else {
            setSettings({
                ...settings,
                [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
            });
        }
    };

    const handleClinicDayChange = (day) => (event) => {
        setSettings({
            ...settings,
            clinicDays: {
                ...settings.clinicDays,
                [day]: event.target.checked
            }
        });
    };

    const handleClinicHourChange = (day, type) => (newTime) => {
        setSettings({
            ...settings,
            clinicHours: {
                ...settings.clinicHours,
                [day]: {
                    ...settings.clinicHours[day],
                    [type]: newTime
                }
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save settings logic would go here
        console.log('Settings saved:', { ...settings, darkMode });
        alert('Settings saved successfully!');
    };

    const weekDays = [
        { key: 'monday', label: 'Monday' },
        { key: 'tuesday', label: 'Tuesday' },
        { key: 'wednesday', label: 'Wednesday' },
        { key: 'thursday', label: 'Thursday' },
        { key: 'friday', label: 'Friday' },
        { key: 'saturday', label: 'Saturday' },
        { key: 'sunday', label: 'Sunday' }
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>Settings</Typography>

            <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" sx={{ mb: 2 }}>General Settings</Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Hospital Name"
                                fullWidth
                                name="hospitalName"
                                value={settings.hospitalName}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Admin Email"
                                fullWidth
                                name="adminEmail"
                                value={settings.adminEmail}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" sx={{ mb: 2 }}>Clinic Hours</Typography>
                    <FormLabel component="legend" sx={{ mb: 2 }}>Operating Days</FormLabel>
                    <FormGroup>
                        <Grid container spacing={2}>
                            {weekDays.map((day) => (
                                <Grid item xs={12} key={day.key}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={settings.clinicDays[day.key]}
                                                    onChange={handleClinicDayChange(day.key)}
                                                    name={day.key}
                                                    color="primary"
                                                />
                                            }
                                            label={day.label}
                                            sx={{ minWidth: 120 }}
                                        />
                                        {settings.clinicDays[day.key] && (
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                                    <TimePicker
                                                        label="Opening Time"
                                                        value={settings.clinicHours[day.key].open}
                                                        onChange={handleClinicHourChange(day.key, 'open')}
                                                        slotProps={{
                                                            textField: {
                                                                variant: "outlined",
                                                                size: "small",
                                                                sx: { width: 150 }
                                                            }
                                                        }}
                                                    />
                                                    <Typography sx={{ mx: 2 }}>to</Typography>
                                                    <TimePicker
                                                        label="Closing Time"
                                                        value={settings.clinicHours[day.key].close}
                                                        onChange={handleClinicHourChange(day.key, 'close')}
                                                        slotProps={{
                                                            textField: {
                                                                variant: "outlined",
                                                                size: "small",
                                                                sx: { width: 150 }
                                                            }
                                                        }}
                                                    />
                                                </Box>
                                            </LocalizationProvider>
                                        )}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </FormGroup>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" sx={{ mb: 2 }}>Appearance</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={darkMode}
                                onChange={handleChange}
                                name="darkMode"
                                color="primary"
                            />
                        }
                        label="Dark Mode"
                        sx={{ mb: 2, display: 'block' }}
                    />

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" sx={{ mb: 2 }}>Notifications</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.emailNotifications}
                                onChange={handleChange}
                                name="emailNotifications"
                                color="primary"
                            />
                        }
                        label="Email Notifications"
                        sx={{ mb: 1, display: 'block' }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={settings.smsNotifications}
                                onChange={handleChange}
                                name="smsNotifications"
                                color="primary"
                            />
                        }
                        label="SMS Notifications"
                        sx={{ mb: 3, display: 'block' }}
                    />

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Save Settings
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Settings;
import {
  AccountCircle,
  Email,
  Female,
  Lock,
  Male,
  Phone,
  Transgender,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import auth from '../../auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState(new Date('2002-01-01'));
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const color = '#2e7d32';
  const colorTwo = '#000';

  const navigate = useNavigate();
  return (
    <Container sx={{ maxWidth: { xs: 'lg', sm: 'sm' } }}>
      <CssBaseline />
      <Card
        elevation={10}
        sx={{ pt: 10, pb: 9, maxWidth: { md: '50vw' }, mx: 'auto', px: 4 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '20rem',
          }}
        >
          <div
            style={{
              marginBottom: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" fontWeight="bold">
              SIGN UP
            </Typography>
            <Typography component="h3">Register To Get A Job</Typography>
          </div>
          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            style={{ padding: 10 }}
          >
            <Grid item xs={12} md={6}>
              <TextField
                label="Full Name"
                name="fullName"
                id="fullName"
                value={fullName}
                fullWidth
                sx={{ borderColor: '#000000' }}
                placeholder="Full Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="success" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="number"
                label="Phone Number"
                name="phoneNumber"
                id="phoneNumber"
                fullWidth
                sx={{ borderColor: '#000000' }}
                placeholder="0123456789"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="success" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date Of Birth"
                  color="success"
                  value={dob}
                  minDate={new Date('1950-01-01')}
                  maxDate={new Date('2002-01-01')}
                  onChange={(newValue) => setDob(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        svg: { color },
                        input: { colorTwo },
                      }}
                      fullWidth
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl sx={{ minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={gender}
                  label="Gender"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="Male">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                      }}
                    >
                      <Male color="success" />
                      <div style={{ marginLeft: '1rem' }}>Male</div>
                    </div>
                  </MenuItem>
                  <MenuItem value="Female">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                      }}
                    >
                      <Female color="success" />
                      <div style={{ marginLeft: '1rem' }}>Female</div>
                    </div>
                  </MenuItem>
                  <MenuItem value="Other">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                      }}
                    >
                      <Transgender color="success" />
                      <div style={{ marginLeft: '1rem' }}>Other</div>
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                id="email"
                fullWidth
                sx={{ borderColor: '#000000' }}
                placeholder="demo@example.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="success" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="password"
                label="Password"
                name="password"
                id="password"
                fullWidth
                sx={{ borderColor: '#000000' }}
                placeholder="********"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="success" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="password"
                label="Confirm Password"
                name="confirm_password"
                id="confirm_password"
                fullWidth
                sx={{ borderColor: '#000000' }}
                placeholder="********"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="success" />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={() => {
                auth.register(
                  {
                    full_name: fullName,
                    email: email,
                    birthDate: dob,
                    gender: gender,
                    phone_number: phoneNumber,
                    password: password,
                    confirmPassword: confirmPassword,
                  },
                  () => {
                    navigate('/login');
                  }
                );
              }}
            >
              SIGN UP
            </Button>
          </div>
        </Box>
      </Card>
    </Container>
    //   <TextField label="Outlined secondary" color="secondary" />
  );
}

export default Register;

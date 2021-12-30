import {
  AccountCircle,
  Email,
  Female,
  Lock,
  Male,
  Phone,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import auth from '../../auth';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container sx={{ maxWidth: { xs: 'lg', sm: 'sm' } }}>
      <CssBaseline />
      <Card
        elevation={10}
        sx={{ py: 10, maxWidth: { md: '50vw' }, mx: 'auto', px: 4 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '27.5rem',
          }}
        >
          <div
            style={{
              marginTop: '2rem',
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" fontWeight="bold">
              SIGN IN
            </Typography>
            <Typography component="h3">Lorem ipsum dolor sit amet</Typography>
          </div>
          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            style={{ padding: 10 }}
          >
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <div
            style={{
              marginTop: '2rem',
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
                auth.login(
                  () => {
                    console.log(location);
                    navigate('/dashboard');
                  },
                  { email: email, password: password }
                );
              }}
            >
              SIGN IN
            </Button>
          </div>
        </Box>
      </Card>
    </Container>
    //   <TextField label="Outlined secondary" color="secondary" />
  );
}

export default Login;

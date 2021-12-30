import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function Common() {
  return (
    <Container
      maxWidth="xl"
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{}}>
        <div style={{ maxWidth: '100%' }}>
          <img
            src={process.env.PUBLIC_URL + '/assets/images/logo.png'}
            alt=""
            style={{ maxWidth: '25rem' }}
          />
        </div>
        <Typography variant="subtitle1" align="center" fontSize={20}>
          Shaping Tomorrow's Cybersecurity
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="bold" align="center">
          Welcome to TechForing
        </Typography>
        <Typography variant="h6" sx={{ color: '#5bbc2e' }} align="center">
          Notice:
        </Typography>
        <Typography variant="h6" fontWeight="bold" align="center">
          An applicant can register only once.
        </Typography>
        <Typography variant="h6" fontWeight="light" align="center">
          Registered applicant, please login with your credentials by entering
          email and password
        </Typography>
      </Box>
    </Container>
  );
}

export default Common;

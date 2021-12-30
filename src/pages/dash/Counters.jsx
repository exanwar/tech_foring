import { PeopleAltOutlined, Work } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

function Counters() {
  return (
    <Box
      sx={{
        pt: 3,
      }}
      style={{ width: '100%' }}
    >
      <Grid container spacing={10} wrap sx={{ width: '100%' }}>
        <Grid item md={3}>
          <Box
            sx={{
              backgroundColor: '#123068',
              display: 'flex',
              flexDirection: 'column',
              justify: 'center',
              alignItems: 'center',
              color: '#e3e3e3',
              py: 6,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justify: 'center',
                alignItems: 'center',
              }}
            >
              <Work sx={{ fontSize: '30px', marginRight: '5px' }} />
              <Typography variant="h6">TOTAL ACTIVE JOB</Typography>
            </Box>
            <Typography variant="h6">5</Typography>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box
            sx={{
              backgroundColor: '#0C2C53',
              display: 'flex',
              flexDirection: 'column',
              justify: 'center',
              alignItems: 'center',
              color: '#e3e3e3',
              py: 6,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justify: 'center',
                alignItems: 'center',
              }}
            >
              <PeopleAltOutlined
                sx={{ fontSize: '30px', marginRight: '5px' }}
              />
              <Typography variant="h6">INTERVIEW SCHEDULE</Typography>
            </Box>
            <Typography variant="h6">200</Typography>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box
            sx={{
              backgroundColor: '#123068',
              display: 'flex',
              flexDirection: 'column',
              justify: 'center',
              alignItems: 'center',
              color: '#e3e3e3',
              py: 6,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justify: 'center',
                alignItems: 'center',
              }}
            >
              <PeopleAltOutlined
                sx={{ fontSize: '30px', marginRight: '5px' }}
              />
              <Typography variant="h6">NEW HIRING</Typography>
            </Box>
            <Typography variant="h6">5</Typography>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box
            sx={{
              backgroundColor: '#0C2C53',
              display: 'flex',
              flexDirection: 'column',
              justify: 'center',
              alignItems: 'center',
              color: '#e3e3e3',
              py: 6,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justify: 'center',
                alignItems: 'center',
              }}
            >
              <PeopleAltOutlined
                sx={{ fontSize: '30px', marginRight: '5px' }}
              />
              <Typography variant="h6">TOTAL APPLICANTS</Typography>
            </Box>
            <Typography variant="h6">200</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Counters;
